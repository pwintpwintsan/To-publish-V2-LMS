import React, { useState } from 'react';
import { MOCK_SCHOOLS, MOCK_COURSES, MOCK_STUDENTS, MOCK_CLASSES } from '../../constants.tsx';
import { School, Course, Student, UserRole } from '../../types.ts';
import { 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2, 
  Check,
  Zap, 
  X, 
  BookMarked,
  LayoutGrid,
  Clock,
  User,
  Plus,
  Search,
  School as SchoolIcon,
  Tag,
  UserPlus,
  Edit3,
  TrendingUp,
  Users,
  Trophy,
  History,
  ClipboardList,
  MonitorPlay,
  Save,
  BookOpen,
  Database,
  Minus,
  Package
} from 'lucide-react';

interface CenterDetailViewProps {
  centerId: string;
  onBack: () => void;
  onManageCourse: (courseId: string) => void;
  onPreviewCourse: (courseId: string) => void;
  onViewSyllabus: (courseId: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
  activeRole?: UserRole;
}

const EXTENDED_MOCK_STUDENTS = [
  ...MOCK_STUDENTS,
  { id: 's3', username: '1000003', firstName: 'Kevin', lastName: 'Aung', status: 'active', attendance: 26, finalGrade: 84 },
  { id: 's4', username: '1000004', firstName: 'Su', lastName: 'Su', status: 'active', attendance: 30, finalGrade: 95 },
  { id: 's5', username: '1000005', firstName: 'Lin', lastName: 'Htut', status: 'active', attendance: 22, finalGrade: 72 },
];

/**
 * Modal to add more IDs and seats (Capacity Expansion)
 */
const AddSeatsModal = ({ onClose, onSave, schoolName }: { onClose: () => void, onSave: (s: number, t: number) => void, schoolName: string }) => {
  const [studentAdd, setStudentAdd] = useState(10);
  const [teacherAdd, setTeacherAdd] = useState(2);

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl border-t-[12px] border-[#F05A28] p-10 flex flex-col gap-8 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="text-center">
           <div className="w-16 h-16 bg-blue-50 text-[#304B9E] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-indigo-100 rotate-3">
              <Database size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Expand Hub Capacity</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Provision Additional Resources for {schoolName}</p>
        </div>

        <div className="space-y-6">
           <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Custom Student IDs</label>
                 <span className="text-[10px] font-black text-[#F05A28] uppercase bg-orange-50 px-2 py-0.5 rounded border border-orange-100">+{studentAdd} Seats</span>
              </div>
              <div className="flex items-center gap-4">
                 <button onClick={() => setStudentAdd(Math.max(1, studentAdd - 5))} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#F05A28] hover:border-[#F05A28] hover:shadow-lg transition-all active:scale-90 shadow-sm"><Minus size={20} strokeWidth={4} /></button>
                 <div className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 text-center shadow-inner">
                    <span className="text-2xl font-black text-[#304B9E]">{studentAdd}</span>
                 </div>
                 <button onClick={() => setStudentAdd(studentAdd + 5)} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#F05A28] hover:border-[#F05A28] hover:shadow-lg transition-all active:scale-90 shadow-sm"><Plus size={20} strokeWidth={4} /></button>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Custom Teacher Seats</label>
                 <span className="text-[10px] font-black text-[#3b82f6] uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">+{teacherAdd} Staff</span>
              </div>
              <div className="flex items-center gap-4">
                 <button onClick={() => setTeacherAdd(Math.max(1, teacherAdd - 1))} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#3b82f6] hover:border-[#3b82f6] hover:shadow-lg transition-all active:scale-90 shadow-sm"><Minus size={20} strokeWidth={4} /></button>
                 <div className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 text-center shadow-inner">
                    <span className="text-2xl font-black text-[#304B9E]">{teacherAdd}</span>
                 </div>
                 <button onClick={() => setTeacherAdd(teacherAdd + 1)} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#3b82f6] hover:border-[#3b82f6] hover:shadow-lg transition-all active:scale-90 shadow-sm"><Plus size={20} strokeWidth={4} /></button>
              </div>
           </div>
        </div>

        <div className="flex gap-4 pt-2">
           <button onClick={onClose} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">Cancel</button>
           <button 
             onClick={() => onSave(studentAdd, teacherAdd)}
             className="flex-[2] py-5 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-6 border-black/10 active:scale-95 flex items-center justify-center gap-2"
           >
              <CheckCircle2 size={18} strokeWidth={3} /> Commit Expansion
           </button>
        </div>
      </div>
    </div>
  );
};

const EditStudentModal = ({ student, onClose, onSave }: { student: any, onClose: () => void, onSave: (courseId: string) => void }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(student.courseId || MOCK_COURSES[0].id);

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-50 shadow-md active:scale-90"
        >
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
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Course</label>
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
                 <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 rotate-90" size={16} />
              </div>
           </div>
           
           <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
              <Zap size={18} className="text-[#F05A28] shrink-0 mt-1" fill="currentColor" />
              <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">
                 Changing the course will reset the learner's progress metrics for the current term within this specific class node.
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
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-50 shadow-md active:scale-90"
        >
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
                 <History size={14} /> Recently Recorded
               </h4>
               <div className="space-y-2">
                  {[
                    { title: 'Module 1 Assessment', type: 'quiz', score: '90%', date: 'Today' },
                    { title: 'Project: Storytelling', type: 'assignment', score: 'B+', date: 'Yesterday' }
                  ].map((sub, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
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
            <button onClick={onClose} className="w-full py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#F05A28] transition-all">Close Profile</button>
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
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#F05A28] transition-all bg-slate-50 rounded-xl z-50 shadow-md active:scale-90"
        >
          <X size={20} strokeWidth={3} />
        </button>
        <div className="text-center mb-8 shrink-0">
           <div className="w-16 h-16 bg-orange-50 text-[#F05A28] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-orange-100 rotate-3">
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
            {filteredStudents.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStudentId(s.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                  selectedStudentId === s.id ? 'bg-orange-50 border-[#F05A28] shadow-md' : 'bg-white border-slate-50 hover:border-slate-200'
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
                {selectedStudentId === s.id && (
                  <div className="w-6 h-6 rounded-full bg-[#F05A28] text-white flex items-center justify-center shadow-lg animate-in zoom-in">
                     <Check size={14} strokeWidth={4} />
                  </div>
                )}
              </button>
            ))}
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
              <CheckCircle2 size={18} strokeWidth={3} /> add to list
           </button>
        </div>
      </div>
    </div>
  );
};

const MasterStudentTable = ({ courses, onAddStudent, onShowProfile, onEditStudent, onAddSeats, isAdmin }: { courses: Course[], onAddStudent: (course: Course) => void, onShowProfile: (student: any) => void, onEditStudent: (student: any) => void, onAddSeats: () => void, isAdmin: boolean }) => {
  const flattenedData = courses.flatMap((course, cIdx) => {
    const studentCount = cIdx % 3 === 0 ? 1 : cIdx % 3 === 1 ? 2 : 0;
    const assignedStudents = EXTENDED_MOCK_STUDENTS.slice(cIdx, cIdx + studentCount);
    const associatedClasses = MOCK_CLASSES.filter(cl => cl.courseId === course.id);
    const className = associatedClasses.length > 0 ? associatedClasses[0].name : "No Class Assigned";

    if (assignedStudents.length > 0) {
      return assignedStudents.map(student => ({
        ...course,
        studentObj: { ...student, courseId: course.id, courseName: course.name },
        className,
        studentName: `${student.firstName} ${student.lastName}`,
        studentId: student.username,
        uniqueId: `${course.id}-${student.id}`
      }));
    } else {
      return [{
        ...course,
        studentObj: null,
        className,
        studentName: null,
        studentId: null,
        uniqueId: `${course.id}-empty`
      }];
    }
  });

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Capacity Management Button Bar */}
      {isAdmin && (
        <div className="w-full bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-end animate-in slide-in-from-top-2 duration-300">
          <button 
            onClick={onAddSeats}
            className="px-8 py-3.5 bg-[#304B9E] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-[#F05A28] transition-all active:scale-95 border-b-4 border-black/10 flex items-center gap-3"
          >
            <Database size={18} strokeWidth={3} />
            Add Seats / IDs
          </button>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border-2 border-slate-50 shadow-xl overflow-hidden flex flex-col">
        <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 shrink-0">
           <h3 className="text-lg font-black text-[#304B9E] uppercase tracking-tighter flex items-center gap-2">
              <Users size={20} className="text-[#F05A28]" strokeWidth={3} /> Master School Roster
           </h3>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 bg-[#304B9E] text-white text-[10px] font-black uppercase tracking-widest z-20">
              <tr>
                <th className="px-10 py-6">Student Account</th>
                <th className="px-10 py-6">ID Code</th>
                <th className="px-10 py-6">Course Name</th>
                <th className="px-10 py-6">Class Name</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {flattenedData.map((row) => (
                <tr key={row.uniqueId} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-10 py-6">
                    {row.studentName ? (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
                           <img src={`https://picsum.photos/seed/${row.studentObj?.id}/64`} className="w-full h-full object-cover" alt="" />
                        </div>
                        <p className="font-black text-sm text-[#304B9E] uppercase tracking-tight leading-none">{row.studentName}</p>
                      </div>
                    ) : (
                      <p className="font-bold text-sm text-slate-300 uppercase tracking-widest italic opacity-60">Available Slot</p>
                    )}
                  </td>
                  <td className="px-10 py-6">
                    <span className="font-mono text-sm font-black text-[#F05A28] tracking-widest uppercase">{row.studentId || "---"}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-100 bg-indigo-50 text-[#304B9E]">
                       {row.name}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.className}</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    {row.studentName ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => onEditStudent(row.studentObj)}
                          className="p-3 bg-white text-slate-300 rounded-xl shadow-sm border border-slate-100 hover:bg-[#F05A28] hover:text-white transition-all active:scale-90"
                          title="Edit Student"
                        >
                          <Edit3 size={18} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => onShowProfile(row.studentObj)}
                          className="p-3 bg-white text-slate-300 rounded-xl shadow-sm border border-slate-100 hover:bg-[#304B9E] hover:text-white transition-all active:scale-90"
                          title="View Profile"
                        >
                          <User size={18} strokeWidth={3} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => onAddStudent(row as unknown as Course)}
                        className="p-3 bg-[#F05A28] text-white rounded-xl shadow-md border-b-4 border-black/10 hover:bg-[#304B9E] hover:text-white transition-all active:scale-90"
                      >
                         <Plus size={20} strokeWidth={4} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const CenterDetailView: React.FC<CenterDetailViewProps> = ({ centerId, onBack, onManageCourse, onPreviewCourse, onViewSyllabus, checkPermission, activeRole }) => {
  const [school, setSchool] = useState<School>(MOCK_SCHOOLS.find(s => s.id === centerId) || MOCK_SCHOOLS[0]);
  const [activeTab, setActiveTab] = useState<'students' | 'inventory'>('students');
  const [addStudentsTarget, setAddStudentsTarget] = useState<Course | null>(null);
  const [selectedProfileStudent, setSelectedProfileStudent] = useState<any | null>(null);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [isAddSeatsModalOpen, setIsAddSeatsModalOpen] = useState(false);

  const approvedCourses = MOCK_COURSES.filter(c => school.approvedCourseIds?.includes(c.id));
  
  const isMainAdmin = activeRole === UserRole.MAIN_CENTER;

  const handleUpdateStudentCourse = (newCourseId: string) => {
    alert(`Learner ${editingStudent.firstName} enrollment updated to ${MOCK_COURSES.find(c => c.id === newCourseId)?.name}`);
    setEditingStudent(null);
  };

  const handleSaveSeats = (students: number, teachers: number) => {
    alert(`Expansion Complete for ${school.name}!\nProvisioned ${students} new student IDs.\nIncreased teacher capacity by ${teachers} nodes.`);
    setIsAddSeatsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in slide-in-from-right duration-500">
      
      {isAddSeatsModalOpen && (
        <AddSeatsModal 
           schoolName={school.name} 
           onClose={() => setIsAddSeatsModalOpen(false)} 
           onSave={handleSaveSeats} 
        />
      )}

      {addStudentsTarget && (
        <AddStudentsModal 
          courseName={addStudentsTarget.name} 
          onClose={() => setAddStudentsTarget(null)} 
        />
      )}

      {selectedProfileStudent && (
        <StudentProfilePopup 
          student={selectedProfileStudent} 
          onClose={() => setSelectedProfileStudent(null)} 
        />
      )}

      {editingStudent && (
        <EditStudentModal 
          student={editingStudent} 
          onClose={() => setEditingStudent(null)} 
          onSave={handleUpdateStudentCourse}
        />
      )}

      {/* FAB quick access for seat management */}
      {isMainAdmin && (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3 group">
           <div className="bg-[#304B9E] text-white px-4 py-2 rounded-2xl shadow-xl font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 border-b-4 border-black/10">
              Browse Hub Seats
           </div>
           <button 
             onClick={() => setIsAddSeatsModalOpen(true)}
             className="w-16 h-16 bg-[#F05A28] text-white rounded-full shadow-[0_20px_50px_-10px_rgba(240,90,40,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-b-8 border-black/20 group animate-bounce"
           >
              <Plus size={32} strokeWidth={4} className="group-hover:rotate-90 transition-transform duration-500" />
           </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="w-full bg-[#304B9E] rounded-[2.5rem] p-4 md:p-6 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <button onClick={onBack} className="p-3 bg-white/10 rounded-2xl text-white shadow-xl hover:bg-[#F05A28] transition-all group border-2 border-white/10 active:scale-90 flex-shrink-0">
              <ChevronLeft size={24} strokeWidth={4} />
           </button>
           <div className="flex-1">
              <h2 className="text-xl font-black uppercase tracking-tighter leading-none mb-3">Hub <span className="text-[#F05A28]">Profile</span></h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm w-full">
                 <div className="flex items-center gap-3 flex-1">
                    <SchoolIcon size={14} className="text-[#F05A28]" strokeWidth={2.5} />
                    <div className="flex flex-col">
                       <span className="text-[7px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">School Name</span>
                       <span className="text-[11px] font-black text-white tracking-tight leading-none">{school.name}</span>
                    </div>
                 </div>
                 <div className="hidden md:block w-px h-8 bg-white/10"></div>
                 <div className="flex items-center gap-3 flex-1">
                    <Tag size={14} className="text-[#F05A28]" strokeWidth={2.5} />
                    <div className="flex flex-col">
                       <span className="text-[7px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">School Code</span>
                       <span className="text-[11px] font-black text-white font-mono tracking-widest leading-none">{school.id}</span>
                    </div>
                 </div>
                 <div className="hidden md:block w-px h-8 bg-white/10"></div>
                 <div className="flex items-center gap-3 flex-1">
                    <Clock size={14} className="text-[#00a651]" strokeWidth={2.5} />
                    <div className="flex flex-col">
                       <span className="text-[7px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">Period</span>
                       <span className="text-[11px] font-black text-white uppercase tracking-tight leading-none">Term 2025</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Switches */}
      <div className="flex justify-center flex-shrink-0">
        <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-100 shadow-xl relative z-10">
           <button 
             onClick={() => setActiveTab('students')}
             className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 ${activeTab === 'students' ? 'bg-[#304B9E] text-white shadow-xl scale-105' : 'text-slate-400 hover:text-[#304B9E]'}`}
           >
             <Users size={16} strokeWidth={3} />
             Learner Roster
           </button>
           <button 
             onClick={() => setActiveTab('inventory')}
             className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 ${activeTab === 'inventory' ? 'bg-[#304B9E] text-white shadow-xl scale-105' : 'text-slate-400 hover:text-[#304B9E]'}`}
           >
             <LayoutGrid size={16} strokeWidth={3} />
             Course Lists
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-8">
           {activeTab === 'students' ? (
              <MasterStudentTable 
                isAdmin={isMainAdmin}
                courses={approvedCourses} 
                onAddStudent={(course) => setAddStudentsTarget(course)} 
                onShowProfile={(student) => setSelectedProfileStudent(student)}
                onEditStudent={(student) => setEditingStudent(student)}
                onAddSeats={() => setIsAddSeatsModalOpen(true)}
              />
           ) : (
              <div className="space-y-6">
                {approvedCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-slate-50 flex flex-col md:flex-row items-center gap-6 group hover:border-slate-200 transition-all">
                     <div className="w-full md:w-48 h-32 rounded-3xl overflow-hidden relative shadow-lg">
                        <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter group-hover:text-[#F05A28] transition-colors">{course.name}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tight line-clamp-1 mt-1">{course.description || "Course syllabus detail."}</p>
                     </div>
                     <div className="flex items-center gap-3 shrink-0">
                        <button onClick={() => onPreviewCourse(course.id)} className="px-6 py-3 bg-slate-50 text-[#304B9E] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#304B9E] hover:text-white transition-all">Preview</button>
                        {isMainAdmin && (
                           <button onClick={() => onManageCourse(course.id)} className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl"><Edit3 size={20} strokeWidth={3} /></button>
                        )}
                     </div>
                  </div>
                ))}
              </div>
           )}
      </div>
    </div>
  );
};