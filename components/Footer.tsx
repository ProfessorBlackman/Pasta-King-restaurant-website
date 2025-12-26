
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-background-dark border-t border-gray-100 dark:border-white/5 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">restaurant</span>
              </div>
              <h2 className="text-[#181411] dark:text-white text-lg font-black tracking-tight">Pasta King</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Bringing the authentic taste of Italy to the heart of Ghana. Experience fusion like never before.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">public</span></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">photo_camera</span></a>
            </div>
          </div>

          <div>
            <h3 className="text-[#181411] dark:text-white font-bold mb-4">Explore</h3>
            <ul className="flex flex-col gap-2">
              <li><Link to="/menu" className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm">Our Menu</Link></li>
              <li><Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm">About Us</Link></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#181411] dark:text-white font-bold mb-4">Contact</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                <span>12 Independence Ave, Accra</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-primary text-lg">call</span>
                <span>+233 20 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-primary text-lg">mail</span>
                <span>hello@pastaking.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#181411] dark:text-white font-bold mb-4">Opening Hours</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex justify-between"><span>Mon - Fri</span><span className="font-medium text-[#181411] dark:text-white">11am - 10pm</span></li>
              <li className="flex justify-between"><span>Sat - Sun</span><span className="font-medium text-[#181411] dark:text-white">12pm - 11pm</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 text-center sm:text-left">© 2023 Pasta King Ltd. All rights reserved.</p>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">photo_camera</span></a>
            <a href="#" className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">alternate_email</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
