
import React, { useState, useMemo } from 'react';
import { MOCK_STUDENTS, MOCK_CLASSES, MOCK_COURSES } from '../../constants.tsx';
import { UserRole } from '../../types.ts';
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
              <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Performance Chart</h3>
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
              Close Visualization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReportsView: React.FC<ReportsViewProps> = ({ activeRole }) => {
  const [activeTab, setActiveTab] = useState<ReportTab>('class');
  const [learnerSearchTerm, setLearnerSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(MOCK_STUDENTS[0].id);
  const [isExporting, setIsExporting] = useState(false);
  const [isChartOpen, setIsChartOpen] = useState(false);

  // Mock task data for a specific learner
  const learnerDetailedData = useMemo(() => {
    const data = [
      { course: 'Robotic course', module: 'Module 1', task: 'Binary Logic Quiz', correct: 18, mistakes: 2, total: 20, grade: 90, schoolGrade: 85 },
      { course: 'Robotic course', module: 'Module 2', task: 'Circuit Diagram', correct: 15, mistakes: 5, total: 20, grade: 75, schoolGrade: 80 },
      { course: 'Robotic course', module: 'Module 3', task: 'Hardware ID', correct: 24, mistakes: 1, total: 25, grade: 96, schoolGrade: 95 },
      { course: 'Starter course', module: 'Module 1', task: 'Digital Basics', correct: 48, mistakes: 2, total: 50, grade: 96, schoolGrade: 92 },
      { course: 'Starter course', module: 'Module 2', task: 'Internet Safety', correct: 19, mistakes: 1, total: 20, grade: 95, schoolGrade: 88 },
    ];
    return data.filter(d => 
      d.task.toLowerCase().includes(learnerSearchTerm.toLowerCase()) ||
      d.module.toLowerCase().includes(learnerSearchTerm.toLowerCase()) ||
      d.course.toLowerCase().includes(learnerSearchTerm.toLowerCase())
    );
  }, [selectedStudentId, learnerSearchTerm]);

  const chartData = useMemo(() => {
    if (activeTab === 'learner') {
      return learnerDetailedData.map(d => ({ name: d.task.slice(0, 10), score: d.grade }));
    } else if (activeTab === 'class') {
      return MOCK_CLASSES.map(c => ({ name: c.name, score: c.progress }));
    } else {
      return MOCK_COURSES.map(c => ({ name: c.name.split(' ').slice(0,2).join(' '), score: 85 + Math.random() * 10 }));
    }
  }, [activeTab, learnerDetailedData]);

  const handleExport = (type: string) => {
    setIsExporting(true);
    setTimeout(() => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `UBook_Report_${type}_${timestamp}.txt`;
      const content = `U BOOK STORE - PERFORMANCE ANALYTICS\nReport Type: ${type}\nExported: ${new Date().toLocaleString()}\nVerified Node: ${activeRole}\n--- End of Data Stream ---`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
      alert(`${type} report exported successfully.`);
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

      {/* Header */}
      <div className="w-full bg-[#304B9E] rounded-3xl p-6 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-6 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
           <div className="p-4 bg-[#F05A28] rounded-2xl shadow-xl rotate-3">
             <BarChart3 size={28} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Hub Analytics</h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-2">Performance Monitoring Engine</p>
           </div>
        </div>

        <div className="relative z-10">
           <button 
             onClick={() => setIsChartOpen(true)}
             className="px-8 py-4 bg-white text-[#304B9E] hover:bg-[#F05A28] hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3 active:scale-95 border-b-4 border-black/10"
           >
             <PieChart size={18} strokeWidth={3} />
             Performance chart
           </button>
        </div>
      </div>

      {/* Center Switch */}
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
        {/* Table Container */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl flex flex-col overflow-hidden">
          <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
             <div className="flex flex-col md:flex-row md:items-center gap-6">
                <h3 className="text-sm font-black text-[#304B9E] uppercase tracking-tighter flex items-center gap-3">
                    <FileSpreadsheet size={22} className="text-[#F05A28]" strokeWidth={3} />
                    {activeTab === 'learner' ? `Learner Data: ${selectedStudent.firstName} ${selectedStudent.lastName}` : activeTab === 'class' ? 'Class Performance Matrix' : 'Course Performance Matrix'}
                </h3>
                {activeTab === 'learner' && (
                  <div className="relative">
                    <select 
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                      className="bg-white pl-4 pr-10 py-2.5 rounded-xl border-2 border-slate-100 text-[10px] font-black uppercase text-[#304B9E] outline-none appearance-none cursor-pointer hover:border-[#F05A28] transition-all shadow-sm"
                    >
                        {MOCK_STUDENTS.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                )}
             </div>

             <div className="flex items-center gap-4">
                {activeTab === 'learner' && (
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F05A28] transition-colors" size={16} strokeWidth={3} />
                    <input 
                      type="text" 
                      placeholder="Filter learner task or course..." 
                      value={learnerSearchTerm}
                      onChange={(e) => setLearnerSearchTerm(e.target.value)}
                      className="pl-11 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase text-[#304B9E] outline-none focus:border-[#F05A28] transition-all min-w-[280px] shadow-sm placeholder:text-slate-200"
                    />
                  </div>
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
            <table className="w-full text-left border-collapse min-w-[1200px]">
              {activeTab === 'learner' ? (
                <>
                  <thead className="sticky top-0 bg-[#304B9E] text-white text-[9px] font-black uppercase tracking-widest z-10 shadow-md">
                    <tr>
                      <th className="px-8 py-6">Course</th>
                      <th className="px-8 py-6">Module / Task Name</th>
                      <th className="px-6 py-6 text-center">Correct Items</th>
                      <th className="px-6 py-6 text-center">Mistakes</th>
                      <th className="px-6 py-6 text-center">Total items sum</th>
                      <th className="px-6 py-6 text-center">Grade</th>
                      <th className="px-8 py-6 text-right">Grades given by schools<br/><span className="text-[7px] lowercase font-bold opacity-60">(data from school)</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {learnerDetailedData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-all group animate-in slide-in-from-left duration-300">
                        <td className="px-8 py-5">
                           <span className="px-3 py-1 bg-indigo-50 text-[#304B9E] rounded-lg font-black text-[9px] border border-indigo-100 uppercase tracking-tight">
                              {row.course}
                           </span>
                        </td>
                        <td className="px-8 py-5">
                           <div className="flex flex-col">
                              <p className="text-[10px] font-black text-[#304B9E] uppercase leading-none mb-1">{row.module}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest line-clamp-1">{row.task}</p>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                           <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[11px] border border-emerald-100 shadow-sm">{row.correct}</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                           <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-xl font-black text-[11px] border border-red-100 shadow-sm">{row.mistakes}</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                           <span className="font-mono text-xs font-black text-slate-400">{row.total}</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                           <span className="text-xl font-black text-[#304B9E]">{row.grade}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-50 text-[#F05A28] rounded-xl font-black text-[11px] border border-orange-100 shadow-sm">
                             {row.schoolGrade}
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : activeTab === 'class' ? (
                <>
                  <thead className="sticky top-0 bg-[#304B9E] text-white text-[9px] font-black uppercase tracking-widest z-10 shadow-md">
                    <tr>
                      <th className="px-8 py-6">Hub Node Name</th>
                      <th className="px-6 py-6 text-center">Level</th>
                      <th className="px-6 py-6 text-center">Cohort Size</th>
                      <th className="px-6 py-6 text-center">Syllabus Progress</th>
                      <th className="px-8 py-6 text-right">Mastery Avg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_CLASSES.map((cls) => (
                      <tr key={cls.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-8 py-5 font-black text-[#304B9E] text-sm uppercase">{cls.name}</td>
                        <td className="px-6 py-5 text-center font-black text-[#3b82f6] text-[10px] uppercase tracking-widest">{cls.level}</td>
                        <td className="px-6 py-5 text-center">
                           <div className="flex items-center justify-center gap-2 font-black text-[#304B9E]">
                              <Users size={14} className="text-[#F05A28]" /> {cls.students.length}
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-4">
                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-white shadow-inner">
                                 <div className="h-full bg-[#00a651]" style={{ width: `${cls.progress}%` }}></div>
                              </div>
                              <span className="font-black text-[10px] text-[#304B9E] min-w-[30px]">{cls.progress}%</span>
                           </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <span className="font-black text-emerald-600 text-xl">89</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <>
                  <thead className="sticky top-0 bg-[#304B9E] text-white text-[9px] font-black uppercase tracking-widest z-10 shadow-md">
                    <tr>
                      <th className="px-8 py-6">Course Name</th>
                      <th className="px-6 py-6 text-center">Class Name</th>
                      <th className="px-6 py-6 text-center">Total Enrollment</th>
                      <th className="px-6 py-6 text-center">Completion Rate</th>
                      <th className="px-8 py-6 text-right">Pass Rate Avg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_COURSES.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-8 py-5 font-black text-[#304B9E] text-sm uppercase">{course.name}</td>
                        <td className="px-6 py-5 text-center">
                           <span className="px-4 py-1.5 bg-orange-50 text-[#F05A28] rounded-xl font-black text-[9px] uppercase border border-orange-100 tracking-widest shadow-sm">{course.category}</span>
                        </td>
                        <td className="px-6 py-5 text-center font-black text-[#304B9E] font-mono">1,240</td>
                        <td className="px-6 py-5 text-center font-black text-[#304B9E]">{78}%</td>
                        <td className="px-8 py-5 text-right font-black text-emerald-600 text-xl">91</td>
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
