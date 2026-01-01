
import React from 'react';

interface FooterProps {
   setActiveTab?: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-white dark:bg-agron-900 text-gray-600 dark:text-slate-400 border-t border-gray-200 dark:border-agron-700 mt-auto transition-colors duration-200">
      
      {/* UPPER FOOTER - SITEMAP */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* COL 1: IDENTITY */}
          <div>
             <div className="flex items-center mb-6">
                <span className="font-bold text-2xl tracking-widest text-agron-900 dark:text-white">AGRON</span>
             </div>
             <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
               AGRON is a national-scale infrastructure platform for the training, certification, and operational readiness of autonomous aerial and ground robotic systems.
             </p>
             <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">
               <p>HQ: SECTOR 4, INDUSTRIAL DIST.</p>
               <p>AUTH: COMMERCIAL/DEFENSE</p>
             </div>
          </div>

          {/* COL 2: TRAINING & SIM */}
          <div>
            <h3 className="text-agron-900 dark:text-white text-xs font-bold uppercase tracking-widest mb-6">Training & Operations</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-agron-blue dark:hover:text-white transition-colors">Learning Paths</a></li>
              <li><a href="#" className="hover:text-agron-blue dark:hover:text-white transition-colors">Course Catalog</a></li>
              <li><a href="#" className="hover:text-agron-blue dark:hover:text-white transition-colors">Training Facilities</a></li>
              <li><a href="#" className="hover:text-agron-blue dark:hover:text-white transition-colors">Simulation Core</a></li>
              {setActiveTab && (
                 <li><button onClick={() => setActiveTab('agops')} className="hover:text-agron-blue dark:hover:text-white text-left">AgOps Program</button></li>
              )}
            </ul>
          </div>

          {/* COL 3: GOVERNANCE & SECTORS */}
          <div>
            <h3 className="text-agron-900 dark:text-white text-xs font-bold uppercase tracking-widest mb-6">Sectors & Governance</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-agron-blue dark:hover:text-white transition-colors">Safety Management (SMS)</a></li>
              <li><a href="#" className="hover:text-agron-blue dark:hover:text-white transition-colors">Certification Standards</a></li>
              {setActiveTab && (
                 <li><button onClick={() => setActiveTab('government')} className="hover:text-agron-900 dark:hover:text-white text-left font-bold text-agron-blue dark:text-blue-400">Government & Public Safety</button></li>
              )}
              <li><a href="#" className="hover:text-agron-blue dark:hover:text-white transition-colors">Ethics & Privacy</a></li>
              <li><a href="#" className="hover:text-agron-blue dark:hover:text-white transition-colors">About AGRON</a></li>
            </ul>
          </div>

          {/* COL 4: LEGAL & CONTACT */}
          <div>
            <h3 className="text-agron-900 dark:text-white text-xs font-bold uppercase tracking-widest mb-6">Legal & Access</h3>
            <ul className="space-y-3 text-sm mb-8">
              <li><span className="cursor-pointer hover:text-agron-900 dark:hover:text-white">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-agron-900 dark:hover:text-white">Terms of Use</span></li>
              <li><span className="cursor-pointer hover:text-agron-900 dark:hover:text-white">Training Disclaimer</span></li>
              {setActiveTab && (
                 <li><button onClick={() => setActiveTab('investors')} className="hover:text-agron-900 dark:hover:text-white text-left">Investor Relations</button></li>
              )}
            </ul>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
               <p className="text-xs text-gray-400 mb-2">Institutional Inquiries:</p>
               <a href="#" className="text-sm font-bold text-agron-blue dark:text-blue-400 hover:underline">Contact Intake Form</a>
            </div>
          </div>

        </div>
      </div>

      {/* LOWER FOOTER - ATTRIBUTION */}
      <div className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-agron-800">
         <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 dark:text-gray-500 flex gap-4">
               <span>&copy; {new Date().getFullYear()} AGRON Platform. All rights reserved.</span>
               {setActiveTab && (
                  <button 
                     onClick={() => setActiveTab('admin')}
                     className="hover:text-agron-blue dark:hover:text-white transition-colors font-bold uppercase tracking-tighter border-b border-transparent hover:border-agron-blue"
                  >
                     Admin Portal
                  </button>
               )}
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">A Project Of</span>
               <span className="text-xs font-bold text-gray-700 dark:text-gray-300">DIGITAL INVEST INC.</span>
            </div>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
