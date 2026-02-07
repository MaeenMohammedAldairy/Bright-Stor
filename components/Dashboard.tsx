
import React, { useState, useRef } from 'react';
import { Product, Category } from '../types.ts';

interface Props {
  products: Product[];
  categories: Category[];
  onAdd: (p: Product) => void;
  onUpdate: (p: Product) => void;
  onDelete: (id: number) => void;
  onAddCategory: (cat: Category) => void;
  onUpdateCategory: (cat: Category, oldId: string) => void;
  onDeleteCategory: (id: string) => void;
}

const Dashboard: React.FC<Props> = ({ 
  products, categories, onAdd, onUpdate, onDelete, onAddCategory, onUpdateCategory, onDeleteCategory 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [showForm, setShowForm] = useState<'product' | 'category' | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const handleCategoryClick = (cat: Category) => {
    setEditData({ ...cat, oldId: cat.id });
    setShowForm('category');
  };

  const handleProductClick = (p: Product) => {
    setEditData(p);
    setShowForm('product');
  };

  return (
    <div className="p-6 pb-24 text-right animate-in fade-in duration-500 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <header className="mb-8 space-y-6">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => {
              if (activeTab === 'products') {
                setEditData({ name: '', price: 0, category: categories[0]?.id || 'food', image: '', brand: '', rating: 5, sales: 0 });
                setShowForm('product');
              } else {
                setEditData({ name: '', id: '', icon: 'fa-box' });
                setShowForm('category');
              }
            }}
            className="bg-[#064e3b] dark:bg-emerald-600 text-white px-6 py-3 rounded-2xl text-[11px] font-black shadow-xl active-scale"
          >
            <i className="fas fa-plus ml-2"></i>
            {activeTab === 'products' ? 'إضافة منتج' : 'إضافة قسم'}
          </button>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">لوحة الإدارة</h2>
        </div>

        <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl flex gap-2 border border-gray-100 dark:border-slate-700">
           <button onClick={() => setActiveTab('categories')} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${activeTab === 'categories' ? 'bg-[#064e3b] text-white shadow-md' : 'text-gray-400'}`}>الأقسام</button>
           <button onClick={() => setActiveTab('products')} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${activeTab === 'products' ? 'bg-[#064e3b] text-white shadow-md' : 'text-gray-400'}`}>المنتجات</button>
        </div>
      </header>

      {activeTab === 'categories' ? (
        <div className="space-y-4">
          <p className="text-[9px] text-emerald-600 font-bold mb-2 mr-2">* انقر على القسم لتعديله</p>
          {categories.filter(c => c.id !== 'all').map(cat => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat)}
              className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 flex items-center justify-between cursor-pointer group active:scale-95 transition-all"
            >
              <button onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat.id); }} className="text-red-400 hover:text-red-600 p-2"><i className="fas fa-trash-alt"></i></button>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <h4 className="text-xs font-black text-gray-800 dark:text-white group-hover:text-emerald-500">{cat.name}</h4>
                  <p className="text-[8px] text-gray-400">المعرف: {cat.id}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-[#064e3b] dark:text-emerald-400"><i className={`fas ${cat.icon}`}></i></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white dark:bg-slate-800 p-4 rounded-3xl flex items-center gap-4 border border-gray-100 dark:border-slate-700">
              <div className="flex flex-col gap-2">
                <button onClick={() => handleProductClick(p)} className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg flex items-center justify-center"><i className="fas fa-edit text-xs"></i></button>
                <button onClick={() => onDelete(p.id)} className="w-8 h-8 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg flex items-center justify-center"><i className="fas fa-trash text-xs"></i></button>
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-[11px] font-black dark:text-white truncate max-w-[150px]">{p.name}</h4>
                <p className="text-[10px] text-emerald-600 font-black">${p.price}</p>
              </div>
              <img src={p.image} className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0" />
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[500] flex items-end justify-center p-0">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowForm(null)}></div>
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-t-[40px] p-8 animate-in slide-in-from-bottom-20 duration-300 shadow-2xl overflow-y-auto max-h-[90vh]">
             <h3 className="text-xl font-black text-gray-800 dark:text-white mb-8 text-center">{editData.id || editData.oldId ? 'تعديل' : 'إضافة'} {showForm === 'category' ? 'قسم' : 'منتج'}</h3>
             <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  if(showForm === 'category') {
                    editData.oldId ? onUpdateCategory(editData, editData.oldId) : onAddCategory(editData);
                  } else {
                    editData.id ? onUpdate(editData) : onAdd({...editData, id: Date.now()});
                  }
                  setShowForm(null); 
                }} 
                className="space-y-4"
              >
                <input required placeholder="الاسم" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-xs dark:text-white outline-none border border-transparent focus:border-emerald-500/20" />
                {showForm === 'category' ? (
                  <>
                    <input required placeholder="المعرف (ID بالإنجليزية)" value={editData.id} onChange={e => setEditData({...editData, id: e.target.value.toLowerCase()})} className="w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-xs dark:text-white outline-none" />
                    <input required placeholder="أيقونة (fa-heart, fa-box...)" value={editData.icon} onChange={e => setEditData({...editData, icon: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-xs dark:text-white outline-none" />
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="number" step="0.01" required placeholder="السعر" value={editData.price} onChange={e => setEditData({...editData, price: parseFloat(e.target.value)})} className="w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-xs dark:text-white outline-none" />
                      <select value={editData.category} onChange={e => setEditData({...editData, category: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-xs dark:text-white outline-none appearance-none">
                        {categories.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <input placeholder="رابط الصورة" value={editData.image} onChange={e => setEditData({...editData, image: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl text-right font-bold text-xs dark:text-white outline-none" />
                  </>
                )}
                <button type="submit" className="w-full bg-[#064e3b] dark:bg-emerald-600 text-white py-5 rounded-2xl font-black shadow-lg active-scale mt-4">حفظ البيانات</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
