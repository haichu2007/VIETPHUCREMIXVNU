import React, { useState } from 'react';
import { OutfitSelection } from '../types';
import {
  GARMENTS,
  COLORS,
  BOTTOM_PIECES,
  FOOTWEAR_PIECES,
  BAG_PIECES,
  ACCESSORY_PIECES,
  HEADWEAR_PIECES,
  STYLES
} from '../data/mockData';
import { MannequinPreview } from './MannequinPreview';
import { Wand2, Sparkles, ArrowRight, RefreshCw, CheckCircle2, Bot, Compass, Check } from 'lucide-react';

interface AIStylistSectionProps {
  onApplyOutfit: (selection: OutfitSelection) => void;
}

interface StylistOutput {
  selection: OutfitSelection;
  styleName: string;
  description: string;
  culturalPhilosophy?: string;
  promptUsed: string;
  source?: 'gemini' | 'heuristic_engine';
}

const PRESET_PROMPTS = [
  'Đi cafe tản bộ phố cổ Hà Nội chiều thu',
  'Thuyết trình đồ án tốt nghiệp tại giảng đường',
  'Dự lễ cưới ngoài trời phong cách Bohemian & Di sản',
  'Đi concert rock/indie cuối tuần tràn đầy năng lượng'
];

export const AIStylistSection: React.FC<AIStylistSectionProps> = ({ onApplyOutfit }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appliedToast, setAppliedToast] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState<StylistOutput | null>(null);

  // Real backend call to /api/gemini/stylist with smart fallback
  const handleGenerate = async (customPrompt?: string) => {
    const textToAnalyze = (customPrompt || prompt).trim();
    if (!textToAnalyze) return;

    setIsLoading(true);
    setAppliedToast(false);

    try {
      const response = await fetch('/api/gemini/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToAnalyze })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.selection) {
          setGeneratedOutfit({
            selection: data.selection,
            styleName: data.styleName || 'Viet Phuc Contemporary Styling',
            description: data.reasoning || 'Bản phối tôn vinh nét đẹp cổ phục trong nhịp sống hiện đại.',
            culturalPhilosophy: data.culturalPhilosophy || 'Bảo tồn động giá trị di sản dân tộc.',
            promptUsed: textToAnalyze,
            source: data.source || 'gemini'
          });
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend stylist call failed, using client-side fallback:', err);
    }

    // Client-side fallback if network is offline
    const pLower = textToAnalyze.toLowerCase();
    let fallbackSelection: OutfitSelection;
    let fallbackStyle = 'Campus Minimalist';
    let fallbackDesc = 'Bản phối tôn trọng cốt cách mực thước của trang phục truyền thống.';
    let fallbackPhil = 'Triết lý Ngũ Thường và sự hài hòa âm dương.';

    if (pLower.includes('cafe') || pLower.includes('phố cổ') || pLower.includes('thu')) {
      fallbackSelection = {
        garmentId: 'ao-ba-ba',
        bottomId: 'pants-denim-wide',
        headwearId: 'head-beret-modern',
        footwearId: 'shoes-minimal-mule',
        bagId: 'bag-woven-coi',
        accessoryId: 'acc-wooden-fan',
        styleId: 'style-casual',
        colorId: 'imperial-gold'
      };
      fallbackStyle = 'Daily Casual & Phố Cổ Chiều Thu';
      fallbackDesc = 'Áo bà ba vàng hoàng yến mang lại cảm giác thân thiện, nhẹ nhõm, phối cùng quần denim ống suông và túi cói Kim Sơn tạo vẻ đẹp thanh xuân trong trẻo.';
      fallbackPhil = 'Áo Bà Ba là biểu trưng của sự bình dị, phóng khoáng và hồn hậu.';
    } else if (pLower.includes('cưới') || pLower.includes('bohemian')) {
      fallbackSelection = {
        garmentId: 'ao-dai',
        bottomId: 'skirt-pleated-midi',
        headwearId: 'head-man-cach-tan',
        footwearId: 'shoes-minimal-mule',
        bagId: 'bag-woven-coi',
        accessoryId: 'acc-jade-earrings',
        styleId: 'style-soft',
        colorId: 'lotus-pink'
      };
      fallbackStyle = 'Bohemian Heritage Romance';
      fallbackDesc = 'Áo dài lụa màu hồng sen đào kết hợp chân váy dập ly xòe bồng bềnh và mấn ngọc, điểm xuyết khuyên tai ngọc bích tạo vẻ đẹp thơ mộng.';
      fallbackPhil = 'Sắc hồng hoa sen biểu trưng cho sự thuần khiết, thanh cao và phúc lộc viên mãn.';
    } else if (pLower.includes('concert') || pLower.includes('rock') || pLower.includes('năng lượng')) {
      fallbackSelection = {
        garmentId: 'ao-giao-linh',
        bottomId: 'pants-cargo-minimal',
        headwearId: 'head-bandana-silk',
        footwearId: 'shoes-chunky-sneaker',
        bagId: 'bag-crossbody-nylon',
        accessoryId: 'acc-headphones',
        styleId: 'style-street',
        colorId: 'indigo-blue'
      };
      fallbackStyle = 'Festival Streetwear & Energetic Beat';
      fallbackDesc = 'Áo giao lĩnh mở tà bay bổng kết hợp quần cargo kháng nước và chunky sneaker giúp bạn tự do nhảy múa theo điệu nhạc.';
      fallbackPhil = 'Cổ vạt chéo giao thoa đại diện cho sự dung hòa âm dương và sức sống đương đại.';
    } else {
      fallbackSelection = {
        garmentId: 'ao-ngu-than',
        bottomId: 'pants-tailored-high',
        headwearId: 'head-none',
        footwearId: 'shoes-leather-loafer',
        bagId: 'bag-tote-dongho',
        accessoryId: 'acc-wooden-fan',
        styleId: 'style-minimal',
        colorId: 'pearl-white'
      };
      fallbackStyle = 'Campus Academic & Heritage Chic';
      fallbackDesc = 'Áo ngũ thân tay chẽn trắng ngà tôn lên cốt cách mực thước, kín đáo phù hợp môi trường học đường, phối quần tây may đo và giày loafer đen.';
      fallbackPhil = '5 cúc áo ngũ thân mang ý nghĩa Ngũ Thường (Nhân - Lễ - Nghĩa - Trí - Tín).';
    }

    setGeneratedOutfit({
      selection: fallbackSelection,
      styleName: fallbackStyle,
      description: fallbackDesc,
      culturalPhilosophy: fallbackPhil,
      promptUsed: textToAnalyze,
      source: 'heuristic_engine'
    });

    setIsLoading(false);
  };

  const handleChipClick = (preset: string) => {
    setPrompt(preset);
    handleGenerate(preset);
  };

  const handleApply = () => {
    if (!generatedOutfit) return;
    onApplyOutfit(generatedOutfit.selection);
    setAppliedToast(true);
    setTimeout(() => setAppliedToast(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E1E]/10 border border-[#8B1E1E]/20 text-[#8B1E1E] text-xs font-semibold uppercase tracking-wider mb-2">
          <Bot size={13} />
          <span>Gemini AI Heritage Stylist</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E1D1B] tracking-tight">
          Cố Vấn Phong Cách Trí Tuệ Nhân Tạo
        </h2>
        <p className="text-sm text-[#6E6556] mt-2 leading-relaxed">
          Nhập mong muốn bằng ngôn ngữ tự nhiên. Trợ lý AI sẽ đối chiếu kho tri thức di sản, lựa chọn kiểu áo cổ phục phù hợp và phối hợp cùng phụ kiện Gen Z theo chuẩn tỷ lệ mỹ thuật.
        </p>
      </div>

      {/* Input Box & Preset Chips */}
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-6 shadow-xs max-w-3xl mx-auto mb-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Ví dụ: Tôi muốn một outfit Việt phục để đi cafe cuối tuần cùng bạn bè..."
            className="w-full pl-4 pr-32 py-3.5 bg-white border border-[#D5CABE] rounded-xl text-sm text-[#1E1D1B] placeholder-[#9E9484] focus:outline-hidden focus:border-[#8B1E1E] focus:ring-2 focus:ring-[#8B1E1E]/15 transition-all"
          />

          <button
            onClick={() => handleGenerate()}
            disabled={!prompt.trim() || isLoading}
            className="absolute right-2 px-4 py-2 bg-[#8B1E1E] hover:bg-[#721717] disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            {isLoading ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                <span>Đang phân tích...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>AI Đề Xuất</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt Suggestions Chips (Mandatory Prompt 2.3) */}
        <div className="mt-4 pt-3 border-t border-[#EAE2D4]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7162] block mb-2">
            Mẫu câu gợi ý nhanh (Prompt Chips):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_PROMPTS.map((presetText, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(presetText)}
                className="text-xs px-3 py-2 rounded-lg bg-white hover:bg-[#F4EFEA] text-[#4F4639] border border-[#E0D5C3] transition-all cursor-pointer text-left flex items-center justify-between group hover:border-[#8B1E1E]/40"
              >
                <span className="truncate pr-2">{presetText}</span>
                <ArrowRight size={12} className="shrink-0 text-[#B3A899] group-hover:text-[#8B1E1E] group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Shimmer State */}
      {isLoading && (
        <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-10 text-center max-w-3xl mx-auto shadow-xs animate-pulse">
          <div className="w-12 h-12 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center mx-auto mb-3">
            <Wand2 size={24} className="animate-spin text-[#8B1E1E]" />
          </div>
          <h3 className="font-editorial text-lg font-bold text-[#1E1D1B]">
            AI Stylist đang nghiên cứu cấu trúc di sản & quy chế trang phục...
          </h3>
          <p className="text-xs text-[#7A7162] mt-1.5 max-w-md mx-auto">
            Đang cân bằng ngũ hành màu sắc, phom dáng cổ phục và tinh thần Gen Z đương đại.
          </p>
        </div>
      )}

      {/* Generated Result Display */}
      {generatedOutfit && !isLoading && (
        <div className="bg-[#FAF8F5] border-2 border-[#8B1E1E]/30 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-md animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Preview */}
            <div className="md:col-span-5 h-[390px] bg-white rounded-xl border border-[#E5DDD0] overflow-hidden p-2">
              <MannequinPreview selection={generatedOutfit.selection} interactive={false} compact={true} />
            </div>

            {/* Right Styling Output */}
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
                    <CheckCircle2 size={14} />
                    <span>Đề xuất từ AI Stylist</span>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-50 text-amber-900 border border-amber-200">
                    {generatedOutfit.source === 'gemini' ? 'Gemini 3.8 Flash' : 'Di Sản Thông Minh'}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
                  {generatedOutfit.styleName}
                </h3>
                <p className="text-xs text-[#7A7061] mt-0.5 italic">
                  Yêu cầu: “{generatedOutfit.promptUsed}”
                </p>
              </div>

              {/* Outfit details breakdown */}
              <div className="bg-[#F4EFEA] rounded-xl p-4 border border-[#E5DDD0] space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#E5DDD0]/80">
                  <span className="text-[#6E6659] font-medium">Trang phục chính:</span>
                  <span className="font-bold text-[#1E1D1B]">
                    {GARMENTS.find((g) => g.id === generatedOutfit.selection.garmentId)?.name}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-1.5 border-b border-[#E5DDD0]/80">
                  <span className="text-[#6E6659] font-medium">Màu sắc chủ đạo:</span>
                  <span className="font-bold text-[#1E1D1B]">
                    {COLORS.find((c) => c.id === generatedOutfit.selection.colorId)?.name}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-1.5 border-b border-[#E5DDD0]/80">
                  <span className="text-[#6E6659] font-medium">Phần dưới & Giày:</span>
                  <span className="font-bold text-[#1E1D1B] truncate max-w-[200px]">
                    {BOTTOM_PIECES.find((b) => b.id === generatedOutfit.selection.bottomId)?.name} + {FOOTWEAR_PIECES.find((f) => f.id === generatedOutfit.selection.footwearId)?.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#6E6659] font-medium">Mũ & Phụ kiện:</span>
                  <span className="font-bold text-[#1E1D1B] truncate max-w-[200px]">
                    {HEADWEAR_PIECES.find((h) => h.id === generatedOutfit.selection.headwearId)?.name} + {ACCESSORY_PIECES.find((a) => a.id === generatedOutfit.selection.accessoryId)?.name}
                  </span>
                </div>
              </div>

              {/* Lý giải thời trang */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E5547] block">
                  Lý do phối từ AI Stylist:
                </span>
                <p className="text-xs sm:text-[13px] text-[#3A352C] leading-relaxed italic bg-white p-3 rounded-xl border border-[#E5DDD0]">
                  “{generatedOutfit.description}”
                </p>
              </div>

              {/* Triết lý văn hóa */}
              {generatedOutfit.culturalPhilosophy && (
                <div className="p-2.5 rounded-lg bg-[#8B1E1E]/5 border border-[#8B1E1E]/15 text-[11px] text-[#691818] flex items-center gap-2">
                  <Compass size={14} className="shrink-0 text-[#8B1E1E]" />
                  <span><strong>Ý nghĩa di sản:</strong> {generatedOutfit.culturalPhilosophy}</span>
                </div>
              )}

              {/* CTA Apply to Remix Editor */}
              <div className="pt-1">
                <button
                  onClick={handleApply}
                  className="w-full py-3 px-4 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                >
                  {appliedToast ? (
                    <>
                      <Check size={16} />
                      <span>Đã áp dụng vào xưởng thành công!</span>
                    </>
                  ) : (
                    <>
                      <span>Áp dụng bản phối này vào xưởng</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
