
import React, { useState, useMemo } from 'react';
import { useCart } from '../CartContext';

const BuildYourOwn: React.FC = () => {
  const [base, setBase] = useState('Classic Penne');
  const [sauce, setSauce] = useState('');
  const [protein, setProtein] = useState('');
  const [toppings, setToppings] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  
  const { cart, addToCart, removeFromCart } = useCart();
  const quantity = cart['custom-bowl'] || 0;

  const BASES = [
    { name: 'Classic Penne', price: 0, image: 'https://images.unsplash.com/photo-1551462147-3a88588d447f?auto=format&fit=crop&q=80&w=400' },
    { name: 'Spaghetti', price: 0, image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=400' },
    { name: 'Fusilli Spirals', price: 0, image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400' },
    { name: 'Jasmine Rice', price: 5, image: 'https://images.unsplash.com/photo-1516685018646-527ad952f864?auto=format&fit=crop&q=80&w=400' }
  ];

  const SAUCES = [
    { name: 'Jollof Sauce', tag: 'SIGNATURE', desc: 'Spicy, smoky tomato stew base with ginger and scotch bonnet.', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=400' },
    { name: 'Creamy Alfredo', desc: 'Rich parmesan and garlic cream sauce with fresh herbs.', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=400' },
    { name: 'Basil Pesto', desc: 'Fresh basil, pine nuts, garlic, and extra virgin olive oil.', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400' }
  ];

  const PROTEINS = [
    { name: 'Suya Chicken', price: 25, desc: 'Grilled with traditional peanut spice rub.', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=400' },
    { name: 'Grilled Shrimp', price: 45, desc: 'Marinated in garlic and lemon butter.', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400' },
    { name: 'Crispy Tofu', price: 15, desc: 'Pan-fried with soy ginger glaze.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' },
    { name: 'Grilled Beef', price: 35, desc: 'Tender strips with black pepper.', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400' }
  ];

  const total = useMemo(() => {
    let sum = 50.0; // Base price for custom bowl
    sum += BASES.find(b => b.name === base)?.price || 0;
    sum += PROTEINS.find(p => p.name === protein)?.price || 0;
    toppings.forEach(t => {
      // Note: TOPPINGS array not explicitly used in logic here but left for parity
    });
    return sum;
  }, [base, protein]);

  const handleAdd = () => {
    addToCart('custom-bowl');
    if (quantity === 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleRemove = () => {
    removeFromCart('custom-bowl');
  };

  return (
    <div className="w-full bg-[#f8f7f6] dark:bg-background-dark min-h-screen">
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom duration-300">
          <div className="bg-primary text-white px-8 py-4 rounded-full shadow-2xl font-black flex items-center gap-3">
            <span className="material-symbols-outlined">check_circle</span>
            Custom Bowl Added!
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 flex flex-col gap-12">
          <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1200')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-12">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">Build Your Own Bowl</span>
              <h1 className="text-white text-5xl md:text-7xl font-black leading-[0.9] mb-6 tracking-tighter">Your Pasta,<br/>Your Rules.</h1>
              <p className="text-white/70 text-lg font-medium max-w-md">Mix authentic Italian pasta with bold West African spices.</p>
            </div>
          </div>

          <div className="flex flex-col gap-16">
            <section className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg">1</div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Select Base</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BASES.map(b => (
                  <button key={b.name} onClick={() => setBase(b.name)} className={`group flex flex-col bg-white dark:bg-card-dark rounded-2xl p-4 text-left border-2 transition-all ${base === b.name ? 'border-primary ring-4 ring-primary/10' : 'border-gray-100 dark:border-white/5'}`}>
                    <div className="aspect-square rounded-xl overflow-hidden mb-4"><img src={b.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={b.name} /></div>
                    <p className="font-black text-gray-900 dark:text-white text-sm mb-1">{b.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{b.price > 0 ? `+GHS ${b.price}` : 'Free'}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg">2</div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Pick Sauce</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SAUCES.map(s => (
                  <button key={s.name} onClick={() => setSauce(s.name)} className={`group relative flex flex-col bg-white dark:bg-card-dark rounded-3xl p-6 text-left border-2 transition-all ${sauce === s.name ? 'border-primary ring-4 ring-primary/10' : 'border-gray-100 dark:border-white/5'}`}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6"><img src={s.image} className="w-full h-full object-cover" alt={s.name} /></div>
                    <p className="font-black text-gray-900 dark:text-white text-lg mb-2">{s.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg">3</div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Add Protein</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROTEINS.map(p => (
                  <button key={p.name} onClick={() => setProtein(protein === p.name ? '' : p.name)} className={`flex items-center gap-4 bg-white dark:bg-card-dark rounded-2xl p-4 border-2 transition-all ${protein === p.name ? 'border-primary ring-4 ring-primary/10' : 'border-gray-100 dark:border-white/5'}`}>
                    <div className="size-16 rounded-lg overflow-hidden shrink-0"><img src={p.image} className="w-full h-full object-cover" alt={p.name} /></div>
                    <div className="flex-1 text-left">
                      <p className="font-black text-gray-900 dark:text-white text-sm">{p.name}</p>
                      <p className="text-[10px] text-primary font-black">+GHS {p.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="lg:w-[420px]">
          <div className="sticky top-[110px] bg-primary rounded-[40px] shadow-2xl p-8 lg:p-10 flex flex-col text-white">
            <h2 className="text-3xl font-black mb-1 uppercase tracking-tighter">Review Order</h2>
            <p className="text-white/70 text-sm font-medium mb-10">Custom Fusion Bowl</p>

            <div className="flex flex-col gap-8 mb-auto">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div><span className="text-[10px] font-black uppercase text-white/50 block mb-1">Base</span><p className="font-black text-lg">{base}</p></div>
                <span className="text-sm font-bold">GHS 50.00</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div><span className="text-[10px] font-black uppercase text-white/50 block mb-1">Sauce</span><p className="font-black text-lg">{sauce || 'None selected'}</p></div>
                <span className="text-sm font-bold">-</span>
              </div>
              {protein && (
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div><span className="text-[10px] font-black uppercase text-white/50 block mb-1">Protein</span><p className="font-black text-lg">{protein}</p></div>
                  <span className="text-sm font-bold">+GHS {PROTEINS.find(p => p.name === protein)?.price}</span>
                </div>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex justify-between items-end mb-8">
                <span className="text-sm font-bold opacity-70 uppercase">Total</span>
                <span className="text-6xl font-black">GHS {total}</span>
              </div>
              
              {quantity === 0 ? (
                <button 
                  disabled={!sauce}
                  onClick={handleAdd}
                  className="w-full h-16 bg-white text-primary rounded-2xl font-black text-xl uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 hover:bg-gray-50 disabled:opacity-50"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-1 border border-white/20 h-16">
                  <button onClick={handleRemove} className="size-14 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-3xl">remove</span></button>
                  <span className="flex-1 text-center font-black text-white text-3xl">{quantity}</span>
                  <button onClick={handleAdd} className="size-14 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-3xl">add</span></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildYourOwn;
