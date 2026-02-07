
import React, { useState, useEffect } from 'react';
import { User } from '../types.ts';

interface Props {
  onLogin: (user: User) => void;
  onBack: () => void;
}

type AuthStep = 'LOGIN' | 'REGISTER' | 'VERIFY';

const Login: React.FC<Props> = ({ onLogin, onBack }) => {
  const [step, setStep] = useState<AuthStep>('LOGIN');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const generateAndSendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    console.log(`%c [Bright Store] Verification Code for ${email}: ${code}`, "color: #064e3b; font-weight: bold; font-size: 14px;");
    alert(`تم إرسال رمز التحقق إلى بريدك: ${code}`);
  };

  const handleSocialLogin = (platform: string) => {
    setSocialLoading(platform);
    setTimeout(() => {
      onLogin({ 
        name: platform === 'Google' ? 'مستخدم جوجل' : 'مستخدم فيسبوك', 
        email: `${platform.toLowerCase()}@user.com`, 
        isAdmin: false 
      });
      setSocialLoading(null);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 'LOGIN') {
      if (!email || !password) {
        setError('يرجى ملء جميع الحقول المطلوبة');
        return;
      }
      if (email === 'admin@gmail.com' && password === '123') {
        onLogin({ name: 'المدير العام', email: email, isAdmin: true });
        return;
      }
      onLogin({ name: email.split('@')[0], email: email, isAdmin: false });
    } 
    
    else if (step === 'REGISTER') {
      if (!name || !email || !password) {
        setError('يرجى ملء جميع الحقول');
        return;
      }
      if (!email.includes('@')) {
        setError('البريد الإلكتروني غير صحيح');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        generateAndSendOtp();
        setStep('VERIFY');
        setLoading(false);
      }, 1000);
    } 
    
    else if (step === 'VERIFY') {
      if (otp === generatedOtp) {
        setLoading(true);
        setTimeout(() => {
          onLogin({ name, email, isAdmin: false });
          setLoading(false);
        }, 1000);
      } else {
        setError('رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى');
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-slate-900 flex flex-col animate-in fade-in duration-500 overflow-y-auto hide-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 active-scale">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="mb-10 text-center">
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-[28px] flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-800/30">
           <i className={`fas ${step === 'REGISTER' ? 'fa-user-plus' : step === 'VERIFY' ? 'fa-shield-check' : 'fa-sign-in-alt'} text-[#064e3b] dark:text-emerald-400 text-3xl`}></i>
        </div>
        <h2 className="text-gray-800 dark:text-white text-2xl font-black">
          {step === 'REGISTER' ? 'إنشاء حساب جديد' : step === 'VERIFY' ? 'تحقق من هويتك' : 'مرحباً بك مجدداً'}
        </h2>
        <p className="text-gray-400 dark:text-slate-500 text-xs font-bold mt-1">
          {step === 'VERIFY' ? `أدخل الرمز المرسل إلى ${email}` : 'تجربة تسوق آمنة وفريدة'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 text-red-500 text-[10px] font-bold p-4 rounded-2xl border border-red-100 dark:border-red-900/20 flex items-center gap-2 animate-shake">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {step === 'REGISTER' && (
          <div className="relative group">
            <i className="far fa-user absolute right-4 top-4 text-gray-300 group-focus-within:text-[#064e3b] transition-colors"></i>
            <input 
              type="text" 
              placeholder="الاسم الكامل" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent p-4 pr-12 rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:border-[#064e3b]/30 outline-none transition-all font-bold text-xs text-gray-800 dark:text-white"
            />
          </div>
        )}

        {(step === 'LOGIN' || step === 'REGISTER') && (
          <>
            <div className="relative group">
              <i className="far fa-envelope absolute right-4 top-4 text-gray-300 group-focus-within:text-[#064e3b] transition-colors"></i>
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent p-4 pr-12 rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:border-[#064e3b]/30 outline-none transition-all font-bold text-xs text-gray-800 dark:text-white"
              />
            </div>

            <div className="relative group">
              <i className="fas fa-lock absolute right-4 top-4 text-gray-300 group-focus-within:text-[#064e3b] transition-colors"></i>
              <input 
                type="password" 
                placeholder="كلمة المرور" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent p-4 pr-12 rounded-2xl focus:bg-white dark:focus:bg-slate-700 focus:border-[#064e3b]/30 outline-none transition-all font-bold text-xs text-gray-800 dark:text-white"
              />
            </div>
          </>
        )}

        {step === 'VERIFY' && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full">
              <input 
                type="text" 
                maxLength={6}
                placeholder="000000" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent p-6 rounded-2xl text-center font-black text-2xl tracking-[1em] focus:bg-white dark:focus:bg-slate-700 focus:border-[#064e3b]/30 outline-none transition-all text-[#064e3b] dark:text-emerald-400"
              />
            </div>
            <button 
              type="button"
              onClick={generateAndSendOtp}
              className="text-[10px] font-black text-[#064e3b] dark:text-emerald-400 uppercase tracking-widest hover:underline"
            >
              إعادة إرسال الرمز
            </button>
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-[#064e3b] dark:bg-emerald-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-emerald-900/20 active-scale flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>{step === 'REGISTER' ? 'إرسال الرمز' : step === 'VERIFY' ? 'تأكيد الحساب' : 'دخول'}</span>
              <i className="fas fa-chevron-left text-[10px]"></i>
            </>
          )}
        </button>
      </form>

      {/* Social Login Section */}
      {step !== 'VERIFY' && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-gray-100 dark:bg-slate-800"></div>
            <span className="text-[10px] font-black text-gray-300 dark:text-slate-600 uppercase">أو سجل عبر</span>
            <div className="flex-1 h-[1px] bg-gray-100 dark:bg-slate-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleSocialLogin('Facebook')}
              disabled={!!socialLoading}
              className="bg-[#1877F2] text-white py-4 rounded-2xl font-black text-[11px] flex items-center justify-center gap-3 active-scale shadow-lg shadow-blue-500/10 disabled:opacity-50"
            >
              {socialLoading === 'Facebook' ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <i className="fab fa-facebook-f text-sm"></i>
                  <span>Facebook</span>
                </>
              )}
            </button>
            <button 
              onClick={() => handleSocialLogin('Google')}
              disabled={!!socialLoading}
              className="bg-white dark:bg-slate-800 text-gray-700 dark:text-white py-4 rounded-2xl font-black text-[11px] flex items-center justify-center gap-3 active-scale shadow-sm border border-gray-100 dark:border-slate-700 disabled:opacity-50"
            >
              {socialLoading === 'Google' ? (
                <div className="w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
              ) : (
                <>
                  <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-4 h-4" alt="Google" />
                  <span>Google</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="mt-auto pt-10 text-center">
        {step !== 'VERIFY' ? (
          <p className="text-gray-500 dark:text-slate-400 font-bold text-sm">
            {step === 'REGISTER' ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟'} 
            <span 
              onClick={() => setStep(step === 'REGISTER' ? 'LOGIN' : 'REGISTER')} 
              className="text-[#064e3b] dark:text-emerald-400 font-black cursor-pointer hover:underline mr-2"
            >
              {step === 'REGISTER' ? 'تسجيل دخول' : 'إنشاء حساب'}
            </span>
          </p>
        ) : (
          <button 
            onClick={() => setStep('REGISTER')}
            className="text-gray-400 dark:text-slate-500 text-xs font-bold hover:text-gray-600 active-scale"
          >
            تغيير البريد الإلكتروني
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
