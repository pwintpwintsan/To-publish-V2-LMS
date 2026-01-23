
import React, { useState } from 'react';
import { MOCK_SCHOOLS, MOCK_COURSES, MOCK_STUDENTS, MOCK_CLASSES } from '../../constants.tsx';
import { School, Course, Student } from '../../types.ts';
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
  Plus as PlusIcon,
  Search,
  School as SchoolIcon,
  Tag,
  UserPlus,
  Edit3,
  TrendingUp,
  Users
} from 'lucide-react';

interface CenterDetailViewProps {
  centerId: string;
  onBack: () => void;
  onManageCourse: (courseId: string) => void;
  onPreviewCourse: (courseId: string) => void;
  onViewSyllabus: (courseId: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
}

const EXTENDED_MOCK_STUDENTS = [
  ...MOCK_STUDENTS,
  { id: 's3', username: '1000003', firstName: 'Kevin', lastName: 'Aung', status: 'active' },
  { id: 's4', username: '1000004', firstName: 'Su', lastName: 'Su', status: 'active' },
  { id: 's5', username: '1000005', firstName: 'Lin', lastName: 'Htut', status: 'active' },
];

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
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-[#304B9E]/80 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl border-b-[12px] border-[#00a651] text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner text-[#00a651]">
             <CheckCircle2 size={48} strokeWidth={3} />
          </div>
          <h3 className="text-3xl font-black text-[#304B9E] mb-2 uppercase tracking-tighter">UPGRADE SUCCESS!</h3>
          <p className="text-slate-500 font-bold mb-8 text-sm uppercase tracking-widest">
            You have successfully added <span className="text-[#00a651]">5 new slots</span> to your learner roster.
          </p>
          <button onClick={onClose} className="w-full py-5 px-8 bg-[#304B9E] text-white rounded-2xl font-black text-lg hover:bg-[#00a651] hover:text-white transition-all uppercase tracking-widest shadow-md border-b-4 border-black/10">
            Great!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#304B9E]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-lg w-full shadow-2xl border-b-[12px] border-[#F05A28] text-center animate-in zoom-in-95 duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F05A28]/10 rounded-full -mr-16 -mt-16"></div>
        <div className="w-16 h-16 bg-[#F05A28] rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl text-white">
           <Zap size={30} fill="currentColor" />
        </div>
        <h3 className="text-2xl font-black text-[#304B9E] mb-3 uppercase tracking-tighter">Expand Your Class</h3>
        <p className="text-slate-500 font-bold mb-8 text-sm leading-relaxed uppercase tracking-tight">
          Requesting additional capacity for <span className="text-[#F05A28]">U Book Store</span> hubs. Upgrades are bundled in groups of <span className="text-[#304B9E] font-black">5 students</span>.
        </p>
        
        <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 border-2 border-slate-100 flex items-center justify-between">
           <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Upgrade Bundle</p>
              <h4 className="text-xl font-black text-[#304B9E]">+5 Learner Slots</h4>
           </div>
           <div className="p-3 bg-[#F05A28] rounded-xl text-white font-black shadow-md">
              LVL UP
           </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleUpgrade}
            disabled={isProcessing}
            className="block w-full py-5 px-8 bg-[#304B9E] text-white rounded-2xl font-black text-lg hover:bg-[#F05A28] hover:text-white transition-all uppercase tracking-tighter shadow-md border-b-6 border-black/20 active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Confirm Upgrade (+5 Seats)'}
          </button>
          <button onClick={onClose} className="w-full text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-[#304B9E] transition-all">
            Cancel and Return
          </button>
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
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[85vh]">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#F05A28] transition-all bg-slate-50 rounded-xl">
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

const CourseInventoryList = ({ title, courses, onManage, onPreview }: { title: string, courses: Course[], onManage: (id: string) => void, onPreview: (id: string) => void }) => {
  const isStarter = title.includes('Starter');
  const idPrefix = isStarter ? 'ST' : 'MV';
  const accentColor = isStarter ? '#3b82f6' : '#a855f7';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 px-4">
         <div className="p-2 rounded-xl bg-slate-100 text-slate-400">
            <BookMarked size={20} strokeWidth={3} />
         </div>
         <h3 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter">
            {title} Catalog <span className="text-slate-300 mx-2">•</span> <span style={{ color: accentColor }}>Registered Content</span>
         </h3>
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course, idx) => {
          const displayId = `${idPrefix}${10001 + idx}`;
          const associatedClasses = MOCK_CLASSES.filter(c => c.courseId === course.id);

          return (
            <div 
              key={course.id} 
              className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-slate-50 flex flex-col md:flex-row items-center gap-6 group hover:border-slate-200 transition-all"
            >
              <div className="w-full md:w-48 aspect-square md:aspect-auto md:h-32 rounded-3xl overflow-hidden relative shadow-lg flex-shrink-0">
                 <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                 <div className="absolute inset-0 bg-black/10"></div>
                 <div className="absolute top-3 left-3">
                   <div className="px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg">
                      <span className="font-mono text-[10px] font-black text-[#F05A28] tracking-widest">{displayId}</span>
                   </div>
                 </div>
              </div>

              <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded-md text-[8px] font-black uppercase tracking-widest border border-slate-200">{course.category || "General"}</span>
                    <span className="flex items-center gap-1.5 text-[8px] font-black uppercase text-slate-300 tracking-[0.2em]"><Clock size={10} /> {course.duration || '20 Hours'}</span>
                 </div>
                 <h4 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter group-hover:text-[#F05A28] transition-colors leading-none text-balance">{course.name}</h4>
                 
                 <div className="mt-4 flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 pr-3 border-r border-slate-100 mr-1">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Hub Classes:</span>
                    </div>
                    {associatedClasses.length > 0 ? associatedClasses.map(cls => (
                      <div key={cls.id} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-tight border border-indigo-100 shadow-sm">
                         {cls.name}
                      </div>
                    )) : (
                      <span className="text-[9px] font-bold text-slate-300 italic uppercase">No classes currently assigned</span>
                    )}
                 </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                 <button 
                   onClick={() => onPreview(course.id)}
                   className="px-6 py-3 bg-slate-50 text-[#304B9E] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#304B9E] hover:text-white transition-all shadow-sm border-b-4 border-black/5 active:scale-95"
                 >
                   Preview
                 </button>
                 <button 
                   onClick={() => onManage(course.id)}
                   className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl border-b-4 border-black/5 active:scale-95 group/edit"
                 >
                   <Edit3 size={20} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FlattenedStudentTable = ({ title, courses, onAddStudent }: { title: string, courses: Course[], onAddStudent: (course: Course) => void }) => {
  const isStarter = title.includes('Starter');
  const idPrefix = isStarter ? 'ST' : 'MV';
  
  const flattenedData = courses.flatMap((course, cIdx) => {
    const displayId = `${idPrefix}${10001 + cIdx}`;
    const studentCount = cIdx % 3 === 0 ? 1 : cIdx % 3 === 1 ? 2 : 0;
    const assignedStudents = EXTENDED_MOCK_STUDENTS.slice(cIdx, cIdx + studentCount);

    if (assignedStudents.length > 0) {
      return assignedStudents.map(student => ({
        ...course,
        displayId,
        studentName: `${student.firstName} ${student.lastName}`,
        studentId: student.username,
        uniqueId: `${displayId}-${student.id}`
      }));
    } else {
      return [{
        ...course,
        displayId,
        studentName: null,
        studentId: null,
        uniqueId: `${displayId}-empty`
      }];
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 px-4">
         <div className={`p-2 rounded-xl ${isStarter ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
            <Users size={20} strokeWidth={3} />
         </div>
         <h3 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter">
            {title} Catalog <span className="text-slate-300 mx-2">•</span> <span className={isStarter ? 'text-indigo-500' : 'text-rose-500'}>Learner Roster</span>
         </h3>
      </div>

      <div className="bg-white rounded-[2.5rem] border-2 border-slate-50 shadow-xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#304B9E] text-white text-[10px] font-black uppercase tracking-widest z-20">
              <tr>
                <th className="px-10 py-6">ID Code</th>
                <th className="px-10 py-6">Course Category</th>
                <th className="px-10 py-6 text-right">Student Name (One per line)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {flattenedData.map((row) => (
                <tr key={row.uniqueId} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                       <div className={`w-2.5 h-2.5 rounded-full ${isStarter ? 'bg-indigo-400' : 'bg-rose-400'} shadow-md`}></div>
                       <span className="font-mono text-sm font-black text-[#F05A28] tracking-widest uppercase">{row.displayId}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${isStarter ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                       {row.category || "Standard"}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    {row.studentName ? (
                      <div className="flex items-center justify-end gap-3 animate-in fade-in slide-in-from-right-2 duration-300">
                        <div className="text-right">
                           <p className="font-black text-sm text-[#304B9E] uppercase tracking-tight leading-none">{row.studentName}</p>
                           <p className="text-[9px] font-bold text-slate-400 font-mono mt-1 tracking-widest uppercase">ID: {row.studentId}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#304B9E] border border-slate-100 shadow-sm">
                           <User size={18} strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => onAddStudent(row as unknown as Course)}
                        className="p-3 bg-[#F05A28] text-white rounded-xl shadow-md border-b-4 border-black/10 hover:bg-[#304B9E] hover:text-white transition-all active:scale-90"
                        title="Add Learner to this slot"
                      >
                         <PlusIcon size={20} strokeWidth={4} />
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

export const CenterDetailView: React.FC<CenterDetailViewProps> = ({ centerId, onBack, onManageCourse, onPreviewCourse, onViewSyllabus, checkPermission }) => {
  const [school, setSchool] = useState<School>(MOCK_SCHOOLS.find(s => s.id === centerId) || MOCK_SCHOOLS[0]);
  const [activeTab, setActiveTab] = useState<'students' | 'inventory'>('students');
  const [addStudentsTarget, setAddStudentsTarget] = useState<Course | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [capacity, setCapacity] = useState(school.currentStudentCount + 20);

  const approvedCourses = MOCK_COURSES.filter(c => school.approvedCourseIds?.includes(c.id));
  
  const starterCourses = approvedCourses.filter(c => 
    c.category?.toLowerCase().includes('starter') || c.name.toLowerCase().includes('starter')
  );
  
  const moverCourses = approvedCourses.filter(c => 
    c.category?.toLowerCase().includes('mover') || c.name.toLowerCase().includes('mover') || (!c.category?.toLowerCase().includes('starter') && !c.name.toLowerCase().includes('starter'))
  );

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in slide-in-from-right duration-500">
      
      {addStudentsTarget && (
        <AddStudentsModal 
          courseName={addStudentsTarget.name} 
          onClose={() => setAddStudentsTarget(null)} 
        />
      )}

      {showUpgrade && <UpgradePopup onClose={() => setShowUpgrade(false)} onConfirm={() => setCapacity(prev => prev + 5)} />}

      {/* Header Banner - Reduced Title size and removed Downtown Branch Hub name */}
      <div className="w-full bg-[#304B9E] rounded-[2.5rem] p-4 md:p-6 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex flex-col gap-4 relative z-10">
           <div className="flex items-center gap-6">
              <button onClick={onBack} className="p-3 bg-white/10 rounded-2xl text-white shadow-xl hover:bg-[#F05A28] transition-all group border-2 border-white/10 active:scale-90 flex-shrink-0">
                 <ChevronLeft size={24} strokeWidth={4} />
              </button>
              <div className="flex-1">
                 <h2 className="text-xl font-black uppercase tracking-tighter leading-none mb-3">Hub <span className="text-[#F05A28]">Profile</span></h2>
                 <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm w-full">
                    <div className="flex items-center gap-3 flex-1">
                       <SchoolIcon size={14} className="text-[#F05A28]" strokeWidth={2.5} />
                       <div className="flex flex-col">
                          <span className="text-[7px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">Hub Name</span>
                          <span className="text-[11px] font-black text-white tracking-tight leading-none">{school.name}</span>
                       </div>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-white/10"></div>
                    <div className="flex items-center gap-3 flex-1">
                       <Tag size={14} className="text-[#F05A28]" strokeWidth={2.5} />
                       <div className="flex flex-col">
                          <span className="text-[7px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">Hub Code</span>
                          <span className="text-[11px] font-black text-white font-mono tracking-widest leading-none">{school.id.toUpperCase()}</span>
                       </div>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-white/10"></div>
                    <div className="flex items-center gap-3 flex-1">
                       <Clock size={14} className="text-[#00a651]" strokeWidth={2.5} />
                       <div className="flex flex-col">
                          <span className="text-[7px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">Academic Period</span>
                          <span className="text-[11px] font-black text-white uppercase tracking-tight leading-none">2024 - 2025 Term</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* TWO SWITCHES (Order Request Removed) */}
      <div className="flex justify-center flex-shrink-0 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-100 shadow-xl relative z-10 backdrop-blur-md">
           <button 
             onClick={() => setActiveTab('students')}
             className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 ${activeTab === 'students' ? 'bg-[#304B9E] text-white shadow-xl scale-105' : 'text-slate-400 hover:text-[#304B9E]'}`}
           >
             <Users size={16} strokeWidth={3} />
             Student Lists
           </button>
           <button 
             onClick={() => setActiveTab('inventory')}
             className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 ${activeTab === 'inventory' ? 'bg-[#304B9E] text-white shadow-xl scale-105' : 'text-slate-400 hover:text-[#304B9E]'}`}
           >
             <LayoutGrid size={16} strokeWidth={3} />
             Curriculum Map
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative pb-4">
           {activeTab === 'students' ? (
             <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide gap-12 pb-10">
                <FlattenedStudentTable 
                   title="Starter Course" 
                   courses={starterCourses} 
                   onAddStudent={(course) => setAddStudentsTarget(course)} 
                />
                <FlattenedStudentTable 
                   title="Mover Course" 
                   courses={moverCourses} 
                   onAddStudent={(course) => setAddStudentsTarget(course)} 
                />
             </div>
           ) : (
             <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide gap-12 pb-10">
                <CourseInventoryList 
                   title="Starter Course" 
                   courses={starterCourses} 
                   onManage={onManageCourse}
                   onPreview={onPreviewCourse}
                />
                <CourseInventoryList 
                   title="Mover Course" 
                   courses={moverCourses} 
                   onManage={onManageCourse}
                   onPreview={onPreviewCourse}
                />
             </div>
           )}
      </div>
    </div>
  );
};
