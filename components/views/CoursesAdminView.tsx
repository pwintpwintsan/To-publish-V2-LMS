
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Course, Module, Lesson, UserRole, QuizQuestion, MatchingPair } from '../../types.ts';
import { 
  Layers, 
  Save, 
  ChevronDown,
  ArrowLeft,
  Search,
  Library,
  ShieldCheck,
  Check,
  X,
  Zap,
  BookOpen,
  MonitorPlay,
  FileSearch,
  ClipboardList,
  Link,
  MessageSquareQuote,
  Target,
  CheckCircle2,
  Edit3,
  Trash2,
  Plus,
  ChevronUp,
  FileText,
  Eye,
  Settings2,
  GripVertical,
  Upload,
  FileUp,
  File,
  ListPlus,
  PlusCircle,
  Type,
  Send,
  Sparkles,
  ArrowRight,
  ListOrdered,
  Lock,
  Unlock,
  ChevronLeft
} from 'lucide-react';

interface CoursesAdminViewProps {
  initialCourseId?: string | null;
  onExitEdit?: () => void;
  onPreviewCourse?: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
  activeRole?: UserRole;
}

/**
 * Modern Access Toggle Switch with clear ON/OFF state indicators
 */
const AccessToggle = ({ active, onToggle, label, size = 'md', disabled = false }: { active: boolean, onToggle: () => void, label?: string, size?: 'sm' | 'md' | 'lg', disabled?: boolean }) => {
  const dims = size === 'sm' ? 'w-10 h-5' : size === 'lg' ? 'w-16 h-8' : 'w-12 h-6';
  const circle = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const translate = size === 'sm' ? 'translate-x-5' : size === 'lg' ? 'translate-x-8' : 'translate-x-6';

  return (
    <div className={`flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="flex flex-col items-center">
        {label && <span className={`text-[8px] font-black uppercase tracking-widest leading-none mb-1 ${active ? 'text-[#00a651]' : 'text-slate-400'}`}>{label}</span>}
        <button 
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`${dims} rounded-full relative transition-all duration-300 shadow-inner group ${active ? 'bg-[#00a651]' : 'bg-slate-200'} ${disabled ? 'grayscale' : ''}`}
        >
          <div className={`absolute top-0.5 left-0.5 ${circle} bg-white rounded-full shadow-lg transition-transform duration-300 flex items-center justify-center ${active ? translate : 'translate-x-0'}`}>
            {active ? <Check size={8} className="text-[#00a651]" strokeWidth={4} /> : <X size={8} className="text-slate-300" strokeWidth={4} />}
          </div>
        </button>
        <span className={`text-[7px] font-black uppercase tracking-tighter mt-1 ${active ? 'text-[#00a651] scale-110' : 'text-slate-400'}`}>
          {active ? 'ON' : 'OFF'}
        </span>
      </div>
    </div>
  );
};

/**
 * Shared Modal Wrapper for Editors
 */
const EditorModalWrapper: React.FC<{ 
  title: string, 
  type: string, 
  icon: any, 
  colorClass: string, 
  onClose: () => void, 
  onSave: () => void, 
  children: React.ReactNode,
  isValid?: boolean,
  maxWidth?: string,
  readOnly?: boolean
}> = ({ title, type, icon: Icon, colorClass, onClose, onSave, children, isValid = true, maxWidth = "max-w-2xl", readOnly = false }) => (
  <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
    <div className={`bg-white rounded-[3rem] w-full ${maxWidth} shadow-2xl border-t-[12px] ${colorClass} flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative max-h-[90vh]`}>
      <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-50">
        <X size={20} strokeWidth={4} />
      </button>
      
      <div className="p-10 border-b border-slate-100 bg-slate-50/50 shrink-0">
         <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl text-white shadow-xl rotate-3 ${colorClass.replace('border-', 'bg-')}`}>
               <Icon size={24} strokeWidth={3} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">{title}</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                 Resource Node: {type} {readOnly && " • [READ-ONLY]"}
               </p>
            </div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
         {children}
      </div>

      <div className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4 shrink-0">
         <button onClick={onClose} className="flex-1 py-5 bg-white text-slate-400 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
           {readOnly ? "Close" : "Cancel"}
         </button>
         {!readOnly && (
           <button 
             onClick={onSave}
             disabled={!isValid}
             className={`flex-[2] py-5 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all border-b-6 border-black/10 active:scale-95 flex items-center justify-center gap-2 ${isValid ? 'bg-[#304B9E] hover:bg-[#00a651]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
           >
              <Save size={18} strokeWidth={3} /> Save Hub Node
           </button>
         )}
      </div>
    </div>
  </div>
);

/**
 * Quiz Architect Editor Component
 */
const QuizEditor = ({ lesson, onClose, onSave, readOnly }: { lesson: Lesson, onClose: () => void, onSave: (updated: Lesson) => void, readOnly?: boolean }) => {
  const [data, setData] = useState<Lesson>({ 
    ...lesson, 
    quiz: lesson.quiz?.length ? [...lesson.quiz] : [{ id: '1', question: '', options: ['', ''], correctAnswer: 0 }] 
  });
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  const addQuestion = () => {
    if (readOnly) return;
    const newQ: QuizQuestion = { id: Date.now().toString(), question: '', options: ['', ''], correctAnswer: 0 };
    const updatedQuiz = [...(data.quiz || []), newQ];
    setData({ ...data, quiz: updatedQuiz });
    setActiveQuestionIdx(updatedQuiz.length - 1);
  };

  const removeQuestion = (idx: number) => {
    if (readOnly) return;
    const updatedQuiz = (data.quiz || []).filter((_, i) => i !== idx);
    setData({ ...data, quiz: updatedQuiz });
    setActiveQuestionIdx(Math.max(0, activeQuestionIdx - 1));
  };

  const updateQuestion = (field: keyof QuizQuestion, value: any) => {
    if (readOnly) return;
    const updatedQuiz = (data.quiz || []).map((q, i) => i === activeQuestionIdx ? { ...q, [field]: value } : q);
    setData({ ...data, quiz: updatedQuiz });
  };

  const updateOption = (optIdx: number, val: string) => {
    if (readOnly) return;
    const q = data.quiz![activeQuestionIdx];
    const newOpts = [...q.options];
    newOpts[optIdx] = val;
    updateQuestion('options', newOpts);
  };

  const addOption = () => {
    if (readOnly) return;
    const q = data.quiz![activeQuestionIdx];
    if (q.options.length >= 6) return;
    updateQuestion('options', [...q.options, '']);
  };

  const removeOption = (optIdx: number) => {
    if (readOnly) return;
    const q = data.quiz![activeQuestionIdx];
    if (q.options.length <= 2) return;
    const newOpts = q.options.filter((_, i) => i !== optIdx);
    updateQuestion('options', newOpts);
    if (q.correctAnswer === optIdx) updateQuestion('correctAnswer', 0);
  };

  const activeQ = data.quiz![activeQuestionIdx];

  return (
    <EditorModalWrapper 
      title="Quiz Architect" 
      type="Multiple Choice" 
      icon={Zap} 
      colorClass="border-amber-500" 
      onClose={onClose} 
      onSave={() => onSave(data)}
      maxWidth="max-w-5xl"
      readOnly={readOnly}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[400px]">
        <div className="lg:col-span-4 border-r border-slate-100 pr-6 space-y-4">
           <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question Registry</label>
              {!readOnly && (
                <button type="button" onClick={addQuestion} className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-all">
                  <PlusCircle size={18} strokeWidth={3} />
                </button>
              )}
           </div>
           <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
              {data.quiz!.map((q, idx) => (
                <button 
                  key={q.id}
                  onClick={() => setActiveQuestionIdx(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${activeQuestionIdx === idx ? 'bg-amber-50 border-amber-500 shadow-lg' : 'bg-white border-slate-50 hover:border-slate-200'}`}
                >
                   <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[10px] ${activeQuestionIdx === idx ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {idx + 1}
                      </span>
                      <span className={`text-[11px] font-black uppercase truncate ${activeQuestionIdx === idx ? 'text-amber-700' : 'text-slate-400'}`}>
                        {q.question || 'New Question...'}
                      </span>
                   </div>
                   {!readOnly && data.quiz!.length > 1 && (
                     <X 
                       size={14} 
                       className="text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" 
                       onClick={(e) => { e.stopPropagation(); removeQuestion(idx); }}
                     />
                   )}
                </button>
              ))}
           </div>
        </div>

        <div className="lg:col-span-8 space-y-8 animate-in slide-in-from-right duration-300">
           <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question Prompt</label>
                {readOnly && <Lock size={12} className="text-slate-300" />}
              </div>
              <textarea 
                readOnly={readOnly}
                className={`w-full border-2 border-slate-100 rounded-3xl px-6 py-4 font-black text-[#304B9E] text-base outline-none transition-all uppercase resize-none h-24 shadow-inner ${readOnly ? 'bg-slate-100 cursor-not-allowed text-slate-400' : 'bg-slate-50 focus:border-amber-500'}`}
                placeholder="ENTER QUESTION TEXT..."
                value={activeQ.question}
                onChange={(e) => updateQuestion('question', e.target.value)}
              />
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Response Matrix (A-F)</label>
                 {!readOnly && <button type="button" onClick={addOption} className="text-[10px] font-black text-amber-600 uppercase hover:underline">Add Option</button>}
              </div>
              <div className="grid grid-cols-1 gap-3">
                 {activeQ.options.map((opt, oIdx) => (
                   <div key={oIdx} className={`group flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${activeQ.correctAnswer === oIdx ? 'bg-emerald-50 border-emerald-500 shadow-md' : 'bg-white border-slate-100 hover:border-amber-200'}`}>
                      <button 
                        type="button"
                        disabled={readOnly}
                        onClick={() => updateQuestion('correctAnswer', oIdx)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all flex-shrink-0 shadow-sm ${activeQ.correctAnswer === oIdx ? 'bg-emerald-500 text-white scale-110' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'} ${readOnly ? 'cursor-not-allowed' : ''}`}
                      >
                         {activeQ.correctAnswer === oIdx ? <Check size={20} strokeWidth={4} /> : String.fromCharCode(65 + oIdx)}
                      </button>
                      <input 
                        readOnly={readOnly}
                        className={`flex-1 bg-transparent font-black text-xs outline-none uppercase placeholder:text-slate-200 ${readOnly ? 'text-slate-400 cursor-not-allowed' : 'text-[#304B9E]'}`}
                        placeholder={`Option ${String.fromCharCode(65 + oIdx)} Content...`}
                        value={opt}
                        onChange={(e) => updateOption(oIdx, e.target.value)}
                      />
                      {!readOnly && activeQ.options.length > 2 && (
                        <button type="button" onClick={() => removeOption(oIdx)} className="p-2 text-slate-100 hover:text-red-500 transition-colors">
                           <Trash2 size={16} />
                        </button>
                      )}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </EditorModalWrapper>
  );
};

/**
 * Assignment Editor Component
 */
const AssignmentEditor = ({ lesson, onClose, onSave, readOnly }: { lesson: Lesson, onClose: () => void, onSave: (updated: Lesson) => void, readOnly?: boolean }) => {
  const [data, setData] = useState<Lesson>({ ...lesson });
  return (
    <EditorModalWrapper title="Workshop Architect" type="Assignment" icon={ClipboardList} colorClass="border-emerald-500" onClose={onClose} onSave={() => onSave(data)} readOnly={readOnly}>
       <div className="space-y-6">
          <div className="space-y-2">
             <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Activity Label</label>
                {readOnly && <Lock size={12} className="text-slate-300" />}
             </div>
             <input readOnly={readOnly} className={`w-full border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-base outline-none transition-all uppercase shadow-inner ${readOnly ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-[#304B9E] focus:border-emerald-500'}`} value={data.title} onChange={e => setData({...data, title: e.target.value})} />
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Workshop Instructions</label>
             <textarea readOnly={readOnly} className={`w-full border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all h-32 resize-none shadow-inner ${readOnly ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-slate-600 focus:border-emerald-500'}`} value={data.assignmentInstructions || ''} onChange={e => setData({...data, assignmentInstructions: e.target.value})} />
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Model Logic (Reference)</label>
             <textarea readOnly={readOnly} className={`w-full border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all h-24 resize-none shadow-inner ${readOnly ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-slate-600 focus:border-emerald-500'}`} value={data.modelAnswer || ''} onChange={e => setData({...data, modelAnswer: e.target.value})} />
          </div>
       </div>
    </EditorModalWrapper>
  );
};

/**
 * Matching Editor Component
 */
const MatchingEditor = ({ lesson, onClose, onSave, readOnly }: { lesson: Lesson, onClose: () => void, onSave: (updated: Lesson) => void, readOnly?: boolean }) => {
  const [data, setData] = useState<Lesson>({ 
    ...lesson, 
    matchingPairs: lesson.matchingPairs?.length ? [...lesson.matchingPairs] : [{ id: '1', left: '', right: '' }] 
  });

  const addPair = () => { if (!readOnly) setData({ ...data, matchingPairs: [...(data.matchingPairs || []), { id: Date.now().toString(), left: '', right: '' }] }); };
  const removePair = (id: string) => { if (!readOnly) setData({ ...data, matchingPairs: data.matchingPairs?.filter(p => p.id !== id) }); };
  const updatePair = (id: string, side: 'left' | 'right', val: string) => { if (!readOnly) setData({ ...data, matchingPairs: data.matchingPairs?.map(p => p.id === id ? { ...p, [side]: val } : p) }); };

  return (
    <EditorModalWrapper title="Schema Matcher" type="Logic Matching" icon={Link} colorClass="border-teal-500" onClose={onClose} onSave={() => onSave(data)} readOnly={readOnly}>
       <div className="space-y-8">
          <div className="space-y-2">
             <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Title</label>
                {readOnly && <Lock size={12} className="text-slate-300" />}
             </div>
             <input readOnly={readOnly} className={`w-full border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-base outline-none transition-all uppercase shadow-inner ${readOnly ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-[#304B9E] focus:border-teal-500'}`} value={data.title} onChange={e => setData({...data, title: e.target.value})} />
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic Pairs Matrix</label>
                {!readOnly && <button type="button" onClick={addPair} className="flex items-center gap-2 text-[10px] font-black text-teal-600 uppercase hover:text-teal-700 transition-colors"><PlusCircle size={14} /> Add Row</button>}
             </div>
             <div className="space-y-3">
                {data.matchingPairs?.map((pair, idx) => (
                   <div key={pair.id} className="flex items-center gap-3 group animate-in slide-in-from-left duration-300">
                      <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-black text-[10px] shadow-inner shrink-0">{idx+1}</span>
                      <input readOnly={readOnly} className={`flex-1 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-xs outline-none uppercase ${readOnly ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-[#304B9E] focus:border-teal-500'}`} placeholder="Left Concept" value={pair.left} onChange={e => updatePair(pair.id, 'left', e.target.value)} />
                      <ArrowRight size={14} className="text-slate-300" />
                      <input readOnly={readOnly} className={`flex-1 border border-slate-200 rounded-xl px-4 py-2.5 font-bold text-xs outline-none uppercase ${readOnly ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-[#304B9E] focus:border-teal-500'}`} placeholder="Right Concept" value={pair.right} onChange={e => updatePair(pair.id, 'right', e.target.value)} />
                      {!readOnly && data.matchingPairs!.length > 1 && (
                         <button type="button" onClick={() => removePair(pair.id)} className="p-2 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                      )}
                   </div>
                ))}
             </div>
          </div>
       </div>
    </EditorModalWrapper>
  );
};

/**
 * Question & Answer Editor Component
 */
const QAEditor = ({ lesson, onClose, onSave, readOnly }: { lesson: Lesson, onClose: () => void, onSave: (updated: Lesson) => void, readOnly?: boolean }) => {
  const [data, setData] = useState<Lesson>({ 
    ...lesson, 
    questions: lesson.questions?.length ? [...lesson.questions] : [''] 
  });

  const addQ = () => { if (!readOnly) setData({ ...data, questions: [...(data.questions || []), ''] }); };
  const removeQ = (idx: number) => { if (!readOnly) setData({ ...data, questions: data.questions?.filter((_, i) => i !== idx) }); };
  const updateQ = (idx: number, val: string) => { if (!readOnly) setData({ ...data, questions: data.questions?.map((q, i) => i === idx ? val : q) }); };

  return (
    <EditorModalWrapper title="Response Terminal" type="Critical Q&A" icon={MessageSquareQuote} colorClass="border-rose-500" onClose={onClose} onSave={() => onSave(data)} readOnly={readOnly}>
       <div className="space-y-8">
          <div className="space-y-2">
             <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Task Identification</label>
                {readOnly && <Lock size={12} className="text-slate-300" />}
             </div>
             <input readOnly={readOnly} className={`w-full border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-base outline-none transition-all uppercase shadow-inner ${readOnly ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-[#304B9E] focus:border-rose-500'}`} value={data.title} onChange={e => setData({...data, title: e.target.value})} />
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Protocol List</label>
                {!readOnly && <button type="button" onClick={addQ} className="flex items-center gap-2 text-[10px] font-black text-rose-600 uppercase hover:text-rose-700 transition-colors"><PlusCircle size={14} /> New Inquiry</button>}
             </div>
             <div className="space-y-4">
                {data.questions?.map((q, idx) => (
                   <div key={idx} className="space-y-2 group p-6 bg-slate-50/50 rounded-3xl border-2 border-slate-100 relative animate-in zoom-in-95 duration-300">
                      <div className="flex items-center justify-between">
                         <span className="px-3 py-1 bg-[#304B9E] text-white rounded-lg font-black text-[8px] uppercase tracking-widest">Node {idx+1}</span>
                         {!readOnly && data.questions!.length > 1 && (
                            <button type="button" onClick={() => removeQ(idx)} className="p-1.5 bg-white text-slate-300 hover:text-red-500 rounded-lg shadow-sm border border-slate-100"><X size={14} strokeWidth={3}/></button>
                         )}
                      </div>
                      <textarea readOnly={readOnly} className={`w-full border border-slate-200 rounded-2xl p-4 font-bold text-sm outline-none transition-all shadow-inner uppercase h-20 resize-none ${readOnly ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-600 focus:border-rose-500'}`} placeholder="Enter Inquiry Question..." value={q} onChange={e => updateQ(idx, e.target.value)} />
                   </div>
                ))}
             </div>
          </div>
       </div>
    </EditorModalWrapper>
  );
};

/**
 * Lesson Content Editor Router Modal
 */
const LessonEditorModal = ({ lesson, onClose, onSave, readOnly }: { lesson: Lesson, onClose: () => void, onSave: (updated: Lesson) => void, readOnly?: boolean }) => {
  const [formData, setFormData] = useState<Lesson>({ ...lesson });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // High-fidelity specific editors
  if (formData.type === 'quiz') return <QuizEditor lesson={formData} onClose={onClose} onSave={onSave} readOnly={readOnly} />;
  if (formData.type === 'assignment') return <AssignmentEditor lesson={formData} onClose={onClose} onSave={onSave} readOnly={readOnly} />;
  if (formData.type === 'matching') return <MatchingEditor lesson={formData} onClose={onClose} onSave={onSave} readOnly={readOnly} />;
  if (formData.type === 'question-answer') return <QAEditor lesson={formData} onClose={onClose} onSave={onSave} readOnly={readOnly} />;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') return alert("Only PDF files permitted.");
      setFormData({ ...formData, content: file.name });
    }
  };

  const isPDF = formData.type === 'pdf';
  const colorClass = isPDF ? 'border-cyan-500' : 'border-[#F05A28]';
  const Icon = isPDF ? FileSearch : Edit3;

  return (
    <EditorModalWrapper title="Syllabus Architect" type={formData.type.toUpperCase()} icon={Icon} colorClass={colorClass} onClose={onClose} onSave={() => onSave(formData)} readOnly={readOnly}>
       <div className="space-y-6">
          <div className="space-y-1.5">
             <div className="flex items-center justify-between ml-1">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Label Name</label>
               {readOnly && <Lock size={12} className="text-slate-300" />}
             </div>
             <input readOnly={readOnly} className={`w-full border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-base outline-none transition-all uppercase shadow-inner ${readOnly ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-50 text-[#304B9E] focus:border-[#F05A28]'}`} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>

          {isPDF ? (
             <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Curriculum PDF Source</label>
                <div onClick={() => !readOnly && fileInputRef.current?.click()} className={`w-full h-48 border-4 border-dashed rounded-[2rem] transition-all flex flex-col items-center justify-center group relative overflow-hidden ${readOnly ? 'bg-slate-100 border-slate-200 cursor-not-allowed' : 'bg-slate-50 border-slate-100 hover:bg-cyan-50 hover:border-cyan-300 cursor-pointer'}`}>
                   <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileChange} />
                   <div className={`w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center mb-4 transition-transform ${readOnly ? 'bg-slate-200 text-slate-400' : 'bg-white text-cyan-500 group-hover:scale-110'}`}>
                      <FileUp size={32} strokeWidth={2.5} />
                   </div>
                   {formData.content ? (
                     <div className="text-center px-6">
                       <p className={`text-[10px] font-black uppercase tracking-widest mb-1 truncate max-w-xs ${readOnly ? 'text-slate-400' : 'text-[#304B9E]'}`}>{formData.content}</p>
                       {!readOnly && <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">File Verified</span>}
                     </div>
                   ) : <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Select Courseware PDF</p>}
                </div>
             </div>
          ) : (
            <div className="space-y-1.5">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Content / Resource Link</label>
               <textarea readOnly={readOnly} className={`w-full border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none transition-all h-40 resize-none shadow-inner ${readOnly ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-50 text-slate-600 focus:border-[#F05A28]'}`} placeholder="Enter HTML, Text, or Video URL..." value={formData.content || ''} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
            </div>
          )}
       </div>
    </EditorModalWrapper>
  );
};

export const CoursesAdminView: React.FC<CoursesAdminViewProps> = ({ 
  initialCourseId, 
  onExitEdit, 
  activeRole 
}) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v7');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [activeCourseId, setActiveCourseId] = useState<string | null>(initialCourseId || null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [editingLesson, setEditingLesson] = useState<{modId: string, lesson: Lesson} | null>(null);

  const isMainAdmin = activeRole === UserRole.MAIN_CENTER;
  const isSchoolAdmin = activeRole === UserRole.SUPER_ADMIN || activeRole === UserRole.SCHOOL_ADMIN;
  // School Admin manages access, Main Center Admin manages syllabus content
  const canModifyContent = isMainAdmin;
  const canModifyAccess = isMainAdmin || isSchoolAdmin;

  const currentCourse = useMemo(() => courses.find(c => c.id === activeCourseId), [courses, activeCourseId]);

  useEffect(() => {
    if (currentCourse) setExpandedModules(new Set(currentCourse.modules.map(m => m.id)));
  }, [activeCourseId]);

  const updateGlobalRegistry = (updatedCourse: Course) => {
    const next = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    setCourses(next);
    localStorage.setItem('ubook_courses_v7', JSON.stringify(next));
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'video': return <MonitorPlay size={16} strokeWidth={2.5} />;
      case 'quiz': return <Zap size={16} strokeWidth={2.5} fill="currentColor" />;
      case 'assignment': return <ClipboardList size={16} strokeWidth={2.5} />;
      case 'matching': return <Link size={16} strokeWidth={2.5} />;
      case 'question-answer': return <MessageSquareQuote size={16} strokeWidth={2.5} />;
      case 'pdf': return <FileSearch size={16} strokeWidth={2.5} />;
      default: return <BookOpen size={16} strokeWidth={2.5} />;
    }
  };

  const moveModule = (idx: number, direction: 'up' | 'down') => {
    if (!currentCourse || !canModifyContent) return;
    const newModules = [...currentCourse.modules];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newModules.length) return;
    [newModules[idx], newModules[targetIdx]] = [newModules[targetIdx], newModules[idx]];
    updateGlobalRegistry({ ...currentCourse, modules: newModules });
  };

  const moveLesson = (modId: string, idx: number, direction: 'up' | 'down') => {
    if (!currentCourse || !canModifyContent) return;
    updateGlobalRegistry({
      ...currentCourse,
      modules: currentCourse.modules.map(m => {
        if (m.id !== modId) return m;
        const newLessons = [...m.lessons];
        const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= newLessons.length) return m;
        [newLessons[idx], newLessons[targetIdx]] = [newLessons[targetIdx], newLessons[idx]];
        return { ...m, lessons: newLessons };
      })
    });
  };

  const toggleCourseVisibility = (id: string) => {
    if (!canModifyAccess) return;
    const c = courses.find(c => c.id === id);
    if (c) updateGlobalRegistry({ ...c, isPublished: !c.isPublished });
  };

  const toggleModuleVisibility = (modId: string) => {
    if (!currentCourse || !canModifyAccess) return;
    updateGlobalRegistry({ ...currentCourse, modules: currentCourse.modules.map(m => m.id === modId ? { ...m, isPublished: !m.isPublished } : m) });
  };

  const toggleLessonVisibility = (modId: string, lsnId: string) => {
    if (!currentCourse || !canModifyAccess) return;
    updateGlobalRegistry({ ...currentCourse, modules: currentCourse.modules.map(m => m.id === modId ? { ...m, lessons: m.lessons.map(l => l.id === lsnId ? { ...l, isPublished: !l.isPublished } : l) } : m) });
  };

  const addModule = () => {
    if (!currentCourse || !canModifyContent) return;
    const newMod: Module = { id: 'mod-' + Date.now(), title: 'NEW HUB MODULE', isPublished: true, lessons: [] };
    updateGlobalRegistry({ ...currentCourse, modules: [...currentCourse.modules, newMod] });
    setExpandedModules(prev => new Set([...prev, newMod.id]));
  };

  const deleteModule = (modId: string) => {
    if (currentCourse && canModifyContent && confirm("Erase this module?")) updateGlobalRegistry({ ...currentCourse, modules: currentCourse.modules.filter(m => m.id !== modId) });
  };

  const addLesson = (modId: string, type: Lesson['type']) => {
    if (!currentCourse || !canModifyContent) return;
    const newLesson: Lesson = { id: 'lsn-' + Date.now(), title: `NEW ${type.toUpperCase()}`, type, isPublished: true };
    updateGlobalRegistry({ ...currentCourse, modules: currentCourse.modules.map(m => m.id === modId ? { ...m, lessons: [...m.lessons, newLesson] } : m) });
  };

  const deleteLesson = (modId: string, lsnId: string) => {
    if (currentCourse && canModifyContent) updateGlobalRegistry({ ...currentCourse, modules: currentCourse.modules.map(m => m.id === modId ? { ...m, lessons: m.lessons.filter(l => l.id !== lsnId) } : m) });
  };

  const updateModuleTitle = (modId: string, title: string) => {
    if (currentCourse && canModifyContent) updateGlobalRegistry({ ...currentCourse, modules: currentCourse.modules.map(m => m.id === modId ? { ...m, title } : m) });
  };

  if (!activeCourseId) {
    return (
      <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500 font-sans">
        <div className="w-full bg-[#304B9E] rounded-2xl p-6 text-white shadow-xl border-b-[8px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-6 shrink-0 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-20"></div>
           <div className="flex items-center gap-5 relative z-10">
              <div className="p-4 bg-[#F05A28] rounded-2xl shadow-xl rotate-3"><Library size={32} strokeWidth={3} /></div>
              <div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Curriculum Hub</h2>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Manage Master Syllabus Registry</p>
              </div>
           </div>
           <div className="relative flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md z-10">
              <Search className="text-white/40" size={18} />
              <input type="text" placeholder="Search repository..." className="bg-transparent text-white font-black text-[11px] uppercase outline-none placeholder:text-white/20 w-48" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide pb-20 px-2">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (
                <div key={course.id} onClick={() => setActiveCourseId(course.id)} className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-slate-50 hover:border-[#304B9E] transition-all hover:shadow-2xl group cursor-pointer relative flex flex-col animate-in zoom-in duration-500">
                   <div className="flex items-center justify-between mb-8">
                      <div className={`p-4 rounded-2xl shadow-lg transition-transform group-hover:rotate-6 ${course.isPublished ? 'bg-indigo-50 text-[#304B9E]' : 'bg-slate-50 text-slate-300'}`}><Layers size={28} strokeWidth={3} /></div>
                      <AccessToggle active={!!course.isPublished} onToggle={() => toggleCourseVisibility(course.id)} label="COURSE ACCESS" disabled={!canModifyAccess} />
                   </div>
                   <h4 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter group-hover:text-[#F05A28] transition-colors mb-2 leading-none">{course.name}</h4>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-8">{course.category} • {course.level}</p>
                   <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${course.isPublished ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{course.isPublished ? 'Sync Active' : 'Locked'}</span>
                      </div>
                      <div className="p-2 bg-slate-50 text-[#304B9E] rounded-xl group-hover:bg-[#304B9E] group-hover:text-white transition-all shadow-sm">
                         {canModifyContent ? <Edit3 size={18} strokeWidth={3} /> : <Unlock size={18} strokeWidth={3} />}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden animate-in fade-in duration-500 font-sans">
      {editingLesson && <LessonEditorModal lesson={editingLesson.lesson} readOnly={!canModifyContent} onClose={() => setEditingLesson(null)} onSave={(updated) => { if (currentCourse) { const mod = currentCourse.modules.map(m => m.id === editingLesson.modId ? { ...m, lessons: m.lessons.map(l => l.id === updated.id ? updated : l) } : m); updateGlobalRegistry({ ...currentCourse, modules: mod }); } setEditingLesson(null); }} />}

      <div className="w-full bg-white border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center justify-between shrink-0 relative z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => setActiveCourseId(null)} className="p-3 bg-slate-50 text-[#304B9E] rounded-xl hover:bg-[#F05A28] hover:text-white transition-all active:scale-90 border border-slate-100 flex items-center gap-2">
             <ChevronLeft size={18} strokeWidth={4} />
             <span className="text-[10px] font-black uppercase tracking-widest pr-1">Back library</span>
          </button>
          <div className="h-10 w-px bg-slate-100"></div>
          <div>
             <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">
               {canModifyContent ? 'Curriculum Architect' : 'Access Controller'}
             </h2>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
               {currentCourse.name} {canModifyContent ? '' : '• READ-ONLY SYLLABUS'}
             </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-5 py-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-6 shadow-inner">
              <div className="flex flex-col">
                 <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Global Roadmap Status</span>
                 <span className={`text-[9px] font-black uppercase ${currentCourse.isPublished ? 'text-[#00a651]' : 'text-slate-400'}`}>{currentCourse.isPublished ? 'ONLINE' : 'OFFLINE'}</span>
              </div>
              <AccessToggle active={!!currentCourse.isPublished} onToggle={() => toggleCourseVisibility(currentCourse.id)} size="lg" disabled={!canModifyAccess} />
           </div>
           {canModifyContent && <button onClick={addModule} className="px-6 py-3 bg-slate-50 text-[#304B9E] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F05A28] hover:text-white transition-all flex items-center gap-2 border border-slate-200"><Plus size={16} /> New Module</button>}
           <button onClick={() => alert('Registry synchronized.')} className="px-8 py-3 bg-[#304B9E] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all active:scale-95 border-b-4 border-black/10 flex items-center gap-3"><Save size={16} /> Sync Changes</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20 pt-2 px-1">
         <div className="max-w-[1000px] mx-auto w-full space-y-6">
            {!canModifyContent && (
               <div className="bg-blue-50 border-2 border-indigo-100 p-6 rounded-[2rem] flex items-center gap-6 animate-in slide-in-from-top-4 duration-500">
                  <div className="p-3 bg-white text-[#304B9E] rounded-2xl shadow-md border border-indigo-100">
                     <ShieldCheck size={24} />
                  </div>
                  <div>
                     <h4 className="text-sm font-black text-[#304B9E] uppercase tracking-tighter">Access Management Mode</h4>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Curriculum content is read-only. You can toggle visibility for your learners below.</p>
                  </div>
               </div>
            )}

            {currentCourse.modules.map((mod, mIdx) => (
              <div key={mod.id} className="bg-white rounded-[2.5rem] border-2 border-slate-50 shadow-xl overflow-hidden animate-in fade-in duration-500">
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between group">
                   <div className="flex items-center gap-5 flex-1 min-w-0 mr-4">
                      {canModifyContent && (
                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => moveModule(mIdx, 'up')} className="text-slate-300 hover:text-[#304B9E]"><ChevronUp size={16} strokeWidth={3}/></button>
                           <button onClick={() => moveModule(mIdx, 'down')} className="text-slate-300 hover:text-[#304B9E]"><ChevronDown size={16} strokeWidth={3}/></button>
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-xl border-b-4 border-black/10 transition-all rotate-3 shrink-0 ${mod.isPublished ? 'bg-[#304B9E] text-white' : 'bg-slate-200 text-slate-400'}`}>{mIdx + 1}</div>
                      <div className="flex-1 min-w-0">
                         {canModifyContent ? (
                           <input className="w-full bg-transparent font-black text-xl uppercase tracking-tighter text-[#304B9E] outline-none focus:border-b-2 border-[#F05A28] px-1" value={mod.title} onChange={(e) => updateModuleTitle(mod.id, e.target.value)} />
                         ) : (
                           <h4 className={`text-xl font-black uppercase tracking-tighter leading-none px-1 flex items-center gap-2 ${mod.isPublished ? 'text-[#304B9E]' : 'text-slate-400'}`}>
                             {mod.title} {!canModifyContent && <Lock size={14} className="text-slate-300" />}
                           </h4>
                         )}
                         <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-2 flex items-center gap-1.5 ml-1"><ShieldCheck size={12} className={mod.isPublished ? 'text-emerald-500' : 'text-slate-300'} /> Module Node Access</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-8">
                      {canModifyContent && <button onClick={() => deleteModule(mod.id)} className="p-2 text-slate-200 hover:text-[#ec2027] transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18}/></button>}
                      <div className="h-10 w-px bg-slate-200"></div>
                      <AccessToggle active={!!mod.isPublished} onToggle={() => toggleModuleVisibility(mod.id)} label="MODULE" disabled={!canModifyAccess} />
                      <button onClick={() => { const next = new Set(expandedModules); if(next.has(mod.id)) next.delete(mod.id); else next.add(mod.id); setExpandedModules(next); }} className="p-2.5 bg-white text-slate-300 hover:text-[#304B9E] rounded-xl border border-slate-100 transition-all shadow-sm"><ChevronDown size={20} strokeWidth={4} className={`transition-transform duration-300 ${expandedModules.has(mod.id) ? 'rotate-180' : ''}`} /></button>
                   </div>
                </div>

                {expandedModules.has(mod.id) && (
                  <div className="p-8 bg-white animate-in slide-in-from-top-4 duration-500 space-y-10">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mx-2">
                           <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-2"><BookOpen size={14} className="text-[#3b82f6]" /> Learning Nodes (Tasks)</h5>
                           {canModifyContent && <div className="flex gap-2">{['video', 'text', 'pdf'].map((t) => <button key={t} onClick={() => addLesson(mod.id, t as any)} className="px-3 py-1 bg-slate-50 hover:bg-[#F05A28] hover:text-white text-slate-400 rounded-lg font-black text-[7px] uppercase tracking-widest transition-all border border-slate-100 shadow-sm flex items-center gap-1.5"><Plus size={8} /> {t}</button>)}</div>}
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                           {mod.lessons.filter(l => ['video', 'text', 'pdf'].includes(l.type)).map((lesson, lIdx) => (
                             <div key={lesson.id} className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${lesson.isPublished ? 'bg-white border-slate-100 shadow-md hover:border-[#304B9E]' : 'bg-slate-50 border-transparent opacity-60'}`}>
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                   {canModifyContent && <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => moveLesson(mod.id, lIdx, 'up')} className="text-slate-300 hover:text-[#304B9E]"><ChevronUp size={14}/></button><button onClick={() => moveLesson(mod.id, lIdx, 'down')} className="text-slate-300 hover:text-[#304B9E]"><ChevronDown size={14}/></button></div>}
                                   <div className={`w-10 h-10 rounded-xl shadow-lg flex items-center justify-center shrink-0 ${lesson.isPublished ? 'bg-[#304B9E] text-white rotate-3 group-hover:rotate-0 transition-transform' : 'bg-slate-200 text-slate-400'}`}>{getTaskIcon(lesson.type)}</div>
                                   <div className="flex-1 min-w-0">
                                     <p className={`text-[11px] font-black uppercase tracking-tight leading-none mb-1.5 truncate flex items-center gap-2 ${lesson.isPublished ? 'text-[#304B9E]' : 'text-slate-400'}`}>
                                       {lesson.title} {!canModifyContent && <Lock size={10} className="text-slate-300" />}
                                     </p>
                                     <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded-md text-[7px] font-black uppercase tracking-widest border border-slate-200">{lesson.type}</span>
                                   </div>
                                </div>
                                <div className="flex items-center gap-4">
                                   <div className="flex items-center gap-1">
                                      <button onClick={() => setEditingLesson({ modId: mod.id, lesson })} className="p-2 text-slate-300 hover:text-[#304B9E] transition-all opacity-0 group-hover:opacity-100">
                                         {canModifyContent ? <Edit3 size={16}/> : <Eye size={16} />}
                                      </button>
                                      {canModifyContent && <button onClick={() => deleteLesson(mod.id, lesson.id)} className="p-2 text-slate-300 hover:text-[#ec2027] transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button>}
                                   </div>
                                   <div className="h-8 w-px bg-slate-100 mx-1"></div>
                                   <AccessToggle active={!!lesson.isPublished} onToggle={() => toggleLessonVisibility(mod.id, lesson.id)} size="sm" label="TASK" disabled={!canModifyAccess} />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mx-2">
                           <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-2"><Zap size={14} className="text-[#F05A28]" fill="currentColor" /> Assessment Nodes (Tests)</h5>
                           {canModifyContent && <div className="flex gap-2">{['quiz', 'assignment', 'matching', 'question-answer'].map((t) => <button key={t} onClick={() => addLesson(mod.id, t as any)} className="px-3 py-1 bg-slate-50 hover:bg-[#F05A28] hover:text-white text-slate-400 rounded-lg font-black text-[7px] uppercase tracking-widest transition-all border border-slate-100 shadow-sm flex items-center gap-1.5"><Plus size={8} /> {t.replace('question-answer', 'Q&A')}</button>)}</div>}
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                           {mod.lessons.filter(l => !['video', 'text', 'pdf'].includes(l.type)).map((lesson, lIdx) => (
                             <div key={lesson.id} className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${lesson.isPublished ? 'bg-white border-slate-100 shadow-md hover:border-[#F05A28]' : 'bg-slate-50 border-transparent opacity-60'}`}>
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                   {canModifyContent && <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => moveLesson(mod.id, lIdx, 'up')} className="text-slate-300 hover:text-[#304B9E]"><ChevronUp size={14}/></button><button onClick={() => moveLesson(mod.id, lIdx, 'down')} className="text-slate-300 hover:text-[#304B9E]"><ChevronDown size={14}/></button></div>}
                                   <div className={`w-10 h-10 rounded-xl shadow-lg flex items-center justify-center shrink-0 ${lesson.isPublished ? 'bg-[#F05A28] text-white rotate-3 group-hover:rotate-0 transition-transform' : 'bg-slate-200 text-slate-400'}`}>{getTaskIcon(lesson.type)}</div>
                                   <div className="flex-1 min-w-0">
                                     <p className={`text-[11px] font-black uppercase tracking-tight leading-none mb-1.5 truncate flex items-center gap-2 ${lesson.isPublished ? 'text-[#304B9E]' : 'text-slate-400'}`}>
                                       {lesson.title} {!canModifyContent && <Lock size={10} className="text-slate-300" />}
                                     </p>
                                     <span className="px-2 py-0.5 bg-orange-50 text-[#F05A28] rounded-md text-[7px] font-black uppercase tracking-widest border border-orange-100">Assessment Node</span>
                                   </div>
                                </div>
                                <div className="flex items-center gap-4">
                                   <div className="flex items-center gap-1">
                                      <button onClick={() => setEditingLesson({ modId: mod.id, lesson })} className="p-2 text-slate-300 hover:text-[#304B9E] transition-all opacity-0 group-hover:opacity-100">
                                         {canModifyContent ? <Settings2 size={16}/> : <Eye size={16} />}
                                      </button>
                                      {canModifyContent && <button onClick={() => deleteLesson(mod.id, lesson.id)} className="p-2 text-slate-300 hover:text-[#ec2027] transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button>}
                                   </div>
                                   <div className="h-8 w-px bg-slate-100 mx-1"></div>
                                   <AccessToggle active={!!lesson.isPublished} onToggle={() => toggleLessonVisibility(mod.id, lesson.id)} size="sm" label="TEST" disabled={!canModifyAccess} />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>

                     {canModifyContent && <button onClick={addModule} className="w-full p-6 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center gap-4 text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] hover:border-[#304B9E] hover:text-[#304B9E] transition-all group"><Plus size={24} className="group-hover:rotate-90 transition-transform" /> Initialize module</button>}
                  </div>
                )}
              </div>
            ))}

            <div className="bg-[#304B9E] rounded-[2.5rem] p-12 text-center shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="w-20 h-20 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mx-auto mb-6 text-[#304B9E] rotate-6 group-hover:rotate-0 transition-transform duration-500 border-b-6 border-slate-100"><CheckCircle2 size={40} strokeWidth={3} /></div>
               <h4 className="text-3xl font-black text-white uppercase tracking-tighter">Architecture Synchronized</h4>
               <p className="text-indigo-200 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">All changes are live across the registry.</p>
            </div>
         </div>
      </div>
    </div>
  );
};
