
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS, MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';
import MenuItemModal from '../components/MenuItemModal';
import { useCart } from '../CartContext';

const Home: React.FC = () => {
  const favoritesItems = MENU_ITEMS.slice(0, 4);
  const { cart, addToCart, removeFromCart } = useCart();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    // Load Favorites
    const savedFavs = localStorage.getItem('favoriteMenuItems');
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) { console.error(e); }
    }
  }, []);

  const updateFavorites = (newFavs: string[]) => {
    setFavorites(newFavs);
    localStorage.setItem('favoriteMenuItems', JSON.stringify(newFavs));
  };

  const toggleFavorite = (id: string) => {
    const isFav = favorites.includes(id);
    if (isFav) {
      updateFavorites(favorites.filter(favId => favId !== id));
    } else {
      updateFavorites([...favorites, id]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-[1200px] px-6 lg:px-8 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex flex-col gap-8 lg:w-1/2">
            <div className="flex flex-col gap-6">
              <span className="text-primary font-bold text-sm uppercase tracking-[0.1em]">Accra's Favorite Fusion</span>
              <h1 className="text-[#181411] dark:text-white text-5xl sm:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tight">
                Taste the Rhythm of Italy, <span className="text-primary">Spiced by Ghana.</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-xl leading-relaxed max-w-xl">
                The ultimate fusion experience. From creamy Alfredo to our signature spicy Jollof Spaghetti, Pasta King brings the world to your plate with a local kick.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/menu" className="flex items-center h-14 px-8 rounded-xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1">
                View Full Menu
              </Link>
              <Link to="/contact" className="flex items-center h-14 px-8 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#181411] dark:text-white font-bold text-lg hover:bg-gray-50 transition-all">
                Book a Table
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className="w-12 h-12 rounded-full border-4 border-white dark:border-[#1a120b] bg-gray-200 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://picsum.photos/seed/${i+10}/100/100')` }}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex text-primary text-sm">
                  {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-[20px] fill-current">star</span>)}
                </div>
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Loved by 5,000+ Foodies</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 w-full aspect-[11/10] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <div className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAiCtn9MaC-KXZYY2gypE5nJI9Oqa7y7hLoyQ-obpRdguIy8OZ6-OtV6uU0X66mkz0XfOjElNJsGayM_aeFY2-zhG4QmvoFV3CrpDbOnKIM-L6h8EKmxpQv7SxBq2L3DSgv7yNw0YD1VhHzqTycjBZIvC8aX80_atfcOgEChEBxrumypJPoO2l4xjsuROnBlgPgbJsWHzeLfVt_TQZuGw_BxBndufXjLfIZvd5TGHL6SaH_UkuTQ4zsX1j0LXU7afPNLpW7riq6DTxA')` }}>
              </div>
              <div className="absolute bottom-10 left-10 z-20 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-[240px] border border-white/20">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Featured Dish</p>
                <p className="text-xl font-black text-gray-900 leading-tight">Spicy Jollof Spaghetti</p>
                <p className="text-primary font-black text-lg mt-1">GH₵ 85.00</p>
              </div>
            </div>
            {/* Background blob for style */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Fusion Features */}
      <section className="w-full bg-white dark:bg-white/5 flex justify-center py-20 border-y border-gray-100 dark:border-white/5">
        <div className="w-full max-w-[1200px] px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
              </div>
              <h2 className="text-5xl font-black text-[#181411] dark:text-white leading-[1.1]">
                Fusion of <br /><span className="text-primary">Bold Flavors</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                Experience the best of both worlds. We don't just cook pasta; we infuse it with the soul of Ghana.
              </p>
            </div>
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { title: 'Authentic Spices', icon: 'show_chart', desc: 'Locally sourced Ghanaian spices for that authentic kick.' },
                { title: 'Fresh Ingredients', icon: 'eco', desc: 'Farm-fresh vegetables and premium meats delivered everyday.' },
                { title: 'Made with Love', icon: 'favorite', desc: 'Prepared by expert chefs who are deeply passionate about flavor.' }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-[32px] bg-background-light dark:bg-white/10 border border-transparent hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-sm">
                    <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#181411] dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Favorites Section */}
      <section className="w-full max-w-[1200px] px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col gap-3">
            <span className="text-primary font-black text-xs tracking-[0.2em] uppercase">Menu Highlights</span>
            <h2 className="text-5xl font-black text-[#181411] dark:text-white">Customer Favorites</h2>
          </div>
          <Link to="/menu" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group text-lg">
            View Full Menu <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favoritesItems.map((item) => {
            const quantity = cart[item.id] || 0;
            return (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer group flex flex-col bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {item.tags?.includes('Top Rated') && (
                      <div className="bg-white/95 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-gray-900 dark:text-white shadow-lg uppercase tracking-wider">
                        Top Rated
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-7 pt-5">
                  <h3 className="text-xl font-black text-[#181411] dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">{item.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between min-h-[44px]">
                    <span className="text-2xl font-black text-[#181411] dark:text-white">GH₵ {item.price}</span>
                    
                    {quantity === 0 ? (
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(item.id); }}
                        className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 hover:scale-110 transition-all shadow-xl shadow-primary/20"
                      >
                        <span className="material-symbols-outlined !text-2xl">add</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 bg-primary/10 rounded-full p-1 border border-primary/20" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-9 h-9 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[20px]">remove</span>
                        </button>
                        <span className="text-base font-black text-primary min-w-[1.2ch] text-center">{quantity}</span>
                        <button 
                          onClick={() => addToCart(item.id)}
                          className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[20px]">add</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-[#1a120b] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <span className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-4 block">Testimonials</span>
          <h2 className="text-5xl font-black text-white mb-16">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white/5 rounded-[40px] p-10 backdrop-blur-sm border border-white/10 text-left relative group hover:bg-white/10 transition-all duration-300">
                <span className="material-symbols-outlined text-7xl text-primary/10 absolute top-8 right-8 transition-colors group-hover:text-primary/20">format_quote</span>
                <div className="flex gap-1 text-primary mb-6">
                  {[...Array(t.rating)].map((_, i) => <span key={i} className="material-symbols-outlined text-base fill-current">star</span>)}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10 font-medium italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/30 p-1">
                    <div className="w-full h-full rounded-full bg-gray-600 bg-cover bg-center" style={{ backgroundImage: `url(${t.avatar})` }}></div>
                  </div>
                  <div>
                    <p className="font-black text-white text-lg leading-tight">{t.name}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Item Modal */}
      {selectedItem && (
        <MenuItemModal 
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          quantity={cart[selectedItem.id] || 0}
          onAdd={addToCart}
          onRemove={removeFromCart}
          isFavorite={favorites.includes(selectedItem.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default Home;
