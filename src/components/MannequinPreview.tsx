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
import { ZoomIn, ZoomOut, Sparkles, Eye } from 'lucide-react';

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
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

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
    <div className={`relative flex flex-col items-center justify-between w-full h-full bg-[#F4EFEA] rounded-2xl overflow-hidden border border-[#E5DDD0] shadow-sm ${compact ? 'p-4' : 'p-6'}`}>
      {/* Top Editorial Watermark / Header */}
      <div className="w-full flex items-center justify-between z-10 text-xs tracking-wider">
        <div className="flex items-center gap-2">
          <span className="font-editorial text-sm font-semibold tracking-widest text-[#1E1D1B] uppercase">
            Việt Phục Remix
          </span>
          <span className="text-[#8E8474]">/</span>
          <span className="text-[#8B1E1E] font-medium uppercase text-[11px] tracking-widest">
            {garment.name}
          </span>
        </div>

        {interactive && (
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xs px-2 py-1 rounded-full border border-[#E5DDD0] text-[#554E43]">
            <button
              onClick={() => setZoomLevel(zoomLevel === 'full' ? 'torso' : 'full')}
              className="p-1 hover:text-[#1E1D1B] transition-colors"
              title={zoomLevel === 'full' ? 'Phóng to thân trên' : 'Xem toàn cảnh'}
            >
              {zoomLevel === 'full' ? <ZoomIn size={14} /> : <ZoomOut size={14} />}
            </button>
            <span className="text-[10px] uppercase font-medium px-1">
              {zoomLevel === 'full' ? 'Toàn thân' : 'Thân áo'}
            </span>
          </div>
        )}
      </div>

      {/* Main Visual Model / Dressing Mannequin SVG */}
      <div className={`relative flex items-center justify-center w-full my-auto transition-transform duration-500 ease-out ${
        zoomLevel === 'torso' ? 'scale-135 translate-y-16' : 'scale-100'
      }`}>
        <svg
          viewBox="0 0 400 640"
          className="w-full max-h-[460px] drop-shadow-md select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Silk Sheen Gradient */}
            <linearGradient id="silkSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
              <stop offset="45%" stopColor={primaryColor} stopOpacity="0.9" />
              <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor={secondaryColor} stopOpacity="1" />
            </linearGradient>

            {/* Subtle Gold / Metal for buttons & accessories */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6C875" />
              <stop offset="50%" stopColor="#C89B3C" />
              <stop offset="100%" stopColor="#8C671C" />
            </linearGradient>

            {/* Silver Shimmer */}
            <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#D4D7DC" />
              <stop offset="100%" stopColor="#8A92A0" />
            </linearGradient>

            {/* Shadow beneath model */}
            <radialGradient id="footShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E1D1B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1E1D1B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Model Floor Shadow */}
          <ellipse cx="200" cy="610" rx="90" ry="12" fill="url(#footShadow)" />

          {/* 1. Base Model Silhouette (High Fashion Minimal Mannequin) */}
          <g id="model-body" className="transition-opacity duration-300">
            {/* Neck */}
            <path d="M190 100 L190 140 L210 140 L210 100 Z" fill="#E6D3C2" />
            {/* Head Silhouette */}
            <path
              d="M178 75 C178 50 188 38 200 38 C212 38 222 50 222 75 C222 96 212 108 200 108 C188 108 178 96 178 75 Z"
              fill="#EAD9CA"
            />
            {/* Delicate Facial Contour & Minimalist Feature */}
            <path d="M199 74 L201 74 L200 82 Z" fill="#CAAFA0" opacity="0.6" />
            <path d="M196 90 Q200 92 204 90" stroke="#CAAFA0" strokeWidth="1.2" fill="none" />

            {/* Arms / Hands */}
            {/* Left Arm (relaxed chic pose) */}
            <path d="M142 148 L125 240 L132 340 L138 340 L136 242 L150 152 Z" fill="#E6D3C2" />
            {/* Right Arm */}
            <path d="M258 148 L272 235 L266 335 L260 335 L264 238 L250 152 Z" fill="#E6D3C2" />
            {/* Hands */}
            <circle cx="134" cy="348" r="7" fill="#E6D3C2" />
            <circle cx="264" cy="345" r="7" fill="#E6D3C2" />

            {/* Legs */}
            <path d="M175 420 L172 580 L188 580 L193 420 Z" fill="#DFC8B5" />
            <path d="M207 420 L212 580 L228 580 L225 420 Z" fill="#DFC8B5" />
          </g>

          {/* 2. Bottom Pieces (Trousers / Skirt) */}
          <g id="bottom-layer" className="transition-all duration-300">
            {bottom.id === 'pants-silk-wide' && (
              /* Quần Lụa Ống Rộng Truyền Thống */
              <path
                d="M165 290 L150 580 L186 580 L200 380 L214 580 L250 580 L235 290 Z"
                fill="#201E1D"
                opacity="0.9"
                stroke="#121110"
                strokeWidth="1"
              />
            )}

            {bottom.id === 'pants-denim-wide' && (
              /* Quần Denim Ống Suông Gen Z */
              <g>
                <path
                  d="M162 290 L145 585 L188 585 L200 360 L212 585 L255 585 L238 290 Z"
                  fill="#334C69"
                  stroke="#263B52"
                  strokeWidth="1.5"
                />
                {/* Denim Jean Seams */}
                <path d="M200 300 L200 360" stroke="#E29B43" strokeWidth="1" strokeDasharray="3,2" />
                <path d="M148 580 L185 580" stroke="#E29B43" strokeWidth="1" strokeDasharray="3,2" />
                <path d="M215 580 L252 580" stroke="#E29B43" strokeWidth="1" strokeDasharray="3,2" />
              </g>
            )}

            {bottom.id === 'skirt-pleated-midi' && (
              /* Chân Váy Lụa Dập Ly */
              <g>
                <path
                  d="M168 290 L135 520 L265 520 L232 290 Z"
                  fill="#EAE2D5"
                  stroke="#C5B8A4"
                  strokeWidth="1"
                />
                {/* Pleats lines */}
                <line x1="150" y1="300" x2="150" y2="520" stroke="#C5B8A4" strokeWidth="0.8" opacity="0.6" />
                <line x1="170" y1="295" x2="170" y2="520" stroke="#C5B8A4" strokeWidth="0.8" opacity="0.6" />
                <line x1="190" y1="290" x2="190" y2="520" stroke="#C5B8A4" strokeWidth="0.8" opacity="0.6" />
                <line x1="210" y1="290" x2="210" y2="520" stroke="#C5B8A4" strokeWidth="0.8" opacity="0.6" />
                <line x1="230" y1="295" x2="230" y2="520" stroke="#C5B8A4" strokeWidth="0.8" opacity="0.6" />
                <line x1="250" y1="300" x2="250" y2="520" stroke="#C5B8A4" strokeWidth="0.8" opacity="0.6" />
              </g>
            )}

            {bottom.id === 'pants-cargo-minimal' && (
              /* Quần Cargo Utility Tối Giản */
              <g>
                <path
                  d="M160 290 L142 585 L186 585 L200 370 L214 585 L258 585 L240 290 Z"
                  fill="#2A2F2B"
                  stroke="#1D221E"
                  strokeWidth="1.2"
                />
                {/* Cargo Pockets */}
                <rect x="144" y="420" width="22" height="30" rx="3" fill="#363C38" stroke="#1D221E" strokeWidth="0.8" />
                <rect x="234" y="420" width="22" height="30" rx="3" fill="#363C38" stroke="#1D221E" strokeWidth="0.8" />
              </g>
            )}

            {bottom.id === 'pants-tailored-high' && (
              /* Quần Tây May Đo Cạp Cao */
              <g>
                <path
                  d="M166 280 L156 580 L188 580 L200 365 L212 580 L244 580 L234 280 Z"
                  fill="#23211F"
                  stroke="#151413"
                  strokeWidth="1"
                />
                {/* Crease lines */}
                <line x1="172" y1="310" x2="172" y2="575" stroke="#48443F" strokeWidth="1" />
                <line x1="228" y1="310" x2="228" y2="575" stroke="#48443F" strokeWidth="1" />
              </g>
            )}

            {bottom.id === 'skirt-asymmetric-wrap' && (
              /* Chân Váy Quấn Bất Đối Xứng */
              <path
                d="M168 285 L138 480 L260 550 L232 285 Z"
                fill="#1E1D1B"
                stroke="#3D3A37"
                strokeWidth="1.2"
              />
            )}
          </g>

          {/* 3. Main Garment Layer (Interactive SVG Silhouettes) */}
          <g id="garment-layer" className="transition-all duration-300">
            {garment.id === 'ao-ngu-than' && (
              /* ÁO NGŨ THÂN (Mandarin collar, 5 panels, right side buttons, knee-length) */
              <g>
                {/* Outer Robe Body */}
                <path
                  d="M185 130 C160 138 140 148 136 175 L124 280 L145 285 L152 205 L158 480 Q200 495 242 480 L248 205 L255 285 L276 280 L264 175 C260 148 240 138 215 130 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.5"
                />
                {/* High Mandarin Collar (Cổ Đứng Cao) */}
                <path
                  d="M185 125 C185 116 192 110 200 110 C208 110 215 116 215 125 L216 142 L184 142 Z"
                  fill={secondaryColor}
                  stroke="#CAAFA0"
                  strokeWidth="0.8"
                />
                {/* Overlapping flap to the right (Thân Lập Ngực) */}
                <path
                  d="M200 142 Q200 170 218 200 Q226 230 228 320"
                  stroke={secondaryColor}
                  strokeWidth="2"
                  fill="none"
                />
                {/* 5 Traditional Buttons (Ngũ cúc mạn sườn) */}
                <circle cx="204" cy="148" r="3.2" fill="url(#goldGradient)" stroke="#5A4010" strokeWidth="0.8" />
                <circle cx="211" cy="172" r="3.2" fill="url(#goldGradient)" stroke="#5A4010" strokeWidth="0.8" />
                <circle cx="221" cy="202" r="3.2" fill="url(#goldGradient)" stroke="#5A4010" strokeWidth="0.8" />
                <circle cx="226" cy="240" r="3.2" fill="url(#goldGradient)" stroke="#5A4010" strokeWidth="0.8" />
                <circle cx="227" cy="285" r="3.2" fill="url(#goldGradient)" stroke="#5A4010" strokeWidth="0.8" />
                {/* Hemline subtle split */}
                <line x1="200" y1="420" x2="200" y2="488" stroke={secondaryColor} strokeWidth="1.5" />
              </g>
            )}

            {garment.id === 'ao-dai' && (
              /* ÁO DÀI (Form slim fit, tà áo thướt tha, xẻ eo cao) */
              <g>
                {/* Bodice & Flowing Tunic */}
                <path
                  d="M187 132 C168 138 145 150 140 180 L132 290 L146 295 L152 210 Q160 260 162 310 L150 560 Q200 575 250 560 L238 310 Q240 260 248 210 L254 295 L268 290 L260 180 C255 150 232 138 213 132 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.2"
                />
                {/* Classic Collar */}
                <path
                  d="M188 126 C188 118 193 114 200 114 C207 114 212 118 212 126 L213 140 L187 140 Z"
                  fill={secondaryColor}
                />
                {/* Waist Draping slit accent */}
                <path d="M192 140 Q204 165 220 185" stroke={secondaryColor} strokeWidth="1.5" fill="none" />
                <circle cx="202" cy="155" r="2.5" fill="url(#goldGradient)" />
                <circle cx="212" cy="172" r="2.5" fill="url(#goldGradient)" />
                <line x1="162" y1="310" x2="162" y2="550" stroke={secondaryColor} strokeWidth="0.8" opacity="0.6" />
                <line x1="238" y1="310" x2="238" y2="550" stroke={secondaryColor} strokeWidth="0.8" opacity="0.6" />
              </g>
            )}

            {garment.id === 'ao-tu-than' && (
              /* ÁO TỨ THÂN (Yếm đào lót trong, 4 vạt áo buông lơi thắt nút trước bụng) */
              <g>
                {/* Yếm Đào bên trong */}
                <path d="M188 140 L212 140 L220 230 L180 230 Z" fill="#D94860" />
                <path d="M190 140 Q200 148 210 140" stroke="#FFF" strokeWidth="1" fill="none" />
                {/* 2 Outer Flaps left & right */}
                <path
                  d="M185 135 L145 160 L130 270 L144 275 L155 210 L160 480 Q175 490 190 480 L185 270 Q180 220 185 135 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.2"
                />
                <path
                  d="M215 135 L255 160 L270 270 L256 275 L245 210 L240 480 Q225 490 210 480 L215 270 Q220 220 215 135 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.2"
                />
                {/* Dải Lụa Ruột Bao Thắt Lưng Buộc Vạt */}
                <path d="M175 260 L225 260 L222 280 L178 280 Z" fill="#E6A817" />
                {/* Knot Ribbon tails hanging */}
                <path d="M195 280 L190 350 L198 350 L201 280 Z" fill="#E6A817" />
                <path d="M205 280 L210 360 L203 360 L199 280 Z" fill="#C43B52" />
              </g>
            )}

            {garment.id === 'ao-giao-linh' && (
              /* ÁO GIAO LĨNH (Cổ bắt chéo chữ V tao nhã) */
              <g>
                {/* Robe Body */}
                <path
                  d="M185 132 L140 160 L120 280 L138 288 L150 210 L155 510 Q200 525 245 510 L250 210 L262 288 L280 280 L260 160 L215 132 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.4"
                />
                {/* Cross-collar Lapel Layering */}
                <path d="M185 132 L225 260 L200 260 L175 165 Z" fill={secondaryColor} opacity="0.9" />
                <path d="M215 132 L175 260 L195 260 L225 165 Z" fill={primaryColor} stroke="#E5DDD0" strokeWidth="1" />
                {/* Fabric Sash Belt */}
                <rect x="168" y="260" width="64" height="18" fill="#1C1B1A" rx="2" />
                <path d="M192 278 L188 380 L196 380 L200 278 Z" fill="#1C1B1A" />
              </g>
            )}

            {garment.id === 'ao-ba-ba' && (
              /* ÁO BÀ BA (Cổ tròn, xẻ tà hông, hàng cúc giữa, 2 túi trước) */
              <g>
                <path
                  d="M188 135 C175 145 150 155 145 180 L135 285 L150 290 L156 215 L162 380 Q200 395 238 380 L244 215 L250 290 L265 285 L255 180 C250 155 225 145 212 135 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.2"
                />
                {/* Round soft collar */}
                <path d="M188 135 Q200 148 212 135" stroke={secondaryColor} strokeWidth="1.8" fill="none" />
                {/* Center Button Row */}
                <line x1="200" y1="148" x2="200" y2="385" stroke={secondaryColor} strokeWidth="1.5" />
                <circle cx="200" cy="165" r="2.8" fill="url(#goldGradient)" />
                <circle cx="200" cy="205" r="2.8" fill="url(#goldGradient)" />
                <circle cx="200" cy="245" r="2.8" fill="url(#goldGradient)" />
                <circle cx="200" cy="285" r="2.8" fill="url(#goldGradient)" />
                <circle cx="200" cy="325" r="2.8" fill="url(#goldGradient)" />
                {/* 2 Patch Pockets */}
                <rect x="170" y="325" width="22" height="25" rx="3" fill="none" stroke={secondaryColor} strokeWidth="1.2" />
                <rect x="208" y="325" width="22" height="25" rx="3" fill="none" stroke={secondaryColor} strokeWidth="1.2" />
              </g>
            )}

            {garment.id === 'ao-doi-kham' && (
              /* ÁO ĐỐI KHÂM (Vạt song song đối xứng, nẹp áo to bản lộng lẫy) */
              <g>
                {/* Inner garment peeking */}
                <path d="M185 140 L215 140 L220 320 L180 320 Z" fill="#F4EFEA" stroke="#DED3C4" strokeWidth="1" />
                {/* Outer parallel robe */}
                <path
                  d="M185 132 L138 158 L122 280 L140 286 L152 210 L156 500 Q178 510 188 500 L188 170 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.2"
                />
                <path
                  d="M215 132 L262 158 L278 280 L260 286 L248 210 L244 500 Q222 510 212 500 L212 170 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.2"
                />
                {/* Elaborate Embroidered Lapel Borders */}
                <rect x="180" y="145" width="10" height="355" fill="url(#goldGradient)" opacity="0.9" />
                <rect x="210" y="145" width="10" height="355" fill="url(#goldGradient)" opacity="0.9" />
              </g>
            )}
          </g>

          {/* 4. Accessories Layer (Kiềng bạc, Tai nghe, Kính râm, Quạt...) */}
          <g id="accessory-layer">
            {accessory.id === 'acc-silver-kieng' && (
              /* Kiềng Bạc Chạm Trống Đồng quanh cổ */
              <ellipse
                cx="200"
                cy="148"
                rx="22"
                ry="10"
                fill="none"
                stroke="url(#silverGradient)"
                strokeWidth="4"
              />
            )}

            {accessory.id === 'acc-headphones' && (
              /* Tai nghe Over-ear quanh cổ (Gen Z signature) */
              <g>
                <path
                  d="M180 145 C180 162 220 162 220 145"
                  stroke="#474A51"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                <rect x="172" y="138" width="12" height="18" rx="4" fill="#C2C6CE" stroke="#333" strokeWidth="1" />
                <rect x="216" y="138" width="12" height="18" rx="4" fill="#C2C6CE" stroke="#333" strokeWidth="1" />
              </g>
            )}

            {accessory.id === 'acc-sunglasses-oval' && (
              /* Kính râm Oval Y2K trên mắt */
              <g>
                <ellipse cx="193" cy="72" rx="7" ry="4.5" fill="#141416" stroke="#C89B3C" strokeWidth="0.8" />
                <ellipse cx="207" cy="72" rx="7" ry="4.5" fill="#141416" stroke="#C89B3C" strokeWidth="0.8" />
                <line x1="200" y1="72" x2="200" y2="72" stroke="#C89B3C" strokeWidth="1" />
              </g>
            )}

            {accessory.id === 'acc-wooden-fan' && (
              /* Quạt Gỗ trên tay phải */
              <g transform="translate(250, 315) rotate(15)">
                <path d="M0 0 L-20 -35 A40 40 0 0 1 20 -35 Z" fill="#8C5C38" stroke="#5E381A" strokeWidth="1" />
                <line x1="0" y1="0" x2="-10" y2="-34" stroke="#D8B589" strokeWidth="0.6" />
                <line x1="0" y1="0" x2="0" y2="-36" stroke="#D8B589" strokeWidth="0.6" />
                <line x1="0" y1="0" x2="10" y2="-34" stroke="#D8B589" strokeWidth="0.6" />
                <circle cx="0" cy="0" r="3" fill="#D94860" />
              </g>
            )}

            {accessory.id === 'acc-jade-earrings' && (
              /* Khuyên Tai Ngọc Bích */
              <g>
                <circle cx="180" cy="84" r="2.5" fill="#1E382B" stroke="#E6C875" strokeWidth="0.8" />
                <circle cx="220" cy="84" r="2.5" fill="#1E382B" stroke="#E6C875" strokeWidth="0.8" />
              </g>
            )}
          </g>

          {/* 5. Headwear Layer */}
          <g id="headwear-layer">
            {headwear.id === 'head-khan-dong' && (
              /* Khăn Đóng / Khăn Xếp (Tầng nếp quấn quanh trán hình chữ Nhân) */
              <g>
                <ellipse cx="200" cy="50" rx="27" ry="14" fill="#1A1817" stroke="#333" strokeWidth="1" />
                <path d="M174 50 Q200 64 226 50 Q200 58 174 50 Z" fill="#2E2B2A" />
                <path d="M176 46 Q200 56 224 46" stroke="#484340" strokeWidth="1" fill="none" />
                <path d="M178 42 Q200 50 222 42" stroke="#484340" strokeWidth="1" fill="none" />
              </g>
            )}

            {headwear.id === 'head-man-cach-tan' && (
              /* Mấn Lụa Cách Tân Đính Ngọc */
              <g>
                <path
                  d="M175 48 C175 25 186 18 200 18 C214 18 225 25 225 48 C225 35 214 26 200 26 C186 26 175 35 175 48 Z"
                  fill="url(#silkSheen)"
                  stroke={secondaryColor}
                  strokeWidth="1.2"
                />
                <circle cx="192" cy="26" r="2" fill="#FFF" stroke="#C5B8A4" strokeWidth="0.5" />
                <circle cx="200" cy="24" r="2.5" fill="#FFF" stroke="#C5B8A4" strokeWidth="0.5" />
                <circle cx="208" cy="26" r="2" fill="#FFF" stroke="#C5B8A4" strokeWidth="0.5" />
              </g>
            )}

            {headwear.id === 'head-khan-mo-qua' && (
              /* Khăn Mỏ Quạ Lụa Đen */
              <path
                d="M176 70 C176 38 188 32 200 32 C212 32 224 38 224 70 L200 80 Z"
                fill="#181615"
                stroke="#333"
                strokeWidth="1"
              />
            )}

            {headwear.id === 'head-beret-modern' && (
              /* Mũ Beret Da Cổ Điển */
              <g>
                <path
                  d="M170 52 C170 32 188 28 214 30 C228 32 234 44 230 52 Z"
                  fill="#2A2421"
                  stroke="#171311"
                  strokeWidth="1"
                />
                <circle cx="202" cy="28" r="2" fill="#171311" />
              </g>
            )}

            {headwear.id === 'head-bandana-silk' && (
              /* Khăn Bandana Tơ Tằm Họa Tiết */
              <path
                d="M176 56 Q200 68 224 56 L218 42 Q200 48 182 42 Z"
                fill="#D49B28"
                stroke="#8A5F12"
                strokeWidth="1"
              />
            )}

            {headwear.id === 'head-none' && (
              /* Tóc Tự Nhiên / Kẹp Càng Cua */
              <path
                d="M178 55 C178 35 188 32 200 32 C212 32 222 35 222 55 C222 45 212 40 200 40 C188 40 178 45 178 55 Z"
                fill="#2E241E"
              />
            )}
          </g>

          {/* 6. Bags Layer */}
          <g id="bag-layer">
            {bag.id === 'bag-crossbody-nylon' && (
              /* Túi Crossbody Nylon vắt chéo ngực */
              <g>
                <line x1="150" y1="155" x2="230" y2="290" stroke="#2B2D31" strokeWidth="4" />
                <rect x="180" y="235" width="46" height="34" rx="6" fill="#1E2024" stroke="#3F4248" strokeWidth="1.2" />
                <line x1="184" y1="248" x2="222" y2="248" stroke="#8E939D" strokeWidth="1" />
              </g>
            )}

            {bag.id === 'bag-shoulder-leather' && (
              /* Túi Baguette Da kẹp nách bên trái */
              <g transform="translate(118, 220)">
                <path d="M12 0 C12 -20 28 -20 28 0" stroke="#5C3B28" strokeWidth="2.5" fill="none" />
                <rect x="0" y="0" width="38" height="24" rx="4" fill="#3D2619" stroke="#26170E" strokeWidth="1" />
                <circle cx="19" cy="12" r="3" fill="url(#goldGradient)" />
              </g>
            )}

            {bag.id === 'bag-woven-coi' && (
              /* Túi Mây Tre Đan Thủ Công bên tay phải */
              <g transform="translate(254, 330)">
                <path d="M12 0 C12 -16 26 -16 26 0" stroke="#8A633F" strokeWidth="2" fill="none" />
                <path d="M4 0 L34 0 L30 35 L8 35 Z" fill="#D2A877" stroke="#9A6F41" strokeWidth="1" />
                <line x1="8" y1="12" x2="30" y2="12" stroke="#9A6F41" strokeWidth="0.8" strokeDasharray="3,2" />
                <line x1="10" y1="24" x2="28" y2="24" stroke="#9A6F41" strokeWidth="0.8" strokeDasharray="3,2" />
              </g>
            )}

            {bag.id === 'bag-tote-dongho' && (
              /* Túi Tote Đay In Tranh Đông Hồ bên vai */
              <g transform="translate(115, 235)">
                <path d="M15 0 C15 -30 32 -30 32 0" stroke="#8A7D6A" strokeWidth="2.5" fill="none" />
                <rect x="4" y="0" width="40" height="48" rx="2" fill="#E6DDCF" stroke="#C2B7A5" strokeWidth="1" />
                {/* Traditional Dong Ho Print motif */}
                <rect x="14" y="12" width="20" height="24" fill="#C43B52" opacity="0.8" rx="2" />
                <circle cx="24" cy="24" r="5" fill="#E6C875" />
              </g>
            )}

            {bag.id === 'bag-clutch-lacquer' && (
              /* Clutch Sơn Mài Cầm Tay */
              <g transform="translate(125, 335) rotate(-10)">
                <path d="M0 0 L35 0 C35 15 25 22 0 16 Z" fill="#181615" stroke="#C89B3C" strokeWidth="1.2" />
                <line x1="6" y1="6" x2="28" y2="6" stroke="#C89B3C" strokeWidth="1" />
              </g>
            )}
          </g>

          {/* 7. Footwear Layer */}
          <g id="footwear-layer">
            {footwear.id === 'shoes-chunky-sneaker' && (
              /* Chunky Sneaker Trắng Gen Z */
              <g>
                <path d="M168 580 L188 580 L192 602 L164 602 Z" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
                <rect x="162" y="598" width="32" height="6" rx="2" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.8" />
                <path d="M210 580 L230 580 L234 602 L206 602 Z" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
                <rect x="204" y="598" width="32" height="6" rx="2" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.8" />
              </g>
            )}

            {footwear.id === 'shoes-guoc-moc' && (
              /* Guốc Mộc Sơn Mài Quai Nhung */
              <g>
                {/* Left Guoc */}
                <rect x="166" y="582" width="20" height="6" rx="2" fill="#C43B52" />
                <path d="M168 588 L184 588 L182 600 L170 600 Z" fill="#8C5C38" stroke="#5E381A" strokeWidth="0.8" />
                {/* Right Guoc */}
                <rect x="212" y="582" width="20" height="6" rx="2" fill="#C43B52" />
                <path d="M214 588 L230 588 L228 600 L216 600 Z" fill="#8C5C38" stroke="#5E381A" strokeWidth="0.8" />
              </g>
            )}

            {footwear.id === 'shoes-leather-loafer' && (
              /* Penny Loafer Da Đen */
              <g>
                <path d="M168 580 L188 580 L190 598 L166 598 Z" fill="#1C1A18" stroke="#000" strokeWidth="1" />
                <rect x="170" y="586" width="16" height="3" fill="#D4AF37" />
                <path d="M210 580 L230 580 L232 598 L208 598 Z" fill="#1C1A18" stroke="#000" strokeWidth="1" />
                <rect x="212" y="586" width="16" height="3" fill="#D4AF37" />
              </g>
            )}

            {footwear.id === 'shoes-minimal-mule' && (
              /* Mule Sandal Gót Vuông */
              <g>
                <path d="M170 582 L186 582 L184 594 L172 594 Z" fill="#4A3B32" />
                <rect x="170" y="594" width="6" height="6" fill="#8C6F5A" />
                <path d="M212 582 L228 582 L226 594 L214 594 Z" fill="#4A3B32" />
                <rect x="222" y="594" width="6" height="6" fill="#8C6F5A" />
              </g>
            )}

            {footwear.id === 'shoes-chelsea-boots' && (
              /* Chelsea Boots Da Đen Cổ Thấp */
              <g>
                <path d="M166 565 L188 565 L192 602 L164 602 Z" fill="#181716" stroke="#000" strokeWidth="1" />
                <path d="M174 570 L182 570 L180 585 L176 585 Z" fill="#2E2C2A" />
                <path d="M210 565 L232 565 L236 602 L208 602 Z" fill="#181716" stroke="#000" strokeWidth="1" />
                <path d="M218 570 L226 570 L224 585 L220 585 Z" fill="#2E2C2A" />
              </g>
            )}

            {footwear.id === 'shoes-embroidered-flats' && (
              /* Giày Vải Thêu Chỉ Kim Tuyến */
              <g>
                <path d="M168 582 C178 580 188 580 190 598 L166 598 Z" fill="#8B1E1E" stroke="#C89B3C" strokeWidth="0.8" />
                <path d="M210 582 C220 580 230 580 232 598 L208 598 Z" fill="#8B1E1E" stroke="#C89B3C" strokeWidth="0.8" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Bottom Floating Piece Ticker */}
      <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-[#E8DFC0]/60 text-[11px] text-[#6E6659]">
        <div className="flex items-center gap-1.5 truncate">
          <span className="inline-block w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: primaryColor }} />
          <span className="font-medium text-[#1E1D1B] truncate">{color.name}</span>
          <span className="text-[#B3A99B]">·</span>
          <span className="truncate">{garment.name}</span>
          <span className="text-[#B3A99B]">·</span>
          <span className="truncate">{bottom.name}</span>
        </div>

        <div className="flex items-center gap-1 text-[#8B1E1E] shrink-0 font-medium ml-2">
          <Sparkles size={12} />
          <span>Remix Live</span>
        </div>
      </div>
    </div>
  );
};
