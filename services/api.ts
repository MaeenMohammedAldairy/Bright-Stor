
import { Product, Category } from '../types.ts';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES } from '../constants.tsx';

const KEYS = {
  PRODUCTS: 'bright_products',
  CATEGORIES: 'bright_categories',
  ORDERS: 'bright_orders',
  USER: 'bright_user'
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const db = {
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(300);
      const data = localStorage.getItem(KEYS.PRODUCTS);
      return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    },
    save: async (products: Product[]) => {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    }
  },
  categories: {
    getAll: async (): Promise<Category[]> => {
      await delay(200);
      const data = localStorage.getItem(KEYS.CATEGORIES);
      return data ? JSON.parse(data) : INITIAL_CATEGORIES;
    },
    save: async (categories: Category[]) => {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
    }
  },
  orders: {
    getAll: async () => {
      const data = localStorage.getItem(KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    },
    create: async (order: any) => {
      const orders = await db.orders.getAll();
      const newOrder = { 
        ...order, 
        id: Math.floor(100000 + Math.random() * 900000), 
        status: 'pending', 
        date: new Date().toISOString() 
      };
      const updated = [newOrder, ...orders];
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(updated));
      return newOrder;
    }
  }
};
