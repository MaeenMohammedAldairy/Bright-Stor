
import React, { useState, useMemo } from 'react';
import { CartItem, Product, Page } from '../types.ts';

interface Props {
  items: CartItem[];
  allProducts: Product[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onMoveToWishlist: (p: Product) => void;
  onNavigate: (page: Page) => void;
  onSelectProduct: (p: Product) => void;
}

const Cart: React.FC<Props> = ({ 
  items, 
  allProducts, 
  onUpdateQty, 
  onRemove, 
  onCheckout, 
  onMoveToWishlist,
  onNavigate,
  onSelectProduct
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const freeShippingThreshold = 200;
  const shipping = items.length > 0 && subtotal < freeShippingThreshold ? 15.00 : 0;
  const total = subtotal - discount + shipping;

  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const suggestions = useMemo(() => {
    const itemIds = items.map(i => i.id);
    return allProducts
      .filter(p => !itemIds.includes(p.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  }, [items, allProducts]);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'bright') {
      setIsPromoApplied(true);
    } else {
      alert('كود الخصم غير صحيح');
    }
  };

  return (
    <div className="p-4 md:p-12 animate-in fade-in duration-500 text-right bg-white dark:bg-slate-900 min-h-screen max-w-[1440px] mx-auto w-full">
      <header className="flex justify-between items-center mb-12">
        <button 
          className="text-red-500 text-[10px] font-black bg-red-50 dark:bg-red-900/10 px-6 py-3 rounded-2xl active-scale" 
          onClick={() => { if(window.confirm('هل تريد تفريغ السلة؟')) items.forEach(i => onRemove(i.id)) }}
        >
          تفريغ السلة بالكامل
        </button>
        <div className="flex flex-col text-right">
           <h2 className="text-3xl font-black text-gray-800 dark:text-white">حقيبة التسوق</h2>
           <p className="text-xs text-gray-400 dark:text-slate-500 font-bold mt-1">لديك {items.length} منتجات بانتظار الشراء</p>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 text-center animate-in zoom-in">
          <div className="w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 text-[#064e3b] dark:text-emerald-400 rounded-[50px] flex items-center justify-center text-6xl mb-10 shadow-inner border border-emerald-100 dark:border-emerald-800/20">
             <i className="fas fa-shopping-basket"></i>
          </div>
          <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-4">حقيبتك تتوق للتميز!</h3>
          <p className="text-gray-400 dark:text-slate-500 text-sm px-12 font-bold mb-12 max-w-md mx-auto leading-relaxed">اكتشف أحدث المنتجات اليمنية والعالمية واملأ سلتك بما يليق بك.</p>
          <button 
            onClick={() => onNavigate(Page.HOME)}
            className="bg-[#064e3b] dark:bg-emerald-600 text-white px-16 py-5 rounded-2xl font-black text-sm shadow-2xl active-scale"
          >
            ابدأ التسوق الآن
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-start">
          {/* Summary Section - Sidebar on Desktop */}
          <aside className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-8 order-1 lg:order-2">
            <div className="bg-[#1e293b] dark:bg-slate-800/80 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              
              <h3 className="text-xl font-black mb-8 relative z-10">ملخص الطلب</h3>

              <div className="space-y-6 mb-10 relative z-10">
                <div className="flex justify-between items-center opacity-60 text-xs font-black uppercase tracking-widest">
                  <span>${subtotal.toFixed(2)}</span>
                  <span>المجموع الفرعي</span>
                </div>
                <div className="flex justify-between items-center opacity-60 text-xs font-black uppercase tracking-widest">
                  <span>{shipping === 0 ? 'مجاني' : `$${shipping.toFixed(2)}`}</span>
                  <span>تكلفة الشحن</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-400 text-xs font-black uppercase tracking-widest">
                    <span>-${discount.toFixed(2)}</span>
                    <span>خصم ترويجي</span>
                  </div>
                )}
                <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                  <span className="text-4xl font-black">${total.toFixed(2)}</span>
                  <span className="font-black text-sm">الإجمالي</span>
                </div>
              </div>

              {/* Promo Input inside summary */}
              <div className="flex gap-3 mb-8 relative z-10">
                <button 
                  onClick={handleApplyPromo}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 rounded-2xl font-black text-[10px] active-scale transition-colors"
                >تطبيق</button>
                <input 
                  type="text" 
                  placeholder="كود الخصم"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className="flex-1 bg-white/10 p-4 rounded-2xl text-right font-bold text-xs text-white outline-none border border-transparent focus:border-white/20"
                />
              </div>

              <button 
                onClick={onCheckout}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-6 rounded-[32px] font-black shadow-2xl shadow-emerald-500/30 active-scale transition-all flex items-center justify-center gap-4 relative z-10"
              >
                <span>إتمام عملية الدفع</span>
                <i className="fas fa-chevron-left text-[12px]"></i>
              </button>
            </div>
            
            {/* Free Shipping Progress inside sidebar */}
            <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-[32px] border border-emerald-100 dark:border-emerald-800/20">
               <div className="flex justify-between items-center mb-3">
                  <span className={`text-[11px] font-black ${subtotal >= freeShippingThreshold ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500'}`}>
                    {subtotal >= freeShippingThreshold ? 'حصلت على شحن مجاني! 🚚' : `أضف $${(freeShippingThreshold - subtotal).toFixed(0)} للشحن المجاني`}
                  </span>
                  <i className="fas fa-shipping-fast text-emerald-600"></i>
               </div>
               <div className="w-full h-2.5 bg-white dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${progressToFreeShipping}%` }}></div>
               </div>
            </div>
          </aside>

          {/* Items List - Flexible Main Content */}
          <div className="flex-1 space-y-6 order-2 lg:order-1 w-full">
            {items.map(item => (
              <div key={item.id} className="flex gap-6 items-center bg-white dark:bg-slate-800 p-6 rounded-[40px] border border-gray-50 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] overflow-hidden shrink-0 bg-gray-50 dark:bg-slate-700 relative">
                  <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <button 
                    onClick={() => { onMoveToWishlist(item); onRemove(item.id); }}
                    className="absolute top-2 left-2 w-10 h-10 bg-white/95 dark:bg-slate-900/95 rounded-2xl flex items-center justify-center text-red-500 text-sm shadow-xl active-scale opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i className="far fa-heart"></i>
                  </button>
                </div>
                
                <div className="flex-1 text-right flex flex-col justify-between h-full py-2">
                  <div className="flex justify-between items-start">
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 dark:text-slate-600 hover:text-red-500 transition-colors p-2"><i className="fas fa-trash-alt"></i></button>
                    <div>
                       <h4 className="text-sm md:text-lg font-black text-gray-800 dark:text-white mb-1 line-clamp-1">{item.name}</h4>
                       <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">{item.brand}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-end md:items-center mt-6">
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-700 p-1.5 rounded-2xl border border-gray-100 dark:border-slate-600">
                      <button onClick={() => onUpdateQty(item.id, 1)} className="w-10 h-10 bg-white dark:bg-slate-600 rounded-xl shadow-sm text-[#064e3b] dark:text-emerald-400 font-black active-scale text-lg transition-colors hover:bg-emerald-50">+</button>
                      <span className="text-sm font-black text-gray-800 dark:text-white w-6 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, -1)} className="w-10 h-10 bg-white dark:bg-slate-600 rounded-xl shadow-sm text-gray-400 dark:text-slate-400 font-black active-scale text-lg transition-colors hover:bg-red-50">-</button>
                    </div>
                    <span className="font-black text-[#064e3b] dark:text-emerald-400 text-2xl mt-4 md:mt-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Cross-selling Section in Web View */}
            <section className="mt-20 pt-12 border-t border-gray-50 dark:border-slate-800">
              <h3 className="text-xl font-black text-gray-800 dark:text-white mb-8">قد يعجبك أيضاً</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 {suggestions.map(p => (
                   <div key={p.id} onClick={() => onSelectProduct(p)} className="bg-gray-50 dark:bg-slate-800/40 rounded-[32px] p-4 border border-transparent hover:border-emerald-500/20 shadow-sm transition-all active-scale cursor-pointer flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-white dark:bg-slate-700">
                         <img src={p.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-black text-gray-800 dark:text-white truncate mb-1">{p.name}</h5>
                        <p className="text-sm font-black text-[#064e3b] dark:text-emerald-400">${p.price}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
