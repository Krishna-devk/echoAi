import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Trash2, Search, Filter, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MatchGauge } from '@/components/Visuals';

const ResumeList = () => {
  const resumes = [
    { id: 1, name: 'Alex_Rivera_CV.pdf', size: '2.4 MB', date: 'Oct 12, 2023', score: 98, status: 'Parsed' },
    { id: 2, name: 'Sofia_Chen_Resume.pdf', size: '1.8 MB', date: 'Oct 11, 2023', score: 95, status: 'Parsed' },
    { id: 3, name: 'Jordan_Smith_Frontend.pdf', size: '3.1 MB', date: 'Oct 10, 2023', score: 92, status: 'Parsed' },
    { id: 4, name: 'Maria_Garcia_Design.docx', size: '4.2 MB', date: 'Oct 10, 2023', score: 89, status: 'Processing' },
    { id: 5, name: 'Kevin_Lee_DevOps.pdf', size: '2.1 MB', date: 'Oct 09, 2023', score: 85, status: 'Parsed' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resume Repository</h2>
          <p className="text-text-secondary mt-1">Access and review all candidate documents in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="bg-surface border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 w-64"
            />
          </div>
          <Button variant="outline" size="icon" className="glass rounded-xl h-10 w-10">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/50 bg-surface/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-secondary">File Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-secondary">AI Score</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-secondary">Upload Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-secondary">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {resumes.map((resume, i) => (
                <motion.tr 
                  key={resume.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-primary/5 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm truncate max-w-[200px]">{resume.name}</p>
                        <p className="text-[10px] text-text-secondary font-medium">{resume.size}</p>
                      </div>
                    </div>
                  </td>
                   <td className="px-6 py-5">
                    <MatchGauge score={resume.score} size={40} strokeWidth={4} />
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-text-secondary">{resume.date}</p>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant="outline" className={`rounded-full px-3 py-0.5 border-none font-bold text-[10px] flex items-center gap-1.5 w-fit ${resume.status === 'Parsed' ? 'bg-green-500/10 text-green-500' : 'bg-secondary/10 text-secondary animate-pulse'}`}>
                      {resume.status === 'Parsed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {resume.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"><Eye size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"><Download size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500 transition-colors"><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ResumeList;
