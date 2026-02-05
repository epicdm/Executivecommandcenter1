import React from 'react';
import { motion as Motion } from 'motion/react';
import { 
  Wind, 
  Waves, 
  Truck, 
  Package, 
  AlertCircle, 
  TrendingUp, 
  Activity,
  Anchor,
  Box,
  Globe,
  ArrowLeft
} from 'lucide-react';

interface IslandResilience {
  name: string;
  stress: number; // 0-100
  supply: number; // 0-100
  status: 'Critical' | 'Stable' | 'Warning';
  activeThreat: string | null;
}

const islands: IslandResilience[] = [
  { name: 'Barbados', stress: 12, supply: 94, status: 'Stable', activeThreat: null },
  { name: 'St. Lucia', stress: 45, supply: 78, status: 'Warning', activeThreat: 'Power Grid Volatility' },
  { name: 'Grenada', stress: 8, supply: 91, status: 'Stable', activeThreat: null },
  { name: 'Trinidad', stress: 22, supply: 85, status: 'Stable', activeThreat: null },
  { name: 'St. Vincent', stress: 72, supply: 42, status: 'Critical', activeThreat: 'Ash Sediment Ingress' },
];

export const ResilienceCommand: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Resilience & Logistics Command</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Environmental Stress Radar */}
        <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Wind size={18} className="text-amber-500" />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">Environmental Stress Matrix</h2>
                <div className="text-[10px] text-zinc-500">REAL-TIME ATMOSPHERIC & SEISMIC LOAD</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[9px] text-zinc-400 font-bold uppercase">Nominal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[9px] text-zinc-400 font-bold uppercase">Elevated</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {islands.map((island, i) => (
              <div key={island.name} className="relative group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white w-24">{island.name}</span>
                    <div className="flex items-center gap-2">
                      {island.status === 'Critical' && (
                        <div className="px-1.5 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[8px] font-bold text-red-500 uppercase flex items-center gap-1">
                          <AlertCircle size={8} /> {island.activeThreat}
                        </div>
                      )}
                      {island.status === 'Warning' && (
                        <div className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[8px] font-bold text-amber-500 uppercase">
                          {island.activeThreat}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    STRESS_LVL: <span className={island.stress > 50 ? 'text-red-400' : 'text-zinc-300'}>{island.stress}%</span>
                  </div>
                </div>
                
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                  <Motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${island.stress}%` }}
                    className={`h-full ${
                      island.stress > 60 ? 'bg-red-500' : 
                      island.stress > 30 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />
                </div>
                
                {/* Infrastructure Overlay indicator */}
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[8px] font-bold text-blue-400 uppercase tracking-tighter hover:text-white">
                    View Tower Health →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supply Chain / Logistics */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Anchor size={18} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">Logistics Mesh</h2>
              <div className="text-[10px] text-zinc-500">AUTONOMOUS PROCUREMENT PIPELINE</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Box size={14} className="text-zinc-500" />
                  <span className="text-[10px] font-bold text-white uppercase">Vessel: ARC-TRANSPORTER 4</span>
                </div>
                <div className="text-[9px] text-emerald-500 font-bold uppercase">En Route</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-zinc-300">500x Nokia-X Fiber Nodes</div>
                <div className="text-[9px] text-zinc-500 italic">Origin: Panama Hub → Destination: Barbados</div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <Motion.div 
                    animate={{ x: [-100, 200] }} 
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-full bg-blue-500" 
                  />
                </div>
                <span className="text-[9px] font-mono text-zinc-600">62%</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Inventory Health</span>
                <TrendingUp size={12} className="text-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                  <div className="text-[9px] text-zinc-500 uppercase mb-1">Stock Level</div>
                  <div className="text-lg font-black text-white italic tracking-tighter">88.4%</div>
                </div>
                <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                  <div className="text-[9px] text-zinc-500 uppercase mb-1">Transit Value</div>
                  <div className="text-lg font-black text-white italic tracking-tighter">$1.4M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Resilience Visualizer */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 overflow-hidden relative min-h-[300px]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1737912133534-cb5a6efe1c8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjB3ZWF0aGVyJTIwaHVycmljYW5lJTIwcmFkYXIlMjBvdmVybGF5fGVufDF8fHx8MTc3MDI0ODM0Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            className="w-full h-full object-cover grayscale"
            alt="Radar Overlay"
          />
        </div>
        
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Globe size={18} className="text-emerald-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">Macro-Environmental Dashboard</h2>
              <div className="text-[10px] text-zinc-500">INTELLIGENT FORECASTING & ADAPTIVE INFRASTRUCTURE</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[10px] font-bold uppercase transition-all">
              Simulation Mode
            </button>
            <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase transition-all shadow-lg shadow-emerald-500/20">
              Auto-Adapt Active
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {[
            { label: 'Network Uptime', value: '99.98%', trend: '+0.02', color: 'emerald' },
            { label: 'Grid Stability', value: '84.2%', trend: '-4.1', color: 'amber' },
            { label: 'Fiber Integrity', value: '92.1%', trend: '+1.4', color: 'emerald' },
            { label: 'Supply Resilience', value: '76.8%', trend: '-2.5', color: 'red' },
          ].map((stat, i) => (
            <div key={i} className="p-4 bg-zinc-950/80 backdrop-blur border border-zinc-800 rounded-xl">
              <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1 tracking-tighter">{stat.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-xl font-black text-white italic">{stat.value}</div>
                <div className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.trend}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-center gap-4 relative z-10">
          <div className="p-3 bg-blue-500/10 rounded-full animate-pulse">
            <Activity className="text-blue-500" size={20} />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1">ARC Prediction Engine</div>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              "Atmospheric models detect a developing low-pressure system east of the Lesser Antilles. ARC has automatically increased tower wind-load tolerance settings in Barbados and pre-positioned 40 generators in St. Vincent as a precautionary measure."
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold uppercase transition-all shrink-0">
            Verify Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
