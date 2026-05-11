import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Briefcase, 
  Search, 
  Bell, 
  Plus, 
  TrendingUp,
  LayoutDashboard,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Sun,
  Moon,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MatchGauge, SkillHeatmap } from '@/components/Visuals';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ResumeUpload from '@/components/ResumeUpload';
import InterviewSimulator from '@/components/InterviewSimulator';
import JobsManager from '@/components/JobsManager';
import ResumeList from '@/components/ResumeList';
import CandidateList from '@/components/CandidateList';
import { Link } from 'react-router-dom';

import { checkBackendHealth } from '@/lib/api';

const data = [
  { name: 'Mon', score: 65 }, { name: 'Tue', score: 72 }, { name: 'Wed', score: 68 },
  { name: 'Thu', score: 85 }, { name: 'Fri', score: 92 }, { name: 'Sat', score: 88 },
  { name: 'Sun', score: 95 },
];


const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const verifyStatus = async () => {
      const healthy = await checkBackendHealth();
      setIsOnline(healthy);
    };
    verifyStatus();
    const interval = setInterval(verifyStatus, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);
  const [activeTab, setActiveTab] = useState('overview');
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

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Overview", id: "overview" },
    { icon: <Briefcase size={20} />, label: "Jobs", id: "jobs" },
    { icon: <FileText size={20} />, label: "Resumes", id: "resumes" },
    { icon: <MessageSquare size={20} />, label: "Interviews", id: "interviews" },
    { icon: <Users size={20} />, label: "Candidates", id: "candidates" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background selection:bg-primary/20">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="border-r border-border p-4 flex flex-col gap-8 bg-surface/30 backdrop-blur-md relative z-20"
      >
        <Link to="/" className="flex items-center gap-3 px-3 py-2 group cursor-pointer">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0 group-hover:scale-110 transition-transform">
            <Cpu className="text-white w-5 h-5" />
          </div>
          {isSidebarOpen && <span className="text-xl font-heading font-bold tracking-tight">EchoAI</span>}
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${activeTab === item.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-text-secondary hover:bg-surface-accent hover:text-text-primary'}`}
            >
              <div className="shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
            </div>
          ))}
        </nav>

        <div className="pt-6 border-t border-border space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-text-secondary hover:bg-surface-accent hover:text-text-primary">
            <Settings size={20} />
            {isSidebarOpen && <span className="font-medium text-sm">Settings</span>}
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-red-400 hover:bg-red-500/10">
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative scroll-smooth">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[140px] pointer-events-none" />
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Recruiter Hub</h1>
            <p className="text-text-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              8 new resumes received today
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isOnline && (
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 gap-1.5 px-3 py-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Backend Offline
              </Badge>
            )}
            {isOnline && (
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 gap-1.5 px-3 py-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                System Online
              </Badge>
            )}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="w-11 h-11 flex items-center justify-center rounded-xl glass hover:bg-surface-accent transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-secondary" /> : <Moon className="w-5 h-5 text-primary" />}
            </button>
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search candidates..." 
                className="bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all w-72"
              />
            </div>
            <Button variant="outline" size="icon" className="glass rounded-xl h-11 w-11 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </Button>
            <Button 
              onClick={() => setActiveTab('jobs')}
              className="h-11 px-6 bg-primary text-primary-foreground rounded-xl font-bold shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus className="w-4 h-4 mr-2" /> Create Job
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass p-1 rounded-2xl flex flex-wrap h-auto gap-1">
            <TabsTrigger value="overview" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Overview</TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Jobs</TabsTrigger>
            <TabsTrigger value="resumes" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Resumes</TabsTrigger>
            <TabsTrigger value="candidates" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Candidates</TabsTrigger>
            <TabsTrigger value="interviews" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Interviews</TabsTrigger>
            <TabsTrigger value="upload" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Quick Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 mt-0">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Open Roles", value: "14", trend: "+2", icon: <Briefcase /> },
                { label: "Total Applicants", value: "2,842", trend: "+124", icon: <FileText /> },
                { label: "AI Matches", value: "186", trend: "+12", icon: <Users /> },
                { label: "Interviews", value: "48", trend: "+6", icon: <MessageSquare /> },
              ].map((stat, i) => (
                <Card key={i} className="glass p-6 group hover:border-primary/40 transition-all cursor-default">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {stat.icon}
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-none font-bold">
                      {stat.trend}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
                  <h3 className="text-3xl font-bold tracking-tight mt-1">{stat.value}</h3>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Analytics Chart */}
              <Card className="xl:col-span-2 glass p-8">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">Talent Acquisition Trend</h3>
                    <p className="text-xs text-text-secondary mt-1">Daily candidate match volume</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-widest">Week</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-widest text-text-secondary">Month</Button>
                  </div>
                </div>
                <div className="h-[340px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickMargin={10} />
                      <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickMargin={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                        itemStyle={{ color: 'var(--foreground)' }}
                        cursor={{ stroke: 'var(--primary)', strokeWidth: 1 }}
                      />
                      <Area type="monotone" dataKey="score" stroke="var(--primary)" fillOpacity={1} fill="url(#chartGradient)" strokeWidth={4} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Top Candidates Sidebar */}
              <Card className="glass p-8 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold tracking-tight">Top Picks</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary"><Filter size={16} /></Button>
                </div>
                <div className="space-y-8 flex-1">
                  {[
                    { name: "Alex Rivera", role: "Senior Frontend Eng.", score: 98, color: "bg-purple-500" },
                    { name: "Sofia Chen", role: "Python Developer", score: 95, color: "bg-blue-500" },
                    { name: "Jordan Smith", role: "DevOps Lead", score: 92, color: "bg-emerald-500" },
                    { name: "Maria Garcia", role: "UI/UX Specialist", score: 89, color: "bg-pink-500" },
                  ].map((c, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${c.color} rounded-2xl flex items-center justify-center font-bold text-white shadow-lg shadow-${c.color.split('-')[1]}-500/20`}>
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-sm group-hover:text-primary transition-colors">{c.name}</p>
                          <p className="text-[11px] text-text-secondary uppercase font-bold tracking-wider">{c.role}</p>
                        </div>
                      </div>
                      <MatchGauge score={c.score} size={50} />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-10">
                   <h3 className="text-sm font-bold tracking-tight mb-4 uppercase opacity-50">Skill Density</h3>
                   <SkillHeatmap />
                </div>
                <Button 
                  variant="secondary" 
                  onClick={() => setActiveTab('candidates')}
                  className="w-full mt-8 h-12 rounded-xl font-bold"
                >
                  View Full Rankings <ChevronRight size={16} className="ml-1" />
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="mt-0">
            <JobsManager />
          </TabsContent>

          <TabsContent value="resumes" className="mt-0">
            <ResumeList />
          </TabsContent>

          <TabsContent value="candidates" className="mt-0">
            <CandidateList />
          </TabsContent>

          <TabsContent value="upload" className="max-w-3xl mx-auto mt-0">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-4xl font-black tracking-tight">Intelligence Gateway</h2>
              <p className="text-text-secondary text-lg">Upload resumes to trigger the Groq-powered analysis engine</p>
            </div>
            <ResumeUpload onUploadSuccess={() => console.log('Refresh data')} />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass p-8 flex gap-6 items-start hover:border-primary/40 transition-all group">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-500">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h4 className="font-black text-lg mb-1">Batch Processing</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">Upload up to 50 resumes at once for parallel processing with Llama 3.</p>
                </div>
              </Card>
              <Card className="glass p-8 flex gap-6 items-start hover:border-primary/40 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Cpu size={28} />
                </div>
                <div>
                  <h4 className="font-black text-lg mb-1">AI Skill Audit</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">Deep analysis of implicit skills and experience relevance using vector embeddings.</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="interviews" className="mt-0">
             <div className="text-center mb-10 space-y-2">
              <h2 className="text-4xl font-black tracking-tight">Interview Simulator</h2>
              <p className="text-text-secondary text-lg">Practice with our Groq-powered AI recruiter to refine your pitch</p>
            </div>
            <InterviewSimulator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};



export default Dashboard;
