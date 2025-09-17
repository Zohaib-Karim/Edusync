import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { Shield, Users, GraduationCap, BookOpen, Calendar, BarChart, ArrowLeft, Home } from 'lucide-react';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isAuthenticated, setTheme } = useAuthStore();
  const navigate = useNavigate();
  
  // Get role from URL params
  const searchParams = new URLSearchParams(location.search);
  const selectedRole = searchParams.get('role') as UserRole || null;

  useEffect(() => {
    setTheme('system');
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setTheme]);

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  // Redirect to role selection if no role is selected
  if (!selectedRole) {
    return <Navigate to="/role-selection" replace />;
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
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-primary/20 rounded-full pointer-events-none z-40 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
      />
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div 
        className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/role-selection')}
            className="glass hover:bg-background/60 transition-all duration-300 backdrop-blur-xl border border-border/20 hover:border-border/40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Role Selection
          </Button>
        </motion.div>
        <ThemeToggle />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Branding & Info */}
          <motion.div 
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Brand */}
            <div className="space-y-6">
              <motion.h1 
                className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                EduSync
              </motion.h1>
              <motion.p 
                className="text-2xl lg:text-3xl text-muted-foreground font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Smart Scheduling. Seamless Learning.
              </motion.p>
            </div>

            {/* About */}
            <motion.div 
              className="glass p-8 rounded-3xl space-y-6 backdrop-blur-2xl border border-border/20 hover:border-border/40 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-background/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <motion.div 
                    className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <Calendar className="h-6 w-6 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg">Smart Scheduling</h3>
                    <p className="text-muted-foreground">AI-powered timetables</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-background/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <motion.div 
                    className="w-12 h-12 gradient-secondary rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <BookOpen className="h-6 w-6 text-secondary-foreground" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg">Course Management</h3>
                    <p className="text-muted-foreground">Streamlined workflows</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-background/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <motion.div 
                    className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <BarChart className="h-6 w-6 text-accent-foreground" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg">Analytics</h3>
                    <p className="text-muted-foreground">Data-driven insights</p>
                  </div>
                </motion.div>
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
            {/* Selected Role Display */}
            {selectedRole && (
              <motion.div 
                className="glass p-8 rounded-3xl backdrop-blur-2xl border border-border/20 hover:border-border/40 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-center mb-6">
                  <motion.div 
                    className={`w-16 h-16 ${roleConfig[selectedRole].gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {React.createElement(roleConfig[selectedRole].icon, { 
                      className: "h-8 w-8 text-white drop-shadow-sm" 
                    })}
                  </motion.div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Welcome, {roleConfig[selectedRole].title}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {roleConfig[selectedRole].description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-center text-primary">What you can do:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {roleConfig[selectedRole].features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-background/30 hover:bg-background/50 transition-all duration-200"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

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