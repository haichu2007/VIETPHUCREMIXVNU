import React, { useState } from 'react';
import { OutfitSelection } from '../types';
import { AI_PROMPT_EXAMPLES, GARMENTS, STYLES, COLORS, BOTTOM_PIECES, FOOTWEAR_PIECES, BAG_PIECES, ACCESSORY_PIECES } from '../data/mockData';
import { MannequinPreview } from './MannequinPreview';
import { Wand2, Sparkles, ArrowRight, CornerDownLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

interface AIStylistSectionProps {
  onApplyOutfit: (selection: OutfitSelection) => void;
  onOpenAIFaceModal?: () => void;
}

export const AIStylistSection: React.FC<AIStylistSectionProps> = ({ onApplyOutfit, onOpenAIFaceModal }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState<{
    selection: OutfitSelection;
    styleName: string;
    description: string;
    promptUsed: string;
  } | null>(null);

  // Helper function to synthesize a cohesive styling based on user input
  const handleGenerate = (customPrompt?: string) => {
    const textToAnalyze = (customPrompt || prompt).trim().toLowerCase();
    if (!textToAnalyze) return;

    setIsLoading(true);

    // Simulate AI reasoning and aesthetic matching
    setTimeout(() => {
      let chosenSelection: OutfitSelection;
      let styleName = 'Modern Minimal';
      let description = 'Giữ form áo ngũ thân làm điểm nhận diện chính, kết hợp các item hiện đại để tạo cảm giác trẻ và dễ mặc hàng ngày.';

      if (textToAnalyze.includes('cafe') || textToAnalyze.includes('cà phê') || textToAnalyze.includes('bạn bè') || textToAnalyze.includes('tản bộ')) {
        chosenSelection = {
          garmentId: 'ao-ba-ba',
          bottomId: 'pants-denim-wide',
          headwearId: 'head-beret-modern',
          footwearId: 'shoes-minimal-mule',
          bagId: 'bag-woven-coi',
          accessoryId: 'acc-wooden-fan',
          styleId: 'style-casual',
          colorId: 'imperial-gold'
        };
        styleName = 'Daily Casual & Cafe Vibe';
        description = 'Áo bà ba vàng hoàng yến mang lại cảm giác thân thiện, phóng khoáng; phối cùng quần denim ống suông và túi mây tre đan tạo vẻ đẹp thanh xuân thư thái khi ngồi cafe sáng.';
      } else if (textToAnalyze.includes('học') || textToAnalyze.includes('giảng đường') || textToAnalyze.includes('thuyết trình') || textToAnalyze.includes('công sở')) {
        chosenSelection = {
          garmentId: 'ao-ngu-than',
          bottomId: 'pants-tailored-high',
          headwearId: 'head-none',
          footwearId: 'shoes-leather-loafer',
          bagId: 'bag-tote-dongho',
          accessoryId: 'acc-wooden-fan',
          styleId: 'style-minimal',
          colorId: 'pearl-white'
        };
        styleName = 'Campus Minimalist';
        description = 'Áo ngũ thân tay chẽn trắng ngọc tôn lên cốt cách mực thước, kín đáo phù hợp môi trường học thuật, kết hợp quần tây may đo và giày loafer đen tạo phong thái tự tin, trí thức trẻ.';
      } else if (textToAnalyze.includes('concert') || textToAnalyze.includes('âm nhạc') || textToAnalyze.includes('festival') || textToAnalyze.includes('quẩy')) {
        chosenSelection = {
          garmentId: 'ao-giao-linh',
          bottomId: 'pants-cargo-minimal',
          headwearId: 'head-bandana-silk',
          footwearId: 'shoes-chunky-sneaker',
          bagId: 'bag-crossbody-nylon',
          accessoryId: 'acc-headphones',
          styleId: 'style-street',
          colorId: 'indigo-blue'
        };
        styleName = 'Festival Streetwear';
        description = 'Áo giao lĩnh mở tà bay bổng kết hợp quần cargo kháng nước và chunky sneaker giúp bạn tự do chuyển động theo điệu nhạc, trong khi tai nghe bạc và khăn bandana tạo chất riêng nổi bật giữa biển người.';
      } else if (textToAnalyze.includes('chụp ảnh') || textToAnalyze.includes('lookbook') || textToAnalyze.includes('phố cổ') || textToAnalyze.includes('bảo tàng') || textToAnalyze.includes('tết')) {
        chosenSelection = {
          garmentId: 'ao-dai',
          bottomId: 'pants-silk-wide',
          headwearId: 'head-man-cach-tan',
          footwearId: 'shoes-guoc-moc',
          bagId: 'bag-clutch-lacquer',
          accessoryId: 'acc-silver-kieng',
          styleId: 'style-old-money',
          colorId: 'lacquer-red'
        };
        styleName = 'Heritage Cinematic';
        description = 'Sắc đỏ sơn mài tương phản ấn tượng trên nền kiến trúc rêu phong. Tà áo dài tha thướt phối kiềng bạc sáng và guốc mộc truyền thống tạo nên bố cục thị giác đắt giá, đậm chất điện ảnh.';
      } else if (textToAnalyze.includes('street') || textToAnalyze.includes('đường phố') || textToAnalyze.includes('phá cách') || textToAnalyze.includes('y2k') || textToAnalyze.includes('ngầu')) {
        chosenSelection = {
          garmentId: 'ao-ngu-than',
          bottomId: 'pants-denim-wide',
          headwearId: 'head-none',
          footwearId: 'shoes-chunky-sneaker',
          bagId: 'bag-crossbody-nylon',
          accessoryId: 'acc-sunglasses-oval',
          styleId: 'style-street',
          colorId: 'charcoal-black'
        };
        styleName = 'Modern Streetwear Bold';
        description = 'Giữ phom áo ngũ thân đen mực tàu làm điểm nhận diện văn hóa đắt giá, phối mở cúc ngực cùng kính râm oval và sneaker đế hầm hố mang lại tinh thần Gen Z sắc lạnh.';
      } else {
        // Creative Editorial Fallback
        chosenSelection = {
          garmentId: 'ao-doi-kham',
          bottomId: 'skirt-asymmetric-wrap',
          headwearId: 'head-none',
          footwearId: 'shoes-chelsea-boots',
          bagId: 'bag-shoulder-leather',
          accessoryId: 'acc-silver-kieng',
          styleId: 'style-creative',
          colorId: 'court-purple'
        };
        styleName = 'Modern Editorial Fusion';
        description = 'Bản phối dung hợp chiếc áo đối khâm cung đình quý phái với chân váy bất đối xứng và chelsea boots da bóng, tôn vinh tư duy thời trang tự do và khí chất đương đại.';
      }

      setGeneratedOutfit({
        selection: chosenSelection,
        styleName,
        description,
        promptUsed: customPrompt || prompt
      });

      setIsLoading(false);
    }, 750);
  };

  const handleChipClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    handleGenerate(examplePrompt);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#8C671C] text-xs font-semibold uppercase tracking-wider mb-2">
          <Wand2 size={13} />
          <span>AI Remix Stylist</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E1D1B] tracking-tight">
          Cho AI biết bạn muốn mặc gì
        </h2>
        <p className="text-sm text-[#6E6556] mt-2">
          AI sẽ phân tích ngữ cảnh, lựa chọn loại Việt phục phù hợp, gợi ý phụ kiện Gen Z và cân bằng chuẩn tỷ lệ di sản.
        </p>
      </div>

      {/* Featured CTA Banner: Tạo AI Lookbook với khuôn mặt của bạn */}
      {onOpenAIFaceModal && (
        <div className="max-w-3xl mx-auto mb-8 p-5 rounded-2xl bg-linear-to-r from-[#1C1816] via-[#2E241E] to-[#1C1816] border border-[#C89B3C]/60 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#C89B3C] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFDF78] font-bold">
                Quy Trình Kiểm Soát 5 Bước · Face Try-On
              </span>
            </div>
            <h3 className="font-editorial text-lg font-bold text-[#FAF8F5]">
              Tạo AI Lookbook với khuôn mặt của bạn
            </h3>
            <p className="text-xs text-[#D5CABE] max-w-lg leading-relaxed">
              Kiểm soát góc chụp, công cụ crop oval chuẩn studio portrait, mô phỏng khâu tơ lụa và giải phẫu 5 lớp Master Prompt Google AI Studio.
            </p>
          </div>
          <button
            onClick={onOpenAIFaceModal}
            className="px-5 py-3 bg-[#8B1E1E] hover:bg-[#A82525] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Sparkles size={14} />
            <span>Thử Ngay</span>
          </button>
        </div>
      )}

      {/* Input Box & Preset Chips */}
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-6 shadow-sm max-w-3xl mx-auto mb-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Ví dụ: Tôi muốn một outfit Việt phục để đi cafe cuối tuần..."
            className="w-full pl-4 pr-32 py-3.5 bg-white border border-[#D5CABE] rounded-xl text-sm text-[#1E1D1B] placeholder-[#9E9484] focus:outline-hidden focus:border-[#8B1E1E] focus:ring-2 focus:ring-[#8B1E1E]/15 transition-all"
          />

          <button
            onClick={() => handleGenerate()}
            disabled={!prompt.trim() || isLoading}
            className="absolute right-2 px-4 py-2 bg-[#8B1E1E] hover:bg-[#721717] disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            {isLoading ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                <span>Đang phối...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>Đề xuất</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt Suggestions Chips */}
        <div className="mt-4 pt-3 border-t border-[#EAE2D4]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7162] block mb-2">
            Gợi ý ngữ cảnh phổ biến:
          </span>
          <div className="flex flex-wrap gap-2">
            {AI_PROMPT_EXAMPLES.map((item) => (
              <button
                key={item.id}
                onClick={() => handleChipClick(item.prompt)}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#F4EFEA] hover:bg-[#EAE1D3] text-[#4F4639] border border-[#E0D5C3] transition-colors cursor-pointer text-left"
              >
                {item.prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Result Display */}
      {isLoading && (
        <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-12 text-center max-w-3xl mx-auto shadow-sm animate-pulse">
          <div className="w-12 h-12 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center mx-auto mb-3">
            <Wand2 size={24} className="animate-spin" />
          </div>
          <h3 className="font-editorial text-lg font-bold text-[#1E1D1B]">
            AI Stylist đang nghiên cứu cấu trúc di sản...
          </h3>
          <p className="text-xs text-[#7A7162] mt-1">
            Đang cân bằng tỷ lệ cổ phục và phụ kiện hiện đại cho ngữ cảnh của bạn.
          </p>
        </div>
      )}

      {generatedOutfit && !isLoading && (
        <div className="bg-[#FAF8F5] border-2 border-[#8B1E1E]/30 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-lg animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Preview */}
            <div className="md:col-span-5 h-[380px]">
              <MannequinPreview selection={generatedOutfit.selection} interactive={false} compact={true} />
            </div>

            {/* Right Styling Output */}
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E1E] mb-1">
                  <CheckCircle2 size={14} />
                  <span>Đề xuất từ AI Stylist</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
                  {generatedOutfit.styleName}
                </h3>
                <p className="text-xs text-[#7A7061] mt-0.5 italic">
                  Dựa trên yêu cầu: “{generatedOutfit.promptUsed}”
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
                  <span className="text-[#6E6659] font-medium">Túi & Phụ kiện:</span>
                  <span className="font-bold text-[#1E1D1B] truncate max-w-[200px]">
                    {BAG_PIECES.find((b) => b.id === generatedOutfit.selection.bagId)?.name} + {ACCESSORY_PIECES.find((a) => a.id === generatedOutfit.selection.accessoryId)?.name}
                  </span>
                </div>
              </div>

              {/* Lý do phối / Mô tả */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E5547] block mb-1">
                  Lý do phối từ AI:
                </span>
                <p className="text-xs sm:text-[13px] text-[#3A352C] leading-relaxed italic bg-white p-3 rounded-lg border border-[#E5DDD0]">
                  “{generatedOutfit.description}”
                </p>
              </div>

              {/* CTA Apply to Remix Editor */}
              <button
                onClick={() => onApplyOutfit(generatedOutfit.selection)}
                className="w-full py-3 px-4 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
              >
                <span>Áp dụng vào Phòng Thử Đồ ngay</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
