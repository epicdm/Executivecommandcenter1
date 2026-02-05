import React, { useState } from 'react';
import { motion as Motion } from 'motion/react';
import { 
  Shield, 
  Settings, 
  DollarSign, 
  Truck, 
  Mail, 
  AlertCircle,
  Lock,
  Unlock,
  Sliders
} from 'lucide-react';

interface Policy {
  id: string;
  name: string;
  description: string;
  status: 'enabled' | 'disabled' | 'restricted';
  threshold: number;
  unit: string;
  icon: React.ReactNode;
}

export const AutonomyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: 'P-01',
      name: 'Automated Fee Waivers',
      description: 'ARC can waive late fees for customers with loyalty scores > 80.',
      status: 'enabled',
      threshold: 500,
      unit: 'USD',
      icon: <DollarSign size={20} />
    },
    {
      id: 'P-02',
      name: 'Autonomous Technician Dispatch',
      description: 'Auto-dispatch techs for signal degradation > 15% in Zone 4.',
      status: 'restricted',
      threshold: 15,
      unit: '%',
      icon: <Truck size={20} />
    },
    {
      id: 'P-03',
      name: 'AI Retention Offers',
      description: 'ARC can offer discount plans to high-churn risk accounts.',
      status: 'enabled',
      threshold: 12,
      unit: 'Months',
      icon: <Mail size={20} />
    },
    {
      id: 'P-05',
      name: 'Caribbean Resilience Protocol',
      description: 'Auto-throttle non-critical traffic during regional storm warnings.',
      status: 'enabled',
      threshold: 5,
      unit: 'Level',
      icon: <Activity size={20} />
    },
    {
      id: 'P-04',
      name: 'Tier 1 Support Resolution',
      description: 'Full autonomy for password resets and standard billing queries.',
      status: 'enabled',
      threshold: 100,
      unit: '%',
      icon: <Settings size={20} />
    }
  ]);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-xl">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Autonomy Policy Engine</h2>
            <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2">
              <Lock size={12} className="text-amber-500" />
              L4_GOVERNANCE_PROTOCOL // ENFORCED
            </div>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all text-xs font-bold uppercase"
        >
          Return to Hub
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Policy List */}
        <div className="lg:col-span-8 space-y-4">
          {policies.map((policy) => (
            <div 
              key={policy.id}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl group hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-blue-500">
                    {policy.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{policy.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{policy.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-zinc-600">Status</span>
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          policy.status === 'enabled' ? 'bg-emerald-500/10 text-emerald-500' :
                          policy.status === 'restricted' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {policy.status === 'enabled' ? <Unlock size={10} /> : <Lock size={10} />}
                          {policy.status}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-zinc-600">Threshold</span>
                        <span className="text-xs font-mono text-zinc-300">{policy.threshold} {policy.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-[10px] font-bold uppercase transition-all">
                    Edit Limits
                  </button>
                  <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded text-[10px] font-bold uppercase transition-all">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Governance Settings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <Sliders size={16} className="text-blue-500" />
              Global Governors
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-400">Total Autonomy Cap</span>
                  <span className="text-xs font-mono text-white">$10,000/day</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[65%]" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-400">Escalation Sensitivity</span>
                  <span className="text-xs font-mono text-white">Aggressive</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[85%]" />
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-2 text-amber-500 mb-2">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-bold uppercase">Governor Warning</span>
                </div>
                <p className="text-[11px] text-zinc-500 italic">
                  "Current escalation sensitivity may trigger excessive executive alerts during signal storms."
                </p>
              </div>

              <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase transition-all shadow-lg shadow-blue-500/20">
                Commit Governance Changes
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">L4 Verification Logs</h3>
            <div className="space-y-3 mb-6">
              {[
                { time: '10:12 AM', user: 'Exec_01', action: 'Waive $450', status: 'Approved' },
                { time: '09:45 AM', user: 'Exec_01', action: 'Node_Reset_Z4', status: 'Approved' }
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-[9px] font-mono p-2 bg-zinc-950 rounded border border-zinc-900">
                  <span className="text-zinc-600">{log.time}</span>
                  <span className="text-zinc-300">{log.action}</span>
                  <span className="text-emerald-500">{log.status}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mb-4">All autonomous changes require biometric confirmation for values exceeding $1,000.</p>
            <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-500">
              <Shield size={14} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Biometric Link Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
