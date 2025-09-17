import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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
  CheckCircle2,
  Sparkles,
  Star,
  Zap
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
    description: 'Immerse yourself in a world of learning with personalized course experiences, intelligent progress tracking, and seamless access to all your academic resources.',
    icon: BookOpen,
    gradient: 'from-blue-500/30 via-purple-500/30 to-pink-500/30',
    features: ['Interactive Course Library', 'AI-Powered Study Assistant', 'Real-time Progress Analytics', 'Collaborative Learning Tools'],
    responsibilities: ['Engage with interactive coursework', 'Participate in virtual classrooms', 'Track your academic journey', 'Access premium learning materials']
  },
  faculty: {
    title: 'Faculty',
    description: 'Empower your teaching with advanced course creation tools, intelligent student analytics, and streamlined academic management in one beautiful interface.',
    icon: Users,
    gradient: 'from-emerald-500/30 via-teal-500/30 to-cyan-500/30',
    features: ['Advanced Course Builder', 'Student Insights Dashboard', 'Intelligent Grading System', 'Collaboration Hub'],
    responsibilities: ['Design engaging course experiences', 'Monitor student performance', 'Provide personalized feedback', 'Foster academic excellence']
  },
  admin: {
    title: 'Administrator',
    description: 'Take control of your institution with comprehensive system management, advanced analytics, and powerful administrative tools designed for educational excellence.',
    icon: Shield,
    gradient: 'from-orange-500/30 via-amber-500/30 to-yellow-500/30',
    features: ['System Command Center', 'Advanced User Management', 'Institutional Analytics', 'Security & Compliance'],
    responsibilities: ['Orchestrate institutional operations', 'Ensure system excellence', 'Drive data-informed decisions', 'Maintain security standards']
  }
};

export function RoleSelectionPage() {
  const navigate = useNavigate();
  const { setTheme } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<UserRole | null>(null);

  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    setTheme('system');
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setTheme, mouseX, mouseY]);

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
              "radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Premium cursor follower */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
          mass: 0.3
        }}
      >
        <div className="w-full h-full bg-white/40 rounded-full backdrop-blur-sm border border-white/20" />
        <motion.div
          className="absolute inset-1 bg-primary/60 rounded-full"
          animate={{
            scale: hoveredCard ? [1, 1.5, 1] : 1,
            opacity: hoveredCard ? [0.6, 1, 0.6] : 0.6
          }}
          transition={{
            duration: 2,
            repeat: hoveredCard ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-16"
          style={{
            perspective: "1000px"
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
            className="inline-block mb-6"
            style={{
              rotateX: rotateX,
              rotateY: rotateY
            }}
          >
            <div className="relative">
              <Badge variant="secondary" className="px-6 py-3 text-base font-medium bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 text-primary border border-primary/20 backdrop-blur-xl shadow-2xl">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                Choose Your Role
                <Star className="w-4 h-4 ml-2 text-yellow-500" />
              </Badge>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.3 }}
            style={{
              textShadow: "0 0 40px rgba(0,0,0,0.1)"
            }}
          >
            Welcome to EduSync
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Select your role to unlock a personalized experience crafted specifically for your educational journey
          </motion.p>
        </motion.div>

        {/* Role cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{ perspective: "1200px" }}
        >
          {(Object.entries(roleConfig) as [UserRole, RoleConfig][]).map(([role, config], index) => {
            const Icon = config.icon;
            const isSelected = selectedRole === role;
            const isHovered = hoveredCard === role;
            
            return (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 80, rotateX: 15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  scale: isSelected ? 1.05 : 1
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1 + index * 0.15,
                  type: "spring",
                  bounce: 0.3
                }}
                whileHover={{ 
                  y: -15,
                  rotateX: 5,
                  rotateY: index === 1 ? 0 : index === 0 ? 8 : -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer relative"
                onClick={() => handleRoleSelect(role)}
                onHoverStart={() => setHoveredCard(role)}
                onHoverEnd={() => setHoveredCard(null)}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${config.gradient.replace('/20', '/30').replace('/30', '/40')})`,
                    filter: "blur(20px)",
                    transform: "translateZ(-1px) scale(1.1)"
                  }}
                />
                
                <Card className={`relative h-full transition-all duration-700 border-0 overflow-hidden group-hover:shadow-2xl ${
                  isSelected 
                    ? 'shadow-2xl shadow-primary/20' 
                    : 'shadow-lg hover:shadow-primary/10'
                }`}>
                  {/* Glass morphism background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-xl" />
                  
                  {/* Gradient overlay */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${config.gradient} transition-opacity duration-500`}
                    animate={{
                      opacity: isSelected ? 0.4 : isHovered ? 0.3 : 0.15
                    }}
                  />
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    animate={{
                      background: isSelected 
                        ? `linear-gradient(135deg, transparent, ${config.gradient.split(' ')[1]?.replace('/30', '/60') || 'rgba(59, 130, 246, 0.6)'}, transparent)`
                        : "transparent"
                    }}
                    style={{
                      padding: "1px",
                      background: isSelected ? undefined : "linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent)"
                    }}
                  >
                    <div className="w-full h-full bg-transparent rounded-3xl" />
                  </motion.div>
                  
                  <CardContent className="relative p-8 h-full flex flex-col z-10">
                    {/* Icon section */}
                    <div className="flex items-center justify-between mb-8">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className={`p-5 rounded-3xl backdrop-blur-sm border border-white/20 transition-all duration-500 ${
                            isSelected 
                              ? 'bg-white/20 shadow-2xl' 
                              : 'bg-white/10 group-hover:bg-white/20 group-hover:shadow-xl'
                          }`}
                          animate={{
                            boxShadow: isSelected 
                              ? "0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
                              : "0 10px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)"
                          }}
                        >
                          <Icon className="w-10 h-10 text-foreground/90 drop-shadow-sm" />
                        </motion.div>
                        
                        {/* Floating particles around icon */}
                        <AnimatePresence>
                          {isHovered && (
                            <>
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-1 h-1 bg-primary/60 rounded-full"
                                  initial={{ 
                                    opacity: 0,
                                    x: 0,
                                    y: 0,
                                    scale: 0
                                  }}
                                  animate={{ 
                                    opacity: [0, 1, 0],
                                    x: (Math.random() - 0.5) * 60,
                                    y: (Math.random() - 0.5) * 60,
                                    scale: [0, 1, 0]
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                  }}
                                  style={{
                                    left: "50%",
                                    top: "50%"
                                  }}
                                />
                              ))}
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -180 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0, rotate: 180 }}
                            transition={{ type: "spring", damping: 15, stiffness: 300 }}
                          >
                            <div className="p-2 rounded-full bg-primary/20 backdrop-blur-sm">
                              <CheckCircle2 className="w-6 h-6 text-primary" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Title */}
                    <motion.h3 
                      className="text-3xl font-bold mb-4 text-foreground/90"
                      animate={{
                        color: isSelected ? "rgba(var(--primary), 0.9)" : "rgba(var(--foreground), 0.9)"
                      }}
                    >
                      {config.title}
                    </motion.h3>
                    
                    {/* Compact description */}
                    <motion.p 
                      className="text-muted-foreground/80 mb-6 leading-relaxed text-base font-light"
                      animate={{
                        opacity: isSelected ? 1 : 0.8
                      }}
                    >
                      {config.description.split('.')[0]}.
                    </motion.p>

                    {/* Feature highlights */}
                    <div className="space-y-3 flex-grow">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-primary/80">Key Features</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {config.features.slice(0, 3).map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + idx * 0.1 }}
                            className="flex items-center gap-3 p-2 rounded-xl bg-background/20 backdrop-blur-sm border border-white/10"
                          >
                            <motion.div 
                              className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"
                              animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{
                                duration: 2,
                                delay: idx * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <span className="text-sm font-medium text-foreground/80">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Role Description Section - Apple-style slide-up */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200,
                delay: 0.1
              }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="relative">
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${roleConfig[selectedRole].gradient.replace('/30', '/50')})`
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative bg-background/60 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                      className="inline-flex items-center gap-3 mb-4"
                    >
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${roleConfig[selectedRole].gradient} shadow-xl`}>
                        {React.createElement(roleConfig[selectedRole].icon, { 
                          className: "w-8 h-8 text-white drop-shadow-sm" 
                        })}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {roleConfig[selectedRole].title} Experience
                      </h2>
                    </motion.div>
                    
                    <motion.p 
                      className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed max-w-3xl mx-auto font-light"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {roleConfig[selectedRole].description}
                    </motion.p>
                  </div>

                  {/* Enhanced features grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Core Features
                      </h4>
                      <div className="space-y-3">
                        {roleConfig[selectedRole].features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-background/40 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300"
                          >
                            <motion.div 
                              className="w-2 h-2 bg-primary rounded-full flex-shrink-0"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{
                                duration: 2,
                                delay: idx * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <span className="font-medium text-foreground/90">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-secondary flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Your Journey
                      </h4>
                      <div className="space-y-3">
                        {roleConfig[selectedRole].responsibilities.map((responsibility, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-background/40 backdrop-blur-sm border border-white/10 hover:border-secondary/30 transition-all duration-300"
                          >
                            <motion.div 
                              className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{
                                duration: 2,
                                delay: idx * 0.2 + 0.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <span className="font-medium text-foreground/90">{responsibility}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Continue Button */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 200,
                delay: 0.3
              }}
              className="text-center"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                style={{ perspective: "1000px" }}
              >
                <Button
                  onClick={handleContinue}
                  size="lg"
                  className="relative px-16 py-6 text-xl font-semibold rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-2xl border-0 group overflow-hidden backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${roleConfig[selectedRole].gradient.replace('/30', '/80')})`
                  }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center">
                    Continue as {roleConfig[selectedRole].title}
                    <motion.div
                      animate={{
                        x: [0, 5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ChevronRight className="w-6 h-6 ml-3" />
                    </motion.div>
                  </span>
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${roleConfig[selectedRole].gradient.replace('/30', '/60')})`,
                      filter: "blur(10px)",
                      transform: "scale(1.1)"
                    }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}