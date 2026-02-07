
import React, { useState } from 'react';

interface Props {
  orders: any[];
}

const Orders: React.FC<Props> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleCall = () => {
    window.location.href = "tel:+967777777777";
  };

  return (
    <div className="p-6 pb-32 animate-in fade-in duration-500 text-right bg-white dark:bg-slate-900 min-h-screen">
      <h2 className="text-2xl font-black mb-8 text-gray-800 dark:text-white">طلباتي</h2>
      
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-30">
          <i className="fas fa-box-open text-6xl mb-4"></i>
          <p className="font-bold">لا توجد طلبات سابقة</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white dark:bg-slate-800 p-5 rounded-[32px] border border-gray-100 dark:border-slate-700 shadow-sm animate-in slide-in-from-bottom-4"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[8px] px-3 py-1 rounded-full font-black ${order.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {order.status === 'pending' ? 'قيد المراجعة' : 'مكتمل'}
                </span>
                <div className="text-right">
                  <h4 className="text-xs font-black dark:text-white">طلب رقم #{order.id.toString().slice(-6)}</h4>
                  <p className="text-[9px] text-gray-400">{new Date(order.date).toLocaleDateString('ar-YE')}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-slate-700">
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="text-[10px] text-emerald-600 font-black"
                >التفاصيل</button>
                <div className="flex gap-2">
                  <span className="font-black text-gray-800 dark:text-white">${order.total}</span>
                  <span className="text-[10px] text-gray-400">الإجمالي:</span>
                </div>
              </div>

              {selectedOrder?.id === order.id && (
                <div className="mt-6 pt-6 border-t border-dashed border-gray-200 dark:border-slate-600 space-y-4 animate-in fade-in">
                   <div className="space-y-2">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center text-[10px] font-bold">
                           <span className="dark:text-slate-300">${item.price * item.quantity}</span>
                           <span className="dark:text-white">{item.name} (x{item.quantity})</span>
                        </div>
                      ))}
                   </div>
                   <button 
                    onClick={handleCall}
                    className="w-full bg-[#064e3b] dark:bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 active:scale-95"
                   >
                     <i className="fas fa-phone"></i>
                     <span>اتصال بالسائق للتنسيق</span>
                   </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
