import React, { useState, useEffect } from 'react';
import { OutfitSelection } from '../types';
import { MannequinPreview } from './MannequinPreview';
import { GARMENTS, STYLES, COLORS, FOOTWEAR_PIECES, BAG_PIECES } from '../data/mockData';
import { Play, Sparkles, Check, ArrowRight, X } from 'lucide-react';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishDemo: (selection: OutfitSelection) => void;
}

const DEMO_STEPS = [
  {
    step: 1,
    title: 'Chọn Nền Tảng Di Sản',
    itemTitle: 'Áo Ngũ Thân Tay Chẽn',
    category: 'TRANG PHỤC CHÍNH',
    description: 'Biểu tượng trang phục mực thước thời Nguyễn với 5 thân và 5 cúc mang ý nghĩa Ngũ Thường.',
    partialSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-silk-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-guoc-moc',
      bagId: 'bag-woven-coi',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-minimal',
      colorId: 'pearl-white'
    }
  },
  {
    step: 2,
    title: 'Định Hình Phong Cách',
    itemTitle: 'Modern Streetwear',
    category: 'PHONG CÁCH',
    description: 'Chuyển hóa phom dáng cổ phục vào không gian đường phố hiện đại, năng động và phóng khoáng.',
    partialSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-guoc-moc',
      bagId: 'bag-woven-coi',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-street',
      colorId: 'pearl-white'
    }
  },
  {
    step: 3,
    title: 'Phối Màu Sắc Di Sản',
    itemTitle: 'Đỏ Sơn Mài (Chu Sa)',
    category: 'BẢNG MÀU',
    description: 'Sắc son chu sa truyền thống quyền quý, tạo điểm nhấn thị giác mạnh mẽ trên phố.',
    partialSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-guoc-moc',
      bagId: 'bag-woven-coi',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-street',
      colorId: 'lacquer-red'
    }
  },
  {
    step: 4,
    title: 'Nâng Cấp Giày Gen Z',
    itemTitle: 'Chunky Sneaker Trắng Retro',
    category: 'GIÀY DÉP',
    description: 'Tạo độ tương phản ấn tượng giữa tà áo di sản và sự khỏe khoắn của phong cách thể thao.',
    partialSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-chunky-sneaker',
      bagId: 'bag-woven-coi',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-street',
      colorId: 'lacquer-red'
    }
  },
  {
    step: 5,
    title: 'Thêm Phụ Kiện Đô Thị',
    itemTitle: 'Túi Kẹp Nách Baguette & Tai Nghe',
    category: 'PHỤ KIỆN',
    description: 'Tạo dấu ấn của một người trẻ sành điệu, tự tin mang di sản vào đời sống thường nhật.',
    partialSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-chunky-sneaker',
      bagId: 'bag-shoulder-leather',
      accessoryId: 'acc-headphones',
      styleId: 'style-street',
      colorId: 'lacquer-red'
    }
  },
  {
    step: 6,
    title: 'Hoàn Tất Bản Phối',
    itemTitle: 'Việt Phục Remix #027',
    category: 'KẾT QUẢ CUỐI',
    description: 'Tỷ lệ hài hòa: 65% Di Sản Truyền Thống · 35% Phong Cách Gen Z Đương Đại.',
    partialSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-chunky-sneaker',
      bagId: 'bag-shoulder-leather',
      accessoryId: 'acc-headphones',
      styleId: 'style-street',
      colorId: 'lacquer-red'
    }
  }
];

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onFinishDemo
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
      return;
    }

    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < DEMO_STEPS.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, 2400);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#E5DDD0] bg-[#F4EFEA]">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#8B1E1E] text-white text-[10px] font-bold">
              <Play size={10} className="fill-white" />
            </span>
            <span className="font-editorial text-base font-bold text-[#1E1D1B]">
              Trải Nghiệm Demo Nhanh (30 Giây)
            </span>
            <span className="text-[11px] text-[#7A7061] hidden sm:inline">
              · Dành cho Ban Giám Khảo & Khán Giả
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#756B5D] hover:text-[#1E1D1B] hover:bg-[#EBE3D7]/60 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#E5DDD0] h-1.5 flex">
          {DEMO_STEPS.map((s, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 transition-all duration-300 ${
                idx <= currentStepIndex ? 'bg-[#8B1E1E]' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Mannequin Preview reacting live */}
          <div className="md:col-span-6 h-[380px]">
            <MannequinPreview selection={currentStep.partialSelection} interactive={false} compact={true} />
          </div>

          {/* Right Tour step explanation */}
          <div className="md:col-span-6 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1E1E] bg-[#8B1E1E]/8 px-2 py-0.5 rounded-sm">
                  Bước {currentStep.step} / {DEMO_STEPS.length} · {currentStep.category}
                </span>
                <span className="text-xs text-[#807567] font-mono">
                  {Math.round(((currentStepIndex + 1) / DEMO_STEPS.length) * 100)}%
                </span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-[#1E1D1B] leading-tight">
                {currentStep.itemTitle}
              </h3>
              <p className="text-xs text-[#7A7061] font-medium mt-0.5">
                {currentStep.title}
              </p>
            </div>

            <p className="text-xs sm:text-[13px] text-[#423C32] leading-relaxed bg-[#F4EFEA] p-4 rounded-xl border border-[#E5DDD0]">
              {currentStep.description}
            </p>

            {/* Quick Flow breadcrumbs */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[11px] font-semibold text-[#786F60] uppercase tracking-wider block">
                Luồng biến hóa:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#4D4537]">
                <span className={currentStepIndex >= 0 ? 'font-bold text-[#8B1E1E]' : ''}>Áo Ngũ Thân</span>
                <span>→</span>
                <span className={currentStepIndex >= 1 ? 'font-bold text-[#8B1E1E]' : ''}>Streetwear</span>
                <span>→</span>
                <span className={currentStepIndex >= 2 ? 'font-bold text-[#8B1E1E]' : ''}>Đỏ Sơn Mài</span>
                <span>→</span>
                <span className={currentStepIndex >= 3 ? 'font-bold text-[#8B1E1E]' : ''}>Sneaker</span>
                <span>→</span>
                <span className={currentStepIndex >= 4 ? 'font-bold text-[#8B1E1E]' : ''}>Shoulder Bag</span>
              </div>
            </div>

            {/* Tour Controls */}
            <div className="flex items-center gap-2 pt-2">
              {currentStepIndex < DEMO_STEPS.length - 1 ? (
                <>
                  <button
                    onClick={() => setCurrentStepIndex((prev) => Math.min(DEMO_STEPS.length - 1, prev + 1))}
                    className="flex-1 py-2.5 px-3 bg-[#8B1E1E] text-white text-xs font-semibold rounded-lg hover:bg-[#721717] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Bước tiếp theo</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="py-2.5 px-3 bg-[#FAF8F5] border border-[#D5CABE] text-[#1E1D1B] text-xs font-medium rounded-lg hover:bg-[#EAE1D3] transition-all cursor-pointer"
                  >
                    {isPlaying ? 'Tạm dừng' : 'Tự động chạy'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onFinishDemo(currentStep.partialSelection)}
                  className="w-full py-3 px-4 bg-[#8B1E1E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#721717] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                >
                  <Sparkles size={15} />
                  <span>Mở Bản Phối Này Trong Phòng Thử Đồ</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
