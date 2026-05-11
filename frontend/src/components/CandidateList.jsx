import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, MessageSquare, Mail, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MatchGauge } from '@/components/Visuals';

const CandidateList = () => {
  const candidates = [
    { 
      id: 1, 
      name: 'Alex Rivera', 
      role: 'Senior Frontend Engineer', 
      score: 98, 
      skills: ['React', 'TypeScript', 'Node.js'], 
      location: 'San Francisco, CA',
      avatar: 'AR'
    },
    { 
      id: 2, 
      name: 'Sofia Chen', 
      role: 'AI Research Scientist', 
      score: 95, 
      skills: ['PyTorch', 'NLP', 'Groq SDK'], 
      location: 'New York, NY',
      avatar: 'SC'
    },
    { 
      id: 3, 
      name: 'Jordan Smith', 
      role: 'DevOps Lead', 
      score: 92, 
      skills: ['Kubernetes', 'AWS', 'Terraform'], 
      location: 'Austin, TX',
      avatar: 'JS'
    },
    { 
      id: 4, 
      name: 'Maria Garcia', 
      role: 'Product Designer', 
      score: 89, 
      skills: ['Figma', 'UX Research', 'Design Systems'], 
      location: 'London, UK',
      avatar: 'MG'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Candidate Pipeline</h2>
          <p className="text-text-secondary mt-1">Discover top talent ranked by Groq's semantic analysis engine.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="glass rounded-xl px-6 font-bold text-sm">
            Export Report
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {candidates.map((candidate, i) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass p-6 group hover:border-primary/40 transition-all cursor-pointer">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Avatar and Info */}
                <div className="flex items-center gap-6 flex-1 min-w-0 w-full">
                  <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-2xl font-black text-primary-foreground shadow-2xl shadow-primary/20 shrink-0 group-hover:scale-105 transition-transform duration-500">
                    {candidate.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{candidate.name}</h3>
                      <Badge className="bg-primary/10 text-primary border-none font-bold px-2 py-0.5">TOP PICK</Badge>
                    </div>
                    <p className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-3">{candidate.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-surface-accent text-text-primary border-none text-[10px] font-bold">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Match Score */}
                <div className="flex items-center gap-10 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/50 lg:pl-10">
                  <div className="flex flex-col items-center gap-2">
                    <MatchGauge score={candidate.score} size={80} strokeWidth={8} />
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-tighter">AI Match Index</p>
                  </div>
                  
                  <div className="hidden sm:flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                      <MapPin size={14} className="text-secondary" /> {candidate.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                      <Mail size={14} className="text-accent" /> Contact Available
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl glass hover:bg-primary hover:text-white transition-all">
                      <MessageSquare size={20} />
                    </Button>
                    <Button className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:translate-x-1 transition-all">
                      View Profile <ChevronRight size={18} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
