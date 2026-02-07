
import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types.ts';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800";

interface Props {
  products: Product[];
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onSelectProduct: (p: Product) => void;
}

const ProductDetail: React.FC<Props> = ({ products, product, onBack, onAddToCart, isWishlisted, onToggleWishlist, onSelectProduct }) => {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  const [imgSrc, setImgSrc] = useState(product.image);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setImgSrc(product.image);
    setQty(1);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [product.id, product.image]);

  const recommendedProducts = useMemo(() => {
    let related = products.filter(p => p.id !== product.id && p.category === product.category);
    if (related.length < 4) {
      const others = products.filter(p => p.id !== product.id && p.category !== product.category);
      related = [...related, ...others];
    }
    return related.slice(0, 8);
  }, [product.id, product.category, products]);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <article className="min-h-screen bg-white dark:bg-slate-900 animate-in fade-in duration-500 text-right pb-24 md:pb-0">
      {/* Floating Back Header (Mobile Only) */}
      <div className={`fixed top-0 left-0 right-0 z-[100] p-4 flex justify-between items-center transition-all duration-300 md:hidden ${isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm' : ''}`}>
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-gray-800 dark:text-white border border-gray-100 dark:border-slate-700">
          <i className="fas fa-arrow-right"></i>
        </button>
        <button 
          onClick={onToggleWishlist}
          className={`w-10 h-10 rounded-xl shadow-md flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-white border border-gray-100 dark:border-slate-700'}`}
        >
          <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`}></i>
        </button>
      </div>

      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-8 lg:gap-16 md:p-8 lg:p-12">
        
        {/* Left Side: Product Media */}
        <section className="w-full md:w-1/2 lg:w-[550px] shrink-0">
           <div className="relative aspect-square md:rounded-[48px] overflow-hidden bg-gray-50 dark:bg-slate-800 shadow-xl group">
             <img 
               src={imgSrc} 
               alt={product.name} 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
               onError={() => setImgSrc(FALLBACK_IMAGE)}
             />
             {discountPercentage > 0 && (
               <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-2xl font-black text-sm shadow-xl animate-pulse">
                 خصم %{discountPercentage}-
               </div>
             )}
           </div>
           
           {/* Thumbnail Preview (Simulated) */}
           <div className="hidden md:flex gap-4 mt-6">
              {[product.image, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200"].map((img, i) => (
                <div key={i} className={`w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${img === imgSrc ? 'border-[#064e3b] scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`} onClick={() => setImgSrc(img)}>
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
           </div>
        </section>

        {/* Right Side: Product Info */}
        <section className="flex-1 px-6 md:px-0 pt-4 md:pt-0">
          <header className="mb-8">
            <div className="flex flex-wrap items-center justify-end gap-3 mb-4">
               <span className="bg-emerald-50 dark:bg-emerald-900/20 text-[#064e3b] dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{product.category}</span>
               <span className="text-gray-300 dark:text-slate-600">|</span>
               <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                  <span>{product.rating}</span>
                  <i className="fas fa-star"></i>
               </div>
            </div>
            
            <h1 className="text-2xl lg:text-4xl font-black text-gray-800 dark:text-white leading-tight mb-4">{product.name}</h1>
            
            <div className="flex items-end justify-end gap-4 mb-6">
              {product.originalPrice && (
                <span className="text-lg text-gray-300 dark:text-slate-600 line-through font-bold mb-1">${product.originalPrice}</span>
              )}
              <span className="text-4xl font-black text-[#064e3b] dark:text-emerald-400">${product.price}</span>
            </div>
            
            <p className="text-gray-400 dark:text-slate-500 text-xs font-bold">{product.brand} • تم بيع أكثر من {product.sales} قطعة</p>
          </header>

          {/* Trust Features */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { icon: 'fa-truck-fast', text: 'شحن مجاني' },
              { icon: 'fa-shield-check', text: 'أصلي 100%' },
              { icon: 'fa-rotate-left', text: 'إرجاع سهل' }
            ].map((f, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-gray-100 dark:border-slate-700 flex flex-col items-center gap-2 text-center">
                <i className={`fas ${f.icon} text-[#064e3b] dark:text-emerald-400 text-lg`}></i>
                <span className="text-[10px] font-black text-gray-600 dark:text-slate-400">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Buy Action (Web View) */}
          <div className="hidden md:flex items-center gap-6 mb-12 p-6 bg-white dark:bg-slate-800 rounded-[32px] border border-gray-100 dark:border-slate-700 shadow-sm">
             <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-700 p-2 rounded-2xl">
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 bg-white dark:bg-slate-600 rounded-xl shadow-sm text-[#064e3b] dark:text-emerald-400 font-black active-scale">+</button>
                <span className="font-black text-gray-800 dark:text-white w-6 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 bg-white dark:bg-slate-600 rounded-xl shadow-sm text-gray-400 dark:text-slate-400 font-black active-scale">-</button>
             </div>
             <button 
               onClick={() => onAddToCart(product)}
               className="flex-1 bg-[#064e3b] dark:bg-emerald-600 text-white py-5 rounded-2xl font-black shadow-2xl shadow-emerald-900/20 active-scale flex items-center justify-center gap-4 text-sm"
             >
               <span>إضافة إلى سلة المشتريات</span>
               <i className="fas fa-shopping-basket"></i>
             </button>
          </div>

          {/* Details Tabs */}
          <div className="mb-12">
            <div className="flex gap-8 border-b border-gray-100 dark:border-slate-800 mb-6">
              <button onClick={() => setActiveTab('desc')} className={`pb-4 text-sm font-black transition-all relative ${activeTab === 'desc' ? 'text-[#064e3b] dark:text-emerald-400' : 'text-gray-300 dark:text-slate-600'}`}>
                الوصف التفصيلي
                {activeTab === 'desc' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#064e3b] dark:bg-emerald-400 rounded-full"></div>}
              </button>
              <button onClick={() => setActiveTab('specs')} className={`pb-4 text-sm font-black transition-all relative ${activeTab === 'specs' ? 'text-[#064e3b] dark:text-emerald-400' : 'text-gray-300 dark:text-slate-600'}`}>
                المواصفات الفنية
                {activeTab === 'specs' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#064e3b] dark:bg-emerald-400 rounded-full"></div>}
              </button>
            </div>
            
            <div className="min-h-[120px] animate-in fade-in slide-in-from-top-2">
              {activeTab === 'desc' ? (
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-loose font-medium">
                  نقدم لكم {product.name}، الذي يجسد قمة الجودة والاتقان. تم اختيار هذا المنتج بعناية فائقة لضمان أفضل تجربة لمستخدمي متجر برايت. يتميز بتصميم عصري وخامات متينة تدوم طويلاً، مما يجعله الخيار الأمثل لمن يبحث عن الفخامة والعملية في آن واحد.
                </p>
              ) : (
                <ul className="space-y-4">
                  {[
                    { l: 'العلامة التجارية', v: product.brand },
                    { l: 'الحالة', v: 'منتج جديد' },
                    { l: 'الضمان', v: 'سنتين ضد عيوب التصنيع' },
                    { l: 'التوصيل', v: 'متوفر خلال 24 ساعة' }
                  ].map((s, i) => (
                    <li key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-800/50">
                      <span className="text-xs font-black text-gray-800 dark:text-slate-300">{s.v}</span>
                      <span className="text-xs font-bold text-gray-400 dark:text-slate-500">{s.l}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Recommended Section (Full Width) */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 border-t border-gray-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-10">
           <div className="h-1 flex-1 bg-gray-100 dark:bg-slate-800 mx-8 rounded-full hidden md:block"></div>
           <h3 className="text-2xl font-black text-gray-800 dark:text-white shrink-0">منتجات قد تنال إعجابك</h3>
        </div>
        
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 -mx-6 px-6">
          {recommendedProducts.map(p => (
            <div 
              key={p.id} 
              onClick={() => { onSelectProduct(p); window.scrollTo(0,0); }}
              className="min-w-[180px] md:min-w-[220px] bg-white dark:bg-slate-800 rounded-[32px] border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col active-scale group hover:shadow-xl transition-all"
            >
              <div className="h-44 md:h-52 bg-gray-50 dark:bg-slate-700 overflow-hidden relative">
                <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)} />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-4 text-right flex flex-col flex-1">
                <h4 className="text-[11px] font-bold text-gray-800 dark:text-slate-200 line-clamp-2 h-8 mb-4 leading-tight">{p.name}</h4>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm font-black text-[#064e3b] dark:text-emerald-400">${p.price}</span>
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-700 flex items-center justify-center text-gray-400 group-hover:bg-[#064e3b] group-hover:text-white transition-colors">
                    <i className="fas fa-plus text-[10px]"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Bar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-100 dark:border-slate-800 flex items-center gap-4 z-[110] pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] md:hidden">
        <button 
          onClick={() => onAddToCart(product)}
          className="flex-1 bg-[#064e3b] dark:bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-emerald-900/10 active-scale flex items-center justify-center gap-3 text-sm"
        >
          <span>إضافة للسلة</span>
          <i className="fas fa-shopping-basket"></i>
        </button>
        
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-gray-100 dark:border-slate-700">
          <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-[#064e3b] dark:text-emerald-400 font-black active-scale">+</button>
          <span className="font-black text-gray-800 dark:text-white w-4 text-center text-xs">{qty}</span>
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-gray-400 dark:text-slate-500 font-black active-scale">-</button>
        </div>
      </nav>
    </article>
  );
};

export default ProductDetail;
