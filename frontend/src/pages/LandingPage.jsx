import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Cpu, 
  BarChart3, 
  ArrowRight, 
  Code2, 
  Sun, 
  Moon, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  CheckCircle2, 
  Rocket, 
  Star,
  Layers,
  Sparkles,
  MousePointer2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="relative w-full overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full animate-pulse-slow delay-1000 pointer-events-none" />

      {/* Navigation */}
      <div className={`sticky top-0 z-50 w-full flex justify-center transition-all duration-500 ease-in-out ${scrolled ? 'pt-2 px-2 pb-1' : 'pt-4 px-4 pb-2'}`}>
        <nav className={`w-full max-w-7xl flex items-center justify-between transition-all duration-500 ease-in-out ${scrolled ? 'px-6 py-3 rounded-2xl bg-background/80 shadow-2xl shadow-primary/10 border-b border-primary/10' : 'px-8 py-4 rounded-3xl bg-background/60 shadow-lg'} glass backdrop-blur-xl`}>
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className={`bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-all duration-500 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <Cpu className={`text-white transition-all duration-500 ${scrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
            </div>
            <span className={`font-heading font-bold tracking-tighter transition-all duration-500 ${scrolled ? 'text-xl' : 'text-2xl'}`}>EchoAI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-text-secondary">
            <a href="#features" className="hover:text-primary transition-colors relative group/link">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover/link:w-full" />
            </a>
            <a href="#workflow" className="hover:text-primary transition-colors relative group/link">
              Workflow
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover/link:w-full" />
            </a>
            <a href="#pricing" className="hover:text-primary transition-colors relative group/link">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover/link:w-full" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 flex items-center justify-center rounded-xl glass hover:bg-surface-accent transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-secondary" /> : <Moon className="w-5 h-5 text-primary" />}
            </button>
            <Link to="/get-started" className={`bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold transition-all shadow-xl shadow-primary/30 hover:scale-[1.05] active:scale-[0.95] flex items-center justify-center ${scrolled ? 'px-5 py-2 text-xs' : 'px-6 py-2.5 text-sm'}`}>
              Get Started
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mt-8 mb-8 text-xs font-bold tracking-[0.2em] uppercase bg-surface-accent/50 backdrop-blur-md border border-primary/20 rounded-full text-primary animate-float">
            Intelligence Meets Recruitment
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl mb-10 leading-none font-black tracking-tighter">
            Screen Resumes <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">
              in Seconds.
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-text-secondary mb-14 font-medium leading-relaxed">
            The ultimate AI-powered recruitment engine. Parse, score, and interview candidates with <span className="text-foreground font-bold">Groq-speed</span> intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-xl hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_20px_50px_rgba(var(--primary),0.3)] group">
              Start Screening <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 glass text-text-primary rounded-2xl font-bold text-xl hover:bg-surface-accent transition-all border-primary/10">
              <Code2 className="w-6 h-6" /> Star on GitHub
            </button>
          </div>
        </motion.div>

        {/* Floating UI Elements (Abstract) */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background z-10 h-20 top-[-20px]" />
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="glass p-10 md:p-16 rounded-[40px] border-primary/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                { icon: <FileText className="w-8 h-8" />, title: "Instant Parsing", desc: "Extract skills and experience from any PDF or Docx in milliseconds.", color: "text-primary" },
                { icon: <Cpu className="w-8 h-8" />, title: "Groq Intelligence", desc: "Powered by the world's fastest LLM inference engine for deep analysis.", color: "text-secondary" },
                { icon: <BarChart3 className="w-8 h-8" />, title: "Vector Matching", desc: "Semantic similarity scoring that goes far beyond simple keywords.", color: "text-accent" }
              ].map((item, i) => (
                <div key={i} className="text-left space-y-6 group/item">
                  <div className={`w-16 h-16 bg-surface-accent rounded-2xl flex items-center justify-center ${item.color} group-hover/item:scale-110 transition-transform duration-500 shadow-inner`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p className="text-base text-text-secondary leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="relative z-10 py-10 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 space-y-4">
          <span className="text-xs font-black tracking-widest uppercase text-primary px-3 py-1 bg-primary/10 rounded-full">Core Capabilities</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Engineered for Excellence.</h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-lg font-medium">A suite of cutting-edge tools designed to redefine the hiring experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="w-8 h-8" />, title: "Sub-Second Inference", desc: "Experience 10x faster resume analysis with Groq's dedicated LPU architecture.", color: "bg-amber-500" },
            { icon: <Shield className="w-8 h-8" />, title: "Neural Privacy", desc: "Enterprise-grade encryption for all candidate data with anonymized AI processing.", color: "bg-indigo-500" },
            { icon: <Globe className="w-8 h-8" />, title: "Global Talent Pool", desc: "Support for 50+ languages with culture-aware semantic scoring.", color: "bg-blue-500" },
            { icon: <Sparkles className="w-8 h-8" />, title: "Implicit Skill Discovery", desc: "Identify hidden talents that traditional keyword filters always miss.", color: "bg-purple-500" },
            { icon: <Layers className="w-8 h-8" />, title: "API First Design", desc: "Seamlessly integrate EchoAI into your existing HR tech stack or ATS.", color: "bg-emerald-500" },
            { icon: <Users className="w-8 h-8" />, title: "Collaborative Review", desc: "Share candidate insights and AI reports with your entire team in real-time.", color: "bg-rose-500" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[32px] group hover:border-primary/40 transition-all cursor-default relative overflow-hidden"
            >
              <div className={`absolute top-[-20%] left-[-20%] w-[50%] h-[50%] ${feature.color} blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
              <div className="space-y-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-surface/20 ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold tracking-tight">{feature.title}</h4>
                <p className="text-text-secondary leading-relaxed font-medium">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="relative z-10 py-32 bg-surface/30 backdrop-blur-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-8">
              <span className="text-xs font-black tracking-widest uppercase text-secondary">The Ecosystem</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Seamless <br /><span className="text-secondary">Intelligence.</span></h2>
              <div className="space-y-10 mt-12">
                {[
                  { step: "01", title: "Smart Ingestion", desc: "Drop your resumes into the Intelligence Gateway for instant vectorization." },
                  { step: "02", title: "Cognitive Scoring", desc: "AI calculates match probability based on job requirements and implicit experience." },
                  { step: "03", title: "Automated Interaction", desc: "EchoAI conducts an initial screening call to verify technical proficiency." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-4xl font-black text-secondary/20 group-hover:text-secondary transition-colors duration-500">{item.step}</div>
                    <div className="space-y-2 pt-1.5">
                      <h4 className="text-xl font-bold tracking-tight">{item.title}</h4>
                      <p className="text-text-secondary font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative glass rounded-[40px] p-4 aspect-square flex items-center justify-center border-white/5"
              >
                <div className="w-full h-full rounded-[32px] bg-linear-to-br from-surface to-background flex items-center justify-center p-8">
                   <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute w-[80%] h-[80%] border-2 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
                      <div className="absolute w-[60%] h-[60%] border-2 border-dashed border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                      <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/40 z-10 animate-float">
                        <Rocket className="text-white w-10 h-10" />
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 glass px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">Parsing PDF</div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 glass px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-secondary">Neural Scoring</div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 pt-20 pb-8 px-8 max-w-7xl mx-auto text-center">
        <div className="mb-24 space-y-4">
          <span className="text-xs font-black tracking-widest uppercase text-accent">Pricing Tiers</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Scale your Speed.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {[
            { plan: "Starter", price: "$0", features: ["Up to 50 resumes/mo", "Llama 3 Base Model", "Basic Analytics", "Community Support"], button: "Start for Free", active: false },
            { plan: "Professional", price: "$99", features: ["Unlimited Resumes", "Llama 3.1 70B Model", "Advanced Match Index", "AI Interview Simulator", "Priority Support"], button: "Go Pro Now", active: true },
            { plan: "Enterprise", price: "Custom", features: ["Custom Vector Store", "Dedicated LPU Instance", "On-premise Deployment", "24/7 Concierge Support", "White-label Portal"], button: "Contact Sales", active: false }
          ].map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[40px] flex flex-col h-full relative group ${tier.active ? 'glass-accent scale-105 z-20 border-accent/20' : 'glass'}`}
            >
              {tier.active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-accent text-accent-foreground rounded-full text-xs font-black tracking-[0.2em] uppercase shadow-xl shadow-accent/40">Most Popular</div>
              )}
              <div className="text-left mb-10">
                <h3 className="text-2xl font-black tracking-tight mb-2 uppercase opacity-60">{tier.plan}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-text-secondary font-bold">/mo</span>}
                </div>
              </div>
              <ul className="space-y-5 text-left flex-1 mb-12">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-text-secondary font-medium">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${tier.active ? 'text-accent' : 'text-primary'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className={`w-full h-14 rounded-2xl font-black text-lg transition-all ${tier.active ? 'bg-accent text-accent-foreground shadow-2xl shadow-accent/20 hover:scale-105' : 'bg-surface-accent text-text-primary hover:bg-surface-accent/80'}`}>
                {tier.button}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10  px-8 border-t border-border/50 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter">EchoAI</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-12 text-sm font-bold text-text-secondary uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          </div>
          <div className="text-text-secondary font-medium">
            © 2024 EchoAI. Built with Groq & Llama 3.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
