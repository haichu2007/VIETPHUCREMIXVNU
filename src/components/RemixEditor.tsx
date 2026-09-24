import React, { useState } from 'react';
import { OutfitSelection, SavedOutfit, FabricTextureType, SkinToneType, GenderType, TuckStyleType, WhereToWearLocation, SustainableItem, SmartAIContext } from '../types';
import {
  GARMENTS,
  BOTTOM_PIECES,
  HEADWEAR_PIECES,
  FOOTWEAR_PIECES,
  BAG_PIECES,
  ACCESSORY_PIECES,
  STYLES,
  COLORS,
  AVATAR_MODELS,
  SKIN_TONE_OPTIONS,
  checkCulturalIntegrity,
  getWhereToWearRecommendations
} from '../data/mockData';
import { calculateStyleScore } from '../utils/styleScore';
import { useCountUp } from '../hooks/useCountUp';
import { MannequinPreview, FABRIC_TEXTURE_OPTIONS } from './MannequinPreview';
import { CulturalWarningAlert } from './CulturalWarningAlert';
import { ColorHarmonyChecker } from './ColorHarmonyChecker';
import { WeatherEventRecommender } from './WeatherEventRecommender';
import { OutfitComparisonModal } from './OutfitComparisonModal';
import { LookbookModal } from './LookbookModal';
import { UploadPhotoModal } from './UploadPhotoModal';
import { RealProductsFinder } from './RealProductsFinder';
import { WhereToWearModal } from './WhereToWearModal';
import { SustainableWardrobeModal } from './SustainableWardrobeModal';
import { SmartContextBar } from './SmartContextBar';
import {
  Sparkles,
  Shuffle,
  Eye,
  Shirt,
  Info,
  Layers,
  Palette,
  Check,
  UserCheck,
  CloudSun,
  ArrowLeftRight,
  BookOpen,
  ShoppingBag,
  Sparkle,
  Smile,
  Heart,
  Upload,
  RotateCcw,
  Wand2,
  Undo2,
  Scissors,
  Compass,
  Leaf,
  MapPin,
  Camera,
  Navigation,
  Clock,
  ChevronDown,
  MoreHorizontal,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface RemixEditorProps {
  selection: OutfitSelection;
  setSelection: React.Dispatch<React.SetStateAction<OutfitSelection>>;
  onOpenResult: () => void;
  outfitCode: string;
  savedOutfits: SavedOutfit[];
}

const DEFAULT_SELECTION_RESET: OutfitSelection = {
  garmentId: 'ao-ngu-than',
  bottomId: 'pants-denim-wide',
  headwearId: 'head-none',
  footwearId: 'shoes-chunky-sneaker',
  bagId: 'bag-crossbody-nylon',
  accessoryId: 'acc-headphones',
  styleId: 'style-street',
  colorId: 'lacquer-red',
  gender: 'female',
  tuckStyle: 'untucked',
  fabricTexture: 'silk',
  textureIntensity: 'medium',
  avatarId: 'avatar-female-classic',
  skinTone: 'porcelain'
};

export const RemixEditor: React.FC<RemixEditorProps> = ({
  selection,
  setSelection,
  onOpenResult,
  outfitCode,
  savedOutfits
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<
    'garment' | 'bottom' | 'footwear' | 'headwear' | 'bag' | 'accessories' | 'avatar'
  >('garment');

  const [activeRightTab, setActiveRightTab] = useState<
    'style' | 'destinations' | 'products'
  >('style');

  const [avatarGenderFilter, setAvatarGenderFilter] = useState<'all' | 'female' | 'male' | 'androgynous'>('all');
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [showQuickHint, setShowQuickHint] = useState(true);

  // Modals
  const [isWhereToWearModalOpen, setIsWhereToWearModalOpen] = useState(false);
  const [isSustainableModalOpen, setIsSustainableModalOpen] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<{ message: string; type: 'ai' | 'reset' | 'eco' } | null>(null);

  const selectedGarment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const scoreResult = calculateStyleScore(selection);
  const culturalCheck = checkCulturalIntegrity(selection);

  // Animated Count-Up Values for Style Score
  const animatedTraditional = useCountUp(scoreResult.traditionalScore, 500);
  const animatedModern = useCountUp(scoreResult.modernScore, 500);
  const animatedIndividuality = useCountUp(scoreResult.individualityScore, 500);

  // Curated AI Stylist Presets for "Surprise Me / AI Gợi Ý Nhanh"
  const AI_CURATED_PRESETS: Array<{ name: string; selection: OutfitSelection }> = [
    {
      name: 'Đại Nam Streetwear: Áo Ngũ Thân × Denim × Sneaker × Kiềng Bạc',
      selection: {
        garmentId: 'ao-ngu-than',
        bottomId: 'pants-denim-wide',
        headwearId: 'head-none',
        footwearId: 'shoes-chunky-sneaker',
        bagId: 'bag-crossbody-nylon',
        accessoryId: 'acc-silver-kieng',
        styleId: 'style-street',
        colorId: 'lacquer-red',
        fabricTexture: 'brocade',
        textureIntensity: 'rich',
        avatarId: 'avatar-female-classic',
        skinTone: 'porcelain'
      }
    },
    {
      name: 'Bắc Bộ Contemporary: Áo Tứ Thân × Váy Dập Ly × Mule × Mấn Ngọc',
      selection: {
        garmentId: 'ao-tu-than',
        bottomId: 'skirt-pleated-midi',
        headwearId: 'head-man-cach-tan',
        footwearId: 'shoes-minimal-mule',
        bagId: 'bag-woven-coi',
        accessoryId: 'acc-jade-earrings',
        styleId: 'style-minimal',
        colorId: 'lotus-pink',
        fabricTexture: 'silk',
        textureIntensity: 'medium',
        avatarId: 'avatar-female-editorial',
        skinTone: 'warm-ivory'
      }
    },
    {
      name: 'Neo-Heritage Noir: Áo Giao Lĩnh × Quần Tây × Chelsea Boots × Kính Y2K',
      selection: {
        garmentId: 'ao-giao-linh',
        bottomId: 'pants-tailored-high',
        headwearId: 'head-beret-modern',
        footwearId: 'shoes-chelsea-boots',
        bagId: 'bag-shoulder-leather',
        accessoryId: 'acc-sunglasses-oval',
        styleId: 'style-cyberpunk',
        colorId: 'charcoal-black',
        fabricTexture: 'linen',
        textureIntensity: 'medium',
        avatarId: 'avatar-male-streetwear',
        skinTone: 'golden-honey'
      }
    },
    {
      name: 'Nam Bộ Poetic Chic: Áo Bà Ba × Chân Váy Quấn × Loafer × Túi Mây',
      selection: {
        garmentId: 'ao-ba-ba',
        bottomId: 'skirt-asymmetric-wrap',
        headwearId: 'head-none',
        footwearId: 'shoes-leather-loafer',
        bagId: 'bag-woven-coi',
        accessoryId: 'acc-wooden-fan',
        styleId: 'style-indochine',
        colorId: 'mustard-yellow',
        fabricTexture: 'silk',
        textureIntensity: 'subtle',
        avatarId: 'avatar-female-classic',
        skinTone: 'warm-ivory'
      }
    },
    {
      name: 'Cung Đình Minimalist: Áo Đối Khâm × Quần Lụa Rộng × Guốc Mộc × Khăn Đóng',
      selection: {
        garmentId: 'ao-doi-kham',
        bottomId: 'pants-silk-wide',
        headwearId: 'head-khan-dong',
        footwearId: 'shoes-guoc-moc',
        bagId: 'bag-clutch-lacquer',
        accessoryId: 'acc-silver-kieng',
        styleId: 'style-academic',
        colorId: 'court-purple',
        fabricTexture: 'brocade',
        textureIntensity: 'rich',
        avatarId: 'avatar-androgynous-editorial',
        skinTone: 'caramel'
      }
    }
  ];

  // AI Surprise Me trigger
  const handleSurpriseMe = () => {
    const preset = AI_CURATED_PRESETS[Math.floor(Math.random() * AI_CURATED_PRESETS.length)];
    setSelection(preset.selection);
    setFeedbackToast({
      message: `✨ AI Curated: ${preset.name}`,
      type: 'ai'
    });
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Clear All / Undo All Accessories & Headwear
  const handleClearAll = () => {
    setSelection((prev) => ({
      ...prev,
      headwearId: 'head-none',
      bagId: 'bag-none',
      accessoryId: 'acc-none'
    }));
    setFeedbackToast({
      message: '🧹 Đã gỡ bỏ toàn bộ phụ kiện & mũ nón. Sẵn sàng phối lại từ đầu!',
      type: 'reset'
    });
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  // Random Remix generator function
  const handleRandomRemix = () => {
    const randomGarment = GARMENTS[Math.floor(Math.random() * GARMENTS.length)];
    const randomBottom = BOTTOM_PIECES[Math.floor(Math.random() * BOTTOM_PIECES.length)];
    const randomHeadwear = HEADWEAR_PIECES[Math.floor(Math.random() * HEADWEAR_PIECES.length)];
    const randomFootwear = FOOTWEAR_PIECES[Math.floor(Math.random() * FOOTWEAR_PIECES.length)];
    const randomBag = BAG_PIECES[Math.floor(Math.random() * BAG_PIECES.length)];
    const randomAccessory = ACCESSORY_PIECES[Math.floor(Math.random() * ACCESSORY_PIECES.length)];
    const randomStyle = STYLES[Math.floor(Math.random() * STYLES.length)];
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const randomTextures: FabricTextureType[] = ['silk', 'linen', 'brocade', 'grain'];
    const randomTexture = randomTextures[Math.floor(Math.random() * randomTextures.length)];

    setSelection((prev) => ({
      ...prev,
      garmentId: randomGarment.id,
      bottomId: randomBottom.id,
      headwearId: randomHeadwear.id,
      footwearId: randomFootwear.id,
      bagId: randomBag.id,
      accessoryId: randomAccessory.id,
      styleId: randomStyle.id,
      colorId: randomColor.id,
      fabricTexture: randomTexture
    }));
  };

  const handleResetDefault = () => {
    setSelection(DEFAULT_SELECTION_RESET);
    setFeedbackToast({
      message: '🔄 Đã khôi phục cấu hình trang phục mặc định.',
      type: 'reset'
    });
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  // Sustainable item handler
  const handleApplySustainableItem = (item: SustainableItem) => {
    setSelection((prev) => {
      const next = { ...prev };
      if (item.targetSlotId === 'bottomId') next.bottomId = item.mappedItemId;
      else if (item.targetSlotId === 'footwearId') next.footwearId = item.mappedItemId;
      else if (item.targetSlotId === 'bagId') next.bagId = item.mappedItemId;
      else if (item.targetSlotId === 'accessoryId') next.accessoryId = item.mappedItemId;
      return next;
    });

    setFeedbackToast({
      message: `🌱 Đã lắp "${item.name}" vào Ma-nơ-canh (Tiết kiệm ~${item.waterSavedLiters}L nước & ${item.co2SavedKg}kg CO2)!`,
      type: 'eco'
    });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleApplyOutfitForLocation = (loc: WhereToWearLocation) => {
    // Recommend top garment for this location
    const matchedGarment = loc.recommendedGarments[0] || 'ao-ngu-than';
    setSelection((prev) => ({
      ...prev,
      garmentId: matchedGarment
    }));
    setFeedbackToast({
      message: `📍 Đã tối ưu trang phục cho địa điểm "${loc.name}" (${loc.city})!`,
      type: 'ai'
    });
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handleApplyContextOutfit = (suggestedSelection: Partial<OutfitSelection>, context: SmartAIContext) => {
    setSelection((prev) => ({
      ...prev,
      ...suggestedSelection
    }));
    setFeedbackToast({
      message: `✨ Đã áp dụng gợi ý AI theo bối cảnh "${context.title}"!`,
      type: 'ai'
    });
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Feedback Toast Banner */}
      {feedbackToast && (
        <div
          className={`mb-4 p-3 rounded-xl border flex items-center justify-between text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 ${
            feedbackToast.type === 'ai'
              ? 'bg-[#8B1E1E] text-white border-[#721717]'
              : feedbackToast.type === 'eco'
              ? 'bg-emerald-800 text-white border-emerald-900'
              : 'bg-[#F4EFEA] text-[#1E1D1B] border-[#D5CABE]'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackToast.type === 'ai' ? (
              <Wand2 size={16} className="text-[#F5D061] animate-pulse" />
            ) : feedbackToast.type === 'eco' ? (
              <Leaf size={16} className="text-emerald-300 animate-bounce" />
            ) : (
              <RotateCcw size={16} className="text-[#8B1E1E]" />
            )}
            <span>{feedbackToast.message}</span>
          </div>
          <button
            onClick={() => setFeedbackToast(null)}
            className="text-xs opacity-75 hover:opacity-100 cursor-pointer px-1.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* Editor Sub-Header / Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E5DDD0] mb-3 gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#8B1E1E]">
            <Sparkles size={12} />
            <span>Phòng Thử Đồ Kỹ Thuật Số · Digital Dressing Room</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E1D1B] mt-0.5 flex items-center gap-2">
            <span>Việt Phục Remix</span>
            <span className="text-xs font-sans font-semibold px-2 py-0.5 bg-[#8B1E1E]/10 text-[#8B1E1E] rounded-full">
              Gen Z Style
            </span>
          </h1>
        </div>

        {/* Streamlined Action Bar: 3 Primary Hero Buttons + 1 Dropdown Menu + 1 Primary CTA */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Primary 1: One-Click AI Magic Remix */}
          <button
            onClick={handleSurpriseMe}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-gradient-to-r from-[#8B1E1E] to-[#A82626] hover:from-[#721717] hover:to-[#8B1E1E] text-white rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
            title="AI tự động phối ngẫu hứng một bộ outfit hoàn chỉnh cực đẹp"
          >
            <Wand2 size={14} className="text-[#F5D061] animate-spin-slow" />
            <span>AI Phối Tự Động</span>
          </button>

          {/* Primary 2: Where to Wear Modal Trigger */}
          <button
            onClick={() => setIsWhereToWearModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-[#FAF5EE] hover:bg-[#F3EADE] text-[#8B1E1E] border border-[#8B1E1E]/30 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-98"
            title="Gợi ý các quán cafe, bảo tàng, di tích và sự kiện hợp với outfit này"
          >
            <Compass size={14} className="text-[#8B1E1E]" />
            <span>Điểm Đến</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#8B1E1E] text-white rounded-full font-sans">
              Vibe
            </span>
          </button>

          {/* Primary 3: Sustainable Wardrobe Upload */}
          <button
            onClick={() => setIsSustainableModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-98"
            title="Tận dụng quần jeans, sneaker có sẵn ở nhà với AI tách nền"
          >
            <Leaf size={14} className="text-emerald-600" />
            <span>Tủ Đồ Có Sẵn</span>
          </button>

          {/* Secondary: Tools Dropdown Popover */}
          <div className="relative">
            <button
              onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold bg-white hover:bg-[#F4EFEA] text-[#1E1D1B] border border-[#D5CABE] rounded-xl transition-colors cursor-pointer shadow-2xs"
              title="Mở thêm các công cụ hỗ trợ: Thời tiết, So sánh, Lookbook, Tải ảnh..."
            >
              <MoreHorizontal size={14} className="text-[#6E6454]" />
              <span>Tiện Ích</span>
              <ChevronDown size={12} className={`transition-transform ${isToolsMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isToolsMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsToolsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-56 bg-white border border-[#E5DDD0] rounded-xl shadow-lg p-1.5 z-30 space-y-0.5 animate-in fade-in duration-100">
                  <button
                    onClick={() => {
                      setIsWeatherModalOpen(true);
                      setIsToolsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#1E1D1B] hover:bg-[#FAF5EE] rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <CloudSun size={14} className="text-[#8B1E1E]" />
                    <span>Gợi Ý Theo Thời Tiết</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCompareModalOpen(true);
                      setIsToolsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#1E1D1B] hover:bg-[#FAF5EE] rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <ArrowLeftRight size={14} className="text-[#23395B]" />
                    <span>So Sánh Đối Chiếu 2 Bộ</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsLookbookModalOpen(true);
                      setIsToolsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#1E1D1B] hover:bg-[#FAF5EE] rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <BookOpen size={14} className="text-[#C89B3C]" />
                    <span>Tạo Tuyển Tập Lookbook</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUploadModalOpen(true);
                      setIsToolsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#1E1D1B] hover:bg-[#FAF5EE] rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <Upload size={14} className="text-[#8B1E1E]" />
                    <span>Tải Ảnh Chân Dung Cá Nhân</span>
                  </button>

                  <div className="border-t border-[#EAE2D5] my-1" />

                  <button
                    onClick={() => {
                      handleRandomRemix();
                      setIsToolsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#1E1D1B] hover:bg-[#FAF5EE] rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <Shuffle size={14} className="text-[#6E6454]" />
                    <span>Phối Ngẫu Nhiên</span>
                  </button>

                  <button
                    onClick={() => {
                      handleResetDefault();
                      setIsToolsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-[#7A7061] hover:bg-[#FAF5EE] rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Làm Mới Mặc Định</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Primary CTA Finish Button */}
          <button
            onClick={onOpenResult}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#8B1E1E] hover:bg-[#721717] rounded-xl transition-all shadow-sm cursor-pointer active:scale-98"
          >
            <Eye size={14} />
            <span>Xuất Thẻ ({outfitCode})</span>
          </button>
        </div>
      </div>

      {/* Smart AI Context Real-time Banner */}
      <SmartContextBar onApplyContextOutfit={handleApplyContextOutfit} />

      {/* Intuitive 3-Step Guided Header Banner */}
      {showQuickHint && (
        <div className="mb-4 px-3.5 py-2.5 bg-white border border-[#E5DDD0] rounded-xl flex items-center justify-between shadow-2xs text-xs text-[#5C5346]">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center font-bold text-[11px]">
              💡
            </span>
            <span className="leading-snug">
              <strong>Cách dùng cực dễ:</strong> <span className="text-[#8B1E1E] font-semibold">① Chọn món đồ</span> bên trái → <span className="text-[#8B1E1E] font-semibold">② Xem người mẫu</span> ở giữa → <span className="text-[#8B1E1E] font-semibold">③ Chọn màu & nhận điểm đến</span> bên phải!
            </span>
          </div>
          <button
            onClick={() => setShowQuickHint(false)}
            className="text-[11px] text-[#8C7E6D] hover:text-[#1E1D1B] font-semibold px-2 py-0.5 rounded cursor-pointer hover:bg-[#FAF5EE]"
            title="Đóng hướng dẫn nhanh"
          >
            Đã hiểu ✕
          </button>
        </div>
      )}

      {/* 3-Column Studio Layout with Explicit Step Numbers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* =========================================================================
            COLUMN 1 (LEFT): BƯỚC 1: CHỌN MÓN ĐỒ (Garments, Bottoms, Shoes, Avatar...)
           ========================================================================= */}
        <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col h-[740px]">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E5DDD0] mb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center text-[11px] font-bold font-mono">
                1
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B]">
                Chọn Món Đồ
              </h2>
            </div>
            <span className="text-[10px] text-[#7A7061]">Bấm để đổi trang phục</span>
          </div>

          {/* Category Tabs: 6 clear, readable tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4EFEA] rounded-xl mb-3 text-[11px]">
            <button
              onClick={() => setActiveCategoryTab('garment')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                activeCategoryTab === 'garment'
                  ? 'bg-white text-[#8B1E1E] shadow-xs font-bold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              👘 Áo Việt
            </button>
            <button
              onClick={() => setActiveCategoryTab('bottom')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                activeCategoryTab === 'bottom'
                  ? 'bg-white text-[#8B1E1E] shadow-xs font-bold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              👖 Quần / Váy
            </button>
            <button
              onClick={() => setActiveCategoryTab('footwear')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                activeCategoryTab === 'footwear'
                  ? 'bg-white text-[#8B1E1E] shadow-xs font-bold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              👟 Giày Dép
            </button>
            <button
              onClick={() => setActiveCategoryTab('headwear')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                activeCategoryTab === 'headwear'
                  ? 'bg-white text-[#8B1E1E] shadow-xs font-bold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              🧢 Khăn / Mấn
            </button>
            <button
              onClick={() => setActiveCategoryTab('accessories')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                activeCategoryTab === 'accessories' || activeCategoryTab === 'bag'
                  ? 'bg-white text-[#8B1E1E] shadow-xs font-bold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              💍 Phụ Kiện / Túi
            </button>
            <button
              onClick={() => setActiveCategoryTab('avatar')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                activeCategoryTab === 'avatar'
                  ? 'bg-white text-[#8B1E1E] shadow-xs font-bold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              <UserCheck size={12} className="text-[#8B1E1E]" />
              <span>Người Mẫu</span>
            </button>
          </div>

          {/* Scrollable Item Options */}
          <div className="overflow-y-auto custom-scrollbar flex-1 pr-1 space-y-2.5">
            {/* 1. Garments Tab */}
            {activeCategoryTab === 'garment' && (
              <div className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-150">
                {/* Quick Sơ Vin / Tuck-in Style Toggle Bar */}
                <div className="p-3 bg-white rounded-xl border border-[#E5DDD0] shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Scissors size={12} className="text-[#8B1E1E]" />
                      <span>Kiểu Sơ Vin (Tucking Style)</span>
                    </span>
                    <span className="text-[10px] text-[#8B1E1E] font-medium">
                      {(selection.tuckStyle || 'untucked') === 'full-tuck'
                        ? 'Đóng thùng toàn phần'
                        : (selection.tuckStyle || 'untucked') === 'half-tuck'
                        ? 'Sơ vin vạt trước'
                        : 'Thả tà tự nhiên'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'untucked', label: 'Thả Tà', sub: 'Tự nhiên', icon: '👔' },
                      { id: 'full-tuck', label: 'Đóng Thùng', sub: 'Toàn phần', icon: '✨' },
                      { id: 'half-tuck', label: 'Vạt Trước', sub: 'French tuck', icon: '⚡' }
                    ].map((t) => {
                      const isSelected = (selection.tuckStyle || 'untucked') === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setSelection((prev) => ({ ...prev, tuckStyle: t.id as TuckStyleType }))}
                          className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-[#8B1E1E]/8 text-[#8B1E1E] font-bold ring-1 ring-[#8B1E1E]/30 shadow-2xs'
                              : 'border-[#E5DDD0] bg-[#FAF8F5] text-[#695F50] hover:border-[#CFC3B2]'
                          }`}
                        >
                          <div className="text-xs">{t.icon}</div>
                          <div className="text-[11px] leading-tight font-semibold mt-0.5">{t.label}</div>
                          <div className="text-[9px] text-[#8C806F] opacity-80">{t.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {GARMENTS.map((g) => {
                  const isSelected = selection.garmentId === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelection({ ...selection, garmentId: g.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/8 ring-1.5 ring-[#8B1E1E]/40 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-editorial text-sm font-bold text-[#1E1D1B]">
                              {g.name}
                            </span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E]" />
                            )}
                          </div>
                          <span className="text-[11px] text-[#7A7061] block mt-0.5">
                            {g.era}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#8B1E1E] text-white rounded-full shadow-2xs">
                            ✓ Đang mặc
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2 leading-relaxed">
                        {g.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. Bottoms Tab */}
            {activeCategoryTab === 'bottom' && (
              <div className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-150">
                {/* Quick Sơ Vin / Tuck-in Style Toggle Bar */}
                <div className="p-3 bg-white rounded-xl border border-[#E5DDD0] shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Scissors size={12} className="text-[#8B1E1E]" />
                      <span>Kiểu Sơ Vin (Tucking Style)</span>
                    </span>
                    <span className="text-[10px] text-[#8B1E1E] font-medium">
                      {(selection.tuckStyle || 'untucked') === 'full-tuck'
                        ? 'Đóng thùng toàn phần'
                        : (selection.tuckStyle || 'untucked') === 'half-tuck'
                        ? 'Sơ vin vạt trước'
                        : 'Thả tà tự nhiên'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'untucked', label: 'Thả Tà', sub: 'Tự nhiên', icon: '👔' },
                      { id: 'full-tuck', label: 'Đóng Thùng', sub: 'Toàn phần', icon: '✨' },
                      { id: 'half-tuck', label: 'Vạt Trước', sub: 'French tuck', icon: '⚡' }
                    ].map((t) => {
                      const isSelected = (selection.tuckStyle || 'untucked') === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setSelection((prev) => ({ ...prev, tuckStyle: t.id as TuckStyleType }))}
                          className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-[#8B1E1E]/8 text-[#8B1E1E] font-bold ring-1 ring-[#8B1E1E]/30 shadow-2xs'
                              : 'border-[#E5DDD0] bg-[#FAF8F5] text-[#695F50] hover:border-[#CFC3B2]'
                          }`}
                        >
                          <div className="text-xs">{t.icon}</div>
                          <div className="text-[11px] leading-tight font-semibold mt-0.5">{t.label}</div>
                          <div className="text-[9px] text-[#8C806F] opacity-80">{t.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {BOTTOM_PIECES.map((b) => {
                  const isSelected = selection.bottomId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelection({ ...selection, bottomId: b.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/8 ring-1.5 ring-[#8B1E1E]/40 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{b.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D]">
                            {b.styleTag}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#8B1E1E] text-white rounded-full shadow-2xs">
                              ✓ Đang mặc
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {b.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 3. Footwear Tab */}
            {activeCategoryTab === 'footwear' && (
              <div className="space-y-2.5 animate-in fade-in slide-in-from-left-2 duration-150">
                {FOOTWEAR_PIECES.map((f) => {
                  const isSelected = selection.footwearId === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelection({ ...selection, footwearId: f.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/8 ring-1.5 ring-[#8B1E1E]/40 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{f.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D]">
                            {f.styleTag}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#8B1E1E] text-white rounded-full shadow-2xs">
                              ✓ Đang mang
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {f.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 4. Headwear Tab (Conflict-free mutual exclusive & 1-click toggle unwear) */}
            {activeCategoryTab === 'headwear' && (
              <div className="space-y-2.5 animate-in fade-in slide-in-from-left-2 duration-150">
                {HEADWEAR_PIECES.map((h) => {
                  const isSelected = selection.headwearId === h.id;
                  return (
                    <div
                      key={h.id}
                      onClick={() =>
                        setSelection({
                          ...selection,
                          headwearId: isSelected && h.id !== 'head-none' ? 'head-none' : h.id
                        })
                      }
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/8 ring-1.5 ring-[#8B1E1E]/40 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{h.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D]">
                            {h.styleTag}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#8B1E1E] text-white rounded-full shadow-2xs">
                              {h.id === 'head-none' ? '✓ Đang chọn' : '✓ Đang đội'}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {h.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 5. Bag Tab (1-click toggle unwear) */}
            {activeCategoryTab === 'bag' && (
              <div className="space-y-2.5 animate-in fade-in slide-in-from-left-2 duration-150">
                {BAG_PIECES.map((b) => {
                  const isSelected = selection.bagId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() =>
                        setSelection({
                          ...selection,
                          bagId: isSelected && b.id !== 'bag-none' ? 'bag-none' : b.id
                        })
                      }
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/8 ring-1.5 ring-[#8B1E1E]/40 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{b.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D]">
                            {b.styleTag}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#8B1E1E] text-white rounded-full shadow-2xs">
                              {b.id === 'bag-none' ? '✓ Đang chọn' : '✓ Đang mang'}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {b.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 6. Accessories Tab (1-click toggle unwear) */}
            {activeCategoryTab === 'accessories' && (
              <div className="space-y-2.5 animate-in fade-in slide-in-from-left-2 duration-150">
                {ACCESSORY_PIECES.map((a) => {
                  const isSelected = selection.accessoryId === a.id;
                  return (
                    <div
                      key={a.id}
                      onClick={() =>
                        setSelection({
                          ...selection,
                          accessoryId: isSelected && a.id !== 'acc-none' ? 'acc-none' : a.id
                        })
                      }
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/8 ring-1.5 ring-[#8B1E1E]/40 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{a.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D]">
                            {a.styleTag}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#8B1E1E] text-white rounded-full shadow-2xs">
                              {a.id === 'acc-none' ? '✓ Đang chọn' : '✓ Đang đeo'}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {a.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 7. Avatar & Skin Tone Archetype Selection Tab */}
            {activeCategoryTab === 'avatar' && (
              <div className="space-y-4">
                {/* Skin Tone Palette Box */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E5DDD0] shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Palette size={13} className="text-[#8B1E1E]" />
                      <span>Sắc Độ Làn Da Á Đông</span>
                    </span>
                    <span className="text-[10px] text-[#7A7061] font-mono">
                      {SKIN_TONE_OPTIONS.find((s) => s.id === (selection.skinTone || 'porcelain'))?.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {SKIN_TONE_OPTIONS.map((skin) => {
                      const isCurrentSkin = (selection.skinTone || 'porcelain') === skin.id;
                      return (
                        <button
                          key={skin.id}
                          onClick={() => {
                            setSelection((prev) => ({
                              ...prev,
                              skinTone: skin.id as SkinToneType
                            }));
                          }}
                          className={`flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer text-center ${
                            isCurrentSkin
                              ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 ring-1 ring-[#8B1E1E] shadow-2xs'
                              : 'border-[#E5DDD0] bg-[#FAF8F5] hover:border-[#CFC3B2]'
                          }`}
                          title={`${skin.name}: ${skin.desc}`}
                        >
                          <div
                            className="w-7 h-7 rounded-full border border-black/15 shadow-2xs mb-1 relative flex items-center justify-center"
                            style={{ backgroundColor: skin.hex }}
                          >
                            {isCurrentSkin && (
                              <Check size={13} className="text-[#8B1E1E] font-bold stroke-[3]" />
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-[#1E1D1B] leading-tight">
                            {skin.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Persona Filter Chips */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <UserCheck size={13} className="text-[#8B1E1E]" />
                      <span>Chọn Hình Mẫu Nhân Vật</span>
                    </span>
                    <span className="text-[10px] text-[#8C8270]">
                      6 Nguyên Mẫu Sống Động
                    </span>
                  </div>

                  <div className="flex items-center gap-1 p-1 bg-[#F4EFEA] rounded-lg text-[10px] font-medium">
                    <button
                      onClick={() => setAvatarGenderFilter('all')}
                      className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                        avatarGenderFilter === 'all'
                          ? 'bg-white text-[#1E1D1B] shadow-2xs font-bold'
                          : 'text-[#706658] hover:text-[#1E1D1B]'
                      }`}
                    >
                      Tất Cả (6)
                    </button>
                    <button
                      onClick={() => setAvatarGenderFilter('female')}
                      className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                        avatarGenderFilter === 'female'
                          ? 'bg-white text-[#8B1E1E] shadow-2xs font-bold'
                          : 'text-[#706658] hover:text-[#1E1D1B]'
                      }`}
                    >
                      Nữ (3)
                    </button>
                    <button
                      onClick={() => setAvatarGenderFilter('male')}
                      className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                        avatarGenderFilter === 'male'
                          ? 'bg-white text-[#23395B] shadow-2xs font-bold'
                          : 'text-[#706658] hover:text-[#1E1D1B]'
                      }`}
                    >
                      Nam (2)
                    </button>
                    <button
                      onClick={() => setAvatarGenderFilter('androgynous')}
                      className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                        avatarGenderFilter === 'androgynous'
                          ? 'bg-white text-[#C89B3C] shadow-2xs font-bold'
                          : 'text-[#706658] hover:text-[#1E1D1B]'
                      }`}
                    >
                      Runway (1)
                    </button>
                  </div>
                </div>

                {/* Avatar Archetypes List */}
                <div className="space-y-2.5">
                  {AVATAR_MODELS.filter(
                    (av) => avatarGenderFilter === 'all' || av.gender === avatarGenderFilter
                  ).map((av) => {
                    const isSelected =
                      (selection.avatarId === av.id) ||
                      (!selection.avatarId && av.id === 'avatar-female-classic');

                    return (
                      <div
                        key={av.id}
                        onClick={() => {
                          setSelection((prev) => ({
                            ...prev,
                            avatarId: av.id,
                            gender: av.gender,
                            skinTone: prev.skinTone || (av.skinTone as SkinToneType)
                          }));
                        }}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs ring-1 ring-[#8B1E1E]/40'
                            : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3] hover:shadow-2xs'
                        }`}
                      >
                        {/* Header Row with Badge & Name */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-editorial text-sm font-bold text-[#1E1D1B]">
                                {av.name}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] border border-[#8B1E1E]/20">
                                {av.badge}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#7A6E5D] font-medium block mt-0.5">
                              {av.vietnameseTitle}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: av.skinHex }}
                              title={`Màu da đặc trưng: ${av.skinHex}`}
                            />
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                                ✓
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Vibe Pills */}
                        <div className="mt-2 text-[10px] font-medium text-[#8B1E1E] bg-[#F9F5EE] px-2.5 py-1 rounded-md border border-[#EBE1D2] inline-block">
                          ✨ {av.vibe}
                        </div>

                        {/* Visual & Hairstyle description */}
                        <p className="text-[11px] text-[#554D40] mt-1.5 leading-relaxed">
                          {av.description}
                        </p>

                        {/* Hair & Accessory Detail Note */}
                        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#6E6454]">
                          <span className="font-semibold text-[#1E1D1B]">Tạo hình:</span>
                          <span className="italic">{av.hairDescription}</span>
                        </div>

                        {/* Poetic Quote */}
                        {av.quote && (
                          <div className="mt-2 pt-2 border-t border-[#EAE2D5] text-[10px] text-[#8C7B68] italic font-editorial">
                            "{av.quote}"
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            COLUMN 2 (CENTER): BƯỚC 2: NGẮM & THỬ DÁNG (Mannequin Preview)
           ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col h-[740px] space-y-2">
          {/* Step 2 Header */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center text-[11px] font-bold font-mono">
                2
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B]">
                Ngắm & Thử Dáng
              </h2>
            </div>
            <span className="text-[10px] text-[#7A7061]">Xoay & đổi góc nhìn</span>
          </div>

          {/* Real-time Cultural Safeguard Alert Banner */}
          <CulturalWarningAlert checkResult={culturalCheck} />

          {/* Mannequin Preview Area */}
          <div className="flex-1 w-full min-h-[490px]">
            <MannequinPreview
              selection={selection}
              interactive={true}
              fabricTexture={selection.fabricTexture || 'silk'}
              onFabricTextureChange={(tex) =>
                setSelection((prev) => ({ ...prev, fabricTexture: tex }))
              }
              textureIntensity={selection.textureIntensity || 'medium'}
              onTextureIntensityChange={(intensity) =>
                setSelection((prev) => ({ ...prev, textureIntensity: intensity }))
              }
              onGenderChange={(gender) =>
                setSelection((prev) => {
                  const matchingAvatar = AVATAR_MODELS.find((a) => a.gender === gender);
                  return {
                    ...prev,
                    gender,
                    avatarId: matchingAvatar ? matchingAvatar.id : prev.avatarId
                  };
                })
              }
              onTuckStyleChange={(tuckStyle) =>
                setSelection((prev) => ({ ...prev, tuckStyle }))
              }
            />
          </div>

          {/* Quick Action below Mannequin */}
          <div className="space-y-2">
            <button
              onClick={onOpenResult}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#8B1E1E] via-[#A82626] to-[#8B1E1E] hover:opacity-95 text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Sparkles size={16} className="text-[#F5D061]" />
              <span>XUẤT THẺ OUTFIT & GỢI Ý ĐIỂM ĐẾN</span>
              <ArrowRight size={14} />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSurpriseMe}
                className="py-2 px-3 bg-white hover:bg-[#FAF5EE] border border-[#8B1E1E]/30 text-[#8B1E1E] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                title="AI tự động phối ngẫu hứng một bộ outfit cực chất"
              >
                <Wand2 size={13} />
                <span>AI Phối Lại</span>
              </button>
              <button
                onClick={handleClearAll}
                className="py-2 px-3 bg-white hover:bg-[#F4EFEA] border border-[#D5CABE] text-[#6E6454] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                title="Gỡ bỏ toàn bộ phụ kiện để bắt đầu lại"
              >
                <Undo2 size={13} />
                <span>Bắt Đầu Lại</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            COLUMN 3 (RIGHT): BƯỚC 3: MÀU SẮC & ĐIỂM ĐẾN (Customization, Vibe & Where to Wear)
           ========================================================================= */}
        <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col h-[740px]">
          {/* Step 3 Header */}
          <div className="flex items-center justify-between pb-1 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center text-[11px] font-bold font-mono">
                3
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B]">
                Màu Sắc & Điểm Đến
              </h2>
            </div>
            <span className="text-[10px] text-[#7A7061]">Vibe check & Mua sắm</span>
          </div>

          {/* Streamlined 3 Top Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#F4EFEA] rounded-xl mb-3 text-xs">
            <button
              onClick={() => setActiveRightTab('style')}
              className={`py-2 px-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeRightTab === 'style'
                  ? 'bg-white text-[#8B1E1E] shadow-xs font-bold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              <Palette size={13} />
              <span>Màu & Vibe</span>
            </button>
            <button
              onClick={() => setActiveRightTab('destinations')}
              className={`py-2 px-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeRightTab === 'destinations'
                  ? 'bg-white text-[#8B1E1E] shadow-xs font-bold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              <Compass size={13} />
              <span>Điểm Đến</span>
            </button>
            <button
              onClick={() => setActiveRightTab('products')}
              className={`py-2 px-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeRightTab === 'products'
                  ? 'bg-[#8B1E1E] text-white shadow-xs font-bold'
                  : 'text-[#8B1E1E] hover:bg-white/60'
              }`}
            >
              <ShoppingBag size={13} />
              <span>Tìm Mua</span>
            </button>
          </div>

          {/* Right Pane Tab Content */}
          <div className="overflow-y-auto custom-scrollbar flex-1 pr-1">
            {/* 1. STYLE: Color, Palette & Fabric Texture */}
            {activeRightTab === 'style' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Color Swatches */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E5DDD0]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Palette size={13} className="text-[#8B1E1E]" />
                      Bảng Màu Cung Đình & Tự Nhiên
                    </span>
                    <span className="text-[10px] text-[#7A6E5D] font-medium">1 chạm để đổi</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {COLORS.map((c) => {
                      const isSelected = selection.colorId === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setSelection({ ...selection, colorId: c.id })}
                          className={`group relative p-1.5 rounded-xl border text-center transition-all flex flex-col items-center cursor-pointer ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-[#FAF5EE] shadow-xs ring-2 ring-[#8B1E1E]/30'
                              : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3]'
                          }`}
                          title={`${c.name} (${c.culturalMeaning})`}
                        >
                          <div
                            className="w-7 h-7 rounded-full border border-black/10 shadow-2xs mb-1 flex items-center justify-center"
                            style={{ backgroundColor: c.hex }}
                          >
                            {isSelected && (
                              <Check
                                size={12}
                                strokeWidth={3}
                                style={{ color: c.textColor }}
                              />
                            )}
                          </div>
                          <span className="text-[9px] font-semibold text-[#1E1D1B] truncate w-full">
                            {c.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Style Picker */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E5DDD0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5 mb-2.5">
                    <Layers size={13} className="text-[#8B1E1E]" />
                    Định Hướng Phong Cách (Style Vibe)
                  </span>
                  <div className="space-y-1.5">
                    {STYLES.map((s) => {
                      const isSelected = selection.styleId === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setSelection({ ...selection, styleId: s.id })}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                              : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1E1D1B]">{s.name}</span>
                            <span className="text-[10px] font-mono text-[#8B1E1E] font-semibold">
                              {s.traditionalRatio}% Di sản
                            </span>
                          </div>
                          <span className="text-[11px] text-[#786F62] block mt-0.5">
                            {s.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tactile Fabric & Texture Overlays */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E5DDD0]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#8B1E1E]" />
                      Chất Liệu Vải Lụa / Gấm
                    </span>
                    <span className="text-[10px] font-mono text-[#8B1E1E] font-semibold">
                      TACTILE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {FABRIC_TEXTURE_OPTIONS.map((tex) => {
                      const isSelected = (selection.fabricTexture || 'silk') === tex.id;
                      return (
                        <div
                          key={tex.id}
                          onClick={() => setSelection((prev) => ({ ...prev, fabricTexture: tex.id }))}
                          className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs ring-1 ring-[#8B1E1E]/20'
                              : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1E1D1B]">{tex.label}</span>
                            <span className="text-[10px] text-[#8B1E1E]">{tex.icon}</span>
                          </div>
                          <span className="text-[10px] text-[#7A6E5D] block truncate mt-0.5">
                            {tex.sublabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. DESTINATIONS: Where to Wear + Harmony & Style Balance Score */}
            {activeRightTab === 'destinations' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Score Ratio Overview Card */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E5DDD0] shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Layers size={13} className="text-[#8B1E1E]" />
                      Tỷ Lệ Phong Cách Hiện Tại
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E]">
                      {scoreResult.modernScore >= 60 ? 'Modern Street' : 'Heritage Chic'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 bg-[#FAF8F5] rounded-lg">
                      <div className="text-[10px] text-[#7A6E5D]">Di sản</div>
                      <div className="font-editorial text-base font-bold text-[#8B1E1E]">
                        {animatedTraditional}%
                      </div>
                    </div>
                    <div className="p-2 bg-[#FAF8F5] rounded-lg">
                      <div className="text-[10px] text-[#7A6E5D]">Đương đại</div>
                      <div className="font-editorial text-base font-bold text-[#23395B]">
                        {animatedModern}%
                      </div>
                    </div>
                    <div className="p-2 bg-[#FAF8F5] rounded-lg">
                      <div className="text-[10px] text-[#7A6E5D]">Cá tính</div>
                      <div className="font-editorial text-base font-bold text-[#C89B3C]">
                        {animatedIndividuality}/100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Where to Wear Top Recommendations */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E] flex items-center gap-1.5">
                      <Compass size={13} />
                      <span>Gợi Ý Điểm Đến Ăn Ý Nhất</span>
                    </span>
                    <button
                      onClick={() => setIsWhereToWearModalOpen(true)}
                      className="text-[11px] font-bold text-[#8B1E1E] hover:underline cursor-pointer"
                    >
                      Bản đồ chi tiết →
                    </button>
                  </div>

                  {getWhereToWearRecommendations(selection).slice(0, 3).map((loc) => (
                    <div
                      key={loc.id}
                      className="p-3 bg-white rounded-xl border border-[#E5DDD0] shadow-2xs space-y-2 text-left"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#8B1E1E]/8 text-[#8B1E1E] rounded border border-[#8B1E1E]/15">
                              {loc.city}
                            </span>
                            <span className="font-editorial text-xs font-bold text-[#1E1D1B]">
                              {loc.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#7A6E5D] block mt-0.5">
                            {loc.categoryName} • Vibe: <strong>{loc.vibeTag}</strong>
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
                          {loc.matchScore}%
                        </span>
                      </div>

                      <div className="p-2 bg-[#FAF8F5] rounded-lg border border-[#EAE2D5] text-[11px] text-[#52493D] space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="flex items-center gap-1 text-[#8B1E1E] font-semibold">
                            <Clock size={11} />
                            <span>Giờ vàng: {loc.bestTime}</span>
                          </span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.city)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#1A73E8] hover:underline font-bold"
                          >
                            Maps ↗
                          </a>
                        </div>
                        <div className="line-clamp-2">
                          <strong>Góc chụp:</strong> {loc.photoAngleTip}
                        </div>
                      </div>

                      <button
                        onClick={() => handleApplyOutfitForLocation(loc)}
                        className="w-full py-1.5 bg-[#FAF8F5] hover:bg-[#8B1E1E] hover:text-white text-[#8B1E1E] text-[11px] font-bold rounded-lg border border-[#8B1E1E]/20 transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Sparkles size={11} />
                        <span>Tối Ưu Outfit Cho Điểm Này</span>
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsWhereToWearModalOpen(true)}
                  className="w-full py-2.5 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Compass size={13} />
                  <span>Mở Toàn Bộ Bản Đồ Vibe Check</span>
                </button>
              </div>
            )}

            {/* 3. PRODUCTS: Real Products Google Search Grounding */}
            {activeRightTab === 'products' && (
              <RealProductsFinder
                selection={selection}
                outfitCode={outfitCode}
              />
            )}
          </div>
        </div>
      </div>

      {/* Where to Wear Modal */}
      <WhereToWearModal
        isOpen={isWhereToWearModalOpen}
        onClose={() => setIsWhereToWearModalOpen(false)}
        selection={selection}
        onApplyOutfitForLocation={handleApplyOutfitForLocation}
      />

      {/* Sustainable Digital Wardrobe Modal */}
      <SustainableWardrobeModal
        isOpen={isSustainableModalOpen}
        onClose={() => setIsSustainableModalOpen(false)}
        currentSelection={selection}
        onApplySustainableItem={handleApplySustainableItem}
      />

      {/* Upload Photo Modal */}
      <UploadPhotoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        selection={selection}
        onApplyPhoto={(photoUrl) =>
          setSelection((prev) => ({ ...prev, customPhotoUrl: photoUrl }))
        }
      />

      {/* Weather & Event Recommender Modal */}
      <WeatherEventRecommender
        isOpen={isWeatherModalOpen}
        onClose={() => setIsWeatherModalOpen(false)}
        onApplyOutfit={(newSelection) => setSelection(newSelection)}
      />

      {/* Outfit Comparison Modal */}
      <OutfitComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        currentSelection={selection}
        savedOutfits={savedOutfits}
        onApplySelection={(newSelection) => setSelection(newSelection)}
      />

      {/* Lookbook Builder Modal */}
      <LookbookModal
        isOpen={isLookbookModalOpen}
        onClose={() => setIsLookbookModalOpen(false)}
        savedOutfits={savedOutfits}
      />
    </div>
  );
};
