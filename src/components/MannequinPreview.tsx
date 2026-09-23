import React, { useState } from 'react';
import { OutfitSelection } from '../types';
import {
  GARMENTS,
  BOTTOM_PIECES,
  HEADWEAR_PIECES,
  FOOTWEAR_PIECES,
  BAG_PIECES,
  ACCESSORY_PIECES,
  COLORS
} from '../data/mockData';
import { ZoomIn, ZoomOut, Sparkles, Layers } from 'lucide-react';

interface MannequinPreviewProps {
  selection: OutfitSelection;
  interactive?: boolean;
  compact?: boolean;
}

export const MannequinPreview: React.FC<MannequinPreviewProps> = ({
  selection,
  interactive = true,
  compact = false
}) => {
  const [zoomLevel, setZoomLevel] = useState<'full' | 'torso'>('full');
  const [showTexture, setShowTexture] = useState(true);

  const garment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const bottom = BOTTOM_PIECES.find((b) => b.id === selection.bottomId) || BOTTOM_PIECES[0];
  const headwear = HEADWEAR_PIECES.find((h) => h.id === selection.headwearId) || HEADWEAR_PIECES[0];
  const footwear = FOOTWEAR_PIECES.find((f) => f.id === selection.footwearId) || FOOTWEAR_PIECES[0];
  const bag = BAG_PIECES.find((b) => b.id === selection.bagId) || BAG_PIECES[0];
  const accessory = ACCESSORY_PIECES.find((a) => a.id === selection.accessoryId) || ACCESSORY_PIECES[0];
  const color = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];

  const primaryColor = color.hex;
  const secondaryColor = color.secondaryHex;

  return (
    <div
      className={`relative flex flex-col items-center justify-between w-full h-full rounded-2xl overflow-hidden border border-[#E5DDD0] shadow-sm select-none ${
        compact ? 'p-3.5' : 'p-6'
      } bg-[radial-gradient(ellipse_at_50%_35%,_#FFFFFF_0%,_#F7F3EC_55%,_#ECE3D4_100%)]`}
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

      {/* Top Editorial Bar */}
      <div className="w-full flex items-center justify-between z-10 text-xs tracking-wider">
        <div className="flex items-center gap-2">
          <span className="font-editorial text-sm font-bold tracking-widest text-[#1E1D1B] uppercase">
            Việt Phục Remix
          </span>
          <span className="text-[#A39988]">/</span>
          <span className="text-[#8B1E1E] font-semibold uppercase text-[11px] tracking-wider">
            {garment.name}
          </span>
        </div>

        {interactive && (
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#E5DDD0] text-[#554E43] shadow-xs">
            <button
              onClick={() => setShowTexture(!showTexture)}
              className={`p-1 rounded-sm transition-colors cursor-pointer ${
                showTexture ? 'text-[#8B1E1E]' : 'text-[#8C8375] hover:text-[#1E1D1B]'
              }`}
              title={showTexture ? 'Tắt vân gấm/lụa' : 'Bật vân gấm/lụa'}
            >
              <Layers size={13} />
            </button>
            <span className="text-[#D3C7B5]">|</span>
            <button
              onClick={() => setZoomLevel(zoomLevel === 'full' ? 'torso' : 'full')}
              className="p-1 hover:text-[#1E1D1B] transition-colors cursor-pointer"
              title={zoomLevel === 'full' ? 'Phóng to thân trên' : 'Xem toàn cảnh'}
            >
              {zoomLevel === 'full' ? <ZoomIn size={13} /> : <ZoomOut size={13} />}
            </button>
            <span className="text-[10px] uppercase font-semibold px-0.5">
              {zoomLevel === 'full' ? 'Full' : 'Detail'}
            </span>
          </div>
        )}
      </div>

      {/* Main Fashion Illustration & Cel-shaded Model */}
      <div
        className={`relative flex items-center justify-center w-full my-auto transition-transform duration-500 ease-out ${
          zoomLevel === 'torso' ? 'scale-135 translate-y-16' : 'scale-100'
        }`}
      >
        <svg
          viewBox="0 0 400 640"
          className="w-full max-h-[470px] select-none"
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

            {/* 3. Silk Sheen with rich highlights & multi-tone gradients */}
            <linearGradient id="silkSheen" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="30%" stopColor={primaryColor} />
              <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.38" />
              <stop offset="70%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>

            {/* Silk Specular Draping highlight strip */}
            <linearGradient id="drapeSpecular" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.28" />
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

            {/* 9. 3D Drop Shadow on layers */}
            <filter id="garmentDepth" x="-15%" y="-10%" width="130%" height="125%">
              <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#181512" floodOpacity="0.25" />
            </filter>
            <filter id="upperLayerDepth" x="-15%" y="-10%" width="130%" height="125%">
              <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#181512" floodOpacity="0.3" />
            </filter>
            <filter id="accessoryGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.2" />
            </filter>

            {/* 10. Custom Avatar Photo Cameo Clip */}
            <clipPath id="customFaceCameo">
              <circle cx="200" cy="68" r="30" />
            </clipPath>
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
             ========================================================= */}
          <g id="model-croquis">
            {/* Neck & Trapezius with soft Cel-shading */}
            <path d="M188 95 L188 142 L212 142 L212 95 Z" fill="#E8D5C4" />
            {/* Neck Shadow under chin */}
            <path d="M188 95 Q200 108 212 95 L212 108 Q200 118 188 108 Z" fill="#D3BEAC" opacity="0.75" />
            {/* Collarbone / Xương quai xanh */}
            <path d="M180 138 Q195 144 200 144 Q205 144 220 138" stroke="#CAAE9B" strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Stylized Sculpted Face Silhouette or Uploaded Custom Photo */}
            {selection.customPhotoUrl ? (
              <g>
                <circle cx="200" cy="68" r="30" fill="#EFE0D3" />
                <image
                  href={selection.customPhotoUrl}
                  x="170"
                  y="38"
                  width="60"
                  height="60"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#customFaceCameo)"
                />
                <circle cx="200" cy="68" r="30.5" fill="none" stroke="#C89B3C" strokeWidth="1.5" />
              </g>
            ) : (
              <g>
                <path
                  d="M176 68 C176 44 186 34 200 34 C214 34 224 44 224 68 C224 92 214 104 200 104 C186 104 176 92 176 68 Z"
                  fill="#EFE0D3"
                />
                {/* Facial Shadow & Jaw Contour */}
                <path d="M178 70 C178 88 188 98 200 102 C196 95 194 85 194 70 Z" fill="#E2CFBF" opacity="0.5" />
                {/* Editorial Minimalist Features */}
                <path d="M198 72 L201 72 L199 82 Z" fill="#C0A493" opacity="0.7" />
                <path d="M195 90 Q200 93 205 90" stroke="#9C5D66" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                {/* Eyebrows */}
                <path d="M187 62 Q193 60 197 63" stroke="#4A3D36" strokeWidth="1.1" fill="none" strokeLinecap="round" />
                <path d="M203 63 Q207 60 213 62" stroke="#4A3D36" strokeWidth="1.1" fill="none" strokeLinecap="round" />

                {/* Avatar Archetype Hairstyle Details */}
                {selection.avatarId === 'avatar-male-scholar' ? (
                  /* Male Scholar Hair (Short parted modern hair) */
                  <g>
                    <path
                      d="M174 58 C174 30 186 26 202 26 C218 26 226 34 226 56 C226 62 224 64 222 66 C220 52 216 42 202 42 C190 42 180 50 176 66 Z"
                      fill="#1E1C1A"
                    />
                    <path d="M178 48 C185 36 195 35 204 42" stroke="#333" strokeWidth="1" fill="none" />
                  </g>
                ) : selection.avatarId === 'avatar-female-genz' ? (
                  /* Female Gen Z Chic Bob with Bangs */
                  <g>
                    <path
                      d="M172 65 C172 32 184 28 200 28 C216 28 228 32 228 65 C228 85 224 94 220 95 C222 75 220 54 212 52 C204 50 196 50 188 52 C180 54 178 75 180 95 C176 94 172 85 172 65 Z"
                      fill="#1C1816"
                    />
                    <path d="M186 52 Q200 55 214 52" fill="#1C1816" />
                  </g>
                ) : selection.avatarId === 'avatar-androgynous' ? (
                  /* High Fashion Editorial Slicked Back */
                  <g>
                    <path
                      d="M176 56 C176 30 188 28 200 28 C212 28 224 30 224 56 C224 62 220 62 218 48 C212 38 188 38 182 48 C180 62 176 62 176 56 Z"
                      fill="#262220"
                    />
                  </g>
                ) : (
                  /* Classic Heritage Chignon Bun (Default) */
                  <g>
                    <circle cx="200" cy="28" r="14" fill="#1E1C1A" />
                    <path
                      d="M175 62 C175 35 185 32 200 32 C215 32 225 35 225 62 C222 48 214 42 200 42 C186 42 178 48 175 62 Z"
                      fill="#1E1C1A"
                    />
                    {/* Golden hair hairpin accent */}
                    <line x1="190" y1="24" x2="216" y2="34" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                )}
              </g>
            )}

            {/* Arms / Hands (Fashion Pose, articulated fingers) */}
            {/* Left Arm & Hand */}
            <path d="M142 148 L124 240 L131 340 L138 340 L136 242 L150 152 Z" fill="#E8D5C4" />
            <path d="M125 240 L131 340 L134 340 L129 242 Z" fill="#D3BEAC" opacity="0.6" />
            {/* Articulated Left Hand */}
            <path d="M131 340 C130 346 128 354 130 357 C132 359 135 358 136 352 L138 340 Z" fill="#E8D5C4" />

            {/* Right Arm & Hand */}
            <path d="M258 148 L274 235 L267 335 L260 335 L265 238 L250 152 Z" fill="#E8D5C4" />
            <path d="M272 235 L267 335 L264 335 L269 238 Z" fill="#D3BEAC" opacity="0.6" />
            {/* Articulated Right Hand */}
            <path d="M267 335 C269 342 271 350 269 354 C267 356 264 355 262 348 L260 335 Z" fill="#E8D5C4" />

            {/* Legs with muscle shading */}
            <path d="M174 420 L171 582 L189 582 L194 420 Z" fill="#DFC9B6" />
            <path d="M172 480 L171 582 L176 582 L178 480 Z" fill="#CAAFA0" opacity="0.5" />
            <path d="M206 420 L211 582 L229 582 L226 420 Z" fill="#DFC9B6" />
            <path d="M224 480 L228 582 L229 582 L227 480 Z" fill="#CAAFA0" opacity="0.5" />
          </g>

          {/* =========================================================
              LAYER 2: BOTTOM PIECES (Volumetric Drapery & Texture)
             ========================================================= */}
          <g id="bottom-layer">
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
          </g>

          {/* =========================================================
              LAYER 3: MAIN GARMENT (Brocade, Drapery & Depth Shading)
             ========================================================= */}
          <g id="main-garment" filter="url(#garmentDepth)">
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
              LAYER 4: ACCESSORIES (Silver Collar, Headphones, Glasses...)
             ========================================================= */}
          <g id="accessory-layer">
            {accessory.id === 'acc-silver-kieng' && (
              /* Kiềng Bạc Chạm Trống Đồng quanh cổ (3D Silver Shimmer) */
              <g filter="url(#upperLayerDepth)">
                <ellipse cx="200" cy="148" rx="22" ry="10" fill="none" stroke="url(#silverGradient)" strokeWidth="4.5" />
                <ellipse cx="200" cy="147.5" rx="22" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
              </g>
            )}

            {accessory.id === 'acc-headphones' && (
              /* Tai Nghe Over-Ear Gen Z Signature quanh cổ */
              <g filter="url(#upperLayerDepth)">
                <path
                  d="M178 144 C178 165 222 165 222 144"
                  stroke="#383A40"
                  strokeWidth="5.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <rect x="170" y="136" width="13" height="20" rx="4" fill="#C2C6CE" stroke="#222" strokeWidth="1.2" />
                <rect x="217" y="136" width="13" height="20" rx="4" fill="#C2C6CE" stroke="#222" strokeWidth="1.2" />
                <circle cx="176.5" cy="146" r="3" fill="#8E939E" />
                <circle cx="223.5" cy="146" r="3" fill="#8E939E" />
              </g>
            )}

            {accessory.id === 'acc-sunglasses-oval' && (
              /* Kính Râm Oval Y2K trên khuôn mặt */
              <g filter="url(#upperLayerDepth)">
                <ellipse cx="193" cy="72" rx="7.5" ry="5" fill="#141416" stroke="#C89B3C" strokeWidth="1" />
                <ellipse cx="207" cy="72" rx="7.5" ry="5" fill="#141416" stroke="#C89B3C" strokeWidth="1" />
                <line x1="200" y1="72" x2="200" y2="72" stroke="#C89B3C" strokeWidth="1.2" />
                {/* Glass reflection streak */}
                <line x1="191" y1="70" x2="195" y2="74" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />
                <line x1="205" y1="70" x2="209" y2="74" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />
              </g>
            )}

            {accessory.id === 'acc-wooden-fan' && (
              /* Quạt Gỗ Trầm Hương trên tay phải */
              <g transform="translate(252, 312) rotate(16)" filter="url(#upperLayerDepth)">
                <path d="M0 0 L-22 -38 A44 44 0 0 1 22 -38 Z" fill="#85532F" stroke="#523015" strokeWidth="1" />
                <line x1="0" y1="0" x2="-11" y2="-37" stroke="#D8B589" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="0" y2="-39" stroke="#D8B589" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="11" y2="-37" stroke="#D8B589" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="3.2" fill="#D93D57" />
              </g>
            )}

            {accessory.id === 'acc-jade-earrings' && (
              /* Khuyên Tai Ngọc Bích Bọc Vàng */
              <g filter="url(#upperLayerDepth)">
                <circle cx="178" cy="84" r="2.8" fill="#1E382B" stroke="#E6C875" strokeWidth="1" />
                <circle cx="222" cy="84" r="2.8" fill="#1E382B" stroke="#E6C875" strokeWidth="1" />
              </g>
            )}
          </g>

          {/* =========================================================
              LAYER 5: HEADWEAR (Khăn đóng, Mấn, Khăn mỏ quạ, Beret...)
             ========================================================= */}
          <g id="headwear-layer" filter="url(#upperLayerDepth)">
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
             ========================================================= */}
          <g id="bag-layer" filter="url(#upperLayerDepth)">
            {bag.id === 'bag-crossbody-nylon' && (
              /* Túi Crossbody Nylon vắt chéo ngực */
              <g>
                <line x1="148" y1="154" x2="232" y2="292" stroke="#25272B" strokeWidth="4.5" />
                <rect x="178" y="234" width="48" height="35" rx="6" fill="#1C1E22" stroke="#3D4047" strokeWidth="1.3" />
                <line x1="184" y1="248" x2="220" y2="248" stroke="#8E939D" strokeWidth="1.2" />
              </g>
            )}

            {bag.id === 'bag-shoulder-leather' && (
              /* Túi Kẹp Nách Baguette Da Mềm bên sườn trái */
              <g transform="translate(116, 218)">
                <path d="M12 0 C12 -22 28 -22 28 0" stroke="#543420" strokeWidth="2.8" fill="none" />
                <rect x="0" y="0" width="40" height="25" rx="5" fill="#362013" stroke="#211209" strokeWidth="1" />
                <circle cx="20" cy="12" r="3.2" fill="url(#goldGradient)" />
              </g>
            )}

            {bag.id === 'bag-woven-coi' && (
              /* Túi Mây Tre Đan Thủ Công bên tay phải */
              <g transform="translate(254, 328)">
                <path d="M12 0 C12 -18 26 -18 26 0" stroke="#855F3B" strokeWidth="2.2" fill="none" />
                <path d="M4 0 L34 0 L30 36 L8 36 Z" fill="#CF9F6A" stroke="#946535" strokeWidth="1" />
                <line x1="8" y1="12" x2="30" y2="12" stroke="#946535" strokeWidth="0.9" strokeDasharray="3,2" />
                <line x1="10" y1="24" x2="28" y2="24" stroke="#946535" strokeWidth="0.9" strokeDasharray="3,2" />
              </g>
            )}

            {bag.id === 'bag-tote-dongho' && (
              /* Túi Tote Vải Đay In Mộc Đông Hồ */
              <g transform="translate(114, 234)">
                <path d="M15 0 C15 -32 32 -32 32 0" stroke="#857864" strokeWidth="2.8" fill="none" />
                <rect x="4" y="0" width="42" height="50" rx="3" fill="#E6DDCF" stroke="#BEB29F" strokeWidth="1.2" />
                <rect x="14" y="13" width="22" height="25" fill="#C4344B" opacity="0.85" rx="2" />
                <circle cx="25" cy="25" r="5" fill="#E8A91C" />
              </g>
            )}

            {bag.id === 'bag-clutch-lacquer' && (
              /* Clutch Cầm Tay Dáng Quạt Sơn Mài */
              <g transform="translate(124, 332) rotate(-10)">
                <path d="M0 0 L36 0 C36 16 26 24 0 18 Z" fill="#141312" stroke="#C89B3C" strokeWidth="1.4" />
                <line x1="6" y1="6" x2="28" y2="6" stroke="#C89B3C" strokeWidth="1.1" />
              </g>
            )}
          </g>

          {/* =========================================================
              LAYER 7: FOOTWEAR (Chunky Sneaker, Guốc mộc, Loafer...)
             ========================================================= */}
          <g id="footwear-layer" filter="url(#upperLayerDepth)">
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

            {footwear.id === 'shoes-embroidered-flats' && (
              /* Giày Vải Thêu Chỉ Kim Tuyến */
              <g>
                <path d="M167 582 C177 580 189 580 191 598 L165 598 Z" fill="#8B1E1E" stroke="#C89B3C" strokeWidth="0.9" />
                <path d="M209 582 C219 580 231 580 233 598 L207 598 Z" fill="#8B1E1E" stroke="#C89B3C" strokeWidth="0.9" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Bottom Floating Piece Ticker */}
      <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-[#E5DDD0]/70 text-[11px] text-[#6E6659]">
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

        <div className="flex items-center gap-1 text-[#8B1E1E] shrink-0 font-semibold ml-2">
          <Sparkles size={12} />
          <span>Haute Couture</span>
        </div>
      </div>
    </div>
  );
};
