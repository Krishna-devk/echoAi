import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Send, 
  User, 
  Bot, 
  Settings, 
  Maximize2, 
  Volume2, 
  MessageSquare,
  Trophy,
  Target,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Message = ({ text, sender, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: sender === 'ai' ? -20 : 20, y: 10 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className={`flex ${sender === 'ai' ? 'justify-start' : 'justify-end'} mb-6`}
  >
    <div className={`flex gap-3 max-w-[80%] ${sender === 'user' ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${sender === 'ai' ? 'bg-primary text-white' : 'bg-surface-accent border border-border text-text-primary'}`}>
        {sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${sender === 'ai' ? 'glass border-l-2 border-l-primary' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}>
        {text}
      </div>
    </div>
  </motion.div>
);

const Waveform = () => (
  <div className="flex items-center gap-1 h-6">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <motion.div
        key={i}
        animate={{ height: [4, 12, 6, 16, 4] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
        className="w-1 bg-primary rounded-full"
      />
    ))}
  </div>
);

const SentientAvatar = ({ isTalking }) => (
  <div className="relative">
    <motion.div 
      animate={isTalking ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center text-primary border border-primary/30 relative z-10"
    >
      <Bot size={32} />
    </motion.div>
    {isTalking && (
      <>
        <motion.div 
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 bg-primary/30 rounded-3xl z-0"
        />
        <motion.div 
          animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-secondary/20 rounded-3xl -z-10"
        />
      </>
    )}
  </div>
);

const InterviewSimulator = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Echo, your AI Interviewer. Today we'll be discussing your experience with React and Distributed Systems. Are you ready to begin?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newUserMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, newUserMsg]);
    setInput('');
    
    // Simulate AI thinking
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "That's a great answer. Can you dive deeper into how you managed state synchronization across micro-frontends in your last project?", 
        sender: 'ai' 
      }]);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-250px)]">
      {/* Simulation Main View */}
      <Card className="lg:col-span-3 glass flex flex-col overflow-hidden relative border-none">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        
        {/* Simulator Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-surface/20 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-4">
            <SentientAvatar isTalking={isTyping} />
            <div>
              <h4 className="font-bold text-sm">Echo (AI)</h4>
              <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold flex items-center gap-2">
                {isTyping ? <Waveform /> : <><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Active</>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3">Session #482</Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Maximize2 size={16} /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Settings size={16} /></Button>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 scroll-smooth"
        >
          {messages.map((m, i) => (
            <Message key={m.id} text={m.text} sender={m.sender} />
          ))}
          {isTyping && (
            <div className="flex gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="glass p-4 rounded-2xl flex gap-1">
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-surface/30 backdrop-blur-md border-t border-border relative z-10">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full glass hover:text-primary hover:border-primary/50 transition-all shrink-0">
              <Mic size={20} />
            </Button>
            <div className="relative flex-1">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your response..." 
                className="w-full bg-background border border-border rounded-2xl px-6 py-3.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-inner"
              />
              <Button 
                onClick={handleSend}
                size="icon" 
                className="absolute right-1.5 top-1.5 h-10 w-10 rounded-xl bg-primary shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
          <p className="text-center text-[10px] text-text-secondary mt-3 uppercase tracking-tighter font-bold">Press Enter to send response</p>
        </div>
      </Card>

      {/* Real-time Analysis Sidebar */}
      <div className="space-y-6">
        <Card className="glass p-6">
          <h5 className="font-bold text-sm mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500 w-4 h-4" /> Live Performance
          </h5>
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-text-secondary">
                <span>Confidence</span>
                <span className="text-primary">82%</span>
              </div>
              <Progress value={82} className="h-1.5" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-text-secondary">
                <span>Technical Depth</span>
                <span className="text-blue-400">64%</span>
              </div>
              <Progress value={64} className="h-1.5" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-text-secondary">
                <span>Clarity</span>
                <span className="text-emerald-400">91%</span>
              </div>
              <Progress value={91} className="h-1.5" />
            </div>
          </div>
        </Card>

        <Card className="glass p-6">
          <h5 className="font-bold text-sm mb-4 flex items-center gap-2">
            <Target className="text-primary w-4 h-4" /> AI Suggestions
          </h5>
          <div className="space-y-3">
            {[
              "Mention specifically about 'Render Props' pattern.",
              "Slow down your speaking rate slightly.",
              "Elaborate on the scalability aspect."
            ].map((tip, i) => (
              <div key={i} className="p-3 bg-primary/5 border-l-2 border-primary rounded-r-lg text-[11px] leading-relaxed italic text-text-secondary">
                "{tip}"
              </div>
            ))}
          </div>
        </Card>

        <Button variant="secondary" className="w-full h-12 rounded-xl font-bold border border-border shadow-sm">
          <Volume2 className="w-4 h-4 mr-2" /> Enable Voice AI
        </Button>
      </div>
    </div>
  );
};

export default InterviewSimulator;
