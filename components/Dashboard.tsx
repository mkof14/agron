
import React, { useEffect, useState } from 'react';
import { generateHeroImage } from '../services/geminiService';

interface Props {
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<Props> = ({ setActiveTab }) => {
  const [heroImageUrl, setHeroImageUrl] = useState('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070');
  const [isHeroAiLoaded, setIsHeroAiLoaded] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'ONLINE' | 'OFFLINE' | 'DETACHED' | 'CHECKING'>('CHECKING');
  const [aiNodeStatus, setAiNodeStatus] = useState<'ACTIVE' | 'STANDBY' | 'QUOTA_LIMITED'>('ACTIVE');
  const [serverTime, setServerTime] = useState<string | null>(null);
  
  const [systemStatus, setSystemStatus] = useState({
    profileActive: false,
    missionCount: 0,
    storageUsage: '0 KB',
    lastBackup: 'Pending Audit'
  });

  useEffect(() => {
    // 1. Initial Local Data Load
    const loadLocalData = () => {
        const profile = localStorage.getItem('agron_operator_profile');
        const missions = JSON.parse(localStorage.getItem('agron_mission_repository') || '[]');
        const backupTime = localStorage.getItem('agron_last_backup');
        
        let usageKB = '0.00';
        try {
            const totalBytes = unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
            usageKB = (totalBytes / 1024).toFixed(2);
        } catch(e) {}

        let formattedDate = 'Local Cache Only';
        if (backupTime && backupTime !== 'Never' && backupTime !== 'Pending Audit') {
            const parsed = new Date(backupTime);
            if (!isNaN(parsed.getTime())) {
                formattedDate = parsed.toLocaleDateString('en-GB');
            }
        }

        setSystemStatus({
            profileActive: !!profile,
            missionCount: missions.length,
            storageUsage: `${usageKB} KB`,
            lastBackup: formattedDate
        });
    };
    loadLocalData();

    // 2. Real-time Backend Pulse
    const probeBackend = async () => {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 3000);
            
            const res = await fetch('/api/readyz', { signal: controller.signal });
            clearTimeout(id);
            
            if (res.ok) {
                const data = await res.json();
                setServerTime(new Date(data.timestamp).toLocaleTimeString('en-GB'));
                
                if (data.db === 'detached') {
                    setBackendStatus('DETACHED');
                } else {
                    setBackendStatus('ONLINE');
                }
            } else {
                setBackendStatus('OFFLINE');
            }
        } catch (e) {
            setBackendStatus('OFFLINE');
        }
    };
    probeBackend();

    // 3. AI Visuals
    const initVisualSynthesis = async () => {
      const heroPrompt = 'A high-tech, futuristic training facility for aerial and ground robotics, with advanced simulation displays and professional operators.';
      try {
        const url = await generateHeroImage(heroPrompt);
        if (url) {
          setHeroImageUrl(url);
          setIsHeroAiLoaded(true);
          setAiNodeStatus('ACTIVE');
        } else {
          setAiNodeStatus('QUOTA_LIMITED');
        }
      } catch (err) {
        setAiNodeStatus('STANDBY');
      }
    };
    initVisualSynthesis();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
         <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ${isHeroAiLoaded ? 'scale-110 opacity-100' : 'scale-100 opacity-60'}`}
            style={{ backgroundImage: `url('${heroImageUrl}')` }}
         ></div>
         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90"></div>
         <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px w-12 bg-agron-accent opacity-50"></div>
                <span className="text-[11px] font-mono text-agron-accent uppercase tracking-[0.4em] font-black">
                  {serverTime ? `SYSTEM_TIME: ${serverTime} UTC` : 'AGRON INFRASTRUCTURE NODE: ALPHA'}
                </span>
                <div className="h-px w-12 bg-agron-accent opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-8 uppercase leading-[0.95] drop-shadow-2xl">
              Advanced Training & <br className="hidden md:block"/> Simulation for <span className="text-agron-accent">Aerial and Ground Robotics</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
              Institutional readiness for uncrewed systems. 
              AGRON standardizes excellence across industrial and defense sectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => setActiveTab('contact')} className="px-14 py-5 bg-white text-agron-900 font-black text-sm uppercase tracking-[0.2em] hover:bg-agron-accent hover:text-white transition-all shadow-2xl">Request Information</button>
              <button onClick={() => setActiveTab('simulation')} className="px-14 py-5 bg-black/40 border border-white/20 text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-xl">Access Simulation Core</button>
            </div>
         </div>
         <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-xl border-t border-white/10 py-4 px-10 hidden md:flex justify-between items-center z-10">
            <div className="flex gap-10 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
               <span>PLATFORM: AGRON-v5.2</span>
               <span className={backendStatus === 'DETACHED' ? 'text-amber-500' : ''}>NOC_HEARTBEAT: {backendStatus}</span>
               {serverTime && <span className="text-agron-accent">SYNC_TIME: {serverTime}</span>}
            </div>
            <div className="flex items-center gap-3">
               <div className={`h-2 w-2 rounded-full animate-pulse ${aiNodeStatus === 'ACTIVE' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : aiNodeStatus === 'QUOTA_LIMITED' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
               <span className={`text-[10px] font-mono uppercase tracking-widest font-black ${aiNodeStatus === 'ACTIVE' ? 'text-green-500' : aiNodeStatus === 'QUOTA_LIMITED' ? 'text-amber-500' : 'text-red-500'}`}>
                 AI Node: {aiNodeStatus}
               </span>
            </div>
         </div>
      </section>

      {/* System Diagnostics Strip */}
      <section className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 dark:divide-gray-800">
           <StatBlock label="Operator Link" value={systemStatus.profileActive ? 'Established' : 'Link Missing'} status={systemStatus.profileActive ? 'ok' : 'err'} />
           <StatBlock label="Mission Repository" value={`${systemStatus.missionCount} Secure Records`} />
           <StatBlock label="Data Throughput" value={`${systemStatus.storageUsage} Utilization`} />
           <StatBlock label="Platform Audit" value={systemStatus.lastBackup} status={systemStatus.lastBackup === 'Local Cache Only' ? 'warn' : 'ok'} />
        </div>
      </section>
    </div>
  );
};

const StatBlock: React.FC<{ label: string; value: string; status?: 'ok' | 'err' | 'warn' }> = ({ label, value, status }) => (
    <div className="p-8 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group">
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-black">{label}</span>
            {status && <span className={`h-2 w-2 rounded-full ${status === 'ok' ? 'bg-green-500' : status === 'err' ? 'bg-red-500' : 'bg-amber-500'}`}></span>}
        </div>
        <div className="text-sm md:text-xl font-black text-agron-900 dark:text-gray-100 uppercase tracking-tighter group-hover:text-agron-accent transition-colors">
            {value}
        </div>
    </div>
);

export default Dashboard;
