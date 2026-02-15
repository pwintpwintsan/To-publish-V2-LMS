
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_CLASSES, MOCK_COURSES, MOCK_STUDENTS } from '../../constants.tsx';
import { Student, Teacher, UserRole } from '../../types.ts';
import { 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Users as UsersIcon, 
  Trash2, 
  UserPlus, 
  UserCheck, 
  X, 
  Save, 
  Eye, 
  Search, 
  Check, 
  BookOpen, 
  Zap, 
  Tag, 
  Clock, 
  Layers
} from 'lucide-react';

interface ClassDetailViewProps {
  classId: string;
  onStudentClick: (id: string) => void;
  onBack: () => void;
  onEnterCourse: (id: string) => void;
  onViewSyllabus: (id: string) => void;
  onClassSwitch?: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
}

const AddMemberModal = ({ type, onClose, onSave }: { type: 'student' | 'teacher', onClose: () => void, onSave: (data: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.username.includes(searchTerm)
  );

  const handleConfirm = () => {
    if (type === 'student') {
      const selected = MOCK_STUDENTS.find(s => s.id === selectedId);
      if (selected) onSave(selected);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[85vh]">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#F05A28] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="text-center mb-8 shrink-0">
           <div className="w-16 h-16 bg-orange-50 text-[#F05A28] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-orange-100 rotate-3">
              <UserPlus size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Enroll Learner</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">U Book Store Registry</p>
        </div>

        <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
          <div className="relative shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={3} />
            <input 
              type="text"
              placeholder="Search learner directory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#304B9E] focus:border-[#F05A28] focus:bg-white outline-none transition-all shadow-inner"
            />
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 pr-1">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                    selectedId === s.id 
                      ? 'bg-orange-50 border-[#F05A28] shadow-md' 
                      : 'bg-white border-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                       <img src={`https://picsum.photos/seed/${s.id}/64`} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="text-left">
                      <p className={`font-black text-sm uppercase tracking-tight ${selectedId === s.id ? 'text-[#F05A28]' : 'text-[#304B9E]'}`}>{s.firstName} {s.lastName}</p>
                      <p className="text-[10px] font-mono font-bold text-slate-400">ID: {s.username}</p>
                    </div>
                  </div>
                  {selectedId === s.id ? (
                    <div className="w-6 h-6 rounded-full bg-[#F05A28] text-white flex items-center justify-center shadow-lg animate-in zoom-in">
                       <Check size={14} strokeWidth={4} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-slate-300" />
                  )}
                </button>
              ))
            ) : (
              <div className="py-12 text-center opacity-30">
                 <Search size={48} className="mx-auto text-slate-300 mb-2" />
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">No Learners Matched</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
           <button onClick={onClose} className="py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
           <button 
             onClick={handleConfirm}
             disabled={!selectedId}
             className={`py-5 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 border-b-4 border-black/10 transition-all active:scale-95 ${
               selectedId ? 'bg-[#00a651] hover:bg-[#304B9E]' : 'bg-slate-200 cursor-not-allowed'
             }`}
           >
              Add to Class
           </button>
        </div>
      </div>
    </div>
  );
};

export const ClassDetailView: React.FC<ClassDetailViewProps> = ({ classId, onStudentClick, onBack, onEnterCourse, onViewSyllabus, onClassSwitch, checkPermission }) => {
  const cls = MOCK_CLASSES.find(c => c.id === classId) || MOCK_CLASSES[0];
  const associatedCourse = MOCK_COURSES.find(c => c.id === cls.courseId) || MOCK_COURSES[0];
  
  const [activeModal, setActiveModal] = useState<'student' | 'teacher' | null>(null);
  const [isBrowseDropdownOpen, setIsBrowseDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBrowseDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStudents = cls.students.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.username.includes(searchTerm)
  );

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      
      {activeModal && (
        <AddMemberModal 
          type={activeModal} 
          onClose={() => setActiveModal(null)} 
          onSave={() => setActiveModal(null)} 
        />
      )}
      
      {/* Standardized Compact Header Bar */}
      <div className="w-full bg-[#304B9E] rounded-xl p-3 md:p-4 text-white shadow-xl border-b-6 border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="flex items-center gap-4 relative z-10">
           <button onClick={onBack} className="p-2.5 bg-slate-50 text-[#304B9E] rounded-xl hover:bg-[#F05A28] hover:text-white transition-all active:scale-90 border border-slate-100 flex items-center gap-2 pr-4">
             <ChevronLeft size={20} strokeWidth={4} />
             <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Back library</span>
           </button>
           <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F05A28] rounded-lg text-white shadow-lg rotate-3">
                <GraduationCap size={20} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-sm md:text-base font-black leading-none tracking-tight uppercase">Class <span className="text-[#F05A28]">Profile: {cls.name}</span></h2>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
            <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                <Tag size={10} className="text-[#F05A28]" strokeWidth={3} />
                <span className="text-[8px] font-black text-white font-mono tracking-widest leading-none">LEVEL: {cls.level.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                <Clock size={10} className="text-[#00a651]" strokeWidth={3} />
                <span className="text-[8px] font-black text-white uppercase tracking-tight leading-none">HUB STATUS: ACTIVE</span>
            </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="w-full bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-2.5 flex-shrink-0">
        <div className="flex-1 flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full group focus-within:border-[#F05A28] transition-all">
          <Search size={18} className="text-slate-400 group-focus-within:text-[#304B9E]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search learners by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs font-black text-[#304B9E] outline-none w-full placeholder:text-slate-200 uppercase"
          />
        </div>
        
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button 
            onClick={() => setActiveModal('student')}
            className="px-6 py-2.5 bg-[#304B9E] text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl hover:bg-[#F05A28] transition-all active:scale-95 border-b-4 border-black/10 flex items-center gap-2"
          >
             <UserPlus size={14} strokeWidth={3} /> Enroll Learner
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsBrowseDropdownOpen(!isBrowseDropdownOpen)}
              className="px-4 py-2.5 bg-slate-50 text-[#304B9E] border border-slate-100 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
            >
              <BookOpen size={14} /> Switch HUB
            </button>

            {isBrowseDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-2 border-[#304B9E] overflow-hidden w-64 z-[120] animate-in fade-in zoom-in-95 duration-200">
                <div className="p-3 bg-[#304B9E] text-white flex items-center gap-2">
                  <UsersIcon size={14} className="text-orange-400" />
                  <h4 className="font-black text-[10px] uppercase tracking-widest">Active Hub Classes</h4>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto scrollbar-hide space-y-1">
                   {MOCK_CLASSES.map(c => (
                     <button 
                      key={c.id} 
                      onClick={() => { onClassSwitch?.(c.id); setIsBrowseDropdownOpen(false); }}
                      className={`w-full p-3 rounded-xl border transition-all text-left flex items-center justify-between ${c.id === classId ? 'bg-orange-50 border-[#F05A28]' : 'border-transparent hover:bg-slate-50'}`}
                     >
                        <div className="min-w-0">
                           <p className={`font-black text-[10px] uppercase tracking-tight truncate ${c.id === classId ? 'text-[#F05A28]' : 'text-[#304B9E]'}`}>{c.name}</p>
                           <p className="text-[8px] font-bold text-slate-400 uppercase">{c.level}</p>
                        </div>
                        <ChevronRight size={14} className={c.id === classId ? 'text-[#F05A28]' : 'text-slate-200'} />
                     </button>
                   ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area - Learner Roster */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden flex flex-col mb-2">
        <div className="flex-1 overflow-y-auto scrollbar-hide">
           <div className="divide-y divide-slate-50">
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <div key={student.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="relative">
                         <img src={`https://picsum.photos/seed/${student.id}/150`} className="w-12 h-12 rounded-xl border-4 border-white shadow-lg group-hover:rotate-3 transition-transform" alt="" />
                      </div>
                      <div>
                         <h4 onClick={() => onStudentClick(student.id)} className="text-base font-black text-[#304B9E] uppercase tracking-tighter cursor-pointer hover:text-[#F05A28] transition-colors leading-none">
                            {student.firstName} {student.lastName}
                         </h4>
                         <div className="flex items-center gap-3 mt-1.5">
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded text-[8px] font-black uppercase tracking-widest border border-slate-200">ID: {student.username}</span>
                            <div className="flex items-center gap-1 text-emerald-600 font-black text-[9px] uppercase">
                               <Zap size={10} fill="currentColor" /> {student.finalGrade}% SCORE
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button onClick={() => onStudentClick(student.id)} className="p-2.5 bg-white text-slate-300 rounded-lg shadow-sm hover:bg-[#304B9E] hover:text-white transition-all active:scale-90 border border-slate-100">
                         <Eye size={16} strokeWidth={3} />
                      </button>
                      <button className="p-2.5 bg-white text-slate-200 rounded-lg shadow-sm hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 border border-slate-100">
                         <Trash2 size={16} strokeWidth={3} />
                      </button>
                   </div>
                </div>
              )) : (
                <div className="py-24 text-center opacity-30">
                   <GraduationCap size={80} className="mx-auto text-slate-200 mb-4" strokeWidth={1} />
                   <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-widest">No Learners Found</h4>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Try a different search term</p>
                </div>
              )}
           </div>
        </div>
        
        {/* Footer Summary */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Global Hub Synchronized</span>
           </div>
           <p className="text-[8px] font-black text-[#304B9E] uppercase tracking-widest">
              HUB ROSTER: <span className="text-[#F05A28]">{cls.students.length} MEMBERS</span>
           </p>
        </div>
      </div>
    </div>
  );
};
