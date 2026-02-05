import React from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  UserCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Circle,
  AlertTriangle,
  Users,
  Briefcase,
  Zap
} from 'lucide-react';

interface Directive {
  id: string;
  assignee: string;
  department: string;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  timestamp: string;
  ai_context: string;
}

export const DirectivesConsole: React.FC = () => {
  const directives: Directive[] = [
    {
      id: 'DIR-882',
      assignee: 'R. Simmons',
      department: 'Finance',
      task: 'Execute Fee Waiver: Raffoul Acct #442',
      priority: 'High',
      status: 'In Progress',
      timestamp: '2m ago',
      ai_context: "ARC detected high loyalty score (92) combined with first-time late payment anomaly."
    },
    {
      id: 'DIR-881',
      assignee: 'M. Chen',
      department: 'Field Service',
      task: 'Priority Dispatch: Node Alpha-4',
      priority: 'High',
      status: 'Pending',
      timestamp: '15m ago',
      ai_context: "Predictive failure model indicates 88% risk of total outage within 4 hours."
    },
    {
      id: 'DIR-880',
      assignee: 'K. Thompson',
      department: 'Sales',
      task: 'Retention Offer: Caribbean Blue Resorts',
      priority: 'Medium',
      status: 'Completed',
      timestamp: '45m ago',
      ai_context: "Competitor price drop detected in St. Lucia. ARC synthesized custom retention tier."
    }
  ];

  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Users size={18} className="text-blue-500" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">ARC Staff Directives</h2>
            <div className="text-[10px] text-zinc-500">HUMAN-IN-THE-LOOP TASK QUEUE</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] font-bold text-emerald-500 uppercase">
            Efficiency: 94%
          </div>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {directives.map((dir, i) => (
          <Motion.div 
            key={dir.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-4 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-blue-500/30 transition-all cursor-default"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                  {dir.assignee.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{dir.assignee}</div>
                  <div className="text-[9px] text-zinc-600 uppercase font-bold">{dir.department}</div>
                </div>
              </div>
              <div className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                dir.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
              }`}>
                {dir.priority} Priority
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-300 font-medium">{dir.task}</p>
                <span className="text-[9px] text-zinc-600 font-mono">{dir.timestamp}</span>
              </div>
              
              <div className="p-2 bg-zinc-900 rounded text-[10px] text-zinc-500 italic border-l-2 border-blue-500/50">
                "{dir.ai_context}"
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  {dir.status === 'Completed' ? (
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  ) : dir.status === 'In Progress' ? (
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                  ) : (
                    <Circle size={12} className="text-zinc-700" />
                  )}
                  <span className={`text-[9px] font-bold uppercase ${
                    dir.status === 'Completed' ? 'text-emerald-500' : 
                    dir.status === 'In Progress' ? 'text-blue-400' : 'text-zinc-600'
                  }`}>
                    {dir.status}
                  </span>
                </div>
                <div className="flex-1 h-[1px] bg-zinc-900" />
                <button className="text-[9px] font-bold text-zinc-600 hover:text-white uppercase tracking-tighter transition-colors flex items-center gap-1">
                  Override <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </Motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800">
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10">
          <Zap size={14} />
          Broadcast Global Directive
        </button>
      </div>
    </div>
  );
};
