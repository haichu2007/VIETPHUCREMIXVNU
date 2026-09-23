import React from 'react';
import { OutfitSelection } from '../types';
import { MannequinPreview } from './MannequinPreview';
import { Sparkles, Play, ArrowRight, Wand2, ShieldCheck, Compass, HeartHandshake } from 'lucide-react';

interface HeroSectionProps {
  onStartRemix: () => void;
  onStartDemo: () => void;
  onOpenAI: () => void;
  heroSelection: OutfitSelection;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartRemix,
  onStartDemo,
  onOpenAI,
  heroSelection
}) => {
  return (
    <div className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#E5DDD0]">
      {/* Delicate background editorial grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1E1D1B 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E1E]/8 border border-[#8B1E1E]/20 text-[#8B1E1E] text-xs font-semibold uppercase tracking-widest">
              <Sparkles size={12} />
              <span>Dự Án Sáng Tạo Văn Hóa · Gen Z & Heritage</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E1D1B] leading-[1.12]">
              Việt phục truyền thống.
              <br />
              <span className="italic font-normal text-[#8B1E1E]">Phong cách của bạn.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#554D40] leading-relaxed max-w-2xl">
              Nền tảng giúp người trẻ khám phá, thấu hiểu cấu trúc và thỏa sức phối trang phục truyền thống Việt Nam theo phong cách Gen Z đương đại — tôn trọng chuẩn mực văn hóa mà không bị giới hạn trong khuôn mẫu xưa cũ.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartRemix}
                className="px-6 py-3.5 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Bắt đầu Remix ngay</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={onStartDemo}
                className="px-5 py-3.5 bg-[#FAF8F5] hover:bg-[#EFE8DD] text-[#1E1D1B] border border-[#D5CABE] text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Play size={14} className="text-[#8B1E1E] fill-[#8B1E1E]" />
                <span>Trải nghiệm Demo (30s)</span>
              </button>

              <button
                onClick={onOpenAI}
                className="px-4 py-3.5 bg-[#F4EFEA] hover:bg-[#EAE2D4] text-[#8C671C] border border-[#C89B3C]/30 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Wand2 size={14} />
                <span>AI Stylist</span>
              </button>
            </div>

            {/* Core Values Bullets */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5DDD0]">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1D1B] uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-[#8B1E1E]" />
                  <span>Chuẩn Cổ Phục</span>
                </div>
                <p className="text-xs text-[#706758] mt-1">
                  Mô phỏng chính xác cấu trúc áo ngũ thân, áo dài, tứ thân, giao lĩnh.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1D1B] uppercase tracking-wider">
                  <Compass size={14} className="text-[#23395B]" />
                  <span>Gen Z Phối Lớp</span>
                </div>
                <p className="text-xs text-[#706758] mt-1">
                  Tự do mix cùng sneaker, denim, cargo, túi kẹp nách và tai nghe.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1D1B] uppercase tracking-wider">
                  <HeartHandshake size={14} className="text-[#C89B3C]" />
                  <span>Why This Works</span>
                </div>
                <p className="text-xs text-[#706758] mt-1">
                  Thuật toán đo tỷ lệ hài hòa giữa di sản và cá tính hiện đại.
                </p>
              </div>
            </div>
          </div>

          {/* Right Live Visual Hero Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md h-[460px] relative">
              <MannequinPreview selection={heroSelection} interactive={true} compact={false} />

              {/* Floating Testimonial Pill */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E5DDD0] shadow-lg max-w-[260px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase text-[#8B1E1E] font-bold">
                    Bản phối nổi bật
                  </span>
                </div>
                <p className="text-xs text-[#332E27] font-medium leading-tight">
                  Áo Ngũ Thân Đỏ Sơn Mài + Denim Gen Z + Chunky Sneaker
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
