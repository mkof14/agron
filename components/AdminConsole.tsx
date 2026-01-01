
import React, { useState, useEffect } from 'react';

type AdminView = 
  | 'dashboard' 
  | 'requests' 
  | 'rbac' 
  | 'comms' 
  | 'marketing' 
  | 'training-repo' 
  | 'system-noc'
  | 'github-integration'
  | 'dev-profile';

type SubTab = 'REPOS' | 'DEPLOYMENTS' | 'SECURITY';

interface DeployLog {
  time: string;
  type: 'SYS' | 'GH' | 'VERCEL' | 'NOC' | 'SEC' | 'DEV';
  msg: string;
  status: 'info' | 'success' | 'warn' | 'err';
}

interface DeploymentRecord {
  id: string;
  env: 'PROD' | 'STAGING';
  version: string;
  time: string;
  user: string;
}

interface DevProfile {
  name: string;
  engId: string;
  githubHandle: string;
  githubRepoUrl: string;
  role: string;
  node: string;
}

const AdminConsole: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<AdminView>('dev-profile');
  const [subTab, setSubTab] = useState<SubTab>('DEPLOYMENTS');
  const [ghStatus, setGhStatus] = useState<'CONNECTED' | 'DETACHED' | 'AUTHENTICATING'>('DETACHED');
  const [githubToken, setGithubToken] = useState('');
  const [backendHealth, setBackendHealth] = useState<'READY' | 'DOWN' | 'PENDING'>('PENDING');
  
  // Hardcoded to mkof14/agron for the institutional profile
  const [devProfile, setDevProfile] = useState<DevProfile>(() => {
    const saved = localStorage.getItem('agron_dev_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Infrastructure Engineer',
      engId: 'ENG-4402-DELTA',
      githubHandle: 'mkof14',
      githubRepoUrl: 'https://github.com/mkof14/agron.git',
      role: 'System Architect',
      node: 'USA-IAD-01'
    };
  });

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [isStagingDeploying, setIsStagingDeploying] = useState(false);
  const [stagingDeployProgress, setStagingDeployProgress] = useState(0);

  const [logs, setLogs] = useState<DeployLog[]>([
    { time: new Date().toLocaleTimeString('en-GB'), type: 'SYS', msg: 'Identity Shift Detected: agron platform core.', status: 'info' },
    { time: new Date().toLocaleTimeString('en-GB'), type: 'GH', msg: 'Target Repository: mkof14/agron established.', status: 'success' },
  ]);

  const addLog = (type: DeployLog['type'], msg: string, status: DeployLog['status'] = 'info') => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [{ time, type, msg, status }, ...prev].slice(0, 50));
  };

  const saveDevProfile = () => {
    localStorage.setItem('agron_dev_profile', JSON.stringify(devProfile));
    addLog('DEV', `Identity committed. Current repository: ${devProfile.githubRepoUrl}`, 'success');
    alert("Institutional Developer Profile Commited.");
  };

  const handleConnectGithub = async () => {
    if (!githubToken) return;
    setGhStatus('AUTHENTICATING');
    addLog('GH', 'Authenticating tunnel to mkof14/agron...', 'info');
    setTimeout(() => {
      setGhStatus('CONNECTED');
      addLog('GH', 'Infrastructure sync verified.', 'success');
    }, 1200);
  };

  const triggerDeploy = async () => {
    if (ghStatus !== 'CONNECTED') return;
    setIsDeploying(true);
    setDeployProgress(0);
    addLog('VERCEL', 'Production push to agron initiated.', 'info');
    const interval = setInterval(() => {
      setDeployProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          addLog('VERCEL', 'Node production updated successfully.', 'success');
          return 100;
        }
        return p + 10;
      });
    }, 100);
  };

  useEffect(() => {
    if (isAuthenticated) addLog('SYS', 'Session Established. Ready for development push.', 'info');
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md bg-agron-900 border border-gray-800 p-10 shadow-2xl rounded-sm">
           <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">agron ADMIN</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2 font-mono">Infrastructure Authentication</p>
           </div>
           <button onClick={() => setIsAuthenticated(true)} className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-agron-accent hover:text-white transition-all shadow-xl">Establish Session</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row font-sans text-gray-300">
       <aside className="w-full lg:w-72 bg-agron-900 border-r border-gray-800 flex-shrink-0 flex flex-col z-20">
          <div className="p-8 border-b border-gray-800">
             <h1 className="text-2xl font-black tracking-tighter text-white uppercase">agron.</h1>
             <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mt-1">NOC Control v5.2</span>
          </div>
          <nav className="flex-1 p-4 space-y-1">
             <SidebarBtn label="Dev Profile" active={activeView === 'dev-profile'} onClick={() => setActiveView('dev-profile')} icon="🛠️" />
             <SidebarBtn label="Infrastructure" active={activeView === 'github-integration'} onClick={() => setActiveView('github-integration')} icon="🏗️" />
             <SidebarBtn label="Dashboard" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} icon="📊" />
          </nav>
          <div className="p-6 border-t border-gray-800">
             <div className="flex items-center gap-3 mb-6 px-4">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">{devProfile.githubHandle}</span>
             </div>
             <button onClick={() => setIsAuthenticated(false)} className="w-full text-[10px] font-black uppercase text-gray-500 hover:text-white">Terminate</button>
          </div>
       </aside>

       <main className="flex-1 flex flex-col overflow-hidden bg-grid-pattern">
          <header className="bg-black/60 backdrop-blur-xl border-b border-gray-800 px-10 py-6 flex justify-between items-center">
             <h2 className="text-lg font-black text-white uppercase tracking-tight">
               {activeView === 'dev-profile' ? 'System Identity' : 'Platform Control'}
             </h2>
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">NOC_ONLINE</span>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
             <div className="lg:col-span-8 space-y-8">
                {activeView === 'dev-profile' && (
                  <section className="bg-agron-900 border border-gray-800 rounded-sm overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-gray-800 bg-black/40 flex justify-between items-center">
                       <h3 className="text-xl font-black text-white uppercase tracking-tighter">Identity Configuration</h3>
                       <span className="px-3 py-1 bg-green-900/30 border border-green-500/50 text-green-500 text-[10px] font-black uppercase tracking-widest">Verified_Engineer</span>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4 md:col-span-2">
                           <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Repository Root (Primary)</label>
                           <input 
                              type="text"
                              value={devProfile.githubRepoUrl}
                              onChange={(e) => setDevProfile({...devProfile, githubRepoUrl: e.target.value})}
                              className="w-full bg-black border border-gray-800 text-white font-mono text-sm p-4 rounded-sm outline-none focus:border-agron-accent"
                           />
                        </div>
                        <div className="space-y-4">
                           <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Operator Designation</label>
                           <input type="text" value={devProfile.name} onChange={(e) => setDevProfile({...devProfile, name: e.target.value})} className="w-full bg-black border border-gray-800 text-white font-mono text-sm p-4 rounded-sm outline-none focus:border-agron-accent" />
                        </div>
                        <div className="space-y-4">
                           <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">GitHub Handle</label>
                           <input type="text" value={devProfile.githubHandle} onChange={(e) => setDevProfile({...devProfile, githubHandle: e.target.value})} className="w-full bg-black border border-gray-800 text-white font-mono text-sm p-4 rounded-sm outline-none focus:border-agron-accent" />
                        </div>
                        <div className="md:col-span-2 pt-4 border-t border-gray-800 text-right">
                           <button onClick={saveDevProfile} className="px-10 py-4 bg-agron-accent text-white font-black text-xs uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl">Commit Identity Shift</button>
                        </div>
                    </div>
                  </section>
                )}

                {activeView === 'github-integration' && (
                  <section className="bg-agron-900 border border-gray-800 rounded-sm overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-gray-800 bg-black/40 flex justify-between items-center">
                       <h3 className="text-xl font-black text-white uppercase tracking-tighter">Infrastructure Control</h3>
                       <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${ghStatus === 'CONNECTED' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-[9px] font-mono font-black uppercase text-gray-400 tracking-widest">[{ghStatus}]</span>
                       </div>
                    </div>
                    <div className="p-8 space-y-8">
                       <div className="space-y-4">
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">GitHub Personal Access Token</label>
                          <div className="flex gap-4">
                             <input type="password" value={githubToken} onChange={(e) => setGithubToken(e.target.value)} placeholder="ghp_****************" className="flex-1 bg-black border border-gray-800 text-white font-mono text-sm p-4 rounded-sm outline-none focus:border-agron-accent" />
                             <button onClick={handleConnectGithub} className="px-8 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-agron-accent hover:text-white transition-all">Establish</button>
                          </div>
                       </div>
                       {ghStatus === 'CONNECTED' && (
                         <div className="space-y-4 animate-fade-in">
                           <div className="p-4 bg-black border border-gray-800 font-mono text-[10px] text-gray-400">
                             <span className="text-green-500 block">✓ TARGET_ROOT: mkof14/agron</span>
                             <span className="block">✓ IDENTITY_VERIFIED: {devProfile.engId}</span>
                           </div>
                           <button onClick={triggerDeploy} disabled={isDeploying} className="w-full py-4 bg-agron-accent text-white font-black text-xs uppercase tracking-widest shadow-xl hover:bg-amber-500 transition-all">
                              {isDeploying ? `Updating Node... ${deployProgress}%` : 'Push Production Deployment'}
                           </button>
                         </div>
                       )}
                    </div>
                  </section>
                )}

                {activeView === 'dashboard' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <StatBox label="Repository Health" value="OPTIMAL" />
                     <StatBox label="Vercel Endpoint" value="ACTIVE" />
                  </div>
                )}
             </div>

             <div className="lg:col-span-4 flex flex-col h-full space-y-4">
                <div className="flex-1 bg-agron-900 border border-gray-800 flex flex-col shadow-2xl overflow-hidden min-h-[500px]">
                   <div className="p-4 bg-black/80 border-b border-gray-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500 font-mono">
                       <span>agron_NOC_LOGS</span>
                       <button onClick={() => setLogs([])} className="hover:text-white transition-colors">PURGE</button>
                   </div>
                   <div className="flex-1 p-6 font-mono text-[11px] space-y-3 overflow-y-auto bg-black/20 text-gray-500">
                      {logs.map((log, i) => (
                         <div key={i} className="flex gap-4 border-b border-white/5 pb-2">
                            <span className="text-gray-700">[{log.time}]</span>
                            <span className={`font-black uppercase flex-shrink-0 text-agron-accent`}>[{log.type}]</span>
                            <span className={log.status === 'success' ? 'text-green-500' : 'text-gray-400'}>{log.msg}</span>
                         </div>
                      ))}
                   </div>
                </div>
                <div className="p-4 bg-black/40 border border-gray-800 rounded-sm">
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Sync Parameters</span>
                   <div className="text-[9px] font-mono text-gray-600 space-y-1">
                      <div>REPOS: mkof14/agron</div>
                      <div>STATUS: NOMINAL</div>
                   </div>
                </div>
             </div>
          </div>
       </main>
    </div>
  );
};

const SidebarBtn: React.FC<{ label: string; active: boolean; onClick: () => void; icon: string }> = ({ label, active, onClick, icon }) => (
    <button onClick={onClick} className={`w-full text-left px-5 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest flex items-center gap-4 transition-all ${active ? 'bg-white text-black translate-x-1 shadow-lg' : 'text-gray-500 hover:bg-slate-800 hover:text-white'}`}>
      <span>{icon}</span>{label}
    </button>
);

const StatBox: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-10 bg-agron-900 border border-gray-800 rounded-sm hover:border-agron-accent transition-all group">
     <span className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">{label}</span>
     <span className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-agron-accent transition-colors">{value}</span>
  </div>
);

export default AdminConsole;
