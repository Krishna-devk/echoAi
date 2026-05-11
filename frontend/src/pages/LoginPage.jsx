import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, Mail, Lock, Sun, Moon, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 md:p-8 selection:bg-primary/20">
      {/* Theme Toggle */}
      <div className="fixed top-8 right-8 z-50">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="w-12 h-12 flex items-center justify-center rounded-2xl glass hover:bg-surface-accent transition-all duration-300 shadow-xl"
        >
          {isDark ? <Sun className="w-6 h-6 text-secondary" /> : <Moon className="w-6 h-6 text-primary" />}
        </button>
      </div>

      <motion.div 
        layout
        className="w-full max-w-[1200px] bg-card rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row border border-border/50 relative min-h-[700px]"
      >
        <AnimatePresence mode="wait">
          {!isRegister ? (
            /* Login Mode: Image Left, Form Right */
            <motion.div 
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col md:flex-row w-full"
            >
              {/* Left: Testimonial Image */}
              <div className="hidden md:block w-1/2 relative bg-surface overflow-hidden">
                <img 
                  src="/recruiter_testimonial_image.png" 
                  alt="Recruiter Testimonial" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-3xl font-bold text-white mb-6 leading-tight">
                      "Simply all the tools that my team and I need."
                    </p>
                    <div>
                      <p className="text-white font-bold text-lg">Karen Yue</p>
                      <p className="text-white/70 text-sm">Director of Digital Marketing Technology</p>
                    </div>
                  </motion.div>
                </div>
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 group cursor-pointer z-20">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cpu className="text-white w-5 h-5" />
                  </div>
                  <span className="text-white font-black tracking-tighter text-xl">EchoAI</span>
                </Link>
              </div>

              {/* Right: Login Form */}
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-12 bg-card">
                <div className="w-full max-w-sm space-y-10">
                  <div className="text-center md:text-left space-y-2">
                    <h1 className="text-4xl font-black tracking-tighter">Welcome back</h1>
                    <p className="text-text-secondary font-medium">Build your design system effortlessly with our powerful component library.</p>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
                        <Input 
                          type="email" 
                          placeholder="alex.jordan@gmail.com" 
                          className="h-14 pl-12 rounded-2xl bg-surface/50 border-border/50 focus:border-primary/50 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Password</label>
                        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot password?</button>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
                        <Input 
                          type="password" 
                          placeholder="••••••••••••" 
                          className="h-14 pl-12 rounded-2xl bg-surface/50 border-border/50 focus:border-primary/50 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-1 py-2">
                      <span className="text-sm font-bold text-text-secondary">Remember sign in details</span>
                      <Switch className="data-[state=checked]:bg-primary" />
                    </div>

                    <Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                      Log in
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div>
                    <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                      <span className="bg-card px-4 text-text-secondary">OR</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" className="h-14 rounded-2xl border-border/50 bg-surface/30 font-bold flex items-center justify-center gap-3 hover:bg-surface-accent transition-all">
                      <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                      Continue with Google
                    </Button>
                  </div>

                  <p className="text-center text-sm font-medium text-text-secondary">
                    Don't have an account? <button onClick={() => setIsRegister(true)} className="text-primary font-bold hover:underline">Sign up</button>
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Register Mode: Form Left, Illustration Right */
            <motion.div 
              key="register"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col md:flex-row w-full"
            >
              {/* Left: Register Form */}
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-12 bg-card">
                <div className="w-full max-w-sm space-y-10">
                  <Link to="/" className="flex items-center gap-3 mb-8 group cursor-pointer">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Cpu className="text-white w-5 h-5" />
                    </div>
                    <span className="font-black tracking-tighter text-xl">EchoAI</span>
                  </Link>

                  <div className="space-y-4">
                    <h1 className="text-4xl font-black tracking-tighter leading-tight">Holla, <br />Welcome to EchoAI</h1>
                    <p className="text-text-secondary font-medium">Create your account to start your journey.</p>
                  </div>

                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1.5 group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Username</label>
                        <Input 
                          type="text" 
                          placeholder="johndoe_ai" 
                          className="h-12 px-4 rounded-xl bg-surface/50 border-border/50 focus:border-primary/50 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-1.5 group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                        <Input 
                          type="email" 
                          placeholder="stanley@gmail.com" 
                          className="h-12 px-4 rounded-xl bg-surface/50 border-border/50 focus:border-primary/50 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Password</label>
                      <Input 
                        type="password" 
                        placeholder="••••••••••••" 
                        className="h-12 px-4 rounded-xl bg-surface/50 border-border/50 focus:border-primary/50 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Account Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-primary bg-primary/10 text-primary transition-all">
                          <Users className="w-5 h-5 mb-1" />
                          <span className="text-[10px] font-black uppercase">Recruiter</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-border/50 hover:border-primary/50 text-text-secondary hover:text-primary transition-all">
                          <User className="w-5 h-5 mb-1" />
                          <span className="text-[10px] font-black uppercase">Candidate</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-1 py-1">
                      <Checkbox id="remember" className="rounded-md data-[state=checked]:bg-primary" />
                      <label htmlFor="remember" className="text-xs font-bold text-text-secondary cursor-pointer">Agree to Terms & Privacy</label>
                    </div>

                    <Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                      Create Account
                    </Button>
                  </form>

                  <p className="text-sm font-medium text-text-secondary pt-10">
                    Already have an account <button onClick={() => setIsRegister(false)} className="text-primary font-bold hover:underline">Log in</button>
                  </p>
                </div>
              </div>

              {/* Right: Illustration */}
              <div className="hidden md:block w-1/2 relative bg-linear-to-br from-primary/10 to-secondary/10 overflow-hidden items-center justify-center p-20">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-secondary/20" />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 w-full h-full flex items-center justify-center"
                >
                <img 
                  src="/ai_recruitment_illustration.png" 
                  alt="AI Illustration" 
                  className="max-w-full max-h-full object-contain drop-shadow-2xl"
                />
                </motion.div>
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[80px] rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LoginPage;
