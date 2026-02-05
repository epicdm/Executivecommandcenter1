import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ChevronDown, 
  Check, 
  MapPin, 
  Wifi, 
  Network,
  Building2
} from 'lucide-react';

export interface Tenant {
  id: string;
  name: string;
  region: string;
  status: 'online' | 'warning' | 'critical';
  infrastructure: string;
}

const tenants: Tenant[] = [
  { id: 'EPIC-HQ', name: 'EPIC Headquarters', region: 'St. Lucia (Castries)', status: 'online', infrastructure: 'Primary Fiber Cluster' },
  { id: 'EPIC-BAR', name: 'EPIC Barbados', region: 'Bridgetown', status: 'online', infrastructure: 'Main Satellite Array' },
  { id: 'EPIC-TRI', name: 'EPIC Trinidad', region: 'Port of Spain', status: 'warning', infrastructure: 'Southern Grid Nexus' },
  { id: 'EPIC-JAM', name: 'EPIC Jamaica', region: 'Kingston', status: 'online', infrastructure: 'West Node 4.0' },
  { id: 'EPIC-GRE', name: 'EPIC Grenada', region: 'St. George\'s', status: 'critical', infrastructure: 'Hurricane-Resistant Core' }
];

interface TenantSwitcherProps {
  onManageInfra: () => void;
}

export const TenantSwitcher: React.FC<TenantSwitcherProps> = ({ onManageInfra }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTenant, setActiveTenant] = useState(tenants[0]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all group"
      >
        <div className="w-8 h-8 bg-blue-600/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-500">
          <Globe size={18} />
        </div>
        <div className="text-left hidden lg:block">
          <div className="text-[10px] font-bold uppercase text-zinc-500 tracking-tighter">Current Entity</div>
          <div className="text-xs font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
            {activeTenant.name}
            <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <Motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-4 w-72 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-900 bg-zinc-900/20">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Building2 size={12} />
                  Switch Business Entity
                </h3>
              </div>
              <div className="p-2 max-h-[400px] overflow-y-auto">
                {tenants.map((tenant) => (
                  <button
                    key={tenant.id}
                    onClick={() => {
                      setActiveTenant(tenant);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group hover:bg-zinc-900/50 ${activeTenant.id === tenant.id ? 'bg-zinc-900 border border-zinc-800' : 'border border-transparent'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      tenant.status === 'online' ? 'bg-emerald-500' : 
                      tenant.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <div className="text-left flex-1">
                      <div className="text-xs font-bold text-zinc-100 group-hover:text-white transition-colors">
                        {tenant.name}
                      </div>
                      <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <MapPin size={10} />
                        {tenant.region}
                      </div>
                    </div>
                    {activeTenant.id === tenant.id && (
                      <Check size={14} className="text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-zinc-900 bg-zinc-900/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase">Infra Status</div>
                  <div className="text-[9px] font-mono text-zinc-400">{activeTenant.infrastructure}</div>
                </div>
                <button 
                  onClick={() => {
                    onManageInfra();
                    setIsOpen(false);
                  }}
                  className="w-full py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Network size={12} />
                  Manage Global Infra
                </button>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
