
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
  Target, 
  ShieldCheck,
  User,
  ListFilter,
  CheckCircle,
  XCircle,
  Award,
  CheckSquare,
  Percent,
  Loader2
} from 'lucide-react';

interface ReportsViewProps {
  activeRole?: UserRole;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ activeRole }) => {
  const [activeTab, setActiveTab] = useState<'class' | 'course'>('class');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);

  const isAdmin = activeRole === UserRole.MAIN_CENTER || activeRole === UserRole.SUPER_ADMIN;

  const isIndividualMode = searchTerm.trim().length > 0 || selectedStudentId !== 'all';

  const getGradeLetter = (grade: number) => {
    if (grade >= 90) return 'A+';
    if (grade >= 80) return 'A';
    if (grade >= 70) return 'B';
    if (grade >= 60) return 'C';
    return 'D';
  };

  const individualData = useMemo(() => {
    let base = MOCK_STUDENTS;
    if (selectedStudentId !== 'all') {
      base = base.filter(s => s.id === selectedStudentId);
    }
    if (searchTerm.trim().length > 0) {
      base = base.filter(s => 
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.username.includes(searchTerm)
      );
    }
    return base;
  }, [searchTerm, selectedStudentId]);

  const classData = useMemo(() => MOCK_CLASSES, []);
  const courseData = useMemo(() => MOCK_COURSES, []);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStudentId('all');
  };

  const handleExport = () => {
    setIsExporting(true);
    // Simulate PDF/Data generation
    setTimeout(() => {
      const reportType = isIndividualMode ? 'Individual' : activeTab.toUpperCase();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `DIR_Report_${reportType}_${timestamp}.txt`;
      
      const content = `DIGITAL INFORMATION RESOURCES - HUB ANALYTICS\nType: ${reportType}\nGenerated: ${new Date().toLocaleString()}\nVerified: ${activeRole}\n--- End of Data ---`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
      alert('Report data exported successfully as PDF/Document stream.');
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      {/* Compact Header */}
      <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#3b82f6] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="flex items-center gap-3 relative z-10">
           <div className="p-2.5 bg-[#3b82f6] rounded-lg text-white shadow-lg rotate-3">
             <BarChart3 size={22} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-lg md:text-xl font-black leading-none tracking-tight uppercase">Hub <span className="text-[#F05A28]">Analytics</span></h2>
             <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1">Data Engine</p>
           </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
           <button 
             onClick={handleExport}
             disabled={isExporting}
             className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-slate-700/30 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all border border-white/10 active:scale-95"
           >
              {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} strokeWidth={3} />}
              {isExporting ? 'Generating...' : 'Export Data'}
           </button>
        </div>
      </div>

      {/* Compact Filter Bar */}
      <div className="w-full bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 flex flex-col lg:flex-row items-center gap-2.5 flex-shrink-0">
        <div className="flex-[2] flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 w-full group focus-within:border-[#3b82f6] transition-all">
          <Search size={18} className="text-slate-400 group-focus-within:text-[#3b82f6]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Learner Name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs font-black text-[#304B9E] outline-none w-full placeholder:text-slate-300 uppercase"
          />
        </div>

        <div className="flex-1 relative w-full lg:w-auto">
          <ListFilter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={3} />
          <select 
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full bg-slate-50 pl-10 pr-8 py-2.5 rounded-xl border border-slate-100 outline-none font-black text-[9px] text-[#304B9E] uppercase appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="all">Select Learner</option>
            {MOCK_STUDENTS.map(s => (
              <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.username})</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {isIndividualMode && (
          <button 
            onClick={clearFilters}
            className="px-4 py-2 text-[9px] font-black uppercase text-[#F05A28] hover:bg-orange-50 rounded-lg transition-colors border-2 border-transparent hover:border-orange-100"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex justify-center flex-shrink-0">
        <div className="flex bg-white p-1 rounded-2xl border-2 border-slate-100 shadow-sm relative z-10 w-fit">
           {[
             { id: 'class', label: 'By Class', icon: LayoutGrid },
             { id: 'course', label: 'By Course', icon: BookOpen }
           ].map(tab => (
             <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); if (!isIndividualMode) clearFilters(); }} 
                className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${!isIndividualMode && activeTab === tab.id ? 'bg-[#304B9E] text-white shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <tab.icon size={14} strokeWidth={3} />
                {tab.label}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden mb-2 flex flex-col">
        <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between shrink-0">
           <h3 className="text-xs font-black text-[#304B9E] uppercase tracking-tighter flex items-center gap-2">
              {isIndividualMode ? (
                <>
                  <div className="p-1.5 bg-orange-50 text-[#F05A28] rounded-md"><User size={14} strokeWidth={3}/></div>
                  Individual Performance
                </>
              ) : activeTab === 'class' ? (
                <>
                  <div className="p-1.5 bg-blue-50 text-[#304B9E] rounded-md"><LayoutGrid size={14} strokeWidth={3}/></div>
                  Class Metrics
                </>
              ) : (
                <>
                  <div className="p-1.5 bg-green-50 text-[#00a651] rounded-md"><BookOpen size={14} strokeWidth={3}/></div>
                  Global Metrics
                </>
              )}
           </h3>
           <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Live Sync</span>
        </div>

        <div className="flex-1 overflow-auto scrollbar-hide">
          {isIndividualMode ? (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#304B9E] text-white text-[9px] font-black uppercase tracking-widest z-20">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Attendance</th>
                  <th className="px-6 py-4">Grade</th>
                  <th className="px-6 py-4">Marks</th>
                  <th className="px-6 py-4 text-right">Mastery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {individualData.length > 0 ? individualData.map(student => {
                  const correctAnswers = Math.round((student.finalGrade / 100) * 50);
                  const incorrectAnswers = 50 - correctAnswers;
                  
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors animate-in slide-in-from-left duration-300">
                      <td className="px-6 py-3 font-mono text-xs font-black text-[#F05A28]">{student.username}</td>
                      <td className="px-6 py-3">
                         <div className="flex items-center gap-3">
                            <img src={`https://picsum.photos/seed/${student.id}/64`} className="w-8 h-8 rounded-lg border-2 border-white shadow-sm object-cover" alt="" />
                            <span className="font-black text-[#304B9E] text-xs uppercase">{student.firstName} {student.lastName}</span>
                         </div>
                      </td>
                      <td className="px-6 py-3 font-black text-[#304B9E] text-xs">{student.attendance} Days</td>
                      <td className="px-6 py-3">
                         <div className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 w-fit">
                            <Award size={12} className="text-[#304B9E]" />
                            <span className="text-xs font-black text-[#304B9E]">{getGradeLetter(student.finalGrade)}</span>
                         </div>
                      </td>
                      <td className="px-6 py-3">
                         <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                               <div className="p-0.5 bg-green-100 rounded text-green-600"><CheckCircle size={10} strokeWidth={3} /></div>
                               <span className="text-[10px] font-black text-green-600">{correctAnswers}</span>
                            </div>
                            <div className="flex items-center gap-1">
                               <div className="p-0.5 bg-red-100 rounded text-red-600"><XCircle size={10} strokeWidth={3} /></div>
                               <span className="text-[10px] font-black text-red-600">{incorrectAnswers}</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-3 text-right">
                         <div className="flex items-center justify-end gap-2">
                            <div className={`w-10 py-1 rounded text-center text-[10px] font-black text-white shadow-sm ${student.finalGrade >= 85 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`}>
                               {student.finalGrade}%
                            </div>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-white">
                               <div className="h-full bg-[#304B9E]" style={{ width: `${student.finalGrade}%` }}></div>
                            </div>
                         </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={6} className="py-20 text-center opacity-30">
                       <Search size={48} className="mx-auto text-slate-300 mb-2" />
                       <h4 className="text-lg font-black text-[#304B9E] uppercase tracking-widest">No results</h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : activeTab === 'class' ? (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#304B9E] text-white text-[9px] font-black uppercase tracking-widest z-20">
                <tr>
                  <th className="px-6 py-4">Node</th>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Mastery</th>
                  <th className="px-6 py-4 text-right">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {classData.map(cls => (
                  <tr key={cls.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 font-black text-[#304B9E] uppercase tracking-tight text-xs">{cls.name}</td>
                    <td className="px-6 py-3 font-black text-[#3b82f6] text-[10px] uppercase tracking-tight">{cls.level}</td>
                    <td className="px-6 py-3">
                       <div className="flex items-center gap-2">
                          <Users size={12} className="text-[#ec2027]" />
                          <span className="font-black text-[#304B9E] text-xs">{cls.students.length} Learners</span>
                       </div>
                    </td>
                    <td className="px-6 py-3">
                       <div className="flex items-center gap-3">
                          <span className="font-black text-xs text-[#304B9E]">{cls.progress}%</span>
                          <div className="flex-1 max-w-[80px] h-2 bg-slate-100 rounded-full overflow-hidden border border-white">
                             <div className="h-full bg-[#00a651]" style={{ width: `${cls.progress}%` }}></div>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-3 font-black text-emerald-600 text-xs">89.4%</td>
                    <td className="px-6 py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-widest">{cls.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#304B9E] text-white text-[9px] font-black uppercase tracking-widest z-20">
                <tr>
                  <th className="px-6 py-4">Program</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Completed</th>
                  <th className="px-6 py-4 text-right">Pass Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {courseData.map((course, idx) => {
                  const totalStudents = 420 + (idx * 15);
                  const completionRate = 0.65 + (idx * 0.05);
                  const completionCount = Math.round(totalStudents * completionRate);
                  const passingRate = (completionRate * 100).toFixed(1);
                  
                  return (
                    <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-black text-[#304B9E] uppercase tracking-tight text-xs">{course.name}</td>
                      <td className="px-6 py-3 font-black text-slate-400 text-xs">{course.duration}</td>
                      <td className="px-6 py-3">
                         <div className="flex items-center gap-2">
                            <Users size={12} className="text-[#3b82f6]" />
                            <span className="font-black text-[#304B9E] text-xs">{totalStudents}</span>
                         </div>
                      </td>
                      <td className="px-6 py-3">
                         <div className="flex items-center gap-2 text-[#304B9E] font-black text-xs">
                            <CheckSquare size={12} className="text-emerald-500" />
                            <span>{completionCount}</span>
                         </div>
                      </td>
                      <td className="px-6 py-3 text-right">
                         <div className="inline-flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                            <Percent size={12} className="text-emerald-600" />
                            <span className="text-[11px] font-black text-emerald-600">{passingRate}%</span>
                         </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                 <Target size={14} className="text-[#00a651]" />
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">KPI: 99.8%</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <ShieldCheck size={14} className="text-[#3b82f6]" />
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified</span>
              </div>
           </div>
           <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">v2.6 Engine</p>
        </div>
      </div>
    </div>
  );
};
