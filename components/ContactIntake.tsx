import React, { useState } from 'react';

const ContactIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    inquiryType: 'Individual Training',
    sector: 'Infrastructure',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission delay
    const id = `INC-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`;
    setReferenceId(id);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col">
      
      {/* SECTION: Hero / Intro */}
      <div className="bg-slate-900 text-white py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-bold text-agron-accent uppercase tracking-widest mb-3">Communication Channel</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Request Information
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-0 max-w-3xl border-l-4 border-gray-700 pl-6">
              Inquiries regarding AGRON training programs and simulation infrastructure are processed by our central intake unit. 
              <br/><br/>
              All requests are reviewed to ensure alignment with our operational standards. We do not solicit business; we respond to verified operational needs.
            </p>
        </div>
      </div>

      {/* SECTION: Main Content */}
      <div className="bg-white dark:bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              
              {/* COLUMN 1: Inquiry Paths / Routing */}
              <div className="lg:col-span-1 space-y-10">
                 <div>
                    <h3 className="text-xl font-bold text-agron-900 dark:text-white uppercase mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Inquiry Paths</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                       Select the channel that corresponds to your operational profile to ensure your request is routed to the correct department.
                    </p>
                 </div>

                 <div className="space-y-8">
                    {/* Path 1 */}
                    <div>
                       <h4 className="font-bold text-agron-900 dark:text-white text-sm mb-2 flex items-center">
                          1. Individual Professionals
                       </h4>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <strong>Target Profile:</strong> Operators and specialists seeking advanced training or platform certification.
                       </p>
                       <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                          Topics: Course prerequisites, schedule availability, certification transfer.
                       </p>
                    </div>

                    {/* Path 2 */}
                    <div>
                       <h4 className="font-bold text-agron-900 dark:text-white text-sm mb-2 flex items-center">
                          2. Teams & Organizations
                       </h4>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <strong>Target Profile:</strong> Corporate infrastructure divisions, public safety departments, and enterprise fleets.
                       </p>
                       <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                          Topics: Private cohorts, SOP integration, on-site deployment.
                       </p>
                    </div>

                    {/* Path 3 */}
                    <div>
                       <h4 className="font-bold text-agron-900 dark:text-white text-sm mb-2 flex items-center">
                          3. Agriculture (AgOps)
                       </h4>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <strong>Target Profile:</strong> Farm operators, spraying contractors, and agribusiness technical leads.
                       </p>
                       <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                          Topics: Seasonal readiness, chemical safety, multispectral analysis.
                       </p>
                    </div>
                 </div>
              </div>

              {/* COLUMN 2: Intake Form */}
              <div className="lg:col-span-2">
                 <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-800 p-8 rounded-sm shadow-sm relative overflow-hidden">
                    
                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                            <h3 className="text-lg font-bold text-agron-900 dark:text-white uppercase tracking-wider">Intake Form</h3>
                            <span className="text-xs font-mono text-gray-400">SECURE TRANSMISSION</span>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                               <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Full Name</label>
                               <input 
                                 type="text" 
                                 name="name"
                                 required
                                 className="w-full bg-white dark:bg-slate-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm p-3 rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue outline-none transition-all"
                                 value={formData.name}
                                 onChange={handleChange}
                               />
                            </div>
                            <div>
                               <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Organization (Optional)</label>
                               <input 
                                 type="text" 
                                 name="organization"
                                 className="w-full bg-white dark:bg-slate-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm p-3 rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue outline-none transition-all"
                                 value={formData.organization}
                                 onChange={handleChange}
                               />
                            </div>
                         </div>

                         <div>
                             <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Email Address</label>
                             <input 
                               type="email" 
                               name="email"
                               required
                               className="w-full bg-white dark:bg-slate-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm p-3 rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue outline-none transition-all"
                               value={formData.email}
                               onChange={handleChange}
                             />
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                               <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Inquiry Category</label>
                               <select 
                                 name="inquiryType"
                                 className="w-full bg-white dark:bg-slate-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm p-3 rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue outline-none transition-all"
                                 value={formData.inquiryType}
                                 onChange={handleChange}
                               >
                                  <option>Individual Professional Training</option>
                                  <option>Team / Organizational Program</option>
                                  <option>Agriculture (AgOps) Program</option>
                                  <option>General Inquiry</option>
                               </select>
                            </div>
                            <div>
                               <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Area of Interest</label>
                               <select 
                                 name="sector"
                                 className="w-full bg-white dark:bg-slate-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm p-3 rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue outline-none transition-all"
                                 value={formData.sector}
                                 onChange={handleChange}
                               >
                                  <option>Infrastructure Inspection</option>
                                  <option>Public Safety / SAR</option>
                                  <option>Agriculture / Multispectral</option>
                                  <option>Simulation Only</option>
                                  <option>Other</option>
                               </select>
                            </div>
                         </div>

                         <div>
                             <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Brief Description of Needs</label>
                             <textarea 
                               name="message"
                               rows={4}
                               required
                               className="w-full bg-white dark:bg-slate-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm p-3 rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue outline-none transition-all"
                               placeholder="Outline your objectives. Do not include classified or sensitive information."
                               value={formData.message}
                               onChange={handleChange}
                             />
                         </div>

                         <div className="flex items-center justify-end pt-4">
                            <button 
                              type="submit"
                              className="px-8 py-3 bg-agron-900 dark:bg-white text-white dark:text-agron-900 font-bold uppercase tracking-wider text-sm hover:bg-agron-800 dark:hover:bg-gray-100 transition-colors"
                            >
                              Submit Request
                            </button>
                         </div>
                      </form>
                    ) : (
                      <div className="py-12 flex flex-col items-center text-center animate-fade-in">
                          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                             <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                             </svg>
                          </div>
                          <h3 className="text-xl font-bold text-agron-900 dark:text-white uppercase mb-2">Request Logged</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">Reference ID: <span className="font-mono font-bold">{referenceId}</span></p>
                          <button 
                             onClick={() => setSubmitted(false)} 
                             className="text-sm text-agron-blue dark:text-blue-400 hover:underline"
                          >
                             Return to Form
                          </button>
                      </div>
                    )}
                 </div>
              </div>

           </div>
        </div>
      </div>

      {/* SECTION: What Happens Next */}
      <div className="bg-gray-100 dark:bg-slate-900 py-12 border-t border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h4 className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-10">Process Workflow</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="text-center">
                  <div className="h-10 w-10 mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-4">
                     <span className="font-bold text-agron-900 dark:text-white">01</span>
                  </div>
                  <strong className="block text-sm font-bold text-agron-900 dark:text-white mb-2">Internal Review</strong>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                     Your request is classified and routed to the appropriate sector lead for feasibility assessment.
                  </p>
               </div>
               <div className="text-center">
                  <div className="h-10 w-10 mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-4">
                     <span className="font-bold text-agron-900 dark:text-white">02</span>
                  </div>
                  <strong className="block text-sm font-bold text-agron-900 dark:text-white mb-2">Follow-Up Communication</strong>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                     An intake officer will contact you within 48 hours to discuss requirements or provide a relevant prospectus.
                  </p>
               </div>
               <div className="text-center">
                  <div className="h-10 w-10 mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-4">
                     <span className="font-bold text-agron-900 dark:text-white">03</span>
                  </div>
                  <strong className="block text-sm font-bold text-agron-900 dark:text-white mb-2">No Obligation</strong>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                     This inquiry process is for information gathering only and does not constitute a commitment to services.
                  </p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ContactIntake;