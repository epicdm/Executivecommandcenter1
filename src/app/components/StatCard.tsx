import React from 'react';
import { motion as Motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendType, color = 'blue' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'red': return 'text-red-400 border-red-500/20 bg-red-500/5';
      case 'yellow': return 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5';
      case 'green': return 'text-green-400 border-green-500/20 bg-green-500/5';
      default: return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
    }
  };

  return (
    <Motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 border rounded-lg flex flex-col gap-1 min-w-[200px] ${getColorClasses()}`}
    >
      <div className="text-xs uppercase tracking-wider opacity-60 font-medium">{label}</div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 text-[10px] font-bold">
          {trendType === 'up' ? <ArrowUpRight size={12} /> : trendType === 'down' ? <ArrowDownRight size={12} /> : <Activity size={12} />}
          {trend}
        </div>
      )}
    </Motion.div>
  );
};
