
import React, { useState, useMemo } from 'react';
import { MOCK_COURSES, MOCK_CLASSES } from '../../constants.tsx';
import { Course, Module, Lesson, QuizQuestion } from '../../types.ts';
import { 
  CheckCircle2, 
  Zap, 
  ChevronLeft, 
  Plus, 
  X, 
  Save, 
  Trash2, 
  Check, 
  ListOrdered,
  Search,
  ChevronDown,
  Layers,
  Eye,
  ArrowRight,
  FileEdit,
  PlusCircle,
  Type
} from 'lucide-react';

const SwitchToggle = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className={`w-10 h-5 rounded-full relative transition-all duration-300 shadow-inner overflow-hidden ${active ? 'bg-[#00a651]' : 'bg-slate-200'}`}
  >
    <div 
      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${active ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

export const QuizViewer = ({ 
  questions, 
  onClose, 
  title 
}: { 
  questions: QuizQuestion[], 
  onClose: () => void,
  title: string
}) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[85vh] shadow-2xl border-t-[8px] border-[#6366f1] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-indigo-50 text-[#6366f1] rounded-xl shadow-sm">
               <Eye size={20} strokeWidth={3} />
             </div>
             <div>
               <h2 className="text-lg font-black text-[#304B9E] uppercase tracking-tighter leading-none">Exam Preview</h2>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 truncate max-w-[200px]">{title}</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 text-slate-300 hover:text-[#ec2027] transition-all rounded-xl">
            <X size={18} strokeWidth={4} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-5">
          {questions.length > 0 ? (
            questions.map((q, i) => (
              <div key={q.id} className="bg-slate-50/50 rounded-2xl p-6 border-2 border-slate-100/50">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-lg bg-[#304B9E] text-white flex items-center justify-center font-black text-lg shadow-lg shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 space-y-4">
                    <h4 className="text-lg font-black text-[#304B9E] uppercase tracking-tight leading-tight">
                      {q.question || 'No question text provided.'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((opt, oIdx) => (
                        <div 
                          key={oIdx} 
                          className={`p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all ${
                            q.correctAnswer === oIdx 
                              ? 'bg-[#00a651] border-[#00a651] text-white shadow-md' 
                              : 'bg-white border-slate-100 text-slate-400'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded flex items-center justify-center font-black text-xs ${
                            q.correctAnswer === oIdx ? 'bg-white/20' : 'bg-slate-100'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="font-black text-xs uppercase tracking-tight truncate">
                            {opt || 'Empty Option'}
                          </span>
                          {q.correctAnswer === oIdx && <Check size={14} strokeWidth={4} className="ml-auto" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center opacity-30">
               <Layers size={64} className="mx-auto text-slate-200 mb-4" />
               <p className="text-sm font-black uppercase tracking-widest text-slate-400">No questions configured.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0">
           <button 
             onClick={onClose}
             className="w-full py-5 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#6366f1] hover:text-white transition-all border-b-4 border-black/10 active:scale-95"
           >
             Close Preview
           </button>
        </div>
      </div>
    </div>
  );
};

export const QuizBuilder = ({ 
  initialQuestions, 
  onBack, 
  onSave, 
  title 
}: { 
  initialQuestions: QuizQuestion[], 
  onBack: () => void, 
  onSave: (questions: QuizQuestion[]) => void,
  title: string
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    initialQuestions.length > 0 ? [...initialQuestions] : [{
      id: Date.now().toString(),
      question: '',
      options: ['', ''],
      correctAnswer: 0
    }]
  );
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const MAX_QUESTIONS = 10;

  const handleAddQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) return;
    setQuestions([...questions, { id: Date.now().toString(), question: '', options: ['', ''], correctAnswer: 0 }]);
    setActiveIdx(questions.length);
  };

  const updateQuestion = (data: Partial<QuizQuestion>) => {
    const newQs = [...questions];
    newQs[activeIdx] = { ...newQs[activeIdx], ...data };
    setQuestions(newQs);
  };

  const removeQuestion = (idx: number) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, i) => i !== idx));
    setActiveIdx(Math.max(0, activeIdx - 1));
  };

  const activeQ = questions[activeIdx];
  const isReady = questions.every(q => q.question.trim() !== '' && q.options.every(opt => opt.trim() !== ''));

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right duration-300 overflow-hidden">
      <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#00a651] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
           <button onClick={onBack} className="p-3 bg-white/10 rounded-xl hover:bg-[#ec2027] transition-all border border-white/10 active:scale-90">
             <ChevronLeft size={24} strokeWidth={4} />
           </button>
           <div>
             <h2 className="text-xl font-black uppercase tracking-tight leading-none">Exam <span className="text-[#F05A28]">Builder</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1 truncate max-w-[250px]">{title}</p>
           </div>
        </div>

        <button 
          onClick={() => onSave(questions)}
          disabled={!isReady}
          className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all border-b-4 border-black/20 flex items-center gap-3 ${
            isReady ? 'bg-[#00a651] text-white hover:scale-105 active:scale-95' : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
          }`}
        >
          <Save size={18} strokeWidth={3} /> Save Exam
        </button>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden pb-4">
        {/* Left Nav */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-xl overflow-hidden flex flex-col">
          <div className="p-6 pb-4 flex justify-between items-center shrink-0 border-b-4 border-slate-50">
             <h3 className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest flex items-center gap-2">
               <ListOrdered size={16} className="text-[#00a651]" /> Questions Log
             </h3>
             <button onClick={handleAddQuestion} disabled={questions.length >= MAX_QUESTIONS} className={`p-2 rounded-xl transition-all shadow-md ${questions.length < MAX_QUESTIONS ? 'bg-[#00a651] text-white hover:scale-110 active:scale-90' : 'bg-slate-200 text-slate-400'}`}>
               <Plus size={20} strokeWidth={4} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 p-6 bg-slate-50/50">
             {questions.map((q, i) => (
               <div key={q.id} onClick={() => setActiveIdx(i)} className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer group ${activeIdx === i ? 'bg-white border-[#00a651] shadow-lg scale-[1.02]' : 'bg-white/50 border-transparent hover:border-slate-200 hover:bg-white'}`}>
                 <div className="flex items-center gap-4 min-w-0">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shadow-md transition-all ${activeIdx === i ? 'bg-[#00a651] text-white' : 'bg-slate-100 text-slate-400'}`}>{i + 1}</span>
                    <span className={`text-[12px] font-black uppercase tracking-tight truncate ${activeIdx === i ? 'text-[#304B9E]' : 'text-slate-400'}`}>{q.question || 'New Question...'}</span>
                 </div>
                 {questions.length > 1 && <button onClick={(e) => { e.stopPropagation(); removeQuestion(i); }} className="p-2 text-slate-200 hover:text-[#ec2027] opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>}
               </div>
             ))}
             {questions.length < MAX_QUESTIONS && (
               <button onClick={handleAddQuestion} className="w-full p-5 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-3 text-slate-300 font-black text-[10px] uppercase tracking-widest hover:border-[#00a651] hover:text-[#00a651] transition-all group">
                  <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" /> Add Task {questions.length + 1}
               </button>
             )}
          </div>
        </div>

        {/* Editor Area */}
        <div className="col-span-12 lg:col-span-8 overflow-hidden h-full">
           {activeQ ? (
             <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-2 border-slate-100 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F05A28]/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                
                <div className="flex-1 overflow-y-auto scrollbar-hide space-y-8 relative z-10">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Type size={14} className="text-[#ec2027]" /> Assessment Context
                      </label>
                      <textarea 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 font-black text-[#304B9E] text-lg outline-none focus:border-[#00a651] shadow-inner transition-all resize-none" 
                        placeholder="Enter the challenge or question content here..." 
                        rows={3}
                        value={activeQ.question} 
                        onChange={(e) => updateQuestion({ question: e.target.value })} 
                      />
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <Layers size={14} className="text-[#3b82f6]" /> Response Nodes
                         </label>
                         {activeQ.options.length < 5 && (
                           <button 
                             onClick={() => updateQuestion({ options: [...activeQ.options, ''] })} 
                             className="text-[10px] font-black uppercase tracking-widest text-[#00a651] hover:text-[#304B9E] flex items-center gap-1 transition-colors"
                           >
                             <PlusCircle size={14} /> Add Option
                           </button>
                         )}
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {activeQ.options.map((opt, oIdx) => (
                          <div key={oIdx} className={`group flex items-center gap-4 p-3 rounded-[1.5rem] border-2 transition-all duration-300 ${activeQ.correctAnswer === oIdx ? 'bg-green-50 border-[#00a651] shadow-md' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                             <button 
                               onClick={() => updateQuestion({ correctAnswer: oIdx })} 
                               className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm transition-all flex-shrink-0 shadow-lg ${activeQ.correctAnswer === oIdx ? 'bg-[#00a651] text-white scale-110 rotate-3' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'}`}
                             >
                               {activeQ.correctAnswer === oIdx ? <Check size={24} strokeWidth={4} /> : String.fromCharCode(65 + oIdx)}
                             </button>
                             <div className="flex-1 flex items-center gap-2">
                                <input 
                                  className="flex-1 bg-transparent font-black text-[#304B9E] text-sm outline-none px-2 uppercase placeholder:text-slate-200" 
                                  placeholder={`Define Option ${String.fromCharCode(65 + oIdx)}...`} 
                                  value={opt} 
                                  onChange={(e) => { 
                                    const nextOpts = [...activeQ.options]; 
                                    nextOpts[oIdx] = e.target.value; 
                                    updateQuestion({ options: nextOpts }); 
                                  }} 
                                />
                                {activeQ.options.length > 2 && (
                                  <button 
                                    onClick={() => {
                                      const nextOpts = activeQ.options.filter((_, i) => i !== oIdx);
                                      updateQuestion({ 
                                        options: nextOpts,
                                        correctAnswer: activeQ.correctAnswer === oIdx ? 0 : activeQ.correctAnswer > oIdx ? activeQ.correctAnswer - 1 : activeQ.correctAnswer
                                      });
                                    }}
                                    className="p-2 text-slate-100 hover:text-[#ec2027] transition-colors"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                )}
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t-2 border-slate-50 relative z-10 flex justify-end gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                       <CheckCircle2 size={16} className={isReady ? 'text-[#00a651]' : 'text-slate-300'} />
                       <span className={`text-[10px] font-black uppercase tracking-widest ${isReady ? 'text-[#304B9E]' : 'text-slate-300'}`}>
                         {isReady ? 'System Validated' : 'Validation Pending'}
                       </span>
                    </div>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-10">
                <div className="p-10 bg-slate-100 rounded-[3rem] shadow-inner mb-6">
                   <ListOrdered size={80} className="text-slate-300" strokeWidth={1} />
                </div>
                <h4 className="text-2xl font-black text-[#304B9E] uppercase tracking-widest">Initialize Node</h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Select or create a question to begin editing</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

interface TestsViewProps {
  checkPermission?: (category: any, action: string) => boolean;
}

export const TestsView: React.FC<TestsViewProps> = ({ checkPermission }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v3');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [selectedId, setSelectedId] = useState<'all' | string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingContext, setEditingContext] = useState<{ courseId: string, moduleId: string } | null>(null);

  const canEdit = checkPermission?.('courses', 'edit') ?? true;

  const filteredModules = useMemo(() => {
    let baseModules: (Module & { courseName?: string, courseId: string })[] = [];

    if (selectedId === 'all') {
      courses.forEach(c => {
        c.modules.forEach(m => {
          baseModules.push({ ...m, courseName: c.name, courseId: c.id });
        });
      });
    } else {
      const c = courses.find(c => c.id === selectedId);
      if (c) baseModules = c.modules.map(m => ({ ...m, courseName: c.name, courseId: c.id }));
    }

    return baseModules.filter(m => 
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedId, courses, searchTerm]);

  const handleSaveQuiz = (questions: QuizQuestion[]) => {
    if (!editingContext) return;
    
    const { courseId, moduleId } = editingContext;
    const updatedCourses = courses.map(c => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        modules: c.modules.map(m => {
          if (m.id !== moduleId) return m;
          
          const lessons = [...m.lessons];
          const quizIdx = lessons.findIndex(l => l.type === 'quiz');
          
          if (quizIdx >= 0) {
            lessons[quizIdx] = { ...lessons[quizIdx], quiz: questions, isPublished: true };
          } else {
            lessons.push({
              id: 'quiz-' + Date.now(),
              title: 'Module Assessment',
              type: 'quiz',
              quiz: questions,
              isPublished: true
            });
          }
          
          return { ...m, lessons };
        })
      };
    });

    setCourses(updatedCourses);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(updatedCourses));
    setEditingContext(null);
    alert('Exam successfully updated across all hub instances.');
  };

  const togglePublish = (courseId: string, moduleId: string) => {
     if (!canEdit) return;
     const updatedCourses = courses.map(c => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          modules: c.modules.map(m => {
            if (m.id !== moduleId) return m;
            return {
              ...m,
              lessons: m.lessons.map(l => l.type === 'quiz' ? { ...l, isPublished: !l.isPublished } : l)
            };
          })
        };
     });
     setCourses(updatedCourses);
     localStorage.setItem('ubook_courses_v3', JSON.stringify(updatedCourses));
  };

  if (editingContext) {
    const course = courses.find(c => c.id === editingContext.courseId);
    const module = course?.modules.find(m => m.id === editingContext.moduleId);
    const quiz = module?.lessons.find(l => l.type === 'quiz');

    return (
      <QuizBuilder 
        title={module?.title || 'System Exam'} 
        initialQuestions={quiz?.quiz || []} 
        onBack={() => setEditingContext(null)} 
        onSave={handleSaveQuiz} 
      />
    );
  }

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      {/* Compact Header */}
      <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#6366f1] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-3 relative z-10">
           <div className="p-2.5 bg-[#6366f1] rounded-lg text-white shadow-lg rotate-3">
             <Zap size={22} strokeWidth={3} fill="currentColor" />
           </div>
           <div>
             <h2 className="text-lg md:text-xl font-black leading-none tracking-tight uppercase">Exam <span className="text-[#F05A28]">Control</span></h2>
             <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1">Global hub assessment authority</p>
           </div>
        </div>
      </div>

      {/* Control Strip */}
      <div className="w-full bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-2.5 flex-shrink-0">
        <div className="flex-1 relative w-full group">
          <select 
            value={selectedId} 
            onChange={(e) => setSelectedId(e.target.value)} 
            className="w-full bg-slate-50 pl-4 pr-10 py-2.5 rounded-xl border border-slate-100 outline-none font-black text-[10px] text-[#304B9E] uppercase appearance-none cursor-pointer focus:border-[#6366f1] transition-all shadow-inner"
          >
            <option value="all">All Registered Programs</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-[#6366f1] transition-colors" />
        </div>
        
        <div className="flex-[1.5] relative w-full group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#6366f1] transition-colors" />
          <input 
            type="text" 
            placeholder="Search exam context..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl border border-slate-100 outline-none font-black text-[10px] text-[#304B9E] uppercase placeholder:text-slate-200 focus:border-[#6366f1] transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredModules.map((module, i) => {
            const quizLesson = module.lessons.find(l => l.type === 'quiz');
            const isActive = quizLesson?.isPublished || false;
            return (
              <div key={module.id} className={`group bg-white rounded-[2rem] p-6 shadow-md border-4 transition-all hover:shadow-xl flex flex-col gap-4 relative overflow-hidden ${isActive ? 'border-emerald-50 hover:border-emerald-200' : 'border-slate-50 hover:border-slate-200'}`}>
                <div className="flex items-center justify-between relative z-10">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-md border-b-2 border-black/10 transition-all ${isActive ? 'bg-[#00a651] text-white rotate-3' : 'bg-slate-100 text-slate-300'}`}>
                    {isActive ? <Zap size={18} fill="currentColor" /> : i + 1}
                  </div>
                  <SwitchToggle active={isActive} onClick={() => togglePublish(module.courseId, module.id)} />
                </div>

                <div className="min-w-0 relative z-10">
                  <span className="px-2 py-0.5 bg-blue-50 text-[#304B9E] rounded-md text-[8px] font-black uppercase tracking-widest border border-blue-100 mb-2 inline-block">
                    {module.courseName}
                  </span>
                  <h4 className="text-base font-black text-[#304B9E] uppercase tracking-tight leading-tight group-hover:text-[#6366f1] transition-colors line-clamp-1">{module.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                     <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00a651] animate-pulse' : 'bg-slate-300'}`}></div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{isActive ? 'Live Assessment' : 'Draft Protocol'}</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t-2 border-slate-50 flex items-center gap-2 relative z-10">
                  {canEdit ? (
                    <button 
                      onClick={() => setEditingContext({ courseId: module.courseId, moduleId: module.id })} 
                      className="flex-1 py-3 bg-[#304B9E] text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#6366f1] transition-all flex items-center justify-center gap-2 shadow-md border-b-4 border-black/10 active:scale-95 group/edit"
                    >
                      <FileEdit size={14} strokeWidth={3} className="group-hover/edit:rotate-12 transition-transform" /> 
                      Edit Exam
                    </button>
                  ) : (
                    <button 
                      className="flex-1 py-3 bg-slate-50 text-slate-400 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#304B9E] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                    >
                      <Eye size={14} strokeWidth={3} /> Preview
                    </button>
                  )}
                  <button className="p-3 bg-white text-slate-200 rounded-xl border-2 border-slate-50 hover:text-[#ec2027] hover:border-red-100 transition-all shadow-sm">
                     <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
