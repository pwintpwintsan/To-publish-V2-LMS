
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
  Eye,
  X,
  FileCheck,
  Star,
  Sparkles,
  CheckCircle2,
  Save,
  Type,
  FileText,
  Settings
} from 'lucide-react';

interface ProgramSyllabusViewProps {
  courseId: string;
  onBack: () => void;
  onEnroll?: (taskId?: string) => void;
  onEdit?: () => void;
  activeRole?: UserRole;
}

const TaskDetailModal = ({ lesson, onClose }: { lesson: Lesson, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-[#292667]/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-xl max-h-[80vh] shadow-2xl border-t-[6px] border-[#3b82f6] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 text-[#3b82f6] rounded-lg">
               <Eye size={16} strokeWidth={3} />
             </div>
             <div>
               <h2 className="text-sm font-black text-[#292667] uppercase tracking-tighter leading-none">Task Preview</h2>
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Curriculum Resource</p>
             </div>
          </div>
          <button onClick={onClose} className="p-1.5 bg-slate-50 text-slate-300 hover:text-[#ec2027] transition-all rounded-lg">
            <X size={16} strokeWidth={4} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-4">
           <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#292667]">
                 {lesson.type === 'video' ? <MonitorPlay size={24} /> : 
                  lesson.type === 'quiz' ? <Zap size={24} fill="currentColor" /> : 
                  lesson.type === 'assignment' ? <Edit3 size={24} /> : <BookOpen size={24} />}
              </div>
              <div>
                 <span className="text-[8px] font-black text-[#3b82f6] uppercase tracking-widest mb-0.5 block">Type: {lesson.type}</span>
                 <h3 className="text-lg font-black text-[#292667] uppercase tracking-tight leading-none">{lesson.title}</h3>
              </div>
           </div>

           <div className="space-y-2">
              <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Layers size={10} className="text-[#ec2027]" /> Context
              </h4>
              <p className="text-xs text-slate-600 font-bold leading-relaxed uppercase tracking-tight">
                 {lesson.content || lesson.assignmentInstructions || "This curriculum node focuses on core competencies required for foundational mastery."}
              </p>
           </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
           <button 
             onClick={onClose}
             className="w-full py-3 bg-[#292667] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#3b82f6] hover:text-white transition-all active:scale-95"
           >
             Close Preview
           </button>
        </div>
      </div>
    </div>
  );
};

export const ProgramSyllabusView: React.FC<ProgramSyllabusViewProps> = ({ courseId, onBack, onEnroll, onEdit, activeRole }) => {
  const initialCourse = MOCK_COURSES.find(c => c.id === courseId) || MOCK_COURSES[0];
  const [course, setCourse] = useState<Course>(initialCourse);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(course.name);
  const [editedDescription, setEditedDescription] = useState(course.description || '');
  
  const totalTasks = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  const isMainAdmin = activeRole === UserRole.MAIN_CENTER;
  const isAdmin = activeRole === UserRole.MAIN_CENTER;
  const canEnroll = activeRole !== UserRole.TEACHER && activeRole !== UserRole.SUPER_ADMIN && activeRole !== UserRole.MAIN_CENTER;

  const handleSave = () => {
    setCourse({ ...course, name: editedName, description: editedDescription });
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

      {/* 1. HEADER LOGIC: Conditional Banner vs Compact Admin Header */}
      {!isMainAdmin ? (
        <div className="w-full relative group shrink-0">
          <div className="absolute top-4 left-4 z-30 flex gap-2">
            <button 
              onClick={onBack} 
              className="p-2 bg-[#292667]/80 backdrop-blur-md rounded-xl text-white shadow-xl hover:bg-[#ec2027] transition-all active:scale-90 border border-white/20"
            >
              <ChevronLeft size={20} strokeWidth={4} />
            </button>
          </div>

          <div className="w-full h-[180px] md:h-[220px] rounded-[1.5rem] overflow-hidden relative shadow-xl border-b-[6px] border-[#3b82f6]">
            <img 
              src={course.thumbnail} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
              alt="Program Banner" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292667]/30 to-transparent"></div>
          </div>
        </div>
      ) : (
        /* COMPACT HEADER FOR MAIN CENTER ADMIN - Yellow to Red */
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between shrink-0 mb-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack} 
              className="p-2.5 bg-slate-50 text-[#292667] rounded-xl hover:bg-[#ec2027] hover:text-white transition-all active:scale-90 border border-slate-100"
            >
              <ChevronLeft size={20} strokeWidth={4} />
            </button>
            <div>
              <h2 className="text-lg font-black text-[#292667] uppercase tracking-tighter leading-none">Program Syllabus</h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Management View</p>
            </div>
          </div>

          <div className="flex gap-2">
             <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[8px] uppercase tracking-widest shadow-lg transition-all border-b-4 border-black/10 active:scale-95 ${isEditing ? 'bg-[#00a651] text-white hover:bg-[#292667]' : 'bg-[#ec2027] text-white hover:bg-red-700'}`}
              >
                  {isEditing ? <><Save size={14} /> Finish</> : <><Edit3 size={14} /> Rename</>}
              </button>
              
              {onEdit && (
                <button 
                  onClick={onEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-[#292667] text-white rounded-xl font-black text-[8px] uppercase tracking-widest shadow-lg border-b-4 border-black/10 active:scale-95 hover:bg-blue-600"
                >
                  <Settings size={14} /> Architect Mode
                </button>
              )}
          </div>
        </div>
      )}

      {/* 2. TEXTS SECTION - Yellow to Red */}
      <div className="max-w-[1000px] mx-auto w-full px-2">
        <div className={`bg-white rounded-[1.5rem] p-5 md:p-6 shadow-md border border-slate-100 relative overflow-hidden z-20 ${!isMainAdmin ? '-mt-10' : 'mt-0'}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
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

                {isEditing ? (
                  <div className="space-y-2 animate-in slide-in-from-top-1">
                     <div className="space-y-1">
                        <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Rename Program</label>
                        <input 
                          type="text" 
                          className="w-full bg-slate-50 border-2 border-indigo-50 rounded-lg px-3 py-1.5 text-lg font-black text-[#292667] uppercase outline-none focus:border-[#3b82f6] transition-all"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                        <textarea 
                          className="w-full bg-slate-50 border-2 border-indigo-50 rounded-lg px-3 py-1.5 text-[10px] font-bold text-slate-600 uppercase outline-none focus:border-[#3b82f6] transition-all resize-none"
                          rows={2}
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                     </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl md:text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none">
                      {course.name}
                    </h1>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed uppercase tracking-tight max-w-xl">
                      {course.description || "Official U Book Store curriculum module designed for the next generation of digital pioneers."}
                    </p>
                  </>
                )}
              </div>

              {canEnroll && onEnroll && (
                <button 
                  onClick={() => onEnroll()}
                  className="group/enroll px-5 py-2.5 bg-[#ec2027] hover:bg-[#292667] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.1em] shadow-lg transition-all active:scale-95 flex items-center gap-2 border-b-4 border-black/10 shrink-0 self-center md:self-end"
                >
                   <Rocket size={14} strokeWidth={3} className="group-hover/enroll:translate-x-1 group-hover/enroll:-translate-y-1 transition-transform" /> 
                   Join
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#ec2027]" />
                  <span className="text-[9px] font-black text-[#292667] uppercase">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target size={14} className="text-[#00a651]" />
                  <span className="text-[9px] font-black text-[#292667] uppercase">{totalTasks} Quests</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#3b82f6]" />
                  <span className="text-[9px] font-black text-[#292667] uppercase">Global Badge</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ROADMAP SECTION - COMPACTED CARDS */}
      <div className="max-w-[1000px] mx-auto w-full px-2">
        <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-lg flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-red-50 text-[#ec2027] rounded-lg">
                    <Target size={16} strokeWidth={3} />
                </div>
                <h3 className="text-xs font-black text-[#292667] uppercase tracking-widest">Syllabus Matrix</h3>
              </div>
              <div className="px-2 py-0.5 bg-white rounded border border-slate-100">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{course.modules.length} Modules</span>
              </div>
          </div>
          
          <div className="p-5 md:p-6 space-y-8">
              {course.modules.map((mod, mIdx) => (
                <div key={mod.id} className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#292667] text-[#ec2027] flex items-center justify-center font-black text-sm shadow border-b-2 border-black/10">
                            {mIdx + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-[#292667] uppercase tracking-tighter leading-none">{mod.title}</h4>
                          <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{mod.lessons.length} Core Activities</p>
                        </div>
                      </div>
                      {isMainAdmin && onEdit && (
                        <button 
                          onClick={onEdit}
                          className="p-2 bg-slate-50 text-slate-300 hover:text-[#3b82f6] rounded-lg transition-all"
                        >
                          <Edit3 size={14} />
                        </button>
                      )}
                    </div>

                    <div className="ml-4 pl-6 border-l border-dashed border-slate-100 space-y-2">
                      {mod.lessons.map(lesson => (
                          <div 
                            key={lesson.id} 
                            onClick={() => setSelectedLesson(lesson)}
                            className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100 hover:border-[#3b82f6]/40 hover:shadow transition-all group cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-7 h-7 rounded-lg bg-slate-50 shadow-inner flex items-center justify-center group-hover:scale-105 group-hover:bg-[#292667] group-hover:text-white transition-all text-slate-400">
                                  {getTaskIcon(lesson.type)}
                                </div>
                                <div>
                                  <span className="text-xs font-black text-[#292667] uppercase tracking-tight truncate block group-hover:text-[#3b82f6] transition-colors">{lesson.title}</span>
                                  <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest">{lesson.type}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {isMainAdmin && onEdit && (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                                    className="p-1.5 opacity-0 group-hover:opacity-100 bg-blue-50 text-[#3b82f6] rounded-md transition-all hover:bg-blue-600 hover:text-white"
                                  >
                                    <Edit3 size={10} />
                                  </button>
                                )}
                                <ChevronRight size={14} className="text-slate-200 group-hover:text-[#292667] group-hover:translate-x-1 transition-all" strokeWidth={3} />
                            </div>
                          </div>
                      ))}

                      {/* Module Assessment Item - Compacted */}
                      <div 
                        onClick={() => setSelectedLesson({ id: `exam-${mod.id}`, title: `${mod.title} Assessment`, type: 'quiz' })}
                        className="flex items-center justify-between p-3 rounded-xl bg-red-50/20 border border-dashed border-[#ec2027]/20 hover:border-[#ec2027] hover:bg-white transition-all group cursor-pointer mt-4 relative overflow-hidden"
                      >
                          <div className="flex items-center gap-3 min-w-0 relative z-10">
                            <div className="w-8 h-8 rounded-lg bg-white shadow flex items-center justify-center text-[#ec2027] group-hover:rotate-6 transition-all border-b border-black/5">
                                <FileCheck size={16} strokeWidth={3} />
                            </div>
                            <div>
                                <span className="text-xs font-black text-[#ec2027] uppercase tracking-tighter leading-none block">Performance Check</span>
                                <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Automated Assessment</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 relative z-10">
                            {isMainAdmin && onEdit && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                                className="p-1.5 opacity-0 group-hover:opacity-100 bg-red-100 text-[#ec2027] rounded-md transition-all hover:bg-[#ec2027] hover:text-white"
                              >
                                <Edit3 size={10} />
                              </button>
                            )}
                            <div className="hidden sm:block px-1.5 py-0.5 bg-[#ec2027] text-white text-[6px] font-black uppercase rounded shadow-md tracking-widest">
                                FINAL
                            </div>
                            <ArrowRight size={16} className="text-[#ec2027] group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                          </div>
                      </div>
                    </div>
                </div>
              ))}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star size={12} className="text-[#ec2027] fill-current" />
                <span className="text-[7px] font-black text-[#292667] uppercase tracking-widest">Rewards Enabled</span>
              </div>
              <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Payload Rev: 3.2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};
