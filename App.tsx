
import React, { useState, useEffect } from 'react';
import { Page, Product, User, CartItem, Category } from './types.ts';
import { db } from './services/api.ts';
import Login from './components/Login.tsx';
import Home from './components/Home.tsx';
import Categories from './components/Categories.tsx';
import Brands from './components/Brands.tsx';
import Orders from './components/Orders.tsx';
import Profile from './components/Profile.tsx';
import Cart from './components/Cart.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import BottomNav from './components/BottomNav.tsx';
import Wishlist from './components/Wishlist.tsx';
import Dashboard from './components/Dashboard.tsx';
import CategoryProducts from './components/CategoryProducts.tsx';
import Checkout from './components/Checkout.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [navigationHistory, setNavigationHistory] = useState<Page[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const [p, c, o] = await Promise.all([
        db.products.getAll(),
        db.categories.getAll(),
        db.orders.getAll()
      ]);
      setProducts(p);
      setCategories(c);
      setOrders(o);

      const savedUser = localStorage.getItem('bright_user');
      if (savedUser) setUser(JSON.parse(savedUser));
      
      const savedTheme = localStorage.getItem('bright_theme');
      if (savedTheme === 'dark') setIsDarkMode(true);
    };
    init();
  }, []);

  useEffect(() => { if (products.length) db.products.save(products); }, [products]);
  useEffect(() => { if (categories.length) db.categories.save(categories); }, [categories]);

  const navigateTo = (page: Page, product: Product | null = null, categoryId: string = 'all') => {
    if (currentPage !== page) setNavigationHistory(prev => [...prev, currentPage]);
    setCurrentPage(page);
    if (product) setSelectedProduct(product);
    if (categoryId !== 'all' || page === Page.CATEGORY_PRODUCTS) setActiveCategoryFilter(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    const history = [...navigationHistory];
    const prev = history.pop();
    setNavigationHistory(history);
    setCurrentPage(prev || Page.HOME);
  };

  const handleAddToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) return prev.map(i => i.id === p.id ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, {...p, quantity: 1}];
    });
  };

  const handleToggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleCheckout = async (orderData: any) => {
    const newOrder = await db.orders.create({ ...orderData, items: cart });
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    navigateTo(Page.ORDERS);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.LOGIN: 
        return <Login onLogin={(u) => { setUser(u); localStorage.setItem('bright_user', JSON.stringify(u)); navigateTo(Page.HOME); }} onBack={goBack} />;
      case Page.HOME: 
        return <Home user={user} products={products} categories={categories} onSelectProduct={p => navigateTo(Page.PRODUCT_DETAIL, p)} onAddToCart={handleAddToCart} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onNavigate={navigateTo} initialCategory={activeCategoryFilter} />;
      case Page.DASHBOARD: 
        return <Dashboard products={products} categories={categories} onAdd={p => setProducts([p, ...products])} onUpdate={p => setProducts(products.map(i => i.id === p.id ? p : i))} onDelete={id => setProducts(products.filter(p => p.id !== id))} onAddCategory={c => setCategories([...categories, c])} onUpdateCategory={(c, oldId) => { setCategories(categories.map(cat => cat.id === oldId ? c : cat)); if(c.id !== oldId) setProducts(products.map(p => p.category === oldId ? {...p, category: c.id} : p)); }} onDeleteCategory={id => setCategories(categories.filter(c => c.id !== id))} />;
      case Page.CART: 
        return <Cart items={cart} allProducts={products} onUpdateQty={(id, d) => setCart(cart.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))} onRemove={id => setCart(cart.filter(i => i.id !== id))} onCheckout={() => navigateTo(user ? Page.CHECKOUT : Page.LOGIN)} onMoveToWishlist={(p) => handleToggleWishlist(p.id)} onNavigate={navigateTo} onSelectProduct={p => navigateTo(Page.PRODUCT_DETAIL, p)} />;
      case Page.CHECKOUT: 
        return <Checkout items={cart} total={cart.reduce((s, i) => s + (i.price * i.quantity), 0)} onFinish={handleCheckout} onBack={goBack} />;
      case Page.ORDERS: 
        return <Orders orders={orders} />;
      case Page.WISHLIST:
        return <Wishlist products={products} wishlistIds={wishlist} onSelectProduct={p => navigateTo(Page.PRODUCT_DETAIL, p)} onAddToCart={handleAddToCart} onToggleWishlist={id => setWishlist(prev => prev.filter(i => i !== id))} onMoveAllToCart={(items) => { items.forEach(handleAddToCart); setWishlist([]); }} onNavigate={navigateTo} />;
      case Page.PRODUCT_DETAIL:
        return selectedProduct ? <ProductDetail products={products} product={selectedProduct} onBack={goBack} onAddToCart={handleAddToCart} isWishlisted={wishlist.includes(selectedProduct.id)} onToggleWishlist={() => handleToggleWishlist(selectedProduct.id)} onSelectProduct={p => setSelectedProduct(p)} /> : null;
      case Page.CATEGORIES:
        return <Categories categories={categories} products={products} onSelectCategory={id => navigateTo(Page.CATEGORY_PRODUCTS, null, id)} />;
      case Page.CATEGORY_PRODUCTS:
        return <CategoryProducts categoryId={activeCategoryFilter} products={products} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onAddToCart={handleAddToCart} onSelectProduct={p => navigateTo(Page.PRODUCT_DETAIL, p)} onBack={goBack} />;
      case Page.PROFILE: 
        return <Profile user={user} isDarkMode={isDarkMode} onToggleDarkMode={() => { setIsDarkMode(!isDarkMode); localStorage.setItem('bright_theme', !isDarkMode ? 'dark' : 'light'); }} onLogout={() => { setUser(null); localStorage.removeItem('bright_user'); navigateTo(Page.HOME); }} onUpdateUser={setUser} />;
      default: return null;
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-16">{renderPage()}</main>
      {![Page.CHECKOUT, Page.LOGIN, Page.PRODUCT_DETAIL].includes(currentPage) && (
        <BottomNav currentPage={currentPage} onNavigate={navigateTo} cartCount={cart.reduce((s, i) => s + i.quantity, 0)} user={user} />
      )}
    </div>
  );
};

export default App;
