
import React from 'react';

interface Props {
  onFinish: () => void;
}

const Onboarding: React.FC<Props> = ({ onFinish }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-between p-8 bg-white text-center">
      <div className="w-full flex justify-end">
        <button onClick={onFinish} className="text-[#064e3b] font-bold text-sm bg-emerald-50 px-4 py-1 rounded-full">تخطي</button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-64 h-64 mb-8">
           <img src="https://picsum.photos/seed/shop/400/400" alt="Shopping" className="rounded-3xl shadow-lg" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">كُن نفسك، الجميع مأخوذون بالفعل.</h1>
        <p className="text-gray-500 leading-relaxed">اكتشف أحدث صيحات الموضة والمنتجات المتميزة بأسعار تنافسية.</p>
      </div>

      <button 
        onClick={onFinish}
        className="w-full bg-[#064e3b] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all hover:opacity-90 shadow-lg"
      >
        <span>ابدأ الآن</span>
        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
      </button>
    </div>
  );
};

export default Onboarding;
