import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './Sidebar';
import { Header } from './Header';
import { useAuthStore } from '@/store/authStore';

export function Layout() {
  const { theme } = useAuthStore();

  useEffect(() => {
    // Apply theme on mount
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen w-full flex bg-gradient-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          
          <motion.main 
            className="flex-1 p-6 overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
}