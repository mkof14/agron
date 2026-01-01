
import React, { useState, useEffect } from 'react';
import { TrainingModule } from '../types';
import TrainingCard from './TrainingCard';
import { generateHeroImage } from '../services/geminiService';

const TrainingModules: React.FC = () => {
  const [heroImg, setHeroImg] = useState('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072');
  const [isHeroAiLoaded, setIsHeroAiLoaded] = useState(false);
  const [wallImg, setWallImg] = useState('https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=2070');
  const [isWallAiLoaded, setIsWallAiLoaded] = useState(false);

  useEffect(() => {
    const initVisualSynthesis = async () => {
      // Hero Image Synthesis
      const heroPrompt = 'A group of professionals collaborating in a futuristic simulation control room, high-tech displays showing complex data.';
      generateHeroImage(heroPrompt).then(url => {
        if (url) {
          setHeroImg(url);
          setIsHeroAiLoaded(true);
        }
      });

      // Supporting Section Image Synthesis
      const wallPrompt = 'A large-scale high-fidelity mission control simulation wall displaying complex telemetry and 3D maps in a professional command center environment, cinematic aerospace lighting.';
      generateHeroImage(wallPrompt).then(url => {
        if (url) {
          setWallImg(url);
          setIsWallAiLoaded(true);
        }
      });
    };
    initVisualSynthesis();
  }, []);

  const modules: TrainingModule[] = [
    {
      id: "SYS-100",
      title: "Core Systems Architecture",
      level: "Foundational",
      duration: "16 Hours",
      category: "Hybrid",
      status: "Certified"
    },
    {
      id: "OPS-210",
      title: "Remote Sensing & Data Acquisition",
      level: "Advanced",
      duration: "24 Hours",
      category: "Aerial",
      status: "In Progress"
    },
    {
      id: "OPS-250",
      title: "BVLOS Command Protocols",
      level: "Advanced",
      duration: "32 Hours",
      category: "Aerial",
      status: "Not Started"
    },
    {
      id: "INS-400",
      title: "Instructor: Risk Analysis & Evaluation",
      level: "Instructor",
      duration: "40 Hours",
      category: "Hybrid",
      status: "Not Started"
    }
  ];

  return (
    <div className="flex flex-col">
      
      {/* Hero Section - Mission Control Environments */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
         {/* Full-width Background Image with AI Synthesis Support */}
         <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ${isHeroAiLoaded ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`}
            style={{ backgroundImage: `url('${heroImg}')` }}
            aria-label="AGRON Training Classroom Environment"
         ></div>
         
         {/* Dark Overlay for Readability */}
         <div className="absolute inset-0 bg-black/60 backdrop-brightness-75"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950"></div>
         
         <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            {/* Mission Identity Badge */}
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-10 bg-agron-accent opacity-50"></div>
                <span className="text-[11px] font-mono text-agron-accent uppercase tracking-[0.4em] font-black">
                  {isHeroAiLoaded ? 'SYNTHETIC_VISUAL: CORE_OPS_ALPHA' : 'Instructional Nodes // Physical Layer'}
                </span>
                <div className="h-px w-10 bg-agron-accent opacity-50"></div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase leading-none drop-shadow-2xl">
              Mission-Control <br className="hidden md:block"/> <span className="text-agron-accent">Learning Environments</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-2xl text-slate-200 max-w-4xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md">
              Training occurs within active Command Nodes, mirroring the operational density and technical complexity of national-scale robotic networks.
            </p>
         </div>
         
         {/* Bottom Telemetry Strip */}
         <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-4 px-10 hidden md:flex justify-between items-center z-10">
            <div className="flex gap-10 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
               <span>FACILITY: NODE_ALPHA_01</span>
               <span>TYPE: COMMAND_CLASSROOM</span>
               <span>NETWORK: SECURE_FIBER_BACKBONE</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-black">Facility Status: Fully Operational</span>
            </div>
         </div>
      </section>

      {/* Supporting Section: Simulation Walls & Oversight */}
      <section className="bg-white dark:bg-slate-950 py-24 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="order-last lg:order-first">
                    <h2 className="text-xs font-black text-agron-accent uppercase tracking-[0.4em] mb-4">Infrastructure Detail</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-agron-900 dark:text-white mb-8 uppercase tracking-tighter leading-[0.9]">
                      Simulation Walls & <br/>Instructor Oversight
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                        Each classroom is anchored by a large-format simulation wall, providing high-fidelity telemetry visualization and aggregate sensor streams. These displays allow for collective mission rehearsal where every pilot, sensor operator, and commander shares the same tactical picture.
                    </p>
                    <div className="space-y-6 mb-10 border-l-4 border-agron-900 dark:border-white pl-8">
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">
                            Every environment is under constant instructor oversight. AI-assisted tracking provides real-time feedback on protocol adherence, reaction times, and objective completion scores.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">
                            Facilities are isolated from the public internet, operating on a hardened intranode mesh for mission security.
                        </p>
                    </div>
                    <button className="text-agron-blue dark:text-blue-400 font-black text-xs uppercase tracking-widest border-b-2 border-agron-blue dark:border-blue-400 pb-1 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        Download Technical Facility Standards
                    </button>
                </div>
                
                {/* Single Large Section Image: Wall Detail */}
                <div className="relative h-[600px] bg-agron-900 shadow-2xl overflow-hidden border border-white/10 group">
                    <div 
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ${isWallAiLoaded ? 'opacity-100 scale-100' : 'opacity-60 scale-110'}`}
                      style={{ backgroundImage: `url('${wallImg}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                       <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6">
                          <span className="text-[10px] font-mono text-agron-accent uppercase tracking-widest block mb-2 font-black">
                             {isWallAiLoaded ? 'SYNTHETIC_ARRAY: DELTA_VIZ_04' : 'Display_Node: DELTA_VIZ_4'}
                          </span>
                          <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Aggregate telemetry feed for ORL-3 Integrated Mission Simulation.</p>
                       </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ORL Framework Section */}
      <section className="bg-slate-50 dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
               <h3 className="text-2xl md:text-4xl font-black text-agron-900 dark:text-white mb-4 uppercase tracking-tighter">Operational Readiness Levels (ORL)</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl font-bold uppercase tracking-widest">
                  AGRON curriculum is anchored in physical classrooms but verified in deterministic synthetic environments across five tiers.
               </p>
            </div>

            <div className="space-y-6">
               <OrlTier level="ORL-01" title="Foundations of Uncrewed Systems" badge="Entry" purpose="Safety baselines and system mechanics." sim="Basic flight physics." />
               <OrlTier level="ORL-02" title="Professional Operations" badge="Career" purpose="Commercial data acquisition." sim="Environmental variables." />
               <OrlTier level="ORL-03" title="Advanced Mission Training" badge="Specialist" purpose="High-stress BVLOS missions." sim="Catastrophic failure modes." accent />
               <OrlTier level="ORL-04" title="Integrated Air–Ground Operations" badge="Lead" purpose="Multi-domain coordination." sim="Multi-agent logistics." />
               <OrlTier level="ORL-05" title="Instructor & Evaluator" badge="Board" purpose="Instructional certification and safety auditing." sim="Dynamic fault injection." dark />
            </div>
         </div>
      </section>

      {/* Assigned Modules Grid */}
      <section className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 w-full border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
           <div>
             <h3 className="text-2xl md:text-3xl font-black text-agron-900 dark:text-white uppercase tracking-tighter">Your Active Training Load</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-bold uppercase tracking-widest">Identity: <span className="font-mono text-agron-accent">VANGUARD</span></p>
           </div>
           <button className="text-[10px] font-black uppercase text-agron-900 dark:text-white border-2 border-agron-900 dark:border-white px-10 py-4 hover:bg-agron-900 hover:text-white transition-all tracking-[0.3em]">
              Access Full Catalog
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {modules.map(module => (
            <TrainingCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      {/* STE Section */}
      <section className="bg-slate-950 text-white py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="mb-24 text-center max-w-4xl mx-auto">
                 <h2 className="text-xs font-black text-agron-accent uppercase tracking-[0.4em] mb-8">Synthetic Intelligence</h2>
                 <h3 className="text-4xl md:text-6xl font-black mb-10 uppercase tracking-tighter leading-none">Deterministic <span className="text-white/30">Mission Environments</span></h3>
                 <p className="text-xl text-slate-400 leading-relaxed font-medium">
                     Facilities transition seamlessly into the AGRON Synthetic Training Environment (STE), generating photorealistic theaters with centimeter-level geospatial accuracy.
                 </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 <div className="bg-white/5 p-12 border border-white/10 hover:bg-white/10 transition-all group backdrop-blur-md">
                     <h4 className="text-2xl font-black mb-6 uppercase tracking-wider text-agron-accent">01 // Physical Realism</h4>
                     <p className="text-sm text-slate-400 leading-relaxed font-bold uppercase tracking-tight">Physics-based simulation models ensure that inputs in the classroom match physical airframe performance in the field.</p>
                 </div>
                 <div className="bg-white/5 p-12 border border-white/10 hover:bg-white/10 transition-all group backdrop-blur-md">
                     <h4 className="text-2xl font-black mb-6 uppercase tracking-wider text-agron-accent">02 // After-Action Review</h4>
                     <p className="text-sm text-slate-400 leading-relaxed font-bold uppercase tracking-tight">Every classroom session is logged for granular debriefing, synchronizing telemetry, audio, and visual data streams.</p>
                 </div>
             </div>
         </div>
      </section>
      
    </div>
  );
};

// --- HELPER COMPONENTS ---

const OrlTier: React.FC<{ level: string; title: string; badge: string; purpose: string; sim: string; accent?: boolean; dark?: boolean }> = ({ level, title, badge, purpose, sim, accent, dark }) => (
   <div className={`border rounded-sm overflow-hidden flex flex-col md:flex-row transition-all hover:translate-x-1 ${
      dark ? 'bg-agron-900 border-agron-700 text-white' : 
      accent ? 'bg-white border-amber-500 border-l-8' : 
      'bg-white border-gray-200 dark:bg-slate-800 dark:border-gray-700 shadow-sm'
   }`}>
      <div className={`md:w-28 flex items-center justify-center border-b md:border-b-0 md:border-r py-6 md:py-0 ${
         dark ? 'bg-black/40 border-gray-800' : 'bg-gray-50 dark:bg-black/20 border-gray-100 dark:border-gray-700'
      }`}>
         <span className={`text-2xl font-black transform md:-rotate-90 ${dark ? 'text-agron-accent' : 'text-gray-300 dark:text-gray-600'}`}>{level}</span>
      </div>
      <div className="p-10 flex-1">
         <div className="flex justify-between items-start mb-8">
            <h4 className={`text-2xl font-black uppercase tracking-tight ${dark ? 'text-white' : 'text-agron-900 dark:text-white'}`}>{title}</h4>
            <span className={`text-[10px] font-black px-4 py-2 rounded-sm uppercase tracking-widest ${
               dark ? 'bg-agron-accent text-white' : 'bg-slate-100 dark:bg-slate-700 text-gray-500'
            }`}>{badge}</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
               <strong className="block text-[10px] uppercase text-agron-accent mb-3 tracking-[0.3em] font-black">Strategic Purpose</strong>
               <p className={`text-sm font-bold uppercase tracking-tight ${dark ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>{purpose}</p>
            </div>
            <div>
               <strong className="block text-[10px] uppercase text-agron-accent mb-3 tracking-[0.3em] font-black">Simulation Component</strong>
               <p className={`text-sm font-bold uppercase tracking-tight ${dark ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>{sim}</p>
            </div>
         </div>
      </div>
   </div>
);

export default TrainingModules;
