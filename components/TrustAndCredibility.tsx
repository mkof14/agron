import React from 'react';

const TrustAndCredibility: React.FC = () => {
  return (
    <div className="flex flex-col">
      
      {/* SECTION: Hero */}
      <div className="bg-slate-900 text-white py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-bold text-agron-accent uppercase tracking-widest mb-3">Institutional Confidence</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Standards of Assurance
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-0 max-w-3xl border-l-4 border-gray-700 pl-6">
              The AGRON platform is built on a single premise: <span className="text-white font-semibold">Autonomous systems require human accountability.</span> 
              <br/><br/>
              Our training frameworks are designed to meet the rigorous liability, safety, and operational standards of enterprise infrastructure and public sector defense.
            </p>
        </div>
      </div>

      {/* SECTION: Three Pillars */}
      <div className="bg-white dark:bg-slate-950 py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Pillar 1 */}
              <div>
                 <div className="h-12 w-12 bg-agron-900 dark:bg-white text-white dark:text-agron-900 rounded-sm flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                 </div>
                 <h3 className="text-xl font-bold text-agron-900 dark:text-white mb-3">Rigorous Governance</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Our curriculum is not open-source. It is maintained by a closed board of subject matter experts from aviation, defense, and industrial engineering sectors to ensure unwavering adherence to safety protocols.
                 </p>
              </div>

              {/* Pillar 2 */}
              <div>
                 <div className="h-12 w-12 bg-agron-900 dark:bg-white text-white dark:text-agron-900 rounded-sm flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                 </div>
                 <h3 className="text-xl font-bold text-agron-900 dark:text-white mb-3">Instructor Oversight</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    We utilize a "Human-in-the-Loop" evaluation model. While AI assists in data collection, final certification is always granted by a verified human instructor with active operational experience.
                 </p>
              </div>

              {/* Pillar 3 */}
              <div>
                 <div className="h-12 w-12 bg-agron-900 dark:bg-white text-white dark:text-agron-900 rounded-sm flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                 </div>
                 <h3 className="text-xl font-bold text-agron-900 dark:text-white mb-3">Deterministic Simulation</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    AGRON simulation environments are physics-deterministic. A crash in the simulator replicates the exact telemetry of a crash in the field, ensuring training scars are valid and transferable.
                 </p>
              </div>

           </div>
        </div>
      </div>

      {/* SECTION: Deep Dives */}
      <div className="bg-gray-50 dark:bg-slate-900 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            
            {/* The Human in the Loop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <h4 className="text-agron-blue dark:text-blue-400 font-bold uppercase text-xs tracking-wider mb-2">Training Philosophy</h4>
                  <h2 className="text-3xl font-extrabold text-agron-900 dark:text-white mb-6">The Human-in-the-Loop</h2>
                  <div className="prose prose-sm text-gray-600 dark:text-gray-400">
                     <p>
                        In an era of automation, AGRON asserts that the ultimate failsafe is a trained human operator. 
                        Our algorithms generate scenarios and track performance metrics, but they do not define readiness.
                     </p>
                     <p className="mt-4">
                        <strong>Certification Authority:</strong> Only Level 5 (L5) Instructors can sign off on a "Deployment Ready" certificate. 
                        This ensures that an operator has demonstrated not just technical competence, but judgment under pressure—a quality AI cannot currently evaluate with sufficient nuance.
                     </p>
                  </div>
               </div>
               <div className="bg-white dark:bg-slate-800 p-8 border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Evaluation Hierarchy</h5>
                  <ul className="space-y-4">
                     <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                        <div className="ml-3">
                           <strong className="text-sm text-gray-900 dark:text-white block">Telemetry Logging (Automated)</strong>
                           <span className="text-xs text-gray-500">System records stick inputs, battery usage, and path deviation.</span>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                        <div className="ml-3">
                           <strong className="text-sm text-gray-900 dark:text-white block">Contextual Review (Instructor)</strong>
                           <span className="text-xs text-gray-500">Instructor reviews <em>why</em> a decision was made (e.g., breaking altitude limit to avoid collision).</span>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                        <div className="ml-3">
                           <strong className="text-sm text-gray-900 dark:text-white block">Final Sign-Off (Board)</strong>
                           <span className="text-xs text-gray-500">Advanced certifications require dual-signature verification.</span>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Mission-Based Evaluation & AAR (NEW SECTION) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
               <div className="order-last lg:order-first bg-white dark:bg-slate-800 p-8 border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-700">
                         <strong className="block text-xs uppercase text-agron-accent mb-2">Data Stream 01</strong>
                         <span className="text-sm font-bold text-gray-900 dark:text-white">Stick Inputs</span>
                         <p className="text-xs text-gray-500 mt-1">Latency & Smoothness</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-700">
                         <strong className="block text-xs uppercase text-agron-accent mb-2">Data Stream 02</strong>
                         <span className="text-sm font-bold text-gray-900 dark:text-white">Cockpit Audio</span>
                         <p className="text-xs text-gray-500 mt-1">Protocol Brevity</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-700">
                         <strong className="block text-xs uppercase text-agron-accent mb-2">Data Stream 03</strong>
                         <span className="text-sm font-bold text-gray-900 dark:text-white">Environment</span>
                         <p className="text-xs text-gray-500 mt-1">3D Positioning</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-700">
                         <strong className="block text-xs uppercase text-agron-accent mb-2">Data Stream 04</strong>
                         <span className="text-sm font-bold text-gray-900 dark:text-white">Biometrics</span>
                         <p className="text-xs text-gray-500 mt-1">Eye Tracking (Opt)</p>
                      </div>
                   </div>
               </div>
               <div>
                  <h4 className="text-agron-blue dark:text-blue-400 font-bold uppercase text-xs tracking-wider mb-2">Objective Analytics</h4>
                  <h2 className="text-3xl font-extrabold text-agron-900 dark:text-white mb-6">Mission-Based Evaluation & AAR</h2>
                  <div className="prose prose-sm text-gray-600 dark:text-gray-400">
                     <p>
                        Flight hours alone do not equate to readiness. AGRON employs a "Mission-Based" evaluation standard. We do not simply test if a pilot can fly; we test if they can complete an operational objective under duress.
                     </p>
                     <p className="mt-4">
                        The core of this process is the <strong>After-Action Review (AAR)</strong>. Following every simulation scenario, operators undergo a debrief where telemetry, audio, and visual data are synchronized. 
                        This eliminates subjective debate. The data reveals exactly when a decision was made, and what information was available at that millisecond.
                     </p>
                  </div>
               </div>
            </div>

            {/* Controlled Environments */}
            <div className="bg-slate-100 dark:bg-slate-900/50 p-8 border-l-4 border-agron-900 dark:border-white">
                <h3 className="text-xl font-bold text-agron-900 dark:text-white mb-4">The Controlled Training Environment (CTE)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                   Real-world field training is subject to "weather luck"—a trainee might pass simply because conditions were calm. 
                   AGRON facilities operate as <strong>Controlled Training Environments</strong>. 
                   We standardize variables such as wind shear, signal interference, and lighting conditions. 
                   This ensures that a certification represents a verified capability to handle adverse conditions, not just a fortunate day in the field.
                </p>
            </div>

            {/* Safety Management Systems */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="bg-white dark:bg-slate-800 p-8 border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm">
                   <div className="space-y-4 font-mono text-xs">
                       <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                          <span className="text-gray-500">HAZARD ID</span>
                          <span className="text-gray-900 dark:text-white font-bold">CONTROL MEASURE</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Loss of GPS</span>
                          <span className="text-blue-600 dark:text-blue-400">Manual ATTI Transition</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">C2 Link Severed</span>
                          <span className="text-blue-600 dark:text-blue-400">Automated RTH Protocol</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Battery Cell Deviance</span>
                          <span className="text-blue-600 dark:text-blue-400">Immediate Landing Decision</span>
                       </div>
                       <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-100 dark:border-red-900/50 text-center font-bold">
                          RISK MITIGATION: ACTIVE
                       </div>
                   </div>
               </div>
               <div>
                  <h4 className="text-agron-blue dark:text-blue-400 font-bold uppercase text-xs tracking-wider mb-2">Safety Culture</h4>
                  <h2 className="text-3xl font-extrabold text-agron-900 dark:text-white mb-6">Safety Management Systems (SMS)</h2>
                  <div className="prose prose-sm text-gray-600 dark:text-gray-400">
                     <p>
                        AGRON adopts the <strong>Safety Management System (SMS)</strong> framework used by civil aviation authorities worldwide. 
                        We move beyond simple "checklists" to a culture of systematic risk management.
                     </p>
                     <p className="mt-4">
                        Every training mission begins with a standardized Risk Assessment Matrix (RAM). 
                        Trainees learn to quantify risk (Likelihood x Severity) and implement mitigation strategies <em>before</em> propellers spin. 
                        This procedural discipline is the hallmark of an AGRON graduate.
                     </p>
                  </div>
               </div>
            </div>

         </div>
      </div>

      {/* SECTION: Ethics & Privacy */}
      <div className="bg-white dark:bg-slate-950 py-20 border-t border-gray-200 dark:border-gray-800">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-agron-900 dark:text-white mb-6">Ethics & Responsible Operation</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-10">
               With high-resolution sensors comes high responsibility. AGRON curriculum explicitly covers the ethical boundaries of data collection. 
               Operators are trained on privacy laws, data retention policies, and the "need-to-know" principle of surveillance. 
               We certify operators who respect the public trust.
            </p>
            <div className="inline-flex items-center justify-center space-x-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Visual placeholders for "Industry Standards" logos */}
                <div className="h-12 w-24 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500">ISO 9001</div>
                <div className="h-12 w-24 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500">NIST 800-53</div>
                <div className="h-12 w-24 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500">ASTM F38</div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default TrustAndCredibility;