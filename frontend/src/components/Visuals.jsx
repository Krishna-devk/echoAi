import React from 'react';
import { motion } from 'framer-motion';

export const MatchGauge = ({ score, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
        />
      </svg>
      <span className="absolute text-[10px] font-black">{score}%</span>
    </div>
  );
};

export const SkillHeatmap = () => {
  const skills = [
    { name: 'React', level: 90, x: '20%', y: '30%', size: 80, color: 'bg-primary' },
    { name: 'Python', level: 85, x: '60%', y: '20%', size: 70, color: 'bg-secondary' },
    { name: 'Tailwind', level: 95, x: '40%', y: '60%', size: 90, color: 'bg-accent' },
    { name: 'Django', level: 75, x: '75%', y: '55%', size: 60, color: 'bg-primary' },
    { name: 'LLMs', level: 80, x: '15%', y: '70%', size: 65, color: 'bg-secondary' },
  ];

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-3xl bg-surface/20 border border-border/50 group">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
      {skills.map((skill, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ delay: i * 0.2, duration: 1 }}
          whileHover={{ scale: 1.1, opacity: 0.9 }}
          className={`absolute rounded-full blur-[15px] ${skill.color} cursor-pointer`}
          style={{ 
            width: skill.size, 
            height: skill.size, 
            left: skill.x, 
            top: skill.y 
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h4 className="text-sm font-bold tracking-widest uppercase text-text-secondary opacity-50">AI Skill Clusters</h4>
      </div>
      {skills.map((skill, i) => (
        <div 
          key={`label-${i}`} 
          className="absolute text-[10px] font-bold px-2 py-1 glass rounded-full border-white/10"
          style={{ left: skill.x, top: skill.y, transform: 'translate(20px, 20px)' }}
        >
          {skill.name}
        </div>
      ))}
    </div>
  );
};
