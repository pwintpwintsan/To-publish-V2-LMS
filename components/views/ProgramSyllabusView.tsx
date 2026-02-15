
import React, { useState, useEffect } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { UserRole, Lesson, Module, Course } from '../../types.ts';
import { 
  ChevronLeft, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  Rocket, 
  Clock, 
  Target,
  MonitorPlay,
  Zap,
  Edit3, 
  Layers,
  ChevronRight,
  X,
  FileCheck,
  Star,
  Sparkles,
  CheckCircle2,
  Save,
  Type,
  FileText,
  Settings,
  Check,
  Video,
  Play,
  EyeOff,
  Settings2,
  Link,
  MessageSquareQuote,
  FileSearch,
  ClipboardList
} from 'lucide-react';

interface ProgramSyllabusViewProps {
  courseId: string;
  onBack: () => void;
  onEnroll?: (taskId?: string) => void;
  onEdit?: () => void;
  activeRole?: UserRole;
}

const TaskDetailModal = ({ lesson, onClose }: { lesson: Lesson, onClose: () => void }) => {
  const isQuiz = lesson.type === 'quiz';
  const isVideo = lesson.type === 'video';
  const isAssignment = lesson.type === 'assignment';
  const isMatching = lesson.type === 'matching';
  const isQA = lesson.type === 'question-answer';
  const isPDF = lesson.type === 'pdf';

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] shadow-2xl border-t-[10px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-4">
             <div className={`p-3 rounded-xl shadow-md border-b-4 border-black/10 rotate-3 ${
               isQuiz ? 'bg-amber-500 text-white' : 
               isVideo ? 'bg-indigo-500 text-white' : 
               isAssignment ? 'bg-emerald-500 text-white' : 
               isMatching ? 'bg-teal-500 text-white' :
               isQA ? 'bg-rose-500 text-white' :
               isPDF ? 'bg-cyan-500 text-white' :
               'bg-blue-500 text-white'
             }`}>
               {lesson.type === 'video' ? <MonitorPlay size={24} /> : 
                lesson.type === 'quiz' ? <Zap size={24} fill="currentColor" /> : 
                lesson.type === 'assignment' ? <ClipboardList size={24} /> : 
                lesson.type === 'matching' ? <Link size={24} /> :
                lesson.type === 'question-answer' ? <MessageSquareQuote size={24} /> :
                lesson.type === 'pdf' ? <FileSearch size={24} /> :
                <BookOpen size={24} />}
             </div>
             <div>
               <span className="text-[8px] font-black text-[#F05A28] uppercase tracking-[0.2em] mb-0.5 block">Course Element: {lesson.type}</span>
               <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">{lesson.title}</h2>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="shrink-0 p-2.5 bg-white text-slate-300 hover:text-[#ec2027] transition-all rounded-xl shadow-sm border border-slate-100 active:scale-95 group z-50"
          >
            <X size={20} strokeWidth={4} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide space-y-8">
           {isQuiz && (
             <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Target size={14} className="text-[#F05A28]" /> Module end test Nodes
                   </h4>
                </div>
                <div className="space-y-4">
                  {lesson.quiz && lesson.quiz.length > 0 ? (
                    lesson.quiz.map((q, qIdx) => (
                      <div key={q.id} className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100 shadow-inner">
                         <div className="flex gap-4">
                            <span className="w-10 h-10 rounded-xl bg-[#304B9E] text-white flex items-center justify-center font-black text-lg shadow-lg shrink-0">
                               {qIdx + 1}
                            </span>
                            <div className="flex-1 space-y-4 pt-1">
                               <h5 className="text-lg font-black text-[#304B9E] uppercase tracking-tight leading-tight">{q.question}</h5>
                               <div className="grid grid-cols-1 gap-2">
                                  {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className={`p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all ${q.correctAnswer === oIdx ? 'bg-emerald-50 border-emerald-500/30 text-emerald-700 shadow-sm' : 'bg-white border-slate-100 text-slate-400'}`}>
                                       <span className={`w-6 h-6 rounded flex items-center justify-center font-black text-[10px] ${q.correctAnswer === oIdx ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>{String.fromCharCode(65 + oIdx)}</span>
                                       <span className="font-bold text-xs uppercase tracking-tight">{opt}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </div>
                    ))
                  ) : <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center py-10">Assessment structure pending.</p>}
                </div>
             </div>
           )}

           {isMatching && (
             <div className="space-y-6">
                <div className="flex items-center gap-2 px-2">
                   <Link size={14} className="text-teal-500" />
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic Matching Schema</h4>
                </div>
                <div className="space-y-3">
                   {(lesson.matchingPairs || []).map((pair) => (
                     <div key={pair.id} className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 font-black text-[11px] text-[#304B9E] uppercase tracking-tight">{pair.left}</div>
                        <div className="p-4 bg-white rounded-2xl border-2 border-teal-100 font-black text-[11px] text-[#304B9E] uppercase tracking-tight flex items-center justify-between">
                           {pair.right} <CheckCircle2 size={14} className="text-teal-500" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {isQA && (
             <div className="space-y-6">
                <div className="flex items-center gap-2 px-2">
                   <MessageSquareQuote size={14} className="text-rose-500" />
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Critical Thinking Prompts</h4>
                </div>
                <div className="space-y-4">
                   {(lesson.questions || []).map((q, idx) => (
                     <div key={idx} className="p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100">
                        <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">Inquiry {idx + 1}</p>
                        <p className="text-lg font-black text-[#304B9E] uppercase tracking-tighter leading-tight">{q}</p>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {(isVideo || isPDF || lesson.type === 'text') && (
             <div className="space-y-6">
                <div className="aspect-video w-full bg-slate-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center relative group overflow-hidden border-4 border-slate-100">
                   <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center z-10 shadow-xl border border-white/20">
                      {isPDF ? <FileSearch size={28} className="text-white" /> : <Play size={28} className="text-white fill-white ml-1" />}
                   </div>
                   <img src={`https://picsum.photos/seed/${lesson.id}/1280/720`} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
                </div>
                <div className="bg-white border-2 border-slate-50 p-6 rounded-3xl">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <FileText size={14} className="text-blue-500" /> Content Summary
                   </h4>
                   <p className="text-xs text-slate-600 font-bold leading-relaxed uppercase tracking-tight">
                      {lesson.content || "Review the resource node to proceed to the module assessment."}
                   </p>
                </div>
             </div>
           )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Certified Library Node</span>
           </div>
           <button onClick={onClose} className="px-8 py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#F05A28] transition-all active:scale-95">Close Preview</button>
        </div>
      </div>
    </div>
  );
};

export const ProgramSyllabusView: React.FC<ProgramSyllabusViewProps> = ({ courseId, onBack, onEnroll, onEdit, activeRole }) => {
  const [courses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v3');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const course = courses.find(c => c.id === courseId) || courses[0];
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const isStaff = activeRole === UserRole.MAIN_CENTER || activeRole === UserRole.SUPER_ADMIN || activeRole === UserRole.TEACHER;

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'video': return <MonitorPlay size={12} className="text-indigo-500" />;
      case 'quiz': return <Zap size={12} className="text-amber-500" fill="currentColor" />;
      case 'assignment': return <ClipboardList size={12} className="text-emerald-500" />;
      case 'matching': return <Link size={12} className="text-teal-500" />;
      case 'question-answer': return <MessageSquareQuote size={12} className="text-rose-500" />;
      case 'pdf': return <FileSearch size={12} className="text-cyan-500" />;
      default: return <BookOpen size={12} className="text-blue-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 overflow-y-auto scrollbar-hide animate-in fade-in duration-500 pb-12">
      {selectedLesson && <TaskDetailModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />}

      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between shrink-0 mb-2">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-slate-50 text-[#304B9E] rounded-xl hover:bg-[#F05A28] hover:text-white transition-all active:scale-90 border border-slate-100 flex items-center gap-2 pr-4">
            <ChevronLeft size={20} strokeWidth={4} />
            <span className="text-[10px] font-black uppercase tracking-widest">Back library</span>
          </button>
          <div className="h-8 w-px bg-slate-100 hidden sm:block"></div>
          <div>
            <h2 className="text-lg font-black text-[#304B9E] uppercase tracking-tighter leading-none">Curriculum Roadmap</h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{course.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-2 space-y-6">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
             <span className="px-3 py-1 bg-indigo-50 text-[#304B9E] text-[8px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">{course.category}</span>
             <span className="px-3 py-1 bg-orange-50 text-[#F05A28] text-[8px] font-black uppercase tracking-widest rounded-lg border border-orange-100">{course.level}</span>
          </div>
          <h1 className="text-3xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">{course.name}</h1>
          <p className="text-sm text-slate-500 font-bold leading-relaxed uppercase tracking-tight">{course.description}</p>
        </div>

        {course.modules.map((mod, mIdx) => (
          <div key={mod.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#304B9E] text-white flex items-center justify-center font-black text-lg shadow-lg border-b-4 border-black/10 rotate-3">
                     {mIdx + 1}
                  </div>
                  <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">{mod.title}</h4>
               </div>
            </div>

            <div className="p-8 space-y-10">
               {/* Section 1: Learning Path (Text, Video, PDF) */}
               <div className="space-y-4">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                     <BookOpen size={14} className="text-[#3b82f6]" /> Core Learning Nodes
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {mod.lessons.filter(l => ['text', 'video', 'pdf'].includes(l.type)).map((lesson, lIdx) => (
                       <div key={lesson.id} onClick={() => setSelectedLesson(lesson)} className="p-4 rounded-2xl bg-white border-2 border-slate-50 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#304B9E] group-hover:text-white transition-all flex items-center justify-center shadow-inner">
                                {getTaskIcon(lesson.type)}
                             </div>
                             <span className="text-[10px] font-black text-[#304B9E] uppercase tracking-tight">{lesson.title}</span>
                          </div>
                          <ChevronRight size={14} className="text-slate-200 group-hover:text-[#F05A28] group-hover:translate-x-1 transition-all" />
                       </div>
                     ))}
                  </div>
               </div>

               {/* Section 2: Interactive Tasks (Assignments, Q&A, Matching) */}
               <div className="space-y-4">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                     <Rocket size={14} className="text-[#F05A28]" /> Workshop Activities
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {mod.lessons.filter(l => !['text', 'video', 'pdf', 'quiz'].includes(l.type)).map((lesson, lIdx) => (
                       <div key={lesson.id} onClick={() => setSelectedLesson(lesson)} className="p-4 rounded-2xl bg-white border-2 border-slate-50 hover:border-teal-300 hover:shadow-lg transition-all cursor-pointer group flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#F05A28] group-hover:text-white transition-all flex items-center justify-center shadow-inner">
                                {getTaskIcon(lesson.type)}
                             </div>
                             <span className="text-[10px] font-black text-[#304B9E] uppercase tracking-tight">{lesson.title}</span>
                          </div>
                          <ChevronRight size={14} className="text-slate-200 group-hover:text-[#F05A28] group-hover:translate-x-1 transition-all" />
                       </div>
                     ))}
                  </div>
               </div>

               {/* Section 3: Final Module Assessment */}
               <div className="pt-6 border-t-2 border-dashed border-slate-100">
                  {mod.lessons.find(l => l.type === 'quiz') ? (
                    <div onClick={() => setSelectedLesson(mod.lessons.find(l => l.type === 'quiz')!)} className="p-6 bg-orange-50/30 rounded-[2rem] border-2 border-orange-200 hover:bg-[#F05A28] hover:border-[#F05A28] group transition-all cursor-pointer flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#F05A28] group-hover:rotate-12 transition-transform">
                             <FileCheck size={28} strokeWidth={3} />
                          </div>
                          <div>
                             <h5 className="text-xl font-black text-[#304B9E] group-hover:text-white uppercase tracking-tighter leading-none mb-1.5">Module end test</h5>
                             <p className="text-[9px] font-black text-slate-400 group-hover:text-white/60 uppercase tracking-widest">End-of-unit verified assessment</p>
                          </div>
                       </div>
                       <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-[#F05A28]">
                          <ArrowRight size={20} strokeWidth={4} className="group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center opacity-40">
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">No final assessment configured for this unit</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
