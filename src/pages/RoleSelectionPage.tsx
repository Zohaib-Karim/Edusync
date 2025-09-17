import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  Users, 
  BookOpen, 
  Shield, 
  ArrowLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

type UserRole = 'student' | 'faculty' | 'admin';

interface RoleConfig {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  features: string[];
  responsibilities: string[];
}

const roleConfig: Record<UserRole, RoleConfig> = {
  student: {
    title: 'Student',
    description: 'Access your courses, assignments, and academic progress',
    icon: BookOpen,
    gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
    features: ['Course Management', 'Assignment Tracking', 'Grade Reports', 'Study Materials'],
    responsibilities: ['Submit assignments on time', 'Attend virtual classes', 'Track academic progress', 'Access learning resources']
  },
  faculty: {
    title: 'Faculty',
    description: 'Manage courses, students, and academic content',
    icon: Users,
    gradient: 'from-green-500/20 via-teal-500/20 to-blue-500/20',
    features: ['Course Creation', 'Student Management', 'Grading System', 'Analytics Dashboard'],
    responsibilities: ['Create and manage courses', 'Grade student submissions', 'Monitor class attendance', 'Provide academic guidance']
  },
  admin: {
    title: 'Administrator',
    description: 'Oversee institution operations and system management',
    icon: Shield,
    gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
    features: ['System Management', 'User Administration', 'Reports & Analytics', 'Security Controls'],
    responsibilities: ['Manage user accounts', 'System configuration', 'Generate reports', 'Ensure platform security']
  }
};

export function RoleSelectionPage() {
  const navigate = useNavigate();
  const { setTheme } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTheme('system');
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setTheme]);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/auth?role=${selectedRole}`);
    }
  };

  const handleBack = () => {
    navigate('/');
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
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div 
        className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass backdrop-blur-xl border border-border/20 hover:border-border/40 rounded-full p-3 transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass backdrop-blur-xl border border-border/20 hover:border-border/40 rounded-full p-1 transition-all duration-300"
        >
          <ThemeToggle />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block mb-4"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
              Choose Your Role
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Welcome to EduSync
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Select your role to access personalized features and tools designed specifically for your needs
          </motion.p>
        </motion.div>

        {/* Role cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {(Object.entries(roleConfig) as [UserRole, RoleConfig][]).map(([role, config], index) => {
            const Icon = config.icon;
            const isSelected = selectedRole === role;
            
            return (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => handleRoleSelect(role)}
              >
                <Card className={`relative h-full transition-all duration-500 border-2 overflow-hidden ${
                  isSelected 
                    ? 'border-primary shadow-2xl shadow-primary/25 scale-105' 
                    : 'border-border/50 hover:border-primary/50 hover:shadow-xl'
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-50 transition-opacity duration-500 ${
                    isSelected ? 'opacity-70' : 'group-hover:opacity-60'
                  }`} />
                  
                  <CardContent className="relative p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        className={`p-4 rounded-2xl transition-all duration-300 ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground shadow-lg' 
                            : 'bg-background/80 text-foreground group-hover:bg-primary group-hover:text-primary-foreground'
                        }`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-8 h-8" />
                      </motion.div>
                      
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", damping: 15, stiffness: 300 }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <h3 className="text-2xl font-bold mb-3">{config.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                      {config.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-primary">Key Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {config.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 + idx * 0.1 }}
                              className="text-xs text-muted-foreground bg-background/50 rounded-lg px-2 py-1"
                            >
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-primary">Responsibilities</h4>
                            <div className="space-y-1">
                              {config.responsibilities.map((responsibility, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="text-xs text-muted-foreground flex items-center gap-2"
                                >
                                  <div className="w-1 h-1 bg-primary rounded-full" />
                                  {responsibility}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Continue button */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleContinue}
                  size="lg"
                  className="px-12 py-4 text-lg font-semibold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/25 border-0 group"
                >
                  Continue as {roleConfig[selectedRole].title}
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}