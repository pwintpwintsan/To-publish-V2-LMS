
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  PlayCircle, 
  Search, 
  FileSearch, 
  Plus, 
  FileUp, 
  X, 
  Save, 
  Trash2, 
  ChevronDown,
  Eye,
  MonitorPlay,
  Maximize2,
  ShieldAlert
} from 'lucide-react';

interface TeachingResourcesViewProps {
  checkPermission?: (category: any, action: string) => boolean;
}

const ResourceViewer = ({ resource, onClose }: { resource: any, onClose: () => void }) => {
  const isVideo = resource.type === 'Video';
  
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl h-full max-h-[80vh] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-t-[8px] border-[#304B9E] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
             <div className={`p-2.5 rounded-xl text-white shadow-lg ${isVideo ? 'bg-[#304B9E]' : 'bg-[#F05A28]'}`}>
               {isVideo ? <MonitorPlay size={20} strokeWidth={3} /> : <FileText size={20} strokeWidth={3} />}
             </div>
             <div>
               <h2 className="text-base font-black text-[#304B9E] uppercase tracking-tighter leading-none">{resource.title}</h2>
               <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">{resource.book} • {resource.type}</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white text-slate-300 hover:text-[#ec2027] transition-all rounded-xl shadow-sm border border-slate-100 active:scale-95">
            <X size={18} strokeWidth={4} />
          </button>
        </div>

        <div className="flex-1 bg-slate-900 overflow-hidden relative group">
          {isVideo ? (
            <div className="w-full h-full flex items-center justify-center relative">
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10"></div>
               <PlayCircle size={60} className="text-white/20 absolute z-10 group-hover:scale-110 transition-transform cursor-pointer" strokeWidth={1} />
               <img src={`https://picsum.photos/seed/${resource.id}/1280/720`} className="w-full h-full object-contain" alt="" />
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-1/2 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F05A28] w-1/3 rounded-full"></div>
               </div>
            </div>
          ) : (
            <div className="w-full h-full bg-slate-200 overflow-y-auto scrollbar-hide p-4 md:p-6 flex flex-col items-center">
               <div className="w-full max-w-2xl bg-white shadow-2xl rounded-lg min-h-[120%] p-6 md:p-10 relative mb-10">
                  <div className="absolute top-6 right-6 opacity-5"><FileSearch size={80} /></div>
                  <h1 className="text-xl font-serif text-slate-800 mb-6 border-b border-slate-100 pb-4">{resource.title}</h1>
                  <div className="space-y-3">
                     <div className="h-2 bg-slate-50 rounded w-full"></div>
                     <div className="h-2 bg-slate-50 rounded w-11/12"></div>
                     <div className="h-2 bg-slate-50 rounded w-full"></div>
                     <div className="h-2 bg-slate-50 rounded w-10/12"></div>
                     <div className="h-3 bg-slate-100 rounded w-3/4 h-48 mt-8 flex items-center justify-center">
                        <MonitorPlay size={32} className="text-slate-200" />
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-1.5">
                 <Maximize2 size={12} className="text-slate-400" />
                 <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Theater</span>
              </div>
              <div className="flex items-center gap-1 text-[#ec2027] font-black text-[7px] uppercase tracking-widest bg-red-50 px-2.5 py-1.5 rounded-lg">
                 <ShieldAlert size={10} /> Restricted
              </div>
           </div>
           <button onClick={onClose} className="px-6 py-3 bg-[#304B9E] text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#6366f1] transition-all shadow-xl active:scale-95">Return</button>
        </div>
      </div>
    </div>
  );
};

const UploadAssetModal = ({ onClose, onUpload }: { onClose: () => void, onUpload: (asset: any) => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'PDF',
    book: 'Digital Kids V2',
    lang: 'English'
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#304B9E]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] p-5 md:p-6 max-w-lg w-full shadow-2xl border-t-[8px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-lg">
          <X size={16} strokeWidth={3} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-[#F05A28] text-white rounded-xl shadow-xl">
            <FileUp size={20} strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#304B9E] uppercase tracking-tighter leading-none">Upload Asset</h3>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Resource Repository</p>
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Title</label>
            <input 
              type="text" 
              placeholder="e.g. Logic Gates Guide" 
              className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl font-black text-[#304B9E] text-xs outline-none focus:border-[#304B9E] transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 mt-6">
          <button onClick={onClose} className="flex-1 py-3 px-4 bg-slate-100 text-slate-400 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
          <button 
            onClick={() => {
              if (!formData.title) return alert("Please enter a title");
              onUpload({ ...formData, id: Date.now(), size: '1.2 MB' });
            }}
            className="flex-[2] py-3 px-4 bg-[#F05A28] text-white rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-[#304B9E] shadow-lg transition-all active:scale-95"
          >
            <Save size={14} /> Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export const TeachingResourcesView: React.FC<TeachingResourcesViewProps> = ({ checkPermission }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewingResource, setViewingResource] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookFilter, setBookFilter] = useState('All Series');
  const [resources, setResources] = useState([
    { id: 1, title: 'Teacher Guide: Introduction to Logic', type: 'PDF', size: '2.4 MB', lang: 'English', book: 'Digital Kids V2' },
    { id: 2, title: 'Animated Module 1: Binary Concepts', type: 'Video', size: '45 MB', lang: 'English', book: 'Digital Kids V1' },
    { id: 3, title: 'Worksheet: Pattern Recognition', type: 'DOCX', size: '1.1 MB', lang: 'Spanish', book: 'Digital Kids V2' },
    { id: 4, title: 'Classroom Activity: Card Sorting', type: 'PDF', size: '3.8 MB', lang: 'Portuguese', book: 'Digital Kids V3' },
  ]);

  const canUpload = checkPermission?.('resources', 'upload') ?? true;
  const canDelete = checkPermission?.('resources', 'delete') ?? true;

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBook = bookFilter === 'All Series' || res.book === bookFilter;
      return matchesSearch && matchesBook;
    });
  }, [resources, searchTerm, bookFilter]);

  const handleUpload = (newAsset: any) => {
    setResources([newAsset, ...resources]);
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      {isUploadModalOpen && (
        <UploadAssetModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onUpload={handleUpload} 
        />
      )}

      {viewingResource && (
        <ResourceViewer 
          resource={viewingResource} 
          onClose={() => setViewingResource(null)} 
        />
      )}

      <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-3 relative z-10">
           <div className="p-2.5 bg-white/10 rounded-lg text-white shadow-xl rotate-3">
             <FileSearch size={22} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-lg md:text-xl font-black leading-none tracking-tight uppercase">Teaching <span className="text-[#F05A28]">Library</span></h2>
             <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1">Global hub assets</p>
           </div>
        </div>
        {canUpload && (
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#F05A28] text-white rounded-lg font-black text-[9px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all border-b-4 border-black/10 relative z-10"
          >
            <FileUp size={14} strokeWidth={3} />
            <span>Upload</span>
          </button>
        )}
      </div>

      <div className="w-full bg-white p-2 rounded-xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-2 flex-shrink-0">
        <div className="flex-[2] flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 w-full group focus-within:border-[#304B9E] transition-all">
          <Search size={16} className="text-slate-400 group-focus-within:text-[#304B9E]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search hub library..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-[11px] font-black text-[#304B9E] outline-none w-full placeholder:text-slate-300 uppercase"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredResources.map((res) => (
            <div key={res.id} className="bg-white rounded-2xl p-4 md:p-5 border-2 border-slate-50 hover:border-[#304B9E]/20 transition-all group shadow-md flex items-start gap-3 relative overflow-hidden">
              <div className={`w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-6 shadow-md ${res.type === 'Video' ? 'bg-blue-100 text-[#304B9E]' : 'bg-orange-100 text-[#F05A28]'}`}>
                {res.type === 'Video' ? <PlayCircle size={18} strokeWidth={2.5} /> : <FileText size={18} strokeWidth={2.5} />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6px] font-black uppercase tracking-widest text-[#F05A28] bg-orange-50 px-1.5 py-0.5 rounded-full">{res.type}</span>
                  <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest">{res.size}</span>
                </div>
                <h4 className="text-[11px] font-black text-[#304B9E] uppercase tracking-tight leading-snug group-hover:text-[#F05A28] transition-colors line-clamp-1">{res.title}</h4>
                <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1">{res.book}</p>
              </div>

              <div className="flex flex-col gap-1">
                <button 
                   onClick={() => setViewingResource(res)}
                   className="p-2.5 bg-blue-50 text-[#304B9E] rounded-lg shadow-sm hover:bg-[#304B9E] hover:text-white transition-all active:scale-90 flex items-center gap-1.5 group/btn"
                   title="View Asset"
                >
                   <Eye size={12} strokeWidth={3} className="group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
