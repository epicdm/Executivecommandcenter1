import React from 'react';
import { motion as Motion } from 'motion/react';
import { BrainCircuit, Zap, AlertTriangle, TrendingDown, Activity } from 'lucide-react';

export const Insights: React.FC = () => {
  const insights = [
    {
      icon: <TrendingDown size={16} />,
      text: "AR will decrease 15% this week (Collections Agent efficiency)",
      color: "text-green-400"
    },
    {
      icon: <Zap size={16} />,
      text: "3 deals likely to close if Support resolves their tickets",
      color: "text-blue-400"
    },
    {
      icon: <AlertTriangle size={16} />,
      text: "Field Service capacity bottleneck Thursday — suggest contractor",
      color: "text-yellow-400"
    },
    {
      icon: <Activity size={16} />,
      text: "Regional storm warning in St. Lucia detected — ARC prioritizing resilient backhaul",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="bg-black/40 border border-zinc-800 rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6 text-zinc-400">
        <BrainCircuit size={18} />
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">Predictive Intelligence</h2>
        <span className="text-[10px] ml-auto px-2 py-0.5 bg-zinc-800 rounded text-zinc-500 font-mono text-zinc-600">ARC_INSIGHTS_V4</span>
      </div>

      <div className="space-y-6">
        <p className="text-xs text-zinc-500 font-medium italic opacity-70">Based on current trends and historical patterns:</p>
        <div className="space-y-4">
          {insights.map((insight, i) => (
            <Motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3 bg-zinc-900/30 border border-zinc-800/50 rounded-lg group hover:border-zinc-700 transition-colors"
            >
              <div className={`mt-0.5 ${insight.color}`}>
                {insight.icon}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {insight.text}
              </p>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OpsLog: React.FC = () => {
  const [logs, setLogs] = React.useState([
    { time: "10:42 AM", agent: "Collections", action: "Sent payment reminder to Adams Health", status: "Executed" },
    { time: "10:38 AM", agent: "Sales", action: "Qualified lead \"Dragon Windows\" → Hot", status: "Success" },
    { time: "10:35 AM", agent: "ARC", action: "Cross-referenced: Dragon has open ticket", status: "Insight" },
    { time: "10:30 AM", agent: "Support", action: "Resolved ticket #3847 (router swap)", status: "Closed" }
  ]);

  React.useEffect(() => {
    const actions = [
      { agent: "Finance", action: "Odoo sync: Verified payment batch #992", status: "Verified" },
      { agent: "Field", action: "Dispatching Ross to Zone 4 main node", status: "Deploy" },
      { agent: "Support", action: "Automated response to #9911 (Billing query)", status: "AI_Reply" },
      { agent: "Sales", action: "New Lead detected: 'Caribbean Marine Corp'", status: "New" },
      { agent: "ARC", action: "Analyzing cross-dept impact of hardware failure", status: "Logic" }
    ];

    const interval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const newLog = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...randomAction
      };
      setLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/40 border border-zinc-800 rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6 text-zinc-400">
        <Activity className="w-4 h-4" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">Active Operations</h2>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-green-500">LIVE</span>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="space-y-1">
          {logs.map((log, i) => (
            <Motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-[80px_1fr_80px] gap-4 py-3 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/20 transition-colors px-2 rounded"
            >
              <span className="text-[10px] font-mono text-zinc-600">{log.time}</span>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-tighter">{log.agent} Agent</span>
                <span className="text-xs text-zinc-400">{log.action}</span>
              </div>
              <div className="flex justify-end items-center">
                <span className="text-[9px] px-1.5 py-0.5 border border-zinc-800 rounded text-zinc-500 font-mono uppercase">
                  {log.status}
                </span>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
