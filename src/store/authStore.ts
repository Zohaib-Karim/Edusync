import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  theme: 'light' | 'dark' | 'system';
  sessionId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  verify2FA: (code: string) => Promise<boolean>;
  checkSession: () => void;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'admin@smartclass.edu',
    role: 'admin',
    department: 'Administration',
    phone: '+1-555-0101',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'faculty@smartclass.edu',
    role: 'faculty',
    department: 'Computer Science',
    phone: '+1-555-0102',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Emma Williams',
    email: 'student@smartclass.edu',
    role: 'student',
    department: 'Computer Science',
    phone: '+1-555-0103',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      theme: 'system',
      sessionId: null,

      checkSession: () => {
        const currentSessionId = sessionStorage.getItem('edusync-session');
        const storedSessionId = get().sessionId;
        
        // If no session ID in sessionStorage but we have one in persisted state,
        // it means the browser was refreshed - auto logout
        if (!currentSessionId && storedSessionId) {
          get().logout();
          return;
        }
        
        // If we have a user but no session ID, create one
        if (get().isAuthenticated && !currentSessionId) {
          const newSessionId = Date.now().toString();
          sessionStorage.setItem('edusync-session', newSessionId);
          set({ sessionId: newSessionId });
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
          const sessionId = Date.now().toString();
          sessionStorage.setItem('edusync-session', sessionId);
          set({ user, isAuthenticated: true, isLoading: false, sessionId });
          // Redirect to the app dashboard after login
          window.location.href = '/app/dashboard';
        } else {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, sessionId: null });
        // Clear all storage and redirect to role selection
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/role-selection';
      },

      setUser: (user: User) => {
        set({ user });
      },

      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme });
        
        if (theme === 'system') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.classList.toggle('dark', isDark);
        } else {
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
      },

      verify2FA: async (code: string) => {
        // Simulate 2FA verification
        await new Promise(resolve => setTimeout(resolve, 1000));
        return code === '123456';
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        sessionId: state.sessionId,
      }),
    }
  )
);