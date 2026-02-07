
import React from 'react';
import { Product, Page } from '../types.ts';

interface Props {
  products: Product[];
  wishlistIds: number[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number) => void;
  onMoveAllToCart: (items: Product[]) => void;
  onNavigate: (page: Page) => void;
}

const Wishlist: React.FC<Props> = ({ 
  products, 
  wishlistIds, 
  onSelectProduct, 
  onAddToCart, 
  onToggleWishlist, 
  onMoveAllToCart,
  onNavigate
}) => {
  const items = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="p-6 pb-32 animate-in fade-in duration-500 text-right bg-white dark:bg-slate-900 min-h-screen">
      <header className="flex justify-between items-center mb-8 pt-2">
        <div className="flex flex-col text-right">
           <h2 className="text-2xl font-black text-gray-800 dark:text-white">المفضلة</h2>
           <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">{items.length} منتج محفوظ</p>
        </div>
        <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-500 shadow-sm border border-red-100 dark:border-red-900/20">
          <i className="fas fa-heart text-xl"></i>
        </div>
      </header>
      
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in duration-500">
          <div className="w-32 h-32 bg-gray-50 dark:bg-slate-800 text-gray-200 dark:text-slate-700 rounded-[48px] flex items-center justify-center text-5xl mb-8 shadow-inner border border-gray-100 dark:border-slate-700">
             <i className="far fa-heart"></i>
          </div>
          <h3 className="text-lg font-black text-gray-800 dark:text-white mb-2">قائمتك فارغة</h3>
          <p className="text-gray-400 dark:text-slate-500 text-xs px-12 font-bold mb-10 leading-relaxed">المنتجات التي تعجبك ستظهر هنا لتصل إليها لاحقاً بسهولة.</p>
          <button 
            onClick={() => onNavigate(Page.HOME)}
            className="bg-[#064e3b] dark:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-xs shadow-xl active-scale"
          >
            استكشف المنتجات
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
             <button 
               onClick={() => onMoveAllToCart(items)}
               className="text-[10px] font-black text-[#064e3b] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-5 py-2.5 rounded-xl border border-emerald-100 dark:border-emerald-800/20 active-scale flex items-center gap-2"
             >
               <span>نقل الكل إلى السلة</span>
               <i className="fas fa-cart-plus"></i>
             </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {items.map((p, idx) => (
              <div 
                key={p.id} 
                className="bg-white dark:bg-slate-800 rounded-[32px] shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col group active:scale-95 transition-all animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-44 cursor-pointer overflow-hidden bg-gray-50 dark:bg-slate-700" onClick={() => onSelectProduct(p)}>
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleWishlist(p.id); }}
                      className="w-8 h-8 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-red-500 flex items-center justify-center shadow-lg active-scale border border-gray-100 dark:border-slate-700"
                    >
                      <i className="fas fa-trash-alt text-[10px]"></i>
                    </button>
                  </div>
                  {p.originalPrice && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-lg shadow-md">
                      خصم %{Math.round((1 - p.price/p.originalPrice)*100)}
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="text-[10px] font-black text-gray-800 dark:text-slate-200 line-clamp-2 h-8 mb-3 leading-snug">{p.name}</h4>
                  <div className="flex justify-between items-center mt-auto">
                     <span className="text-sm font-black text-[#064e3b] dark:text-emerald-400">${p.price}</span>
                     <button 
                      onClick={() => onAddToCart(p)}
                      className="w-9 h-9 rounded-xl bg-[#064e3b] dark:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-lg active-scale"
                    >
                      <i className="fas fa-plus text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
