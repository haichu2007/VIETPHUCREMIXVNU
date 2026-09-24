import React, { useState } from 'react';
import { OutfitSelection, FabricTextureType, TextureIntensityType, GenderType, TuckStyleType } from '../types';
import {
  GARMENTS,
  BOTTOM_PIECES,
  HEADWEAR_PIECES,
  FOOTWEAR_PIECES,
  BAG_PIECES,
  ACCESSORY_PIECES,
  COLORS,
  AVATAR_MODELS,
  SKIN_TONE_OPTIONS
} from '../data/mockData';
import { ZoomIn, ZoomOut, Sparkles, Info, Scissors } from 'lucide-react';

export interface FabricTextureMeta {
  id: FabricTextureType;
  label: string;
  sublabel: string;
  origin: string;
  icon: string;
  description: string;
}

export const FABRIC_TEXTURE_OPTIONS: FabricTextureMeta[] = [
  {
    id: 'silk',
    label: 'Lụa (Silk)',
    sublabel: 'Mulberry Silk',
    origin: 'Lụa Tơ Tằm Hà Đông',
    icon: '✦',
    description: 'Bề mặt phủ ánh lụa tơ tằm óng ả với vệt phản quang mềm mại và vi sợi dệt chéo tạo xúc giác mượt mà.'
  },
  {
    id: 'linen',
    label: 'Đũi (Linen)',
    sublabel: 'Raw Linen',
    origin: 'Đũi Tự Nhiên Nam Cao',
    icon: '▦',
    description: 'Vân sợi gai đan chéo thô mộc, tạo độ nhám sần xúc giác tự nhiên và thoáng mát đặc trưng xứ nhiệt đới.'
  },
  {
    id: 'brocade',
    label: 'Gấm (Brocade)',
    sublabel: 'Damask Jacquard',
    origin: 'Gấm Hoa Vạn Phúc',
    icon: '✤',
    description: 'Họa tiết mây sen chìm hoàng cung với ánh kim sa vương giả, tôn vinh nét quý phái triều đình.'
  },
  {
    id: 'grain',
    label: 'Hạt Phim',
    sublabel: 'Editorial Film',
    origin: 'Editorial Magazine Grain',
    icon: '❖',
    description: 'Hạt nhiễu analog tinh tế giúp xóa bỏ cảm giác vector số phẳng, mang chuẩn mực lookbook thời trang.'
  },
  {
    id: 'none',
    label: 'Vector Thuần',
    sublabel: 'Clean Vector',
    origin: 'Flat Vector Minimal',
    icon: '○',
    description: 'Đường nét đồ họa vector phẳng nguyên bản không kèm lớp phủ sợi vải xúc giác.'
  }
];

interface MannequinPreviewProps {
  selection: OutfitSelection;
  interactive?: boolean;
  compact?: boolean;
  fabricTexture?: FabricTextureType;
  onFabricTextureChange?: (tex: FabricTextureType) => void;
  textureIntensity?: TextureIntensityType;
  onTextureIntensityChange?: (intensity: TextureIntensityType) => void;
  onGenderChange?: (gender: GenderType) => void;
  onTuckStyleChange?: (tuck: TuckStyleType) => void;
}

export const MannequinPreview: React.FC<MannequinPreviewProps> = ({
  selection,
  interactive = true,
  compact = false,
  fabricTexture: controlledTexture,
  onFabricTextureChange,
  textureIntensity: controlledIntensity,
  onTextureIntensityChange,
  onGenderChange,
  onTuckStyleChange
}) => {
  const [zoomLevel, setZoomLevel] = useState<'full' | 'torso'>('full');
  const [localTexture, setLocalTexture] = useState<FabricTextureType>(
    selection.fabricTexture || 'silk'
  );
  const [localIntensity, setLocalIntensity] = useState<TextureIntensityType>(
    selection.textureIntensity || 'medium'
  );
  const [showTextureInspector, setShowTextureInspector] = useState(false);

  const activeTexture = controlledTexture ?? selection.fabricTexture ?? localTexture;
  const activeIntensity = controlledIntensity ?? selection.textureIntensity ?? localIntensity;
  const showTexture = activeTexture !== 'none';

  const garment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const bottom = BOTTOM_PIECES.find((b) => b.id === selection.bottomId) || BOTTOM_PIECES[0];
  const headwear = HEADWEAR_PIECES.find((h) => h.id === selection.headwearId) || HEADWEAR_PIECES[0];
  const footwear = FOOTWEAR_PIECES.find((f) => f.id === selection.footwearId) || FOOTWEAR_PIECES[0];
  const bag = BAG_PIECES.find((b) => b.id === selection.bagId) || BAG_PIECES[0];
  const accessory = ACCESSORY_PIECES.find((a) => a.id === selection.accessoryId) || ACCESSORY_PIECES[0];
  const color = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];

  // Active Character Archetype and Skin Tone
  const activeAvatar = AVATAR_MODELS.find((a) => a.id === selection.avatarId) || AVATAR_MODELS[0];
  const activeGender: GenderType = selection.gender || activeAvatar.gender || 'female';
  const activeTuck: TuckStyleType = selection.tuckStyle || 'untucked';
  const isMale = activeGender === 'male';

  const activeSkin =
    SKIN_TONE_OPTIONS.find((s) => s.id === selection.skinToneId) ||
    SKIN_TONE_OPTIONS.find((s) => s.id === (selection.skinTone || activeAvatar.skinTone)) ||
    SKIN_TONE_OPTIONS[0];

  const skinBase = activeSkin.hex;
  const skinShadow = activeSkin.shadowHex;
  const blushColor = activeAvatar.blushHex || '#E8A598';
  const lipColor = activeAvatar.lipHex || '#9C3A3A';

  const primaryColor = color.hex;
  const secondaryColor = color.secondaryHex;

  const handleTextureSelect = (tex: FabricTextureType) => {
    setLocalTexture(tex);
    if (onFabricTextureChange) {
      onFabricTextureChange(tex);
    }
  };

  const handleIntensityCycle = () => {
    const nextIntensity: Record<TextureIntensityType, TextureIntensityType> = {
      subtle: 'medium',
      medium: 'rich',
      rich: 'subtle'
    };
    const next = nextIntensity[activeIntensity];
    setLocalIntensity(next);
    if (onTextureIntensityChange) {
      onTextureIntensityChange(next);
    }
  };

  const activeTextureMeta =
    FABRIC_TEXTURE_OPTIONS.find((t) => t.id === activeTexture) || FABRIC_TEXTURE_OPTIONS[0];

  return (
    <div
      className={`garment-preview-tactile ${
        activeTexture !== 'none' ? `texture-${activeTexture}` : ''
      } intensity-${activeIntensity} relative flex flex-col items-center justify-between w-full h-full rounded-2xl overflow-hidden border border-[#E5DDD0] shadow-sm select-none ${
        compact ? 'p-3.5' : 'p-5'
      } bg-[radial-gradient(ellipse_at_50%_35%,_#FFFFFF_0%,_#F7F3EC_55%,_#ECE3D4_100%)] transition-all`}
    >
      {/* Studio Blueprint & Architectural Hairlines (Editorial Grid Marks) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {/* Corner crosses */}
        <span className="absolute top-3 left-3 text-[10px] text-[#A69B89] font-mono leading-none">+</span>
        <span className="absolute top-3 right-3 text-[10px] text-[#A69B89] font-mono leading-none">+</span>
        <span className="absolute bottom-3 left-3 text-[10px] text-[#A69B89] font-mono leading-none">+</span>
        <span className="absolute bottom-3 right-3 text-[10px] text-[#A69B89] font-mono leading-none">+</span>

        {/* Vertical center axis line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] border-l border-dashed border-[#DDD2C0]/50" />
        {/* Horizontal chest line */}
        <div className="absolute top-1/3 left-4 right-4 h-[1px] border-t border-dashed border-[#DDD2C0]/40" />
        {/* Horizontal floor guide line */}
        <div className="absolute bottom-16 left-6 right-6 h-[1px] border-t border-dashed border-[#DDD2C0]/60" />
      </div>

      {/* Top Editorial Header Bar (Separated & Clean) */}
      <div className="w-full flex items-center justify-between z-20 pb-2 border-b border-[#E5DDD0]/60 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-editorial text-sm font-bold tracking-widest text-[#1E1D1B] uppercase shrink-0">
            Việt Phục Remix
          </span>
          <span className="text-[#A39988] shrink-0">/</span>
          <span className="text-[#8B1E1E] font-semibold uppercase text-xs tracking-wider truncate">
            {garment.name}
          </span>
        </div>

        {interactive && (
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {/* Texture Inspector Info toggle */}
            <button
              onClick={() => setShowTextureInspector(!showTextureInspector)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                showTextureInspector
                  ? 'bg-[#8B1E1E] text-white border-[#8B1E1E]'
                  : 'bg-white/90 text-[#6B6152] border-[#E5DDD0] hover:text-[#1E1D1B] hover:bg-white'
              }`}
              title="Thông tin xúc giác chất liệu"
            >
              <Info size={13} />
            </button>

            {/* Minimalist Zoom Toggle */}
            <button
              onClick={() => setZoomLevel(zoomLevel === 'full' ? 'torso' : 'full')}
              className="p-1.5 bg-white/90 hover:bg-white border border-[#E5DDD0] text-[#554E43] hover:text-[#8B1E1E] rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
              title={zoomLevel === 'full' ? 'Phóng to cận cảnh' : 'Xem toàn cảnh'}
            >
              {zoomLevel === 'full' ? <ZoomIn size={13} /> : <ZoomOut size={13} />}
              <span className="text-[10px] font-semibold hidden sm:inline">
                {zoomLevel === 'full' ? 'Cận cảnh' : 'Toàn cảnh'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Interactive Styling Bar: Chỉnh Giới Tính & Kiểu Sơ Vin */}
      {interactive && !compact && (
        <div className="w-full z-20 mt-2 flex flex-wrap items-center justify-between gap-1.5 text-xs animate-in fade-in duration-200">
          {/* Gender Selector */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs p-1 rounded-xl border border-[#E5DDD0] shadow-2xs">
            <span className="text-[10px] font-bold text-[#7A7061] px-1 uppercase tracking-wider">
              Dáng:
            </span>
            {[
              { id: 'female', label: 'Nữ', icon: '👩' },
              { id: 'male', label: 'Nam', icon: '👨' },
              { id: 'androgynous', label: 'Unisex', icon: '✦' }
            ].map((g) => {
              const isSelected = activeGender === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => onGenderChange?.(g.id as GenderType)}
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#8B1E1E] text-white shadow-2xs'
                      : 'text-[#695F50] hover:text-[#1E1D1B] hover:bg-[#F4EFEA]'
                  }`}
                  title={`Đổi phom dáng người mẫu: ${g.label}`}
                >
                  <span>{g.icon}</span>
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sơ vin (Tuck Style) Selector */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs p-1 rounded-xl border border-[#E5DDD0] shadow-2xs">
            <span className="text-[10px] font-bold text-[#7A7061] px-1 uppercase tracking-wider flex items-center gap-1">
              <Scissors size={10} className="text-[#8B1E1E]" />
              Sơ vin:
            </span>
            {[
              { id: 'untucked', label: 'Thả tà', icon: '👔' },
              { id: 'full-tuck', label: 'Đóng thùng', icon: '✨' },
              { id: 'half-tuck', label: 'Vạt trước', icon: '⚡' }
            ].map((t) => {
              const isSelected = activeTuck === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onTuckStyleChange?.(t.id as TuckStyleType)}
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#8B1E1E] text-white shadow-2xs'
                      : 'text-[#695F50] hover:text-[#1E1D1B] hover:bg-[#F4EFEA]'
                  }`}
                  title={`Kiểu sơ vin: ${t.label}`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tactile Texture Inspector Toast / Overlay info */}
      {showTextureInspector && interactive && (
        <div className="w-full z-20 mt-1.5 p-2.5 bg-white/95 backdrop-blur-md border border-[#E5DDD0] rounded-xl shadow-xs text-left animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B1E1E]">
              <span>{activeTextureMeta.icon}</span>
              <span className="font-editorial">{activeTextureMeta.origin}</span>
            </div>
            <span className="text-[10px] font-mono text-[#7A7061] uppercase tracking-wider">
              Xúc Giác Thủ Công
            </span>
          </div>
          <p className="text-[11px] text-[#554E41] leading-relaxed">
            {activeTextureMeta.description}
          </p>
        </div>
      )}

      {/* Main Fashion Illustration & Cel-shaded Model */}
      <div
        className={`relative flex items-center justify-center w-full my-auto transition-transform duration-500 ease-out py-1 ${
          zoomLevel === 'torso' ? 'scale-135 translate-y-16' : 'scale-100'
        }`}
      >
        <svg
          viewBox="0 0 400 640"
          className="w-full max-h-[440px] sm:max-h-[460px] select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 1. Studio Lighting Backdrop Glow */}
            <radialGradient id="spotlightGlow" cx="50%" cy="38%" r="48%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#FFFDF9" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#EADCCB" stopOpacity="0" />
            </radialGradient>

            {/* 2. Realistic Multi-layered Floor Shadows */}
            <radialGradient id="ambientFloorShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E1D1B" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#1E1D1B" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#1E1D1B" stopOpacity="0" />
            </radialGradient>

            {/* 3. Silk Sheen with natural soft tonal depth (No harsh metallic white) */}
            <linearGradient id="silkSheen" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="50%" stopColor={primaryColor} />
              <stop offset="85%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>

            {/* Subtle Fabric Soft Light Overlay */}
            <linearGradient id="drapeSpecular" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Deep Fabric Fold Shadow */}
            <linearGradient id="foldDeepShadow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#000000" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* 4. Gấm Brocade Pattern (Traditional Lotus & Royal Cloud Damask) */}
            <pattern id="gampattern" width="36" height="36" patternUnits="userSpaceOnUse">
              <path
                d="M18 4 C14 10 10 14 4 18 C10 22 14 26 18 32 C22 26 26 22 32 18 C26 14 22 10 18 4 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.8"
                opacity="0.3"
              />
              <circle cx="18" cy="18" r="3" fill="#FFFFFF" opacity="0.35" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" opacity="0.25" />
              <circle cx="36" cy="0" r="2" fill="#FFFFFF" opacity="0.25" />
              <circle cx="0" cy="36" r="2" fill="#FFFFFF" opacity="0.25" />
              <circle cx="36" cy="36" r="2" fill="#FFFFFF" opacity="0.25" />
            </pattern>

            {/* 5. Fine Linen / Đũi Texture Pattern */}
            <pattern id="linendui" width="8" height="8" patternUnits="userSpaceOnUse">
              <line x1="0" y1="2" x2="8" y2="2" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.18" />
              <line x1="0" y1="6" x2="8" y2="6" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.18" />
              <line x1="2" y1="0" x2="2" y2="8" stroke="#000000" strokeWidth="0.4" opacity="0.12" />
              <line x1="6" y1="0" x2="6" y2="8" stroke="#000000" strokeWidth="0.4" opacity="0.12" />
            </pattern>

            {/* 6. Denim Twill Pattern */}
            <pattern id="denimTwill" width="6" height="6" patternUnits="userSpaceOnUse">
              <line x1="0" y1="6" x2="6" y2="0" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.2" />
              <line x1="0" y1="3" x2="3" y2="0" stroke="#000000" strokeWidth="0.6" opacity="0.15" />
              <line x1="3" y1="6" x2="6" y2="3" stroke="#000000" strokeWidth="0.6" opacity="0.15" />
            </pattern>

            {/* 7. Gold metallic shimmer */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B8" />
              <stop offset="35%" stopColor="#E6C875" />
              <stop offset="70%" stopColor="#C89B3C" />
              <stop offset="100%" stopColor="#7E5912" />
            </linearGradient>

            {/* 8. Silver shimmer */}
            <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E4E7EB" />
              <stop offset="75%" stopColor="#B3B9C4" />
              <stop offset="100%" stopColor="#6C7584" />
            </linearGradient>

            {/* 9. High-Fidelity Drop Shadow Filters for Layer Depth */}
            <filter id="garmentDepth" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#181512" floodOpacity="0.22" />
            </filter>
            <filter id="upperLayerDepth" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="2.8" floodColor="#181512" floodOpacity="0.28" />
            </filter>
            <filter id="accessoryCastShadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#14110E" floodOpacity="0.32" />
            </filter>
            <filter id="bagCastShadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="1" dy="4" stdDeviation="3.5" floodColor="#14110E" floodOpacity="0.3" />
            </filter>

            {/* 10. Custom Avatar Photo Cameo Clip */}
            <clipPath id="customFaceCameo">
              <circle cx="200" cy="68" r="30" />
            </clipPath>

            {/* 11. Tuck-in (Sơ vin) Silhouette Clip Paths */}
            {/* Full Tuck: neatly cuts tunic hem at waistline y=292 with natural blousing curve */}
            <clipPath id="tuckFullClip">
              <path d="M0 0 L400 0 L400 292 Q300 297 200 293 Q100 297 0 292 Z" />
            </clipPath>

            {/* Half Tuck / French Tuck: clips front center flap into waistband, leaves sides & back flowing */}
            <clipPath id="tuckHalfClip">
              <path d="M0 0 L400 0 L400 640 L220 640 L220 292 Q200 296 180 292 L180 640 L0 640 Z" />
            </clipPath>

            {/* 12. Wear Transition Micro-Interactions Keyframe */}
            <style>{`
              @keyframes itemWearTransition {
                0% {
                  opacity: 0.35;
                  transform: translateY(4px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .mannequin-layer-transition {
                animation: itemWearTransition 220ms cubic-bezier(0.16, 1, 0.3, 1);
              }
            `}</style>
          </defs>

          {/* BACKGROUND LIGHTING SPOTLIGHT (Center Stage Atmosphere) */}
          <ellipse cx="200" cy="240" rx="145" ry="215" fill="url(#spotlightGlow)" />

          {/* STUDIO PODIUM & CONTACT FLOOR SHADOW */}
          <ellipse cx="200" cy="608" rx="100" ry="15" fill="url(#ambientFloorShadow)" />
          {/* Focused contact shoe shadows */}
          <ellipse cx="178" cy="602" rx="22" ry="5.5" fill="#141312" opacity="0.45" />
          <ellipse cx="222" cy="602" rx="22" ry="5.5" fill="#141312" opacity="0.45" />

          {/* =========================================================
              LAYER 1: BASE MODEL CROQUIS (Haute Couture Fashion Anatomy)
              - Shortened neck (15% reduction) with natural taper
              - Relaxed natural feminine shoulder slope (8-10 degrees)
              - Articulated elbows with subtle 6-degree bend
              - 100% unified skinBase and skinShadow
             ========================================================= */}
          <g id="model-croquis">
            {/* Neck & Trapezius: Natural length and organic taper */}
            {isMale ? (
              <path d="M188 102 L184 140 L216 140 L212 102 Z" fill={skinBase} />
            ) : (
              <path d="M190 102 L188 140 L212 140 L210 102 Z" fill={skinBase} />
            )}
            {/* Neck Shadow under chin */}
            <path d="M190 102 Q200 112 210 102 L211 112 Q200 120 189 112 Z" fill={skinShadow} opacity="0.8" />
            {/* Collarbone / Xương quai xanh */}
            {isMale ? (
              <path d="M176 136 Q195 144 200 144 Q205 144 224 136" stroke={skinShadow} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M182 136 Q195 142 200 142 Q205 142 218 136" stroke={skinShadow} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            )}

            {/* Stylized Sculpted Face Silhouette according to selected Archetype */}
            <g id="avatar-face-head">
              {/* Head Silhouette Base */}
              <path
                d="M176 68 C176 44 186 34 200 34 C214 34 224 44 224 68 C224 92 214 104 200 104 C186 104 176 92 176 68 Z"
                fill={skinBase}
              />
              {/* Facial Shadow & Jawline Contour */}
              <path d="M178 70 C178 88 188 98 200 102 C196 95 194 85 194 70 Z" fill={skinShadow} opacity="0.55" />
              {/* Nose Contour */}
              <path d="M198 72 L201 72 L199 82 Z" fill={skinShadow} opacity="0.85" />
              
              {/* Soft Cheeks Blush */}
              <ellipse cx="186" cy="80" rx="4.5" ry="2.5" fill={blushColor} opacity="0.35" />
              <ellipse cx="214" cy="80" rx="4.5" ry="2.5" fill={blushColor} opacity="0.35" />

              {/* Lips */}
              <path d="M195 90 Q200 93 205 90" stroke={lipColor} strokeWidth="1.6" fill="none" strokeLinecap="round" />

              {/* Eyebrows */}
              <path d="M186 62 Q192 60 197 63" stroke="#2B2421" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M203 63 Q208 60 214 62" stroke="#2B2421" strokeWidth="1.2" fill="none" strokeLinecap="round" />

              {/* Delicate Eyes & Eyelids */}
              <ellipse cx="191" cy="69" rx="2.5" ry="1.2" fill="#201C1A" />
              <ellipse cx="209" cy="69" rx="2.5" ry="1.2" fill="#201C1A" />

              {/* -------------------------------------------------------------
                  ARCHETYPE-SPECIFIC HAIRSTYLES & SIGNATURE ORNAMENTS
                 ------------------------------------------------------------- */}
              {activeAvatar.faceStyle === 'male-sharp' ? (
                /* Thư Sinh Nho Nhã: Sleek 7/3 side-part hair */
                <g id="hair-male-scholar">
                  <path
                    d="M174 58 C174 30 186 25 202 25 C218 25 226 34 226 56 C226 62 224 64 222 66 C220 52 216 40 202 40 C190 40 180 48 176 66 Z"
                    fill="#1C1816"
                  />
                  <path d="M178 46 C186 35 196 34 204 40" stroke="#38302B" strokeWidth="1.2" fill="none" />
                  {/* Sideburns */}
                  <path d="M176 56 L175 66 L177 64 Z" fill="#1C1816" />
                  <path d="M224 56 L225 66 L223 64 Z" fill="#1C1816" />
                </g>
              ) : activeAvatar.faceStyle === 'male-dandy' ? (
                /* Công Tử Phố Cổ: Textured wavy hair with modern flair & stud */
                <g id="hair-male-dandy">
                  <path
                    d="M173 58 C172 32 182 24 200 24 C218 24 227 32 227 58 C227 64 223 66 220 56 C216 42 208 38 200 38 C192 38 184 42 180 56 C177 66 173 64 173 58 Z"
                    fill="#1F1B18"
                  />
                  {/* Wavy locks on top */}
                  <path d="M182 28 Q190 22 200 27 Q210 22 218 28" fill="none" stroke="#3A322C" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M188 34 Q196 30 204 35" fill="none" stroke="#3A322C" strokeWidth="1.8" strokeLinecap="round" />
                  {/* Gold Stud Earring */}
                  <circle cx="174" cy="74" r="1.5" fill="#D4AF37" />
                </g>
              ) : activeAvatar.faceStyle === 'female-modern' ? (
                /* Hà Thành Gen Z: Chic layered bob with airy bangs & ear cuff */
                <g id="hair-female-genz">
                  <path
                    d="M171 65 C171 30 184 26 200 26 C216 26 229 30 229 65 C229 86 224 94 220 95 C222 75 220 52 212 50 C204 48 196 48 188 50 C180 52 178 75 180 95 C176 94 171 86 171 65 Z"
                    fill="#1A1715"
                  />
                  {/* Airy see-through bangs */}
                  <path d="M186 50 Q200 54 214 50" fill="#1A1715" />
                  <path d="M192 50 L193 57 M200 50 L200 58 M208 50 L207 57" stroke="#2B2420" strokeWidth="1.2" strokeLinecap="round" />
                  {/* Double Gold Ear Cuff */}
                  <line x1="225" y1="67" x2="227" y2="67" stroke="#E6C875" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="225" y1="71" x2="227" y2="71" stroke="#E6C875" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              ) : activeAvatar.faceStyle === 'female-poet' ? (
                /* Nàng Thơ Xứ Huế: Cascading long side hair with delicate lotus barrette */
                <g id="hair-female-poet">
                  {/* Main Hair Silhouette */}
                  <path
                    d="M174 62 C174 34 185 28 200 28 C215 28 226 34 226 62 C223 48 214 40 200 40 C186 40 177 48 174 62 Z"
                    fill="#181513"
                  />
                  {/* Cascading locks flowing down left shoulder */}
                  <path
                    d="M174 62 C170 78 168 110 166 148 C165 156 168 158 171 154 C174 135 178 95 180 72 Z"
                    fill="#181513"
                  />
                  {/* Lotus Hair Barrette */}
                  <circle cx="218" cy="46" r="3.5" fill="#E87A90" />
                  <circle cx="218" cy="46" r="1.5" fill="#FFF2B8" />
                </g>
              ) : activeAvatar.faceStyle === 'editorial' ? (
                /* Haute Couture Runway: Slicked-back high fashion runway finish */
                <g id="hair-editorial">
                  <path
                    d="M176 56 C176 28 188 26 200 26 C212 28 224 28 224 56 C224 62 220 62 218 46 C212 36 188 36 182 46 C180 62 176 62 176 56 Z"
                    fill="#221E1B"
                  />
                  {/* Slicked sheen lines */}
                  <path d="M186 34 Q200 30 214 34" stroke="#423933" strokeWidth="1.2" fill="none" />
                  <path d="M188 40 Q200 36 212 40" stroke="#423933" strokeWidth="1" fill="none" />
                </g>
              ) : (
                /* Tố Nữ Đài Các (Default): Royal Chignon Bun with Jade & Gold Hairpin */
                <g id="hair-female-classic">
                  <circle cx="200" cy="26" r="14" fill="#1C1816" />
                  <path
                    d="M175 62 C175 34 185 30 200 30 C215 30 225 34 225 62 C222 46 214 40 200 40 C186 40 178 46 175 62 Z"
                    fill="#1C1816"
                  />
                  {/* Golden Jade Hairpin */}
                  <line x1="188" y1="22" x2="218" y2="32" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="218" cy="32" r="2.8" fill="#2E7D32" stroke="#D4AF37" strokeWidth="0.6" />
                </g>
              )}
            </g>

            {/* Sloping Shoulders & Articulated Natural Arms */}
            {isMale ? (
              <>
                {/* Male Athletic Broader Shoulders & Arms */}
                <path d="M134 150 L120 238 L128 340 L135 340 L129 238 L144 152 Z" fill={skinBase} />
                <path d="M121 238 L128 340 L131 340 L125 238 Z" fill={skinShadow} opacity="0.6" />
                <path d="M128 340 C126 346 124 354 127 357 C129 359 133 358 134 352 L135 340 Z" fill={skinBase} />

                <path d="M266 150 L280 238 L272 340 L265 340 L271 238 L256 152 Z" fill={skinBase} />
                <path d="M279 238 L272 340 L269 340 L275 238 Z" fill={skinShadow} opacity="0.6" />
                <path d="M272 340 C274 346 276 354 273 357 C271 359 267 358 266 352 L265 340 Z" fill={skinBase} />
              </>
            ) : (
              <>
                {/* Female / Neutral Graceful Arms */}
                <path d="M140 154 L126 238 L132 340 L138 340 L134 238 L148 156 Z" fill={skinBase} />
                <path d="M127 238 L132 340 L134 340 L130 238 Z" fill={skinShadow} opacity="0.6" />
                <path d="M132 340 C130 346 128 354 131 357 C133 359 136 358 137 352 L138 340 Z" fill={skinBase} />

                <path d="M260 154 L274 238 L268 340 L262 340 L266 238 L252 156 Z" fill={skinBase} />
                <path d="M271 238 L268 340 L265 340 L268 238 Z" fill={skinShadow} opacity="0.6" />
                <path d="M268 340 C270 346 272 354 269 357 C267 359 264 358 263 352 L262 340 Z" fill={skinBase} />
              </>
            )}

            {/* Legs with accurate skin tone and soft muscle contouring */}
            <path d="M174 420 L171 582 L189 582 L194 420 Z" fill={skinBase} />
            <path d="M172 480 L171 582 L176 582 L178 480 Z" fill={skinShadow} opacity="0.5" />
            <path d="M206 420 L211 582 L229 582 L226 420 Z" fill={skinBase} />
            <path d="M224 480 L228 582 L229 582 L227 480 Z" fill={skinShadow} opacity="0.5" />
          </g>

          {/* =========================================================
              LAYER 2: BOTTOM PIECES (Volumetric Drapery & Texture)
             ========================================================= */}
          <g id="bottom-layer" key={`bottom-${bottom.id}`} className="mannequin-layer-transition">
            {bottom.id === 'pants-silk-wide' && (
              /* Quần Lụa Ống Rộng Di Sản (Rich Drapery Folds) */
              <g>
                <path
                  d="M165 285 L148 582 Q168 585 188 582 L200 375 L212 582 Q232 585 252 582 L235 285 Z"
                  fill="#1C1A19"
                  stroke="#100E0E"
                  strokeWidth="1.2"
                />
                {/* Silk Sheen Overlay */}
                <path
                  d="M168 300 Q160 450 152 580 L162 580 Q172 450 178 300 Z"
                  fill="#FFFFFF"
                  opacity="0.08"
                />
                <path
                  d="M232 300 Q240 450 248 580 L238 580 Q228 450 222 300 Z"
                  fill="#FFFFFF"
                  opacity="0.08"
                />
                {/* Deep Drape Shadow in Crotch & Folds */}
                <path d="M196 350 L200 375 L204 350 Z" fill="#000000" opacity="0.6" />
                <path d="M166 380 Q162 480 156 578" stroke="#000000" strokeWidth="1.8" opacity="0.5" fill="none" />
                <path d="M234 380 Q238 480 244 578" stroke="#000000" strokeWidth="1.8" opacity="0.5" fill="none" />
              </g>
            )}

            {bottom.id === 'pants-denim-wide' && (
              /* Quần Denim Ống Suông Gen Z (Twill Texture + Seams + Folds) */
              <g>
                <path
                  d="M162 288 L144 584 L189 584 L200 360 L211 584 L256 584 L238 288 Z"
                  fill="#2E4867"
                  stroke="#1F344C"
                  strokeWidth="1.5"
                />
                {/* Denim Twill Texture Overlay */}
                {showTexture && (
                  <path
                    d="M162 288 L144 584 L189 584 L200 360 L211 584 L256 584 L238 288 Z"
                    fill="url(#denimTwill)"
                  />
                )}
                {/* Stone wash fading on thighs */}
                <ellipse cx="168" cy="410" rx="14" ry="55" fill="#4B6A91" opacity="0.45" />
                <ellipse cx="232" cy="410" rx="14" ry="55" fill="#4B6A91" opacity="0.45" />
                {/* Golden Orange Contrast Stitching */}
                <path d="M200 295 L200 360" stroke="#E5A138" strokeWidth="1.2" strokeDasharray="3,2" />
                <path d="M148 580 L185 580" stroke="#E5A138" strokeWidth="1.2" strokeDasharray="3,2" />
                <path d="M215 580 L252 580" stroke="#E5A138" strokeWidth="1.2" strokeDasharray="3,2" />
                {/* Knee Crease Folds */}
                <path d="M154 440 Q168 448 180 442" stroke="#162638" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M220 442 Q232 448 246 440" stroke="#162638" strokeWidth="1.5" fill="none" opacity="0.6" />
              </g>
            )}

            {bottom.id === 'skirt-pleated-midi' && (
              /* Chân Váy Lụa Dập Ly (Dynamic Accordion Light & Shadow) */
              <g>
                <path
                  d="M166 288 L132 525 Q200 540 268 525 L234 288 Z"
                  fill="#EDE5D8"
                  stroke="#BAAA94"
                  strokeWidth="1.2"
                />
                {/* Alternating Pleat Shading */}
                {[
                  { x1: 140, x2: 146 },
                  { x1: 154, x2: 161 },
                  { x1: 170, x2: 178 },
                  { x1: 188, x2: 196 },
                  { x1: 204, x2: 212 },
                  { x1: 222, x2: 230 },
                  { x1: 239, x2: 247 },
                  { x1: 254, x2: 260 }
                ].map((pleat, idx) => (
                  <path
                    key={idx}
                    d={`M${pleat.x1 + 10} 290 L${pleat.x1} 525 L${pleat.x2} 525 L${pleat.x2 + 8} 290 Z`}
                    fill="#D9CDBC"
                    opacity="0.45"
                  />
                ))}
              </g>
            )}

            {bottom.id === 'pants-cargo-minimal' && (
              /* Quần Cargo Utility Tối Giản */
              <g>
                <path
                  d="M160 288 L141 585 L186 585 L200 370 L214 585 L259 585 L240 288 Z"
                  fill="#2C322E"
                  stroke="#1B201D"
                  strokeWidth="1.4"
                />
                {/* 3D Pockets with shadow */}
                <rect x="142" y="415" width="24" height="34" rx="3" fill="#383E3A" stroke="#1B201D" strokeWidth="1" filter="url(#upperLayerDepth)" />
                <rect x="234" y="415" width="24" height="34" rx="3" fill="#383E3A" stroke="#1B201D" strokeWidth="1" filter="url(#upperLayerDepth)" />
                <path d="M142 423 L166 423" stroke="#1B201D" strokeWidth="1.5" />
                <path d="M234 423 L258 423" stroke="#1B201D" strokeWidth="1.5" />
              </g>
            )}

            {bottom.id === 'pants-tailored-high' && (
              /* Quần Tây May Đo Cạp Cao (Sharp Crease + Editorial Texture) */
              <g>
                <path
                  d="M165 278 L155 582 L188 582 L200 365 L212 582 L245 582 L235 278 Z"
                  fill="#23211F"
                  stroke="#121110"
                  strokeWidth="1.2"
                />
                {/* Sharp Ironed Crease Lines with Highlight */}
                <line x1="171" y1="300" x2="171" y2="580" stroke="#0A0909" strokeWidth="1.5" />
                <line x1="172.5" y1="300" x2="172.5" y2="580" stroke="#524D47" strokeWidth="0.8" />
                <line x1="229" y1="300" x2="229" y2="580" stroke="#0A0909" strokeWidth="1.5" />
                <line x1="227.5" y1="300" x2="227.5" y2="580" stroke="#524D47" strokeWidth="0.8" />
              </g>
            )}

            {bottom.id === 'skirt-asymmetric-wrap' && (
              /* Chân Váy Quấn Bất Đối Xứng */
              <g>
                <path
                  d="M166 282 L136 475 L262 555 L234 282 Z"
                  fill="#1E1D1B"
                  stroke="#383532"
                  strokeWidth="1.4"
                />
                {/* Wrap Layer Overlap Shadow */}
                <path d="M166 282 L215 525 L262 555" stroke="#0A0A09" strokeWidth="2.5" fill="none" opacity="0.6" />
                <path d="M166 282 L215 525 L234 282 Z" fill="#2E2C2A" opacity="0.4" />
              </g>
            )}

            {bottom.id === 'shorts-denim-mini' && (
              /* Quần Shorts Jeans Siêu Ngắn */
              <g>
                <path
                  d="M166 288 L150 375 L195 375 L200 335 L205 375 L250 375 L234 288 Z"
                  fill="#2A4365"
                  stroke="#1A2D45"
                  strokeWidth="1.5"
                />
                <path d="M200 295 L200 335" stroke="#E5A138" strokeWidth="1.2" strokeDasharray="3,2" />
                {/* Frayed hemline */}
                <path d="M150 375 L195 375" stroke="#90CDF4" strokeWidth="1.8" strokeDasharray="3,2" />
                <path d="M205 375 L250 375" stroke="#90CDF4" strokeWidth="1.8" strokeDasharray="3,2" />
              </g>
            )}
          </g>

          {/* =========================================================
              LAYER 3: MAIN GARMENT (Brocade, Drapery & Depth Shading)
             ========================================================= */}
          <g
            id="main-garment"
            key={`garment-${garment.id}-${selection.colorId}-${activeTuck}`}
            className="mannequin-layer-transition"
            filter="url(#garmentDepth)"
            clipPath={
              activeTuck === 'full-tuck'
                ? 'url(#tuckFullClip)'
                : activeTuck === 'half-tuck'
                ? 'url(#tuckHalfClip)'
                : undefined
            }
          >
            {garment.id === 'ao-ngu-than' && (
              /* ÁO NGŨ THÂN (Mandarin collar, 5 panels, right side buttons, knee-length) */
              <g>
                {/* Base Robe Silhouette */}
                <path
                  d="M185 128 C160 136 138 146 134 175 L122 280 L144 286 L151 204 L156 485 Q200 500 244 485 L249 204 L256 286 L278 280 L266 175 C262 146 240 136 215 128 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.5"
                />

                {/* Texture: Gấm Hoa Văn Chìm / Brocade Pattern Overlay */}
                {showTexture && (
                  <path
                    d="M185 128 C160 136 138 146 134 175 L122 280 L144 286 L151 204 L156 485 Q200 500 244 485 L249 204 L256 286 L278 280 L266 175 C262 146 240 136 215 128 Z"
                    fill="url(#gampattern)"
                    opacity="0.55"
                  />
                )}

                {/* Drapery: Shoulder & Sleeve Volumetric Shading */}
                <path
                  d="M134 175 L122 280 L132 283 L142 195 Z"
                  fill="#000000"
                  opacity="0.25"
                />
                <path
                  d="M266 175 L278 280 L268 283 L258 195 Z"
                  fill="#000000"
                  opacity="0.25"
                />

                {/* Drapery: Center & Hem Ripple Folds */}
                <path
                  d="M156 485 Q180 475 200 482 Q220 475 244 485 Q220 495 200 490 Q180 495 156 485 Z"
                  fill="#000000"
                  opacity="0.28"
                />
                <path d="M172 260 Q170 380 166 480" stroke="#000000" strokeWidth="1.6" opacity="0.25" fill="none" />
                <path d="M228 260 Q230 380 234 480" stroke="#000000" strokeWidth="1.6" opacity="0.25" fill="none" />

                {/* Overlapping 5th Panel (Thân con mạn sườn phải với bóng đổ sâu) */}
                <path
                  d="M198 142 Q198 175 218 205 Q228 238 230 330 L230 484"
                  stroke={secondaryColor}
                  strokeWidth="2.4"
                  fill="none"
                />
                <path
                  d="M200 142 Q200 175 220 205 Q230 238 232 330 L232 484"
                  stroke="#000000"
                  strokeWidth="3.5"
                  opacity="0.3"
                  fill="none"
                />

                {/* High Mandarin Collar (Cổ đứng nghiêm cẩn) with silk edge */}
                <path
                  d="M185 124 C185 115 192 108 200 108 C208 108 215 115 215 124 L216 142 L184 142 Z"
                  fill={secondaryColor}
                  stroke="#CAAFA0"
                  strokeWidth="1"
                />
                <path d="M185 124 Q200 128 215 124" stroke="#FFF" strokeWidth="0.8" opacity="0.5" fill="none" />

                {/* 5 Traditional Buttons (Ngũ Thường cúc đồng mạ vàng có bóng đổ) */}
                {[
                  { cx: 204, cy: 148 },
                  { cx: 211, cy: 172 },
                  { cx: 221, cy: 204 },
                  { cx: 227, cy: 242 },
                  { cx: 229, cy: 288 }
                ].map((btn, idx) => (
                  <g key={idx} filter="url(#upperLayerDepth)">
                    <circle cx={btn.cx} cy={btn.cy} r="3.6" fill="url(#goldGradient)" stroke="#4A3408" strokeWidth="0.8" />
                    <circle cx={btn.cx - 1} cy={btn.cy - 1} r="1.2" fill="#FFFFFF" opacity="0.8" />
                  </g>
                ))}
              </g>
            )}

            {garment.id === 'ao-dai' && (
              /* ÁO DÀI (Form slim fit, tà áo thướt tha, nếp gấp mềm mại) */
              <g>
                {/* Bodice & Flowing Double Tunic */}
                <path
                  d="M187 130 C168 136 144 148 138 180 L130 290 L145 295 L151 210 Q159 260 161 310 L148 565 Q200 580 252 565 L239 310 Q241 260 249 210 L255 295 L270 290 L262 180 C256 148 232 136 213 130 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.4"
                />

                {/* Brocade overlay on Ao Dai */}
                {showTexture && (
                  <path
                    d="M187 130 C168 136 144 148 138 180 L130 290 L145 295 L151 210 Q159 260 161 310 L148 565 Q200 580 252 565 L239 310 Q241 260 249 210 L255 295 L270 290 L262 180 C256 148 232 136 213 130 Z"
                    fill="url(#gampattern)"
                    opacity="0.45"
                  />
                )}

                {/* Waist Darts (Đường chiết eo tạo khối 3D mềm mại) */}
                <path d="M184 210 Q180 260 186 300" stroke="#000000" strokeWidth="1.2" opacity="0.25" fill="none" />
                <path d="M216 210 Q220 260 214 300" stroke="#000000" strokeWidth="1.2" opacity="0.25" fill="none" />

                {/* Lateral Slit Drop Shadows (Đường xẻ tà ngang hông) */}
                <path d="M161 310 Q156 440 148 565" stroke="#000000" strokeWidth="2" opacity="0.3" fill="none" />
                <path d="M239 310 Q244 440 252 565" stroke="#000000" strokeWidth="2" opacity="0.3" fill="none" />

                {/* High Slender Neckline */}
                <path
                  d="M187 124 C187 116 193 112 200 112 C207 112 213 116 213 124 L214 140 L186 140 Z"
                  fill={secondaryColor}
                  stroke="#DFD1BE"
                  strokeWidth="0.8"
                />

                {/* Diagonal Snaps Placket with Gold Studs */}
                <path d="M192 140 Q204 165 220 185" stroke={secondaryColor} strokeWidth="1.6" fill="none" />
                <circle cx="202" cy="155" r="2.6" fill="url(#goldGradient)" filter="url(#upperLayerDepth)" />
                <circle cx="213" cy="172" r="2.6" fill="url(#goldGradient)" filter="url(#upperLayerDepth)" />
              </g>
            )}

            {garment.id === 'ao-tu-than' && (
              /* ÁO TỨ THÂN (Yếm đào lót trong, 4 vạt buông lơi, ruột bao lụa dệt) */
              <g>
                {/* Yếm Đào Cổ Xây Lót Trong */}
                <path d="M188 138 L212 138 L222 235 L178 235 Z" fill="#D93D57" />
                <path d="M188 138 Q200 146 212 138" stroke="#FFF" strokeWidth="1.2" fill="none" />

                {/* 2 Outer Flaps (Vạt buông lơi có bóng rủ) */}
                <path
                  d="M184 133 L144 158 L128 270 L143 275 L154 208 L159 482 Q175 492 190 482 L185 270 Q180 218 184 133 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.3"
                />
                <path
                  d="M216 133 L256 158 L272 270 L257 275 L246 208 L241 482 Q225 492 210 482 L215 270 Q220 218 216 133 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.3"
                />

                {/* Gấm Texture on flaps */}
                {showTexture && (
                  <>
                    <path
                      d="M184 133 L144 158 L128 270 L143 275 L154 208 L159 482 Q175 492 190 482 L185 270 Q180 218 184 133 Z"
                      fill="url(#gampattern)"
                      opacity="0.45"
                    />
                    <path
                      d="M216 133 L256 158 L272 270 L257 275 L246 208 L241 482 Q225 492 210 482 L215 270 Q220 218 216 133 Z"
                      fill="url(#gampattern)"
                      opacity="0.45"
                    />
                  </>
                )}

                {/* Dải Lụa Ruột Bao & Thắt Lưng Buộc Nút (Knot Ribbon with 3D Depth) */}
                <g filter="url(#upperLayerDepth)">
                  <path d="M174 258 L226 258 L222 282 L178 282 Z" fill="#E8A91C" stroke="#A67307" strokeWidth="0.8" />
                  <path d="M194 282 L188 358 L197 358 L201 282 Z" fill="#E8A91C" />
                  <path d="M204 282 L210 368 L202 368 L198 282 Z" fill="#C4344B" />
                </g>
              </g>
            )}

            {garment.id === 'ao-giao-linh' && (
              /* ÁO GIAO LĨNH (Cổ bắt chéo chữ V tao nhã, vạt rộng quyền quý) */
              <g>
                <path
                  d="M185 130 L138 158 L118 280 L138 288 L149 208 L154 515 Q200 530 246 515 L251 208 L262 288 L282 280 L262 158 L215 130 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.5"
                />
                {showTexture && (
                  <path
                    d="M185 130 L138 158 L118 280 L138 288 L149 208 L154 515 Q200 530 246 515 L251 208 L262 288 L282 280 L262 158 L215 130 Z"
                    fill="url(#gampattern)"
                    opacity="0.45"
                  />
                )}
                {/* Cross-collar Lapels with Drop Shadow */}
                <path d="M185 130 L226 260 L200 260 L174 165 Z" fill={secondaryColor} opacity="0.95" />
                <path d="M215 130 L174 260 L195 260 L226 165 Z" fill={primaryColor} stroke="#E5DDD0" strokeWidth="1.2" />
                {/* Fabric Sash Belt */}
                <rect x="166" y="258" width="68" height="20" fill="#181716" rx="2" filter="url(#upperLayerDepth)" />
                <path d="M192 278 L188 385 L196 385 L200 278 Z" fill="#181716" />
              </g>
            )}

            {garment.id === 'ao-ba-ba' && (
              /* ÁO BÀ BA (Cổ tròn, xẻ tà hông, hàng cúc giữa, 2 túi trước) */
              <g>
                <path
                  d="M188 134 C175 144 148 154 144 180 L134 285 L149 290 L155 214 L161 385 Q200 400 239 385 L245 214 L251 290 L266 285 L256 180 C252 154 225 144 212 134 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.3"
                />
                {showTexture && (
                  <path
                    d="M188 134 C175 144 148 154 144 180 L134 285 L149 290 L155 214 L161 385 Q200 400 239 385 L245 214 L251 290 L266 285 L256 180 C252 154 225 144 212 134 Z"
                    fill="url(#linendui)"
                    opacity="0.35"
                  />
                )}
                {/* Round soft collar */}
                <path d="M188 134 Q200 148 212 134" stroke={secondaryColor} strokeWidth="2" fill="none" />
                {/* Button Placket & Gold Studs */}
                <line x1="200" y1="148" x2="200" y2="390" stroke={secondaryColor} strokeWidth="1.8" />
                {[165, 205, 245, 285, 325].map((y, idx) => (
                  <circle key={idx} cx="200" cy={y} r="3" fill="url(#goldGradient)" filter="url(#upperLayerDepth)" />
                ))}
                {/* 2 Patch Pockets */}
                <rect x="169" y="325" width="23" height="26" rx="3" fill="none" stroke={secondaryColor} strokeWidth="1.4" />
                <rect x="208" y="325" width="23" height="26" rx="3" fill="none" stroke={secondaryColor} strokeWidth="1.4" />
              </g>
            )}

            {garment.id === 'ao-doi-kham' && (
              /* ÁO ĐỐI KHÂM (Vạt song song, nẹp áo gấm thêu cung đình) */
              <g>
                <path d="M185 138 L215 138 L220 320 L180 320 Z" fill="#F4EFEA" stroke="#DED3C4" strokeWidth="1" />
                {/* Parallel lapels */}
                <path
                  d="M185 130 L138 156 L122 280 L140 286 L151 208 L155 505 Q178 515 188 505 L188 168 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.3"
                />
                <path
                  d="M215 130 L262 156 L278 280 L260 286 L249 208 L245 505 Q222 515 212 505 L212 168 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.3"
                />
                {/* Elaborate Embroidered Lapel Borders */}
                <rect x="179" y="142" width="11" height="363" fill="url(#goldGradient)" opacity="0.95" filter="url(#upperLayerDepth)" />
                <rect x="210" y="142" width="11" height="363" fill="url(#goldGradient)" opacity="0.95" filter="url(#upperLayerDepth)" />
              </g>
            )}
          </g>

          {/* =========================================================
              LAYER 3.5: TUCK-IN BLOUSE DRAPES & EXPOSED WAISTBAND DETAILS
              - Renders blousing fabric gathers, shadow, and waistband / button
             ========================================================= */}
          {activeTuck !== 'untucked' && (
            <g id="tuck-waist-overlay" key={`tuck-overlay-${activeTuck}`} className="mannequin-layer-transition">
              {activeTuck === 'full-tuck' ? (
                /* Full Tuck (Sơ vin toàn phần / Đóng thùng) */
                <g>
                  {/* Bloused fabric gather shadow under roll */}
                  <path d="M158 293 Q200 300 242 293" stroke="#000000" strokeWidth="3.8" opacity="0.32" fill="none" />
                  {/* Bloused fold roll curve */}
                  <path d="M156 290 Q180 295 200 292 Q220 295 244 290" stroke={secondaryColor} strokeWidth="2.4" fill="none" />
                  <path d="M162 291 Q200 295 238 291" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" fill="none" />

                  {/* Exposed Bottom Waistband Details (Button, Belt Loops, Rivets) */}
                  <g filter="url(#upperLayerDepth)">
                    {/* Waistband contour line */}
                    <path d="M164 286 L236 286 L234 298 L166 298 Z" fill="#1C1A18" opacity="0.75" />
                    {/* Metallic waist button */}
                    <circle cx="200" cy="292" r="2.8" fill="url(#silverGradient)" stroke="#22201E" strokeWidth="0.8" />
                    {/* Center fly stitch */}
                    <line x1="200" y1="295" x2="200" y2="330" stroke="#1A1816" strokeWidth="1.2" strokeDasharray="3,2" />
                    {/* Belt loops */}
                    <rect x="178" y="286" width="3.5" height="12" rx="1" fill="#3D3A37" stroke="#1A1816" strokeWidth="0.6" />
                    <rect x="218" y="286" width="3.5" height="12" rx="1" fill="#3D3A37" stroke="#1A1816" strokeWidth="0.6" />
                  </g>
                </g>
              ) : (
                /* Half Tuck / French Tuck (Sơ vin vạt trước) */
                <g>
                  {/* Center front gather crease & shadow */}
                  <path d="M182 292 Q200 298 218 292" stroke="#000000" strokeWidth="3.5" opacity="0.32" fill="none" />
                  {/* Center front bloused fabric tuck roll */}
                  <path d="M180 290 Q200 295 220 290" stroke={secondaryColor} strokeWidth="2.4" fill="none" />
                  <path d="M184 291 Q200 294 216 291" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" fill="none" />

                  {/* Exposed Center Belt Buckle / Button Detail */}
                  <g filter="url(#upperLayerDepth)">
                    <circle cx="200" cy="292" r="2.6" fill="url(#silverGradient)" stroke="#22201E" strokeWidth="0.8" />
                    <line x1="200" y1="295" x2="200" y2="320" stroke="#1A1816" strokeWidth="1" strokeDasharray="2,2" />
                  </g>
                </g>
              )}
            </g>
          )}

          {/* =========================================================
              LAYER 4: ACCESSORIES (Silver Collar, Headphones, Glasses, Belt...)
             ========================================================= */}
          <g id="accessory-layer" key={`acc-${accessory.id}`} className="mannequin-layer-transition">
            {accessory.id === 'acc-silver-kieng' && (
              /* Kiềng Bạc Chạm Trống Đồng quanh cổ (3D Silver Shimmer with realistic neck curvature & cast shadow) */
              <g filter="url(#accessoryCastShadow)">
                {/* Back collar shadow cast onto chest */}
                <ellipse cx="200" cy="147" rx="23" ry="10.5" fill="none" stroke="#12100E" strokeWidth="2" opacity="0.35" />
                {/* Main Silver Ring */}
                <ellipse cx="200" cy="145" rx="23" ry="10.5" fill="none" stroke="url(#silverGradient)" strokeWidth="4.5" />
                {/* Engraved traditional Dong Son motifs */}
                <ellipse cx="200" cy="145" rx="23" ry="10.5" fill="none" stroke="#5E6573" strokeWidth="0.8" strokeDasharray="2,2" />
                {/* Specular Highlight */}
                <ellipse cx="200" cy="144" rx="23" ry="10.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.85" />
                {/* Central Medallion pendant */}
                <circle cx="200" cy="155" r="3" fill="url(#silverGradient)" stroke="#FFFFFF" strokeWidth="0.5" />
              </g>
            )}

            {accessory.id === 'acc-headphones' && (
              /* Tai Nghe Over-Ear Gen Z Signature quanh cổ */
              <g filter="url(#accessoryCastShadow)">
                <path
                  d="M174 140 C174 168 226 168 226 140"
                  stroke="#2B2D33"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                <rect x="166" y="132" width="14" height="22" rx="4.5" fill="#C2C6CE" stroke="#222" strokeWidth="1.2" />
                <rect x="220" y="132" width="14" height="22" rx="4.5" fill="#C2C6CE" stroke="#222" strokeWidth="1.2" />
                <circle cx="173" cy="143" r="3.2" fill="#8E939E" />
                <circle cx="227" cy="143" r="3.2" fill="#8E939E" />
              </g>
            )}

            {accessory.id === 'acc-sunglasses-oval' && (
              /* Kính Mát Oval Y2K - Futuristic Designer Eyewear with Specular Highlight */
              <g filter="url(#upperLayerDepth)">
                {/* Metallic Gold/Silver Sleek Frame */}
                <ellipse cx="191" cy="71" rx="8.5" ry="4.8" fill="#18191C" stroke="#D4AF37" strokeWidth="1.2" />
                <ellipse cx="209" cy="71" rx="8.5" ry="4.8" fill="#18191C" stroke="#D4AF37" strokeWidth="1.2" />
                {/* Nose Bridge and Outer Temple Pins */}
                <path d="M199.5 70.5 Q200 69.5 200.5 70.5" stroke="#D4AF37" strokeWidth="1.3" fill="none" />
                <circle cx="182" cy="71" r="1.1" fill="#E6C875" />
                <circle cx="218" cy="71" r="1.1" fill="#E6C875" />
                {/* 45-Degree Crisp Glass Specular Reflex Highlights */}
                <path d="M187 68 L194 74" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
                <path d="M185 71 L189 74" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
                <path d="M205 68 L212 74" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
                <path d="M203 71 L207 74" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
              </g>
            )}

            {accessory.id === 'acc-wooden-fan' && (
              /* Quạt Gỗ Trầm Hương trên tay phải */
              <g transform="translate(264, 335) rotate(16)" filter="url(#accessoryCastShadow)">
                <path d="M0 0 L-22 -38 A44 44 0 0 1 22 -38 Z" fill="#85532F" stroke="#523015" strokeWidth="1" />
                <line x1="0" y1="0" x2="-11" y2="-37" stroke="#D8B589" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="0" y2="-39" stroke="#D8B589" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="11" y2="-37" stroke="#D8B589" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="3.2" fill="#D93D57" />
                {/* Silk tassel */}
                <path d="M0 3 L-1 15 L2 15 Z" fill="#D93D57" />
              </g>
            )}

            {accessory.id === 'acc-jade-earrings' && (
              /* Khuyên Tai Ngọc Bích Bọc Vàng */
              <g filter="url(#upperLayerDepth)">
                <circle cx="176" cy="84" r="2.8" fill="#1E382B" stroke="#E6C875" strokeWidth="1" />
                <circle cx="224" cy="84" r="2.8" fill="#1E382B" stroke="#E6C875" strokeWidth="1" />
              </g>
            )}

            {accessory.id === 'acc-silk-belt' && (
              /* Thắt Lưng Lụa Thổ Cẩm Dệt Tay Quanh Eo */
              <g filter="url(#accessoryCastShadow)">
                <rect x="160" y="280" width="80" height="12" rx="2" fill="#9C2738" stroke="#D4AF37" strokeWidth="1" />
                <line x1="160" y1="286" x2="240" y2="286" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,2" />
                {/* Hanging tassel knots on side */}
                <path d="M172 292 L170 330 L176 330 L174 292 Z" fill="#D4AF37" opacity="0.9" />
                <circle cx="173" cy="333" r="2" fill="#9C2738" />
              </g>
            )}
          </g>

          {/* =========================================================
              LAYER 5: HEADWEAR (Khăn đóng, Mấn, Khăn mỏ quạ, Beret...)
             ========================================================= */}
          <g id="headwear-layer" key={`head-${headwear.id}`} className="mannequin-layer-transition" filter="url(#upperLayerDepth)">
            {headwear.id === 'head-khan-dong' && (
              /* Khăn Đóng / Khăn Xếp (Xếp nếp chữ Nhân 人 đa tầng) */
              <g>
                <ellipse cx="200" cy="48" rx="28" ry="15" fill="#1A1817" stroke="#333" strokeWidth="1" />
                <path d="M173 48 Q200 63 227 48 Q200 56 173 48 Z" fill="#2E2B2A" />
                <path d="M175 44 Q200 54 225 44" stroke="#484340" strokeWidth="1.2" fill="none" />
                <path d="M177 40 Q200 48 223 40" stroke="#484340" strokeWidth="1.2" fill="none" />
              </g>
            )}

            {headwear.id === 'head-man-cach-tan' && (
              /* Mấn Lụa Cách Tân Đính Ngọc */
              <g>
                <path
                  d="M174 46 C174 22 186 16 200 16 C214 16 226 22 226 46 C226 33 214 24 200 24 C186 24 174 33 174 46 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.3"
                />
                <circle cx="192" cy="24" r="2.2" fill="#FFF" stroke="#C5B8A4" strokeWidth="0.6" />
                <circle cx="200" cy="22" r="2.8" fill="#FFF" stroke="#C5B8A4" strokeWidth="0.6" />
                <circle cx="208" cy="24" r="2.2" fill="#FFF" stroke="#C5B8A4" strokeWidth="0.6" />
              </g>
            )}

            {headwear.id === 'head-khan-mo-qua' && (
              /* Khăn Mỏ Quạ Lụa Đen */
              <path
                d="M175 68 C175 36 188 30 200 30 C212 30 225 36 225 68 L200 81 Z"
                fill="#181615"
                stroke="#333"
                strokeWidth="1.2"
              />
            )}

            {headwear.id === 'head-beret-modern' && (
              /* Mũ Beret Da Cổ Điển Hiện Đại */
              <g>
                <path
                  d="M168 50 C168 30 188 26 216 28 C230 30 236 42 232 50 Z"
                  fill="#2A2421"
                  stroke="#171311"
                  strokeWidth="1.2"
                />
                <circle cx="202" cy="26" r="2.2" fill="#171311" />
              </g>
            )}

            {headwear.id === 'head-bandana-silk' && (
              /* Khăn Bandana Tơ Tằm Họa Tiết */
              <path
                d="M175 55 Q200 68 225 55 L219 40 Q200 46 181 40 Z"
                fill="#D49B28"
                stroke="#8A5F12"
                strokeWidth="1.2"
              />
            )}

            {headwear.id === 'head-none' && (
              /* Tóc Tự Nhiên / Kẹp Càng Cua Nữ Tính */
              <path
                d="M176 54 C176 34 187 30 200 30 C213 30 224 34 224 54 C224 43 213 38 200 38 C187 38 176 43 176 54 Z"
                fill="#2E241E"
              />
            )}
          </g>

          {/* =========================================================
              LAYER 6: BAGS (Crossbody, Shoulder Bag, Giỏ mây, Tote...)
              Anchored realistically to shoulders/hands with soft cast shadows
             ========================================================= */}
          <g id="bag-layer" key={`bag-${bag.id}`} className="mannequin-layer-transition" filter="url(#bagCastShadow)">
            {bag.id === 'bag-crossbody-nylon' && (
              /* Túi Crossbody Nylon vắt chéo qua ngực */
              <g>
                <line x1="154" y1="152" x2="236" y2="294" stroke="#25272B" strokeWidth="4" strokeLinecap="round" />
                <rect x="180" y="236" width="46" height="34" rx="6" fill="#1C1E22" stroke="#3D4047" strokeWidth="1.3" />
                <line x1="186" y1="248" x2="220" y2="248" stroke="#8E939D" strokeWidth="1.2" />
                <circle cx="218" cy="260" r="2" fill="#E53E3E" />
              </g>
            )}

            {bag.id === 'bag-shoulder-leather' && (
              /* Túi Kẹp Nách Baguette Da Mềm vắt qua vai trái ôm sát mạn sườn */
              <g>
                {/* Shoulder strap looping from left shoulder */}
                <path d="M140 154 C130 174 126 194 125 210" stroke="#4A2E1C" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Bag body tucked under arm */}
                <g transform="translate(110, 206)">
                  <rect x="0" y="0" width="38" height="24" rx="5" fill="#362013" stroke="#211209" strokeWidth="1.2" />
                  <circle cx="19" cy="12" r="3" fill="url(#goldGradient)" />
                </g>
              </g>
            )}

            {bag.id === 'bag-woven-coi' && (
              /* Túi Mây Tre Đan Thủ Công móc trực tiếp vào lòng bàn tay phải */
              <g transform="translate(254, 340)">
                {/* Woven handle anchored in palm */}
                <path d="M12 0 C12 -16 24 -16 24 0" stroke="#855F3B" strokeWidth="2.5" fill="none" />
                {/* Woven Basket body */}
                <path d="M3 0 L33 0 L29 38 L7 38 Z" fill="#CF9F6A" stroke="#946535" strokeWidth="1" />
                <line x1="7" y1="12" x2="29" y2="12" stroke="#946535" strokeWidth="0.9" strokeDasharray="3,2" />
                <line x1="9" y1="25" x2="27" y2="25" stroke="#946535" strokeWidth="0.9" strokeDasharray="3,2" />
              </g>
            )}

            {bag.id === 'bag-tote-dongho' && (
              /* Túi Tote Vải Đay móc vào lòng bàn tay trái */
              <g transform="translate(114, 340)">
                {/* Long tote strap anchored in hand */}
                <path d="M16 0 C16 -22 28 -22 28 0" stroke="#857864" strokeWidth="2.5" fill="none" />
                {/* Tote Bag canvas */}
                <rect x="4" y="0" width="40" height="46" rx="3" fill="#E6DDCF" stroke="#BEB29F" strokeWidth="1.2" />
                <rect x="13" y="10" width="22" height="25" fill="#C4344B" opacity="0.85" rx="2" />
                <circle cx="24" cy="22" r="4.5" fill="#E8A91C" />
              </g>
            )}

            {bag.id === 'bag-clutch-lacquer' && (
              /* Clutch Cầm Tay Dáng Quạt Sơn Mài kẹp gọn trên bàn tay trái */
              <g transform="translate(120, 338) rotate(-6)">
                <path d="M0 0 L36 0 C36 16 26 24 0 18 Z" fill="#141312" stroke="#C89B3C" strokeWidth="1.4" />
                <line x1="6" y1="6" x2="28" y2="6" stroke="#C89B3C" strokeWidth="1.1" />
                <circle cx="28" cy="8" r="1.8" fill="#C89B3C" />
              </g>
            )}
          </g>

          {/* =========================================================
              LAYER 7: FOOTWEAR (Chunky Sneaker, Guốc mộc, Loafer...)
             ========================================================= */}
          <g id="footwear-layer" key={`footwear-${footwear.id}`} className="mannequin-layer-transition" filter="url(#upperLayerDepth)">
            {footwear.id === 'shoes-chunky-sneaker' && (
              /* Chunky Sneaker Trắng Gen Z (Multi-layer rubber sole) */
              <g>
                <path d="M167 580 L189 580 L193 602 L163 602 Z" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
                <rect x="161" y="598" width="34" height="7" rx="2.5" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.9" />
                <path d="M209 580 L231 580 L235 602 L205 602 Z" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
                <rect x="203" y="598" width="34" height="7" rx="2.5" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.9" />
              </g>
            )}

            {footwear.id === 'shoes-guoc-moc' && (
              /* Guốc Mộc Sơn Mài Quai Nhung */
              <g>
                <rect x="165" y="582" width="22" height="6.5" rx="2" fill="#C4344B" />
                <path d="M167 588 L185 588 L183 601 L169 601 Z" fill="#85532F" stroke="#523015" strokeWidth="0.9" />
                <rect x="211" y="582" width="22" height="6.5" rx="2" fill="#C4344B" />
                <path d="M213 588 L231 588 L229 601 L215 601 Z" fill="#85532F" stroke="#523015" strokeWidth="0.9" />
              </g>
            )}

            {footwear.id === 'shoes-leather-loafer' && (
              /* Penny Loafer Da Đen Bóng */
              <g>
                <path d="M167 580 L189 580 L191 598 L165 598 Z" fill="#171514" stroke="#000" strokeWidth="1.1" />
                <rect x="169" y="586" width="17" height="3.2" fill="#D4AF37" />
                <path d="M209 580 L231 580 L233 598 L207 598 Z" fill="#171514" stroke="#000" strokeWidth="1.1" />
                <rect x="211" y="586" width="17" height="3.2" fill="#D4AF37" />
              </g>
            )}

            {footwear.id === 'shoes-minimal-mule' && (
              /* Mule Sandal Gót Vuông */
              <g>
                <path d="M169 582 L187 582 L185 594 L171 594 Z" fill="#44352C" />
                <rect x="169" y="594" width="6.5" height="6.5" fill="#856853" />
                <path d="M211 582 L229 582 L227 594 L213 594 Z" fill="#44352C" />
                <rect x="223" y="594" width="6.5" height="6.5" fill="#856853" />
              </g>
            )}

            {footwear.id === 'shoes-chelsea-boots' && (
              /* Chelsea Boots Da Đen Cổ Thấp */
              <g>
                <path d="M165 564 L189 564 L193 602 L163 602 Z" fill="#171514" stroke="#000" strokeWidth="1.2" />
                <path d="M173 569 L183 569 L181 585 L175 585 Z" fill="#2B2826" />
                <path d="M209 564 L233 564 L237 602 L207 602 Z" fill="#171514" stroke="#000" strokeWidth="1.2" />
                <path d="M217 569 L227 569 L225 585 L219 585 Z" fill="#2B2826" />
              </g>
            )}

            {(footwear.id === 'shoes-embroidered-flats' || footwear.id === 'shoes-hai-theu') && (
              /* Giày Vải Thêu Chỉ Kim Tuyến / Hài Thêu Hoàng Cung */
              <g>
                <path d="M167 582 C177 580 189 580 191 598 L165 598 Z" fill="#8B1E1E" stroke="#C89B3C" strokeWidth="0.9" />
                <path d="M209 582 C219 580 231 580 233 598 L207 598 Z" fill="#8B1E1E" stroke="#C89B3C" strokeWidth="0.9" />
                {/* Cloud & lotus embroidery detail */}
                <path d="M174 589 Q179 586 184 589" stroke="#FFF2B8" strokeWidth="0.8" fill="none" />
                <path d="M216 589 Q221 586 226 589" stroke="#FFF2B8" strokeWidth="0.8" fill="none" />
              </g>
            )}

            {footwear.id === 'shoes-dep-le-flipflop' && (
              /* Dép Lê Xỏ Ngón Xuề Xòa */
              <g>
                {/* Thin foam sole */}
                <rect x="166" y="594" width="24" height="4" rx="2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="0.6" />
                <rect x="210" y="594" width="24" height="4" rx="2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="0.6" />
                {/* Plastic Y-straps */}
                <path d="M172 594 L178 587 L184 594" stroke="#EF4444" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M216 594 L222 587 L228 594" stroke="#EF4444" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Dedicated Tactile Fabric Control Bar (Bottom Bar - Clean & Non-overlapping) */}
      {interactive && (
        <div className="w-full z-20 my-1 px-2 py-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-[#E5DDD0] shadow-xs flex flex-wrap items-center justify-between gap-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7061] hidden sm:inline">
              Chất liệu:
            </span>
            <div className="flex items-center p-0.5 bg-[#F4EFEA] rounded-lg">
              {FABRIC_TEXTURE_OPTIONS.map((tex) => {
                const isSelected = activeTexture === tex.id;
                return (
                  <button
                    key={tex.id}
                    onClick={() => handleTextureSelect(tex.id)}
                    className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#8B1E1E] text-white shadow-2xs'
                        : 'text-[#695F50] hover:text-[#1E1D1B]'
                    }`}
                    title={`${tex.label} — ${tex.description}`}
                  >
                    <span>{tex.icon}</span>
                    <span>{tex.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeTexture !== 'none' && (
            <button
              onClick={handleIntensityCycle}
              className="px-2 py-1 text-[10px] font-semibold bg-[#F4EFEA] hover:bg-[#EAE2D5] text-[#554E43] rounded-md transition-colors cursor-pointer whitespace-nowrap"
              title="Đổi độ phủ xúc giác: Nhẹ · Vừa · Rõ"
            >
              Độ phủ:{' '}
              <span className="text-[#8B1E1E] font-bold uppercase">
                {activeIntensity === 'subtle' ? 'Nhẹ' : activeIntensity === 'medium' ? 'Vừa' : 'Rõ'}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Bottom Floating Piece Ticker */}
      <div className="w-full flex items-center justify-between z-20 pt-2 border-t border-[#E5DDD0]/70 text-[11px] text-[#6E6659]">
        <div className="flex items-center gap-1.5 truncate">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
            style={{ backgroundColor: primaryColor }}
          />
          <span className="font-semibold text-[#1E1D1B] truncate">{color.name}</span>
          <span className="text-[#B3A99B]">·</span>
          <span className="truncate">{garment.name}</span>
          <span className="text-[#B3A99B]">·</span>
          <span className="truncate">{bottom.name}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          {/* Active Tactile Overlay Tag */}
          <div
            className="hidden sm:flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/85 border border-[#E5DDD0] text-[#7A6D5D] shadow-2xs"
            title={`${activeTextureMeta.label}: ${activeTextureMeta.description}`}
          >
            <span className="text-[#8B1E1E]">{activeTextureMeta.icon}</span>
            <span>{activeTextureMeta.origin}</span>
          </div>

          <div className="flex items-center gap-1 text-[#8B1E1E] font-semibold">
            <Sparkles size={12} />
            <span>Haute Couture</span>
          </div>
        </div>
      </div>
    </div>
  );
};
