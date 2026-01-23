
import React, { useState, useMemo } from 'react';
import { MOCK_SCHOOLS, MOCK_COURSES, MOCK_STUDENTS, MOCK_CLASSES, MOCK_TEACHER } from '../../constants.tsx';
import { UserRole, Course, Student } from '../../types.ts';
import { 
  Building2, 
  BookOpen, 
  X, 
  PlusCircle, 
  Layers, 
  Type, 
  ChevronDown,
  Search,
  MoreHorizontal,
  UserPlus,
  BookMarked,
  Check,
  Tag,
  Clock,
  User,
  Users,
  Plus as PlusIcon,
  CheckCircle2,
  Trophy,
  History,
  TrendingUp,
  Mail,
  Zap,
  Calendar,
  MonitorPlay,
  ClipboardList,
  Sparkles,
  Hash,
  LayoutGrid,
  Edit3,
  Save
} from 'lucide-react';

interface CenterProfileViewProps {
  activeRole: UserRole;
}

const EditStudentModal = ({ student, onClose, onSave }: { student: any, onClose: () => void, onSave: (courseId: string) => void }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(student.courseId || MOCK_COURSES[0].id);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>
        <div className="text-center mb-8 shrink-0">
           <div className="w-16 h-16 bg-blue-50 text-[#304B9E] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-indigo-100 rotate-3">
              <User size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Modify Enrollment</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{student.firstName} {student.lastName}</p>
        </div>
        
        <div className="space-y-6 flex-1">
           <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Program</label>
              <div className="relative">
                 <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <select 
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full pl-12 pr-10 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#304B9E] focus:border-[#F05A28] outline-none transition-all shadow-inner appearance-none cursor-pointer"
                 >
                    {MOCK_COURSES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
              </div>
           </div>
           
           <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
              <Zap size={18} className="text-[#F05A28] shrink-0 mt-1" fill="currentColor" />
              <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">
                 Updating this field will re-assign the learner to the selected curriculum hub and update their roadmap view.
              </p>
           </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
           <button onClick={onClose} className="py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
           <button 
             onClick={() => onSave(selectedCourseId)}
             className="py-5 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 border-b-4 border-black/10 transition-all active:scale-95 hover:bg-[#00a651]"
           >
              <Save size={18} strokeWidth={3} /> Update
           </button>
        </div>
      </div>
    </div>
  );
};

const StudentProfilePopup = ({ student, onClose }: { student: Student | any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[85vh]">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-20">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="p-10 flex flex-col md:flex-row gap-8 overflow-y-auto scrollbar-hide">
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative mb-4">
              <img src={`https://picsum.photos/seed/${student.id}/200`} className="w-40 h-40 rounded-[2.5rem] border-4 border-white shadow-2xl object-cover" alt="" />
              <div className="absolute -bottom-2 -right-2 bg-[#F05A28] text-white p-2.5 rounded-2xl shadow-xl rotate-12 border-4 border-white">
                <Trophy size={20} strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter text-center">{student.firstName} {student.lastName}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Learner ID: {student.username}</p>
            <div className="mt-6 w-full flex items-center justify-center gap-3">
              <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[9px] uppercase tracking-widest border border-emerald-100">Active</div>
              <div className="px-4 py-2 bg-indigo-50 text-[#304B9E] rounded-xl font-black text-[9px] uppercase tracking-widest border border-indigo-100">Verified</div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Mastery</p>
                  <p className="text-3xl font-black text-[#F05A28]">{student.finalGrade || 85}%</p>
               </div>
               <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Attendance</p>
                  <p className="text-3xl font-black text-[#304B9E]">{student.attendance || 24}</p>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-2">
                 <History size={14} /> Submission History
               </h4>
               <div className="space-y-2">
                  {[
                    { title: 'Logic Basics Quiz', type: 'quiz', score: '95%', date: 'Yesterday' },
                    { title: 'Hardware Workshop', type: 'assignment', score: 'A-', date: '3 days ago' },
                  ].map((sub, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm group hover:border-[#304B9E] transition-all">
                       <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg text-white ${sub.type === 'quiz' ? 'bg-[#F05A28]' : 'bg-[#304B9E]'}`}>
                             {sub.type === 'quiz' ? <Zap size={12} fill="currentColor" /> : <ClipboardList size={12} />}
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-[#304B9E] uppercase leading-none">{sub.title}</p>
                            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">{sub.date}</p>
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-[#F05A28]">{sub.score}</span>
                    </div>
                  ))}
               </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#F05A28] transition-all border-b-4 border-black/10 active:scale-95"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CenterProfileView: React.FC<CenterProfileViewProps> = ({ activeRole }) => {
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | any | null>(null);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const isAdmin = activeRole === UserRole.MAIN_CENTER || activeRole === UserRole.SUPER_ADMIN;

  const schoolStats = {
    name: 'EDULIGHT SCHOOL',
    id: '7244',
    coursesCount: MOCK_COURSES.length,
    classesCount: MOCK_CLASSES.length,
    activationDate: '02 Feb 2025'
  };

  const handleUpdateStudentCourse = (newCourseId: string) => {
    alert(`Learner ${editingStudent.firstName} successfully migrated to ${MOCK_COURSES.find(c => c.id === newCourseId)?.name}`);
    setEditingStudent(null);
  };

  // Dynamic ID based on role
  const getRoleIdLabel = () => {
    if (activeRole === UserRole.TEACHER) return `Teacher ID: ${MOCK_TEACHER.teacherCode}`;
    if (activeRole === UserRole.SUPER_ADMIN || activeRole === UserRole.SCHOOL_ADMIN) return `Admin ID: ADM-${schoolStats.id}`;
    return `Center ID: HQ-${schoolStats.id}`;
  };

  // Flattened data for ONE TABLE ONLY
  const tableData = useMemo(() => {
    return MOCK_STUDENTS.map(s => {
      const cls = MOCK_CLASSES.find(c => c.students.some(st => st.id === s.id));
      const course = MOCK_COURSES.find(c => c.id === cls?.courseId);
      return {
        ...s,
        courseId: course?.id,
        courseName: course?.name || 'N/A',
        className: cls?.name || 'N/A'
      };
    }).filter(s => 
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.username.includes(searchTerm)
    );
  }, [searchTerm]);

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden animate-in fade-in duration-500">
      
      {selectedStudentForProfile && (
        <StudentProfilePopup 
          student={selectedStudentForProfile} 
          onClose={() => setSelectedStudentForProfile(null)} 
        />
      )}

      {editingStudent && (
        <EditStudentModal 
          student={editingStudent} 
          onClose={() => setEditingStudent(null)} 
          onSave={handleUpdateStudentCourse}
        />
      )}

      {/* Advanced High-Fidelity Top Bar */}
      <div className="w-full bg-[#304B9E] rounded-[2rem] p-6 text-white shadow-2xl border-b-[10px] border-[#F05A28] relative overflow-hidden flex flex-col gap-6 flex-shrink-0 group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none transition-opacity duration-1000 group-hover:opacity-20"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-[#F05A28] rounded-2xl shadow-xl animate-in zoom-in duration-500">
               <Sparkles size={24} fill="white" className="text-white" />
             </div>
             <div>
               <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Welcome back!</h2>
               <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mt-1.5">{getRoleIdLabel()}</p>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 backdrop-blur-md hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/80">Systems Online</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10 border-t border-white/10 pt-6">
           <div className="flex flex-col gap-1 px-2">
              <span className="text-[7px] font-black uppercase text-[#F05A28] tracking-[0.2em] flex items-center gap-1.5">
                 <Building2 size={10} strokeWidth={3} /> School Name
              </span>
              <p className="text-[11px] font-black uppercase tracking-tight truncate">{schoolStats.name}</p>
           </div>
           
           <div className="flex flex-col gap-1 px-2 border-l border-white/5">
              <span className="text-[7px] font-black uppercase text-[#F05A28] tracking-[0.2em] flex items-center gap-1.5">
                 <Hash size={10} strokeWidth={3} /> School ID
              </span>
              <p className="text-[11px] font-black uppercase tracking-tight">{schoolStats.id}</p>
           </div>

           <div className="flex flex-col gap-1 px-2 border-l border-white/5">
              <span className="text-[7px] font-black uppercase text-[#F05A28] tracking-[0.2em] flex items-center gap-1.5">
                 <BookMarked size={10} strokeWidth={3} /> Registered Courses
              </span>
              <p className="text-[11px] font-black uppercase tracking-tight">{schoolStats.coursesCount} Programs</p>
           </div>

           <div className="flex flex-col gap-1 px-2 border-l border-white/5">
              <span className="text-[7px] font-black uppercase text-[#F05A28] tracking-[0.2em] flex items-center gap-1.5">
                 <LayoutGrid size={10} strokeWidth={3} /> Class Lists
              </span>
              <p className="text-[11px] font-black uppercase tracking-tight">{schoolStats.classesCount} Active Hubs</p>
           </div>

           <div className="flex flex-col gap-1 px-2 border-l border-white/5">
              <span className="text-[7px] font-black uppercase text-[#F05A28] tracking-[0.2em] flex items-center gap-1.5">
                 <Calendar size={10} strokeWidth={3} /> Activation Date
              </span>
              <p className="text-[11px] font-black uppercase tracking-tight">{schoolStats.activationDate}</p>
           </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="w-full bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-2.5 flex-shrink-0">
        <div className="flex-1 flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full group focus-within:border-[#F05A28] transition-all">
          <Search size={18} className="text-slate-400 group-focus-within:text-[#304B9E]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search learner directory by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs font-black text-[#304B9E] outline-none w-full placeholder:text-slate-200 uppercase"
          />
        </div>
        {isAdmin && (
           <button 
             className="px-6 py-2.5 bg-[#F05A28] text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl hover:bg-[#304B9E] transition-all active:scale-95 border-b-4 border-black/10 flex items-center gap-2"
           >
              <UserPlus size={14} strokeWidth={3} /> Add Learner
           </button>
        )}
      </div>

      {/* Master Unified Learner Table */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col mb-4">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 shrink-0">
           <h3 className="text-sm font-black text-[#304B9E] uppercase tracking-tighter flex items-center gap-2">
              <Users size={18} strokeWidth={3} className="text-[#F05A28]" /> Master School Roster
           </h3>
        </div>

        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 bg-[#304B9E] text-white uppercase text-[10px] font-black tracking-widest z-20">
              <tr>
                <th className="px-8 py-5">Learner Account</th>
                <th className="px-8 py-5">ID Code</th>
                <th className="px-8 py-5">Course Name</th>
                <th className="px-8 py-5">Class Name</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tableData.length > 0 ? tableData.map((s) => (
                <tr key={s.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden shrink-0">
                           <img src={`https://picsum.photos/seed/${s.id}/64`} className="w-full h-full object-cover" alt="" />
                        </div>
                        <p className="font-black text-sm text-[#304B9E] uppercase tracking-tight leading-none">{s.firstName} {s.lastName}</p>
                      </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-mono text-sm font-black text-[#F05A28] tracking-widest uppercase">
                       {s.username}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-indigo-50 text-[#3b82f6] rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                       {s.courseName}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       {s.className}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => setEditingStudent(s)}
                          className="p-3 bg-slate-50 text-slate-400 rounded-xl shadow-sm hover:bg-[#F05A28] hover:text-white transition-all active:scale-90"
                          title="Edit Learner"
                        >
                           <Edit3 size={18} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => setSelectedStudentForProfile(s)}
                          className="p-3 bg-slate-50 text-slate-400 rounded-xl shadow-sm hover:bg-[#304B9E] hover:text-white transition-all active:scale-90"
                          title="View Profile"
                        >
                           <User size={18} strokeWidth={3} />
                        </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={5} className="py-20 text-center opacity-20">
                      <BookOpen size={60} className="mx-auto text-slate-300 mb-4" />
                      <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-widest">No Learners Recorded</h4>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0 rounded-b-2xl">
         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Global Sync Status: ACTIVE</p>
         <div className="flex items-center gap-2">
            <button className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-300 hover:text-[#304B9E] transition-all"><MoreHorizontal size={14} /></button>
         </div>
      </div>
    </div>
  );
};
