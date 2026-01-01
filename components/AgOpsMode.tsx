
import React from 'react';

const AgOpsMode: React.FC = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=2068')" }}
          aria-label="AGRON AgOps Training Environment"
        ></div>
        <div className="absolute inset-0 bg-black/70 backdrop-brightness-75"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-agron-accent opacity-50"></div>
            <span className="text-[11px] font-mono text-agron-accent uppercase tracking-[0.4em] font-black">Specialized Vertical // AgOps Division</span>
            <div className="h-px w-10 bg-agron-accent opacity-50"></div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase leading-none drop-shadow-2xl">
            Simulation-Driven <br className="hidden md:block"/> <span className="text-agron-accent">Robotics Training for Agriculture Operations</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-200 max-w-4xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md">
            Advanced certification for precision application, multispectral crop analysis, and automated fleet management. 
            AGRON standardizes operational safety for the next generation of industrial agriculture.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-4 px-10 hidden md:flex justify-between items-center z-10">
          <div className="flex gap-10 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
            <span>SECTOR: INDUSTRIAL_AG</span>
            <span>ID: AGOPS_NODE_T-04</span>
            <span>AUTH: CERTIFIED_OPERATOR</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest font-black">Curriculum: Live</span>
          </div>
        </div>
      </section>

      {/* Curriculum Details */}
      <section className="py-24 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-xs font-black text-agron-accent uppercase tracking-[0.4em] mb-4">Precision Mandate</h2>
              <h3 className="text-3xl md:text-5xl font-black text-agron-900 dark:text-white mb-8 uppercase tracking-tighter leading-tight">
                Industrial Scale <br/>Accountability
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                Modern agriculture relies on uncrewed systems for critical tasks including chemical application and yield forecasting. 
                The AGRON AgOps track provides the institutional training necessary to manage these high-volume operations with technical precision and regulatory compliance.
              </p>
              <div className="space-y-6 border-l-4 border-agron-900 dark:border-white pl-8">
                <div className="group">
                  <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-2">Automated Boundary Control</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-bold uppercase tracking-tight">Advanced geofencing and terrain-following protocols for large-scale crop management.</p>
                </div>
                <div className="group">
                  <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-2">Chemical Logistics & Safety</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-bold uppercase tracking-tight">Rigorous training on spill mitigation, chemical handling, and drift-prevention flight patterns.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-12 border border-gray-200 dark:border-gray-800">
               <h3 className="text-xl font-black text-agron-900 dark:text-white mb-8 uppercase">Operational Readiness Levels</h3>
               <ul className="space-y-8">
                 <li className="flex gap-6">
                    <span className="text-2xl font-black text-agron-accent opacity-30">01</span>
                    <div>
                       <strong className="block text-sm font-black uppercase text-agron-900 dark:text-white">AgOps Foundations</strong>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase font-bold tracking-tight">System mechanics, field safety, and manual recovery maneuvers.</p>
                    </div>
                 </li>
                 <li className="flex gap-6">
                    <span className="text-2xl font-black text-agron-accent opacity-60">02</span>
                    <div>
                       <strong className="block text-sm font-black uppercase text-agron-900 dark:text-white">Precision Application</strong>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase font-bold tracking-tight">Programming autonomous spray paths and managing variable rate flow controllers.</p>
                    </div>
                 </li>
                 <li className="flex gap-6">
                    <span className="text-2xl font-black text-agron-accent">03</span>
                    <div>
                       <strong className="block text-sm font-black uppercase text-agron-900 dark:text-white">Data Integration</strong>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase font-bold tracking-tight">Multispectral sensor fusion, NVDI processing, and GIS data management.</p>
                    </div>
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgOpsMode;
