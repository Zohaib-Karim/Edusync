import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  Bell, 
  BarChart3, 
  ArrowRight, 
  Sparkles,
  Clock,
  Brain,
  Zap
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

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
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
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
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          {...staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div {...fadeInUp} className="mb-8">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium glass">
              <Sparkles className="w-4 h-4 mr-2" />
              Introducing EduSync 2.0
            </Badge>
          </motion.div>

          <motion.h1 {...fadeInUp} className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent leading-tight">
            EduSync
          </motion.h1>

          <motion.p {...fadeInUp} className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            Smart Scheduling. Seamless Learning.
          </motion.p>

          <motion.p {...fadeInUp} className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your academic institution with AI-powered scheduling that adapts to your needs. 
            Experience the future of educational management.
          </motion.p>

          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="px-8 py-6 text-lg font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-medium glass hover:bg-background/50 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          {...staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
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
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="h-full glass hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
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