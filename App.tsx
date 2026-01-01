
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import TrainingModules from './components/TrainingModules';
import SimulationGenerator from './components/SimulationGenerator';
import Portal from './components/Portal';
import AdminConsole from './components/AdminConsole';
import LearningPaths from './components/LearningPaths';
import CourseCatalog from './components/CourseCatalog';
import TrustAndCredibility from './components/TrustAndCredibility';
import ContactIntake from './components/ContactIntake';
import About from './components/About';
import InvestorRelations from './components/InvestorRelations';
import GovernmentMode from './components/GovernmentMode';
import AgOpsMode from './components/AgOpsMode';

const App: React.FC = () => {
  // Initialize state from local storage if available to persist session
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('agron_session_tab');
      return savedTab || 'home';
    }
    return 'home';
  });

  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('agron_theme') || 'light';
    }
    return 'light';
  });

  // Persist active tab changes
  useEffect(() => {
    localStorage.setItem('agron_session_tab', activeTab);
  }, [activeTab]);

  // Handle Theme Changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('agron_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'about':
        return <About />;
      case 'learning-paths':
        return <LearningPaths />;
      case 'catalog':
        return <CourseCatalog />;
      case 'trust':
        return <TrustAndCredibility />;
      case 'contact':
        return <ContactIntake />;
      case 'training':
        return <TrainingModules />;
      case 'simulation':
        return <SimulationGenerator />;
      case 'profile':
        return <Portal />;
      case 'admin':
        return <AdminConsole />;
      case 'investors':
        return <InvestorRelations />;
      case 'government':
        return <GovernmentMode />;
      case 'agops':
        return <AgOpsMode />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  // If in admin mode, hide public navbar/footer for cleaner interface, 
  // or keep them. For a "Portal" feel, we might want to hide the public Navbar.
  // However, for simplicity in this V1, we will wrap the Main App structure around it 
  // but the AdminConsole handles its own internal layout. 
  // We will conditionally hide the Navbar if activeTab is 'admin' to simulate a separate app.
  
  if (activeTab === 'admin') {
     return (
        <div className="min-h-screen bg-gray-100 dark:bg-black font-sans text-slate-900 dark:text-slate-100">
           <AdminConsole />
           {/* Simple footer for admin */}
           <div className="bg-black text-gray-600 text-[10px] p-2 text-center">
              <button onClick={() => setActiveTab('home')} className="hover:text-white uppercase font-bold">Return to Public Site</button>
           </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
