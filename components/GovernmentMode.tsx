
import React from 'react';

const GovernmentMode: React.FC = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-950">
      {/* Institutional Hero Section */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069')" }}
          aria-label="AGRON Authorized Operations Facility"
        ></div>
        <div className="absolute inset-0 bg-black/75 backdrop-brightness-75"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-amber-600 opacity-50"></div>
            <span className="text-[11px] font-mono text-amber-600 uppercase tracking-[0.4em] font-black">Public Sector & Defense Readiness</span>
            <div className="h-px w-10 bg-amber-600 opacity-50"></div>
          </div>
          
          <h1 className="text-3xl md:text-6xl font-black tracking-tighter text-white mb-8 uppercase leading-none drop-shadow-2xl">
            Uncrewed Systems <br className="hidden md:block"/> Readiness for <span className="text-white opacity-80">Public Safety & Infrastructure</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-md">
            Providing the simulation infrastructure and certification frameworks required to transition robotic assets from procurement to capability. 
            AGRON standardizes the human element of the chain of command for national infrastructure protection.
          </p>

          <div className="flex justify-center">
            <button className="px-14 py-5 bg-white text-agron-900 font-black text-sm uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-white transition-all shadow-2xl border border-white">
              Request Program Information
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-xl border-t border-white/10 py-4 px-10 hidden md:flex justify-between items-center z-10 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
           <span>CLEARANCE: RESTRICTED</span>
           <span>PROTOCOLS: NIST_COMPLIANT</span>
           <span>JURISDICTION: FED/STATE/LOCAL</span>
        </div>
      </section>

      {/* Mission Content */}
      <section className="py-24 border-b border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h3 className="text-agron-blue dark:text-blue-400 font-black uppercase text-xs tracking-[0.4em] mb-4">Readiness Mandate</h3>
                  <h2 className="text-3xl md:text-5xl font-black text-agron-900 dark:text-white mb-8 uppercase tracking-tighter leading-[0.9]">Crisis <br/>Interoperability</h2>
                  <div className="prose prose-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                     <p>
                        AGRON training focuses on <strong>Interoperability</strong>. We do not just teach pilots how to fly; we teach crews how to integrate into an Incident Command System (ICS), manage radio discipline, and share data streams during high-stress deployments.
                     </p>
                     <p className="mt-4">
                        From search and rescue (SAR) to hazardous material (HazMat) response, our synthetic environments replicate the chaos of a metropolitan crisis theater, allowing agencies to train in a zero-risk, high-fidelity setting.
                     </p>
                  </div>
               </div>
               <div className="bg-slate-50 dark:bg-slate-900 p-12 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h4 className="font-black text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-2 uppercase text-xs tracking-widest">Departmental Reach</h4>
                  <ul className="space-y-4">
                     <li className="flex items-center gap-4">
                        <div className="h-2 w-2 bg-amber-600 rounded-sm"></div>
                        <span className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">Emergency Management</span>
                     </li>
                     <li className="flex items-center gap-4">
                        <div className="h-2 w-2 bg-blue-600 rounded-sm"></div>
                        <span className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">Law Enforcement & SWAT</span>
                     </li>
                     <li className="flex items-center gap-4">
                        <div className="h-2 w-2 bg-red-600 rounded-sm"></div>
                        <span className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">Fire & HazMat Units</span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default GovernmentMode;
