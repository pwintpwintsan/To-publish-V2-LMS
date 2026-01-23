
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
  ShieldCheck, 
  Mail, 
  Lock, 
  AlertCircle, 
  Info, 
  Layers, 
  X, 
  Save, 
  Sparkles,
  Eye,
  FileCheck,
  Search,
  BookMarked,
  CheckCircle2,
  Check,
  ListOrdered,
  BookOpen,
  PlusCircle,
  Zap,
  TrendingUp,
  Play
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

const UpgradePopup = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onConfirm();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-[#292667]/80 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl border-b-[12px] border-[#00a651] text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner text-[#00a651]">
             <CheckCircle2 size={48} strokeWidth={3} />
          </div>
          <h3 className="text-3xl font-black text-[#292667] mb-2 uppercase tracking-tighter">UPGRADE SUCCESS!</h3>
          <p className="text-slate-500 font-bold mb-8 text-sm uppercase tracking-widest">
            You have successfully added <span className="text-[#00a651]">5 new slots</span> to your learner roster.
          </p>
          <button onClick={onClose} className="w-full py-5 px-8 bg-[#292667] text-white rounded-2xl font-black text-lg hover:bg-[#00a651] hover:text-white transition-all uppercase tracking-widest shadow-md border-b-4 border-black/10">
            Great!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#292667]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-lg w-full shadow-2xl border-b-[12px] border-[#ec2027] text-center animate-in zoom-in-95 duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16"></div>
        <div className="w-16 h-16 bg-[#ec2027] rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl text-white">
           <Zap size={30} fill="currentColor" />
        </div>
        <h3 className="text-2xl font-black text-[#292667] mb-3 uppercase tracking-tighter">Expand Your Class</h3>
        <p className="text-slate-500 font-bold mb-8 text-sm leading-relaxed uppercase tracking-tight">
          Requesting additional capacity for <span className="text-[#ec2027]">U Book Store</span> hubs. Upgrades are bundled in groups of <span className="text-[#292667] font-black">5 students</span>.
        </p>
        
        <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 border-2 border-slate-100 flex items-center justify-between">
           <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Upgrade Bundle</p>
              <h4 className="text-xl font-black text-[#292667]">+5 Learner Slots</h4>
           </div>
           <div className="p-3 bg-red-600 rounded-xl text-white font-black shadow-md">
              LVL UP
           </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleUpgrade}
            disabled={isProcessing}
            className="block w-full py-5 px-8 bg-[#292667] text-white rounded-2xl font-black text-lg hover:bg-[#ec2027] hover:text-white transition-all uppercase tracking-tighter shadow-md border-b-6 border-black/20 active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Confirm Upgrade (+5 Seats)'}
          </button>
          <button onClick={onClose} className="w-full text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-[#292667] transition-all">
            Cancel and Return
          </button>
        </div>
      </div>
    </div>
  );
};

const AddMemberModal = ({ type, onClose, onSave }: { type: 'student' | 'teacher', onClose: () => void, onSave: (data: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idCode: '',
    role: type === 'teacher' ? 'Educator' : '',
    level: type === 'student' ? 'Digital Kids Starter V2' : ''
  });

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.username.includes(searchTerm)
  );

  const handleSelectStudent = (student: Student) => {
    setSelectedId(student.id);
  };

  const handleConfirm = () => {
    if (type === 'student') {
      const selected = MOCK_STUDENTS.find(s => s.id === selectedId);
      if (selected) onSave(selected);
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#292667]/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border-t-[12px] border-[#ec2027] relative animate-in slide-in-from-bottom-8 duration-300 flex flex-col max-h-[85vh]">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[#ec2027] transition-colors bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="flex items-center gap-4 mb-6 shrink-0">
           <div className={`p-4 rounded-2xl text-white shadow-lg ${type === 'student' ? 'bg-[#ec2027]' : 'bg-[#00a651]'}`}>
              {type === 'student' ? <UserPlus size={24} /> : <UserCheck size={24} />}
           </div>
           <div>
              <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight">
                {type === 'student' ? 'Browse Learners' : `Add New ${type}`}
              </h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {type === 'student' ? 'Select from Global Directory' : 'Registering for U Book Store'}
              </p>
           </div>
        </div>

        {type === 'student' ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="relative mb-4 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={3} />
              <input 
                type="text"
                placeholder="Search by name or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#292667] focus:border-[#ec2027] focus:bg-white outline-none transition-all shadow-inner"
              />
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 pr-1">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectStudent(s)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                      selectedId === s.id 
                        ? 'bg-red-50 border-[#ec2027] shadow-md' 
                        : 'bg-white border-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                         <img src={`https://picsum.photos/seed/${s.id}/64`} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="text-left">
                        <p className={`font-black text-sm uppercase tracking-tight ${selectedId === s.id ? 'text-[#ec2027]' : 'text-[#292667]'}`}>{s.firstName} {s.lastName}</p>
                        <p className="text-[10px] font-mono font-bold text-slate-400">#{s.username}</p>
                      </div>
                    </div>
                    {selectedId === s.id ? (
                      <div className="w-6 h-6 rounded-full bg-[#ec2027] text-white flex items-center justify-center shadow-lg animate-in zoom-in">
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
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">No Learners Found</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                   <input 
                     type="text" 
                     value={formData.firstName}
                     onChange={e => setFormData({...formData, firstName: e.target.value})}
                     placeholder="e.g. Jane"
                     className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#292667] focus:border-[#ec2027] focus:bg-white outline-none transition-all"
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                   <input 
                     type="text" 
                     value={formData.lastName}
                     onChange={e => setFormData({...formData, lastName: e.target.value})}
                     placeholder="e.g. Smith"
                     className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#292667] focus:border-[#ec2027] focus:bg-white outline-none transition-all"
                   />
                </div>
             </div>

             <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Teacher Code</label>
                <input 
                  type="text" 
                  value={formData.idCode}
                  onChange={e => setFormData({...formData, idCode: e.target.value})}
                  placeholder="UB-XXXX"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-mono font-black text-[#ec2027] focus:border-[#ec2027] focus:bg-white outline-none transition-all"
                />
             </div>

             <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Role / Position</label>
                <select 
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#292667] outline-none appearance-none"
                >
                   <option>Educator</option>
                   <option>Assistant</option>
                   <option>Guest Speaker</option>
                </select>
             </div>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4 shrink-0">
           <button onClick={onClose} className="flex-1 py-4 px-6 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
              Cancel
           </button>
           <button 
             disabled={type === 'student' && !selectedId}
             onClick={handleConfirm}
             className={`flex-[1.5] py-4 px-6 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 border-b-4 border-black/10 ${
               type === 'student' 
                 ? (selectedId ? 'bg-[#ec2027] shadow-red-100' : 'bg-slate-300 cursor-not-allowed') 
                 : 'bg-[#00a651] shadow-green-100'
             }`}
           >
              {type === 'student' ? <CheckCircle2 size={18} /> : <Save size={18} />}
              {type === 'student' ? 'Add Selected student' : `Save ${type}`}
           </button>
        </div>
      </div>
    </div>
  );
};

export const ClassDetailView: React.FC<ClassDetailViewProps> = ({ classId, onStudentClick, onBack, onEnterCourse, onViewSyllabus, onClassSwitch, checkPermission }) => {
  const cls = MOCK_CLASSES.find(c => c.id === classId) || MOCK_CLASSES[0];
  const associatedCourse = MOCK_COURSES.find(c => c.id === cls.courseId) || MOCK_COURSES[0];
  
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [capacity, setCapacity] = useState(cls.students.length + 5);
  const [activeModal, setActiveModal] = useState<'student' | 'teacher' | null>(null);
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');
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

  const handleAddMember = (data: any) => {
    setActiveModal(null);
  };

  const handleCapacityUpgrade = () => {
    setCapacity(prev => prev + 5);
  };

  const filteredStudents = cls.students.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.username.includes(searchTerm)
  );

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      {showUpgrade && <UpgradePopup onClose={() => setShowUpgrade(false)} onConfirm={handleCapacityUpgrade} />}
      
      {activeModal && (
        <AddMemberModal 
          type={activeModal} 
          onClose={() => setActiveModal(null)} 
          onSave={handleAddMember} 
        />
      )}
      
      {/* Full-Width Header Bar - Yellow to Red */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-4 md:gap-6 relative z-10">
           <button onClick={onBack} className="p-5 bg-white/10 rounded-[2rem] text-white shadow-xl hover:bg-[#ec2027] transition-all group active:scale-90 border-2 border-white/10 flex-shrink-0">
             <ChevronLeft size={42} strokeWidth={4} />
           </button>
           <div className="cursor-pointer group" onClick={() => onViewSyllabus(associatedCourse.id)}>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase truncate max-w-sm group-hover:text-red-400 transition-colors">{associatedCourse.name}</h2>
             <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase text-[#ec2027] tracking-[0.2em] leading-none mb-1 opacity-60">HUB COURSE</span>
                  <span className="text-[12px] font-black text-white uppercase tracking-widest">{associatedCourse.name}</span>
                </div>
                <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase text-[#00a651] tracking-[0.2em] leading-none mb-1 opacity-60">HUB CLASS</span>
                  <span className="text-[12px] font-black text-[#ec2027] uppercase tracking-widest">{cls.name}</span>
                </div>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-12 px-10 md:border-l-4 border-white/10 relative z-10">
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#ec2027] leading-none">{cls.students.length} <span className="text-white/20 text-xl font-black uppercase">/ {capacity}</span></p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Active Students</p>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <button 
             onClick={() => setShowUpgrade(true)}
             className="flex flex-col items-center bg-[#ec2027] text-white px-8 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all border-b-6 border-black/10 group animate-pulse hover:animate-none"
           >
              <TrendingUp size={28} strokeWidth={3} className="group-hover:rotate-12 transition-transform text-white" />
              <p className="text-[10px] font-black uppercase tracking-widest mt-1">Upgrade +5</p>
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl overflow-hidden flex flex-col mb-4">
        {/* Tab Controls */}
        <div className="flex items-center border-b-4 border-slate-100 shrink-0">
           <button 
             onClick={() => setActiveTab('students')}
             className={`flex-1 flex flex-col items-center justify-center py-6 font-black text-sm uppercase transition-all border-b-8 gap-1 ${activeTab === 'students' ? 'border-[#ec2027] text-[#292667] bg-red-50/20' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
           >
             <GraduationCap size={28} strokeWidth={3} /> 
             <span>Learner Roster</span>
           </button>
           <button 
             onClick={() => setActiveTab('teachers')}
             className={`flex-1 flex flex-col items-center justify-center py-6 font-black text-sm uppercase transition-all border-b-8 gap-1 ${activeTab === 'teachers' ? 'border-[#00a651] text-[#292667] bg-green-50/20' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
           >
             <UsersIcon size={28} strokeWidth={3} />
             <span>Teacher Portal</span>
           </button>
        </div>

        {/* Search and Actions Bar */}
        <div className="p-6 bg-slate-50 flex flex-col md:flex-row items-center justify-between border-b-2 border-slate-100 gap-4 shrink-0">
           <div className="w-full md:w-96 flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100 focus-within:border-[#ec2027] transition-all shadow-sm group">
              <Search size={20} className="text-slate-300 group-focus-within:text-[#292667]" strokeWidth={3} />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm font-black text-[#292667] outline-none w-full uppercase placeholder:text-slate-200"
              />
           </div>
           
           <div className="flex gap-3 w-full md:w-auto">
             <button 
               onClick={() => setActiveModal(activeTab === 'students' ? 'student' : 'teacher')}
               className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-[1.5rem] text-white font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all border-b-4 border-black/10 ${activeTab === 'students' ? 'bg-[#ec2027]' : 'bg-[#00a651]'}`}
             >
                {activeTab === 'students' ? <UserPlus size={20} /> : <UserCheck size={20} />}
                Add New {activeTab}
             </button>
             <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsBrowseDropdownOpen(!isBrowseDropdownOpen)}
                  className={`h-full px-6 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all border-2 flex items-center justify-center gap-3 ${
                    isBrowseDropdownOpen ? 'bg-slate-100 text-[#292667] border-slate-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  {isBrowseDropdownOpen ? <X size={16} /> : <BookOpen size={16} />}
                  Switch Hub
                </button>

                {isBrowseDropdownOpen && (
                  <div className="absolute top-full right-0 mt-4 bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-4 border-[#292667] overflow-hidden w-80 z-[120] animate-in slide-in-from-top-10 fade-in duration-300">
                    <div className="p-6 bg-[#292667] text-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <UsersIcon size={20} className="text-red-400" />
                          <h4 className="font-black text-sm uppercase tracking-widest">Active Hub Classes</h4>
                      </div>
                    </div>
                    <div className="p-4 max-h-80 overflow-y-auto scrollbar-hide space-y-2">
                       {MOCK_CLASSES.map(c => (
                         <button 
                          key={c.id} 
                          onClick={() => { onClassSwitch?.(c.id); setIsBrowseDropdownOpen(false); }}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all group flex items-center justify-between ${c.id === classId ? 'bg-red-50 border-[#ec2027]' : 'hover:border-slate-200'}`}
                         >
                            <div className="min-w-0">
                               <p className={`font-black text-sm uppercase tracking-tight truncate ${c.id === classId ? 'text-[#ec2027]' : 'text-[#292667]'}`}>{c.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase">{c.level}</p>
                            </div>
                            <ChevronRight size={18} className={c.id === classId ? 'text-[#ec2027]' : 'text-slate-200'} />
                         </button>
                       ))}
                    </div>
                  </div>
                )}
             </div>
           </div>
        </div>

        {/* Data List Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
           {activeTab === 'students' ? (
             <div className="divide-y divide-slate-100">
                {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                  <div key={student.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all group">
                     <div className="flex items-center gap-6">
                        <div className="relative">
                           <img src={`https://picsum.photos/seed/${student.id}/150`} className="w-16 h-16 rounded-[1.5rem] border-4 border-white shadow-xl group-hover:rotate-3 transition-transform" alt="" />
                           <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-md">
                              {student.attendance}
                           </div>
                        </div>
                        <div>
                           <h4 onClick={() => onStudentClick(student.id)} className="text-xl font-black text-[#292667] uppercase tracking-tighter cursor-pointer hover:text-[#ec2027] transition-colors">
                              {student.firstName} {student.lastName}
                           </h4>
                           <div className="flex items-center gap-4 mt-1.5">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase tracking-widest">ID: {student.username}</span>
                              <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase">
                                 <Zap size={12} fill="currentColor" /> {student.finalGrade}% SCORE
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <button onClick={() => onStudentClick(student.id)} className="p-4 bg-white text-slate-400 rounded-2xl shadow-md hover:bg-[#292667] hover:text-white transition-all active:scale-90 border-2 border-slate-50">
                           <Eye size={20} strokeWidth={3} />
                        </button>
                        <button className="p-4 bg-white text-slate-300 rounded-2xl shadow-md hover:bg-red-50 hover:text-[#ec2027] transition-all active:scale-90 border-2 border-slate-50">
                           <Trash2 size={20} strokeWidth={3} />
                        </button>
                     </div>
                  </div>
                )) : (
                  <div className="py-32 text-center opacity-30">
                     <GraduationCap size={120} className="mx-auto text-slate-200 mb-6" strokeWidth={1} />
                     <h4 className="text-3xl font-black text-[#292667] uppercase tracking-tighter">No Learners Match</h4>
                     <p className="text-base font-bold text-slate-400 uppercase tracking-widest mt-2">Try searching with a different name or ID</p>
                  </div>
                )}
             </div>
           ) : (
             <div className="divide-y divide-slate-100">
                {cls.teachers.map((teacher) => (
                  <div key={teacher.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all group">
                     <div className="flex items-center gap-6">
                        <div className="relative">
                           <img src={`https://picsum.photos/seed/${teacher.id}/150`} className="w-16 h-16 rounded-[1.5rem] border-4 border-white shadow-xl group-hover:-rotate-3 transition-transform" alt="" />
                           <div className="absolute -bottom-2 -right-2 bg-[#00a651] text-white rounded-lg p-1 shadow-md">
                              <ShieldCheck size={16} strokeWidth={3} />
                           </div>
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-[#292667] uppercase tracking-tighter">{teacher.firstName} {teacher.lastName}</h4>
                           <div className="flex items-center gap-4 mt-1.5">
                              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-widest">{teacher.role}</span>
                              <span className="text-[10px] font-black text-slate-400 uppercase font-mono">{teacher.teacherCode}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <button className="p-4 bg-white text-slate-400 rounded-2xl shadow-md hover:bg-[#292667] hover:text-white transition-all active:scale-90 border-2 border-slate-50">
                           <Mail size={20} strokeWidth={3} />
                        </button>
                        <button className="p-4 bg-white text-slate-300 rounded-2xl shadow-md hover:bg-red-50 hover:text-[#ec2027] transition-all active:scale-90 border-2 border-slate-50">
                           <Trash2 size={20} strokeWidth={3} />
                        </button>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
        
        {/* Footer Summary */}
        <div className="p-6 bg-slate-50 border-t-2 border-slate-100 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#00a651] animate-pulse"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Sync Active</span>
              </div>
           </div>
           <p className="text-[10px] font-black text-[#292667] uppercase tracking-widest">
              Total Roster Size: <span className="text-[#ec2027]">{activeTab === 'students' ? cls.students.length : cls.teachers.length} Members</span>
           </p>
        </div>
      </div>
    </div>
  );
};
