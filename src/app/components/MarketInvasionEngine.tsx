import React from 'react';
import { motion as Motion } from 'motion/react';
import { 
  Target, 
  Zap, 
  Users, 
  BarChart3, 
  ShieldAlert, 
  ArrowRight,
  Crosshair,
  Signal,
  Radar
} from 'lucide-react';

interface SignalEvent {
  id: string;
  source: 'Competitor Outage' | 'Market Vacuum' | 'Regulatory Shift';
  entity: string;
  location: string;
  intensity: number; // 0-100
  recommendation: string;
  status: 'Draft' | 'Deployed' | 'Completed';
}

const signals: SignalEvent[] = [
  {
    id: 'SIG-992',
    source: 'Competitor Outage',
    entity: 'Flow (Network)',
    location: 'Kingston, Jamaica',
    intensity: 88,
    recommendation: 'Direct Sales Agent to Kingston Business District; offer 3-month free trial.',
    status: 'Deployed'
  },
  {
    id: 'SIG-415',
    source: 'Market Vacuum',
    entity: 'Enterprise SME',
    location: 'Bridgetown, Barbados',
    intensity: 64,
    recommendation: 'Deploy Field Agents for proactive door-to-door network health checks.',
    status: 'Draft'
  },
  {
    id: 'SIG-882',
    source: 'Regulatory Shift',
    entity: 'Spectrum Licensing',
    location: 'Port of Spain, Trinidad',
    intensity: 42,
    recommendation: 'ARC Strategy: Initiate lobby protocol for 6GHz band allocation.',
    status: 'Draft'
  }
];

export const MarketInvasionEngine: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
            <Crosshair className="text-red-500" />
            Market Invasion Engine
          </h1>
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1">
            ARC Intelligence: Competitor Signal Monitoring & Offensive Deployment
          </p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
            <span className="text-[10px] font-bold text-zinc-400">SIG_INT: HIGH_ACTIVITY</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Active Signals Feed */}
        <div className="xl:col-span-8 space-y-4">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Live Signal Stream</span>
              <button className="text-[10px] text-blue-400 font-bold hover:text-white uppercase">Filter by Intensity ↓</button>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {signals.map((signal) => (
                <div key={signal.id} className="p-5 hover:bg-white/[0.02] transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        signal.source === 'Competitor Outage' ? 'bg-red-500/10 text-red-500' :
                        signal.source === 'Market Vacuum' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {signal.source === 'Competitor Outage' ? <Signal size={20} /> : <Zap size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white uppercase">{signal.source}: {signal.entity}</h3>
                          <span className="text-[9px] font-mono text-zinc-600">ID://{signal.id}</span>
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">{signal.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-zinc-600 uppercase mb-1">Impact Potential</div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <Motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${signal.intensity}%` }}
                            className={`h-full ${signal.intensity > 70 ? 'bg-red-500' : 'bg-emerald-500'}`}
                          />
                        </div>
                        <span className="text-xs font-mono text-zinc-400">{signal.intensity}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-950/60 border border-zinc-800/50 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-1.5 bg-blue-500/10 rounded text-blue-400">
                        <BarChart3 size={14} />
                      </div>
                      <p className="text-xs text-zinc-300 italic">"ARC Recommendation: {signal.recommendation}"</p>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      signal.status === 'Deployed' 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    }`}>
                      {signal.status === 'Deployed' ? 'Offensive Active' : 'Execute Strike'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Intelligence Metrics */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Radar size={18} className="text-red-500" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">Competitor Mesh</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Digicel', share: 42, health: 94, trend: 'stable' },
                { name: 'Flow', share: 38, health: 62, trend: 'critical' },
                { name: 'Starlink', share: 12, health: 99, trend: 'rising' },
              ].map((comp) => (
                <div key={comp.name} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white uppercase">{comp.name}</span>
                    <span className={`text-[10px] font-bold uppercase ${
                      comp.trend === 'rising' ? 'text-emerald-500' : 
                      comp.trend === 'critical' ? 'text-red-500 animate-pulse' : 'text-zinc-500'
                    }`}>{comp.trend}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[8px] text-zinc-600 uppercase font-bold mb-1">Mkt Share</div>
                      <div className="text-sm font-black text-white">{comp.share}%</div>
                    </div>
                    <div>
                      <div className="text-[8px] text-zinc-600 uppercase font-bold mb-1">Net Health</div>
                      <div className="text-sm font-black text-zinc-300">{comp.health}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600/20 to-zinc-900 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="text-red-500" size={20} />
              <h2 className="text-sm font-bold uppercase tracking-widest text-white italic">Invasion Protocol</h2>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              ARC Invasion Engine has detected a major service degradation in St. Kitts (Flow). Suggesting immediate redirection of 4 Field Technicians from St. Vincent to capitalize on port-in opportunities.
            </p>
            <button className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group">
              Confirm Resource Shift
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
