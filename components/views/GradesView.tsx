
import React, { useState, useMemo } from 'react';
import { MOCK_STUDENTS, MOCK_CLASSES } from '../../constants.tsx';
import { Student } from '../../types.ts';
import { 
  Save, 
  GraduationCap, 
  Target, 
  CheckCircle2, 
  Percent, 
  Download, 
  Search, 
  FileText, 
  Eye, 
  ChevronRight,
  X,
  ClipboardList,
  Video,
  Trophy,
  History,
  ChevronDown,
  Loader2
} from 'lucide-react';

const AnswerDetailModal = ({ student, onClose }: { student: Student, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'quizzes' | 'assignments'>('all');

  const quizResults = [
    { id: 'q1', title: 'Logic Basics 101', score: 95, date: '2024-03-05', status: 'Passed', course: student.level },
    { id: 'q2', title: 'Binary Calculations', score: 88, date: '2024-03-12', status: 'Passed', course: student.level },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#292667]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-t-8 border-[#00a651] relative animate-in zoom-in-95 duration-300 max-h-[85vh] flex flex-col overflow-hidden">
        
        <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100 shrink-0">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-white shadow-md rounded-xl">
            <X size={24} strokeWidth={4} />
          </button>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative shrink-0">
              <img src={`https://picsum.photos/seed/${student.id}/150`} className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg overflow-hidden object-cover" alt="" />
              <div className="absolute -bottom-2 -right-2 bg-[#ec2027] text-white p-1.5 rounded-lg shadow-md rotate-12 border-2 border-white">
                 <Trophy size={14} strokeWidth={3} />
              </div>
            </div>
            <div className="text-center md:text-left flex-1 min-w-0">
              <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none mb-4">{student.firstName} {student.lastName}</h3>
              <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-xl w-fit mx-auto md:mx-0">
                 {[
                   { id: 'all', label: 'History', icon: History },
                   { id: 'quizzes', label: 'Quizzes', icon: Video },
                   { id: 'assignments', label: 'Work', icon: ClipboardList }
                 ].map(tab => (
                   <button 
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as any)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-[#292667] shadow-md' : 'text-slate-500 hover:text-[#292667]'}`}
                   >
                     <tab.icon size={14} /> {tab.label}
                   </button>
                 ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-6 md:p-8 space-y-6">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Video size={14} className="text-indigo-500" /> Recent Quiz Records
           </h4>
           {quizResults.map(quiz => (
             <div key={quiz.id} className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-400 transition-all flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md ${quiz.score >= 80 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`}>
                      {quiz.score}%
                   </div>
                   <div>
                      <p className="font-black text-[#292667] text-sm uppercase leading-none mb-1">{quiz.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{quiz.date}</p>
                   </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
             </div>
           ))}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white shrink-0">
          <button onClick={onClose} className="w-full py-4 bg-[#292667] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#ec2027] transition-all border-b-4 border-black/10 active:scale-95">
             Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export const GradesView: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState(MOCK_CLASSES[0].id);
  const [classPassingRate, setClassPassingRate] = useState(80);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentGrades, setStudentGrades] = useState(MOCK_STUDENTS);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<Student | null>(null);

  const filteredStudents = useMemo(() => {
    return studentGrades.filter(s => {
      const matchesSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || s.username.includes(searchTerm);
      return matchesSearch;
    });
  }, [studentGrades, searchTerm, selectedClassId]);

  const handleGradeChange = (id: string, val: string) => {
    const num = parseInt(val) || 0;
    setStudentGrades(prev => prev.map(s => s.id === id ? { ...s, finalGrade: Math.min(100, Math.max(0, num)) } : s));
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `DIR_Exam_Results_${selectedClassId}_${timestamp}.txt`;
      
      const content = `DIGITAL INFORMATION RESOURCES - EXAM RESULTS\nClass: ${selectedClassId}\nDate: ${new Date().toLocaleDateString()}\n---\nSummary:\nAvg Passing Rate: ${classPassingRate}%\nTotal Candidates: ${filteredStudents.length}\n---\nEnd of Report`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
      alert('Exam results exported successfully as PDF.');
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden animate-in fade-in duration-500">
      {selectedStudentDetail && <AnswerDetailModal student={selectedStudentDetail} onClose={() => setSelectedStudentDetail(null)} />}

      <div className="w-full bg-[#292667] rounded-2xl p-6 text-white shadow-xl border-b-8 border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
           <div className="p-3.5 bg-[#ec2027] rounded-xl text-white shadow-lg rotate-3 border-b-4 border-black/10">
             <GraduationCap size={28} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl font-black leading-none tracking-tight uppercase">Exam <span className="text-[#ec2027]">Results</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Assessment Engine</p>
           </div>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="px-6 py-2.5 bg-white/10 hover:bg-[#ec2027] disabled:bg-slate-700/50 text-white rounded-xl transition-all border border-white/20 active:scale-95 text-[10px] font-black uppercase tracking-widest z-10 flex items-center gap-2"
        >
           {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={18} />}
           {isExporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex flex-col xl:flex-row items-center gap-3 flex-shrink-0">
        <div className="flex flex-1 items-center gap-3 w-full">
          <div className="flex-1 relative">
            <select value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className="w-full bg-slate-50 pl-4 pr-10 py-3 rounded-xl border border-slate-100 outline-none font-black text-[10px] text-[#292667] uppercase appearance-none cursor-pointer">
              {MOCK_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <div className="flex-[2] flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 group focus-within:border-[#00a651] transition-all shadow-inner">
            <Search size={18} className="text-slate-400 group-focus-within:text-[#00a651]" strokeWidth={3} />
            <input type="text" placeholder="Search learners..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent text-sm font-black text-[#292667] outline-none w-full placeholder:text-slate-300 uppercase" />
          </div>
        </div>

        <button 
          onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1500); }} 
          disabled={isSaving}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all active:scale-95 border-b-4 border-black/10 shrink-0 ${isSaving ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white hover:bg-[#292667]'}`}
        >
          {isSaving ? <CheckCircle2 size={16} /> : <Save size={16} />}
          <span>{isSaving ? 'Saved' : 'Save All'}</span>
        </button>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xl flex flex-col mb-2">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
           <h3 className="font-black text-[#292667] text-xs uppercase tracking-tight flex items-center gap-2">
              <FileText size={16} strokeWidth={3} /> Matrix View
           </h3>
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#292667] px-3 py-1.5 rounded-lg text-white">
                 <Percent size={12} className="text-red-500" />
                 <input type="number" value={classPassingRate} onChange={(e) => setClassPassingRate(parseInt(e.target.value) || 0)} className="bg-transparent font-black text-sm w-8 outline-none" />
              </div>
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide divide-y divide-slate-50">
          {filteredStudents.map((student) => {
            const isPassing = student.finalGrade >= classPassingRate;
            return (
              <div key={student.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-all border-l-4 border-transparent hover:border-[#ec2027]">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img src={`https://picsum.photos/seed/${student.id}/150`} className="w-12 h-12 rounded-xl shadow-md border-2 border-white object-cover" alt="" />
                  <div className="min-w-0">
                    <p className="font-black text-[#292667] text-sm uppercase tracking-tight truncate">{student.firstName} {student.lastName}</p>
                    <p className="text-[9px] font-black text-[#ec2027] font-mono tracking-widest opacity-60">ID: {student.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shadow-md border-b-2 border-black/10 ${isPassing ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white'}`}>
                    {isPassing ? 'P' : 'F'}
                  </div>
                  <input type="number" value={student.finalGrade} onChange={(e) => handleGradeChange(student.id, e.target.value)} className="w-12 px-1 py-1 text-center bg-slate-50 border border-slate-200 rounded-lg font-black text-sm text-[#292667] outline-none" />
                  <button onClick={() => setSelectedStudentDetail(student)} className="p-2 bg-[#292667] text-white rounded-lg shadow-md hover:bg-[#00a651] transition-all"><Eye size={16} strokeWidth={3} /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
