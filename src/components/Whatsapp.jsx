import { useState, useEffect } from 'react';

export default function WhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('whatsapp-tooltip-seen');
    if (!hasSeenTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        localStorage.setItem('whatsapp-tooltip-seen', 'true');
        setTimeout(() => setShowTooltip(false), 5000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const quickActions = [
    { emoji: "👋", text: "Hello!", message: "Hello! I need some information." },
    { emoji: "💼", text: "Services", message: "I'm interested in your services." },
    { emoji: "💰", text: "Pricing", message: "Can you share your pricing?" }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute right-24 bottom-2 animate-fade-in">
          <div className="bg-gradient-to-r from-[#74377a] to-[#f9b7dd] text-white px-4 py-3 rounded-2xl shadow-xl max-w-xs">
            <div className="text-sm font-semibold whitespace-nowrap">
              💬 Need help? Chat with us!
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2">
              <div className="w-3 h-3 bg-gradient-to-r from-[#74377a] to-[#f9b7dd] rotate-45"></div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Menu */}
      {showQuickActions && (
        <div className="absolute right-20 bottom-0 space-y-3 animate-slide-in-right">
          {quickActions.map((item, index) => (
            <a
              key={item.text}
              href={`https://wa.me/2349033173016?text=${encodeURIComponent(item.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/20 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-lg">{item.emoji}</span>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {item.text}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* Main WhatsApp Button */}
      <div className="relative">
        {/* Animated Pulse Ring */}
        <div className="absolute inset-0 animate-ping-slow bg-green-500 rounded-2xl opacity-30"></div>
        
        {/* Message Counter */}
        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-[#f9b7dd] to-[#74377a] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-white/20 animate-bounce-subtle">
          💬
        </div>

        <a
          href="https://wa.me/+2349034829264"
          target="_blank"
          rel="noopener noreferrer"
          className={`relative block transition-all duration-500 ${
            isHovered 
              ? 'transform scale-110 rotate-[360deg]' 
              : 'transform scale-100 rotate-0 animate-float'
          }`}
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => {
            setIsHovered(true);
            setShowQuickActions(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setShowQuickActions(false);
          }}
        >
          {/* Button Container */}
          <div className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl p-4 shadow-2xl border-2 border-white/20 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
            {/* Online Status Indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
            
            {/* WhatsApp Icon */}
            <div className="w-12 h-12 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-8 h-8 text-white drop-shadow-lg"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.187-3.55-8.444"/>
              </svg>
            </div>

            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl bg-green-400 blur-xl transition-opacity duration-300 ${
              isHovered ? 'opacity-40' : 'opacity-0'
            }`}></div>
          </div>
        </a>
      </div>

      {/* Custom Animations in Style Tag */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}