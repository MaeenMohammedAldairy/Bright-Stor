
import React, { useState, useMemo, useEffect } from 'react';
import { Product, Page, User, Category } from '../types.ts';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800";

const ProductCard = ({ product, isWishlisted, isAdding, onToggleWishlist, onClick, onAddToCart }: any) => {
  const [isHeartPulsing, setIsHeartPulsing] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHeartPulsing(true);
    onToggleWishlist();
    setTimeout(() => setIsHeartPulsing(false), 400);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[28px] shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col active-scale transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-slate-700" onClick={onClick}>
        <img 
          src={imgSrc} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
          loading="lazy" 
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <div className="absolute top-3 left-3 z-10">
           <button 
             onClick={handleWishlistClick}
             className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-md transform ${isHeartPulsing ? 'scale-125' : 'scale-100'} ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800'}`}
           >
             <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart text-[12px] ${isHeartPulsing ? 'animate-pulse' : ''}`}></i>
           </button>
        </div>
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-md">
            %{Math.round((1 - product.price/product.originalPrice)*100)}-
          </div>
        )}
      </div>
      <div className="p-4 text-right flex flex-col flex-1">
        <h4 className="text-[11px] md:text-xs font-bold text-gray-800 dark:text-slate-200 line-clamp-2 mb-2 leading-snug h-10" onClick={onClick}>{product.name}</h4>
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-black text-[#064e3b] dark:text-emerald-400">${product.price}</span>
          <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-bold">
            <span>{product.rating}</span>
            <i className="fas fa-star"></i>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} 
          className={`mt-auto w-full py-3 rounded-2xl text-[10px] font-black transition-all flex items-center justify-center gap-2 transform active:scale-95 ${
            isAdding 
            ? 'bg-emerald-600 text-white scale-105 shadow-lg shadow-emerald-500/20' 
            : 'bg-[#064e3b] text-white hover:bg-emerald-900 shadow-md'
          }`}
        >
          <span>{isAdding ? 'تمت الإضافة' : 'أضف للسلة'}</span>
          <i className={`fas ${isAdding ? 'fa-check' : 'fa-shopping-basket'}`}></i>
        </button>
      </div>
    </div>
  );
};

interface Props {
  user: User | null;
  products: Product[];
  categories: Category[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onNavigate: (page: Page) => void;
  initialCategory?: string;
}

const Home: React.FC<Props> = ({ user, products, categories, onSelectProduct, onAddToCart, wishlist, onToggleWishlist, onNavigate, initialCategory = 'all' }) => {
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeHero, setActiveHero] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHero(prev => (prev === 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const allFilteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, products]);

  const displayedProducts = useMemo(() => {
    return allFilteredProducts.slice(0, visibleCount);
  }, [allFilteredProducts, visibleCount]);

  const handleAdd = (p: Product) => {
    setLastAddedId(p.id);
    onAddToCart(p);
    setTimeout(() => setLastAddedId(null), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 max-w-[1440px] mx-auto w-full">
      <div className="p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#064e3b] dark:bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <i className="fas fa-bolt text-2xl"></i>
            </div>
            <div className="flex flex-col text-right">
              <h1 className="font-black text-gray-800 dark:text-white text-2xl tracking-tight leading-none">متجر برايت</h1>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] mt-1">PREMIUM EXPERIENCE</p>
            </div>
          </div>

          <div className="flex-1 w-full md:max-w-xl relative">
            <input 
              type="text" 
              placeholder="ابحث عن العسل، البن، أو أحدث الإلكترونيات..."
              className="w-full bg-gray-100 dark:bg-slate-800 border-none py-4 pr-12 pl-4 rounded-[20px] outline-none focus:ring-2 focus:ring-[#064e3b]/10 text-right font-bold text-xs text-gray-800 dark:text-white transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => onNavigate(Page.WISHLIST)} className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-gray-800 dark:text-white hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm">
              <i className="far fa-heart text-xl"></i>
            </button>
            <button onClick={() => onNavigate(Page.CART)} className="w-12 h-12 bg-[#064e3b] text-white rounded-2xl flex items-center justify-center shadow-lg active-scale">
              <i className="fas fa-shopping-cart text-xl"></i>
            </button>
          </div>
        </header>

        {!searchQuery && (
          <>
            <section className="relative mb-12 h-[220px] md:h-[400px] w-full overflow-hidden rounded-[40px] shadow-2xl">
               {[
                 { title: "عسل السدر الملكي العصيمي", desc: "خصم حصري 25% لعملاء برايت الجدد", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200", color: "from-amber-900/90" },
                 { title: "عالم آبل في متناول يدك", desc: "أحدث إصدارات iPhone 15 Pro Max متوفرة الآن", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=1200", color: "from-slate-900/90" }
               ].map((banner, idx) => (
                 <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeHero ? 'opacity-100' : 'opacity-0'}`}>
                   <img src={banner.image} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)} />
                   <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} via-transparent`}></div>
                   <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-start text-white text-right max-w-2xl">
                      <h2 className="text-2xl md:text-5xl font-black mb-4 leading-tight">{banner.title}</h2>
                      <p className="text-xs md:text-lg opacity-80 mb-8 font-bold">{banner.desc}</p>
                      <button className="bg-white text-[#064e3b] px-10 py-4 rounded-2xl text-xs md:text-sm font-black shadow-2xl active-scale hover:bg-emerald-50 transition-colors">اكتشف المجموعة</button>
                   </div>
                 </div>
               ))}
            </section>

            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                 <button onClick={() => onNavigate(Page.CATEGORIES)} className="text-xs font-black text-[#064e3b] dark:text-emerald-400 hover:underline">مشاهدة الكل</button>
                 <h3 className="text-lg font-black text-gray-800 dark:text-white">تصفح حسب الفئة</h3>
              </div>
              <div className="flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar pb-4">
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className="flex flex-col items-center gap-3 shrink-0 active-scale group">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[28px] flex items-center justify-center text-xl md:text-2xl transition-all duration-500 ${activeCategory === cat.id ? 'bg-[#064e3b] text-white shadow-2xl -translate-y-2' : 'bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-slate-500 border border-gray-100 dark:border-slate-700 hover:border-emerald-500/30'}`}>
                      <i className={`fas ${cat.icon}`}></i>
                    </div>
                    <span className={`text-[10px] md:text-xs font-black transition-colors ${activeCategory === cat.id ? 'text-[#064e3b] dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600'}`}>{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        <section className="min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 p-1 rounded-xl">
               <button className="px-4 py-2 text-[10px] font-black text-gray-400">الأقل سعراً</button>
               <button className="px-4 py-2 text-[10px] font-black bg-white dark:bg-slate-700 text-[#064e3b] dark:text-white rounded-lg shadow-sm">الأكثر مبيعاً</button>
            </div>
            <h3 className="text-lg font-black text-gray-800 dark:text-white">منتجات مختارة لك</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {displayedProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                isWishlisted={wishlist.includes(p.id)}
                isAdding={lastAddedId === p.id}
                onToggleWishlist={() => onToggleWishlist(p.id)}
                onClick={() => onSelectProduct(p)} 
                onAddToCart={() => handleAdd(p)}
              />
            ))}
          </div>

          {visibleCount < allFilteredProducts.length && (
            <div className="py-16 flex flex-col items-center justify-center">
               <button 
                 onClick={() => setVisibleCount(prev => prev + 8)}
                 className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-12 py-4 rounded-2xl font-black text-xs text-gray-600 dark:text-slate-300 shadow-sm active-scale flex items-center gap-3"
               >
                 <span>تحميل المزيد</span>
                 <i className="fas fa-arrow-down"></i>
               </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
