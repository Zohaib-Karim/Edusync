import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuthStore } from '@/store/authStore';

type AuthView = 'login' | 'register' | 'reset';

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const { isAuthenticated, setTheme } = useAuthStore();

  useEffect(() => {
    // Initialize theme
    setTheme('system');
  }, [setTheme]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const renderAuthForm = () => {
    switch (currentView) {
      case 'register':
        return (
          <RegisterForm 
            onToggleForm={() => setCurrentView('login')} 
          />
        );
      case 'reset':
        return (
          <PasswordResetForm 
            onBack={() => setCurrentView('login')} 
          />
        );
      default:
        return (
          <LoginForm 
            onToggleForm={() => setCurrentView('register')}
            onShowResetPassword={() => setCurrentView('reset')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-background p-4">
      {/* Header */}
      <motion.div 
        className="absolute top-4 right-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ThemeToggle />
      </motion.div>

      {/* Brand */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center shadow-elegant">
          <span className="text-2xl font-bold text-primary-foreground">SC</span>
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Smart Classroom
        </h1>
        <p className="text-muted-foreground text-lg">
          Intelligent Timetable & Classroom Management
        </p>
      </motion.div>

      {/* Auth Forms */}
      <motion.div 
        className="w-full max-w-md"
        layout
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {renderAuthForm()}
        </AnimatePresence>
      </motion.div>

      {/* Demo Credentials */}
      <motion.div 
        className="mt-8 p-4 bg-muted/50 rounded-lg border max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-medium mb-3 text-sm">Demo Credentials:</h3>
        <div className="space-y-2 text-xs">
          <div>
            <span className="font-medium">Admin:</span> admin@smartclass.edu
          </div>
          <div>
            <span className="font-medium">Faculty:</span> faculty@smartclass.edu
          </div>
          <div>
            <span className="font-medium">Student:</span> student@smartclass.edu
          </div>
          <div className="text-muted-foreground mt-2">
            Password: <code>password</code> | 2FA Code: <code>123456</code>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="absolute bottom-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        © 2024 Smart Classroom. All rights reserved.
      </motion.div>
    </div>
  );
}