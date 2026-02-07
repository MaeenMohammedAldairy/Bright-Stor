
import React, { useMemo } from 'react';
import { Product, Category } from '../types.ts';
import { CATEGORIES } from '../constants.tsx';

interface Props {
  categoryId: string;
  products: Product[];
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onBack: () => void;
}

const CategoryProducts: React.FC<Props> = ({ 
  categoryId, 
  products, 
  wishlist, 
  onToggleWishlist, 
  onAddToCart, 
  onSelectProduct, 
  onBack 
}) => {
  const category = useMemo(() => 
    CATEGORIES.find(c => c.id === categoryId), 
    [categoryId]
  );

  const filteredProducts = useMemo(() => {
    if (categoryId === 'all') return products;
    return products.filter(p => p.category.toLowerCase() === categoryId.toLowerCase());
  }, [products, categoryId]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Dynamic Header */}
      <header className="p-6 pb-4 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-30">
        <button 
          onClick={onBack} 
          className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-800 dark:text-white active-scale border border-gray-100 dark:border-slate-700"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        
        <div className="flex flex-col text-right">
           <h2 className="text-xl font-black text-gray-800 dark:text-white">
             {categoryId === 'all' ? 'جميع المنتجات' : category?.name}
           </h2>
           <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
             {filteredProducts.length} منتج متوفر
           </span>
        </div>

        <div className={`w-12 h-12 ${categoryId === 'all' ? 'bg-[#064e3b] text-white' : 'bg-emerald-50 dark:bg-emerald-900/20 text-[#064e3b] dark:text-emerald-400'} rounded-2xl flex items-center justify-center border border-emerald-100 dark:border-emerald-800/30 shadow-sm`}>
          <i className={`fas ${category?.icon || 'fa-th-large'} text-lg`}></i>
        </div>
      </header>

      {/* Product Grid */}
      <div className="p-6 pt-2 pb-24 flex-1 overflow-y-auto hide-scrollbar">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(p => (
              <div 
                key={p.id} 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col active-scale transition-all duration-200"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-slate-700" onClick={() => onSelectProduct(p)}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(p.id); }}
                    className={`absolute top-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center transition-all shadow-sm ${wishlist.includes(p.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800'}`}
                  >
                    <i className={`${wishlist.includes(p.id) ? 'fas' : 'far'} fa-heart text-[10px]`}></i>
                  </button>
                </div>
                <div className="p-3 text-right flex flex-col flex-1">
                  <h4 className="text-[10px] font-bold text-gray-800 dark:text-slate-200 line-clamp-2 mb-2 leading-snug h-8" onClick={() => onSelectProduct(p)}>{p.name}</h4>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-black text-[#064e3b] dark:text-emerald-400">${p.price}</span>
                    <div className="flex items-center gap-0.5 text-[8px] text-yellow-500 font-bold">
                      <span>{p.rating}</span>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <button 
                    onClick={() => onAddToCart(p)} 
                    className="mt-auto w-full py-2 bg-[#064e3b] dark:bg-emerald-600 text-white rounded-xl text-[9px] font-black hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>أضف للسلة</span>
                    <i className="fas fa-shopping-basket text-[10px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
            <i className="fas fa-box-open text-5xl mb-4"></i>
            <p className="text-sm font-black">لا توجد منتجات حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
