
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_SCHOOLS } from '../../constants.tsx';
import { UserRole } from '../../types.ts';
import { 
  UserPlus, 
  Search, 
  Trash2, 
  Edit, 
  ChevronDown,
  X,
  CheckCircle2,
  Lock,
  Building2,
  ShieldCheck,
  Fingerprint,
  RefreshCw,
  Users,
  GraduationCap,
  ShieldAlert,
  UserCircle,
  ArrowRight,
  UserCheck,
  Save,
  Trophy,
  History,
  ClipboardList,
  Zap,
  User,
  Filter,
  LayoutGrid
} from 'lucide-react';

interface AccountCreationViewProps {
  activeRole?: UserRole;
  checkPermission?: (category: any, action: string) => boolean;
}

type AccountRole = 'Admin' | 'Teacher' | 'Student';

const generateRandomPassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let pass = "";
  for (let i = 0; i < 8; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

const REGISTERED_NAME_POOL = [
  "Maung Maung", "Aye Aye", "Kyaw Kyaw", "Thida", "Zaw Zaw", 
  "Mya Mya", "Hla Hla", "Phyo Phyo", "Ei Ei", "Min Min",
  "Nanda", "Soe Soe", "Wai Wai", "Tun Tun", "Lwin Lwin"
];

// Helper to get available IDs based on Role
const getAvailableIdsForRole = (role: AccountRole): string[] => {
  switch (role) {
    case 'Admin':
      return ['AD1001', 'AD1002'];
    case 'Teacher':
      return ['TR10001', 'TR10002', 'TR10003'];
    case 'Student':
    default:
      return Array.from({ length: 100 }, (_, i) => (10001 + i).toString());
  }
};

const StudentProfilePopup = ({ user, onClose }: { user: any, onClose: () => void }) => {
  return (
    <div 
      className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-50 shadow-md active:scale-90"
        >
          <X size={20} strokeWidth={3} />
        </button>

        <div className="p-10 flex flex-col md:flex-row gap-8 overflow-y-auto scrollbar-hide">
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative mb-4">
              <img src={`https://picsum.photos/seed/${user.userId}/200`} className="w-40 h-40 rounded-[2.5rem] border-4 border-white shadow-2xl object-cover" alt="" />
              <div className="absolute -bottom-2 -right-2 bg-[#F05A28] text-white p-2.5 rounded-2xl shadow-xl rotate-12 border-4 border-white">
                <Trophy size={20} strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter text-center">{user.username || 'Unassigned Node'}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">System ID: {user.userId}</p>
            <div className="mt-6 w-full flex items-center justify-center gap-3">
              <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[9px] uppercase tracking-widest border border-emerald-100">Status: Active</div>
              <div className="px-4 py-2 bg-indigo-50 text-[#304B9E] rounded-xl font-black text-[9px] uppercase tracking-widest border border-indigo-100">{user.role}</div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Hub Mastery</p>
                  <p className="text-3xl font-black text-[#F05A28]">88%</p>
               </div>
               <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Attendance</p>
                  <p className="text-3xl font-black text-[#304B9E]">24</p>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-2">
                 <History size={14} /> Global Records
               </h4>
               <div className="space-y-2">
                  {[
                    { title: 'Core Logic Assessment', type: 'quiz', score: '95%', date: 'Yesterday' },
                    { title: 'System Integration Task', type: 'assignment', score: 'A-', date: '3 days ago' },
                  ].map((sub, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm group hover:border-[#304B9E] transition-all">
                       <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg text-white ${sub.type === 'quiz' ? 'bg-[#F05A28]' : 'bg-[#304B9E]'}`}>
                             {sub.type === 'quiz' ? <Zap size={12} fill="currentColor" /> : <ClipboardList size={12} />}
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-[#304B9E] uppercase leading-none">{sub.title}</p>
                            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">{sub.date}</p>
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-[#F05A28]">{sub.score}</span>
                    </div>
                  ))}
               </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#F05A28] transition-all border-b-4 border-black/10 active:scale-95"
            >
              Return to Registry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AssignUserModal = ({ 
  onClose, 
  onAssign, 
  targetId 
}: { 
  onClose: () => void, 
  onAssign: (name: string) => void, 
  targetId: string 
}) => {
  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[3rem] w-full max-w-md shadow-2xl border-t-[12px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-50 shadow-md active:scale-90"
        >
          <X size={20} strokeWidth={4} />
        </button>

        <div className="p-8 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#304B9E] text-white rounded-2xl shadow-xl">
              <UserCheck size={24} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Assign User</h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Link Identity to Node {targetId}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 flex-1 flex flex-col min-h-0">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search registered names..." 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-11 pr-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all"
                onChange={(e) => {}} // Controlled by filter logic in final impl
              />
           </div>

           <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1 pr-1 max-h-[300px]">
              {REGISTERED_NAME_POOL.map((name) => (
                <button 
                  key={name}
                  onClick={() => onAssign(name)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-indigo-400 group-hover:text-indigo-600">
                      <UserCircle size={20} />
                    </div>
                    <span className="font-black text-[#304B9E] text-[11px] uppercase tracking-tight">{name}</span>
                  </div>
                  <ArrowRight size={14} className="text-slate-200 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
           </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
           <button onClick={onClose} className="w-full py-4 bg-white text-slate-400 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Cancel</button>
        </div>
      </div>
    </div>
  );
};

const EditAccountModal = ({ 
  user, 
  onClose, 
  onSave 
}: { 
  user: any, 
  onClose: () => void, 
  onSave: (data: any) => void 
}) => {
  const [formData, setFormData] = useState({ ...user });

  const availableIds = useMemo(() => getAvailableIdsForRole(formData.role), [formData.role]);

  // Sync ID if current one becomes invalid for new role
  useEffect(() => {
    if (!availableIds.includes(formData.userId)) {
      setFormData(prev => ({ ...prev, userId: availableIds[0] }));
    }
  }, [formData.role, availableIds]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl border-t-[12px] border-[#304B9E] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-50 shadow-md active:scale-90"
        >
          <X size={20} strokeWidth={4} />
        </button>

        <div className="p-8 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#304B9E] text-white rounded-2xl shadow-xl">
              <Edit size={24} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Edit Account</h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Modify Credentials for {formData.userId}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Role</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all appearance-none cursor-pointer"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as AccountRole})}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">School Admin</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">System User ID</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-mono font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all appearance-none cursor-pointer"
                  value={formData.userId}
                  onChange={(e) => setFormData({...formData, userId: e.target.value})}
                >
                  {availableIds.map(id => (
                    <option key={id} value={id}>{id}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch / Hub Name</label>
            <div className="relative">
              <select 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all appearance-none cursor-pointer"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
              >
                {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">User Account (Username)</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all uppercase"
              placeholder="e.g. MAUNG MAUNG"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
            <div className="flex gap-2">
              <input 
                required
                type="text" 
                className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-mono font-bold text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setFormData({...formData, password: generateRandomPassword()})}
                className="px-4 bg-slate-100 text-[#304B9E] rounded-xl hover:bg-[#304B9E] hover:text-white transition-all border border-slate-200 active:scale-95"
                title="Regenerate Password"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
            <button type="submit" className="flex-[2] py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 active:scale-95 flex items-center justify-center gap-2">
              <Save size={18} /> Update Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateAccountModal = ({ onClose, onSave, initialRole }: { onClose: () => void, onSave: (data: any) => void, initialRole: AccountRole }) => {
  const [formData, setFormData] = useState({
    role: initialRole,
    branch: MOCK_SCHOOLS[0].name,
    username: '',
    password: generateRandomPassword(),
    userId: ''
  });

  const availableIds = useMemo(() => getAvailableIdsForRole(formData.role), [formData.role]);

  // Ensure userId is valid for selected role
  useEffect(() => {
    if (!availableIds.includes(formData.userId)) {
      setFormData(prev => ({ ...prev, userId: availableIds[0] }));
    }
  }, [formData.role, availableIds]);

  const handleGeneratePass = () => {
    setFormData(prev => ({ ...prev, password: generateRandomPassword() }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl border-t-[12px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-50 shadow-md active:scale-90"
        >
          <X size={20} strokeWidth={4} />
        </button>

        <div className="p-8 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#304B9E] text-white rounded-2xl shadow-xl">
              <UserPlus size={24} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">New Account</h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Secure Gateway Provisioning</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Role</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all appearance-none cursor-pointer"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as AccountRole})}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">School Admin</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">System User ID</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-mono font-black text-[#F05A28] text-xs outline-none focus:border-[#F05A28] transition-all appearance-none cursor-pointer shadow-inner"
                  value={formData.userId}
                  onChange={(e) => setFormData({...formData, userId: e.target.value})}
                >
                  {availableIds.map(id => (
                    <option key={id} value={id}>{id}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch / Hub Name</label>
            <div className="relative">
              <select 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all appearance-none cursor-pointer"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
              >
                {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">User Account (Username)</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all uppercase"
              placeholder="e.g. MAUNG MAUNG"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Password</label>
            <div className="flex gap-2">
              <input 
                required
                type="text" 
                className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-mono font-bold text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={handleGeneratePass}
                className="px-4 bg-slate-100 text-[#304B9E] rounded-xl hover:bg-[#304B9E] hover:text-white transition-all border border-slate-200 active:scale-95"
                title="Regenerate Password"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest ml-1 mt-1">Passwords are auto-generated for security</p>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
            <button type="submit" className="flex-[2] py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 active:scale-95 flex items-center justify-center gap-2">
              <CheckCircle2 size={18} /> Provision Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AccountCreationView: React.FC<AccountCreationViewProps> = ({ activeRole, checkPermission }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assigningUserId, setAssigningUserId] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AccountRole>('Student'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Centers');
  
  const isMainAdmin = activeRole === UserRole.MAIN_CENTER;

  // Generating requested initial lists
  const initialAccounts = useMemo(() => {
    const list = [
       // Admin
      { userId: 'AD1001', role: 'Admin', branch: 'EDULIGHT School', username: 'ADMIN_MASTER', password: generateRandomPassword(), status: 'Active' },
      // Teachers
      { userId: 'TR10001', role: 'Teacher', branch: 'EDULIGHT School', username: '', password: generateRandomPassword(), status: 'Active' },
      { userId: 'TR10002', role: 'Teacher', branch: 'Westside Academy', username: '', password: generateRandomPassword(), status: 'Active' },
    ];

    // Students 10001 - 10010
    for (let i = 1; i <= 10; i++) {
      list.push({
        userId: `${10000 + i}`,
        role: 'Student',
        branch: i <= 5 ? 'EDULIGHT School' : 'Westside Academy',
        username: '',
        password: generateRandomPassword(),
        status: 'Active'
      });
    }

    return list;
  }, []);

  const [accounts, setAccounts] = useState(initialAccounts);

  const canEdit = checkPermission?.('accounts', 'edit') ?? true;
  const canDelete = checkPermission?.('accounts', 'delete') ?? true;

  const handleSaveAccount = (data: any) => {
    setAccounts([data, ...accounts]);
    setIsModalOpen(false);
  };

  const handleUpdateAccount = (updatedData: any) => {
    setAccounts(prev => prev.map(acc => 
      acc.userId === editingUserId ? updatedData : acc
    ));
    setEditingUserId(null);
  };

  const handleAssignUser = (name: string) => {
    if (!assigningUserId) return;
    setAccounts(prev => prev.map(acc => 
      acc.userId === assigningUserId ? { ...acc, username: name } : acc
    ));
    setAssigningUserId(null);
  };

  const handleResetPassword = (userId: string) => {
    const newPass = generateRandomPassword();
    setAccounts(prev => prev.map(acc => acc.userId === userId ? { ...acc, password: newPass } : acc));
    alert(`Password for user ${userId} has been reset to: ${newPass}`);
  };

  const handleDeleteAccount = (userId: string) => {
    if (confirm(`Are you sure you want to revoke access for ${userId}?`)) {
      setAccounts(prev => prev.filter(acc => acc.userId !== userId));
    }
  };

  const filteredAccounts = useMemo(() => {
    return accounts.filter(acc => {
      const matchesTab = acc.role === activeTab;
      const matchesBranch = selectedBranch === 'All Centers' || acc.branch === selectedBranch;
      const matchesSearch = 
        acc.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
        acc.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.branch.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesBranch && matchesSearch;
    });
  }, [accounts, activeTab, searchTerm, selectedBranch]);

  const accountToEdit = useMemo(() => 
    accounts.find(acc => acc.userId === editingUserId),
    [accounts, editingUserId]
  );

  const accountToView = useMemo(() => 
    accounts.find(acc => acc.userId === viewingProfileId),
    [accounts, viewingProfileId]
  );

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden animate-in fade-in duration-500">
      {isModalOpen && (
        <CreateAccountModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveAccount} 
          initialRole={activeTab}
        />
      )}

      {editingUserId && accountToEdit && (
        <EditAccountModal 
          user={accountToEdit} 
          onClose={() => setEditingUserId(null)} 
          onSave={handleUpdateAccount} 
        />
      )}

      {viewingProfileId && accountToView && (
        <StudentProfilePopup 
          user={accountToView} 
          onClose={() => setViewingProfileId(null)} 
        />
      )}

      {assigningUserId && (
        <AssignUserModal 
          targetId={assigningUserId}
          onClose={() => setAssigningUserId(null)}
          onAssign={handleAssignUser}
        />
      )}

      {/* Header - Unified Blue and Orange Bar */}
      <div className="w-full bg-[#304B9E] rounded-[2rem] p-5 md:p-6 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="p-3.5 bg-[#F05A28] rounded-xl text-white shadow-lg rotate-3 border-b-4 border-black/10">
             <Fingerprint size={28} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-xl md:text-2xl font-black leading-none tracking-tight uppercase">User <span className="text-white/60">Registry</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Identity Access Management</p>
           </div>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 bg-white text-[#304B9E] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#F05A28] hover:text-white transition-all border-b-4 border-black/10 flex items-center gap-3 active:scale-95"
          >
            <UserPlus size={18} strokeWidth={3} />
            User Account
          </button>
        </div>
      </div>

      {/* Global Center Name Filter - Only for Main Center Admin */}
      {isMainAdmin && (
        <div className="w-full flex justify-center flex-shrink-0 animate-in slide-in-from-top-4 duration-500 mb-2">
           <div className="bg-white px-8 py-4 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-10px_rgba(48,75,158,0.15)] flex flex-col sm:flex-row items-center gap-4 group hover:border-[#304B9E]/20 transition-all">
              <div className="flex items-center gap-3 text-[#304B9E] font-black text-[11px] uppercase tracking-[0.2em]">
                 <div className="p-2 bg-indigo-50 text-[#304B9E] rounded-xl group-hover:bg-[#304B9E] group-hover:text-white transition-all">
                   <Building2 size={18} strokeWidth={3} />
                 </div>
                 Select Registry Hub:
              </div>
              <div className="relative min-w-[280px]">
                 <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                 <select 
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full bg-slate-50 pl-11 pr-10 py-3.5 rounded-2xl border-2 border-slate-100 font-black text-xs uppercase text-[#304B9E] outline-none appearance-none cursor-pointer focus:border-[#F05A28] transition-all hover:bg-slate-100 shadow-inner"
                 >
                    <option value="All Centers">All Registry Centers</option>
                    {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.name}>{s.name} - Hub {s.id}</option>)}
                 </select>
                 <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#F05A28] transition-colors pointer-events-none" />
              </div>
           </div>
        </div>
      )}

      {/* Role Switcher Button Bar - Unified Blue and Orange */}
      <div className="flex justify-center flex-shrink-0 mb-2">
        <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-100 shadow-xl relative z-10">
          {[
            { id: 'Admin', label: 'Admins', icon: ShieldAlert },
            { id: 'Teacher', label: 'Teachers', icon: Users },
            { id: 'Student', label: 'Students', icon: GraduationCap }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AccountRole)} 
              className={`px-12 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 ${activeTab === tab.id ? 'bg-[#304B9E] text-white shadow-xl scale-105' : 'text-slate-400 hover:text-[#304B9E]'}`}
            >
              <tab.icon size={16} strokeWidth={3} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-xl flex flex-col overflow-hidden">
        <div className="p-3 border-b border-slate-100 bg-slate-50/30 flex items-center">
           <div className="flex-1 flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-100 w-full focus-within:border-[#F05A28] transition-all shadow-sm">
             <Search size={18} className="text-slate-300" strokeWidth={3} />
             <input 
              placeholder={`Search in ${activeTab} list...`} 
              className="bg-transparent outline-none w-full font-black text-[#304B9E] text-xs placeholder:text-slate-200 uppercase"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 bg-[#304B9E] text-white text-[9px] font-black uppercase tracking-widest z-20 shadow-md">
              <tr>
                <th className="px-8 py-6 border-r border-white/10">User ID</th>
                <th className="px-8 py-6 border-r border-white/10">Role</th>
                <th className="px-8 py-6 border-r border-white/10">Branch Name</th>
                <th className="px-8 py-6 border-r border-white/10">User Acc</th>
                <th className="px-8 py-6 border-r border-white/10">Password</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAccounts.map((acc) => (
                <tr key={acc.userId} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 font-mono font-black text-[#F05A28] text-xs tracking-widest uppercase">{acc.userId}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                      acc.role === 'Student' ? 'bg-emerald-50 text-emerald-600 border-emerald-500/10' : 
                      acc.role === 'Teacher' ? 'bg-indigo-50 text-indigo-600 border-indigo-500/10' : 
                      'bg-red-50 text-red-600 border-red-500/10'
                    }`}>
                      {acc.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[10px] font-black text-[#304B9E] uppercase tracking-tight truncate max-w-[150px]">{acc.branch}</td>
                  <td className="px-8 py-5">
                    {acc.username ? (
                       <div className="flex items-center gap-2">
                          <UserCircle size={14} className="text-indigo-400" />
                          <span className="font-black text-[#304B9E] text-xs uppercase tracking-tight">{acc.username}</span>
                       </div>
                    ) : (
                       <button 
                        onClick={() => setAssigningUserId(acc.userId)}
                        className="group/btn px-3 py-2 bg-white border-2 border-dashed border-slate-200 rounded-xl hover:border-[#F05A28] hover:bg-orange-50 transition-all flex items-center gap-2"
                       >
                          <UserPlus size={14} className="text-slate-300 group-hover/btn:text-[#F05A28]" />
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover/btn:text-[#F05A28]">Pending Setup</span>
                       </button>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 group/pass">
                      <Lock size={12} className="text-slate-300" />
                      <span className="font-mono text-xs text-slate-400 font-bold select-all bg-slate-50 px-2 py-0.5 rounded border border-slate-100 group-hover/pass:text-[#304B9E] transition-colors">{acc.password}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setViewingProfileId(acc.userId)}
                        className="p-2 text-slate-300 hover:text-[#304B9E] transition-all bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md active:scale-90"
                        title="View Detailed Profile"
                      >
                        <User size={16} strokeWidth={3} />
                      </button>

                      <button 
                        onClick={() => handleResetPassword(acc.userId)}
                        className="p-2 text-slate-300 hover:text-emerald-500 transition-all bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md active:scale-90"
                        title="Reset Password"
                      >
                        <RefreshCw size={16} strokeWidth={3} />
                      </button>
                      
                      {canEdit && (
                        <button 
                          onClick={() => setEditingUserId(acc.userId)}
                          className="p-2 text-slate-300 hover:text-[#304B9E] transition-all bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md active:scale-90"
                          title="Edit Credentials"
                        >
                          <Edit size={16} strokeWidth={3} />
                        </button>
                      )}
                      {canDelete && (
                        <button 
                          onClick={() => handleDeleteAccount(acc.userId)}
                          className="p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md active:scale-90"
                          title="Revoke Access"
                        >
                          <Trash2 size={16} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAccounts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-20 text-center opacity-20">
                    <ShieldCheck size={64} className="mx-auto text-slate-300 mb-4" />
                    <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-widest">No matching {activeTab} accounts</h4>
                    {selectedBranch !== 'All Centers' && <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">In branch: {selectedBranch}</p>}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck size={16} className="text-emerald-500" />
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Global Synchronization via DIR-SEC Protocol</p>
        </div>
        <div className="flex items-center gap-3">
           <p className="text-[9px] font-black text-[#304B9E] uppercase tracking-widest">Provisioned Nodes: {accounts.length}</p>
           <div className="w-px h-3 bg-slate-200"></div>
           <p className="text-[9px] font-black text-[#F05A28] uppercase tracking-widest">Current View: {filteredAccounts.length}</p>
        </div>
      </div>
    </div>
  );
};
