import React from 'react';
import { motion as Motion } from 'motion/react';
import { 
  Users, 
  RefreshCcw, 
  MapPin, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Cpu,
  Plane
} from 'lucide-react';

interface StaffPool {
  island: string;
  total: number;
  available: number;
  efficiency: number; // 0-100
  tasks: number;
  status: 'Surplus' | 'Optimal' | 'Shortage';
}

const staffMesh: StaffPool[] = [
  { island: 'Barbados', total: 42, available: 12, efficiency: 94, tasks: 124, status: 'Surplus' },
  { island: 'St. Lucia', total: 28, available: 2, efficiency: 82, tasks: 98, status: 'Shortage' },
  { island: 'Grenada', total: 15, available: 4, efficiency: 88, tasks: 32, status: 'Optimal' },
  { island: 'Trinidad', total: 64, available: 18, efficiency: 76, tasks: 212, status: 'Surplus' },
  { island: 'St. Vincent', total: 20, available: 1, efficiency: 45, tasks: 145, status: 'Shortage' },
];

export const HumanComputeMesh: React.FC = () => {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Users size={18} className="text-purple-500" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white italic">Human Compute Mesh</h2>
            <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-tighter">Distributed Labor Arbitrage & Neural Staffing</div>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[10px] font-bold text-white uppercase transition-all">
          <RefreshCcw size={12} className="text-blue-400" />
          Re-Balance Mesh
        </button>
      </div>

      <div className="space-y-4">
        {staffMesh.map((pool) => (
          <div key={pool.island} className="p-4 bg-zinc-950/50 border border-zinc-800/50 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="text-xs font-black text-white uppercase italic tracking-tighter w-24">{pool.island}</div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    pool.status === 'Surplus' ? 'bg-emerald-500' : 
                    pool.status === 'Shortage' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
                  }`} />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">{pool.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[9px] text-zinc-600 uppercase font-bold mb-0.5">Efficiency</div>
                  <div className="text-sm font-black text-white font-mono">{pool.efficiency}%</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-zinc-600 uppercase font-bold mb-0.5">Availability</div>
                  <div className="text-sm font-black text-zinc-400 font-mono">{pool.available}/{pool.total}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 relative z-10">
              <div className="col-span-3 h-1 bg-zinc-900 rounded-full overflow-hidden mt-1">
                <Motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(pool.tasks / 250) * 100}%` }}
                  className={`h-full ${pool.tasks > 200 ? 'bg-red-500' : 'bg-blue-500'}`}
                />
              </div>
              <div className="text-[9px] font-mono text-zinc-600 text-right uppercase tracking-tighter">
                {pool.tasks} active_vectors
              </div>
            </div>

            {pool.status === 'Shortage' && (
              <div className="mt-4 flex items-center justify-between p-2 bg-red-500/5 border border-red-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap size={10} className="text-red-500" />
                  <span className="text-[9px] font-bold text-red-400 uppercase">ARC: Critical Resource Depletion Detected</span>
                </div>
                <button className="text-[9px] font-bold text-blue-400 hover:text-white uppercase flex items-center gap-1">
                  <Plane size={10} /> Arbitrage from Barbados →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <Cpu size={14} className="text-purple-400" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">Neural Arbitrage Log</span>
        </div>
        <div className="space-y-2">
          {[
            "ARC moved 4 Field Technicians from Barbados to St. Vincent (Delta: +12% Net Resolution)",
            "Staff efficiency in Trinidad increased by 8.4% after ARC Directive #882 (Process Automation)",
            "Predictive: St. Lucia will require 2 additional Support Vectors in 48h due to Signal SIG-415"
          ].map((log, i) => (
            <div key={i} className="text-[9px] text-zinc-500 border-l border-zinc-800 pl-3 py-0.5">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
