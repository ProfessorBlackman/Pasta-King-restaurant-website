
import React, { useState, useMemo } from 'react';
import { GALLERY_ITEMS } from '../constants';

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Dishes', 'Interior', 'Kitchen', 'Happy Faces'];

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-12">
      <div className="flex flex-col gap-4 text-center items-center mb-10">
        <h1 className="text-[#181411] text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
          Our Gallery
        </h1>
        <p className="text-[#897261] text-lg max-w-2xl">
          Experience the fusion of flavors and the warmth of our space. From our Ghanaian-inspired pasta dishes to your table.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex h-10 items-center justify-center gap-x-2 rounded-full px-6 transition-all shadow-sm hover:shadow-md ${
              activeFilter === filter ? 'bg-primary text-white font-bold' : 'bg-white border border-[#e5e0dc] text-[#181411] font-medium hover:border-primary hover:text-primary'
            }`}
          >
            {filter === 'All' && <span className="material-symbols-outlined text-[20px]">grid_view</span>}
            {filter === 'Dishes' && <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>}
            {filter === 'Interior' && <span className="material-symbols-outlined text-[20px]">table_restaurant</span>}
            {filter === 'Kitchen' && <span className="material-symbols-outlined text-[20px]">skillet</span>}
            {filter === 'Happy Faces' && <span className="material-symbols-outlined text-[20px]">emoji_emotions</span>}
            <span className="text-sm">{filter}</span>
          </button>
        ))}
      </div>

      <div className="masonry columns-1 sm:columns-2 lg:columns-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="masonry-item group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
            <img 
              alt={item.title} 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" 
              src={item.image} 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-4xl">visibility</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-bold">{item.title}</p>
              <p className="text-white/80 text-xs">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 w-full bg-white border-y border-[#f4f2f0] rounded-3xl overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
          <div className="flex flex-col gap-2 max-w-[720px]">
            <h2 className="text-[#181411] tracking-tight text-[32px] md:text-4xl font-black leading-tight">Hungry yet?</h2>
            <p className="text-[#897261] text-lg">Our tables fill up fast! Book a table or order delivery now to experience the taste of Pasta King.</p>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary hover:bg-primary/90 text-white text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5">Book a Table</button>
            <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-white border-2 border-primary text-primary hover:bg-primary/5 text-base font-bold transition-transform hover:-translate-y-0.5">Order Delivery</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
