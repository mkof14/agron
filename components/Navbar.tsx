
import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTrainingOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setIsTrainingOpen(false);
  };

  return (
    <nav className="bg-agron-900 border-b border-agron-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-white group-hover:text-agron-accent transition-colors uppercase leading-tight">AGRON</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none border-t border-white/10 pt-1 mt-1">
                Aerial–Ground Robotics Operations Network
              </span>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center space-x-1">
            
            {/* Direct Links */}
            <NavButton label="About" id="about" activeTab={activeTab} onClick={handleNavClick} />
            <NavButton label="Standards" id="trust" activeTab={activeTab} onClick={handleNavClick} />

            {/* Training Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsTrainingOpen(!isTrainingOpen)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                  ['learning-paths', 'catalog', 'training'].includes(activeTab)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white hover:bg-agron-800'
                }`}
              >
                Training Programs
                <svg className={`w-4 h-4 transition-transform ${isTrainingOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isTrainingOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-agron-900 border border-agron-700 shadow-xl rounded-sm py-2 z-50">
                  <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Curriculum</div>
                  <DropdownItem label="Learning Paths" id="learning-paths" activeTab={activeTab} onClick={handleNavClick} desc="Career progression tracks" />
                  <DropdownItem label="Course Catalog" id="catalog" activeTab={activeTab} onClick={handleNavClick} desc="Full list of certifications" />
                  <div className="my-2 border-t border-agron-800"></div>
                  <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Infrastructure</div>
                  <DropdownItem label="Facilities & Modules" id="training" activeTab={activeTab} onClick={handleNavClick} desc="Training nodes & equipment" />
                </div>
              )}
            </div>

            <NavButton label="Simulation Core" id="simulation" activeTab={activeTab} onClick={handleNavClick} />
            
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="hidden lg:flex items-center gap-6">
             {/* Portal Link */}
             <div className="flex flex-col items-end">
               <button 
                  onClick={() => handleNavClick('profile')}
                  className={`text-xs font-medium hover:text-white transition-colors flex items-center gap-2 ${activeTab === 'profile' ? 'text-white' : 'text-gray-400'}`}
               >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Portal (Restricted)
               </button>
             </div>

             {/* CTA */}
             <button 
               onClick={() => handleNavClick('contact')}
               className="bg-white text-agron-900 hover:bg-gray-100 px-5 py-2 text-sm font-bold uppercase tracking-wide rounded-sm transition-colors"
             >
               Request Info
             </button>

             {/* Theme Toggle */}
             <div className="border-l border-agron-700 pl-4 ml-2">
               <button 
                 onClick={toggleTheme} 
                 className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-agron-800"
               >
                 {theme === 'light' ? (
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                   </svg>
                 ) : (
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                   </svg>
                 )}
               </button>
             </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-agron-800 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-agron-900 border-t border-agron-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavButton label="Dashboard" id="home" activeTab={activeTab} onClick={handleNavClick} />
            <MobileNavButton label="About AGRON" id="about" activeTab={activeTab} onClick={handleNavClick} />
            <MobileNavButton label="Standards & Trust" id="trust" activeTab={activeTab} onClick={handleNavClick} />
            
            <div className="py-2 px-3 text-xs font-bold text-gray-500 uppercase tracking-widest">Training</div>
            <MobileNavButton label="Learning Paths" id="learning-paths" activeTab={activeTab} onClick={handleNavClick} indent />
            <MobileNavButton label="Course Catalog" id="catalog" activeTab={activeTab} onClick={handleNavClick} indent />
            <MobileNavButton label="Modules & Facilities" id="training" activeTab={activeTab} onClick={handleNavClick} indent />
            
            <div className="py-2 px-3 text-xs font-bold text-gray-500 uppercase tracking-widest">Platform</div>
            <MobileNavButton label="Simulation Core" id="simulation" activeTab={activeTab} onClick={handleNavClick} />
            <MobileNavButton label="Operator Portal" id="profile" activeTab={activeTab} onClick={handleNavClick} />
            
            <div className="mt-4 pt-4 border-t border-agron-800">
               <button 
                 onClick={() => handleNavClick('contact')}
                 className="w-full text-center bg-white text-agron-900 py-3 font-bold uppercase tracking-wide text-sm rounded-sm"
               >
                 Request Information
               </button>
            </div>
            <div className="mt-2 pt-2 text-center">
               <button onClick={toggleTheme} className="text-sm text-gray-400">
                  Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
               </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- SUB-COMPONENTS ---

interface NavButtonProps {
  label: string;
  id: string;
  activeTab: string;
  onClick: (id: string) => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, id, activeTab, onClick }) => {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-agron-800 text-white shadow-inner'
          : 'text-gray-300 hover:bg-agron-800 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
};

interface DropdownItemProps extends NavButtonProps {
   desc: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, id, activeTab, onClick, desc }) => {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full text-left px-4 py-3 hover:bg-agron-800 transition-colors group ${isActive ? 'bg-agron-800' : ''}`}
    >
      <span className={`block text-sm font-bold ${isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
         {label}
      </span>
      <span className="block text-xs text-gray-500 group-hover:text-gray-400 mt-0.5">
         {desc}
      </span>
    </button>
  );
}

interface MobileNavButtonProps extends NavButtonProps {
  indent?: boolean;
}

const MobileNavButton: React.FC<MobileNavButtonProps> = ({ label, id, activeTab, onClick, indent }) => {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
        indent ? 'pl-6' : ''
      } ${
        isActive
          ? 'bg-agron-800 text-white'
          : 'text-gray-300 hover:bg-agron-700 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
};

export default Navbar;
