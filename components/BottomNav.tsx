
import React, { useEffect, useState } from 'react';
import { Page, User } from '../types.ts';

interface Props {
  currentPage: Page;
  onNavigate: (p: Page) => void;
  cartCount: number;
  user: User | null;
}

const BottomNav: React.FC<Props> = ({ currentPage, onNavigate, cartCount, user }) => {
  const [jiggle, setJiggle] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setJiggle(true);
      const timer = setTimeout(() => setJiggle(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin || false;

  const navItems = [
    { id: isLoggedIn ? Page.PROFILE : Page.LOGIN, icon: 'far fa-user', label: isLoggedIn ? 'حسابي' : 'دخول' },
    { id: Page.WISHLIST, icon: 'far fa-heart', label: 'المفضلة' },
    { id: Page.HOME, icon: 'fas fa-home', center: true, label: 'الرئيسية' },
    { id: Page.CART, icon: 'fas fa-shopping-cart', badge: true, label: 'السلة' },
    { id: isAdmin ? Page.DASHBOARD : Page.CATEGORIES, icon: isAdmin ? 'fas fa-chart-line' : 'fas fa-th-large', label: isAdmin ? 'الإدارة' : 'الأقسام' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-16 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 flex items-center justify-around z-[100] pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = currentPage === item.id;
        
        if (item.center) {
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 w-14 active-scale ${
                isActive ? 'text-[#064e3b] dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-0.5 transform transition-transform ${isActive ? 'bg-[#064e3b] dark:bg-emerald-600 text-white shadow-lg -translate-y-1' : 'bg-gray-50 dark:bg-slate-700 text-gray-400'}`}>
                <i className={`${item.icon} text-lg`}></i>
              </div>
              <span className="text-[8px] font-bold">{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center relative transition-all duration-300 w-14 active-scale ${
              isActive ? 'text-[#064e3b] dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500'
            }`}
          >
            <div className={`relative mb-0.5 transform transition-all ${jiggle && item.badge ? 'animate-bounce scale-110' : ''}`}>
              <i className={`${item.icon} text-lg ${isActive ? 'text-[#064e3b] dark:text-emerald-400 font-bold' : ''}`}></i>
              {item.badge && cartCount > 0 && (
                 <span className={`absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full font-black ring-1 ring-white ${jiggle ? 'animate-pulse' : ''}`}>
                   {cartCount > 9 ? '9+' : cartCount}
                 </span>
              )}
            </div>
            <span className="text-[8px] font-bold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
