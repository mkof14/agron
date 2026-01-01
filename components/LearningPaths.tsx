
import React, { useState, useEffect } from 'react';
import { generateHeroImage } from '../services/geminiService';

const LearningPaths: React.FC = () => {
  const [agOpsImg, setAgOpsImg] = useState('https://images.unsplash.com/photo-1530263503756-b370f545353d?auto=format&fit=crop&q=80');
  const [isAgOpsAiLoaded, setIsAgOpsAiLoaded] = useState(false);

  useEffect(() => {
    const initAgOpsSynthesis = async () => {
      const prompt = 'A futuristic agricultural robotics training environment, featuring high-capacity spraying drones and autonomous ground units in a cinematic field setting at dawn, institutional tech aesthetic.';
      const url = await generateHeroImage(prompt);
      if (url) {
        setAgOpsImg(url);
        setIsAgOpsAiLoaded(true);
      }
    };
    initAgOpsSynthesis();
  }, []);

  return (
    <div className="flex flex-col">
      
      {/* SECTION: Hero */}
      <div className="bg-slate-900 text-white py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-sm font-bold text-agron-accent uppercase tracking-widest mb-3">Operational Readiness Frameworks</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Structured Paths for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-200">Mission Capability</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 border-l-4 border-agron-700 pl-6">
              AGRON training is not a singular course but a progressive infrastructure. 
              We categorize readiness into three distinct operational tracks designed to transition personnel 
              from theoretical knowledge to verified field competence.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: Path Selection Grid */}
      <div className="bg-white dark:bg-slate-950 py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* PATH 01: INDIVIDUAL */}
            <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 hover:border-agron-blue dark:hover:border-blue-500 transition-colors duration-300">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-sm flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-agron-900 dark:text-white mb-2">Individual Professionals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                For career systems operators seeking certification on specific platforms.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <span className="mr-2 text-agron-blue dark:text-blue-400">►</span>
                  Cross-platform endorsement (Rotary/Fixed)
                </li>
                <li className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <span className="mr-2 text-agron-blue dark:text-blue-400">►</span>
                  Payload & sensor mastery
                </li>
                <li className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <span className="mr-2 text-agron-blue dark:text-blue-400">►</span>
                  Standardized flight log accreditation
                </li>
              </ul>
              <a href="#individual" className="inline-block text-xs font-bold uppercase tracking-wide text-agron-900 dark:text-white border-b border-agron-900 dark:border-white pb-1">
                View Progression
              </a>
            </div>

            {/* PATH 02: TEAMS */}
            <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 hover:border-agron-blue dark:hover:border-blue-500 transition-colors duration-300">
              <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-sm flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-agron-900 dark:text-white mb-2">Teams & Organizations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                For infrastructure, public safety, and enterprise units requiring coordination.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <span className="mr-2 text-amber-600 dark:text-amber-500">►</span>
                  Standard Operating Procedure (SOP) design
                </li>
                <li className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <span className="mr-2 text-amber-600 dark:text-amber-500">►</span>
                  Crew Resource Management (CRM)
                </li>
                <li className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <span className="mr-2 text-amber-600 dark:text-amber-500">►</span>
                  Annual operational audits
                </li>
              </ul>
              <a href="#teams" className="inline-block text-xs font-bold uppercase tracking-wide text-agron-900 dark:text-white border-b border-agron-900 dark:border-white pb-1">
                View Progression
              </a>
            </div>

            {/* PATH 03: AGOPS */}
            <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 hover:border-agron-blue dark:hover:border-blue-500 transition-colors duration-300">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-sm flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-agron-900 dark:text-white mb-2">Agriculture Operators</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Specialized track for precision agriculture, spraying, and multispectral analysis.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <span className="mr-2 text-green-600 dark:text-green-500">►</span>
                  Chemical handling & safety
                </li>
                <li className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <span className="mr-2 text-green-600 dark:text-green-500">►</span>
                  Automated field mapping
                </li>
                <li className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <span className="mr-2 text-green-600 dark:text-green-500">►</span>
                  Seasonal refresh cycles
                </li>
              </ul>
              <a href="#agops" className="inline-block text-xs font-bold uppercase tracking-wide text-agron-900 dark:text-white border-b border-agron-900 dark:border-white pb-1">
                View Progression
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* DETAILED BREAKDOWNS */}
      <div className="bg-slate-50 dark:bg-slate-950">
        
        {/* DETAIL: Individual */}
        <div id="individual" className="border-b border-gray-200 dark:border-gray-800 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                   <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-xs mb-2 block">Track 01</span>
                   <h2 className="text-3xl font-extrabold text-agron-900 dark:text-white mb-6">Individual Professional Path</h2>
                   <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                     Designed for pilots transitioning from recreational or general aviation backgrounds into industrial systems management. 
                     This path focuses on individual accountability, checklist discipline, and deep technical knowledge of specific airframes.
                   </p>
                   
                   <div className="space-y-6">
                      <div className="flex">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center font-mono text-xs font-bold text-gray-500">1</div>
                         <div className="ml-4">
                            <h4 className="font-bold text-agron-900 dark:text-white">Foundational Compliance (ORL-1)</h4>
                            <p className="text-xs text-gray-500 mt-1">Regulatory baselines, airspace theory, and manual flight proficiency.</p>
                         </div>
                      </div>
                      <div className="flex">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-blue-500 flex items-center justify-center font-mono text-xs font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/20">2</div>
                         <div className="ml-4">
                            <h4 className="font-bold text-agron-900 dark:text-white">Advanced Simulation (ORL-2/3)</h4>
                            <p className="text-xs text-gray-500 mt-1">20 hours of supervised simulation covering wind shear, GPS denial, and emergency landings.</p>
                         </div>
                      </div>
                      <div className="flex">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center font-mono text-xs font-bold text-gray-500">3</div>
                         <div className="ml-4">
                            <h4 className="font-bold text-agron-900 dark:text-white">Professional Training Certificate</h4>
                            <p className="text-xs text-gray-500 mt-1">Final practical exam. Operator is cleared for commercial deployment on specific class hardware.</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="relative h-96 bg-gray-200 dark:bg-gray-800 rounded-sm overflow-hidden shadow-xl border border-white/5">
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80" alt="Individual Operator" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>

        {/* DETAIL: Teams */}
        <div id="teams" className="border-b border-gray-200 dark:border-gray-800 py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-last lg:order-first relative h-96 bg-gray-200 dark:bg-gray-800 rounded-sm overflow-hidden shadow-xl border border-white/5">
                    <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80" alt="Team Operations" className="w-full h-full object-cover" />
                </div>
                <div>
                   <span className="text-amber-600 dark:text-amber-500 font-bold uppercase tracking-wider text-xs mb-2 block">Track 02</span>
                   <h2 className="text-3xl font-extrabold text-agron-900 dark:text-white mb-6">Teams & Organization Path</h2>
                   <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                     Hardware is only as effective as the communication loop behind it. This track builds standardized protocols for multi-operator environments, 
                     ideal for public safety departments and infrastructure inspection crews.
                   </p>
                   
                   <div className="space-y-6">
                      <div className="flex">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center font-mono text-xs font-bold text-gray-500">1</div>
                         <div className="ml-4">
                            <h4 className="font-bold text-agron-900 dark:text-white">Unit Cohesion & CRM</h4>
                            <p className="text-xs text-gray-500 mt-1">Establishing roles: Pilot in Command (PIC), Visual Observer (VO), and Mission Commander.</p>
                         </div>
                      </div>
                      <div className="flex">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-amber-500 flex items-center justify-center font-mono text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/20">2</div>
                         <div className="ml-4">
                            <h4 className="font-bold text-agron-900 dark:text-white">Complex Scenario Injection</h4>
                            <p className="text-xs text-gray-500 mt-1">Teams face simulated multi-vector problems (e.g., "Lost person + Low Battery + Loss of Comms").</p>
                         </div>
                      </div>
                      <div className="flex">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center font-mono text-xs font-bold text-gray-500">3</div>
                         <div className="ml-4">
                            <h4 className="font-bold text-agron-900 dark:text-white">Operational Readiness Audit</h4>
                            <p className="text-xs text-gray-500 mt-1">Organization is certified as "Deployment Ready" with defined standard operating procedures.</p>
                         </div>
                      </div>
                   </div>
                </div>
            </div>
        </div>

        {/* DETAIL: AgOps */}
        <div id="agops" className="border-b border-gray-200 dark:border-gray-800 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                   <span className="text-green-600 dark:text-green-500 font-bold uppercase tracking-wider text-xs mb-2 block">Track 03</span>
                   <h2 className="text-3xl font-extrabold text-agron-900 dark:text-white mb-6">Agricultural Specialist (AgOps)</h2>
                   <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                     Agriculture demands a unique blend of aviation safety and chemical application logic. 
                     This seasonal track prepares operators for the intense, short-window operations of spraying and harvest analysis.
                   </p>
                   
                   <div className="space-y-6">
                      <div className="flex">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center font-mono text-xs font-bold text-gray-500">1</div>
                         <div className="ml-4">
                            <h4 className="font-bold text-agron-900 dark:text-white">Handling & Logistics</h4>
                            <p className="text-xs text-gray-500 mt-1">Safe transport of large-format drones, generator management, and chemical mixing safety.</p>
                         </div>
                      </div>
                      <div className="flex">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-green-500 flex items-center justify-center font-mono text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20">2</div>
                         <div className="ml-4">
                            <h4 className="font-bold text-agron-900 dark:text-white">Field Automation</h4>
                            <p className="text-xs text-gray-500 mt-1">Programming boundary-aware autonomous flight plans for maximum coverage efficiency.</p>
                         </div>
                      </div>
                      <div className="flex">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center font-mono text-xs font-bold text-gray-500">3</div>
                         <div className="ml-4">
                            <h4 className="font-bold text-agron-900 dark:text-white">Seasonal Recertification</h4>
                            <p className="text-xs text-gray-500 mt-1">Mandatory refresher courses prior to each planting/spraying season to ensure currency.</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="relative h-96 bg-gray-200 dark:bg-gray-800 rounded-sm overflow-hidden shadow-2xl border border-white/5">
                    <img 
                      src={agOpsImg} 
                      alt="Agriculture Robotics Specialist" 
                      className={`w-full h-full object-cover transition-opacity duration-[2000ms] ${isAgOpsAiLoaded ? 'opacity-100' : 'opacity-60'}`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                       <span className="text-[10px] font-mono text-agron-accent uppercase tracking-widest bg-black/80 px-3 py-1 font-black">
                         {isAgOpsAiLoaded ? 'SYNTHETIC_VISUAL: AGOPS_NODE_T-04' : 'GENERIC_FIELD_MAPPING'}
                       </span>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* SECTION: CTA */}
      <div className="bg-agron-900 text-white py-16">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">Determine Your Organization's Readiness</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
               Contact the AGRON certification board to discuss eligibility requirements for specific tracks. 
               Entrance into advanced simulation modules requires verification of credentials.
            </p>
            <div className="flex justify-center gap-4">
               <button className="px-8 py-3 bg-white text-agron-900 font-bold uppercase tracking-wide text-sm hover:bg-gray-100 transition-colors">
                  Contact Admissions
               </button>
               <button className="px-8 py-3 border border-white text-white font-bold uppercase tracking-wide text-sm hover:bg-white hover:text-agron-900 transition-colors">
                  Download Course Catalog
               </button>
            </div>
         </div>
      </div>

    </div>
  );
};

export default LearningPaths;
