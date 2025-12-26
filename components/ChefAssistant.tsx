
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";

const ChefAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { 
      role: 'model', 
      text: "Akwaaba! I am Chef Kwame's AI assistant. Craving some **spicy Jollof Spaghetti** or curious about our fusion flavors? Ask me anything!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const fetchAiResponse = async (userMessage: string, history: { role: 'user' | 'model'; text: string }[], retries = 3) => {
    // Create new instance to ensure it uses latest key/config
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Prepare conversation history
    const contents = history.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    for (let i = 0; i < retries; i++) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents,
          config: {
            systemInstruction: "You are Chef Kwame's AI assistant at 'Pasta King', a premium Ghanaian-Italian fusion restaurant in Accra. You are friendly, knowledgeable about both Italian pasta techniques and West African spices (Shito, Jollof, Suya, etc.). Use Ghanaian expressions like 'Chale', 'Akwaaba', or 'Enjoy!' where appropriate. Encourage users to try the Signature Jollof Spaghetti or Creamy Shito Penne. Use markdown to format your responses (bold for dish names, lists for ingredients or steps, headers for sections) to make them appetizing and easy to read. Keep responses concise.",
            temperature: 0.8,
          },
        });
        return response.text;
      } catch (error: any) {
        console.error(`Gemini API Attempt ${i + 1} failed:`, error);
        
        // Final attempt failed
        if (i === retries - 1) throw error;
        
        // Graceful retry logic: Exponential backoff (1s, 2s, 4s...)
        const waitTime = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the retry wrapper
      const aiText = await fetchAiResponse(userMessage, messages);
      const finalText = aiText || "Sorry chale, I'm having a bit of a kitchen emergency. Can you try again?";
      setMessages(prev => [...prev, { role: 'model', text: finalText }]);
    } catch (error) {
      console.error("AI Assistant Final Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Oh no! Chale, the connection to the kitchen is a bit weak right now (Backend Error). Please try sending your message one more time." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (text: string) => {
    // Standard marked parsing for chat bubbles
    const rawHtml = marked.parse(text) as string;
    return { __html: rawHtml };
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[420px] h-[550px] bg-white dark:bg-card-dark rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-6 text-white flex items-center justify-between shadow-lg relative z-10">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm">
                <span className="material-symbols-outlined !text-2xl">chef_hat</span>
              </div>
              <div>
                <p className="font-black text-base leading-none">Chef Kwame's AI</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="size-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-bold opacity-90 uppercase tracking-[0.15em]">Online & Cooking</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="size-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 no-scrollbar bg-gray-50/80 dark:bg-background-dark/80"
          >
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {m.role === 'model' && (
                  <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mr-2 shrink-0 self-end mb-1">
                     <span className="material-symbols-outlined text-primary !text-[18px]">restaurant</span>
                  </div>
                )}
                <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none font-bold' 
                    : 'bg-white dark:bg-card-dark border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-tl-none prose-chat'
                }`}>
                  {m.role === 'user' ? (
                    m.text
                  ) : (
                    <div dangerouslySetInnerHTML={renderMarkdown(m.text)} />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-1">
                     <span className="material-symbols-outlined text-primary !text-[18px]">restaurant</span>
                </div>
                <div className="bg-white dark:bg-card-dark border border-gray-100 dark:border-white/5 px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="size-2 bg-primary/30 rounded-full animate-bounce"></div>
                    <div className="size-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="size-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white dark:bg-card-dark border-t border-gray-100 dark:border-white/5 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our secret spices..."
                className="flex-1 h-12 px-5 rounded-2xl bg-gray-50 dark:bg-background-dark border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-semibold dark:text-white transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="size-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-3 font-bold uppercase tracking-widest">Powered by Chef Kwame's Kitchen Knowledge</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`size-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-white dark:bg-card-dark text-primary border-4 border-primary' : 'bg-primary text-white'
        }`}
      >
        <span className="material-symbols-outlined !text-3xl">
          {isOpen ? 'close' : 'chat'}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-white text-primary text-[11px] font-black items-center justify-center border-2 border-primary">1</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default ChefAssistant;
