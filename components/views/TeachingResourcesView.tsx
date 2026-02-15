
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  PlayCircle, 
  Search, 
  FileUp, 
  X, 
  Save, 
  Trash2, 
  FileSearch,
  Download,
  ShieldAlert,
  Eye,
  BookOpen,
  MonitorPlay,
  Info,
  ChevronLeft
} from 'lucide-react';

interface TeachingResourcesViewProps {
  checkPermission?: (category: any, action: string) => boolean;
  onBack?: () => void;
}

const ResourcePreviewModal = ({ resource, onClose, canDownload, onDownload }: { 
  resource: any, 
  onClose: () => void, 
  canDownload: boolean,
  onDownload: (res: any) => void 
}) => {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] p-0 max-w-2xl w-full shadow-2xl border-t-[10px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-50 shadow-sm"
        >
          <X size={20} strokeWidth={4} />
        </button>

        <div className="p-8 md:p-10 flex flex-col h-full overflow-y-auto scrollbar-hide">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-2xl border-b-4 border-black/10 rotate-3 ${resource.type === 'Video' ? 'bg-blue-100 text-[#304B9E]' : 'bg-orange-100 text-[#F05A28]'}`}>
              {resource.type === 'Video' ? <MonitorPlay size={48} strokeWidth={2.5} /> : <FileText size={48} strokeWidth={2.5} />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#304B9E] text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-lg shadow-sm">
                  {resource.type}
                </span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{resource.size}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#304B9E] uppercase tracking-tighter leading-none mb-4">
                {resource.title}
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <BookOpen size={14} className="text-[#F05A28]" /> Associated Book: {resource.book}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border-2 border-slate-100 mb-8 flex-1">
             <div className="flex items-center gap-2 mb-4">
                <Info size={16} className="text-[#304B9E]" />
                <h4 className="text-xs font-black text-[#304B9E] uppercase tracking-widest">Resource Preview</h4>
             </div>
             <div className="aspect-video w-full bg-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 group overflow-hidden relative">
                {resource.type === 'Video' ? (
                  <>
                    <PlayCircle size={64} strokeWidth={1} className="group-hover:scale-110 transition-transform text-[#304B9E]/20" />
                    <p className="text-[10px] font-black uppercase tracking-widest mt-4">Secure Video Stream Initialization...</p>
                  </>
                ) : (
                  <>
                    <FileSearch size={64} strokeWidth={1} className="group-hover:scale-110 transition-transform text-[#F05A28]/20" />
                    <p className="text-[10px] font-black uppercase tracking-widest mt-4">Document Content Processing...</p>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 to-transparent pointer-events-none"></div>
             </div>
             <p className="mt-6 text-[11px] text-slate-500 font-bold uppercase leading-relaxed text-center">
                This is a protected resource from the U Book Store Global Library. 
                {canDownload ? " You have permission to download and distribute this asset." : " Contact your center administrator if you require an offline copy."}
             </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
             <button 
               onClick={onClose} 
               className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
             >
               Close View
             </button>
             {canDownload && (
               <button 
                 onClick={() => onDownload(resource)}
                 className="flex-[2] py-5 bg-[#F05A28] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 border-b-4 border-black/10 hover:bg-[#304B9E] transition-all active:scale-95"
               >
                 <Download size={18} strokeWidth={3} /> Download Asset
               </button>
             )}
          </div>
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

export const TeachingResourcesView: React.FC<TeachingResourcesViewProps> = ({ checkPermission, onBack }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewResource, setPreviewResource] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([
    { id: 1, title: 'Teacher Guide: Introduction to Logic', type: 'PDF', size: '2.4 MB', lang: 'English', book: 'Digital Kids V2' },
    { id: 5, title: 'Student Guide: Getting Started', type: 'PDF', size: '1.5 MB', lang: 'English', book: 'Orientation' },
    { id: 2, title: 'Animated Module 1: Binary Concepts', type: 'Video', size: '45 MB', lang: 'English', book: 'Digital Kids V1' },
    { id: 3, title: 'Worksheet: Pattern Recognition', type: 'DOCX', size: '1.1 MB', lang: 'Spanish', book: 'Digital Kids V2' },
    { id: 4, title: 'Classroom Activity: Card Sorting', type: 'PDF', size: '3.8 MB', lang: 'Portuguese', book: 'Digital Kids V3' },
  ]);

  const canUpload = checkPermission?.('resources', 'upload') ?? true;
  const canDelete = checkPermission?.('resources', 'delete') ?? true;
  const canDownload = checkPermission?.('resources', 'download') ?? true;

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [resources, searchTerm]);

  const handleUpload = (newAsset: any) => {
    setResources([newAsset, ...resources]);
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to permanently remove this resource?")) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const handleDownload = (res: any) => {
    alert(`Initializing secure download for: ${res.title}\nFormat: ${res.type}`);
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      {isUploadModalOpen && (
        <UploadAssetModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onUpload={handleUpload} 
        />
      )}

      {previewResource && (
        <ResourcePreviewModal 
          resource={previewResource}
          onClose={() => setPreviewResource(null)}
          canDownload={canDownload}
          onDownload={handleDownload}
        />
      )}

      <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-3 relative z-10">
           {onBack && (
             <button onClick={onBack} className="p-3 bg-white/10 rounded-xl text-white shadow-lg hover:bg-[#F05A28] transition-all active:scale-90 border-2 border-white/10 flex items-center gap-2 mr-2">
               <ChevronLeft size={20} strokeWidth={4} />
               <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Back to Library</span>
             </button>
           )}
           <div className="p-2.5 bg-white/10 rounded-lg text-white shadow-xl rotate-3">
             <FileSearch size={22} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-lg md:text-xl font-black leading-none tracking-tight uppercase">Learning <span className="text-[#F05A28]">Resources: Library</span></h2>
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
            className="bg-transparent text-[11px] font-black text-[#304B9E] outline-none w-full placeholder:text-slate-200 uppercase"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredResources.map((res) => (
            <div 
              key={res.id} 
              onClick={() => setPreviewResource(res)}
              className="bg-white rounded-2xl p-4 md:p-5 border-2 border-slate-50 hover:border-[#304B9E]/20 transition-all group shadow-md flex items-start gap-4 relative overflow-hidden cursor-pointer"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-6 shadow-md ${res.type === 'Video' ? 'bg-blue-100 text-[#304B9E]' : 'bg-orange-100 text-[#F05A28]'}`}>
                {res.type === 'Video' ? <PlayCircle size={20} strokeWidth={2.5} /> : <FileText size={20} strokeWidth={2.5} />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6px] font-black uppercase tracking-widest text-[#F05A28] bg-orange-50 px-1.5 py-0.5 rounded-full">{res.type}</span>
                  <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest">{res.size}</span>
                </div>
                <h4 className="text-[11px] font-black text-[#304B9E] uppercase tracking-tight leading-snug group-hover:text-[#F05A28] transition-colors line-clamp-2">{res.title}</h4>
                <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1">{res.book}</p>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                {canDownload && (
                  <button 
                     onClick={(e) => { e.stopPropagation(); handleDownload(res); }}
                     className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shadow-sm hover:bg-emerald-600 hover:text-white transition-all active:scale-90 flex items-center justify-center group/dl"
                     title="Download Asset"
                  >
                     <Download size={14} strokeWidth={3} className="group-hover/dl:scale-110 transition-transform" />
                  </button>
                )}
                {!canDownload && (
                  <div className="p-2.5 bg-slate-50 text-slate-300 rounded-lg shadow-sm group-hover:text-[#304B9E] transition-all">
                     <Eye size={14} strokeWidth={3} />
                  </div>
                )}
                {canDelete && (
                  <button 
                     onClick={(e) => { e.stopPropagation(); handleDelete(res.id); }}
                     className="p-2.5 bg-red-50 text-[#ec2027] rounded-lg shadow-sm hover:bg-[#ec2027] hover:text-white transition-all active:scale-90 flex items-center justify-center group/del"
                     title="Remove Asset"
                  >
                     <Trash2 size={14} strokeWidth={3} className="group-hover/del:scale-110 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
         <div className="flex items-center gap-2">
            <ShieldAlert size={12} className="text-slate-300" />
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Secure Library Node Access</span>
         </div>
         <p className="text-[8px] font-black text-[#304B9E] uppercase tracking-widest">Inventory: {filteredResources.length} Assets Registry</p>
      </div>
    </div>
  );
};
