import React from 'react';
import { motion as Motion } from 'motion/react';
import { 
  Network, 
  Globe, 
  Server, 
  Activity, 
  Zap, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight,
  Database,
  Wifi
} from 'lucide-react';

interface Subsidiary {
  name: string;
  code: string;
  load: string;
  latency: string;
  uptime: string;
  status: 'online' | 'warning' | 'critical';
}

export const GlobalInfra: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const subsidiaries: Subsidiary[] = [
    { name: 'St. Lucia', code: 'SLU', load: '1.2 TB/s', latency: '22ms', uptime: '99.98%', status: 'online', market: 'Storm Warning' },
    { name: 'Barbados', code: 'BAR', load: '0.8 TB/s', latency: '45ms', uptime: '99.95%', status: 'online', market: 'Stable' },
    { name: 'Trinidad', code: 'TRI', load: '2.4 TB/s', latency: '110ms', uptime: '98.40%', status: 'warning', market: 'High Traffic' },
    { name: 'Jamaica', code: 'JAM', load: '3.1 TB/s', latency: '35ms', uptime: '99.99%', status: 'online', market: 'Growth' },
    { name: 'Grenada', code: 'GRE', load: '0.4 TB/s', latency: '580ms', uptime: '82.10%', status: 'critical', market: 'Downtime Risk' }
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Global Infra Mesh</h2>
            <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
              <Globe size={12} className="text-blue-500" />
              CARIBBEAN_BACKBONE // MULTI-TENANT_V4
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 font-bold uppercase">Aggregated Throughput</span>
            <span className="text-lg font-black text-blue-500 font-mono">7.9 TB/s</span>
          </div>
          <div className="h-10 w-px bg-zinc-800" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 font-bold uppercase">System Integrity</span>
            <span className="text-lg font-black text-emerald-500 font-mono">92.4%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Map/Visualization */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none grayscale brightness-50 contrast-150">
             <div className="h-full w-full bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:30px_30px]" />
          </div>
          
          <div className="relative w-full h-full flex items-center justify-center">
            {/* SVG Mesh Visualization */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
               <path d="M 100 100 L 400 300" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" className="animate-[pulse_4s_infinite]" />
               <path d="M 400 300 L 700 150" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
               <path d="M 700 150 L 100 100" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Nodes */}
            <div className="flex gap-12 flex-wrap justify-center relative z-10">
              {subsidiaries.map((sub, i) => (
                <Motion.div 
                  key={sub.code}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-3 group cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all group-hover:scale-110 ${
                    sub.status === 'online' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-lg shadow-emerald-500/10' :
                    sub.status === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-lg shadow-amber-500/10' :
                    'bg-red-500/10 border-red-500/30 text-red-500 shadow-lg shadow-red-500/10 animate-pulse'
                  }`}>
                    <Server size={32} />
                  </div>
                    <div className="text-center">
                      <div className="text-xs font-black text-white uppercase tracking-tighter">{sub.name}</div>
                      <div className="text-[10px] text-zinc-500 font-mono mb-1">{sub.code}-IX-0{i+1}</div>
                      {(sub as any).market && (
                        <div className="text-[8px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 uppercase">
                          {(sub as any).market}
                        </div>
                      )}
                    </div>
                </Motion.div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-4 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-zinc-800">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Fiber Backbone</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Packet Loss</span>
             </div>
          </div>
        </div>

        {/* Real-time Telemetry List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <Activity size={16} className="text-blue-500" />
              Subsidiary Health
            </h3>
            <div className="space-y-3">
              {subsidiaries.map((sub) => (
                <div key={sub.code} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      sub.status === 'online' ? 'bg-emerald-500/10 text-emerald-500' :
                      sub.status === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      <Wifi size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">{sub.name}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">LATENCY: {sub.latency}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-zinc-100">{sub.uptime}</div>
                    <div className="text-[9px] font-bold text-zinc-600 uppercase">Availability</div>
                  </div>
                  <ChevronRight size={14} className="text-zinc-800 group-hover:text-zinc-400 ml-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-blue-400 mb-4">
              <Zap size={18} />
              <h3 className="text-xs font-bold uppercase tracking-widest">ARC Optimization</h3>
            </div>
            <p className="text-xs text-zinc-400 italic mb-4">
              "ARC is currently rerouting 15% of Barbados traffic through the Jamaica fiber nexus to alleviate signal saturation in the Eastern Corridor."
            </p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-[10px] font-bold uppercase transition-all shadow-lg shadow-blue-500/20">
              Approve Global Reroute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
