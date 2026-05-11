import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MoreHorizontal, Users, Clock, Plus, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const JobsManager = () => {
  const jobs = [
    { id: 1, title: 'Senior Frontend Engineer', candidates: 42, status: 'Active', posted: '2d ago', dept: 'Engineering' },
    { id: 2, title: 'AI Research Scientist', candidates: 18, status: 'Active', posted: '5h ago', dept: 'R&D' },
    { id: 3, title: 'Product Designer', candidates: 25, status: 'Draft', posted: '1w ago', dept: 'Design' },
    { id: 4, title: 'DevOps Lead', candidates: 12, status: 'Active', posted: '3d ago', dept: 'Infrastructure' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Active Opportunities</h2>
          <p className="text-text-secondary mt-1">Manage your job postings and monitor applicant flow.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="glass rounded-xl h-10 px-4">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button className="bg-primary text-primary-foreground h-10 px-6 rounded-xl font-bold shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" /> New Role
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass p-6 group hover:border-primary/40 transition-all cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary"><MoreHorizontal size={18} /></Button>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner shrink-0">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-xl truncate group-hover:text-primary transition-colors">{job.title}</h3>
                    <Badge variant={job.status === 'Active' ? 'default' : 'secondary'} className={job.status === 'Active' ? 'bg-green-500/10 text-green-500 border-none' : ''}>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary font-medium mb-4">{job.dept} • Full-time</p>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{job.candidates} Applicants</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="w-8 h-8 rounded-full border-2 border-background bg-surface-accent flex items-center justify-center text-[10px] font-bold">
                      {String.fromCharCode(64 + n + i)}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                    +{job.candidates - 3}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/10">
                  Manage Pipeline
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobsManager;
