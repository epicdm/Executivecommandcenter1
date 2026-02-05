import React, { useState, useEffect } from 'react';
import { StatCard } from './components/StatCard';
import { DepartmentCard } from './components/DepartmentCard';
import { CommandCenter } from './components/CommandCenter';
import { Insights, OpsLog } from './components/Insights';
import { CollectionsAgent } from './components/CollectionsAgent';
import { SupportAgent } from './components/SupportAgent';
import { SalesAgent } from './components/SalesAgent';
import { FinanceAgent } from './components/FinanceAgent';
import { FieldAgent } from './components/FieldAgent';
import { StrategyEngine } from './components/StrategyEngine';
import { MemoryVault } from './components/MemoryVault';
import { AutonomyPolicy } from './components/AutonomyPolicy';
import { GlobalInfra } from './components/GlobalInfra';
import { GovernanceBridge } from './components/GovernanceBridge';
import { BusinessCodeLedger } from './components/BusinessCodeLedger';
import { CaribbeanPulse } from './components/CaribbeanPulse';
import { DirectivesConsole } from './components/DirectivesConsole';
import { BiometricAuth } from './components/BiometricAuth';
import { ResilienceCommand } from './components/ResilienceCommand';
import { MarketInvasionEngine } from './components/MarketInvasionEngine';
import { HumanComputeMesh } from './components/HumanComputeMesh';
import { WarRoom } from './components/WarRoom';
import { TenantSwitcher } from './components/TenantSwitcher';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { 
  DollarSign, 
  Target, 
  Headphones, 
  Wrench, 
  Bell, 
  Settings, 
  Search,
  Cpu,
  ShieldCheck,
  ShieldAlert,
  Menu,
  X,
  Wind,
  Globe,
  Code,
  Crosshair
} from 'lucide-react';
import { Toaster } from 'sonner';

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'collections' | 'support' | 'sales' | 'finance' | 'field' | 'strategy' | 'memory' | 'policy' | 'global-infra' | 'ledger' | 'resilience' | 'invasion'>('dashboard');
  const [showWarRoom, setShowWarRoom] = useState(false);
  const [isBiometricOpen, setIsBiometricOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState({ name: '', callback: () => {} });
  const [governanceState, setGovernanceState] = useState<{
    isOpen: boolean;
    command: string;
    impact: { category: string; value: string; risk: 'Low' | 'Medium' | 'High' };
    onApprove: () => void;
  }>({
    isOpen: false,
    command: '',
    impact: { category: '', value: '', risk: 'Low' },
    onApprove: () => {}
  });

  const triggerGovernance = (command: string, category: string, value: string, risk: 'Low' | 'Medium' | 'High', onApprove: () => void) => {
    setPendingAction({ name: command, callback: onApprove });
    setIsBiometricOpen(true);
    // Previous governance bridge can be integrated or replaced by biometric
  };

  useEffect(() => {
    // Add a global listener for the terminal to trigger views if needed
    // This makes the terminal feel more connected
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-blue-500/30">
      <Toaster position="top-right" theme="dark" richColors />
      
      <AnimatePresence>
        {showWarRoom && <WarRoom onClose={() => setShowWarRoom(false)} />}
      </AnimatePresence>

      <BiometricAuth 
        isOpen={isBiometricOpen} 
        onClose={() => setIsBiometricOpen(false)} 
        onVerified={pendingAction.callback} 
        actionName={pendingAction.name} 
      />

      <GovernanceBridge 
        isOpen={governanceState.isOpen}
        command={governanceState.command}
        impact={governanceState.impact}
        onClose={() => setGovernanceState(prev => ({ ...prev, isOpen: false }))}
        onApprove={governanceState.onApprove}
      />
      {/* Top Header */}
      <header className="h-16 border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveView('dashboard')}>
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
            <Cpu className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-white uppercase italic">ARC Command</h1>
            <div className="text-[10px] text-zinc-500 font-mono tracking-widest flex items-center gap-1">
              <ShieldCheck size={10} className="text-green-500" />
              SYSTEMS_NOMINAL // V0.1_BETA
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveView('resilience')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${activeView === 'resilience' ? 'bg-blue-600/20 text-blue-400' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
          >
            <Wind size={14} />
            <span className="hidden sm:inline">Resilience</span>
          </button>
          <button 
            onClick={() => setActiveView('invasion')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${activeView === 'invasion' ? 'bg-red-600/20 text-red-400' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
          >
            <Crosshair size={14} />
            <span className="hidden sm:inline">Invasion</span>
          </button>
          <button 
            onClick={() => setActiveView('global-infra')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${activeView === 'global-infra' ? 'bg-blue-600/20 text-blue-400' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
          >
            <Globe size={14} />
            <span className="hidden sm:inline">Infra</span>
          </button>
          <TenantSwitcher onManageInfra={() => setActiveView('global-infra')} />
          <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-xs">
            <Search size={14} className="text-zinc-600" />
            <input type="text" placeholder="Global system search..." className="bg-transparent border-none focus:outline-none w-48 text-zinc-400" />
            <span className="text-[10px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">⌘K</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-zinc-500 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button 
              onClick={() => setActiveView('policy')}
              className="p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden bg-zinc-800">
              <ImageWithFallback src="https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBleGVjdXRpdmUlMjBhdmF0YXIlMjBwcm9maWxlfGVufDF8fHx8MTc3MDI0NTA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8 max-w-[1600px] mx-auto">
          {activeView === 'collections' ? (
            <CollectionsAgent onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'support' ? (
            <SupportAgent onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'sales' ? (
            <SalesAgent onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'finance' ? (
            <FinanceAgent onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'field' ? (
            <FieldAgent onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'strategy' ? (
            <StrategyEngine onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'memory' ? (
            <MemoryVault onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'policy' ? (
            <AutonomyPolicy onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'global-infra' ? (
            <GlobalInfra onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'resilience' ? (
            <ResilienceCommand onBack={() => setActiveView('dashboard')} />
          ) : activeView === 'invasion' ? (
            <MarketInvasionEngine onBack={() => setActiveView('dashboard')} />
          ) : (
            <>
              {/* Executive Overview */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                    <span className="w-8 h-px bg-zinc-800" />
                    Executive Overview
                  </h2>
                  <div className="text-[10px] font-mono text-zinc-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    LIVE_ODOO_LINK: ACTIVE
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard label="Cash Position" value="$127,482" color="blue" trend="+12% vs last month" trendType="up" />
                  <StatCard label="Runway" value="4.2 months" color="yellow" trend="-0.3 months" trendType="down" />
                  <StatCard label="Health Score" value="87/100" color="green" trend="Stable" trendType="neutral" />
                  <div className="flex flex-col gap-2 justify-center px-4">
                    <button 
                      onClick={() => setActiveView('collections')}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-500/5 border border-red-500/20 px-3 py-1.5 rounded-full hover:bg-red-500/10 transition-all text-left"
                    >
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      Collections needs you
                    </button>
                    <button 
                      onClick={() => setActiveView('sales')}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-yellow-400 bg-yellow-500/5 border border-yellow-500/20 px-3 py-1.5 rounded-full hover:bg-yellow-500/10 transition-all text-left"
                    >
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                      Sales opportunity
                    </button>
                    <button 
                      onClick={() => setActiveView('finance')}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded-full hover:bg-emerald-500/10 transition-all text-left"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Finance: Review Runway
                    </button>
                  </div>
                </div>
              </section>

              {/* Departmental Command */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                    <span className="w-8 h-px bg-zinc-800" />
                    Live Departments (Click to Command)
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  <div onClick={() => setActiveView('finance')} className="cursor-pointer">
                    <DepartmentCard 
                      name="Finance" 
                      icon={<DollarSign size={20} />}
                      status="warning"
                      metrics={[
                        { label: "AR Balance", value: "$32,414", trend: "↓12% (Impv)", trendType: "up" },
                        { label: "DSO", value: "37 Days", trend: "+2 Days", trendType: "down" }
                      ]}
                    />
                  </div>
                  <div onClick={() => setActiveView('sales')} className="cursor-pointer">
                    <DepartmentCard 
                      name="Sales" 
                      icon={<Target size={20} />}
                      status="stable"
                      metrics={[
                        { label: "Pipeline", value: "$57K", trend: "+$12K Today", trendType: "up" },
                        { label: "Win Rate", value: "24%", trend: "+2%", trendType: "up" }
                      ]}
                    />
                  </div>
                  <div onClick={() => setActiveView('support')} className="cursor-pointer">
                    <DepartmentCard 
                      name="Support" 
                      icon={<Headphones size={20} />}
                      status="stable"
                      metrics={[
                        { label: "Open Tickets", value: "61", trend: "-5 Since 9AM", trendType: "up" },
                        { label: "SLA Status", value: "94%", trend: "Critical (80%)", trendType: "down" }
                      ]}
                    />
                  </div>
                  <div onClick={() => setShowWarRoom(true)} className="cursor-pointer group">
                    <DepartmentCard 
                      name="Field" 
                      icon={<Wrench size={20} />}
                      status="critical"
                      metrics={[
                        { label: "Active Techs", value: "8/10", trend: "Capacity Hit", trendType: "down" },
                        { label: "Avg Resolution", value: "2.3h", trend: "-15m", trendType: "up" }
                      ]}
                    />
                    <div className="mt-2 text-[9px] text-red-500 font-bold uppercase animate-pulse flex items-center gap-1 justify-center">
                      <ShieldAlert size={10} />
                      Click to Enter War Room
                    </div>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Command Interface */}
                <div className="lg:col-span-7">
                  <CommandCenter 
                    onNavigate={(view: any) => setActiveView(view)} 
                    onTriggerGovernance={triggerGovernance}
                  />
                  <div className="mt-6">
                    <BusinessCodeLedger />
                  </div>
                </div>
                
                {/* Insights & Market Pulse */}
                <div className="lg:col-span-5 space-y-6">
                  <Insights />
                  <DirectivesConsole />
                  <CaribbeanPulse onExpand={() => setActiveView('resilience')} />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Operations Log */}
                <div className="lg:col-span-12">
                  <HumanComputeMesh />
                </div>
                <div className="lg:col-span-12">
                  <OpsLog />
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-10 grayscale contrast-150">
          <ImageWithFallback src="https://images.unsplash.com/photo-1762279388988-3f8abcc7dca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzcwMjQ1MDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>
    </div>
  );
}
