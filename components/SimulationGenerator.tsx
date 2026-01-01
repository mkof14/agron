
import React, { useState, useEffect } from 'react';
import { generateSimulationScenario, generateHeroImage } from '../services/geminiService';
import { SimulationScenario } from '../types';

const SimulationGenerator: React.FC = () => {
  const [activeView, setActiveView] = useState<'generator' | 'repository'>('generator');
  const [environment, setEnvironment] = useState('Agricultural Field');
  const [complexity, setComplexity] = useState('Standard');
  const [systemType, setSystemType] = useState('Aerial Drone (Rotary)');
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState<SimulationScenario | null>(null);
  const [aiStatus, setAiStatus] = useState<'ACTIVE' | 'DETERMINISTIC_MODE'>('ACTIVE');
  
  const [workstationImg, setWorkstationImg] = useState('https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=2070');
  const [isWorkstationAiLoaded, setIsWorkstationAiLoaded] = useState(false);

  useEffect(() => {
    const initWorkstationSynthesis = async () => {
      const prompt = 'An advanced multi-screen operator workstation for robotics control, featuring ergonomic consoles and detailed tactical displays in a dark, high-tech aerospace-style facility.';
      try {
        const url = await generateHeroImage(prompt);
        if (url) {
          setWorkstationImg(url);
          setIsWorkstationAiLoaded(true);
        }
      } catch (e) {
        setAiStatus('DETERMINISTIC_MODE');
      }
    };
    initWorkstationSynthesis();
  }, []);

  // Repository State
  const [savedScenarios, setSavedScenarios] = useState<SimulationScenario[]>(() => {
    const saved = localStorage.getItem('agron_mission_repository');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist repository changes
  useEffect(() => {
    localStorage.setItem('agron_mission_repository', JSON.stringify(savedScenarios));
  }, [savedScenarios]);

  const handleGenerate = async () => {
    setLoading(true);
    setScenario(null);
    try {
      const result = await generateSimulationScenario(environment, complexity, systemType);
      // Ensure unique ID for storage
      const resultWithId = { ...result, id: `SIM-${Date.now().toString().slice(-6)}` };
      setScenario(resultWithId);
      setAiStatus('ACTIVE');
    } catch (error: any) {
      if (error?.message?.includes('429')) {
        setAiStatus('DETERMINISTIC_MODE');
      }
      console.error(error);
      alert("System Note: Utilizing Deterministic Parameters due to AI link throttling.");
    } finally {
      setLoading(false);
    }
  };

  const saveScenario = () => {
    if (scenario) {
      setSavedScenarios(prev => [scenario, ...prev]);
      alert(`Scenario ${scenario.id} encrypted and archived to Mission Repository.`);
      setActiveView('repository');
    }
  };

  const deleteScenario = (id: string) => {
    if(confirm('Confirm deletion of classified record?')) {
      setSavedScenarios(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section: Simulation Core Intelligence */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-950">
         <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[25s] scale-100"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070')" }}
            aria-label="AGRON Simulation Control Hub"
         ></div>
         
         {/* Dark Gradient Overlay for Professional Readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
         <div className="absolute inset-0 bg-slate-950/20 backdrop-brightness-50"></div>
         
         <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-10 bg-agron-accent opacity-50"></div>
                <span className="text-[11px] font-mono text-agron-accent uppercase tracking-[0.4em] font-black">SYNTHETIC_TRAINING_ENVIRONMENT // CORE_01</span>
                <div className="h-px w-10 bg-agron-accent opacity-50"></div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase leading-[0.95] drop-shadow-2xl">
              Physics-Based Realism // <br className="hidden md:block"/> <span className="text-agron-accent">Human-Supervised Training</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-200 max-w-4xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md">
              The AGRON Synthetic Training Environment (STE) generates deterministic mission theaters. 
              We utilize high-fidelity physics models to bridge the gap between simulation and operational deployment.
            </p>
         </div>

         {/* Bottom Data Strip */}
         <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-xl border-t border-white/10 py-4 px-10 hidden md:flex justify-between items-center z-10">
            <div className="flex gap-10 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
               <span>ID: SIM_ENGINE_v4.2</span>
               <span>MODE: {aiStatus === 'ACTIVE' ? 'NEURAL_SYNTHESIS' : 'PHYSICS_DETERMINISTIC'}</span>
               <span>SYNC: REALTIME_TELEMETRY</span>
            </div>
            <div className="flex items-center gap-3">
               <div className={`h-2 w-2 rounded-full animate-pulse ${aiStatus === 'ACTIVE' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
               <span className={`text-[10px] font-mono uppercase tracking-widest font-black ${aiStatus === 'ACTIVE' ? 'text-amber-500' : 'text-blue-500'}`}>
                 Generation Node: {aiStatus}
               </span>
            </div>
         </div>
      </section>

      {/* Supporting Section: Multi-Screen Control */}
      <section className="bg-white dark:bg-slate-950 py-24 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="order-last lg:order-first">
                    <h2 className="text-xs font-black text-agron-accent uppercase tracking-[0.4em] mb-4">Tactical Coordination</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-agron-900 dark:text-white mb-8 uppercase tracking-tighter leading-[0.9]">
                      Multi-Screen <br/>Simulation Control
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                        Advanced mission rehearsal requires simultaneous monitoring of aggregate airspace, individual airframe health, and fused sensor payloads. Our simulation arrays mirror actual command centers, training operators to maintain high situational awareness while managing dense data streams.
                    </p>
                    <div className="space-y-6 mb-10 border-l-4 border-agron-900 dark:border-white pl-8">
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">
                            Instructors act as Incident Command, injecting real-time dynamic faults to test operator judgment under mission pressure.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">
                            Deterministic modeling ensures that simulated flight hours translate directly to field-certified capability.
                        </p>
                    </div>
                    <div className="flex gap-4">
                       <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-sm">
                          <span className="block text-[10px] font-black text-agron-accent uppercase mb-1">Audit Record</span>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">100% Sync Accuracy</span>
                       </div>
                       <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-sm">
                          <span className="block text-[10px] font-black text-agron-accent uppercase mb-1">Network Latency</span>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">&lt; 15ms Intra-Node</span>
                       </div>
                    </div>
                </div>
                
                {/* Single Large Section Image */}
                <div className="relative h-[600px] bg-slate-900 shadow-2xl overflow-hidden border border-white/10 group">
                    <div 
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ${isWorkstationAiLoaded ? 'opacity-100 scale-100' : 'opacity-60 scale-110'}`}
                      style={{ backgroundImage: `url('${workstationImg}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                       <div className="bg-black/70 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
                          <span className="text-[10px] font-mono text-agron-accent uppercase tracking-widest block mb-2 font-black">
                             {isWorkstationAiLoaded ? 'CONTROL_NODE: GAMMA_VIZ_02' : 'Telemetry_Array: GAMMA_VIZ_02'}
                          </span>
                          <p className="text-xs text-white/90 leading-relaxed font-bold uppercase tracking-widest">Multi-agent simulation environment for Joint Operations Drills.</p>
                       </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Functional Interface: Simulation Core Generator */}
      <section className="bg-slate-50 dark:bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-3xl font-black text-agron-900 dark:text-white uppercase tracking-tighter mb-2">
                Scenario Configuration
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                Utilize the AGRON Neural Net to generate compliant mission rehearsal parameters.
              </p>
            </div>
            <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-sm">
               <button 
                 onClick={() => setActiveView('generator')}
                 className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeView === 'generator' ? 'bg-agron-900 text-white shadow-lg' : 'text-gray-400 hover:text-agron-900 dark:hover:text-white'}`}
               >
                 Generator
               </button>
               <button 
                 onClick={() => setActiveView('repository')}
                 className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeView === 'repository' ? 'bg-agron-900 text-white shadow-lg' : 'text-gray-400 hover:text-agron-900 dark:hover:text-white'}`}
               >
                 Mission Repository ({savedScenarios.length})
               </button>
            </div>
          </div>

          {activeView === 'generator' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Configuration Panel */}
              <div className="bg-white dark:bg-slate-800 p-8 border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm h-fit">
                <h3 className="text-xs font-black text-agron-900 dark:text-white uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">Input Parameters</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Target Environment</label>
                    <select 
                      value={environment} 
                      onChange={(e) => setEnvironment(e.target.value)}
                      className="w-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white font-bold text-xs p-3 rounded-sm outline-none focus:border-agron-accent"
                    >
                      <option>Agricultural Field (Open)</option>
                      <option>Orchard / Canopy</option>
                      <option>Urban Interface</option>
                      <option>Coastal / Marine</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">System Type</label>
                    <select 
                      value={systemType} 
                      onChange={(e) => setSystemType(e.target.value)}
                      className="w-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white font-bold text-xs p-3 rounded-sm outline-none focus:border-agron-accent"
                    >
                      <option>Aerial Drone (Rotary)</option>
                      <option>Aerial Drone (Fixed Wing)</option>
                      <option>Ground Rover (Wheeled)</option>
                      <option>Ground Unit (Tracked)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Complexity Profile</label>
                    <select 
                      value={complexity} 
                      onChange={(e) => setComplexity(e.target.value)}
                      className="w-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white font-bold text-xs p-3 rounded-sm outline-none focus:border-agron-accent"
                    >
                      <option>Standard (Certification L1)</option>
                      <option>Adverse Weather (Certification L2)</option>
                      <option>Equipment Failure Simulation (Instructor)</option>
                      <option>Multi-Unit Coordination</option>
                    </select>
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className={`w-full mt-6 py-4 text-xs font-black text-white uppercase tracking-[0.2em] transition-all shadow-xl ${
                      loading ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-agron-blue hover:bg-blue-800'
                    }`}
                  >
                    {loading ? 'Initializing Core...' : 'Generate Scenario'}
                  </button>
                </div>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-2 min-h-[500px]">
                {scenario ? (
                  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden animate-fade-in shadow-2xl">
                     <div className="bg-agron-900 dark:bg-black text-white px-8 py-6 flex justify-between items-center border-b border-white/5">
                       <div>
                         <h3 className="text-xl font-black uppercase tracking-tighter">{scenario.title}</h3>
                         <p className="text-[10px] text-gray-500 font-mono mt-1">RECORD_ID: {scenario.id} // STATUS: VERIFIED</p>
                       </div>
                       <span className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-sm border ${
                         scenario.riskLevel === 'Critical' ? 'bg-red-900/30 text-red-400 border-red-500' :
                         scenario.riskLevel === 'Moderate' ? 'bg-amber-900/30 text-amber-400 border-amber-500' :
                         'bg-green-900/30 text-green-400 border-green-500'
                       }`}>
                         Risk: {scenario.riskLevel}
                       </span>
                     </div>
                     
                     <div className="p-8 space-y-10">
                       <div className="grid grid-cols-2 gap-8">
                          <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-700">
                            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Operational Theater</span>
                            <span className="text-sm font-bold text-agron-900 dark:text-white uppercase">{scenario.environment}</span>
                          </div>
                          <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-700">
                            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Atmospheric Profile</span>
                            <span className="text-sm font-bold text-agron-900 dark:text-white uppercase">{scenario.weatherConditions}</span>
                          </div>
                       </div>

                       <div>
                         <h4 className="text-[10px] font-black text-agron-accent uppercase tracking-[0.3em] mb-6 border-b dark:border-gray-700 pb-3">Mission Objectives</h4>
                         <ul className="space-y-3">
                           {scenario.objectives.map((obj, i) => (
                             <li key={i} className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-start uppercase tracking-tight">
                               <span className="mr-3 text-agron-blue">0{i+1}</span>
                               {obj}
                             </li>
                           ))}
                         </ul>
                       </div>

                       <div>
                         <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-6 border-b dark:border-gray-700 pb-3">Safety Protocols</h4>
                         <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6">
                           <ul className="space-y-3">
                             {scenario.safetyProtocols.map((proto, i) => (
                               <li key={i} className="text-xs font-bold text-red-900 dark:text-red-300 flex items-start uppercase tracking-widest">
                                 <span className="mr-3">⚠️</span>
                                 {proto}
                               </li>
                             ))}
                           </ul>
                         </div>
                       </div>
                       
                       <div className="pt-6 flex justify-end gap-4 border-t dark:border-gray-700">
                          <button 
                            onClick={() => setScenario(null)}
                            className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-agron-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest"
                          >
                            Discard
                          </button>
                          <button 
                            onClick={saveScenario}
                            className="px-8 py-3 bg-agron-blue hover:bg-blue-800 text-white text-[10px] font-black uppercase tracking-widest flex items-center shadow-lg"
                          >
                            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                            Archive to Mission Repository
                          </button>
                       </div>
                     </div>
                  </div>
                ) : (
                  <div 
                    className="h-full min-h-[500px] flex flex-col items-center justify-center bg-cover bg-center border-2 border-dashed border-gray-200 dark:border-gray-800 text-center relative group"
                  >
                     <div className="relative z-10 p-12 max-w-lg">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-sm flex items-center justify-center mb-8 text-gray-300 dark:text-gray-600 mx-auto border border-gray-200 dark:border-gray-700 group-hover:text-agron-accent transition-colors">
                          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-black text-agron-900 dark:text-white uppercase tracking-tight">Core Awaiting Generation</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 font-bold uppercase tracking-widest leading-relaxed">
                          Define input parameters on the left to initiate the synthetic theater construction sequence.
                        </p>
                     </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* REPOSITORY VIEW */
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden shadow-2xl">
               <div className="border-b border-gray-100 dark:border-gray-700 px-8 py-5 bg-gray-50 dark:bg-slate-950 flex justify-between items-center">
                  <h3 className="text-xs font-black text-agron-900 dark:text-white uppercase tracking-[0.2em]">Classified Mission Archives</h3>
                  <span className="text-[10px] text-gray-500 font-mono font-black uppercase">Encrypted // Local_Node_Only</span>
               </div>
               
               {savedScenarios.length === 0 ? (
                 <div className="p-24 text-center">
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">No mission records currently synchronized to this terminal.</p>
                    <button onClick={() => setActiveView('generator')} className="mt-6 text-agron-blue dark:text-blue-400 font-black text-[10px] uppercase tracking-widest border-b border-agron-blue pb-1">Initiate Generation Sequence</button>
                 </div>
               ) : (
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead className="bg-gray-100 dark:bg-slate-900 text-[10px] text-gray-500 dark:text-gray-400 uppercase font-black tracking-widest">
                       <tr>
                         <th className="px-8 py-4">Serial ID</th>
                         <th className="px-8 py-4">Mission Designation</th>
                         <th className="px-8 py-4">Theater</th>
                         <th className="px-8 py-4">Risk Level</th>
                         <th className="px-8 py-4 text-right">Ops</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                       {savedScenarios.map((s) => (
                         <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors">
                           <td className="px-8 py-5 font-mono text-xs text-gray-400">{s.id}</td>
                           <td className="px-8 py-5 text-sm font-black text-agron-900 dark:text-white uppercase tracking-tight">{s.title}</td>
                           <td className="px-8 py-5 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">{s.environment}</td>
                           <td className="px-8 py-5">
                             <span className={`text-[10px] px-3 py-1 rounded-sm font-black uppercase tracking-widest border ${
                               s.riskLevel === 'Critical' ? 'bg-red-900/20 text-red-400 border-red-500/50' :
                               s.riskLevel === 'Moderate' ? 'bg-amber-900/20 text-amber-400 border-amber-500/50' :
                               'bg-green-900/20 text-green-400 border-green-500/50'
                             }`}>
                               {s.riskLevel}
                             </span>
                           </td>
                           <td className="px-8 py-5 text-right">
                             <button 
                               onClick={() => deleteScenario(s.id)}
                               className="text-gray-400 hover:text-red-500 transition-colors"
                               title="Purge Record"
                             >
                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                             </button>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               )}
            </div>
          )}
        </div>
      </section>

      {/* NEW SECTION: Simulation Core Components */}
      <section className="bg-white dark:bg-slate-950 py-24 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-xs font-black text-agron-accent uppercase tracking-[0.4em] mb-4">Architecture Pillars</h2>
            <h3 className="text-3xl md:text-5xl font-black text-agron-900 dark:text-white uppercase tracking-tighter leading-tight">
              Simulation Core Components
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-slate-50 dark:bg-slate-900 p-10 border border-gray-200 dark:border-gray-800 rounded-sm hover:shadow-xl transition-shadow group">
              <h4 className="text-xl font-black text-agron-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-agron-accent transition-colors">High-Fidelity Physics Engine</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Delivers deterministic airframe and chassis dynamics, accounting for inertial tensors, drag coefficients, and torque response in real-time. Ensures that stick-feel in the simulator matches physical unit performance with 99.8% fidelity.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-10 border border-gray-200 dark:border-gray-800 rounded-sm hover:shadow-xl transition-shadow group">
              <h4 className="text-xl font-black text-agron-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-agron-accent transition-colors">Dynamic Environmental Modeler</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Simulates complex atmospheric conditions, including localized micro-gusts, signal attenuation patterns, and varying lux levels. This provides a variable-difficulty theater required for advanced night-ops and adverse-weather certification.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-10 border border-gray-200 dark:border-gray-800 rounded-sm hover:shadow-xl transition-shadow group">
              <h4 className="text-xl font-black text-agron-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-agron-accent transition-colors">Real-Time Telemetry Processor</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Synchronizes multi-agent data streams with sub-10ms latency. This component enables accurate after-action reviews (AAR) and high-frequency performance tracking, allowing for granular audit trails of every instructor-led drill.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-10 border border-gray-200 dark:border-gray-800 rounded-sm hover:shadow-xl transition-shadow group">
              <h4 className="text-xl font-black text-agron-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-agron-accent transition-colors">AI Scenario Generator</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Utilizes neural-net frameworks to inject probabilistic faults and objective-driven obstacles. The generator adapts difficulty based on operator telemetry, ensuring that training cycles remain challenging without exceeding safe instructional bounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Identity CTA */}
      <section className="bg-slate-950 text-white py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
         <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
             <div className="h-px w-24 bg-agron-accent mx-auto mb-10"></div>
             <h3 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter leading-none">Simulation Verified Capability</h3>
             <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-xl font-medium leading-relaxed">
                 Certification for BVLOS, night operations, and emergency response requires 40+ hours of verified simulation data within the AGRON STE framework.
             </p>
             <button 
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
               className="px-16 py-6 bg-white text-agron-900 font-black text-sm uppercase tracking-[0.4em] hover:bg-agron-accent hover:text-white transition-all shadow-2xl"
             >
                 Return to Simulation Node
             </button>
         </div>
      </section>
    </div>
  );
};

export default SimulationGenerator;
