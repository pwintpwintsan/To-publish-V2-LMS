
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
  Settings2
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

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] shadow-2xl border-t-[10px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-4">
             <div className={`p-3 rounded-xl shadow-md border-b-4 border-black/10 rotate-3 ${
               isQuiz ? 'bg-[#F05A28] text-white' : 
               isVideo ? 'bg-[#304B9E] text-white' : 
               isAssignment ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
             }`}>
               {lesson.type === 'video' ? <MonitorPlay size={24} /> : 
                lesson.type === 'quiz' ? <Zap size={24} fill="currentColor" /> : 
                lesson.type === 'assignment' ? <Edit3 size={24} /> : <BookOpen size={24} />}
             </div>
             <div>
               <span className="text-[8px] font-black text-[#F05A28] uppercase tracking-[0.2em] mb-0.5 block">Course Payload: {lesson.type}</span>
               <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">{lesson.title}</h2>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="shrink-0 p-2.5 bg-white text-slate-300 hover:text-[#ec2027] transition-all rounded-xl shadow-sm border border-slate-100 active:scale-95 group z-50"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={4} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide space-y-8">
           {/* Detailed Quiz View */}
           {isQuiz && (
             <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <ListOrderedIcon size={14} className="text-[#F05A28]" /> Course Assessment
                   </h4>
                   <span className="px-2 py-0.5 bg-orange-50 text-[#F05A28] text-[8px] font-black uppercase rounded border border-orange-100">
                      {lesson.quiz?.length || 1} Question Set
                   </span>
                </div>
                
                <div className="space-y-4">
                  {lesson.quiz && lesson.quiz.length > 0 ? (
                    lesson.quiz.map((q, qIdx) => (
                      <div key={q.id} className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100 shadow-inner">
                         <div className="flex gap-4">
                            <span className="w-10 h-10 rounded-xl bg-[#304B9E] text-white flex items-center justify-center font-black text-lg shadow-lg shrink-0">
                               {qIdx + 1}
                            </span>
                            <div className="flex-1 space-y-4">
                               <h5 className="text-lg font-black text-[#304B9E] uppercase tracking-tight leading-tight pt-1">
                                  {q.question}
                               </h5>
                               <div className="grid grid-cols-1 gap-2">
                                  {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className={`p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all ${
                                      q.correctAnswer === oIdx 
                                        ? 'bg-emerald-50 border-emerald-500/30 text-emerald-700 shadow-sm' 
                                        : 'bg-white border-slate-100 text-slate-400'
                                    }`}>
                                       <span className={`w-6 h-6 rounded flex items-center justify-center font-black text-[10px] ${
                                         q.correctAnswer === oIdx ? 'bg-emerald-500 text-white' : 'bg-slate-100'
                                       }`}>
                                         {String.fromCharCode(65 + oIdx)}
                                       </span>
                                       <span className="font-bold text-xs uppercase tracking-tight">
                                          {opt}
                                       </span>
                                       {q.correctAnswer === oIdx && <Check size={14} strokeWidth={4} className="ml-auto text-emerald-500" />}
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white border-2 border-dashed border-slate-100 p-8 rounded-3xl text-center">
                       <HelpCircleIcon size={32} className="mx-auto text-slate-200 mb-2" />
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Question set not configured.</p>
                    </div>
                  )}
                </div>
             </div>
           )}

           {/* Detailed Video View */}
           {isVideo && (
             <div className="space-y-6">
                <div className="aspect-video w-full bg-slate-900 rounded-[2rem] shadow-2xl flex items-center justify-center relative group overflow-hidden border-4 border-slate-100">
                   <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center z-10 shadow-xl group-hover:scale-110 transition-transform border border-white/20">
                      <Play size={28} className="text-white fill-white ml-1" />
                   </div>
                   <img src={`https://picsum.photos/seed/${lesson.id}/1280/720`} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
                   <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <span className="px-3 py-1 bg-[#F05A28] text-white rounded-lg font-black text-[8px] uppercase tracking-widest shadow-lg">HD STREAM</span>
                      <span className="px-3 py-1 bg-[#304B9E] text-white rounded-lg font-black text-[8px] uppercase tracking-widest shadow-lg">4:20 MINS</span>
                   </div>
                </div>
                <div className="bg-white border-2 border-slate-50 p-6 rounded-3xl">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <FileText size={14} className="text-[#3b82f6]" /> Abstract
                   </h4>
                   <p className="text-xs text-slate-600 font-bold leading-relaxed uppercase tracking-tight">
                      This course video covers the foundational principles of {lesson.title}. Learners are expected to review the content twice before attempting the associated quiz.
                   </p>
                </div>
             </div>
           )}

           {/* Detailed Assignment View */}
           {isAssignment && (
             <div className="space-y-6">
                <div className="p-8 bg-emerald-50 rounded-[2rem] border-2 border-emerald-100 flex flex-col items-center text-center gap-4 relative overflow-hidden">
                   <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-100/50 rounded-full blur-xl"></div>
                   <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg rotate-6 mb-2">
                      <Edit3 size={32} />
                   </div>
                   <h4 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter">Course Workshop</h4>
                   <p className="text-sm font-bold text-emerald-700 max-w-sm uppercase tracking-tight leading-relaxed">
                      {lesson.assignmentInstructions || "Complete the required practical exercises as specified in your student workbook."}
                   </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Max Submissions</p>
                      <p className="text-lg font-black text-[#304B9E]">1 ATTEMPT</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Format Required</p>
                      <p className="text-lg font-black text-[#304B9E]">PDF / JPG</p>
                   </div>
                </div>
             </div>
           )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified Course Component</span>
           </div>
           <button 
             onClick={onClose}
             className="px-8 py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#F05A28] hover:text-white transition-all border-b-4 border-black/10 active:scale-95"
           >
             Close Preview
           </button>
        </div>
      </div>
    </div>
  );
};

const ListOrderedIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
  </svg>
);

const HelpCircleIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

export const ProgramSyllabusView: React.FC<ProgramSyllabusViewProps> = ({ courseId, onBack, onEnroll, onEdit, activeRole }) => {
  const [courses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v3');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const course = courses.find(c => c.id === courseId) || courses[0];
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(course.name);
  const [editedDescription, setEditedDescription] = useState(course.description || '');
  
  const totalTasks = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  const isMainAdmin = activeRole === UserRole.MAIN_CENTER;
  const isStaff = activeRole === UserRole.MAIN_CENTER || activeRole === UserRole.SUPER_ADMIN || activeRole === UserRole.TEACHER;
  const canEnroll = activeRole === UserRole.STUDENT || activeRole === UserRole.EDITOR;

  const handleSave = () => {
    // Logic for saving local state if necessary
    setIsEditing(false);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'video': return <MonitorPlay size={12} className="text-indigo-500" />;
      case 'quiz': return <Zap size={12} className="text-amber-500" fill="currentColor" />;
      case 'assignment': return <Edit3 size={12} className="text-rose-500" />;
      case 'exam': return <FileCheck size={12} className="text-[#ec2027]" />;
      default: return <BookOpen size={12} className="text-emerald-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 overflow-y-auto scrollbar-hide animate-in fade-in duration-500 pb-12">
      {selectedLesson && <TaskDetailModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />}

      {/* HEADER */}
      {!isStaff ? (
        <div className="w-full relative group shrink-0">
          <div className="absolute top-4 left-4 z-30 flex gap-2">
            <button 
              onClick={onBack} 
              className="p-2 bg-[#304B9E]/80 backdrop-blur-md rounded-xl text-white shadow-xl hover:bg-[#F05A28] transition-all active:scale-90 border border-white/20"
            >
              <ChevronLeft size={20} strokeWidth={4} />
            </button>
          </div>

          <div className="w-full h-[180px] md:h-[220px] rounded-[1.5rem] overflow-hidden relative shadow-xl border-b-[6px] border-[#3b82f6]">
            <img 
              src={course.thumbnail} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
              alt="Course Banner" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#304B9E]/30 to-transparent"></div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between shrink-0 mb-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack} 
              className="p-2.5 bg-slate-50 text-[#304B9E] rounded-xl hover:bg-[#F05A28] hover:text-white transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} strokeWidth={4} />
            </button>
            <div>
              <h2 className="text-lg font-black text-[#304B9E] uppercase tracking-tighter leading-none">Course Syllabus</h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Status Overview</p>
            </div>
          </div>

          <div className="flex gap-2">
              {onEdit && (
                <button 
                  onClick={onEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F05A28] text-white rounded-xl font-black text-[8px] uppercase tracking-widest shadow-lg border-b-4 border-black/10 active:scale-95 hover:bg-orange-600"
                >
                  <Settings2 size={14} /> {isMainAdmin ? 'Access Architect' : 'Manage Access'}
                </button>
              )}
          </div>
        </div>
      )}

      {/* INFO SECTION */}
      <div className="max-w-[1000px] mx-auto w-full px-2">
        <div className={`bg-white rounded-[1.5rem] p-5 md:p-6 shadow-md border border-slate-100 relative overflow-hidden z-20 ${!isStaff ? '-mt-10' : 'mt-0'}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="relative z-10 space-y-3">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-indigo-50 text-[#3b82f6] text-[7px] font-black uppercase tracking-widest rounded border border-indigo-100">
                    {course.category}
                  </span>
                  <span className="px-1.5 py-0.5 bg-red-50 text-[#ec2027] text-[7px] font-black uppercase tracking-widest rounded border border-red-100">
                    {course.level}
                  </span>
                </div>

                <h1 className="text-xl md:text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none text-balance">
                  {course.name}
                </h1>
                <p className="text-xs text-slate-500 font-bold leading-relaxed uppercase tracking-tight max-w-xl">
                  {course.description || "Official U Book Store course module."}
                </p>
              </div>

              {canEnroll && onEnroll && (
                <button 
                  onClick={() => onEnroll()}
                  className="group/enroll px-5 py-2.5 bg-[#F05A28] hover:bg-[#304B9E] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.1em] shadow-lg transition-all active:scale-95 flex items-center gap-2 border-b-4 border-black/10 shrink-0 self-center md:self-end"
                >
                   <Rocket size={14} strokeWidth={3} className="group-hover/enroll:translate-x-1 group-hover/enroll:-translate-y-1 transition-transform" /> 
                   Join
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#F05A28]" />
                  <span className="text-[9px] font-black text-[#304B9E] uppercase">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target size={14} className="text-[#00a651]" />
                  <span className="text-[9px] font-black text-[#304B9E] uppercase">{totalTasks} Quests</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROADMAP SECTION */}
      <div className="max-w-[1000px] mx-auto w-full px-2">
        <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-lg flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-50 text-[#F05A28] rounded-lg">
                    <Target size={16} strokeWidth={3} />
                </div>
                <h3 className="text-xs font-black text-[#304B9E] uppercase tracking-widest">Access Roadmap</h3>
              </div>
          </div>
          
          <div className="p-5 md:p-6 space-y-8">
              {course.modules.map((mod, mIdx) => {
                const isModVisible = mod.isPublished !== false;
                
                // If student and mod is off, hide entirely
                if (!isModVisible && !isStaff) return null;

                return (
                  <div key={mod.id} className={`relative ${!isModVisible ? 'opacity-50 grayscale' : ''}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shadow border-b-2 border-black/10 transition-all ${isModVisible ? 'bg-[#304B9E] text-[#F05A28]' : 'bg-slate-300 text-slate-500'}`}>
                              {mIdx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                               <h4 className="text-lg font-black text-[#304B9E] uppercase tracking-tighter leading-none">{mod.title}</h4>
                               {!isModVisible && isStaff && (
                                  <span className="flex items-center gap-1 px-1.5 py-0.5 bg-red-50 text-[#ec2027] rounded text-[6px] font-black uppercase tracking-widest border border-red-100">
                                     <EyeOff size={8} /> Hidden from Students
                                  </span>
                               )}
                            </div>
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{mod.lessons.length} Core Activities</p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4 pl-6 border-l border-dashed border-slate-100 space-y-2">
                        {mod.lessons.map((lesson, lIdx) => {
                            const isTaskVisible = lesson.isPublished !== false;
                            
                            // If student and task is off, hide entirely
                            if (!isTaskVisible && !isStaff) return null;

                            return (
                                <div 
                                  key={lesson.id} 
                                  onClick={() => isTaskVisible || isStaff ? setSelectedLesson(lesson) : null}
                                  className={`flex items-center justify-between p-2 rounded-xl border transition-all group ${
                                    isTaskVisible 
                                      ? 'bg-white border-slate-100 hover:border-[#3b82f6]/40 hover:shadow cursor-pointer' 
                                      : 'bg-slate-50 border-slate-100 opacity-60'
                                  } ${!isTaskVisible && isStaff ? 'cursor-pointer' : ''}`}
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                      <div className={`w-7 h-7 rounded-lg shadow-inner flex items-center justify-center transition-all ${
                                        isTaskVisible 
                                          ? 'bg-slate-50 text-slate-400 group-hover:bg-[#304B9E] group-hover:text-white' 
                                          : 'bg-slate-200 text-slate-400'
                                      }`}>
                                        {getTaskIcon(lesson.type)}
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                           <span className={`text-xs font-black uppercase tracking-tight truncate block transition-colors ${
                                              isTaskVisible ? 'text-[#304B9E] group-hover:text-[#3b82f6]' : 'text-slate-400'
                                           }`}>
                                              Task {lIdx + 1}: {lesson.title}
                                           </span>
                                           {!isTaskVisible && isStaff && <EyeOff size={10} className="text-slate-300" />}
                                        </div>
                                        <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest">{lesson.type}</span>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      {!isTaskVisible && isStaff && (
                                        <span className="text-[6px] font-black uppercase tracking-widest text-[#ec2027] bg-red-50 px-1.5 py-0.5 rounded border border-red-100">OFF</span>
                                      )}
                                      <ChevronRight size={14} className={`transition-all ${isTaskVisible ? 'text-slate-200 group-hover:text-[#304B9E] group-hover:translate-x-1' : 'text-slate-100'}`} strokeWidth={3} />
                                  </div>
                                </div>
                            );
                        })}

                        {/* Module Assessment Item */}
                        <div 
                          onClick={() => setSelectedLesson({ id: `exam-${mod.id}`, title: `${mod.title} Assessment`, type: 'quiz', quiz: mod.lessons.find(l => l.type === 'quiz')?.quiz })}
                          className="flex items-center justify-between p-3 rounded-xl bg-red-50/20 border border-dashed border-[#F05A28]/20 hover:border-[#F05A28] hover:bg-white transition-all group cursor-pointer mt-4 relative overflow-hidden"
                        >
                            <div className="flex items-center gap-3 min-w-0 relative z-10">
                              <div className="w-8 h-8 rounded-lg bg-white shadow flex items-center justify-center text-[#F05A28] group-hover:rotate-6 transition-all border-b border-black/5">
                                  <FileCheck size={16} strokeWidth={3} />
                              </div>
                              <div>
                                  <span className="text-xs font-black text-[#F05A28] uppercase tracking-tighter leading-none block">Performance Check</span>
                                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Automated Assessment</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 relative z-10">
                              <div className="hidden sm:block px-1.5 py-0.5 bg-[#F05A28] text-white text-[6px] font-black uppercase rounded shadow-md tracking-widest">
                                  FINAL
                              </div>
                              <ArrowRight size={16} className="text-[#F05A28] group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                            </div>
                        </div>
                      </div>
                  </div>
                );
              })}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star size={12} className="text-[#F05A28] fill-current" />
                <span className="text-[7px] font-black text-[#304B9E] uppercase tracking-widest">Registry Sync Complete</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
