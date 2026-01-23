
import React, { useState } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Award, Palette, Layout, Save, Star, Sparkles, RefreshCw, BookOpen, User, Hash, Calendar, Type, CheckCircle2 } from 'lucide-react';
import { LogoMark } from '../Header.tsx';

const BrandLogo = () => (
  <div className="flex flex-col items-center">
    <LogoMark className="w-16 h-16 mb-2" />
    <div className="flex flex-col items-center text-center">
      <span className="text-[8px] font-black text-[#304B9E] uppercase leading-none">Digital Information</span>
      <span className="text-[8px] font-black text-[#304B9E] uppercase leading-none">Resources</span>
      <span className="text-[6px] font-black text-[#F05A28] tracking-tight uppercase mt-0.5">Learning Hub</span>
    </div>
  </div>
);

export const EditCertificatesView: React.FC = () => {
  const initialConfig = {
    primaryColor: '#304B9E',
    secondaryColor: '#F05A28',
    accentColor: '#ec2027',
    borderStyle: 'double',
    fontFamily: 'Serif',
    studentName: 'TIMMY LEE',
    courseName: MOCK_COURSES[0].name,
    studentCode: 'DIR-9421',
    issueDate: new Date().toISOString().split('T')[0]
  };

  const [selectedCourseId, setSelectedCourseId] = useState(MOCK_COURSES[0].id);
  const [config, setConfig] = useState(initialConfig);
  const [isSaving, setIsSaving] = useState(false);

  const handleCourseChange = (id: string) => {
    const course = MOCK_COURSES.find(c => c.id === id);
    if (course) {
      setSelectedCourseId(id);
      setConfig(prev => ({ ...prev, courseName: course.name }));
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset template to defaults?")) {
      setConfig(initialConfig);
    }
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      {/* Compact Header - Purple changed to Blue */}
      <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#3b82f6] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-3 relative z-10">
           <div className="p-2.5 bg-[#3b82f6] rounded-lg text-white shadow-lg rotate-3">
             <Award size={22} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-lg md:text-xl font-black leading-none tracking-tight uppercase">Branding <span className="text-[#F05A28]">Hub</span></h2>
             <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1">Global Award Designer</p>
           </div>
        </div>
        <button 
           onClick={handleReset}
           className="px-6 py-2 bg-white/10 text-white border border-white/20 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-[#ec2027] hover:border-transparent transition-all z-10 active:scale-95"
        >
          Reset to Default
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden pb-1">
        {/* Sidebar Customizer */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-xl overflow-y-auto scrollbar-hide flex flex-col">
           <h3 className="text-sm font-black text-[#304B9E] uppercase tracking-tight mb-6 flex items-center gap-2">
             <Palette size={16} className="text-[#3b82f6]" /> Asset Customizer
           </h3>
           
           <div className="space-y-4 flex-1 pr-1">
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><BookOpen size={12} /> Link to Program</label>
                 <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-black text-[10px] uppercase outline-none focus:border-[#3b82f6] transition-all appearance-none cursor-pointer"
                    value={selectedCourseId}
                    onChange={(e) => handleCourseChange(e.target.value)}
                  >
                    {MOCK_COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                 </select>
              </div>

              <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><User size={12} /> Student Name</label>
                 <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-black text-xs uppercase outline-none focus:border-[#3b82f6] transition-all"
                      value={config.studentName}
                      onChange={(e) => setConfig({...config, studentName: e.target.value})}
                      placeholder="ENTER NAME"
                    />
                 </div>
              </div>

              <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Star size={12} /> Course Override</label>
                 <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-black text-xs uppercase outline-none focus:border-[#3b82f6] transition-all"
                      value={config.courseName}
                      onChange={(e) => setConfig({...config, courseName: e.target.value})}
                      placeholder="COURSE NAME"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Hash size={12} /> ID Code</label>
                   <input 
                      type="text" 
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-black text-xs uppercase outline-none focus:border-[#3b82f6] transition-all"
                      value={config.studentCode}
                      onChange={(e) => setConfig({...config, studentCode: e.target.value})}
                    />
                </div>
                <div className="space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12} /> Date</label>
                   <input 
                      type="date" 
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-black text-[9px] uppercase outline-none focus:border-[#3b82f6] transition-all"
                      value={config.issueDate}
                      onChange={(e) => setConfig({...config, issueDate: e.target.value})}
                    />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Palette size={12} /> Palette Control</label>
                 <div className="grid grid-cols-3 gap-2">
                    {[
                      { l: 'Brand', v: config.primaryColor, k: 'primaryColor' },
                      { l: 'Accent', v: config.secondaryColor, k: 'secondaryColor' },
                      { l: 'Highlight', v: config.accentColor, k: 'accentColor' }
                    ].map(item => (
                      <div key={item.k} className="flex flex-col gap-1">
                        <input 
                          type="color" 
                          value={item.v}
                          onChange={(e) => setConfig({...config, [item.k]: e.target.value})}
                          className="w-full h-10 rounded-lg cursor-pointer border-2 border-slate-100 shadow-inner overflow-hidden" 
                        />
                        <span className="text-[7px] font-black uppercase text-center text-slate-400">{item.l}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Layout size={12} /> Border Finish</label>
                 <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-black text-[10px] uppercase outline-none focus:border-[#3b82f6] transition-all appearance-none cursor-pointer"
                    value={config.borderStyle}
                    onChange={(e) => setConfig({...config, borderStyle: e.target.value})}
                  >
                    <option value="solid">SOLID FRAME</option>
                    <option value="double">DOUBLE FRAME</option>
                    <option value="dashed">DASHED FRAME</option>
                    <option value="none">NO FRAME</option>
                 </select>
              </div>
           </div>

           <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full py-4 mt-6 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2.5 transition-all border-b-4 border-black/10 active:scale-95 ${
                isSaving ? 'bg-[#00a651] text-white' : 'bg-[#304B9E] text-white hover:bg-[#3b82f6]'
              }`}
           >
              {isSaving ? <CheckCircle2 size={16} /> : <Save size={16} strokeWidth={3} />}
              {isSaving ? 'Branding Saved' : 'Save Template'}
           </button>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-8 flex flex-col gap-3 overflow-hidden">
           <div className="bg-slate-200/50 p-4 md:p-6 rounded-[2rem] flex-1 flex items-center justify-center overflow-hidden">
              <div 
                className="w-full max-w-lg aspect-[1.4/1] bg-white p-8 text-center relative shadow-2xl flex flex-col items-center justify-center overflow-hidden animate-in zoom-in-95"
                style={{ 
                  border: `8px ${config.borderStyle} ${config.secondaryColor}`,
                  borderRadius: '1.5rem'
                }}
              >
                <div className="mb-4 flex flex-col items-center">
                  <div className="p-2.5 bg-white rounded-2xl border-2 border-slate-50 shadow-xl mb-3 transform scale-90 inline-block" style={{ boxShadow: `0 15px 20px -5px ${config.primaryColor}20` }}>
                    <BrandLogo />
                  </div>
                  <h1 className="text-xl font-serif text-slate-800 mb-1 tracking-tight">Certification of Achievement</h1>
                  <p className="text-slate-400 font-bold italic text-[10px]">This is proudly presented to</p>
                </div>

                <div className="mb-6 w-full">
                  <h2 className="text-3xl font-black mb-3 uppercase tracking-tight leading-none truncate px-4" style={{ color: config.primaryColor }}>
                    {config.studentName || 'LEARNER NAME'}
                  </h2>
                  <div className="h-0.5 w-40 mx-auto mb-3 rounded-full" style={{ backgroundColor: config.secondaryColor }}></div>
                  <p className="text-[11px] text-slate-400 italic">For successfully completing the program</p>
                  <p className="text-lg font-black uppercase mt-1 tracking-tight" style={{ color: config.accentColor }}>
                    {config.courseName || 'COURSE NAME'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full max-w-sm mt-2">
                  <div className="space-y-1">
                    <div className="border-t border-slate-100 pt-1.5 font-black uppercase text-[7px] tracking-widest text-slate-400">Main Center HQ</div>
                    <div className="h-0.5 w-8 bg-slate-100 mx-auto rounded-full mt-0.5"></div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="border-t border-slate-100 pt-1.5 font-black uppercase text-[7px] tracking-widest text-slate-400">Date: {config.issueDate}</div>
                    <div className="font-mono text-[7px] text-slate-300 uppercase">CODE: {config.studentCode}</div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.05]" style={{ color: config.accentColor }}><Sparkles size={120} /></div>
              </div>
           </div>
           
           <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-slate-100">
                 <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-500"></div>
                 <span className="text-[8px] font-black uppercase tracking-widest text-[#304B9E]">Live Preview Active</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
