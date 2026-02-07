
import React, { useState } from 'react';
import { CartItem } from '../types.ts';

interface Props {
  items: CartItem[];
  onFinish: (orderData: any) => void;
  onBack: () => void;
  total: number;
}

interface ValidationErrors {
  name?: string;
  phone?: string;
  address?: string;
}

const Checkout: React.FC<Props> = ({ items, onFinish, onBack, total }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'صنعاء',
    address: '',
    payment: 'cash'
  });

  const validateStep1 = () => {
    const newErrors: ValidationErrors = {};
    
    if (formData.name.trim().length < 3) {
      newErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }
    
    const phoneRegex = /^7[01378]\d{7}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح (مثال: 777123456)';
    }
    
    if (formData.address.trim().length < 10) {
      newErrors.address = 'يرجى كتابة عنوان مفصل (10 أحرف على الأقل)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
        window.scrollTo(0, 0);
      }
    } else if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      processOrder();
    }
  };

  const processOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-[40px] flex items-center justify-center text-4xl text-emerald-500 mb-8 animate-bounce">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-2">تم استلام طلبك!</h2>
        <p className="text-xs text-gray-400 dark:text-slate-500 font-bold mb-10 leading-relaxed px-6">
          طلبك في طريقه إليك. يمكنك تتبعه من قائمة الطلبات في حسابك.
        </p>
        <button 
          onClick={() => onFinish({ ...formData, total })}
          className="w-full bg-[#064e3b] dark:bg-emerald-600 text-white py-5 rounded-[24px] font-black text-sm shadow-xl active-scale"
        >
          عرض طلباتي
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-32 animate-in slide-in-from-left-4">
      <header className="p-6 pt-10 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50">
        <div className="flex justify-between items-center mb-8">
           <button onClick={onBack} className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 active-scale">
             <i className="fas fa-arrow-right"></i>
           </button>
           <h2 className="text-lg font-black text-gray-800 dark:text-white">إكمال الشراء</h2>
           <div className="w-10"></div>
        </div>
        
        <div className="flex items-center justify-between px-4 relative">
          <div className="absolute left-4 right-4 h-0.5 bg-gray-100 dark:bg-slate-800 top-1/2 -translate-y-1/2 z-0"></div>
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 ${
                step >= s ? 'bg-[#064e3b] text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'
              }`}
            >
              {step > s ? <i className="fas fa-check"></i> : s}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 px-1">
           <span className={`text-[8px] font-black uppercase ${step >= 1 ? 'text-[#064e3b] dark:text-emerald-400' : 'text-gray-300'}`}>العنوان</span>
           <span className={`text-[8px] font-black uppercase ${step >= 2 ? 'text-[#064e3b] dark:text-emerald-400' : 'text-gray-300'}`}>الدفع</span>
           <span className={`text-[8px] font-black uppercase ${step >= 3 ? 'text-[#064e3b] dark:text-emerald-400' : 'text-gray-300'}`}>المراجعة</span>
        </div>
      </header>

      <div className="p-6">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-sm font-black text-gray-800 dark:text-white mb-2 text-right">معلومات التوصيل</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <input 
                  value={formData.name} 
                  onChange={e => {
                    setFormData({...formData, name: e.target.value});
                    if(errors.name) setErrors({...errors, name: undefined});
                  }} 
                  placeholder="الاسم الكامل" 
                  className={`w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-xs dark:text-white outline-none border transition-colors ${errors.name ? 'border-red-500/50 bg-red-50/10' : 'border-transparent focus:border-[#064e3b]/20'}`} 
                />
                {errors.name && <span className="text-[9px] text-red-500 font-bold mr-2">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <input 
                  type="tel" 
                  value={formData.phone} 
                  onChange={e => {
                    setFormData({...formData, phone: e.target.value.replace(/\D/g, '')});
                    if(errors.phone) setErrors({...errors, phone: undefined});
                  }} 
                  placeholder="رقم الهاتف (مثال: 777123456)" 
                  className={`w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-xs dark:text-white outline-none border transition-colors ${errors.phone ? 'border-red-500/50 bg-red-50/10' : 'border-transparent focus:border-[#064e3b]/20'}`} 
                />
                {errors.phone && <span className="text-[9px] text-red-500 font-bold mr-2">{errors.phone}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <textarea 
                  value={formData.address} 
                  onChange={e => {
                    setFormData({...formData, address: e.target.value});
                    if(errors.address) setErrors({...errors, address: undefined});
                  }} 
                  placeholder="العنوان بالتفصيل (المدينة، الحي، الشارع، المعالم القريبة)" 
                  className={`w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-xs dark:text-white outline-none min-h-[100px] border transition-colors ${errors.address ? 'border-red-500/50 bg-red-50/10' : 'border-transparent focus:border-[#064e3b]/20'}`} 
                />
                {errors.address && <span className="text-[9px] text-red-500 font-bold mr-2">{errors.address}</span>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-sm font-black text-gray-800 dark:text-white mb-6 text-right">وسيلة الدفع</h3>
            <div className="space-y-4">
              {['cash', 'wallet', 'card'].map(m => (
                <div key={m} onClick={() => setFormData({...formData, payment: m})} className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${formData.payment === m ? 'border-[#064e3b] bg-emerald-50 dark:bg-emerald-900/10' : 'border-gray-50 dark:border-slate-800 bg-gray-50/50'}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.payment === m ? 'border-[#064e3b] bg-[#064e3b]' : 'border-gray-200'}`}>
                    {formData.payment === m && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-xs font-black dark:text-white">{m === 'cash' ? 'الدفع عند الاستلام' : m === 'wallet' ? 'محفظة برايت' : 'بطاقة ائتمان'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-sm font-black text-gray-800 dark:text-white mb-6 text-right">ملخص الطلب</h3>
            <div className="bg-[#1e293b] p-6 rounded-[32px] text-white space-y-4">
               <div className="flex justify-between items-center opacity-60 text-[10px]">
                  <span>${total.toFixed(2)}</span>
                  <span>المبلغ</span>
               </div>
               <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <span className="text-2xl font-black">${total.toFixed(2)}</span>
                  <span className="text-xs font-black">الإجمالي الكلي</span>
               </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-2xl space-y-2 text-right">
               <p className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest">توصيل إلى:</p>
               <p className="text-xs font-black text-gray-800 dark:text-white">{formData.name}</p>
               <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 leading-relaxed">{formData.address}</p>
               <p className="text-[10px] font-black text-[#064e3b] dark:text-emerald-400">{formData.phone}</p>
            </div>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 z-[100]">
        <button 
          onClick={handleNext}
          disabled={loading}
          className="w-full bg-[#064e3b] dark:bg-emerald-600 text-white py-5 rounded-[24px] font-black text-sm shadow-xl active-scale disabled:opacity-30 flex items-center justify-center gap-3"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span>{step === 3 ? 'تأكيد ودفع' : 'الخطوة التالية'}</span>}
        </button>
      </nav>
    </div>
  );
};

export default Checkout;
