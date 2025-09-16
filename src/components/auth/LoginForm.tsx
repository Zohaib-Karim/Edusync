import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onToggleForm: () => void;
  onShowResetPassword: () => void;
}

export function LoginForm({ onToggleForm, onShowResetPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');
  
  const { login, verify2FA, isLoading } = useAuthStore();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      setShow2FA(true);
      toast({
        title: "Login Successful",
        description: "Please enter the 2FA code sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Login Failed", 
        description: "Invalid email or password. Try: admin@smartclass.edu with password 'password'",
        variant: "destructive",
      });
    }
  };

  const handle2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const isValid = await verify2FA(twoFACode);
      if (isValid) {
        toast({
          title: "Welcome!",
          description: "You have successfully logged in.",
        });
      } else {
        toast({
          title: "Invalid Code",
          description: "Please try again. Use: 123456",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 gradient-primary rounded-full flex items-center justify-center mb-2">
            <Lock className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {show2FA ? 'Two-Factor Authentication' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {show2FA 
              ? 'Enter the verification code sent to your email' 
              : 'Sign in to your Smart Classroom account'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!show2FA ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@smartclass.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={onShowResetPassword}
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              
              <Button type="submit" variant="gradient" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onToggleForm}
                  className="text-primary hover:underline"
                >
                  Sign up
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handle2FA} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twofa">Verification Code</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="twofa"
                    type="text"
                    placeholder="123456"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value)}
                    className="pl-10 text-center tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" variant="gradient" className="w-full">
                Verify
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setShow2FA(false)}
              >
                Back to Login
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}