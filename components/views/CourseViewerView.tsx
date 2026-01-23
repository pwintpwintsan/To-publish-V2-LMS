
import React, { useState } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Course, Module, Lesson } from '../../types.ts';
import { 
  ChevronLeft, 
  Video, 
  HelpCircle, 
  ClipboardList, 
  Type, 
  Play, 
  CheckCircle2, 
  Lock, 
  Star, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Target, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Zap, 
  Globe, 
  MonitorPlay, 
  Edit3, 
  FileText, 
  X, 
  Trophy, 
  ArrowRight 
} from 'lucide-react';

interface CourseViewerViewProps {
  courseId: string;
  onBack: () => void;
}

export const CourseViewerView: React.FC<CourseViewerViewProps> = ({ courseId, onBack }) => {
  const course = MOCK_COURSES.find(c => c.id === courseId) || MOCK_COURSES[0];
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizSelection, setQuizSelection] = useState<number | null>(null);

  const getLessonIcon = (type: Lesson['type'], size = 14) => {
    switch (type) {
      case 'video': return <MonitorPlay size={size} strokeWidth={2.5} />;
      case 'quiz': return <Zap size={size} strokeWidth={2.5} fill="currentColor" />;
      case 'assignment': return <Edit3 size={size} strokeWidth={2.5} />;
      case 'text': return <BookOpen size={size} strokeWidth={2.5} />;
      default: return <Play size={size} strokeWidth={2.5} />;
    }
  };

  const getLessonColor = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return 'bg-indigo-500 shadow-indigo-200';
      case 'quiz': return 'bg-red-500 shadow-red-200';
      case 'assignment': return 'bg-rose-500 shadow-rose-200';
      case 'text': return 'bg-emerald-500 shadow-emerald-200';
      default: return 'bg-slate-500 shadow-slate-200';
    }
  };

  const handleFileUpload = () => {
    setIsSubmitted(true);
  };

  const handleQuizSubmit = () => {
    if (quizSelection !== null) {
      setIsSubmitted(true);
    }
  };

  const optionColors = [
    { bg: 'bg-indigo-50', text: 'text-indigo-600', active: 'bg-indigo-600', ring: 'ring-indigo-100', border: 'border-indigo-100' },
    { bg: 'bg-red-50', text: 'text-red-600', active: 'bg-red-600', ring: 'ring-red-100', border: 'border-red-100' },
    { bg: 'bg-rose-50', text: 'text-rose-600', active: 'bg-rose-600', ring: 'ring-rose-100', border: 'border-rose-100' },
    { bg: 'bg-emerald-50', text: 'text-emerald-600', active: 'bg-emerald-600', ring: 'ring-emerald-100', border: 'border-emerald-100' },
    { bg: 'bg-violet-50', text: 'text-violet-600', active: 'bg-violet-600', ring: 'ring-violet-100', border: 'border-violet-100' },
  ];

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in slide-in-from-right duration-500">
      <div className="w-full bg-[#292667] rounded-2xl p-4 text-white shadow-lg border-b-6 border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-3 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-3 relative z-10">
           <button onClick={onBack} className="p-2 bg-white/10 rounded-lg text-white shadow-md hover:bg-[#ec2027] transition-all border border-white/20 active:scale-90">
             <ChevronLeft size={22} strokeWidth={4} />
           </button>
           <div>
             <h2 className="text-lg md:text-xl font-black leading-none tracking-tight uppercase">{course.name}</h2>
             <div className="flex items-center gap-2 mt-1">
                <span className="px-1.5 py-0.5 bg-[#00a651] rounded-[4px] text-[7px] font-black uppercase tracking-widest text-white shadow-sm">U LEARNER</span>
                <span className="text-[8px] font-black text-[#ec2027] uppercase tracking-widest opacity-80">{course.category}</span>
             </div>
           </div>
        </div>
        <div className="flex items-center gap-6 px-4 md:border-l-2 border-white/10 relative z-10">
           <div className="text-center">
              <p className="text-xl font-black text-[#ec2027]">65%</p>
              <p className="text-[7px] font-black uppercase text-white/40 tracking-widest mt-0.5">Journey Done</p>
           </div>
           <div className="text-center">
              <p className="text-xl font-black text-[#00a651]">2/3</p>
              <p className="text-[7px] font-black uppercase text-white/40 tracking-widest mt-0.5">Stage Rank</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden pb-1">
        <div className="lg:col-span-3 flex flex-col gap-3 overflow-hidden">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-md flex flex-col overflow-hidden">
            <h3 className="text-[8px] font-black text-[#292667] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Target size={14} className="text-[#ec2027]" /> Quest Log
            </h3>
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pr-1">
              {course.modules.map((mod, modIdx) => (
                <div key={mod.id} className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#292667] text-[#ec2027] flex items-center justify-center font-black text-[9px] shadow-sm border-b-2 border-black/10 flex-shrink-0">{modIdx + 1}</div>
                    <h4 className="font-black text-[#292667] text-[8px] uppercase tracking-tight truncate leading-none">{mod.title}</h4>
                  </div>
                  <div className="ml-3 pl-3 border-l border-dashed border-slate-100 space-y-1.5 pb-2">
                    {mod.lessons.map((lesson) => (
                      <div 
                        key={lesson.id}
                        onClick={() => { setActiveLesson(lesson); setIsSubmitted(false); setQuizSelection(null); }}
                        className={`group p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-2.5 ${activeLesson?.id === lesson.id ? 'bg-[#292667] border-[#292667] text-white shadow-md scale-[1.02]' : 'bg-slate-50 border-transparent hover:border-[#00a651] hover:bg-white'}`}
                      >
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shadow-sm transition-all flex-shrink-0 ${activeLesson?.id === lesson.id ? 'bg-white text-[#292667]' : `${getLessonColor(lesson.type)} text-white`}`}>
                          {getLessonIcon(lesson.type, 10)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`font-black text-[8px] uppercase tracking-tight truncate ${activeLesson?.id === lesson.id ? 'text-white' : 'text-[#292667]'}`}>{lesson.title}</p>
                          <p className={`text-[6px] font-bold uppercase tracking-widest mt-0.5 ${activeLesson?.id === lesson.id ? 'text-[#ec2027]' : 'text-slate-300'}`}>{lesson.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 bg-white rounded-[2rem] border border-slate-50 shadow-xl overflow-hidden flex flex-col">
          {activeLesson ? (
            <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-300">
               <div className="p-6 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-xl text-white shadow-md border-b-4 border-black/10 rotate-3 ${getLessonColor(activeLesson.type)}`}>
                        {getLessonIcon(activeLesson.type, 20)}
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight leading-none mb-1">{activeLesson.title}</h3>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Clock size={10} className="text-[#3b82f6]" /> Curriculum Task • {activeLesson.type.toUpperCase()}
                        </p>
                     </div>
                  </div>
                  {isSubmitted && (
                     <div className="px-3 py-1.5 bg-green-50 text-[#00a651] rounded-lg font-black text-[7px] uppercase tracking-widest border border-[#00a651]/20 flex items-center gap-1.5 animate-in zoom-in">
                        <CheckCircle2 size={12} /> Submission Logged
                     </div>
                  )}
               </div>

               <div className="flex-1 overflow-y-auto scrollbar-hide p-6 relative">
                  {activeLesson.type === 'video' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4">
                       <div className="aspect-video w-full bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center relative group cursor-pointer overflow-hidden border-4 border-slate-50 ring-1 ring-slate-100">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center z-10 shadow-xl group-hover:scale-110 transition-transform ring-2 ring-white/10">
                             <Play size={28} className="text-white fill-white ml-1.5" />
                          </div>
                          <img src={`https://picsum.photos/seed/${activeLesson.id}/1280/720`} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="" />
                          <div className="absolute bottom-4 left-4 z-10">
                             <span className="px-3 py-1 bg-[#ec2027] text-white rounded-lg font-black text-[8px] uppercase tracking-widest shadow-md">Premium 4K Stream</span>
                          </div>
                       </div>
                       <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                          <h4 className="text-base font-black text-[#292667] uppercase mb-2 tracking-tight flex items-center gap-2">
                             <ShieldCheck size={16} className="text-[#3b82f6]" /> Lesson Summary
                          </h4>
                          <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">Review the material carefully. Your understanding of these concepts will be marked during the periodic hub reviews.</p>
                       </div>
                    </div>
                  )}

                  {activeLesson.type === 'quiz' && (
                    <div className="max-w-3xl mx-auto space-y-8 py-6">
                       {!isSubmitted ? (
                         <>
                           <div className="text-center space-y-2">
                              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-100 border-b-2 border-black/10 rotate-3">
                                 <Zap size={32} fill="currentColor" />
                              </div>
                              <h4 className="text-2xl font-black text-[#292667] uppercase tracking-tighter">Quest Log Selection</h4>
                              <p className="text-[9px] font-black text-red-600 uppercase tracking-widest">Select your answer and submit it for review</p>
                           </div>

                           <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-xl relative overflow-hidden">
                              <p className="text-lg font-black text-[#292667] mb-8 text-center leading-tight">"Which of the following describes the correct logic state for an 'AND' gate with both inputs set to ON?"</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {['State is OFF', 'State is ON', 'State is UNDEFINED', 'State is INVERTED'].map((opt, i) => {
                                   const color = optionColors[i % optionColors.length];
                                   const isSelected = quizSelection === i;
                                   return (
                                     <button 
                                       key={i} 
                                       onClick={() => setQuizSelection(i)}
                                       className={`group relative p-4 rounded-xl text-left transition-all duration-300 border flex items-center gap-4 overflow-hidden ${isSelected ? `${color.active} text-white shadow-lg scale-[1.02] border-transparent ring-4 ${color.ring}` : `bg-white border-slate-100 hover:border-${color.active.split('-')[1]}-300 text-[#292667]`}`}
                                     >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shadow-md transition-all duration-500 flex-shrink-0 group-hover:rotate-12 ${isSelected ? 'bg-white text-[#292667]' : `${color.bg} ${color.text}`}`}>
                                           {String.fromCharCode(65 + i)}
                                        </div>
                                        <span className="flex-1 font-black uppercase tracking-tight text-[11px] leading-tight">{opt}</span>
                                     </button>
                                   );
                                 })}
                              </div>
                              <button 
                                onClick={handleQuizSubmit}
                                disabled={quizSelection === null}
                                className={`w-full mt-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border-b-4 border-black/10 shadow-lg flex items-center justify-center gap-3 ${quizSelection !== null ? 'bg-[#292667] text-white hover:bg-[#00a651] scale-[1.02]' : 'bg-slate-100 text-slate-300 cursor-not-allowed grayscale'}`}
                              >
                                 SUBMIT FOR REVIEW <ArrowRight size={16} strokeWidth={4} />
                              </button>
                           </div>
                         </>
                       ) : (
                         <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 bg-green-50 text-[#00a651] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-green-100">
                               <CheckCircle2 size={40} strokeWidth={3} />
                            </div>
                            <h4 className="text-2xl font-black text-[#292667] uppercase tracking-tighter mb-2">Submission Logged</h4>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Your selection has been captured.</p>
                            <button 
                              onClick={() => { setIsSubmitted(false); setQuizSelection(null); }}
                              className="px-8 py-3 bg-[#292667] text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg hover:bg-[#00a651] hover:text-white transition-all border-b-4 border-black/10 active:scale-95"
                            >
                               Next Quest
                            </button>
                         </div>
                       )}
                    </div>
                  )}

                  {activeLesson.type === 'assignment' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4">
                       {!isSubmitted ? (
                         <>
                           <div className="p-6 bg-rose-50 rounded-2xl border-2 border-dashed border-rose-200 text-center relative overflow-hidden">
                              <div className="w-14 h-14 bg-rose-500 text-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
                                 <ClipboardList size={28} />
                              </div>
                              <h4 className="text-xl font-black text-[#292667] uppercase tracking-tighter mb-2">Creative Workshop</h4>
                              <p className="text-[10px] font-bold text-slate-600 leading-relaxed max-w-md mx-auto uppercase tracking-tight">Complete the project and upload your results below.</p>
                           </div>
                           <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-white shadow-inner flex flex-col items-center gap-4 text-center relative overflow-hidden">
                              <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">Accepting: PDF, PNG, JPG</p>
                              <button onClick={handleFileUpload} className="px-8 py-4 bg-[#292667] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-[#00a651] transition-all border-b-4 border-black/10 active:scale-95 flex items-center gap-3 group">
                                 <Send size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                                 Select File & Upload
                              </button>
                           </div>
                         </>
                       ) : (
                         <div className="text-center py-12 animate-in slide-in-from-bottom-4">
                            <div className="w-16 h-16 bg-green-50 text-[#00a651] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border border-green-100">
                               <CheckCircle2 size={32} />
                            </div>
                            <h4 className="text-2xl font-black text-[#292667] uppercase tracking-tighter mb-2">Submission Logged</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 leading-relaxed">Your teacher will review your work shortly.</p>
                            <button onClick={() => setIsSubmitted(false)} className="text-[#292667] font-black text-[8px] uppercase tracking-widest hover:underline">Revise Submission</button>
                         </div>
                       )}
                    </div>
                  )}

                  {activeLesson.type === 'text' && (
                    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
                       <div className="p-8 bg-white rounded-[2rem] shadow-lg border border-slate-50 relative">
                          <h4 className="text-xl font-black text-[#292667] uppercase tracking-tighter mb-6 flex items-center gap-3">
                             <Sparkles className="text-amber-400" size={24} /> Core Readings
                          </h4>
                          <p className="text-[13px] text-slate-600 font-bold leading-relaxed uppercase tracking-tight">{activeLesson.content || 'Review materials provided in this section.'}</p>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative group overflow-hidden">
               <div className="w-24 h-24 bg-white rounded-2xl shadow-xl border border-slate-50 flex items-center justify-center mb-6 relative z-10">
                  <Play size={40} className="text-slate-100 fill-slate-100 ml-2 group-hover:text-[#00a651] group-hover:fill-[#00a651] transition-all" strokeWidth={1} />
               </div>
               <h4 className="text-2xl font-black text-[#292667] uppercase tracking-tighter mb-2 relative z-10">Select Your Quest</h4>
               <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] max-w-[180px] leading-relaxed relative z-10">Choose a curriculum task from the map on the left.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
