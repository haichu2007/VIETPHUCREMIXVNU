import React from 'react';
import { OutfitSelection } from '../types';
import { MannequinPreview } from './MannequinPreview';
import { GARMENTS, BOTTOM_PIECES, FOOTWEAR_PIECES, COLORS, STYLES } from '../data/mockData';
import { Sparkles, Play, ArrowRight, Wand2, ShieldCheck, Compass, HeartHandshake } from 'lucide-react';

interface HeroSectionProps {
  onStartRemix: () => void;
  onStartDemo: () => void;
  onOpenAI: () => void;
  onOpenAIFaceModal?: () => void;
  heroSelection: OutfitSelection;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartRemix,
  onStartDemo,
  onOpenAI,
  onOpenAIFaceModal,
  heroSelection
}) => {
  const garment = GARMENTS.find((g) => g.id === heroSelection.garmentId) || GARMENTS[0];
  const color = COLORS.find((c) => c.id === heroSelection.colorId) || COLORS[0];
  const bottom = BOTTOM_PIECES.find((b) => b.id === heroSelection.bottomId) || BOTTOM_PIECES[0];
  const footwear = FOOTWEAR_PIECES.find((f) => f.id === heroSelection.footwearId) || FOOTWEAR_PIECES[0];
  const style = STYLES.find((s) => s.id === heroSelection.styleId) || STYLES[0];

  return (
    <div className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#E5DDD0] pt-6 pb-16 md:py-24">
      {/* 1. Giant Bleed Editorial Watermark Typography */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 overflow-hidden w-full text-center">
        <span className="font-editorial text-[7rem] sm:text-[11rem] md:text-[14rem] lg:text-[17rem] font-black tracking-tighter text-[#1E1D1B]/[0.045] leading-none uppercase block whitespace-nowrap">
          VIỆT PHỤC
        </span>
      </div>

      {/* 2. Traditional Vietnamese Motifs Watermark (Vân Mây Cung Đình & Thủy Ba) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.04]">
        <svg
          viewBox="0 0 1440 800"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud Motifs (Vân mây ngũ sắc) */}
          <path
            d="M120 180 C150 140 210 140 240 180 C270 150 330 150 360 190 C390 230 360 280 300 280 L160 280 C110 280 80 230 120 180 Z"
            fill="currentColor"
          />
          <path
            d="M1100 120 C1130 80 1190 80 1220 120 C1250 90 1310 90 1340 130 C1370 170 1340 220 1280 220 L1140 220 C1090 220 1060 170 1100 120 Z"
            fill="currentColor"
          />
          {/* Thủy Ba Tam Sơn (Wave curves at lower boundary) */}
          <path
            d="M0 720 Q180 660 360 720 Q540 780 720 720 Q900 660 1080 720 Q1260 780 1440 720 L1440 800 L0 800 Z"
            fill="currentColor"
          />
          <path
            d="M0 750 Q180 690 360 750 Q540 810 720 750 Q900 690 1080 750 Q1260 810 1440 750 L1440 800 L0 800 Z"
            fill="currentColor"
            opacity="0.6"
          />
          {/* Lotus Emblem Watermark */}
          <g transform="translate(680, 80) scale(1.4)">
            <path
              d="M40 0 C40 25 15 45 0 60 C-15 45 -40 25 -40 0 C-20 20 -10 35 0 50 C10 35 20 20 40 0 Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </div>

      {/* 3. Main Editorial Content Layout with Visual Overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Dramatic Magazine Headline & Editorial Story */}
          <div className="lg:col-span-7 space-y-6">
            {/* Magazine Header Metadata Bar */}
            <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-[#786E5E] border-b border-[#E5DDD0] pb-2.5 max-w-lg">
              <span className="font-bold text-[#8B1E1E] uppercase">ISSUE Nº 01</span>
              <span>·</span>
              <span>AUTUMN / WINTER 2026</span>
              <span>·</span>
              <span className="text-[#1E1D1B] uppercase font-semibold">HERITAGE REMIXED</span>
            </div>

            {/* High Contrast Dramatic Typography */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E1E]/8 border border-[#8B1E1E]/20 text-[#8B1E1E] text-xs font-semibold uppercase tracking-widest mb-2">
                <Sparkles size={12} />
                <span>Modern Vietnamese Fashion Editorial</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E1D1B] leading-[1.06]">
                Việt phục cổ điển.
                <br />
                <span className="italic font-normal text-[#8B1E1E] relative inline-block">
                  Phong cách của bạn.
                  {/* Subtle underline stroke */}
                  <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[#C89B3C]/50 rounded-full" />
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#554D40] leading-relaxed max-w-2xl font-light">
              Nền tảng nghệ thuật số tiên phong giúp người trẻ khám phá, giải mã cấu trúc cổ phục và tự do phối trang phục truyền thống Việt Nam theo tinh thần Gen Z — tôn vinh di sản cha ông mà không đánh mất cái tôi thời đại.
            </p>

            {/* Editorial CTAs */}
            <div className="space-y-3 pt-2">
              {onOpenAIFaceModal && (
                <button
                  onClick={onOpenAIFaceModal}
                  className="w-full sm:w-auto px-6 py-3.5 bg-linear-to-r from-[#1C1816] via-[#332A24] to-[#1C1816] hover:from-[#2B231D] hover:to-[#2B231D] text-[#FFDF78] border border-[#C89B3C]/70 rounded-xl transition-all shadow-md flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer group active:scale-98"
                >
                  <Sparkles size={16} className="text-[#C89B3C] animate-pulse" />
                  <span className="font-editorial text-sm sm:text-base font-bold tracking-wide">
                    Tạo AI Lookbook với khuôn mặt của bạn
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#C89B3C]/20 text-[#FFDF78] rounded-full border border-[#C89B3C]/40">
                    Mới · Face Try-On
                  </span>
                </button>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onStartRemix}
                  className="px-6 py-4 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer active:scale-98"
                >
                  <span>Bắt đầu Remix ngay</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={onStartDemo}
                  className="px-5 py-4 bg-[#FAF8F5] hover:bg-[#EFE8DD] text-[#1E1D1B] border border-[#D5CABE] text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Play size={14} className="text-[#8B1E1E] fill-[#8B1E1E]" />
                  <span>Trải nghiệm Demo (30s)</span>
                </button>

                <button
                  onClick={onOpenAI}
                  className="px-4 py-4 bg-[#F4EFEA] hover:bg-[#EAE2D4] text-[#8C671C] border border-[#C89B3C]/35 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Wand2 size={14} />
                  <span>AI Stylist</span>
                </button>
              </div>
            </div>

            {/* Core Values Architecture Bullets */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5DDD0]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1D1B] uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-[#8B1E1E]" />
                  <span>Chuẩn Cổ Phục</span>
                </div>
                <p className="text-[11px] text-[#706758] leading-normal">
                  Mô phỏng chính xác cấu trúc ngũ thân 5 cúc, áo dài, tứ thân Bắc Bộ.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1D1B] uppercase tracking-wider">
                  <Compass size={14} className="text-[#23395B]" />
                  <span>Gen Z Phối Lớp</span>
                </div>
                <p className="text-[11px] text-[#706758] leading-normal">
                  Chunky sneaker, denim thụng, cargo techwear, túi baguette và tai nghe.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1D1B] uppercase tracking-wider">
                  <HeartHandshake size={14} className="text-[#C89B3C]" />
                  <span>Why This Works</span>
                </div>
                <p className="text-[11px] text-[#706758] leading-normal">
                  Thuật toán đo Style Score cân bằng di sản và cá tính hiện đại.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Overlap Showcase (Couture Silhouette Magazine Cover) */}
          <div className="lg:col-span-5 flex flex-col items-center relative w-full">
            {/* Editorial Header Pill directly above frame */}
            <div className="w-full max-w-md flex items-center justify-between px-1 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1E1E] animate-ping" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E1E]">
                  Trực Tuyến · Live Showcase
                </span>
              </div>
              <div className="bg-[#1E1D1B] text-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#3D3A36] shadow-xs flex items-center gap-1.5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#C89B3C] font-semibold">
                  LOOK:
                </span>
                <span className="font-editorial text-xs font-bold text-white">
                  REMIX #{style.traditionalRatio}{color.element === 'Hỏa' ? '01' : '02'}
                </span>
              </div>
            </div>

            {/* Architectural Hairline Frame Behind Model */}
            <div className="w-full max-w-md relative">
              <div className="absolute -inset-2 border border-[#E0D5C1] rounded-3xl pointer-events-none hidden sm:block opacity-60" />

              <div className="w-full h-[500px] relative z-10 shadow-xl rounded-2xl overflow-hidden border border-[#D5C9B5]">
                <MannequinPreview selection={heroSelection} interactive={true} compact={false} />

                {/* Floating Live Outfit Details Card with Dynamic Data */}
                <div className="absolute bottom-14 left-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E5DDD0] shadow-md max-w-[280px] hidden sm:block z-30 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E]" />
                    <span className="text-[10px] font-mono uppercase text-[#8B1E1E] font-bold">
                      Đang Trình Diễn
                    </span>
                    <span className="text-[10px] text-[#8C8270] font-mono">
                      · {style.name}
                    </span>
                  </div>
                  <p className="text-xs text-[#1E1D1B] font-semibold leading-snug">
                    {garment.name} <span className="text-[#8B1E1E]">({color.name})</span> + {bottom.name} + {footwear.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
