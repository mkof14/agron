
import React from 'react';

const InvestorRelations: React.FC = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-950">
      {/* Executive Hero Section */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070')" }}
          aria-label="AGRON Corporate Infrastructure"
        ></div>
        <div className="absolute inset-0 bg-black/80 backdrop-brightness-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-agron-accent opacity-50"></div>
            <span className="text-[11px] font-mono text-agron-accent uppercase tracking-[0.4em] font-black">Investor Relations // Governance</span>
            <div className="h-px w-10 bg-agron-accent opacity-50"></div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-8 uppercase leading-none drop-shadow-2xl">
            Human Infrastructure for <br className="hidden md:block"/> the <span className="text-agron-accent">Autonomous Economy</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-200 max-w-4xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-md">
            AGRON scales the operational layer of robotics through standardized certification and simulation. 
            We provide the defensive utility layer for national-scale uncrewed deployments.
          </p>

          <div className="flex justify-center">
            <button className="px-14 py-5 bg-white text-agron-900 font-black text-sm uppercase tracking-[0.2em] hover:bg-agron-accent hover:text-white transition-all shadow-2xl border border-white">
              Request Investor Brief
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-xl border-t border-white/10 py-4 px-10 hidden md:flex justify-between items-center z-10 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
           <span>TICKER: PRIVATE</span>
           <span>JURISDICTION: US_ALLIED</span>
           <span>ENTITY: DIGITAL_INVEST_INC</span>
        </div>
      </section>

      {/* The Thesis */}
      <div className="py-24 border-b border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <h3 className="text-agron-blue dark:text-blue-400 font-black uppercase text-xs tracking-[0.4em] mb-4">Investment Framework</h3>
                  <h2 className="text-3xl md:text-5xl font-black text-agron-900 dark:text-white mb-6 uppercase tracking-tighter leading-tight">The Hardware <br/>Readiness Gap</h2>
                  <div className="prose prose-lg text-gray-600 dark:text-gray-400 font-medium">
                     <p>
                        Robotic hardware has become a commodity. <strong>Operational competence is the scarce asset.</strong>
                     </p>
                     <p className="mt-4">
                        AGRON provides a recurring-revenue utility layer that sits between manufacturers and enterprise end-users, ensuring that deployments meet the rigorous liability and safety standards required for national infrastructure.
                     </p>
                  </div>
               </div>
               <div className="bg-gray-50 dark:bg-slate-900 p-10 border border-gray-200 dark:border-gray-800 rounded-sm">
                  <h4 className="font-black text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-2 uppercase text-sm tracking-widest">Growth Telemetry</h4>
                  <ul className="space-y-6">
                     <li className="flex items-start">
                        <span className="text-2xl font-black text-agron-accent mr-6">85%</span>
                        <div>
                           <strong className="block text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">Acquisition Imbalance</strong>
                           <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-tight leading-relaxed">Hardware procurement outpaces trained personnel by 4:1.</p>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-2xl font-black text-agron-accent mr-6">$$$</span>
                        <div>
                           <strong className="block text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">Insurance Mandate</strong>
                           <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-tight leading-relaxed">Underwriters requiring verified simulation hours for fleet coverage.</p>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default InvestorRelations;
