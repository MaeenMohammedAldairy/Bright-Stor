
export interface User {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sales: number;
  available?: number;
  category: string;
  brand: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  productsCount: number;
}

export enum Page {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  CATEGORIES = 'CATEGORIES',
  CATEGORY_PRODUCTS = 'CATEGORY_PRODUCTS',
  BRANDS = 'BRANDS',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  WISHLIST = 'WISHLIST',
  DASHBOARD = 'DASHBOARD',
  CHECKOUT = 'CHECKOUT'
}
