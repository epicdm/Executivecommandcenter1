import React from 'react';
import { motion as Motion } from 'motion/react';
import { 
  Globe, 
  CloudRain, 
  TrendingUp, 
  AlertTriangle,
  Waves,
  Zap,
  Ship,
  Wind
} from 'lucide-react';

export const CaribbeanPulse: React.FC<{ onExpand?: () => void }> = ({ onExpand }) => {
  const regionalData = [
    {
      island: "Grenada",
      risk: "Low",
      status: "Operational",
      weather: "Sunny",
      econ: "+2.1% YoY",
      icon: <Wind size={14} className="text-blue-400" />
    },
    {
      island: "St. Lucia",
      risk: "Medium",
      status: "Maintenance",
      weather: "Storm Warning",
      econ: "+0.8% YoY",
      icon: <CloudRain size={14} className="text-amber-400" />
    },
    {
      island: "Dominica",
      risk: "Low",
      status: "Operational",
      weather: "Clear",
      econ: "-0.5% YoY",
      icon: <Waves size={14} className="text-emerald-400" />
    }
  ];

  return (
    <div className="bg-black/40 border border-zinc-800 rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-zinc-400">
          <Globe size={18} className="text-blue-500" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Caribbean Market Pulse</h2>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
          REF_LATAM_E
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {regionalData.map((data, i) => (
          <Motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-zinc-900/40 border border-zinc-800/60 rounded-xl hover:border-zinc-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-950 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                  {data.icon}
                </div>
                <span className="text-sm font-bold text-white">{data.island}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                data.risk === 'Low' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
              }`}>
                {data.risk} RISK
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">Conditions</span>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {data.weather}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">Macro Econ</span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                  <TrendingUp size={12} />
                  {data.econ}
                </div>
              </div>
            </div>
          </Motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-900">
        <button 
          onClick={onExpand}
          className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-[10px] font-bold uppercase text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2 mb-4"
        >
          <Globe size={14} />
          Expand Resilience Intelligence
        </button>
        <div className="flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-2 text-zinc-500">
            <Ship size={12} />
            <span>Supply Chain: NORMAL</span>
          </div>
          <div className="flex items-center gap-2 text-amber-500">
            <AlertTriangle size={12} />
            <span>Regional Alerts (1)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
