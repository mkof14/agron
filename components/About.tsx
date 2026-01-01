import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      
      {/* SECTION: Hero */}
      <div className="bg-slate-900 text-white py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-bold text-agron-accent uppercase tracking-widest mb-3">Institutional Identity</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              About AGRON
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-0 max-w-3xl border-l-4 border-gray-700 pl-6">
              AGRON (Aerial–Ground Robotics Operations Network) is a dedicated infrastructure platform for the training, simulation, and operational readiness of autonomous system operators.
            </p>
        </div>
      </div>

      {/* SECTION: The Strategic Gap */}
      <div className="bg-white dark:bg-slate-950 py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                 <h3 className="text-xl font-bold text-agron-900 dark:text-white mb-4 uppercase">The Capability Gap</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Robotic hardware capabilities have historically outpaced human operator proficiency. Advanced autonomous systems are frequently deployed by personnel who possess basic flight mechanics knowledge but lack the "mission-layer" decision-making skills required for complex, high-liability environments.
                 </p>
                 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    This disparity creates operational risk and regulatory friction. AGRON was established to industrialize the training process, moving from ad-hoc instruction to standardized, infrastructure-grade certification.
                 </p>
              </div>
              <div>
                 <h3 className="text-xl font-bold text-agron-900 dark:text-white mb-4 uppercase">Our Function</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    AGRON operates as a neutral readiness layer. We do not manufacture robotics; we validate the human systems that control them. Our facilities and digital networks provide a standardized environment where organizations can benchmark their fleet operators against objective performance metrics.
                 </p>
                 <div className="p-4 bg-gray-50 dark:bg-slate-900 border-l-4 border-agron-blue">
                    <strong className="block text-xs uppercase text-agron-blue dark:text-blue-400 mb-1">Core Mandate</strong>
                    <p className="text-sm font-bold text-agron-900 dark:text-white">To ensure every autonomous system is overseen by a qualified, accountable human operator.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* SECTION: Methodology */}
      <div className="bg-slate-50 dark:bg-slate-900 py-16 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="max-w-3xl mb-12">
                <h2 className="text-2xl font-bold text-agron-900 dark:text-white mb-4">The Readiness Architecture</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                   AGRON aligns training, simulation, and certification into a cohesive lifecycle. 
                   We reject the concept of "attendance-based" certificates in favor of performance-based qualification.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-slate-950 p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                   <strong className="block text-agron-900 dark:text-white font-bold mb-2">1. Training</strong>
                   <p className="text-xs text-gray-600 dark:text-gray-400">Curriculum focused on systems logic, not just manual control. Operators learn payload management, data security, and multi-agent coordination.</p>
                </div>
                <div className="bg-white dark:bg-slate-950 p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                   <strong className="block text-agron-900 dark:text-white font-bold mb-2">2. Simulation</strong>
                   <p className="text-xs text-gray-600 dark:text-gray-400">Physics-based environments allow for "high-consequence" rehearsal. Failures that would be costly in the field are drilled safely in the simulator.</p>
                </div>
                <div className="bg-white dark:bg-slate-950 p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                   <strong className="block text-agron-900 dark:text-white font-bold mb-2">3. Certification</strong>
                   <p className="text-xs text-gray-600 dark:text-gray-400">Issuance of the professional training certificate only upon successful completion of mission-based evaluations.</p>
                </div>
             </div>
          </div>
      </div>

      {/* SECTION: Operational Scope Matrix */}
      <div className="bg-white dark:bg-slate-950 py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-10">Operational Scope Matrix</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* What We Do */}
               <div className="border border-gray-200 dark:border-gray-800 p-8 rounded-sm bg-gray-50 dark:bg-slate-900">
                  <h3 className="text-lg font-bold text-agron-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                     Primary Functions
                  </h3>
                  <ul className="space-y-4">
                     <li className="flex items-start">
                        <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xs mt-1">IN SCOPE</span>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                           <strong>Professional Training:</strong> Developing and delivering ORL 1-5 curriculum for aerial and ground systems.
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xs mt-1">IN SCOPE</span>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                           <strong>Synthetic Environments:</strong> Building and hosting digital twin simulations for mission rehearsal.
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-green-600 dark:text-green-400 font-bold mr-3 text-xs mt-1">IN SCOPE</span>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                           <strong>Safety Systems (SMS):</strong> Auditing and establishing risk management frameworks for client organizations.
                        </div>
                     </li>
                  </ul>
               </div>

               {/* What We DO NOT Do */}
               <div className="border border-gray-200 dark:border-gray-800 p-8 rounded-sm bg-white dark:bg-slate-950 opacity-90">
                  <h3 className="text-lg font-bold text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                     Excluded Functions
                  </h3>
                  <ul className="space-y-4">
                     <li className="flex items-start">
                        <span className="text-gray-400 font-bold mr-3 text-xs mt-1">OUT OF SCOPE</span>
                        <div className="text-sm text-gray-500">
                           <strong>Manufacturing:</strong> AGRON is platform-agnostic. We do not design, manufacture, or sell robotic hardware.
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-gray-400 font-bold mr-3 text-xs mt-1">OUT OF SCOPE</span>
                        <div className="text-sm text-gray-500">
                           <strong>Combat Operations:</strong> We are a training institution. We do not participate in, command, or execute field combat operations.
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="text-gray-400 font-bold mr-3 text-xs mt-1">OUT OF SCOPE</span>
                        <div className="text-sm text-gray-500">
                           <strong>Regulatory Authority:</strong> AGRON certifies technical competency. We are not a government regulator and do not issue airspace authorizations.
                        </div>
                     </li>
                  </ul>
               </div>

            </div>
         </div>
      </div>

      {/* SECTION: Governance Footer */}
      <div className="bg-agron-900 dark:bg-black text-white py-16 border-t border-agron-800 dark:border-gray-900">
         <div className="max-w-4xl mx-auto px-4 text-center">
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Corporate Structure</h4>
             <p className="text-sm text-gray-400 leading-relaxed mb-6">
                AGRON is a wholly-owned subsidiary of <strong>Digital Invest Inc.</strong>, an investment holding company focused on critical digital infrastructure resilience. 
                Our executive board includes subject matter experts from civil aviation, defense logistics, and industrial safety sectors.
             </p>
             <div className="inline-block border border-gray-700 px-4 py-2 text-xs text-gray-500 font-mono">
                PARENT ENTITY: DIGITAL INVEST INC. // UNIT: AGRON-INFRA
             </div>
         </div>
      </div>

    </div>
  );
};

export default About;