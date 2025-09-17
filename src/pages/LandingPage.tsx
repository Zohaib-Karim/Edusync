import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Calendar, 
  Users, 
  Bell, 
  BarChart3, 
  ArrowRight, 
  Sparkles,
  Clock,
  Brain,
  Zap,
  Star,
  ChevronDown,
  Play,
  Shield,
  Rocket,
  Heart,
  Globe
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const featuresY = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Scheduling",
      description: "Intelligent algorithms optimize your academic schedule automatically",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Users,
      title: "Faculty Workload Balance",
      description: "Distribute teaching loads fairly across all faculty members",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Stay updated with instant alerts for schedule changes and updates",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into scheduling patterns and optimization opportunities",
      gradient: "from-green-500/20 to-emerald-500/20"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          {...staggerContainer}
          initial="initial"
          animate="animate"
          style={{ y: heroY }}
        >
          <motion.div {...fadeInUp} className="mb-8">
            <motion.div 
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Badge variant="secondary" className="mb-6 px-6 py-3 text-base font-medium glass backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-300">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                Introducing EduSync 2.0
                <Star className="w-4 h-4 ml-2 text-yellow-500" />
              </Badge>
            </motion.div>
          </motion.div>

          <motion.h1 
            {...fadeInUp} 
            className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent leading-tight tracking-tight"
            whileHover={{ 
              scale: 1.02,
              textShadow: "0 0 20px rgba(0,0,0,0.1)" 
            }}
          >
            EduSync
          </motion.h1>

          <motion.p {...fadeInUp} className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            Smart Scheduling. Seamless Learning.
          </motion.p>

          <motion.p {...fadeInUp} className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your academic institution with AI-powered scheduling that adapts to your needs. 
            Experience the future of educational management.
          </motion.p>

          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="px-10 py-7 text-xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-2xl transition-all duration-500 relative overflow-hidden group backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-7 text-xl font-medium glass hover:bg-background/60 transition-all duration-300 backdrop-blur-xl border-primary/20 hover:border-primary/40"
              >
                <Play className="mr-3 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-8 h-12 border-2 border-primary/40 rounded-full flex justify-center group-hover:border-primary transition-colors duration-300 backdrop-blur-sm bg-background/20">
            <motion.div 
              className="w-1.5 h-4 bg-primary/60 rounded-full mt-2 group-hover:bg-primary transition-colors duration-300"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <motion.div 
            className="mt-2 flex justify-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <ChevronDown className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors duration-300" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          {...staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-150px" }}
          style={{ y: featuresY }}
        >
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage academic schedules with precision and intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                {...fadeInUp}
                whileHover={{ 
                  scale: 1.08,
                  rotateY: 8,
                  rotateX: 5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
              >
                <Card className="h-full glass hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-background/60 to-background/40 backdrop-blur-2xl hover:backdrop-blur-3xl overflow-hidden relative group-hover:border-primary/20">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <CardContent className="p-8 relative z-10">
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <feature.icon className="w-7 h-7 text-white drop-shadow-sm" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Showcase Section */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-br from-background to-muted/30">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          {...staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience EduSync
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our intuitive dashboard transforms complex scheduling into simple, elegant workflows
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="relative">
            {/* Mock device frame */}
            <div className="relative mx-auto max-w-4xl">
              <div className="glass rounded-3xl p-8 shadow-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-2xl border border-border/50">
                {/* Mock dashboard content */}
                <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center"
                    >
                      <Clock className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-2">Dashboard Preview</h3>
                    <p className="text-muted-foreground">Interactive demo coming soon</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          {...staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of educators who have revolutionized their scheduling with EduSync
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="px-12 py-8 text-xl font-medium bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <Zap className="ml-3 w-6 h-6" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EduSync
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Smart Scheduling. Seamless Learning.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Support
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/30 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 EduSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;