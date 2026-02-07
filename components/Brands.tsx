
import React from 'react';
import { BRANDS } from '../constants.tsx';

interface Props {
  onSelectBrand: (brandName: string) => void;
}

const Brands: React.FC<Props> = ({ onSelectBrand }) => {
  return (
    <div className="p-6 pb-32 animate-in fade-in duration-700 text-right bg-white dark:bg-slate-900 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div className="w-12 h-12 bg-[#1e293b] dark:bg-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg border border-gray-100 dark:border-slate-700">
          <i className="fas fa-certificate"></i>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">شركاء الجودة</h2>
          <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold mt-1">أفضل الماركات العالمية والمحلية</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {BRANDS.map((brand, idx) => (
          <div 
            key={brand.id} 
            onClick={() => onSelectBrand(brand.name)}
            className="group bg-white dark:bg-slate-800 p-6 rounded-[36px] border border-gray-50 dark:border-slate-700 shadow-sm flex flex-col items-center gap-5 hover:border-[#064e3b]/30 transition-all cursor-pointer active:scale-95 animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="w-20 h-20 rounded-[28px] overflow-hidden bg-gray-50 dark:bg-slate-700 p-4 border-4 border-gray-50 dark:border-slate-600">
               <img src={brand.logo} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="text-center">
              <h4 className="font-black text-gray-800 dark:text-white">{brand.name}</h4>
              <span className="text-[9px] bg-gray-50 dark:bg-slate-700 text-gray-400 dark:text-slate-400 px-2 py-1 rounded-lg font-black mt-2 inline-block">
                {brand.productsCount} منتج
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
