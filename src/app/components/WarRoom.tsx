import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  X, 
  Activity, 
  MapPin, 
  Users, 
  Zap, 
  Radio, 
  AlertTriangle,
  MessageSquare,
  Lock
} from 'lucide-react';

interface WarRoomProps {
  onClose: () => void;
}

export const WarRoom: React.FC<WarRoomProps> = ({ onClose }) => {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-red-950/40 backdrop-blur-xl"
    >
      <div className="w-full max-w-6xl h-full max-h-[800px] bg-black border-2 border-red-500/50 rounded-3xl shadow-[0_0_100px_rgba(239,68,68,0.3)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-red-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-2 bg-white rounded flex items-center justify-center ${pulse ? 'opacity-100' : 'opacity-70'} transition-opacity`}>
              <ShieldAlert className="text-red-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">ARC WAR ROOM: LEVEL 4 ALERT</h2>
              <div className="text-[10px] text-red-100 font-mono tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                CRITICAL_EVENT_DETECTED // ZONE_4_INFRASTRUCTURE_FAILURE
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-700 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Main Visualizer */}
          <div className="lg:col-span-8 p-6 border-r border-zinc-800 space-y-6 overflow-y-auto bg-gradient-to-b from-red-950/20 to-black">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                <Activity size={16} />
                Live Incident Map
              </h3>
              <div className="text-[10px] font-mono text-zinc-500">REF: INC-0922-A</div>
            </div>

            <div className="aspect-video bg-zinc-900/50 border border-red-500/20 rounded-2xl relative overflow-hidden">
              {/* Mock Map Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full bg-[radial-gradient(#f00_1px,transparent_1px)] [background-size:30px_30px]" />
              </div>
              
              {/* Outage Heatmap */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/20 blur-3xl animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.8)]">
                  <AlertTriangle className="text-white" size={24} />
                </div>
              </div>

              {/* Status Tags */}
              <div className="absolute top-4 right-4 space-y-2">
                <div className="px-3 py-1 bg-black/80 border border-red-500/30 rounded text-[10px] font-bold text-red-500 flex items-center gap-2">
                  <Zap size={10} />
                  Main Node Offline
                </div>
                <div className="px-3 py-1 bg-black/80 border border-zinc-700 rounded text-[10px] font-bold text-zinc-400 flex items-center gap-2">
                  <Users size={10} />
                  1,420 Users Affected
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Time to Recovery</div>
                <div className="text-xl font-mono font-bold text-white">01:42:12</div>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Impact Radius</div>
                <div className="text-xl font-mono font-bold text-white">4.2 km</div>
              </div>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Risk Factor</div>
                <div className="text-xl font-mono font-bold text-red-500">SEVERE</div>
              </div>
            </div>
          </div>

          {/* Incident Control */}
          <div className="lg:col-span-4 p-6 bg-zinc-950 space-y-6 overflow-y-auto">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">ARC Autonomous Actions</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-600/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-red-500 mb-1">
                    <Radio size={14} />
                    <span className="text-[10px] font-bold uppercase">Mass Notification</span>
                  </div>
                  <p className="text-[10px] text-zinc-400">ARC has dispatched SMS alerts to all 1,420 impacted subscribers.</p>
                </div>
                <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <Zap size={14} />
                    <span className="text-[10px] font-bold uppercase">Tech Dispatch</span>
                  </div>
                  <p className="text-[10px] text-zinc-400">2 Technicians (Ross, Walker) rerouted from non-essential tasks.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center justify-between">
                Incident Log
                <span className="text-[8px] text-zinc-600 font-mono italic">REAL_TIME</span>
              </h3>
              <div className="space-y-4 font-mono text-[9px]">
                <div className="flex gap-2 text-red-500">
                  <span>[14:20:01]</span>
                  <span>NODE_EPIC_04 LOSS OF SIGNAL</span>
                </div>
                <div className="flex gap-2 text-zinc-500">
                  <span>[14:20:05]</span>
                  <span>ARC INITIALIZING DIAGNOSTICS...</span>
                </div>
                <div className="flex gap-2 text-blue-400">
                  <span>[14:20:12]</span>
                  <span>AUTONOMOUS REDIRECT: TECH_ROSS_01</span>
                </div>
                <div className="flex gap-2 text-emerald-500">
                  <span>[14:21:00]</span>
                  <span>CUSTOMER_NOTIF_QUEUED (1420)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <button className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-tighter italic rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                Override & Control
              </button>
              <button className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold uppercase text-[10px] rounded-xl transition-all border border-zinc-800 flex items-center justify-center gap-2">
                <Lock size={14} />
                Seal Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </Motion.div>
  );
};
