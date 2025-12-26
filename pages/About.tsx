
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-[1200px] px-6 lg:px-8 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex flex-col gap-8 lg:w-1/2">
            <div className="flex flex-col gap-6">
              <h1 className="text-[#181411] text-5xl sm:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tight">
                The Pasta King <span className="text-primary">Story</span>
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed max-w-xl">
                Bringing the fiery soul of West Africa to the heart of Italian cuisine. A fusion born from passion, travel, and a love for bold flavors.
              </p>
            </div>
            <div className="flex pt-2">
              <Link to="/menu" className="flex items-center h-14 px-8 rounded-xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1">
                View Our Menu
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <div className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBj5TXCimLsJn4vzaorP6DWZXqjS9yuVS1QQYMpgx-E74D8WWmxRZWxedQahyy0O4AY3elE-vuJGtuyIDqRd_zdxhWU3rvadD05Xr_QSrW6vVHL_saEaz9mpIKZ11Zomb2pjEb-Px6ZbmWZ9vpEwryyPrGybn4a8cJD--dUo56mYkiwTUN6ZNzluFc5zkSAvW8CNFfVfQvj-XN0UtgGyIQjhd5pAJY9mt1GcJtQT6O_ubUKXTG345mBljeXAzDnAiSAzFKLh42tf8K')` }}>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Icons Section */}
      <section className="w-full bg-[#fdfaf5] py-20 border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'cottage', title: 'Bold Spices', desc: 'Authentic Shito and Jollof seasonings in every sauce.' },
              { icon: 'restaurant_menu', title: 'Fresh Pasta', desc: 'Hand-rolled daily using traditional Italian techniques.' },
              { icon: 'volunteer_activism', title: 'Community First', desc: 'Sourcing locally and supporting Ghanaian farmers.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-sm">
                  <span className="material-symbols-outlined !text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-black text-[#181411]">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Section */}
      <section className="w-full max-w-[1200px] px-6 lg:px-8 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl border border-gray-100">
              <div className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRS4DLpRoXSMRWAQUrF22dxGZAGHmJXUH0XK87SwGMCRPwHEBL29U0SvbCZwN_iMfJFrCSIzokGJSMZ0yLsFj7eu6rXBtY22nXQ93xoUH_qnxN-5yyFzmMPqQXHnG6BuCp9yRk6-SzOxDIOjE_30xT6ABm9IgBjXyokFmGV3hDaBM_SIcKcIWD0_G9k629cDq0CHxdRU0TfmbLTN8fC9q5yK8Fcqo_0QTOu43ovxq2IBQ0uyKNVhQbFq8zON2kAmsyX8o0N1QXlyKs')` }}>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <span className="text-primary font-black text-xs tracking-[0.2em] uppercase">Our Origins</span>
            <h2 className="text-5xl font-black text-[#181411] leading-tight">From Accra to Rome</h2>
            <div className="flex flex-col gap-6 text-gray-500 text-lg leading-relaxed font-medium">
              <p className="text-[#181411] font-black">It started with a trip.</p>
              <p>
                Our founder, Kwame, traveled to Italy in 2018 to study culinary arts. While he fell in love with the texture of perfectly al dente pasta, he found himself missing the heat and depth of West African stews.
              </p>
              <p>
                One evening in a small apartment in Rome, he experimented by adding homemade Shito to his Marinara. The result was electric. He realized that Jollof seasoning and authentic tomato sauces share a soul—one we now bring to every plate at Pasta King.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full max-w-[1200px] px-6 lg:px-8 py-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 flex flex-col gap-6 text-right lg:items-end">
            <span className="text-primary font-black text-xs tracking-[0.2em] uppercase">Our Philosophy</span>
            <h2 className="text-5xl font-black text-[#181411] leading-tight">The Fusion Kitchen</h2>
            <div className="flex flex-col gap-6 text-gray-500 text-lg leading-relaxed font-medium">
              <p className="text-[#181411] font-black">Where cultures collide.</p>
              <p>
                We don't just add spice; we marry cultures. Using local ingredients like dawadawa and scotch bonnet peppers alongside imported Italian semolina, we create pasta dishes that are uniquely Ghanaian yet respect Italian tradition.
              </p>
              <p>
                Every dish tells a story of adaptation and respect. It is not just food; it is a conversation between two great culinary heritages.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl border border-gray-100">
              <div className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkZ6oJJISj53yIomyPTMMHCaLvobqaYPPCpIw82HGjZrS_4kz6lmg6ZbyytAWDiRz1hpxxzF22Bl-4EuPDR-7wqiohlqUpVTs-oI0R2uUTRKKxmDoo0lnDvTfDDVGpN5bsoMqcIR9gngwwQlmMkx52Didh_YVqjGZLEz084NrUQHosS4f0_dEs_FoqEslguVTxTNhdk0_Nr1tvggqoNoBSxpHX_LBFcsjGcvtrk-M4Y4gLzpVH4kThJMnrhkIMdTt1pkn5UAMRup3B')` }}>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Profile */}
      <section className="w-full bg-[#fdfaf5] py-24 px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full border-8 border-white shadow-2xl overflow-hidden mb-8 transform transition-transform hover:scale-105 duration-500">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTZl0-FoUnGPJPxbTHdapE3BDZ4YDg-rUxGxWEEH6eX1EcO4PWVvlmCEKs7y6b-BsLo5MEaXxXFrQIpDR2FX493Npx1pyN9zdccxW9nie68jSp3ic3pmjFMB-Abc0W3lxxPAErDY3xCG1vZ67WtBIMvC7rPZ8uC7p9dq0Lj6EmbWDsMYCQm4bqQCo7ux2tSI7eGLgg6A_21aWXqMueQ-wz972MRNits9NbE5P6pI9rrmpFEmiJCzP9t5DMX3nSN4noSGODfctoxhJw')` }}></div>
          </div>
          <h2 className="text-3xl font-black text-[#181411]">Chef Kwame Mensah</h2>
          <p className="text-primary font-bold uppercase tracking-widest text-sm mt-2 mb-10">Founder & Head Chef</p>
          
          <div className="relative">
            <span className="material-symbols-outlined text-7xl text-gray-200 absolute -top-10 -left-12 opacity-50">format_quote</span>
            <p className="text-2xl md:text-3xl text-gray-500 font-medium leading-relaxed italic relative z-10">
              "Food is the most honest language I know. At Pasta King, we speak with the warmth of Accra and the elegance of Rome. We want you to taste the love in every single bite."
            </p>
          </div>
        </div>
      </section>

      {/* Ready CTA Section */}
      <section className="w-full bg-primary py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center text-white">
          <h2 className="text-5xl font-black mb-6">Ready to taste the fusion?</h2>
          <p className="text-xl mb-12 text-white/90 leading-relaxed font-medium">
            Join us for an unforgettable dining experience. Book your table today or order online for delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-10 py-5 rounded-2xl bg-white text-primary font-black text-lg transition-all active:scale-95 shadow-2xl hover:bg-gray-50">
              Book a Reservation
            </Link>
            <Link to="/menu" className="px-10 py-5 rounded-2xl bg-[#1a120b]/20 hover:bg-[#1a120b]/30 text-white font-black text-lg transition-all active:scale-95 border border-white/20 shadow-2xl">
              Order Delivery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
