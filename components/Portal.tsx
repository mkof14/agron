import React, { useState, useRef, useEffect } from 'react';
import { OperatorProfile as ProfileType, SystemBackup } from '../types';

// --- TYPES & MOCKS ---

type PortalView = 'dashboard' | 'training-history' | 'certificates' | 'identity' | 'simulation-analytics';

interface TrainingRecord {
  id: string;
  name: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Scheduled' | 'Requested';
  score?: number;
}

const MOCK_TRAINING_HISTORY: TrainingRecord[] = [
  { id: "REQ-2024-001", name: "AgOps Multispectral Analysis", date: "2024-10-15", status: "Requested" },
  { id: "TRN-2024-88A", name: "BVLOS Command Protocols", date: "2024-08-20", status: "In Progress" },
  { id: "TRN-2024-10C", name: "Foundational Systems (ORL-1)", date: "2024-02-10", status: "Completed", score: 94 },
  { id: "SIM-2023-99X", name: "Emergency Descent Drill", date: "2023-11-05", status: "Completed", score: 88 },
];

const DEFAULT_PROFILE: ProfileType = {
  id: "OP-8821-X",
  fullName: "Alexei Volkov",
  callsign: "VANGUARD",
  clearanceLevel: "L3 - INSTRUCTOR",
  certifications: ["Rotary Wing Class A", "Fixed Wing Survey", "Night Ops", "AgOps Spraying"],
  flightHours: 1450.5,
  lastAssessmentDate: "2024-05-15"
};

const Portal: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Portal State
  const [activeView, setActiveView] = useState<PortalView>('dashboard');
  
  // Profile / Data State (Preserved from previous version)
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lastBackupTime, setLastBackupTime] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileType>(() => {
    const saved = localStorage.getItem('agron_operator_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  useEffect(() => {
    const backup = localStorage.getItem('agron_last_backup');
    if (backup) setLastBackupTime(backup);
    
    // Check if session is active
    const session = sessionStorage.getItem('agron_portal_session');
    if (session === 'active') setIsAuthenticated(true);
  }, []);

  // --- AUTH HANDLERS ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth - accept any code with > 3 chars for demo
    if (accessCode.length > 3) {
      setIsAuthenticated(true);
      sessionStorage.setItem('agron_portal_session', 'active');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('agron_portal_session');
    setAccessCode('');
  };

  // --- PROFILE HANDLERS ---
  const handleSaveProfile = () => {
    localStorage.setItem('agron_operator_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleExportSystem = () => {
    const missions = JSON.parse(localStorage.getItem('agron_mission_repository') || '[]');
    const now = new Date().toISOString();
    const backup: SystemBackup = {
      version: "2.5.0", timestamp: now, profile: profile, missions: missions
    };
    localStorage.setItem('agron_last_backup', now);
    setLastBackupTime(now);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `AGRON_BACKUP_${profile.callsign}_${now.slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backup: SystemBackup = JSON.parse(content);
        if (confirm(`DETECTED BACKUP: ${backup.timestamp}\n\nOverwriting current system state?`)) {
          localStorage.setItem('agron_operator_profile', JSON.stringify(backup.profile));
          localStorage.setItem('agron_mission_repository', JSON.stringify(backup.missions));
          setProfile(backup.profile);
          alert("System State Restored Successfully.");
        }
      } catch (error) {
        alert("CRITICAL ERROR: Corrupted backup file.");
      }
    };
    reader.readAsText(file);
    event.target.value = ''; 
  };

  // --- RENDER: LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-900 px-4">
         <div className="w-full max-w-md">
            <div className="text-center mb-10">
               <div className="inline-block border border-gray-700 bg-slate-800 p-4 rounded-sm mb-4">
                 <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
               </div>
               <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase">AGRON Secure Gateway</h1>
               <p className="text-gray-400 text-sm mt-2">Restricted Access. Authorized Personnel Only.</p>
            </div>

            <form onSubmit={handleLogin} className="bg-slate-950 border border-gray-800 p-8 rounded-sm shadow-2xl">
               <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Access Token / Invite Code</label>
                  <input 
                    type="password" 
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="w-full bg-slate-900 border border-gray-700 text-white font-mono text-center tracking-widest p-3 rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue outline-none transition-all"
                    placeholder="••••••••"
                  />
                  {authError && <p className="text-red-500 text-xs mt-2 text-center">INVALID CREDENTIALS</p>}
               </div>
               <button type="submit" className="w-full bg-agron-blue hover:bg-blue-700 text-white font-bold uppercase tracking-widest py-3 text-sm transition-colors rounded-sm">
                  Authenticate
               </button>
               <div className="mt-6 text-center border-t border-gray-800 pt-4">
                  <p className="text-xs text-gray-600">
                     Don't have an access token? <br/>
                     <span className="text-gray-500">Contact your Organization Administrator or submit an Intake Request.</span>
                  </p>
               </div>
            </form>
         </div>
      </div>
    );
  }

  // --- RENDER: PORTAL DASHBOARD ---
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-gray-800 text-white flex-shrink-0">
         <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
               <div className="h-8 w-8 bg-agron-blue rounded-full flex items-center justify-center text-xs font-bold">{profile.callsign.substring(0,2)}</div>
               <div>
                  <div className="text-sm font-bold truncate max-w-[120px]">{profile.callsign}</div>
                  <div className="text-[10px] text-gray-400 font-mono">ID: {profile.id}</div>
               </div>
            </div>
         </div>
         <nav className="p-4 space-y-1">
            <button 
               onClick={() => setActiveView('dashboard')}
               className={`w-full text-left px-4 py-3 text-sm font-medium rounded-sm flex items-center gap-3 ${activeView === 'dashboard' ? 'bg-agron-blue text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}
            >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
               Command Dashboard
            </button>
            <button 
               onClick={() => setActiveView('training-history')}
               className={`w-full text-left px-4 py-3 text-sm font-medium rounded-sm flex items-center gap-3 ${activeView === 'training-history' ? 'bg-agron-blue text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}
            >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
               Training Records
            </button>
            <button 
               onClick={() => setActiveView('certificates')}
               className={`w-full text-left px-4 py-3 text-sm font-medium rounded-sm flex items-center gap-3 ${activeView === 'certificates' ? 'bg-agron-blue text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}
            >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               Certifications
            </button>
            <button 
               onClick={() => setActiveView('identity')}
               className={`w-full text-left px-4 py-3 text-sm font-medium rounded-sm flex items-center gap-3 ${activeView === 'identity' ? 'bg-agron-blue text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}
            >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
               Identity & Data
            </button>
            
            {/* LOCKED MODULES */}
            <div className="pt-4 mt-4 border-t border-gray-800">
               <p className="px-4 text-[10px] font-bold text-gray-600 uppercase mb-2">Advanced Modules</p>
               <button disabled className="w-full text-left px-4 py-2 text-sm text-gray-600 flex items-center gap-3 cursor-not-allowed opacity-60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Simulation Analytics
               </button>
               <button disabled className="w-full text-left px-4 py-2 text-sm text-gray-600 flex items-center gap-3 cursor-not-allowed opacity-60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Instructor Console
               </button>
            </div>
         </nav>
         <div className="p-4 mt-auto border-t border-gray-800">
            <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
               Secure Logout
            </button>
         </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
         
         {/* Top Bar */}
         <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 px-8 py-5 flex justify-between items-center sticky top-0 z-20">
            <div>
               <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                  {activeView === 'dashboard' && 'Operations Overview'}
                  {activeView === 'training-history' && 'Training Log'}
                  {activeView === 'certificates' && 'Credential Vault'}
                  {activeView === 'identity' && 'Operator Record'}
               </h2>
               <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">SESSION: ENCRYPTED // TIER: {profile.clearanceLevel}</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                  <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
                  System Online
               </span>
            </div>
         </header>

         <div className="p-8">
            
            {/* VIEW: DASHBOARD */}
            {activeView === 'dashboard' && (
               <div className="space-y-8">
                  {/* Notifications */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-agron-blue p-4 rounded-sm">
                     <div className="flex">
                        <div className="flex-shrink-0">
                           <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="ml-3">
                           <p className="text-sm text-blue-800 dark:text-blue-200">
                              <span className="font-bold">System Update:</span> New simulation scenarios for "Urban Interface" have been pushed to the Mission Repository.
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Readiness Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-white dark:bg-slate-900 p-6 border border-gray-200 dark:border-gray-800 rounded-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Flight Readiness</span>
                        <div className="mt-2 flex items-baseline">
                           <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Active</span>
                           <span className="ml-2 text-sm text-green-600 font-medium">Verified</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-4">
                           <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                     </div>
                     <div className="bg-white dark:bg-slate-900 p-6 border border-gray-200 dark:border-gray-800 rounded-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Certification</span>
                        <div className="mt-2 flex items-baseline">
                           <span className="text-3xl font-extrabold text-gray-900 dark:text-white">L3</span>
                           <span className="ml-2 text-sm text-gray-500">Instructor</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-4">
                           <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                     </div>
                     <div className="bg-white dark:bg-slate-900 p-6 border border-gray-200 dark:border-gray-800 rounded-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Next Cycle</span>
                        <div className="mt-2">
                           <span className="text-xl font-bold text-gray-900 dark:text-white">AgOps Refresh</span>
                           <span className="block text-sm text-gray-500">Scheduled: Nov 15</span>
                        </div>
                     </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-4">Quick Actions</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button onClick={() => setActiveView('certificates')} className="p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 hover:border-agron-blue dark:hover:border-blue-500 transition-colors text-left group">
                           <h4 className="font-bold text-agron-900 dark:text-white group-hover:text-agron-blue dark:group-hover:text-blue-400">Download Credentials</h4>
                           <p className="text-xs text-gray-500 mt-1">Access verified PDF certificates.</p>
                        </button>
                        <button className="p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 hover:border-agron-blue dark:hover:border-blue-500 transition-colors text-left group">
                           <h4 className="font-bold text-agron-900 dark:text-white group-hover:text-agron-blue dark:group-hover:text-blue-400">Request Module Access</h4>
                           <p className="text-xs text-gray-500 mt-1">Submit enrollment for advanced ORL tracks.</p>
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* VIEW: TRAINING HISTORY */}
            {activeView === 'training-history' && (
               <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                     <thead className="bg-gray-50 dark:bg-slate-950">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Module</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                        </tr>
                     </thead>
                     <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {MOCK_TRAINING_HISTORY.map((record) => (
                           <tr key={record.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">{record.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{record.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    record.status === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                                    record.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 
                                    'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                                 }`}>
                                    {record.status}
                                 </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 font-mono">
                                 {record.score ? `${record.score}%` : '-'}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}

            {/* VIEW: CERTIFICATES */}
            {activeView === 'certificates' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.certifications.map((cert, index) => (
                     <div key={index} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-6 rounded-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                           <svg className="w-16 h-16 text-agron-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-agron-900 dark:text-white relative z-10">{cert}</h3>
                        <p className="text-sm text-gray-500 relative z-10 mt-1">Issued: {profile.lastAssessmentDate}</p>
                        <p className="text-xs text-gray-400 mt-4 relative z-10 font-mono">ID: {profile.id}-CRT-{index+1}</p>
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 relative z-10 flex justify-between items-center">
                           <span className="text-[10px] uppercase font-bold text-gray-400">Institutional Training Record</span>
                           <button onClick={() => alert("Certificate download simulated.")} className="text-xs font-bold text-agron-blue dark:text-blue-400 hover:underline flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                              Download PDF
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/* VIEW: IDENTITY (Reused existing profile logic) */}
            {activeView === 'identity' && (
               <div className="bg-white dark:bg-slate-900 p-6 border border-gray-200 dark:border-gray-800 rounded-sm">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-bold text-agron-900 dark:text-white">System Data</h3>
                     <div className="flex gap-2">
                        {!isEditing ? (
                           <button onClick={() => setIsEditing(true)} className="text-xs font-bold uppercase border px-3 py-1 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800">Edit</button>
                        ) : (
                           <button onClick={handleSaveProfile} className="text-xs font-bold uppercase bg-agron-blue text-white px-3 py-1">Save</button>
                        )}
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                           {isEditing ? (
                              <input type="text" value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} className="w-full border p-2 text-sm bg-transparent dark:border-gray-700 dark:text-white" />
                           ) : (
                              <div className="text-sm font-mono">{profile.fullName}</div>
                           )}
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Callsign</label>
                           {isEditing ? (
                              <input type="text" value={profile.callsign} onChange={(e) => setProfile({...profile, callsign: e.target.value})} className="w-full border p-2 text-sm bg-transparent dark:border-gray-700 dark:text-white" />
                           ) : (
                              <div className="text-sm font-mono">{profile.callsign}</div>
                           )}
                        </div>
                     </div>
                     
                     <div className="bg-gray-50 dark:bg-slate-950 p-4 border border-gray-200 dark:border-gray-800">
                        <h4 className="text-xs font-bold text-agron-900 dark:text-white uppercase mb-4">Data Portability</h4>
                        <div className="flex gap-2">
                           <input type="file" ref={fileInputRef} onChange={handleFileImport} className="hidden" accept=".json" />
                           <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 px-3 py-2 uppercase hover:bg-gray-50">Import JSON</button>
                           <button onClick={handleExportSystem} className="text-xs font-bold bg-agron-900 dark:bg-white text-white dark:text-agron-900 px-3 py-2 uppercase">Export System State</button>
                        </div>
                        {lastBackupTime && <p className="text-[10px] text-gray-500 mt-2">Last Backup: {new Date(lastBackupTime).toLocaleDateString()}</p>}
                     </div>
                  </div>
               </div>
            )}

         </div>
      </main>
    </div>
  );
};

export default Portal;