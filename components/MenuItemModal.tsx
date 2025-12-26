
import React from 'react';
import { MenuItem } from '../types';

interface MenuItemModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  isOpen,
  onClose,
  quantity,
  onAdd,
  onRemove,
  isFavorite,
  onToggleFavorite
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 size-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          </div>
          
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">{item.category}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item.id);
                }}
                className={`transition-all duration-300 active:scale-125 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
              >
                <span className={`material-symbols-outlined !text-2xl ${isFavorite ? 'fill-current' : ''}`}>
                  favorite
                </span>
              </button>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
              {item.name}
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-6">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {item.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm font-medium">Price</span>
                <span className="text-2xl font-black text-primary">GH₵ {item.price}</span>
              </div>

              <div className="flex items-center gap-4">
                {quantity === 0 ? (
                  <button 
                    onClick={() => onAdd(item.id)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">shopping_basket</span>
                    Add to Order
                  </button>
                ) : (
                  <div className="flex-1 flex items-center bg-gray-100 dark:bg-white/10 rounded-2xl p-1 border border-gray-200 dark:border-white/5 h-14">
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="size-12 rounded-xl bg-white dark:bg-card-dark text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <span className="flex-1 text-center font-black text-primary text-xl">{quantity}</span>
                    <button 
                      onClick={() => onAdd(item.id)}
                      className="size-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;
