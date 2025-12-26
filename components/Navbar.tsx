
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { cartCount, totalPrice } = useCart();
  const location = useLocation();

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDark(darkMode);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Build Your Own', path: '/build' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reservations', path: '/reservations' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="size-10 text-primary flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="material-symbols-outlined !text-[40px]">restaurant</span>
            </div>
            <h2 className="text-[#181411] dark:text-white text-2xl font-black tracking-tighter">Pasta King</h2>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold transition-all uppercase tracking-widest ${
                  isActive(link.path) ? 'text-primary' : 'text-[#181411] dark:text-gray-200 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-primary transition-colors dark:text-gray-400"
              aria-label="Toggle Dark Mode"
            >
              <span className="material-symbols-outlined !text-[24px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {cartCount > 0 && (
              <Link 
                to="/menu" 
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 text-primary rounded-xl font-black text-xs sm:text-sm hover:bg-primary/20 transition-all border border-primary/20 animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">shopping_cart</span>
                <span className="hidden sm:inline">View Order ({cartCount})</span>
                <span className="sm:hidden">{cartCount}</span>
              </Link>
            )}
            
            <Link 
              to="/menu" 
              className={`hidden md:flex items-center justify-center rounded-xl h-11 px-6 ${cartCount > 0 ? 'bg-primary/5 text-primary border border-primary/20' : 'bg-primary text-white shadow-lg shadow-primary/20'} text-sm font-black transition-transform active:scale-95`}
            >
              {cartCount > 0 ? `Order: GHS ${totalPrice.toFixed(0)}` : 'Order Online'}
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined !text-3xl">{isOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-background-dark border-b border-gray-100 dark:border-white/5 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-xl font-black ${
                isActive(link.path) ? 'text-primary' : 'text-[#181411] dark:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/menu" 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center rounded-xl h-14 bg-primary text-white text-lg font-black w-full"
          >
            {cartCount > 0 ? `View Order (GHS ${totalPrice.toFixed(0)})` : 'Order Now'}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
