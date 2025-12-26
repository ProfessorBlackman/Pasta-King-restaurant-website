
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { marked } from "marked";
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '../constants';

// Define the tools for Gemini
const toolConfig: { functionDeclarations: FunctionDeclaration[] } = {
  functionDeclarations: [
    {
      name: 'add_to_cart',
      description: 'Add a specific menu item to the user\'s shopping cart.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          item_id: { type: Type.STRING, description: 'The ID of the menu item (e.g., "1", "2") or "custom-bowl" for a DIY bowl.' },
          quantity: { type: Type.NUMBER, description: 'Number of items to add.' }
        },
        required: ['item_id']
      }
    },
    {
      name: 'suggest_navigation',
      description: 'Suggest that the user navigates to a different page of the website.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          path: { type: Type.STRING, description: 'The URL path (e.g., "/menu", "/gallery", "/reservations", "/build").' },
          label: { type: Type.STRING, description: 'The text to show on the navigation button.' }
        },
        required: ['path', 'label']
      }
    },
    {
      name: 'make_reservation',
      description: 'Record a reservation request for the user.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          guests: { type: Type.NUMBER, description: 'Number of guests.' },
          date: { type: Type.STRING, description: 'The date (e.g., "Oct 5").' },
          time: { type: Type.STRING, description: 'The time (e.g., "18:00").' }
        },
        required: ['guests', 'date', 'time']
      }
    },
    {
      name: 'clear_order',
      description: 'Empty the current shopping cart.',
      parameters: { type: Type.OBJECT, properties: {} }
    }
  ]
};

interface Message {
  role: 'user' | 'model';
  text: string;
  action?: {
    type: 'nav' | 'cart' | 'reservation';
    payload: any;
  };
}

const ChefAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Akwaaba! I'm Chef Kwame's AI Concierge. I can help you order, find your way around, book a table, or even **build your own custom pasta bowl** right here! What are you craving?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { cart, addToCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Provide AI with context about what is currently in the cart
  const cartContextString = useMemo(() => {
    const items = Object.entries(cart).map(([id, qty]) => {
      const item = MENU_ITEMS.find(m => m.id === id);
      return `${qty}x ${item?.name || 'Custom Bowl'}`;
    }).join(', ');
    return items ? `The user currently has these in their cart: ${items}. Total price: GHS ${totalPrice}.` : "The user's cart is currently empty.";
  }, [cart, totalPrice]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const executeFunction = (name: string, args: any) => {
    switch (name) {
      case 'add_to_cart':
        if (args.item_id === 'custom-bowl') {
          addToCart('custom-bowl');
          return { status: 'success', message: 'Added your custom bowl to the cart.' };
        }
        const item = MENU_ITEMS.find(m => m.id === args.item_id);
        if (item) {
          addToCart(item.id);
          return { status: 'success', message: `Added ${item.name} to your cart.` };
        }
        return { status: 'error', message: 'Item not found.' };
      
      case 'suggest_navigation':
        return { status: 'pending_confirmation', path: args.path, label: args.label };

      case 'make_reservation':
        return { status: 'success', message: `Reservation confirmed for ${args.guests} people on ${args.date} at ${args.time}.` };

      case 'clear_order':
        clearCart();
        return { status: 'success', message: 'Cart cleared.' };

      default:
        return { status: 'error', message: 'Function not implemented.' };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMsg }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: {
          systemInstruction: `You are Chef Kwame's Concierge at Pasta King. You have access to tools. ${cartContextString}
          
          RESTAURANT INFO:
          - Location: 12 Independence Ave, Osu Oxford Street, Accra.
          - Opening Hours: 
            * Monday - Saturday: 11:00 AM to 10:00 PM
            * Sunday: 12:00 PM to 9:00 PM

          CUSTOM BOWL BUILDER (item_id: 'custom-bowl'):
          If a user wants to build their own bowl, guide them through these choices:
          1. Base: Classic Penne, Spaghetti, Fusilli Spirals, or Jasmine Rice (+GHS 5).
          2. Sauce: Jollof Sauce (Signature), Creamy Alfredo, or Basil Pesto.
          3. Protein: Suya Chicken (+25), Grilled Shrimp (+45), Crispy Tofu (+15), Grilled Beef (+35).
          4. Toppings: Parmesan (+5), Scotch Bonnet (+2), Spring Onions (Free), Fried Plantain (+10), Garlic Butter (+5), Crispy Shallots (+3).
          
          GUIDELINES:
          - Inform users about opening hours and location if they ask.
          - Ask for custom bowl choices one by one to keep it conversational, or handle multiple if provided.
          - Once they finish their "Build Your Own" selections and confirm, use add_to_cart tool with item_id 'custom-bowl'.
          - If the user asks for a recommendation from the standard menu, suggest one and offer to add its specific ID to the cart.
          - Use suggest_navigation tool if the user wants to see the full Menu, Gallery, or Reservations page.
          - Be friendly, use Ghanaian fusion slang (Chale, Akwaaba, etc.), and keep it appetizing!`,
          tools: [toolConfig],
          temperature: 0.7,
        },
      });

      let finalMessageText = response.text || "";
      let actions: Message['action'] = undefined;

      if (response.functionCalls) {
        for (const fc of response.functionCalls) {
          executeFunction(fc.name, fc.args);
          
          if (fc.name === 'suggest_navigation') {
            actions = { type: 'nav', payload: fc.args };
          } else if (fc.name === 'add_to_cart') {
            if (fc.args.item_id === 'custom-bowl') {
              actions = { type: 'cart', payload: { name: 'Your Custom Fusion Bowl', id: 'custom-bowl' } };
            } else {
              const item = MENU_ITEMS.find(m => m.id === fc.args.item_id);
              actions = { type: 'cart', payload: { name: item?.name || 'Item', id: item?.id } };
            }
          } else if (fc.name === 'make_reservation') {
            actions = { type: 'reservation', payload: fc.args };
          }
        }
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: finalMessageText || "I've updated your request, Chale!", 
        action: actions 
      }]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Chale, I hit a snag in the kitchen. Can you try that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (text: string) => {
    const rawHtml = marked.parse(text) as string;
    return { __html: rawHtml };
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[420px] h-[600px] bg-white dark:bg-card-dark rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-6 text-white flex items-center justify-between shadow-lg relative z-10">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm">
                <span className="material-symbols-outlined !text-2xl">concierge</span>
              </div>
              <div>
                <p className="font-black text-base leading-none">Kwame's Concierge</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="size-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-bold opacity-90 uppercase tracking-[0.15em]">Live Concierge Mode</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="size-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 no-scrollbar bg-gray-50/80 dark:bg-background-dark/80">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none font-bold' 
                    : 'bg-white dark:bg-card-dark border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-tl-none prose-chat'
                }`}>
                  {m.role === 'user' ? m.text : <div dangerouslySetInnerHTML={renderMarkdown(m.text)} />}
                </div>

                {m.action && (
                  <div className="mt-3 w-[85%] animate-in zoom-in duration-300">
                    {m.action.type === 'nav' && (
                      <div className="bg-white dark:bg-card-dark border-2 border-primary/20 rounded-2xl p-4 flex flex-col gap-3 shadow-md">
                        <div className="flex items-center gap-2 text-primary">
                          <span className="material-symbols-outlined text-sm">explore</span>
                          <span className="text-[10px] font-black uppercase tracking-widest">Navigation Suggestion</span>
                        </div>
                        <button 
                          onClick={() => { navigate(m.action?.payload.path); setIsOpen(false); }}
                          className="w-full bg-primary text-white h-10 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20"
                        >
                          {m.action.payload.label}
                        </button>
                      </div>
                    )}
                    {m.action.type === 'cart' && (
                      <div className="bg-green-50 dark:bg-green-900/10 border-2 border-green-500/20 rounded-2xl p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <span className="material-symbols-outlined text-sm">shopping_cart_checkout</span>
                          <span className="text-[10px] font-black uppercase tracking-widest">Added to Order</span>
                        </div>
                        <p className="text-xs font-bold dark:text-white">{m.action.payload.name} added successfully!</p>
                      </div>
                    )}
                    {m.action.type === 'reservation' && (
                      <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-500/20 rounded-2xl p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          <span className="text-[10px] font-black uppercase tracking-widest">Reservation Noted</span>
                        </div>
                        <p className="text-xs font-bold dark:text-white">Confirmed for {m.action.payload.guests} on {m.action.payload.date}.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-1">
                   <span className="material-symbols-outlined text-primary !text-[18px]">restaurant</span>
                </div>
                <div className="bg-white dark:bg-card-dark border border-gray-100 dark:border-white/5 px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5">
                  <div className="size-2 bg-primary/30 rounded-full animate-bounce"></div>
                  <div className="size-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="size-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white dark:bg-card-dark border-t border-gray-100 dark:border-white/5">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="I want to build a bowl..."
                className="flex-1 h-12 px-5 rounded-2xl bg-gray-50 dark:bg-background-dark border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-semibold dark:text-white transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="size-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <div className="flex justify-between mt-3 px-1">
               <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Concierge AI • v2.1</p>
               {totalPrice > 0 && <p className="text-[9px] text-primary font-black uppercase tracking-widest">Current Order: GHS {totalPrice}</p>}
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className={`size-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-white dark:bg-card-dark text-primary border-4 border-primary' : 'bg-primary text-white'
        }`}>
        <span className="material-symbols-outlined !text-3xl">{isOpen ? 'close' : 'chat_bubble'}</span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-white text-primary text-[10px] font-black items-center justify-center border-2 border-primary">AI</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default ChefAssistant;
