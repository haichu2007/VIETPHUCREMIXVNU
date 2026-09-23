import React from 'react';
import { Sparkles, Play, Compass, Wand2, Info, Shirt } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'remix' | 'discover' | 'ai' | 'about';
  setActiveTab: (tab: 'home' | 'remix' | 'discover' | 'ai' | 'about') => void;
  onStartDemo: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onStartDemo,
  savedCount
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EBE3D7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark (Display face) */}
        <button
          onClick={() => setActiveTab('home')}
          className="text-left group flex items-center gap-2 cursor-pointer focus:outline-hidden"
        >
          <div className="w-8 h-8 rounded-sm bg-[#8B1E1E] flex items-center justify-center text-[#FAF8F5] font-serif font-bold text-lg shadow-xs group-hover:bg-[#721717] transition-colors">
            V
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#1E1D1B] leading-none">
              VIỆT PHỤC REMIX
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#8B1E1E] font-medium mt-0.5">
              Heritage · Gen Z Style
            </span>
          </div>
        </button>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#595247]">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors relative py-1 hover:text-[#1E1D1B] ${
              activeTab === 'home' ? 'text-[#8B1E1E] font-semibold' : ''
            }`}
          >
            Trang chủ
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1E1E]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('remix')}
            className={`transition-colors relative py-1 hover:text-[#1E1D1B] flex items-center gap-1.5 ${
              activeTab === 'remix' ? 'text-[#8B1E1E] font-semibold' : ''
            }`}
          >
            <Shirt size={15} />
            Phòng thử đồ
            {activeTab === 'remix' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1E1E]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`transition-colors relative py-1 hover:text-[#1E1D1B] flex items-center gap-1.5 ${
              activeTab === 'discover' ? 'text-[#8B1E1E] font-semibold' : ''
            }`}
          >
            <Compass size={15} />
            Khám phá
            {activeTab === 'discover' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1E1E]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`transition-colors relative py-1 hover:text-[#1E1D1B] flex items-center gap-1.5 ${
              activeTab === 'ai' ? 'text-[#8B1E1E] font-semibold' : ''
            }`}
          >
            <Wand2 size={15} className="text-[#C89B3C]" />
            AI Stylist
            {activeTab === 'ai' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1E1E]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`transition-colors relative py-1 hover:text-[#1E1D1B] flex items-center gap-1.5 ${
              activeTab === 'about' ? 'text-[#8B1E1E] font-semibold' : ''
            }`}
          >
            <Info size={15} />
            Về Việt phục
            {activeTab === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1E1E]" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary action + Demo mode trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onStartDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8B1E1E] bg-[#8B1E1E]/8 hover:bg-[#8B1E1E]/15 rounded-md border border-[#8B1E1E]/20 transition-all cursor-pointer whitespace-nowrap"
            title="Tự động trải nghiệm flow mẫu trong 30 giây cho ban giám khảo"
          >
            <Play size={12} className="fill-[#8B1E1E]" />
            <span className="hidden sm:inline">Trải nghiệm</span> Demo (30s)
          </button>

          <button
            onClick={() => setActiveTab('remix')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#8B1E1E] hover:bg-[#741818] rounded-md transition-all shadow-xs cursor-pointer whitespace-nowrap active:scale-98"
          >
            <Sparkles size={13} />
            <span>Bắt đầu Remix</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-[#EBE3D7]/70 bg-[#FAF8F5] text-xs">
        <button
          onClick={() => setActiveTab('home')}
          className={`py-1 px-2 font-medium ${activeTab === 'home' ? 'text-[#8B1E1E]' : 'text-[#6B6355]'}`}
        >
          Trang chủ
        </button>
        <button
          onClick={() => setActiveTab('remix')}
          className={`py-1 px-2 font-medium ${activeTab === 'remix' ? 'text-[#8B1E1E]' : 'text-[#6B6355]'}`}
        >
          Remix
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`py-1 px-2 font-medium ${activeTab === 'discover' ? 'text-[#8B1E1E]' : 'text-[#6B6355]'}`}
        >
          Khám phá
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`py-1 px-2 font-medium ${activeTab === 'ai' ? 'text-[#8B1E1E]' : 'text-[#6B6355]'}`}
        >
          AI Stylist
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`py-1 px-2 font-medium ${activeTab === 'about' ? 'text-[#8B1E1E]' : 'text-[#6B6355]'}`}
        >
          Về di sản
        </button>
      </div>
    </header>
  );
};
