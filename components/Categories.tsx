
import React, { useState, useMemo } from 'react';
import { Category, Product } from '../types.ts';

interface Props {
  categories: Category[];
  products: Product[];
  onSelectCategory: (id: string) => void;
}

const Categories: React.FC<Props> = ({ categories, products, onSelectCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return categories.filter(c => 
      c.id !== 'all' && 
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       c.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, categories]);

  const getProductCount = (categoryId: string) => {
    return products.filter(p => p.category === categoryId).length;
  };

  const getCategoryTheme = (id: string) => {
    const themes: Record<string, { 
      bg: string, 
      text: string, 
      iconBg: string, 
      gradient: string,
      shadow: string 
    }> = {
      'traditional': { 
        bg: 'bg-amber-50 dark:bg-amber-900/10', 
        text: 'text-amber-700 dark:text-amber-400', 
        iconBg: 'bg-amber-100 dark:bg-amber-800/30',
        gradient: 'from-amber-500/20 to-transparent',
        shadow: 'shadow-amber-500/10'
      },
      'food': { 
        bg: 'bg-emerald-50 dark:bg-emerald-900/10', 
        text: 'text-emerald-700 dark:text-emerald-400', 
        iconBg: 'bg-emerald-100 dark:bg-emerald-800/30',
        gradient: 'from-emerald-500/20 to-transparent',
        shadow: 'shadow-emerald-500/10'
      },
      'electronics': { 
        bg: 'bg-blue-50 dark:bg-blue-900/10', 
        text: 'text-blue-700 dark:text-blue-400', 
        iconBg: 'bg-blue-100 dark:bg-blue-800/30',
        gradient: 'from-blue-500/20 to-transparent',
        shadow: 'shadow-blue-500/10'
      },
      'perfumes': { 
        bg: 'bg-purple-50 dark:bg-purple-900/10', 
        text: 'text-purple-700 dark:text-purple-400', 
        iconBg: 'bg-purple-100 dark:bg-purple-800/30',
        gradient: 'from-purple-500/20 to-transparent',
        shadow: 'shadow-purple-500/10'
      },
      'men': { 
        bg: 'bg-slate-50 dark:bg-slate-800/20', 
        text: 'text-slate-700 dark:text-slate-400', 
        iconBg: 'bg-white dark:bg-slate-700/30',
        gradient: 'from-slate-500/20 to-transparent',
        shadow: 'shadow-slate-500/10'
      },
      'women': { 
        bg: 'bg-rose-50 dark:bg-rose-900/10', 
        text: 'text-rose-700 dark:text-rose-400', 
        iconBg: 'bg-rose-100 dark:bg-rose-800/30',
        gradient: 'from-rose-500/20 to-transparent',
        shadow: 'shadow-rose-500/10'
      },
      'accessories': { 
        bg: 'bg-cyan-50 dark:bg-cyan-900/10', 
        text: 'text-cyan-700 dark:text-cyan-400', 
        iconBg: 'bg-cyan-100 dark:bg-cyan-800/30',
        gradient: 'from-cyan-500/20 to-transparent',
        shadow: 'shadow-cyan-500/10'
      },
      'health': { 
        bg: 'bg-red-50 dark:bg-red-900/10', 
        text: 'text-red-700 dark:text-red-400', 
        iconBg: 'bg-red-100 dark:bg-red-800/30',
        gradient: 'from-red-500/20 to-transparent',
        shadow: 'shadow-red-500/10'
      },
      'home': { 
        bg: 'bg-orange-50 dark:bg-orange-900/10', 
        text: 'text-orange-700 dark:text-orange-400', 
        iconBg: 'bg-orange-100 dark:bg-orange-800/30',
        gradient: 'from-orange-500/20 to-transparent',
        shadow: 'shadow-orange-500/10'
      }
    };
    return themes[id] || { 
      bg: 'bg-gray-50 dark:bg-gray-800/20', 
      text: 'text-gray-700 dark:text-gray-400', 
      iconBg: 'bg-white dark:bg-gray-700/30',
      gradient: 'from-gray-500/20 to-transparent',
      shadow: 'shadow-gray-500/10'
    };
  };

  return (
    <div className="p-4 md:p-12 animate-in fade-in duration-500 text-right bg-white dark:bg-slate-900 min-h-screen max-w-[1440px] mx-auto w-full">
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 pt-2">
        <div className="flex flex-col text-right">
          <h2 className="text-3xl font-black text-gray-800 dark:text-white">أقسام المتجر</h2>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] mt-2">EXPLORE CATEGORIES</p>
        </div>
        
        <div className="flex-1 w-full md:max-w-md relative group">
          <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400 group-focus-within:text-[#064e3b] transition-colors"></i>
          </div>
          <input 
            type="text" 
            placeholder="ابحث عن قسم معين..."
            className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent py-5 pr-14 pl-6 rounded-[30px] outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#064e3b]/10 dark:focus:border-emerald-500/10 text-right font-bold text-sm text-gray-800 dark:text-white shadow-inner transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Grid with 2 columns mobile, 3 tablet, 5 web */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
        {filteredCategories.map((cat, idx) => {
          const theme = getCategoryTheme(cat.id);
          const count = getProductCount(cat.id);
          return (
            <div 
              key={cat.id} 
              onClick={() => onSelectCategory(cat.id)}
              className={`relative overflow-hidden group p-8 rounded-[48px] border border-gray-50 dark:border-slate-800 ${theme.bg} ${theme.shadow} flex flex-col items-center gap-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl active:scale-95 animate-in slide-in-from-bottom-4`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.gradient} blur-3xl rounded-full opacity-60`}></div>
              
              <div className={`relative z-10 w-20 h-20 md:w-24 md:h-24 ${theme.iconBg} rounded-[36px] flex items-center justify-center text-3xl md:text-4xl shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <i className={`fas ${cat.icon} ${theme.text}`}></i>
              </div>
              
              <div className="relative z-10 text-center">
                <h4 className={`font-black text-sm md:text-lg mb-2 ${theme.text}`}>{cat.name}</h4>
                <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                   <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${theme.text}`}>{count} منتج متوفر</span>
                   <i className={`fas fa-arrow-left text-[8px] md:text-[10px] ${theme.text} transform group-hover:-translate-x-1 transition-transform`}></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-40 text-center opacity-30">
           <i className="fas fa-layer-group text-7xl mb-6 text-gray-300"></i>
           <p className="text-xl font-black text-gray-400">نعتذر، لم نجد أي أقسام بهذا الاسم</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
