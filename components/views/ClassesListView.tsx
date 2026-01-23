
import React, { useState, useMemo } from 'react';
import { MOCK_CLASSES, MOCK_SCHOOLS } from '../../constants.tsx';
import { ClassInfo, UserRole } from '../../types.ts';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  Users, 
  Building2, 
  LayoutGrid, 
  Clock, 
  ArrowRight,
  PlusCircle,
  X,
  CheckCircle2,
  Layers,
  Type
} from 'lucide-react';

interface ClassesListViewProps {
  onEnterClass: (id: string) => void;
  onEnterCenter: (id: string) => void;
  activeRole: UserRole;
}

const NewClassModal = ({ onClose }: { onClose: () => void }) => {
  const [className, setClassName] = useState('');
  const savedCoursesTemplates = [
    "Starter Level 1", "Starter Level 2", "Starter Level 3", "Starter Level 4",
    "Mover Level 1", "Mover Level 2", "Mover Level 3", "Mover Level 4", "Mover Level 5"
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-orange-50 text-[#304B9E] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-orange-100 rotate-3">
              <PlusCircle size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Add New Class</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Hub Curriculum Registry</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Layers size={12} className="text-[#ec2027]" /> Choose Template
            </label>
            <div className="relative">
              <select className="w-full bg-slate-50 px-5 py-4 rounded-2xl border-2 border-slate-100 outline-none font-black text-[#304B9E] text-sm uppercase appearance-none focus:border-[#F05A28] transition-all cursor-pointer shadow-inner">
                {savedCoursesTemplates.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Type size={12} className="text-[#3b82f6]" /> Enter Class Name
            </label>
            <input 
              type="text" 
              placeholder="e.g. Junior Coders Group 1" 
              className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#F05A28] focus:bg-white outline-none font-black text-base text-[#304B9E] transition-all shadow-inner"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
           <button onClick={onClose} className="py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
           <button 
             onClick={() => { alert('Class Created!'); onClose(); }}
             className="py-5 bg-[#F05A28] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 border-b-4 border-black/10 transition-all active:scale-95"
           >
              <CheckCircle2 size={18} strokeWidth={3} /> add class
           </button>
        </div>
      </div>
    </div>
  );
};

export const ClassesListView: React.FC<ClassesListViewProps> = ({ onEnterClass, onEnterCenter, activeRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [centerFilter, setCenterFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAdmin = activeRole === UserRole.MAIN_CENTER || activeRole === UserRole.SUPER_ADMIN;

  const filteredClasses = useMemo(() => {
    return MOCK_CLASSES.filter(cls => {
      const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           cls.level.toLowerCase().includes(searchTerm.toLowerCase());
      
      const school = MOCK_SCHOOLS.find(s => s.approvedCourseIds.includes(cls.courseId));
      const matchesCenter = centerFilter === 'all' || school?.id === centerFilter;
      
      return matchesSearch && matchesCenter;
    });
  }, [searchTerm, centerFilter]);

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      {isModalOpen && <NewClassModal onClose={() => setIsModalOpen(false)} />}
      
      {/* Standardized Header */}
      <div className="w-full bg-[#304B9E] rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl border-b-[10px] border-[#3b82f6] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-4 md:p-5 bg-[#3b82f6] rounded-2xl text-white shadow-xl rotate-3">
             <LayoutGrid size={32} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Hub <span className="text-[#F05A28]">Classes</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Active learning groups across the network</p>
           </div>
        </div>

        <div className="flex items-center gap-8 relative z-10 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm">
           <div className="text-center">
              <p className="text-3xl font-black text-[#F05A28] leading-none">{MOCK_CLASSES.length}</p>
              <p className="text-[9px] font-black uppercase text-white/40 tracking-widest mt-1">Total Classes</p>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-center">
              <p className="text-3xl font-black text-[#00a651] leading-none">
                {MOCK_CLASSES.reduce((acc, curr) => acc + curr.students.length, 0)}
              </p>
              <p className="text-[9px] font-black uppercase text-white/40 tracking-widest mt-1">Students</p>
           </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full bg-white p-3 md:p-4 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex-[2] flex items-center gap-4 bg-slate-50 px-6 py-3.5 rounded-2xl border border-slate-100 w-full group focus-within:border-[#3b82f6] transition-all">
          <Search size={22} className="text-slate-400 group-focus-within:text-[#3b82f6]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search classes or levels..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-base font-black text-[#304B9E] outline-none w-full placeholder:text-slate-300 uppercase"
          />
        </div>

        <div className="flex-1 min-w-[200px] relative w-full md:w-auto">
          <select 
            value={centerFilter}
            onChange={(e) => setCenterFilter(e.target.value)}
            className="w-full bg-slate-50 pl-10 pr-10 py-3.5 rounded-2xl border border-slate-100 outline-none font-black text-[10px] text-[#304B9E] uppercase appearance-none cursor-pointer"
          >
            <option value="all">All Classes</option>
            {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* YELLOW "add class" BUTTON (now orange) */}
      {isAdmin && (
        <div className="w-full flex-shrink-0 animate-in slide-in-from-top-2 duration-500">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="w-full py-5 bg-[#F05A28] hover:bg-[#304B9E] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-[0_20px_40px_-5px_rgba(240,90,40,0.4)] transition-all border-b-6 border-black/10 flex items-center justify-center gap-4 active:scale-[0.98] group"
           >
              <div className="p-1.5 bg-white/10 group-hover:bg-white/20 rounded-lg group-hover:rotate-90 transition-transform">
                 <Plus size={28} strokeWidth={3} />
              </div>
              add class
           </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredClasses.map((cls, idx) => {
            const school = MOCK_SCHOOLS.find(s => s.approvedCourseIds.includes(cls.courseId));
            return (
              <div 
                key={cls.id} 
                onClick={() => onEnterClass(cls.id)}
                className="bg-white rounded-[2.5rem] shadow-md border-2 border-transparent hover:border-[#3b82f6] transition-all group flex flex-col overflow-hidden cursor-pointer"
              >
                <div className={`p-6 ${idx % 3 === 0 ? 'bg-blue-50' : idx % 3 === 1 ? 'bg-emerald-50' : 'bg-orange-50'}`}>
                   <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-white text-[8px] font-black uppercase text-[#304B9E] rounded-lg shadow-sm border border-slate-100 tracking-widest">
                         {cls.level}
                      </span>
                      <div className="p-2 bg-white/80 rounded-lg">
                        <ArrowRight size={14} className="text-[#3b82f6] group-hover:translate-x-1 transition-transform" />
                      </div>
                   </div>
                   <h3 className="text-xl font-black text-[#304B9E] uppercase leading-tight truncate">{cls.name}</h3>
                   <p className="text-[9px] font-bold text-slate-400 uppercase mt-2 flex items-center gap-2">
                     <Building2 size={10} className="text-[#3b82f6]" /> {school?.name || 'Main Center'}
                   </p>
                </div>
                <div className="p-6 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="p-1.5 bg-slate-50 rounded-lg">
                            <Users size={14} className="text-[#ec2027]" strokeWidth={3} />
                         </div>
                         <span className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest">{cls.students.length} Learners</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px]">
                        <Clock size={12} />
                        <span>{cls.progress}%</span>
                      </div>
                   </div>
                   
                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                      <div 
                        className={`h-full transition-all duration-1000 ${idx % 3 === 0 ? 'bg-[#304B9E]' : idx % 3 === 1 ? 'bg-[#00a651]' : 'bg-[#F05A28]'}`} 
                        style={{ width: `${cls.progress}%` }}
                      ></div>
                   </div>

                   <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                      <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Last Activity</p>
                      <p className="text-[9px] font-bold text-[#304B9E] uppercase tracking-tighter">{cls.lastActivity}</p>
                   </div>
                </div>
              </div>
            );
          })}
          
          {filteredClasses.length === 0 && (
             <div className="col-span-full py-20 text-center opacity-30">
                <LayoutGrid size={64} className="mx-auto text-slate-200 mb-4" />
                <p className="text-xl font-black text-[#304B9E] uppercase tracking-widest">No classes found</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Try adjusting your filters</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
