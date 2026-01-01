
import React, { useState, useMemo } from 'react';

// Interfaces for catalog data
interface Course {
  id: string;
  title: string;
  description: string;
  focus: 'Aerial' | 'Ground' | 'Hybrid';
  format: 'Classroom' | 'Simulation' | 'Field' | 'Mixed Mode';
  duration: string;
  audience: string;
  outcome: string;
}

interface Category {
  level: string;
  description: string;
  courses: Course[];
}

const CourseCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const catalogData: Category[] = [
    {
      level: "Foundations (ORL-1)",
      description: "Baseline competency for safety, regulatory compliance, and system mechanics.",
      courses: [
        {
          id: "SYS-101",
          title: "Uncrewed Systems Fundamentals",
          description: "Comprehensive introduction to aerial and ground robotics architecture, airspace integration (NAS), and ethical deployment standards.",
          focus: "Hybrid",
          format: "Classroom",
          duration: "16 Hours",
          audience: "New Hires, Support Staff",
          outcome: "Foundational Safety Certificate"
        },
        {
          id: "BFM-102",
          title: "Basic Flight Maneuvers (Simulation)",
          description: "Intensive stick-time in the Synthetic Environment. Focus on orientation recovery, ATTI mode control, and emergency failsafes.",
          focus: "Aerial",
          format: "Simulation",
          duration: "20 Hours",
          audience: "Trainee Pilots",
          outcome: "Sim-Operator Qualified"
        }
      ]
    },
    {
      level: "Professional Operations (ORL-2)",
      description: "Workflow execution for commercial data acquisition and asset management.",
      courses: [
        {
          id: "PAS-200",
          title: "Photogrammetry & Survey Standards",
          description: "Technical execution of orthomosaic mapping. Coverage of GSD (Ground Sample Distance) calculation, RTK base station setup, and overlap logic.",
          focus: "Aerial",
          format: "Mixed Mode",
          duration: "32 Hours",
          audience: "Surveyors, Engineers",
          outcome: "Professional Mapping Certificate"
        },
        {
          id: "ISO-200",
          title: "Infrastructure Inspection Protocols",
          description: "Close-proximity maneuvering for vertical assets (towers/stacks). Emphasis on sensor gimbal control and zoom-camera data capture.",
          focus: "Aerial",
          format: "Field",
          duration: "24 Hours",
          audience: "Inspectors, Maintenance",
          outcome: "Asset Inspection Certificate"
        }
      ]
    },
    {
      level: "Advanced & Mission Training (ORL-3)",
      description: "High-stress, complex missions including BVLOS and night operations.",
      courses: [
        {
          id: "BVL-300",
          title: "Beyond Visual Line of Sight (BVLOS)",
          description: "Instrument-rated flight training. Navigation via telemetry and FPV solely. Includes loss-of-link procedures and Detect-and-Avoid (DAA) logic.",
          focus: "Aerial",
          format: "Simulation",
          duration: "40 Hours",
          audience: "Senior Operators",
          outcome: "BVLOS Endorsement"
        },
        {
          id: "NIT-300",
          title: "Night Operations & Thermography",
          description: "Interpreting radiometric thermal data in real-time. Operations in zero-light environments using strobe protocols and navigation lighting.",
          focus: "Hybrid",
          format: "Field",
          duration: "16 Hours (Night)",
          audience: "Security, Public Safety",
          outcome: "Night/Thermal Certificate"
        }
      ]
    },
    {
      level: "Integrated Air–Ground Operations (ORL-4)",
      description: "Multi-domain coordination involving simultaneous aerial and ground assets.",
      courses: [
        {
          id: "INT-400",
          title: "Joint Domain Coordination",
          description: "Simultaneous command of aerial overwatch and ground rover units. Focus on communications handoffs and shared situational awareness.",
          focus: "Hybrid",
          format: "Mixed Mode",
          duration: "1 Week",
          audience: "Mission Commanders",
          outcome: "Systems Integration Certificate"
        },
        {
          id: "CRM-400",
          title: "Crew Resource Management (CRM)",
          description: "Human-factors training for multi-person teams (Pilot, Sensor Operator, Mission Commander). Error chain analysis and communication brevity.",
          focus: "Hybrid",
          format: "Classroom",
          duration: "12 Hours",
          audience: "Team Leads",
          outcome: "CRM Compliance Record"
        }
      ]
    },
    {
      level: "Instructor & Evaluator (ORL-5)",
      description: "Train-the-Trainer programs for internal organizational sustainment.",
      courses: [
        {
          id: "T3-500",
          title: "AGRON Certified Instructor",
          description: "Pedagogy for technical systems training. How to conduct debriefs, assess student performance, and manage simulator fault injection.",
          focus: "Hybrid",
          format: "Mixed Mode",
          duration: "2 Weeks",
          audience: "Senior Staff",
          outcome: "Certified Instructor Qualification"
        }
      ]
    }
  ];

  const filteredCatalog = useMemo(() => {
    if (!searchQuery.trim()) return catalogData;
    const query = searchQuery.toLowerCase();
    
    return catalogData.map(category => ({
      ...category,
      courses: category.courses.filter(course => 
        course.title.toLowerCase().includes(query) ||
        course.id.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.outcome.toLowerCase().includes(query)
      )
    })).filter(category => category.courses.length > 0);
  }, [searchQuery, catalogData]);

  return (
    <div className="flex flex-col">
      
      {/* SECTION: Hero */}
      <div className="bg-slate-900 text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-bold text-agron-accent uppercase tracking-widest mb-3">Training & Certification</h2>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
              Commercial Training Portfolio
            </h1>
            <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
              The AGRON Course Catalog represents a standardized curriculum for autonomous systems. 
              Courses are modular and stackable, allowing organizations to build specific competency profiles for their personnel.
            </p>
        </div>
      </div>

      {/* SECTION: Advanced Search & Methodology Legend */}
      <div className="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800 py-8 sticky top-20 z-40 shadow-sm backdrop-blur-md bg-white/90 dark:bg-slate-950/90">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                
                {/* Institutional Search Bar */}
                <div className="relative w-full lg:w-96 group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400 group-focus-within:text-agron-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                   </div>
                   <input 
                     type="text"
                     placeholder="Search code, title, description, or outcome..."
                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-agron-accent focus:border-agron-accent sm:text-xs font-mono tracking-tighter transition-all"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase text-gray-700 dark:text-gray-300 tracking-widest">Classroom Theory</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase text-gray-700 dark:text-gray-300 tracking-widest">Synthetic Simulation</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase text-gray-700 dark:text-gray-300 tracking-widest">Live Field Operations</span>
                    </div>
                </div>
            </div>
         </div>
      </div>

      {/* SECTION: Course Grid */}
      <div className="bg-gray-50 dark:bg-slate-950 py-12 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {filteredCatalog.length > 0 ? (
            filteredCatalog.map((category, idx) => (
              <div key={category.level} className="animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-agron-900 dark:text-white uppercase tracking-tighter">{category.level}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">{category.description}</p>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase mt-2 md:mt-0 font-black tracking-[0.2em]">Tier_Segment: 0{idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.courses.map((course) => (
                    <div key={course.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-sm hover:border-agron-blue dark:hover:border-blue-500 transition-all duration-200 flex flex-col shadow-sm group">
                      {/* Card Header */}
                      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                         <div className="flex justify-between items-start mb-3">
                            <span className="font-mono text-[10px] font-black text-agron-accent bg-amber-50 dark:bg-amber-900/10 px-2 py-0.5 rounded-sm border border-amber-100 dark:border-amber-900/30 uppercase tracking-widest">
                              {course.id}
                            </span>
                            <div className="flex gap-2">
                               <span className="text-[9px] uppercase font-black text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded-sm tracking-widest">
                                  {course.focus}
                               </span>
                               <span className="text-[9px] uppercase font-black text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-sm tracking-widest">
                                  {course.format}
                               </span>
                            </div>
                         </div>
                         <h3 className="text-lg font-black text-agron-900 dark:text-white leading-tight uppercase tracking-tight group-hover:text-agron-blue dark:group-hover:text-blue-400 transition-colors">
                           {course.title}
                         </h3>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex-grow">
                         <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-medium">
                           {course.description}
                         </p>
                         
                         <div className="grid grid-cols-2 gap-4 text-[11px]">
                            <div>
                               <span className="block text-gray-400 uppercase font-black tracking-widest mb-1">Target Personnel</span>
                               <span className="text-gray-900 dark:text-gray-200 font-bold uppercase">{course.audience}</span>
                            </div>
                            <div>
                               <span className="block text-gray-400 uppercase font-black tracking-widest mb-1">Duration</span>
                               <span className="text-gray-900 dark:text-gray-200 font-bold uppercase">{course.duration}</span>
                            </div>
                         </div>
                      </div>

                      {/* Card Footer */}
                      <div className="bg-gray-50 dark:bg-slate-950 p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                         <div className="flex items-center text-[10px] text-green-700 dark:text-green-500 font-black uppercase tracking-widest">
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {course.outcome}
                         </div>
                         <button className="text-[10px] font-black text-agron-blue dark:text-blue-400 uppercase tracking-[0.2em] hover:underline">
                            Request Syllabus
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center">
               <div className="inline-block border-2 border-dashed border-gray-200 dark:border-gray-800 p-12 rounded-sm">
                  <svg className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-lg font-black text-agron-900 dark:text-white uppercase tracking-tighter">No Institutional Matches Found</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto font-medium">Your search query did not return any certified courses. Refine your parameters or contact the curriculum board.</p>
                  <button onClick={() => setSearchQuery('')} className="mt-6 text-xs font-black text-agron-blue dark:text-blue-400 uppercase tracking-widest border-b border-agron-blue pb-1">Reset Search Matrix</button>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* SECTION: Custom / Team Programs */}
      <div className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-agron-900 text-white rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
              <div className="max-w-2xl">
                 <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Organizational Cohorts</h3>
                 <p className="text-slate-400 leading-relaxed text-sm mb-6 font-medium">
                    AGRON offers private training cohorts for teams of 6 or more. 
                    Programs can be customized to include specific mission profiles (e.g., HazMat response, Powerline inspection) 
                    and integrated with your organization's existing Standard Operating Procedures (SOPs).
                 </p>
                 <div className="flex items-center gap-6 text-[10px] font-black font-mono text-slate-500 tracking-[0.2em] uppercase">
                    <span>• ON-SITE DEPLOYMENT AVAILABLE</span>
                    <span>• CUSTOM SIMULATION ENVIRONMENTS</span>
                 </div>
              </div>
              <div className="flex-shrink-0">
                 <button className="px-8 py-4 bg-white text-agron-900 font-black text-xs uppercase tracking-[0.3em] hover:bg-agron-accent hover:text-white transition-all shadow-xl">
                    Contact Enterprise Sales
                 </button>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default CourseCatalog;
