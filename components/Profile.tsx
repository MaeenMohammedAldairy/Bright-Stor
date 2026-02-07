
import React, { useState } from 'react';
import { User } from '../types.ts';

interface Props {
  user: User | null;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onUpdateUser: (user: User) => void;
}

const Profile: React.FC<Props> = ({ user, onLogout, isDarkMode, onToggleDarkMode, onUpdateUser }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');

  const menuItems = [
    { id: 'security', icon: 'fa-shield-halved', title: 'الأمان والخصوصية', subtitle: 'إدارة الحماية والبيانات', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'notifications', icon: 'fa-bell', title: 'تنبيهات الأسعار', subtitle: 'إشعارات المنتجات المفضلة', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { id: 'about', icon: 'fa-circle-info', title: 'حول المتجر', subtitle: 'الشروط والأحكام والإصدار', color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-slate-700' },
  ];

  if (!user) return null;

  const handleUpdateName = () => {
    onUpdateUser({ ...user, name: editName });
    setIsEditing(false);
    setActiveModal(null);
  };

  const renderModalContent = () => {
    switch(activeModal) {
      case 'security':
        return (
          <div className="space-y-6 text-right">
            <h3 className="text-lg font-black text-gray-800 dark:text-white">إعدادات الأمان</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl flex justify-between items-center">
                 <button className="text-[10px] font-black text-emerald-600">تغيير</button>
                 <span className="text-xs font-bold text-gray-700 dark:text-slate-300">كلمة المرور</span>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl flex justify-between items-center">
                 <div className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                 <span className="text-xs font-bold text-gray-700 dark:text-slate-300">التحقق بخطوتين</span>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6 text-right">
            <h3 className="text-lg font-black text-gray-800 dark:text-white">التنبيهات</h3>
            <div className="space-y-4">
              {['عروض فلاش', 'تحديثات الطلبات', 'المنتجات الجديدة'].map(item => (
                <div key={item} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl flex justify-between items-center">
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                  <span className="text-xs font-bold text-gray-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-[#064e3b] rounded-[28px] flex items-center justify-center text-white text-3xl mx-auto shadow-xl">
               <i className="fas fa-bolt"></i>
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-800 dark:text-white">متجر برايت</h3>
              <p className="text-[10px] text-gray-400 font-bold mt-1">إصدار 2.4.0 (بريميوم)</p>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">نحن نسعى لتقديم أفضل تجربة تسوق للمنتجات اليمنية الأصيلة والتقنيات العالمية بأعلى معايير الجودة والأمان.</p>
            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-center gap-6">
               <i className="fab fa-instagram text-gray-400 text-xl"></i>
               <i className="fab fa-twitter text-gray-400 text-xl"></i>
               <i className="fab fa-facebook text-gray-400 text-xl"></i>
            </div>
          </div>
        );
      case 'edit_profile':
        return (
          <div className="space-y-6 text-right">
            <h3 className="text-lg font-black text-gray-800 dark:text-white">تعديل البيانات</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 mr-2">الاسم بالكامل</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-sm outline-none border-none dark:text-white"
                />
              </div>
              <button 
                onClick={handleUpdateName}
                className="w-full bg-[#064e3b] text-white py-4 rounded-2xl font-black text-xs shadow-lg active-scale"
              >حفظ التغييرات</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar p-6 pb-24 dark:bg-slate-900 transition-colors">
      <div className="flex items-center justify-between mb-8 pt-2">
        <button onClick={() => setActiveModal('about')} className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 active-scale border border-gray-100 dark:border-slate-700">
           <i className="fas fa-circle-info"></i>
        </button>
        <h2 className="text-xl font-black text-gray-800 dark:text-white">حسابي</h2>
      </div>

      <div className="bg-[#064e3b] dark:bg-emerald-900/40 rounded-[32px] p-6 mb-8 text-white shadow-2xl relative overflow-hidden border border-emerald-800/20">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="relative group cursor-pointer" onClick={() => setActiveModal('edit_profile')}>
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=fff&color=064e3b&bold=true`} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#064e3b] text-[8px]">
                <i className="fas fa-pen"></i>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-black uppercase bg-amber-400 text-[#064e3b] px-3 py-1 rounded-full shadow-lg">مستوى بلاتيني</span>
            </div>
          </div>
          
          <div className="mb-6 text-right">
            <h4 className="text-lg font-black mb-0.5">{user.name}</h4>
            <p className="text-[9px] opacity-60 font-bold">{user.email}</p>
          </div>
          
          <div className="space-y-3">
             <div className="flex justify-between text-[8px] font-black opacity-60">
                <span>المستوى الماسي (3,000 نقطة)</span>
                <span>تقدم المستوى</span>
             </div>
             <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 transition-all duration-1000" style={{ width: '82%' }}></div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-[28px] border border-gray-50 dark:border-slate-700 shadow-sm flex flex-col items-center">
           <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 mb-3">
              <i className="fas fa-wallet text-sm"></i>
           </div>
           <p className="text-[8px] text-gray-400 font-black uppercase mb-1">الرصيد</p>
           <h3 className="text-lg font-black text-gray-800 dark:text-white">$145.50</h3>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-[28px] border border-gray-50 dark:border-slate-700 shadow-sm flex flex-col items-center">
           <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 mb-3">
              <i className="fas fa-coins text-sm"></i>
           </div>
           <p className="text-[8px] text-gray-400 font-black uppercase mb-1">النقاط</p>
           <h3 className="text-lg font-black text-gray-800 dark:text-white">2,450</h3>
        </div>
      </div>

      <section className="space-y-3 mb-8">
        <h3 className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase mb-4 text-right tracking-widest px-2">الإعدادات العامة</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors">
          <button 
            onClick={onToggleDarkMode}
            className={`w-12 h-6 rounded-full relative transition-colors duration-500 flex items-center px-1 shadow-inner ${isDarkMode ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-slate-700'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-md ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <h4 className="text-[12px] font-black text-gray-800 dark:text-slate-200">الوضع الليلي</h4>
                <p className="text-[9px] text-gray-400">{isDarkMode ? 'مفعل الآن' : 'غير مفعل'}</p>
             </div>
             <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100 dark:border-slate-600 shadow-sm">
                <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'} text-xs`}></i>
             </div>
          </div>
        </div>
      </section>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setActiveModal(item.id)}
            className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-50 dark:border-slate-700 shadow-sm flex items-center justify-between active-scale cursor-pointer group hover:border-[#064e3b]/30 transition-all"
          >
            <i className="fas fa-chevron-left text-[10px] text-gray-300 group-hover:text-[#064e3b] transition-colors"></i>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <h4 className="font-black text-[12px] text-gray-800 dark:text-slate-200">{item.title}</h4>
                <p className="text-[9px] text-gray-400 dark:text-slate-500">{item.subtitle}</p>
              </div>
              <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center ${item.color} border border-transparent group-hover:border-white/20 shadow-sm`}>
                <i className={`fas ${item.icon} text-sm`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="mt-12 w-full bg-red-50 dark:bg-red-900/10 text-red-600 py-5 rounded-[24px] font-black text-sm flex items-center justify-center gap-3 active-scale border border-red-100 dark:border-red-900/20"
      >
        <i className="fas fa-power-off"></i>
        <span>تسجيل الخروج الآمن</span>
      </button>

      <div className="mt-8 text-center pb-8 opacity-20">
         <p className="text-[10px] font-black text-gray-400">BRIGHT STORE • V2.4.0</p>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center p-0 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
           <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-t-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom-20 duration-500">
              <div className="w-12 h-1 bg-gray-200 dark:bg-slate-800 rounded-full mx-auto mb-6"></div>
              {renderModalContent()}
              <button 
                onClick={() => setActiveModal(null)}
                className="w-full mt-8 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-xs font-black text-gray-500 active-scale"
              >إغلاق النافذة</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
