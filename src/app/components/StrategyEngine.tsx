import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  Users, 
  BrainCircuit, 
  BarChart3, 
  Play, 
  RefreshCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface StrategyEngineProps {
  onBack: () => void;
}

export const StrategyEngine: React.FC<StrategyEngineProps> = ({ onBack }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const scenarios = [
    { 
      id: 1, 
      title: "Aggressive Collection Pivot", 
      description: "Increase collection automation frequency for B2B accounts >$10k balance.",
      impact: "Increase Cash Position by $42k within 30 days.",
      risk: "2.4% customer churn risk in SMB sector."
    },
    { 
      id: 2, 
      title: "Regional Sales Expansion", 
      description: "Redirect Support-to-Sales resources to St. Lucia region following infrastructure upgrade.",
      impact: "Projected $120k ARR increase in Q2.",
      risk: "Temporary 15% SLA degradation in legacy support tickets."
    }
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    const interval = setInterval(() => {
      setSimulationStep(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const simulationData = [
    { name: 'Baseline', value: 400 },
    { name: 'Week 1', value: 450 },
    { name: 'Week 2', value: 420 },
    { name: 'Week 3', value: 580 },
    { name: 'Week 4', value: simulationStep > 50 ? 700 : 580 },
    { name: 'Target', value: 850 },
  ];

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
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Strategy Simulation</h2>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            ENGINE_STATUS: ARC_PREDICTIVE_V4 // ACCURACY: 94.2%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scenario Selection */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Select ARC Strategy Scenario</h3>
          {scenarios.map((scenario) => (
            <div 
              key={scenario.id}
              className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-purple-500/50 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white">{scenario.title}</h4>
                <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded">
                  <Target size={14} />
                </div>
              </div>
              <p className="text-xs text-zinc-500 mb-4">{scenario.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase">
                  <TrendingUp size={12} />
                  Impact: {scenario.impact}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-red-400 font-bold uppercase">
                  <AlertCircle size={12} />
                  Risk: {scenario.risk}
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); runSimulation(); }}
                className="w-full mt-4 py-2 bg-purple-600/10 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/30 rounded text-[10px] font-bold transition-all uppercase"
              >
                Model Scenario
              </button>
            </div>
          ))}

          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">ARC Reasoning Logic</h4>
            <div className="space-y-3">
              <div className="text-[10px] text-zinc-400 italic">
                "Strategy 1 leverages the recent connectivity stability in Zone 4 to apply firmer collection measures without significant risk of technical-based churn."
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                <span className="text-[9px] text-zinc-500 uppercase font-mono">Cross-Dept Correlation: Finance + Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Output */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Simulation Projection</h3>
                <p className="text-[10px] text-zinc-500 mt-1">Modeling 30-day outcomes based on selected strategy.</p>
              </div>
              {isSimulating && (
                <div className="flex items-center gap-4">
                  <div className="text-[10px] font-mono text-purple-400">Processing: {simulationStep}%</div>
                  <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-100" style={{ width: `${simulationStep}%` }} />
                  </div>
                </div>
              )}
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulationData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={10} />
                  <YAxis stroke="#71717a" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '10px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#a855f7" fillOpacity={1} fill="url(#colorValue)" />
                  <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <AnimatePresence>
              {simulationStep === 100 && (
                <Motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-emerald-500" />
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">Simulation Success</div>
                      <div className="text-[10px] text-zinc-400">ARC recommends immediate execution of Scenario 1.</div>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase rounded-lg transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2">
                    <Zap size={14} />
                    Commit to ARC Nexus
                  </button>
                </Motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Users size={16} />
                Human Resource Directive
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Collections Team", task: "Contact Top 5 High-Risk Accounts", urgency: "High" },
                  { name: "Field Ops", task: "Deferred maintenance on Node EPIC-12", urgency: "Low" }
                ].map((d, i) => (
                  <div key={i} className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{d.name}</div>
                      <div className="text-[10px] text-zinc-500">{d.task}</div>
                    </div>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      d.urgency === 'High' ? 'bg-orange-500/10 text-orange-400' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {d.urgency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <BrainCircuit size={16} />
                Strategic Anchors
              </h4>
              <ul className="space-y-2">
                <li className="text-[10px] text-zinc-400 flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full" />
                  Maximized ARR through cross-tier upsells.
                </li>
                <li className="text-[10px] text-zinc-400 flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full" />
                  SLA maintenance via autonomous ticket routing.
                </li>
                <li className="text-[10px] text-zinc-400 flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full" />
                  Odoo ERP data integrity (100% verification).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
