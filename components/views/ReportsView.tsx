
import React, { useState, useMemo } from 'react';
import { MOCK_STUDENTS, MOCK_CLASSES, MOCK_COURSES } from '../../constants.tsx';
import { UserRole, Student, ClassInfo, Course } from '../../types.ts';
import { 
  BarChart3, 
  Users, 
  LayoutGrid, 
  BookOpen, 
  Download, 
  Search, 
  ChevronDown, 
  User,
  TrendingUp,
  FileSpreadsheet,
  Activity,
  X,
  PieChart,
  Loader2,
  Eye,
  CheckCircle2,
  Percent,
  Edit3,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface ReportsViewProps {
  activeRole?: UserRole;
}

type ReportTab = 'class' | 'course' | 'learner';

const ChartModal = ({ isOpen, onClose, data, title }: { isOpen: boolean, onClose: () => void, data: any[], title: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-20">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="p-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#F05A28] rounded-2xl shadow-xl text-white">
              <Activity size={24} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Performance Matrix</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{title}</p>
            </div>
          </div>

          <div className="flex-1 min-h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94a3b8'}} domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', textTransform: 'uppercase', fontSize: '10px', fontWeight: '900'}}
                />
                <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={50}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#304B9E' : '#F05A28'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="px-10 py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#F05A28] transition-all border-b-4 border-black/10 active:scale-95"
            >
              Close Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentsListModal = ({ isOpen, onClose, title, students }: { isOpen: boolean, onClose: () => void, title: string, students: Student[] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[80vh]">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-20">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Roster: {title}</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Individual Performance Data</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <table className="w-full text-left">
            <thead className="bg-[#304B9E] text-white text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-4 py-4 text-center">Completion %</th>
                <th className="px-6 py-4 text-right">Avg Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-black text-[#304B9E] text-[11px] uppercase tracking-tight">{s.firstName} {s.lastName}</td>
                  <td className="px-4 py-4 text-center font-black text-emerald-600 text-[11px]">{s.taskCompletion}%</td>
                  <td className="px-6 py-4 text-right font-black text-[#F05A28] text-[11px]">{s.finalGrade}</td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-slate-300 font-bold uppercase text-[10px]">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const ReportsView: React.FC<ReportsViewProps> = ({ activeRole }) => {
  const [activeTab, setActiveTab] = useState<ReportTab>('class');
  const [learnerSearchTerm, setLearnerSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(MOCK_STUDENTS[0].id);
  const [filterCourseId, setFilterCourseId] = useState('all');
  const [filterClassId, setFilterClassId] = useState('all');
  const [passRateThreshold, setPassRateThreshold] = useState(75);
  const [isExporting, setIsExporting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [selectedContextForRoster, setSelectedContextForRoster] = useState<{title: string, students: Student[]} | null>(null);

  // Editable grades state simulation
  const [learnerGrades, setLearnerGrades] = useState<Record<string, number>>({});

  const learnerDetailedData = useMemo(() => {
    const rawData = [
      { id: 't1', course: 'Robotic course', class: 'Junior Coders A', module: 'Module 1', task: 'Binary Logic Quiz', correct: 18, mistakes: 2, total: 20, grade: 90, schoolGrade: 85 },
      { id: 't2', course: 'Robotic course', class: 'Junior Coders A', module: 'Module 2', task: 'Circuit Diagram', correct: 15, mistakes: 5, total: 20, grade: 75, schoolGrade: 80 },
      { id: 't3', course: 'Robotic course', class: 'Robot Workshop B', module: 'Module 3', task: 'Hardware ID', correct: 24, mistakes: 1, total: 25, grade: 96, schoolGrade: 95 },
      { id: 't4', course: 'Starter course', class: 'Junior Coders A', module: 'Module 1', task: 'Digital Basics', correct: 48, mistakes: 2, total: 50, grade: 96, schoolGrade: 92 },
      { id: 't5', course: 'Starter course', class: 'Junior Coders A', module: 'Module 2', task: 'Internet Safety', correct: 19, mistakes: 1, total: 20, grade: 95, schoolGrade: 88 },
    ];
    
    return rawData.filter(d => {
      const matchesSearch = d.task.toLowerCase().includes(learnerSearchTerm.toLowerCase());
      const matchesCourse = filterCourseId === 'all' || d.course === filterCourseId;
      const matchesClass = filterClassId === 'all' || d.class === filterClassId;
      return matchesSearch && matchesCourse && matchesClass;
    });
  }, [learnerSearchTerm, filterCourseId, filterClassId]);

  const chartData = useMemo(() => {
    if (activeTab === 'learner') {
      return learnerDetailedData.map(d => ({ name: d.task.slice(0, 10), score: d.grade }));
    } else if (activeTab === 'class') {
      return MOCK_CLASSES.map(c => ({ name: c.name, score: c.progress }));
    } else {
      return MOCK_COURSES.map(c => ({ name: c.name.split(' ').slice(0,2).join(' '), score: 85 + Math.random() * 10 }));
    }
  }, [activeTab, learnerDetailedData]);

  const handleGradeChange = (taskId: string, val: string) => {
    const num = parseInt(val) || 0;
    setLearnerGrades(prev => ({ ...prev, [taskId]: Math.min(100, Math.max(0, num)) }));
  };

  const handleApplyFilter = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 600);
  };

  const handleExport = (type: string) => {
    setIsExporting(true);
    setTimeout(() => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `UBook_Report_${type}_${timestamp}.txt`;
      const content = `U BOOK STORE - ANALYTICS\nReport Type: ${type}\nPass Rate Threshold: ${passRateThreshold}%\nExported: ${new Date().toLocaleString()}\n--- End ---`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
      alert(`${type} report exported.`);
    }, 1200);
  };

  const selectedStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId) || MOCK_STUDENTS[0];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      <ChartModal 
        isOpen={isChartOpen} 
        onClose={() => setIsChartOpen(false)} 
        data={chartData} 
        title={activeTab === 'learner' ? `Learner: ${selectedStudent.firstName}` : activeTab === 'class' ? 'Class Matrix' : 'Course Analytics'}
      />

      {selectedContextForRoster && (
        <StudentsListModal 
          isOpen={!!selectedContextForRoster} 
          onClose={() => setSelectedContextForRoster(null)} 
          title={selectedContextForRoster.title}
          students={selectedContextForRoster.students}
        />
      )}

      {/* Header Banner */}
      <div className="w-full bg-[#304B9E] rounded-3xl p-6 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-6 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="p-4 bg-[#F05A28] rounded-2xl shadow-xl rotate-3">
             <BarChart3 size={28} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Student performance</h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-2">Advanced Performance Metrics</p>
           </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
           <div className="flex flex-col items-end mr-4">
              <span className="text-[7px] font-black text-white/40 uppercase tracking-widest mb-1">Set Pass Rate</span>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/20">
                 <Percent size={14} className="text-[#F05A28]" />
                 <input 
                  type="number" 
                  value={passRateThreshold}
                  onChange={(e) => setPassRateThreshold(parseInt(e.target.value) || 0)}
                  className="bg-transparent w-8 text-center font-black text-xs outline-none"
                 />
              </div>
           </div>
           <button 
             onClick={() => setIsChartOpen(true)}
             className="px-8 py-4 bg-white text-[#304B9E] hover:bg-[#F05A28] hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3 active:scale-95 border-b-4 border-black/10"
           >
             <PieChart size={18} strokeWidth={3} />
             Visualization
           </button>
        </div>
      </div>

      {/* Centered Switch Bar */}
      <div className="flex justify-center flex-shrink-0">
        <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-100 shadow-xl relative z-10">
           {[
             { id: 'class', label: 'By Class', icon: LayoutGrid },
             { id: 'course', label: 'By Course', icon: BookOpen },
             { id: 'learner', label: 'By Learner', icon: User }
           ].map(tab => (
             <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ReportTab)} 
                className={`px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 ${activeTab === tab.id ? 'bg-[#304B9E] text-white shadow-xl scale-105' : 'text-slate-400 hover:text-[#304B9E]'}`}
             >
                <tab.icon size={16} strokeWidth={3} />
                {tab.label}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-10">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl flex flex-col overflow-hidden">
          <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
             <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
                <h3 className="text-sm font-black text-[#304B9E] uppercase tracking-tighter flex items-center gap-3 mr-4">
                    <FileSpreadsheet size={22} className="text-[#F05A28]" strokeWidth={3} />
                    {activeTab === 'learner' ? `Learner Data` : activeTab === 'class' ? 'Class Performance Matrix' : 'Course Performance Matrix'}
                </h3>
                
                {activeTab === 'learner' && (
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <select 
                        value={selectedStudentId}
                        onChange={(e) => setSelectedStudentId(e.target.value)}
                        className="bg-white pl-3 pr-8 py-2 rounded-xl border-2 border-slate-100 text-[10px] font-black uppercase text-[#304B9E] outline-none appearance-none cursor-pointer focus:border-[#F05A28] transition-all"
                      >
                          {MOCK_STUDENTS.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                      <select 
                        value={filterCourseId}
                        onChange={(e) => setFilterCourseId(e.target.value)}
                        className="bg-white pl-3 pr-8 py-2 rounded-xl border-2 border-slate-100 text-[10px] font-black uppercase text-[#304B9E] outline-none appearance-none cursor-pointer focus:border-[#F05A28] transition-all"
                      >
                          <option value="all">Filter: All Courses</option>
                          <option value="Robotic course">Robotic course</option>
                          <option value="Starter course">Starter course</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="relative">
                      <select 
                        value={filterClassId}
                        onChange={(e) => setFilterClassId(e.target.value)}
                        className="bg-white pl-3 pr-8 py-2 rounded-xl border-2 border-slate-100 text-[10px] font-black uppercase text-[#304B9E] outline-none appearance-none cursor-pointer focus:border-[#F05A28] transition-all"
                      >
                          <option value="all">Filter: All Classes</option>
                          <option value="Junior Coders A">Junior Coders A</option>
                          <option value="Robot Workshop B">Robot Workshop B</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                )}
             </div>

             <div className="flex items-center gap-4">
                {activeTab === 'learner' && (
                  <>
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F05A28]" size={16} strokeWidth={3} />
                      <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        value={learnerSearchTerm}
                        onChange={(e) => setLearnerSearchTerm(e.target.value)}
                        className="pl-11 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase text-[#304B9E] outline-none focus:border-[#F05A28] transition-all min-w-[200px] shadow-sm placeholder:text-slate-200"
                      />
                    </div>
                    <button 
                      onClick={handleApplyFilter}
                      className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-2 border-slate-100 hover:border-[#304B9E] hover:bg-white text-[#304B9E] rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 group shadow-sm"
                    >
                      {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Filter size={16} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />}
                      Search
                    </button>
                  </>
                )}
                <button 
                  onClick={() => handleExport(activeTab.toUpperCase())}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-8 py-3 bg-[#304B9E] hover:bg-[#F05A28] disabled:bg-slate-300 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 border-b-4 border-black/10 shrink-0"
                >
                  {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} strokeWidth={3} />}
                  {isExporting ? 'Exporting...' : 'Export data'}
                </button>
             </div>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse">
              {activeTab === 'learner' ? (
                <>
                  <thead className="sticky top-0 bg-[#304B9E] text-white text-[10px] font-black uppercase tracking-widest z-10 shadow-md">
                    <tr>
                      <th className="px-6 py-6 whitespace-nowrap">Course</th>
                      <th className="px-6 py-6 whitespace-nowrap">Module / Task</th>
                      <th className="px-4 py-6 text-center whitespace-nowrap">Correct Items</th>
                      <th className="px-4 py-6 text-center whitespace-nowrap">Mistakes</th>
                      <th className="px-4 py-6 text-center whitespace-nowrap">Score</th>
                      <th className="px-4 py-6 text-center whitespace-nowrap">Grade</th>
                      <th className="px-6 py-6 text-right whitespace-nowrap">Grades given by schools<br/><span className="text-[7px] lowercase font-bold opacity-60">(set by teacher)</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {learnerDetailedData.map((row, idx) => {
                      const isPassing = row.grade >= passRateThreshold;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-all group animate-in slide-in-from-left duration-300">
                          <td className="px-6 py-5">
                             <span className="px-3 py-1 bg-indigo-50 text-[#3b82f6] rounded-lg font-black text-[11px] border border-indigo-100 uppercase tracking-tight">
                                {row.course}
                             </span>
                          </td>
                          <td className="px-6 py-5">
                             <div className="flex flex-col">
                                <p className="text-[11px] font-black text-[#304B9E] uppercase leading-none mb-1">{row.module}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest line-clamp-1">{row.task}</p>
                             </div>
                          </td>
                          <td className="px-4 py-5 text-center">
                             <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[11px] border border-emerald-100 shadow-sm">{row.correct}</span>
                          </td>
                          <td className="px-4 py-5 text-center">
                             <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-xl font-black text-[11px] border border-red-100 shadow-sm">{row.mistakes}</span>
                          </td>
                          <td className="px-4 py-5 text-center">
                             <span className="font-mono text-[11px] font-black text-slate-400">{row.total}</span>
                          </td>
                          <td className="px-4 py-5 text-center">
                             <span className={`text-[11px] font-black px-3 py-1 rounded-lg ${isPassing ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                               {row.grade}
                             </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                             <div className="inline-flex items-center gap-2">
                                <Edit3 size={12} className="text-slate-300" />
                                <input 
                                  type="number"
                                  className="w-16 px-2 py-1.5 bg-white border-2 border-slate-100 rounded-lg text-right font-black text-[11px] text-[#304B9E] focus:border-[#F05A28] outline-none transition-all"
                                  value={learnerGrades[row.id] !== undefined ? learnerGrades[row.id] : row.schoolGrade}
                                  onChange={(e) => handleGradeChange(row.id, e.target.value)}
                                />
                             </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </>
              ) : activeTab === 'class' ? (
                <>
                  <thead className="sticky top-0 bg-[#304B9E] text-white text-[10px] font-black uppercase tracking-widest z-10 shadow-md">
                    <tr>
                      <th className="px-8 py-6 whitespace-nowrap">Class Name</th>
                      <th className="px-6 py-6 text-center whitespace-nowrap">Course</th>
                      <th className="px-6 py-6 text-center whitespace-nowrap">Total number of students</th>
                      <th className="px-6 py-6 text-center whitespace-nowrap">Syllabus Progress (%)</th>
                      <th className="px-6 py-6 text-center whitespace-nowrap">Completion (%)</th>
                      <th className="px-8 py-6 text-right whitespace-nowrap">Grades (given by school)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_CLASSES.map((cls) => (
                      <tr key={cls.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-8 py-5 font-black text-[#304B9E] text-[11px] uppercase whitespace-nowrap">{cls.name}</td>
                        <td className="px-6 py-5 text-center">
                           <span className="px-3 py-1 bg-blue-50 text-[#3b82f6] rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">{cls.level}</span>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex items-center justify-center gap-3">
                              <span className="font-black text-[11px] text-[#304B9E]">{cls.students.length}</span>
                              <button 
                                onClick={() => setSelectedContextForRoster({title: cls.name, students: cls.students})}
                                className="p-2 bg-slate-50 text-[#304B9E] rounded-lg shadow-sm border border-slate-100 hover:bg-[#304B9E] hover:text-white transition-all active:scale-90"
                              >
                                <Eye size={14} strokeWidth={3} />
                              </button>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                           <span className="font-black text-[11px] text-[#304B9E]">{cls.progress}%</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="font-black text-[11px] text-indigo-600">{Math.round(cls.progress * 0.9)}%</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <span className="font-black text-[#F05A28] text-[11px]">89</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <>
                  <thead className="sticky top-0 bg-[#304B9E] text-white text-[10px] font-black uppercase tracking-widest z-10 shadow-md">
                    <tr>
                      <th className="px-8 py-6 whitespace-nowrap">Course Name</th>
                      <th className="px-6 py-6 text-center whitespace-nowrap">Class Name</th>
                      <th className="px-6 py-6 text-center whitespace-nowrap">Total Enrollment</th>
                      <th className="px-6 py-6 text-center whitespace-nowrap">Completion Rate</th>
                      <th className="px-8 py-6 text-right whitespace-nowrap">Avg Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_COURSES.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-8 py-5 font-black text-[#304B9E] text-[11px] uppercase whitespace-nowrap">{course.name}</td>
                        <td className="px-6 py-5 text-center">
                           <span className="px-4 py-1.5 bg-orange-50 text-[#F05A28] rounded-xl font-black text-[10px] uppercase border border-orange-100 tracking-widest shadow-sm">{course.category}</span>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex items-center justify-center gap-3">
                              <span className="font-black text-[11px] text-[#304B9E] font-mono">1,240</span>
                              <button 
                                onClick={() => setSelectedContextForRoster({title: course.name, students: MOCK_STUDENTS})}
                                className="p-2 bg-slate-50 text-[#304B9E] rounded-lg shadow-sm border border-slate-100 hover:bg-[#F05A28] hover:text-white transition-all active:scale-90"
                              >
                                <Eye size={14} strokeWidth={3} />
                              </button>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-center font-black text-[11px] text-[#304B9E]">{78}%</td>
                        <td className="px-8 py-5 text-right font-black text-[#F05A28] text-[11px]">91</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
