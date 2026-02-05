import React from 'react';
import { motion as Motion } from 'motion/react';
import { TrendingUp, TrendingDown, MoreHorizontal, Terminal } from 'lucide-react';

interface DepartmentCardProps {
  name: string;
  icon: React.ReactNode;
  metrics: {
    label: string;
    value: string;
    trend: string;
    trendType: 'up' | 'down';
  }[];
  status: 'critical' | 'warning' | 'stable';
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ name, icon, metrics, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'border-red-500/50 bg-red-500/10 text-red-400';
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'stable': return 'border-green-500/50 bg-green-500/10 text-green-400';
      default: return 'border-zinc-800 bg-zinc-900/50 text-zinc-400';
    }
  };

  const getStatusDot = () => {
    switch (status) {
      case 'critical': return '🔴';
      case 'warning': return '🟡';
      case 'stable': return '🟢';
    }
  };

  return (
    <Motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-black/40 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full"
    >
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-lg text-zinc-100">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{name}</h3>
            <div className="text-[10px] opacity-60 flex items-center gap-1">
              {getStatusDot()} STATUS: {status.toUpperCase()}
            </div>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-white transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 gap-4 flex-grow">
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-col">
            <div className="text-[10px] text-zinc-500 uppercase font-medium">{m.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-xl font-mono text-zinc-100">{m.value}</div>
              <div className={`text-[10px] flex items-center gap-1 ${m.trendType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {m.trendType === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {m.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-zinc-900/50 border-t border-zinc-800">
        <button className="w-full py-2 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded uppercase tracking-widest transition-all group">
          <Terminal size={14} className="group-hover:text-blue-400" />
          Command
        </button>
      </div>
    </Motion.div>
  );
};
