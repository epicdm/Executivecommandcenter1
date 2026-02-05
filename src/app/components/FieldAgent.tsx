import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  ArrowLeft, 
  Map as MapIcon, 
  Navigation, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Zap,
  Radio,
  Activity,
  User
} from 'lucide-react';

interface FieldAgentProps {
  onBack: () => void;
}

export const FieldAgent: React.FC<FieldAgentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'dispatch' | 'alerts'>('topology');

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Field Agent</h2>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            AGENT_ID: ARC_FIELD_07 // MODE: RAPID_RESPONSE
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'topology', icon: <MapIcon size={18} />, label: 'Service Topology' },
            { id: 'dispatch', icon: <Navigation size={18} />, label: 'ARC Dispatch' },
            { id: 'alerts', icon: <Radio size={18} />, label: 'Signal Alerts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                  : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Network Load</h4>
            <div className="flex items-center gap-2 mb-2">
              <Activity size={14} className="text-orange-500" />
              <span className="text-sm font-bold text-white font-mono">1.2 TB/s</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[85%]" />
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 uppercase font-bold">Peak Utilization Zone A</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeTab === 'topology' && (
              <Motion.div 
                key="topology"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Mock Map Representation */}
                <div className="relative aspect-video w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px]" />
                  </div>
                  
                  {/* Outage Cluster */}
                  <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500/10 rounded-full animate-pulse border border-red-500/20" />
                  <div className="absolute top-[30%] left-[38%] p-1 bg-red-600 rounded-full">
                    <AlertTriangle size={12} className="text-white" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-black border border-zinc-800 p-2 rounded text-[9px]">
                      <span className="text-red-400 font-bold block uppercase">Zone 4 Outage</span>
                      <span className="text-zinc-500">Node: EPIC-442-B</span>
                    </div>
                  </div>

                  {/* Tech Locations */}
                  {[
                    { top: '40%', left: '60%', name: 'T1: Mike', status: 'Active' },
                    { top: '70%', left: '20%', name: 'T2: Sarah', status: 'En Route' },
                    { top: '20%', left: '80%', name: 'T3: Alex', status: 'Idle' }
                  ].map((tech, i) => (
                    <div key={i} className="absolute transition-all cursor-pointer" style={{ top: tech.top, left: tech.left }}>
                      <div className="p-1 bg-blue-600 rounded-full ring-4 ring-blue-500/20">
                        <User size={12} className="text-white" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[8px] font-bold text-zinc-400">
                        {tech.name}
                      </div>
                    </div>
                  ))}

                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-zinc-800 p-4 rounded-xl">
                    <h5 className="text-[10px] font-bold text-white uppercase tracking-widest mb-2">Topology Legend</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[9px] text-zinc-400">
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        Critical Outage
                      </div>
                      <div className="flex items-center gap-2 text-[9px] text-zinc-400">
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        Tech Location
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Outage Analysis</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      ARC has correlated <span className="text-white font-bold">Zone 4</span> outage with a localized power grid surge. <span className="text-orange-400">322 subscribers</span> impacted. Estimated recovery: <span className="text-white">42 mins</span>.
                    </p>
                    <button className="w-full py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 rounded text-[10px] font-bold transition-all uppercase">
                      Notify impacted users
                    </button>
                  </div>
                  <div className="p-6 bg-orange-900/10 border border-orange-500/20 rounded-xl">
                    <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Zap size={14} />
                      Predictive Maintenance
                    </h4>
                    <p className="text-xs text-zinc-400 mb-4">
                      Node <span className="text-white">EPIC-11-C</span> showing signal degradation (12% drop). ARC recommends dispatching a tech before failure occurs.
                    </p>
                    <div className="flex justify-end">
                      <button className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-[10px] font-bold text-white uppercase rounded transition-all shadow-lg shadow-orange-600/20">
                        Dispatch Tech
                      </button>
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'dispatch' && (
              <Motion.div 
                key="dispatch"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Live Dispatch Queue</h3>
                    <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] font-bold text-blue-500 uppercase">AI-Optimized</div>
                  </div>
                  <div className="divide-y divide-zinc-800/50">
                    {[
                      { tech: "Mike Ross", task: "Zone 4 Repair", priority: "CRITICAL", est: "12m", status: "En Route" },
                      { tech: "Sarah Walker", task: "Business Fiber Install", priority: "HIGH", est: "45m", status: "On Site" },
                      { tech: "Alex Mercer", task: "Routine Node Check", priority: "LOW", est: "1h 20m", status: "Staging" }
                    ].map((job, i) => (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-all">
                        <div className="flex gap-4">
                          <div className={`mt-1 w-2 h-2 rounded-full ${
                            job.priority === 'CRITICAL' ? 'bg-red-500 animate-pulse' :
                            job.priority === 'HIGH' ? 'bg-orange-500' : 'bg-blue-500'
                          }`} />
                          <div>
                            <div className="text-sm font-bold text-white">{job.tech}</div>
                            <div className="text-[10px] text-zinc-500 uppercase font-mono">{job.task}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-zinc-400 font-mono">ETA: {job.est}</div>
                          <div className="text-[10px] text-orange-400 font-bold uppercase">{job.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
