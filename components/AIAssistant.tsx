
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types.ts';

interface Props {
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  products: Product[];
}

const AIAssistant: React.FC<Props> = ({ onClose, onSelectProduct, products }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'أهلاً بك في متجر برايت! أنا مساعدك الذكي، كيف يمكنني مساعدتك في اختيار المنتج المثالي اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const productContext = products.slice(0, 10).map(p => `${p.name} ($${p.price})`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `أنت مساعد مبيعات ذكي لمتجر "برايت". لدينا المنتجات التالية: ${productContext}. 
        أجب على سؤال العميل باللغة العربية بأسلوب ودود ومختصر.
        سؤال العميل: ${userText}`,
      });

      const aiText = response.text || 'عذراً، لم أستطع فهم ذلك.';
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'عذراً، واجهت مشكلة تقنية.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl flex flex-col h-[75vh] overflow-hidden animate-in slide-in-from-bottom-20 duration-300">
        <header className="p-6 flex justify-between items-center bg-[#064e3b] text-white">
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10">
            <i className="fas fa-times"></i>
          </button>
          <h3 className="font-black text-sm">مساعد برايت الذكي</h3>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-slate-800/50">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-4 rounded-3xl text-[11px] font-bold shadow-sm ${
                m.role === 'user' ? 'bg-white dark:bg-slate-800 text-gray-800 dark:text-white' : 'bg-emerald-50 dark:bg-emerald-900/20 text-[#064e3b] dark:text-emerald-400'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-center text-[10px] text-gray-400">جاري التفكير...</div>}
          <div ref={chatEndRef} />
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex gap-3">
          <button onClick={handleSend} disabled={loading} className="w-12 h-12 bg-[#064e3b] dark:bg-emerald-600 text-white rounded-2xl flex items-center justify-center disabled:opacity-50">
            <i className="fas fa-paper-plane-rtl"></i>
          </button>
          <input 
            type="text" 
            placeholder="اسألني أي شيء..."
            className="flex-1 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-5 text-right font-bold text-xs focus:ring-1 focus:ring-[#064e3b]/20 outline-none dark:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
