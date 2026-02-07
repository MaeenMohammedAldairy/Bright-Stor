
import { Product, Category, Brand } from './types.ts';

export const PRODUCTS: Product[] = [
  // --- تراثيات (traditional) ---
  { id: 1, name: "جنبية صيفاني أصيلة - نصل فولاذي وحزام مطرز", price: 850.00, originalPrice: 990.00, image: "https://images.unsplash.com/photo-1579618210881-26245f782c5a?auto=format&fit=crop&q=80&w=800", rating: 5.0, sales: 12, category: "traditional", brand: "Yemen Heritage" },
  { id: 2, name: "مبخرة نحاسية صنعانية منقوشة يدوياً", price: 45.00, image: "https://images.unsplash.com/photo-1615485240384-552e40019c41?auto=format&fit=crop&q=80&w=800", rating: 4.8, sales: 340, category: "traditional", brand: "Sanaa Crafts" },
  { id: 3, name: "إبريق قهوة (دلة) يمني نحاسي ثقيل", price: 65.00, image: "https://images.unsplash.com/photo-1544787210-2827448b304c?auto=format&fit=crop&q=80&w=800", rating: 4.9, sales: 120, category: "traditional", brand: "Traditional Yemen" },

  // --- عسل ومحاصيل (food) ---
  { id: 10, name: "عسل سدر ملكي عصيمي فاخر - 1 كجم", price: 180.00, originalPrice: 210.00, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800", rating: 4.9, sales: 1200, category: "food", brand: "Yemen Royal" },
  { id: 11, name: "بن خولاني محمص - خلطة برايت الخاصة", price: 35.00, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800", rating: 4.7, sales: 5600, category: "food", brand: "Al-Kbous" },
  { id: 12, name: "زبيب رازقي فاخر من مزارع اليمن", price: 25.00, image: "https://images.unsplash.com/photo-1628102476625-59274204b38d?auto=format&fit=crop&q=80&w=800", rating: 4.8, sales: 890, category: "food", brand: "Yemen Farm" },

  // --- إلكترونيات (electronics) ---
  { id: 20, name: "iPhone 15 Pro Max - تيتانيوم طبيعي 512GB", price: 1299.00, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800", rating: 4.9, sales: 450, category: "electronics", brand: "Apple" },
  { id: 21, name: "Samsung Galaxy S24 Ultra - Titanium Gray", price: 1199.00, originalPrice: 1300.00, image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=800", rating: 4.8, sales: 310, category: "electronics", brand: "Samsung" },
  { id: 22, name: "سماعات Sony WH-1000XM5 عازلة للضوضاء", price: 349.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800", rating: 4.9, sales: 1200, category: "electronics", brand: "Sony" },

  // --- عطور (perfumes) ---
  { id: 30, name: "عطر عود القصر - بخور ملكي مركز", price: 95.00, originalPrice: 120.00, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800", rating: 5.0, sales: 230, category: "perfumes", brand: "Aden Scents" },
  { id: 31, name: "عطر ديور سوفاج - 100 مل بارفيوم", price: 145.00, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800", rating: 4.9, sales: 4500, category: "perfumes", brand: "Dior" },

  // --- أزياء (fashion/men/women) ---
  { id: 40, name: "شال كشميري يمني - تطريز يدوي فاخر", price: 110.00, image: "https://images.unsplash.com/photo-1606132617300-47455850937a?auto=format&fit=crop&q=80&w=800", rating: 4.8, sales: 430, category: "men", brand: "Yemen Style" },
  { id: 41, name: "حذاء طبي مريح Skechers GoWalk", price: 85.00, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", rating: 4.7, sales: 1540, category: "men", brand: "Skechers" },
  { id: 50, name: "حقيبة يد جلدية كلاسيكية - بني غامق", price: 120.00, image: "https://images.unsplash.com/photo-1584917033904-493bb3c39d09?auto=format&fit=crop&q=80&w=800", rating: 4.8, sales: 670, category: "women", brand: "Fashionista" }
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'الكل', icon: 'fa-grid-2' },
  { id: 'traditional', name: 'تراثيات', icon: 'fa-landmark' },
  { id: 'food', name: 'عسل ومحاصيل', icon: 'fa-seedling' },
  { id: 'electronics', name: 'إلكترونيات', icon: 'fa-mobile-screen-button' },
  { id: 'perfumes', name: 'عطور وبخور', icon: 'fa-sparkles' },
  { id: 'men', name: 'أزياء رجالية', icon: 'fa-user-tie' },
  { id: 'women', name: 'أزياء نسائية', icon: 'fa-person-dress' },
  { id: 'home', name: 'المنزل', icon: 'fa-house-chimney' }
];

export const BRANDS: Brand[] = [
  { id: 'al-kbous', name: 'الكبوس', logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=100", productsCount: 150 },
  { id: 'apple', name: 'Apple', logo: "https://images.unsplash.com/photo-1611186871348-b1ec696e5237?auto=format&fit=crop&q=80&w=100", productsCount: 88 },
  { id: 'samsung', name: 'Samsung', logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=100", productsCount: 124 },
  { id: 'dior', name: 'Dior', logo: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=100", productsCount: 42 }
];
