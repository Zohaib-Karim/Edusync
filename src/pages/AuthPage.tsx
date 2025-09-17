import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuthStore } from '@/store/authStore';
import { Shield, Users, GraduationCap, BookOpen, Calendar, BarChart } from 'lucide-react';

type AuthView = 'login' | 'register' | 'reset';
type UserRole = 'admin' | 'faculty' | 'student' | null;

const roleConfig = {
  admin: {
    title: 'Administrator',
    description: 'Manage system settings and oversee all operations',
    icon: Shield,
    gradient: 'gradient-admin',
    features: ['System Management', 'User Administration', 'Analytics & Reports']
  },
  faculty: {
    title: 'Faculty Member',
    description: 'Manage courses, schedules, and student interactions',
    icon: Users,
    gradient: 'gradient-faculty',
    features: ['Course Management', 'Schedule Planning', 'Student Analytics']
  },
  student: {
    title: 'Student',
    description: 'Access courses, schedules, and academic resources',
    icon: GraduationCap,
    gradient: 'gradient-student',
    features: ['Course Access', 'Schedule Viewing', 'Academic Progress']
  }
};

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const { isAuthenticated, setTheme } = useAuthStore();

  useEffect(() => {
    setTheme('system');
  }, [setTheme]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const backgroundClass = selectedRole ? roleConfig[selectedRole].gradient : 'gradient-neutral';

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
    <div className={`min-h-screen flex flex-col ${backgroundClass} transition-all duration-700 ease-in-out`}>
      {/* Header */}
      <motion.div 
        className="absolute top-4 right-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ThemeToggle />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Branding & Info */}
          <motion.div 
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Brand */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Smart Classroom
              </motion.h1>
              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Revolutionizing Education Through Intelligent Technology
              </motion.p>
            </div>

            {/* About */}
            <motion.div 
              className="glass p-6 rounded-2xl space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Smart Scheduling</h3>
                    <p className="text-sm text-muted-foreground">AI-powered timetables</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Course Management</h3>
                    <p className="text-sm text-muted-foreground">Streamlined workflows</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center">
                    <BarChart className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Analytics</h3>
                    <p className="text-sm text-muted-foreground">Data-driven insights</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Role-based Features */}
            <AnimatePresence>
              {selectedRole && (
                <motion.div 
                  className="glass p-6 rounded-2xl"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${roleConfig[selectedRole].gradient} rounded-xl flex items-center justify-center`}>
                      {React.createElement(roleConfig[selectedRole].icon, { 
                        className: "h-6 w-6 text-white" 
                      })}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{roleConfig[selectedRole].title}</h3>
                      <p className="text-muted-foreground">{roleConfig[selectedRole].description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {roleConfig[selectedRole].features.map((feature, index) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Side - Auth Forms */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Role Selection */}
            <motion.div 
              className="glass p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">Choose Your Role</h2>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(roleConfig).map(([role, config]) => (
                  <motion.button
                    key={role}
                    onClick={() => setSelectedRole(role as UserRole)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedRole === role 
                        ? `${config.gradient} border-primary shadow-elegant text-white` 
                        : 'bg-background border-border hover:border-primary/50 hover:shadow-soft'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {React.createElement(config.icon, { 
                        className: `h-6 w-6 ${selectedRole === role ? 'text-white' : 'text-primary'}` 
                      })}
                      <span className={`font-medium text-sm ${selectedRole === role ? 'text-white' : 'text-foreground'}`}>
                        {config.title}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Auth Forms */}
            <motion.div 
              layout
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderAuthForm()}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Demo Credentials */}
            <motion.div 
              className="glass p-4 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="font-medium mb-3 text-sm">Demo Credentials:</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-medium">Admin:</span> 
                  <span>admin@smartclass.edu</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Faculty:</span> 
                  <span>faculty@smartclass.edu</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Student:</span> 
                  <span>student@smartclass.edu</span>
                </div>
                <div className="text-muted-foreground mt-2 text-center">
                  Password: <code className="bg-muted px-1 rounded">password</code> | 2FA: <code className="bg-muted px-1 rounded">123456</code>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div 
        className="p-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © 2024 Smart Classroom. Transforming education through intelligent technology.
      </motion.div>
    </div>
  );
}