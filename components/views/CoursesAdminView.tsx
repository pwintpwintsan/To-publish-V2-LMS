
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_COURSES, LEVELS } from '../../constants.tsx';
import { Course, Module, Lesson } from '../../types.ts';
import { QuizBuilder } from './TestsView.tsx';
import { 
  BookOpen, 
  ChevronLeft, 
  Type, 
  Layers,
  Clock,
  Zap,
  MonitorPlay,
  Edit3,
  FileText,
  PlusCircle,
  UploadCloud,
  Settings2,
  ChevronRight,
  Layout,
  Globe,
  ImageIcon,
  Tag,
  Signal,
  ChevronDown,
  Search,
  Users,
  Trash2,
  PlayCircle,
  X,
  CheckCircle2,
  Plus,
  Eye
} from 'lucide-react';

interface CoursesAdminViewProps {
  initialCourseId?: string | null;
  onExitEdit?: () => void;
  onPreviewCourse?: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
}

const NewCourseModal = ({ onClose, onSave }: { onClose: () => void, onSave: (course: Course) => void }) => {
  const [courseName, setCourseName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Starter Level 1');

  const savedCoursesTemplates = [
    "Starter Level 1", "Starter Level 2", "Starter Level 3", "Starter Level 4",
    "Mover Level 1", "Mover Level 2", "Mover Level 3", "Mover Level 4", "Mover Level 5"
  ];

  const handleCreate = () => {
    if (!courseName.trim()) return;
    
    const newCourse: Course = {
      id: 'course-' + Date.now(),
      name: courseName,
      isPurchased: true,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      description: `Official ${selectedTemplate} curriculum module for U Book Store learners.`,
      category: selectedTemplate.includes('Starter') ? 'Starter Program' : 'Mover Program',
      level: selectedTemplate,
      duration: "15 Hours",
      lastUpdated: new Date().toISOString(),
      modules: [
        {
          id: 'm1-' + Date.now(),
          title: 'Introduction & Basics',
          lessons: [
            { id: 'l1-' + Date.now(), title: 'Welcome to the Course', type: 'video', isPublished: true }
          ]
        }
      ]
    };
    onSave(newCourse);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#ec2027] relative animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16"></div>
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-red-50 text-[#304B9E] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-red-100 rotate-3">
              <PlusCircle size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Add New Class</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Hub Curriculum Registry</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Layers size={12} className="text-[#ec2027]" /> Choose Template (9 Options)
            </label>
            <div className="relative">
              <select 
                className="w-full bg-slate-50 px-5 py-4 rounded-2xl border-2 border-slate-100 outline-none font-black text-[#304B9E] text-sm uppercase appearance-none focus:border-[#ec2027] transition-all cursor-pointer shadow-inner"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                {savedCoursesTemplates.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Type size={12} className="text-[#3b82f6]" /> Enter Class Name
            </label>
            <input 
              required
              type="text" 
              placeholder="e.g. Junior Coders Group 1" 
              className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#ec2027] focus:bg-white outline-none font-black text-base text-[#304B9E] transition-all shadow-inner"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
           <button 
             onClick={onClose}
             className="py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
           >
              Cancel
           </button>
           <button 
             onClick={handleCreate}
             disabled={!courseName.trim()}
             className={`py-5 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 border-b-4 border-black/10 transition-all active:scale-95 ${
               courseName.trim() ? 'bg-[#ec2027] hover:bg-[#00a651]' : 'bg-slate-300 cursor-not-allowed grayscale'
             }`}
           >
              <CheckCircle2 size={18} strokeWidth={3} /> add class
           </button>
        </div>
      </div>
    </div>
  );
};

const CourseMetadataEditor = ({ course, onUpdate }: { course: Course, onUpdate: (data: Partial<Course>) => void }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
        <div className="p-3 bg-[#304B9E] text-white rounded-xl shadow-md">
          <Settings2 size={24} strokeWidth={3} />
        </div>
        <div>
          <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Program Base</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Curriculum Identity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Type size={14} className="text-[#ec2027]" /> Program Name
            </label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-black text-[#304B9E] text-sm outline-none focus:border-[#304B9E] transition-all shadow-inner"
              value={course.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Tag size={14} className="text-[#3b82f6]" /> Category
              </label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-bold text-xs text-[#304B9E] outline-none appearance-none"
                value={course.category}
                onChange={(e) => onUpdate({ category: e.target.value })}
              >
                <option>Standard Curriculum</option>
                <option>Robotics</option>
                <option>AI Foundations</option>
                <option>Digital Literacy</option>
                <option>Starter Program</option>
                <option>Mover Program</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Signal size={14} className="text-[#00a651]" /> Difficulty
              </label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-bold text-xs text-[#304B9E] outline-none appearance-none"
                value={course.level}
                onChange={(e) => onUpdate({ level: e.target.value })}
              >
                <option>Foundation</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Elite</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FileText size={14} className="text-slate-400" /> Syllabus Abstract
            </label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-600 text-sm outline-none focus:border-[#304B9E] transition-all resize-none shadow-inner"
              rows={3}
              value={course.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-6">
           <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <ImageIcon size={14} className="text-[#3b82f6]" /> Cover Artwork
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-bold text-[#304B9E] text-xs outline-none focus:border-[#304B9E] transition-all shadow-inner"
                  value={course.thumbnail}
                  onChange={(e) => onUpdate({ thumbnail: e.target.value })}
                />
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
           </div>
           
           <div className="aspect-video w-full rounded-3xl overflow-hidden border-4 border-white shadow-xl relative group">
              <img src={course.thumbnail} className="w-full h-full object-cover" alt="Preview" />
           </div>
        </div>
      </div>
    </div>
  );
};

// Main CoursesAdminView component fix
export const CoursesAdminView: React.FC<CoursesAdminViewProps> = ({ 
  initialCourseId, 
  onExitEdit, 
  onPreviewCourse,
  checkPermission 
}) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v3');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });
  const [editingCourseId, setEditingCourseId] = useState<string | null>(initialCourseId || null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentCourse = useMemo(() => 
    courses.find(c => c.id === editingCourseId), 
    [courses, editingCourseId]
  );

  const filteredCourses = useMemo(() => 
    courses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [courses, searchTerm]
  );

  const handleUpdateCourse = (data: Partial<Course>) => {
    if (!editingCourseId) return;
    const updated = courses.map(c => c.id === editingCourseId ? { ...c, ...data } : c);
    setCourses(updated);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(updated));
  };

  const handleCreateCourse = (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    setCourses(updated);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(updated));
    setEditingCourseId(newCourse.id);
    setIsNewModalOpen(false);
  };

  if (editingCourseId && currentCourse) {
     return (
       <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right duration-500 overflow-hidden">
          <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#ec2027] flex items-center justify-between shrink-0">
             <div className="flex items-center gap-6">
                <button onClick={() => { setEditingCourseId(null); if(onExitEdit) onExitEdit(); }} className="p-3 bg-white/10 rounded-xl hover:bg-[#ec2027] transition-all border border-white/10 active:scale-90">
                  <ChevronLeft size={24} strokeWidth={4} />
                </button>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight leading-none">Edit <span className="text-[#F05A28]">Course</span></h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1 truncate max-w-[250px]">{currentCourse.name}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                <button 
                  onClick={() => onPreviewCourse?.(currentCourse.id)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-[#F05A28] text-white rounded-xl transition-all border border-white/20 active:scale-95 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                >
                   <PlayCircle size={16} /> Preview
                </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                <CourseMetadataEditor course={currentCourse} onUpdate={handleUpdateCourse} />
                
                <div className="mt-12 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter">Course Modules</h4>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-[#304B9E] rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-200">
                      <Plus size={16} /> Add Module
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {currentCourse.modules.map((mod, idx) => (
                      <div key={mod.id} className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#304B9E] text-white flex items-center justify-center font-black">{idx + 1}</div>
                            <h5 className="font-black text-[#304B9E] uppercase">{mod.title}</h5>
                         </div>
                         <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-300 hover:text-[#304B9E] transition-all"><Edit3 size={18} /></button>
                            <button className="p-2 text-slate-300 hover:text-[#ec2027] transition-all"><Trash2 size={18} /></button>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </div>
       </div>
     );
  }

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      {isNewModalOpen && <NewCourseModal onClose={() => setIsNewModalOpen(false)} onSave={handleCreateCourse} />}
      
      <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-3 relative z-10">
           <div className="p-2.5 bg-[#ec2027] rounded-lg text-white shadow-lg rotate-3">
             <Settings2 size={22} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-lg md:text-xl font-black leading-none tracking-tight uppercase">Course <span className="text-[#F05A28]">Architect</span></h2>
             <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1">LMS Content Hub Authority</p>
           </div>
        </div>
        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F05A28] text-white rounded-lg font-black text-[9px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all border-b-4 border-black/10 relative z-10"
        >
          <PlusCircle size={14} strokeWidth={3} />
          <span>New Course</span>
        </button>
      </div>

      <div className="w-full bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-2.5 flex-shrink-0">
        <div className="flex-1 relative w-full group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#304B9E] transition-colors" />
          <input 
            type="text" 
            placeholder="Search catalog by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl border border-slate-100 outline-none font-black text-[10px] text-[#304B9E] uppercase placeholder:text-slate-200 focus:border-[#304B9E] transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="group bg-white rounded-[2rem] p-6 shadow-md border-4 border-slate-50 hover:border-[#F05A28]/20 transition-all hover:shadow-xl flex flex-col gap-4 relative overflow-hidden">
                <div className="aspect-video w-full rounded-2xl overflow-hidden mb-2 relative">
                   <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                   <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-[#304B9E]/80 backdrop-blur-md text-[#F05A28] rounded text-[7px] font-black uppercase tracking-widest">{course.category}</span>
                   </div>
                </div>
                
                <div className="min-w-0">
                  <h4 className="text-base font-black text-[#304B9E] uppercase tracking-tight leading-tight group-hover:text-[#ec2027] transition-colors line-clamp-1">{course.name}</h4>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                    <Layers size={10} className="text-[#3b82f6]" /> {course.modules.length} Modules
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t-2 border-slate-50 flex items-center gap-2 relative z-10">
                   <button 
                     onClick={() => setEditingCourseId(course.id)} 
                     className="flex-1 py-3 bg-[#304B9E] text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#F05A28] transition-all flex items-center justify-center gap-2 shadow-md border-b-4 border-black/10 active:scale-95"
                   >
                     <Edit3 size={14} strokeWidth={3} /> Edit
                   </button>
                   <button 
                     onClick={() => onPreviewCourse?.(course.id)}
                     className="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 hover:bg-[#304B9E] hover:text-white transition-all shadow-sm active:scale-95"
                   >
                      <Eye size={16} />
                   </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
