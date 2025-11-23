
import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon } from './icons/ChatIcon.tsx';
import { CloseIcon } from './icons/CloseIcon.tsx';
import { SendIcon } from './icons/SendIcon.tsx';
import { GeoLogo } from './logo.tsx';
import { sendChatMessage, ChatMessage } from '../services/chatService.ts';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Greetings. I am Geo, your design assistant. How can I help you enhance your reality today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendChatMessage(messages, userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered a neural interference. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto
          w-[350px] md:w-[400px] 
          bg-zinc-950/90 backdrop-blur-xl 
          border border-white/10 
          rounded-2xl shadow-2xl 
          overflow-hidden 
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          origin-bottom-right
          flex flex-col
          mb-4
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}
        `}
        style={isOpen ? { height: '600px', maxHeight: '70vh' } : { height: '0px', maxHeight: '0px' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
                    <ChatIcon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white font-playfair">Geo Assistant</h3>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Gemini 3 Pro
                    </p>
                </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
                <CloseIcon className="w-5 h-5" />
            </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {messages.map((msg, idx) => (
                <div 
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div 
                        className={`
                            max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
                            ${msg.role === 'user' 
                                ? 'bg-amber-500 text-black rounded-br-none font-medium' 
                                : 'bg-zinc-900 border border-white/10 text-zinc-300 rounded-bl-none'
                            }
                        `}
                    >
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-zinc-900 border border-white/10 p-3 rounded-2xl rounded-bl-none flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-black/20">
            <div className="relative">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about styles, pricing, or features..."
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:bg-zinc-900 transition-all placeholder-zinc-600"
                />
                <button 
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="absolute right-1 top-1 bottom-1 w-10 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black rounded-full flex items-center justify-center transition-colors"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </div>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto
          group relative w-14 h-14 
          rounded-full 
          flex items-center justify-center 
          shadow-[0_0_30px_rgba(245,158,11,0.3)] 
          transition-all duration-300 
          hover:scale-110 active:scale-95
          ${isOpen ? 'bg-zinc-800 rotate-90' : 'bg-amber-500 hover:bg-amber-400'}
        `}
      >
        {isOpen ? (
            <CloseIcon className="w-6 h-6 text-white" />
        ) : (
            <ChatIcon className="w-7 h-7 text-black" />
        )}
        
        {/* Tooltip/Label when closed */}
        {!isOpen && (
             <span className="absolute right-full mr-4 px-3 py-1.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                AI Assistant
            </span>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
