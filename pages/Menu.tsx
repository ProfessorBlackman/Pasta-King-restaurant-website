
import React, { useState, useMemo } from 'react';
import { Category } from '../types';
import { MENU_ITEMS } from '../constants';
import { useCart } from '../CartContext';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { cart, addToCart, removeFromCart, clearCart, subtotal, deliveryFee, totalPrice } = useCart();

  const handleCheckout = () => {
    setShowSuccess(true);
    clearCart();
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const categories = ['All', Category.CHEFS_SPECIALS, Category.MEAT_LOVERS, Category.SEAFOOD, Category.VEGETARIAN];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, quantity]) => {
      const item = MENU_ITEMS.find(m => m.id === id);
      return { item, quantity };
    }).filter(i => i.item !== undefined);
  }, [cart]);

  return (
    <div className="w-full bg-[#f8f7f6] dark:bg-background-dark min-h-screen">
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 animate-in slide-in-from-top duration-300">
          <div className="bg-green-500 text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4">
            <span className="material-symbols-outlined !text-4xl">check_circle</span>
            <div>
              <p className="font-black text-lg">Order Received!</p>
              <p className="text-sm opacity-90">Chef Kwame is getting started on your meal.</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Menu Area */}
        <div className="flex-1">
          {/* Header Search Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input 
                type="text"
                placeholder="Search menu items..."
                className="w-full h-12 pl-12 pr-4 bg-white dark:bg-card-dark border border-gray-200 dark:border-white/5 rounded-xl focus:ring-primary focus:border-primary font-medium dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Promo Banner */}
          <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-3xl overflow-hidden mb-10 shadow-lg group">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1200')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-8 md:p-12">
              <span className="inline-block px-4 py-1.5 bg-primary text-white text-[10px] font-black rounded-full mb-4 w-fit uppercase tracking-widest">Free Delivery on Orders > GHS 200</span>
              <h1 className="text-white text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tight">The Rhythm of Ghana<br/>on an Italian Plate</h1>
              <p className="text-white/80 font-medium">Authentic, Spicy, Unforgettable.</p>
            </div>
          </div>

          {/* Categories Tab */}
          <div className="flex items-center gap-6 border-b border-gray-200 dark:border-white/5 mb-8 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredItems.map((item) => {
              const q = cart[item.id] || 0;
              return (
                <div key={item.id} className="bg-white dark:bg-card-dark rounded-2xl p-4 flex gap-4 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group">
                  <div className="size-24 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{item.name}</h3>
                      <span className="font-bold text-primary whitespace-nowrap">GHS {item.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
                    <div className="mt-auto">
                      {q === 0 ? (
                        <button 
                          onClick={() => addToCart(item.id)}
                          className="w-full flex items-center justify-center gap-2 h-10 rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary dark:text-gray-300 font-bold text-xs transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span> Add to Order
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 bg-primary/5 dark:bg-primary/10 rounded-lg p-1 border border-primary/20 h-10">
                          <button onClick={() => removeFromCart(item.id)} className="size-8 rounded bg-white dark:bg-background-dark text-primary flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="flex-1 text-center font-black text-primary text-sm">{q}</span>
                          <button onClick={() => addToCart(item.id)} className="size-8 rounded bg-primary text-white flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredItems.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <span className="material-symbols-outlined !text-6xl text-gray-200 mb-4">search_off</span>
                <p className="text-gray-500 dark:text-gray-400 font-bold text-xl">No items found matching your search</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Cart */}
        <div className="lg:w-[400px]">
          <div className="sticky top-[110px] bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl p-6 lg:p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Your Order</h2>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{cartItems.length} Items</span>
            </div>

            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-4xl text-gray-200 mb-2">shopping_basket</span>
                  <p className="text-gray-400 font-medium">Your cart is empty</p>
                </div>
              ) : cartItems.map(({ item, quantity }) => (
                <div key={item?.id} className="flex gap-4 items-center">
                  <img src={item?.image} className="size-14 rounded-lg object-cover" alt={item?.name} />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900 dark:text-white leading-tight">{item?.name}</p>
                    <p className="text-[10px] text-primary font-bold">GHS {item!.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(item!.id)} className="size-6 rounded border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-400 hover:border-primary transition-colors">
                      <span className="material-symbols-outlined text-[14px]">remove</span>
                    </button>
                    <span className="font-bold text-sm dark:text-white min-w-[1ch] text-center">{quantity}</span>
                    <button onClick={() => addToCart(item!.id)} className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[14px]">add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-gray-900 dark:text-white">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span> Delivery Details
              </h3>
              <div className="flex flex-col gap-2">
                <input type="text" placeholder="Delivery Address" className="h-11 rounded-xl bg-gray-50 dark:bg-background-dark border-gray-100 dark:border-white/5 focus:ring-primary focus:border-primary text-sm px-4 dark:text-white" />
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-white/5 pt-6 flex flex-col gap-3">
              <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>Subtotal</span>
                <span>GHS {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>Delivery Fee</span>
                <span>GHS {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 dark:text-white mt-2">
                <span>Total</span>
                <span className="text-primary">GHS {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button 
              disabled={cartItems.length === 0}
              onClick={handleCheckout}
              className="w-full h-14 bg-primary text-white rounded-xl font-black text-lg uppercase tracking-wider shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
