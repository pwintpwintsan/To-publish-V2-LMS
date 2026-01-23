import React, { useState, useMemo } from 'react';
import { MOCK_SCHOOLS, MOCK_COURSES, MOCK_STUDENTS, MOCK_CLASSES } from '../../constants.tsx';
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
  // Added missing Users icon import
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
  ClipboardList
} from 'lucide-react';

interface CenterProfileViewProps {
  activeRole: UserRole;
}

const EXTENDED_MOCK_STUDENTS = [
  ...MOCK_STUDENTS,
  { id: 's3', username: '1000003', firstName: 'Kevin', lastName: 'Aung', status: 'active', attendance: 28, finalGrade: 85, level: 'Digital Creators' },
  { id: 's4', username: '1000004', firstName: 'Su', lastName: 'Su', status: 'active', attendance: 30, finalGrade: 92, level: 'Digital Creators' },
  { id: 's5', username: '1000005', firstName: 'Lin', lastName: 'Htut', status: 'active', attendance: 25, finalGrade: 78, level: 'Robotics Masters' },
  { id: 's6', username: '1000006', firstName: 'May', lastName: 'Thiri', status: 'active', attendance: 29, finalGrade: 88, level: 'Robotics Masters' },
  { id: 's7', username: '1000007', firstName: 'Zin', lastName: 'Ko', status: 'active', attendance: 27, finalGrade: 95, level: 'Robotics Masters' },
  { id: 's8', username: '1000008', firstName: 'Alice', lastName: 'Wong', status: 'active', attendance: 30, finalGrade: 91, level: 'Robotics Masters' },
];

const StudentProfilePopup = ({ student, onClose }: { student: Student | any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[85vh]">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
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
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {student.username}</p>
            <div className="mt-6 w-full flex items-center justify-center gap-3">
              <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[9px] uppercase tracking-widest border border-emerald-100">Active</div>
              <div className="px-4 py-2 bg-indigo-50 text-[#304B9E] rounded-xl font-black text-[9px] uppercase tracking-widest border border-indigo-100">Level 3</div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Final Grade</p>
                  <p className="text-3xl font-black text-[#F05A28]">{student.finalGrade || 85}%</p>
               </div>
               <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Attendance</p>
                  <p className="text-3xl font-black text-[#304B9E]">{student.attendance || 24}</p>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-2">
                 <History size={14} /> Submission Log
               </h4>
               <div className="space-y-2">
                  {[
                    { title: 'Binary Logic Quiz', type: 'quiz', score: '95%', date: 'Yesterday' },
                    { title: 'Hardware Architecture', type: 'assignment', score: 'A-', date: '3 days ago' },
                    { title: 'Introduction Video', type: 'video', score: 'Completed', date: '1 week ago' }
                  ].map((sub, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm group hover:border-[#304B9E] transition-all">
                       <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg text-white ${sub.type === 'quiz' ? 'bg-[#F05A28]' : sub.type === 'assignment' ? 'bg-[#304B9E]' : 'bg-emerald-500'}`}>
                             {sub.type === 'quiz' ? <Zap size={12} fill="currentColor" /> : sub.type === 'assignment' ? <ClipboardList size={12} /> : <MonitorPlay size={12} />}
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

const AddStudentsModal = ({ courseName, onClose }: { courseName: string; onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const filteredStudents = EXTENDED_MOCK_STUDENTS.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.username.includes(searchTerm)
  );

  const handleConfirm = () => {
    if (!selectedStudentId) return;
    const student = EXTENDED_MOCK_STUDENTS.find(s => s.id === selectedStudentId);
    alert(`Successfully added ${student?.firstName} ${student?.lastName} to ${courseName}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[85vh]">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#F05A28] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="text-center mb-8 shrink-0">
           <div className="w-16 h-16 bg-orange-50 text-[#304B9E] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-orange-100 rotate-3">
              <UserPlus size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Enroll Learner</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{courseName}</p>
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
                  onClick={() => setSelectedStudentId(s.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                    selectedStudentId === s.id 
                      ? 'bg-orange-50 border-[#F05A28] shadow-md' 
                      : 'bg-white border-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                       <img src={`https://picsum.photos/seed/${s.id}/64`} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="text-left">
                      <p className={`font-black text-sm uppercase tracking-tight ${selectedStudentId === s.id ? 'text-[#F05A28]' : 'text-[#304B9E]'}`}>{s.firstName} {s.lastName}</p>
                      <p className="text-[10px] font-mono font-bold text-slate-400">ID: {s.username}</p>
                    </div>
                  </div>
                  {selectedStudentId === s.id ? (
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
             disabled={!selectedStudentId}
             className={`py-5 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 border-b-4 border-black/10 transition-all active:scale-95 ${
               selectedStudentId ? 'bg-[#00a651] hover:bg-[#304B9E]' : 'bg-slate-200 cursor-not-allowed'
             }`}
           >
              <CheckCircle2 size={18} strokeWidth={3} /> add class
           </button>
        </div>
      </div>
    </div>
  );
};

const NewClassModal = ({ onClose }: { onClose: () => void }) => {
  const [className, setClassName] = useState('');
  const savedCoursesTemplates = [
    "Starter Level 1", "Starter Level 2", "Starter Level 3", "Starter Level 4",
    "Mover Level 1", "Mover Level 2", "Mover Level 3", "Mover Level 4", "Mover Level 5"
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#F05A28] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-orange-50 text-[#304B9E] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-orange-100 rotate-3">
              <PlusCircle size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Add New Class</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Curriculum Registry</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Layers size={12} className="text-[#F05A28]" /> Choose Template
            </label>
            <div className="relative">
              <select className="w-full bg-slate-50 px-5 py-4 rounded-2xl border-2 border-slate-100 outline-none font-black text-[#304B9E] text-sm uppercase appearance-none focus:border-[#F05A28] transition-all cursor-pointer shadow-inner"
                value={savedCoursesTemplates[0]}
                onChange={() => {}}
              >
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

export const CenterProfileView: React.FC<CenterProfileViewProps> = ({ activeRole }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addStudentsTarget, setAddStudentsTarget] = useState<{ id: string, name: string } | null>(null);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const isAdmin = activeRole === UserRole.MAIN_CENTER || activeRole === UserRole.SUPER_ADMIN;
  const isTeacher = activeRole === UserRole.TEACHER;

  const unifiedCourses = [
    { id: 'st1', displayId: 'ST1001', name: 'Digital Creators Level 1', category: 'Starter', className: 'Junior Coders A' },
    { id: 'st2', displayId: 'ST1002', name: 'Digital Creators Level 2', category: 'Starter', className: 'Junior Coders B' },
    { id: 'st3', displayId: 'ST1003', name: 'Digital Creators Level 3', category: 'Starter', className: 'Advanced Coders' },
    { id: 'mv1', displayId: 'MI1001', name: 'Robotics Masters Level 1', category: 'Mover', className: 'Robot Workshop' },
    { id: 'mv2', displayId: 'MI1002', name: 'Robotics Masters Level 2', category: 'Mover', className: 'Circuit Masters' },
    { id: 'mv3', displayId: 'MI1003', name: 'Robotics Masters Level 3', category: 'Mover', className: 'AI Pioneers' },
  ].filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.displayId.includes(searchTerm.toUpperCase()));

  const tableData = unifiedCourses.flatMap((course, cIdx) => {
    const studentCount = cIdx % 4 === 2 ? 0 : (cIdx % 3) + 1;
    const studentsInThisCourse = EXTENDED_MOCK_STUDENTS.slice(cIdx * 2, cIdx * 2 + studentCount);
    
    if (studentsInThisCourse.length > 0) {
      return studentsInThisCourse.map(student => ({
        ...course,
        studentObj: student,
        studentName: `${student.firstName} ${student.lastName}`,
        studentId: student.username,
        studentUniqueId: `${course.id}-${student.id}`
      }));
    } else {
      return [{
        ...course,
        studentObj: null,
        studentName: null,
        studentId: null,
        studentUniqueId: `${course.id}-empty`
      }];
    }
  });

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      {isModalOpen && <NewClassModal onClose={() => setIsModalOpen(false)} />}
      
      {addStudentsTarget && (
        <AddStudentsModal 
          courseName={addStudentsTarget.name} 
          onClose={() => setAddStudentsTarget(null)} 
        />
      )}

      {selectedStudentForProfile && (
        <StudentProfilePopup 
          student={selectedStudentForProfile} 
          onClose={() => setSelectedStudentForProfile(null)} 
        />
      )}

      {/* Compact Standardized Header - STRICTLY 4 DIGIT ID */}
      <div className="w-full bg-[#304B9E] rounded-xl p-3 md:p-4 text-white shadow-xl border-b-6 border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-3 relative z-10">
           <div className="p-2 bg-[#F05A28] rounded-lg text-white shadow-lg rotate-3">
             <Building2 size={20} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-sm md:text-base font-black leading-none tracking-tight uppercase">School <span className="text-[#F05A28]">ID Number: 7244</span></h2>
           </div>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
            <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                <Tag size={10} className="text-[#F05A28]" strokeWidth={3} />
                <span className="text-[8px] font-black text-white font-mono tracking-widest leading-none">NODE: 0921</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                <Clock size={10} className="text-[#00a651]" strokeWidth={3} />
                <span className="text-[8px] font-black text-white uppercase tracking-tight leading-none">2024-2025 TERM</span>
            </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="w-full bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-2.5 flex-shrink-0">
        <div className="flex-1 flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full group focus-within:border-[#F05A28] transition-all">
          <Search size={18} className="text-slate-400 group-focus-within:text-[#304B9E]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search by ID (e.g. ST1...) or Course Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs font-black text-[#304B9E] outline-none w-full placeholder:text-slate-200 uppercase"
          />
        </div>
        {isAdmin && (
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-6 py-2.5 bg-[#304B9E] text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl hover:bg-[#F05A28] transition-all active:scale-95 border-b-4 border-black/10 flex items-center gap-2"
           >
              <PlusCircle size={14} strokeWidth={3} /> Add Class
           </button>
        )}
      </div>

      {/* Unified Student Table */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col mb-4">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 shrink-0">
           <h3 className="text-sm font-black text-[#304B9E] uppercase tracking-tighter flex items-center gap-2">
              <Users size={18} strokeWidth={3} className="text-[#F05A28]" /> Master Learner Roster
           </h3>
        </div>

        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 bg-[#304B9E] text-white uppercase text-[10px] font-black tracking-widest z-20">
              <tr>
                <th className="px-8 py-5">Student Account</th>
                <th className="px-8 py-5">ID Code</th>
                <th className="px-8 py-5">Course Name</th>
                <th className="px-8 py-5">Class Name</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tableData.length > 0 ? tableData.map((item) => (
                <tr key={item.studentUniqueId} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5">
                    {item.studentName ? (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
                           <img src={`https://picsum.photos/seed/${item.studentObj?.id}/64`} className="w-full h-full object-cover" alt="" />
                        </div>
                        <p className="font-black text-sm text-[#304B9E] uppercase tracking-tight leading-none">{item.studentName}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 opacity-30">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-dashed border-slate-200 flex items-center justify-center">
                           <User size={18} className="text-slate-400" />
                        </div>
                        <p className="font-bold text-sm text-slate-400 uppercase tracking-widest italic">Open Slot</p>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-mono text-sm font-black text-[#F05A28] tracking-widest uppercase">
                       {item.studentId || item.displayId}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-indigo-50 text-[#3b82f6] rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                       {item.name}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest">
                       {item.className}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {item.studentName ? (
                        <button 
                          onClick={() => setSelectedStudentForProfile(item.studentObj)}
                          className="p-3 bg-slate-50 text-slate-400 rounded-xl shadow-sm hover:bg-[#304B9E] hover:text-white transition-all active:scale-90"
                          title="View Profile"
                        >
                           <User size={18} strokeWidth={3} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => !isTeacher && setAddStudentsTarget({ id: item.id, name: item.name })}
                          disabled={isTeacher}
                          className={`p-3 rounded-xl shadow-md border-b-4 border-black/10 transition-all active:scale-90 group/plus ${isTeacher ? 'bg-slate-50 text-slate-200 cursor-not-allowed' : 'bg-[#F05A28] text-white hover:bg-[#304B9E]'}`}
                        >
                           <PlusIcon size={20} strokeWidth={4} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={5} className="py-20 text-center opacity-20">
                      <BookOpen size={60} className="mx-auto text-slate-300 mb-4" />
                      <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-widest">No Records Found</h4>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0 rounded-b-2xl">
         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">School Sync Status: LIVE</p>
         <div className="flex items-center gap-2">
            <button className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-300 hover:text-[#304B9E] transition-all"><MoreHorizontal size={14} /></button>
         </div>
      </div>
    </div>
  );
};
