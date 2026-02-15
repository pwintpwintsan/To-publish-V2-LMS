
import React, { useState, useEffect } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Course, Module, Lesson, MatchingPair, QuizQuestion } from '../../types.ts';
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
  ArrowRight,
  Link,
  MessageSquareQuote,
  Loader2,
  FileCheck,
  FileSearch,
  Eye,
  ArrowDownCircle,
  Bookmark
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
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const getLessonIcon = (type: Lesson['type'], size = 14) => {
    switch (type) {
      case 'video': return <MonitorPlay size={size} strokeWidth={2.5} />;
      case 'quiz': return <Zap size={size} strokeWidth={2.5} fill="currentColor" />;
      case 'assignment': return <ClipboardList size={size} strokeWidth={2.5} />;
      case 'text': return <BookOpen size={size} strokeWidth={2.5} />;
      case 'pdf': return <FileSearch size={size} strokeWidth={2.5} />;
      case 'matching': return <Link size={size} strokeWidth={2.5} />;
      case 'question-answer': return <MessageSquareQuote size={size} strokeWidth={2.5} />;
      default: return <Play size={size} strokeWidth={2.5} />;
    }
  };

  const getLessonColor = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return 'bg-indigo-500 shadow-indigo-200';
      case 'quiz': return 'bg-amber-500 shadow-amber-200';
      case 'assignment': return 'bg-emerald-500 shadow-emerald-200';
      case 'text': return 'bg-blue-500 shadow-blue-200';
      case 'pdf': return 'bg-cyan-500 shadow-cyan-200';
      case 'matching': return 'bg-teal-500 shadow-teal-200';
      case 'question-answer': return 'bg-rose-500 shadow-rose-200';
      default: return 'bg-slate-500 shadow-slate-200';
    }
  };

  const handleMatchClick = (side: 'left' | 'right', id: string) => {
    if (isSubmitted) return;
    if (side === 'left') {
      setSelectedLeft(id);
    } else if (selectedLeft) {
      setMatches(prev => ({ ...prev, [selectedLeft]: id }));
      setSelectedLeft(null);
    }
  };

  const optionColors = [
    { bg: 'bg-indigo-50', text: 'text-indigo-600', active: 'bg-indigo-600', ring: 'ring-indigo-100' },
    { bg: 'bg-amber-50', text: 'text-amber-600', active: 'bg-amber-600', ring: 'ring-amber-100' },
    { bg: 'bg-rose-50', text: 'text-rose-600', active: 'bg-rose-600', ring: 'ring-rose-100' },
    { bg: 'bg-emerald-50', text: 'text-emerald-600', active: 'bg-emerald-600', ring: 'ring-emerald-100' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] overflow-hidden animate-in fade-in duration-500">
      {/* Global Branding Header */}
      <div className="h-16 px-6 bg-[#304B9E] flex items-center justify-between shrink-0 shadow-lg border-b-4 border-[#F05A28] z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-slate-50 text-[#304B9E] rounded-xl hover:bg-[#F05A28] hover:text-white transition-all active:scale-90 border border-slate-100 flex items-center gap-2 pr-4">
            <ChevronLeft size={20} strokeWidth={4} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Back to Library</span>
          </button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-md">
                <Bookmark size={18} className="text-[#304B9E]" fill="currentColor" />
             </div>
             <div>
                <h2 className="text-sm font-black text-white uppercase tracking-tight leading-none">{course.name}</h2>
                <p className="text-[8px] font-black text-white/50 uppercase tracking-[0.2em] mt-1">U Book Store Digital Hub</p>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">Active session</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Course Syllabus Panel */}
        <div className="w-[320px] bg-white border-r-2 border-slate-100 flex flex-col shrink-0 relative z-40 shadow-xl shadow-black/5">
           <div className="p-6 border-b border-slate-50">
              <h3 className="text-[10px] font-black text-[#304B9E] uppercase tracking-[0.2em] flex items-center gap-2">
                 <Target size={16} className="text-[#F05A28]" strokeWidth={3} /> Roadmap Hub
              </h3>
           </div>
           <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-6">
              {course.modules.map((mod, mIdx) => (
                <div key={mod.id} className="space-y-3">
                   <div className="flex items-center gap-3 px-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-50 text-[#304B9E] flex items-center justify-center font-black text-[10px] shadow-sm border border-indigo-100">{mIdx + 1}</span>
                      <h4 className="font-black text-[#304B9E] text-[10px] uppercase tracking-tight truncate">{mod.title}</h4>
                   </div>
                   <div className="space-y-1.5 pl-4 border-l-2 border-dashed border-slate-100 ml-3">
                      {mod.lessons.map((lesson) => (
                        <button 
                          key={lesson.id}
                          onClick={() => { setActiveLesson(lesson); setIsSubmitted(false); setQuizSelection(null); setMatches({}); setSelectedLeft(null); }}
                          className={`w-full p-2.5 rounded-xl border-2 transition-all text-left flex items-center gap-3 group ${activeLesson?.id === lesson.id ? 'bg-[#304B9E] border-[#304B9E] text-white shadow-xl scale-[1.03]' : 'bg-slate-50 border-transparent hover:bg-white hover:border-[#F05A28]'}`}
                        >
                           <div className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-sm shrink-0 transition-all ${activeLesson?.id === lesson.id ? 'bg-white/10 text-white' : `${getLessonColor(lesson.type)} text-white group-hover:rotate-6`}`}>
                              {getLessonIcon(lesson.type, 14)}
                           </div>
                           <span className={`text-[9px] font-black uppercase tracking-tight truncate ${activeLesson?.id === lesson.id ? 'text-white' : 'text-[#304B9E]'}`}>{lesson.title}</span>
                        </button>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Dynamic Reader Space */}
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-50 relative">
          {activeLesson ? (
            <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
               {/* Workspace Header */}
               <div className="px-8 py-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-sm relative z-30">
                  <div className="flex items-center gap-6">
                     <div className={`p-4 rounded-2xl text-white shadow-xl rotate-3 border-b-4 border-black/10 ${getLessonColor(activeLesson.type)}`}>
                        {getLessonIcon(activeLesson.type, 28)}
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none mb-1.5">{activeLesson.title}</h3>
                        <div className="flex items-center gap-3">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Clock size={12} className="text-[#304B9E]" /> Estimated 15m</span>
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Zap size={12} className="text-[#F05A28]" fill="currentColor" /> {activeLesson.type} NODE</span>
                        </div>
                     </div>
                  </div>
                  {isSubmitted && (
                     <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 border-emerald-100 shadow-inner animate-in zoom-in">
                        <CheckCircle2 size={18} strokeWidth={3} /> Transmission Successful
                     </div>
                  )}
               </div>

               {/* Activity Area */}
               <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-16">
                  <div className="max-w-4xl mx-auto w-full">
                     
                     {/* TYPE: PDF Viewer */}
                     {activeLesson.type === 'pdf' && (
                       <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
                          <div className="bg-white rounded-[3rem] p-1.5 shadow-2xl border-2 border-slate-100 overflow-hidden relative group">
                             <div className="aspect-[3/4] w-full bg-slate-900 rounded-[2.5rem] overflow-hidden flex flex-col relative">
                                {/* Simulated PDF Interface */}
                                <div className="absolute top-0 inset-x-0 h-14 bg-[#304B9E] flex items-center justify-between px-6 z-20">
                                   <div className="flex items-center gap-3">
                                      <FileSearch size={18} className="text-white" />
                                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Digital Courseware Reader v2.0</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                      <button className="p-2 bg-white/10 rounded-lg text-white"><ArrowDownCircle size={16}/></button>
                                      <button className="p-2 bg-white/10 rounded-lg text-white"><X size={16}/></button>
                                   </div>
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-center p-20 text-center text-slate-400">
                                   <div className="p-10 bg-white/5 rounded-full border-2 border-dashed border-white/10 mb-8">
                                      <Loader2 size={64} className="animate-spin text-cyan-400" />
                                   </div>
                                   <h4 className="text-xl font-black text-white uppercase tracking-widest mb-2">Encrypted Stream Rendering</h4>
                                   <p className="text-[10px] uppercase tracking-widest opacity-40">Loading secure curriculum node: {activeLesson.content || 'syllabus.pdf'}</p>
                                </div>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/20 text-white font-black text-[9px] uppercase tracking-widest flex items-center gap-4">
                                   <span>Page 1 / 24</span>
                                   <div className="w-px h-3 bg-white/20"></div>
                                   <span className="text-cyan-400">Hub Verified</span>
                                </div>
                             </div>
                          </div>
                          <button onClick={() => setIsSubmitted(true)} className="w-full py-6 bg-[#304B9E] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-[#00a651] transition-all border-b-8 border-black/10 active:scale-[0.98] flex items-center justify-center gap-4">
                             Mark Unit as Complete <CheckCircle2 size={22} />
                          </button>
                       </div>
                     )}

                     {/* TYPE: VIDEO */}
                     {activeLesson.type === 'video' && (
                       <div className="space-y-8 animate-in slide-in-from-bottom-6">
                          <div className="aspect-video w-full bg-slate-900 rounded-[3rem] shadow-2xl flex items-center justify-center relative group overflow-hidden border-[12px] border-white ring-1 ring-slate-100">
                             <img src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200`} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[5000ms]" alt="" />
                             <button className="w-24 h-24 bg-[#F05A28] rounded-full flex items-center justify-center z-20 shadow-2xl hover:scale-110 active:scale-90 transition-all group/play">
                                <Play size={40} className="text-white fill-white ml-2" />
                             </button>
                             <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Secure Media Stream</span>
                                </div>
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">14:24 / 20:00</span>
                             </div>
                          </div>
                          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl flex items-center justify-between gap-6">
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 text-indigo-500 rounded-2xl"><ShieldCheck size={24} /></div>
                                <p className="text-sm font-bold text-slate-500 uppercase leading-relaxed max-w-lg">Complete the video segment to unlock the final assessment node.</p>
                             </div>
                             <button onClick={() => setIsSubmitted(true)} className="px-10 py-5 bg-[#304B9E] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg border-b-4 border-black/10 active:scale-95">Complete Video</button>
                          </div>
                       </div>
                     )}

                     {/* TYPE: QUIZ */}
                     {activeLesson.type === 'quiz' && (
                       <div className="space-y-10 animate-in fade-in duration-700">
                          <div className="text-center space-y-4">
                             <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 shadow-xl border-b-6 border-amber-100 rotate-3 animate-bounce-subtle">
                                <Zap size={48} fill="currentColor" />
                             </div>
                             <h4 className="text-4xl font-black text-[#304B9E] uppercase tracking-tighter">Assessment Node</h4>
                             <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Module Final Performance Check</p>
                          </div>

                          <div className="bg-white p-10 md:p-16 rounded-[4rem] border-2 border-slate-100 shadow-[0_40px_100px_-20px_rgba(48,75,158,0.15)] relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-3 h-full bg-[#F05A28]" />
                             {!isSubmitted ? (
                               <div className="space-y-10">
                                  <p className="text-2xl font-black text-[#304B9E] text-center leading-tight uppercase tracking-tight px-4">"Which system protocol is utilized for sequential node synchronization within the Hub Registry?"</p>
                                  <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                                     {['Registry Link V1', 'Sync Protocol 9', 'Hub Encryption Layer', 'Dynamic Identity Matrix'].map((opt, i) => {
                                       const color = optionColors[i % optionColors.length];
                                       const isSelected = quizSelection === i;
                                       return (
                                         <button 
                                           key={i} 
                                           onClick={() => setQuizSelection(i)}
                                           className={`group p-6 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-6 ${isSelected ? `${color.active} text-white shadow-xl scale-[1.05] border-transparent ring-8 ${color.ring}` : `bg-white border-slate-50 hover:border-amber-200`}`}
                                         >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-md transition-all ${isSelected ? 'bg-white text-[#304B9E]' : `${color.bg} ${color.text}`}`}>
                                               {String.fromCharCode(65 + i)}
                                            </div>
                                            <span className="flex-1 font-black uppercase tracking-tight text-[15px]">{opt}</span>
                                            {isSelected && <CheckCircle2 size={24} className="animate-in zoom-in" />}
                                         </button>
                                       );
                                     })}
                                  </div>
                                  <button 
                                    onClick={() => setIsSubmitted(true)}
                                    disabled={quizSelection === null}
                                    className={`w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] transition-all border-b-8 border-black/10 shadow-2xl flex items-center justify-center gap-4 ${quizSelection !== null ? 'bg-[#304B9E] text-white hover:bg-[#00a651] scale-[1.02]' : 'bg-slate-100 text-slate-300 grayscale opacity-50'}`}
                                  >
                                     Deploy Final Response <Send size={20} strokeWidth={3} />
                                  </button>
                               </div>
                             ) : (
                               <div className="text-center py-10 animate-in zoom-in duration-500">
                                  <div className="w-32 h-32 bg-emerald-50 text-emerald-500 rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-inner border-4 border-emerald-100 rotate-12">
                                     <CheckCircle2 size={64} strokeWidth={3} />
                                  </div>
                                  <h4 className="text-5xl font-black text-[#304B9E] uppercase tracking-tighter mb-4">Mastered!</h4>
                                  <p className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-10">Assessment logged with global performance registry.</p>
                                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                                     <button onClick={() => { setIsSubmitted(false); setQuizSelection(null); }} className="px-10 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Review Hub</button>
                                     <button className="px-12 py-5 bg-[#304B9E] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-[#F05A28] border-b-4 border-black/10 active:scale-95 flex items-center gap-3">
                                        Next Activity <ArrowRight size={20} strokeWidth={4} />
                                     </button>
                                  </div>
                               </div>
                             )}
                          </div>
                       </div>
                     )}

                     {/* TYPE: MATCHING */}
                     {activeLesson.type === 'matching' && (
                       <div className="space-y-12 animate-in slide-in-from-right-10 duration-700">
                          <div className="text-center space-y-4">
                             <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 shadow-xl border-b-6 border-teal-100 -rotate-3">
                                <Link size={44} strokeWidth={2.5} />
                             </div>
                             <h4 className="text-4xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Logic Matcher</h4>
                             <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Map the corresponding registry nodes</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative px-4">
                             <div className="space-y-3">
                                {(activeLesson.matchingPairs || [{id:'1', left:'Identity', right:'Access'}, {id:'2', left:'Protocol', right:'Sync'}]).map((pair) => (
                                  <button 
                                    key={pair.id}
                                    onClick={() => handleMatchClick('left', pair.id)}
                                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all font-black text-sm uppercase tracking-tight flex items-center justify-between group shadow-sm ${
                                      selectedLeft === pair.id ? 'bg-[#304B9E] border-[#304B9E] text-white shadow-xl scale-[1.05]' : 
                                      matches[pair.id] ? 'bg-emerald-50 border-emerald-500/20 text-emerald-700 opacity-40 grayscale-[0.5]' : 'bg-white border-slate-100 hover:border-teal-400'
                                    }`}
                                  >
                                     {pair.left}
                                     {matches[pair.id] ? <CheckCircle2 size={20} /> : <div className="w-4 h-4 rounded-full border-4 border-current opacity-20" />}
                                  </button>
                                ))}
                             </div>
                             
                             <div className="space-y-3">
                                {(activeLesson.matchingPairs || [{id:'1', left:'Identity', right:'Access'}, {id:'2', left:'Protocol', right:'Sync'}]).map((pair) => {
                                  const isMatched = Object.values(matches).includes(pair.id);
                                  return (
                                    <button 
                                      key={pair.id}
                                      onClick={() => handleMatchClick('right', pair.id)}
                                      className={`w-full p-6 rounded-2xl border-2 text-right transition-all font-black text-sm uppercase tracking-tight flex items-center gap-4 justify-end group shadow-sm ${
                                        isMatched ? 'bg-emerald-50 border-emerald-500/20 text-emerald-700 opacity-40' : 'bg-white border-slate-100 hover:border-teal-400'
                                      }`}
                                    >
                                       <div className="w-4 h-4 rounded-full border-4 border-current opacity-20" />
                                       {pair.right}
                                    </button>
                                  );
                                })}
                             </div>
                             <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 rounded-full hidden md:block opacity-30" />
                          </div>

                          <div className="flex justify-center pt-8">
                             {!isSubmitted ? (
                               <button 
                                 onClick={() => setIsSubmitted(true)}
                                 className="px-16 py-6 bg-[#304B9E] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-[#00a651] transition-all border-b-8 border-black/10 active:scale-[0.98] flex items-center gap-4"
                               >
                                 Confirm Mapping <CheckCircle2 size={22} />
                               </button>
                             ) : (
                               <div className="text-center space-y-6">
                                  <div className="flex items-center gap-3 px-8 py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-emerald-200">
                                     <Sparkles size={20} fill="currentColor" /> Logic verified by Hub Core
                                  </div>
                                  <button onClick={() => { setMatches({}); setIsSubmitted(false); }} className="text-[10px] font-black uppercase tracking-widest text-[#304B9E] hover:text-[#F05A28] underline underline-offset-8 transition-colors">Reset and practice again</button>
                               </div>
                             )}
                          </div>
                       </div>
                     )}

                     {/* TYPE: QUESTION & ANSWER */}
                     {activeLesson.type === 'question-answer' && (
                       <div className="max-w-3xl mx-auto space-y-12 animate-in slide-in-from-bottom-10 duration-700">
                          <div className="flex items-center gap-8 mb-16">
                             <div className="p-6 bg-rose-50 text-rose-500 rounded-[2rem] shadow-2xl rotate-6 border-b-6 border-rose-100 shrink-0">
                                <MessageSquareQuote size={48} strokeWidth={2.5} />
                             </div>
                             <div>
                                <h4 className="text-4xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Response Terminal</h4>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Synthesize and record your logic</p>
                             </div>
                          </div>

                          <div className="space-y-10">
                             {(activeLesson.questions || ['How does a Hub Registry authenticate sequential nodes?', 'Define the core benefits of a decentralized library.']).map((q, idx) => (
                               <div key={idx} className="space-y-5 group">
                                  <div className="flex items-center gap-4">
                                     <span className="w-10 h-10 rounded-2xl bg-[#304B9E] text-white flex items-center justify-center font-black text-lg shadow-xl group-focus-within:rotate-12 transition-transform">{idx + 1}</span>
                                     <h5 className="text-xl font-black text-[#304B9E] uppercase tracking-tight leading-tight">{q}</h5>
                                  </div>
                                  <div className="relative">
                                     <textarea 
                                       className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 font-bold text-slate-600 text-base outline-none focus:border-rose-500 focus:bg-slate-50 transition-all shadow-xl shadow-black/5 resize-none min-h-[180px]"
                                       placeholder="TRANSMIT DATA TO HUB..."
                                     />
                                     <div className="absolute bottom-6 right-8 text-[8px] font-black text-slate-200 uppercase tracking-widest">Entry Secure</div>
                                  </div>
                               </div>
                             ))}
                          </div>

                          {!isSubmitted ? (
                            <button 
                              onClick={() => setIsSubmitted(true)}
                              className="w-full py-7 bg-[#304B9E] text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-[#F05A28] transition-all border-b-8 border-black/10 active:scale-[0.98] flex items-center justify-center gap-4 group"
                            >
                              Finalize Submission <Send size={24} strokeWidth={3} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                            </button>
                          ) : (
                            <div className="p-10 bg-emerald-50 rounded-[3rem] border-2 border-emerald-200 text-center animate-in zoom-in">
                               <h4 className="text-3xl font-black text-emerald-700 uppercase tracking-tighter mb-4">Transmission Logged</h4>
                               <p className="text-sm font-bold text-emerald-600/60 uppercase tracking-widest mb-6">Response data is now queued for evaluation.</p>
                               <button onClick={() => setIsSubmitted(false)} className="text-[10px] font-black text-emerald-700/40 uppercase tracking-widest hover:text-emerald-700">Edit Responses</button>
                            </div>
                          )}
                       </div>
                     )}

                     {/* TYPE: ASSIGNMENT */}
                     {activeLesson.type === 'assignment' && (
                       <div className="max-w-4xl mx-auto space-y-12 py-4">
                          <div className="p-16 bg-white rounded-[4rem] border-2 border-slate-100 shadow-2xl text-center relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-60" />
                             <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3 border-b-6 border-black/10 group-hover:scale-110 transition-transform duration-700">
                                <ClipboardList size={48} strokeWidth={2.5} />
                             </div>
                             <h4 className="text-4xl font-black text-[#304B9E] uppercase tracking-tighter mb-4">Workshop Submission</h4>
                             <p className="text-lg font-bold text-emerald-700 max-w-xl mx-auto uppercase tracking-tight leading-relaxed mb-12">
                                {activeLesson.assignmentInstructions || "Record your local lab activities and upload the result package for global certification review."}
                             </p>
                             
                             <div className="p-10 border-4 border-dashed border-emerald-200 rounded-[3rem] flex flex-col items-center gap-6 bg-slate-50 group-hover:bg-white transition-colors duration-500">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl">
                                   <FileCheck size={32} />
                                </div>
                                <div className="space-y-1">
                                   <p className="text-xs font-black text-[#304B9E] uppercase tracking-[0.2em]">Drop files or click to browse</p>
                                   <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Max Package Size: 512MB</p>
                                </div>
                                <button onClick={() => setIsSubmitted(true)} className="px-12 py-5 bg-[#304B9E] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 active:scale-95">
                                   Initialize Upload
                                </button>
                             </div>
                          </div>
                       </div>
                     )}

                     {/* TYPE: TEXT */}
                     {activeLesson.type === 'text' && (
                       <div className="max-w-4xl mx-auto animate-in fade-in duration-1000 space-y-12 pb-20">
                          <div className="bg-white rounded-[4rem] shadow-2xl border-2 border-slate-100 overflow-hidden relative group">
                             <div className="h-4 bg-[#304B9E]"></div>
                             <div className="p-12 md:p-20 relative z-10">
                                <div className="flex items-center justify-between mb-12">
                                   <div className="flex items-center gap-4">
                                      <div className="p-4 bg-blue-50 text-[#304B9E] rounded-2xl rotate-6 shadow-xl border-b-4 border-blue-100"><BookOpen size={32} /></div>
                                      <div>
                                         <h4 className="text-3xl font-black text-[#304B9E] uppercase tracking-tighter">Syllabus Abstract</h4>
                                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Foundational Unit Metadata</p>
                                      </div>
                                   </div>
                                   <div className="text-right">
                                      <span className="px-4 py-2 bg-slate-50 text-[#304B9E] rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-100">REV: 02.25</span>
                                   </div>
                                </div>
                                <div className="prose prose-lg max-w-none prose-slate">
                                   <p className="text-xl text-slate-600 font-bold leading-[1.8] uppercase tracking-tight text-justify">
                                      {activeLesson.content || 'ACCESS THE DECENTRALIZED REPOSITORY TO VIEW THE FULL SYLLABUS CONTENT FOR THIS NODE. SYSTEM SYNCHRONIZATION IS REQUIRED TO VERIFY IDENTITY PERMISSIONS BEFORE CONTENT RENDERING.'}
                                   </p>
                                </div>
                                <div className="mt-16 pt-8 border-t-2 border-slate-50 flex items-center justify-center">
                                   <button onClick={() => setIsSubmitted(true)} className="px-16 py-6 bg-slate-50 text-[#304B9E] hover:bg-[#304B9E] hover:text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all active:scale-95 shadow-lg flex items-center gap-4">
                                      Confirm Unit Completion <CheckCircle2 size={22} />
                                   </button>
                                </div>
                             </div>
                          </div>
                       </div>
                     )}

                  </div>
               </div>

               {/* Workspace Navigation Footer */}
               <div className="h-20 px-10 bg-white border-t-2 border-slate-100 flex items-center justify-between shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-30">
                  <div className="flex items-center gap-4">
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Master Learner Engine v4.2</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-[#304B9E] uppercase tracking-widest">Security:</span>
                        <div className="flex gap-1">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-slate-50/50" />
               <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(48,75,158,0.15)] border-2 border-slate-100 flex items-center justify-center mb-10 relative z-10 animate-bounce transition-all duration-[3000ms]">
                  <MonitorPlay size={64} className="text-[#304B9E]/20" strokeWidth={1} />
               </div>
               <h4 className="text-4xl font-black text-[#304B9E] uppercase tracking-tighter mb-4 relative z-10 leading-none">Select a Learning node</h4>
               <p className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] max-w-[300px] leading-relaxed relative z-10">Access the syllabus roadmap on the left to begin your journey.</p>
               <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-30 grayscale z-10">
                  <img src="https://picsum.photos/seed/tech1/40" className="w-12 h-12 rounded-xl" alt=""/>
                  <img src="https://picsum.photos/seed/tech2/40" className="w-12 h-12 rounded-xl" alt=""/>
                  <img src="https://picsum.photos/seed/tech3/40" className="w-12 h-12 rounded-xl" alt=""/>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
