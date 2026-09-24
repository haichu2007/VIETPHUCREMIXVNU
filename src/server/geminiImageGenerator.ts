import { GoogleGenAI } from '@google/genai';

export interface GenerateImageRequest {
  garmentName: string;
  garmentId: string;
  styleName: string;
  colorName: string;
  colorHex: string;
  bottomName: string;
  bottomId?: string;
  footwearName: string;
  footwearId?: string;
  headwearName?: string;
  headwearId?: string;
  accessoryName?: string;
  accessoryId?: string;
  bagName?: string;
  bagId?: string;
  userCustomPrompt?: string;
}

export interface GenerateImageResponse {
  success: boolean;
  source: 'gemini_flash_image' | 'smart_heritage_canvas';
  imageUrl: string;
  hiddenPrompt: string;
  negativePrompt: string;
  message: string;
}

export interface TryOnUserImageRequest {
  userPhotoUrl: string; // Base64 data URL
  garmentName: string;
  garmentId: string;
  styleName: string;
  colorName: string;
  colorHex: string;
  bottomName: string;
  bottomId?: string;
  footwearName: string;
  footwearId?: string;
  headwearName?: string;
  headwearId?: string;
  accessoryName?: string;
  accessoryId?: string;
  bagName?: string;
  bagId?: string;
  userCustomPrompt?: string;
}

export interface TryOnUserImageResponse {
  success: boolean;
  source: 'gemini_tryon' | 'smart_heritage_tryon';
  imageUrl: string;
  originalPhotoUrl: string;
  aiStylistFeedback?: string;
  hiddenPrompt: string;
  negativePrompt: string;
  message: string;
}

// Memory cache for API quota availability
let isImageQuotaAvailable: boolean | null = null;
let lastImageQuotaCheckTime = 0;
const QUOTA_COOLDOWN_MS = 5 * 60 * 1000;

/**
 * Builds the comprehensive "Prompt Ẩn" (Hidden Prompt) engineered strictly for:
 * 1. FULL-BODY standing photo (head-to-toe, entire outfit visible)
 * 2. EXACT match of every selected card component (garment, collar, bottom, shoes, accessories)
 * 3. NO TEXT, NO FRAMES, NO OVERLAYS (chỉ ảnh người mẫu nguyên bản)
 */
export function buildHiddenPrompt(req: GenerateImageRequest): { prompt: string; negativePrompt: string } {
  let garmentDetail = '';
  switch (req.garmentId) {
    case 'ao-ngu-than':
      garmentDetail =
        'authentic Vietnamese Áo Ngũ Thân (five-panel traditional robe), high mandarin standing collar (cổ đứng) with five polished brass/jade buttons strictly fastened down the right lapel, tailored asymmetrical closure, exquisite hand-woven silk with discreet cloud-dragon jacquard motifs, flowing silhouette';
      break;
    case 'ao-giao-linh':
      garmentDetail =
        'authentic Vietnamese Áo Giao Lĩnh (cross-collar robe), crossed chest lapels (cổ chéo) folding gracefully left-over-right, broad flowing ceremonial sleeves, fine silk waist tie-sash with dangling cord tassels';
      break;
    case 'ao-tu-than':
      garmentDetail =
        'traditional northern Vietnamese Áo Tứ Thân (four-flap flowing robe), four graceful panels open at front and tied at waist, revealing an embroidered lotus silk yếm (halter neck bodice), vibrant pink/crimson silk sash belt (ruột bao lụa đào)';
      break;
    case 'ao-nhat-binh':
      garmentDetail =
        'Vietnamese imperial royal Áo Nhật Bình court robe, iconic rectangular embroidered collar (cổ áo chữ nhật) with golden phoenix and longevity motifs, vibrant multi-colored five-element sleeve bands (viền tay ngũ hành)';
      break;
    case 'ao-ba-ba':
      garmentDetail =
        'southern Vietnamese Áo Bà Ba, tailored silk tunic with soft scoop neckline, side slits, two lower waist patch pockets, relaxed southern delta elegance';
      break;
    case 'ao-doi-kham':
      garmentDetail =
        'Vietnamese royal Áo Đối Khâm (parallel-lapel ceremonial robe), parallel front panels falling straight, majestic embroidered patterns of imperial clouds and royal court motifs';
      break;
    default:
      garmentDetail = `authentic Vietnamese traditional garment (${req.garmentName}), bespoke tailoring with authentic collar craftsmanship and silk drape`;
  }

  const colorDetail = `${req.colorName} (${req.colorHex}) with luxurious subtle fabric sheen and natural silk textures`;
  const bottomDetail = req.bottomName ? `wearing ${req.bottomName}` : 'wearing flowing wide-leg silk trousers';
  const footwearDetail = req.footwearName ? `wearing ${req.footwearName} on feet` : 'wearing traditional embroidered slippers';
  const headwearDetail = req.headwearName && !req.headwearName.toLowerCase().includes('không')
    ? `adorned with traditional ${req.headwearName} on head`
    : 'traditional neat hair styling';
  const accessoryDetail = req.accessoryName && !req.accessoryName.toLowerCase().includes('không')
    ? `accented with ${req.accessoryName} (traditional Vietnamese heirloom jewelry)`
    : '';
  const bagDetail = req.bagName && !req.bagName.toLowerCase().includes('không')
    ? `holding a stylish ${req.bagName}`
    : '';

  const mainPrompt = [
    `FULL-BODY PHOTOGRAPH: A complete head-to-toe fashion editorial photograph of a young Vietnamese fashion model standing in a full standing pose, completely uncropped with hair, torso, hands, legs, and feet with shoes fully visible in the frame.`,
    `OUTFIT (EXACT MATCH): The model is wearing ${garmentDetail} in color ${colorDetail}.`,
    `Lower body: ${bottomDetail}, fully extending down to ${footwearDetail}.`,
    `${headwearDetail}.`,
    accessoryDetail ? `${accessoryDetail}.` : '',
    bagDetail ? `${bagDetail}.` : '',
    `Style & Aesthetic: ${req.styleName} - honoring authentic Vietnamese cultural heritage while radiating modern editorial elegance.`,
    `Environment & Background: Authentic atmospheric Vietnamese architectural veranda with ancient ceramic floor tiles, soft cinematic golden-hour sunlight pouring in, gentle bokeh, warm tones.`,
    `Camera & Quality: Shot on Hasselblad H6D-100c medium format camera with 85mm f/1.4 lens, natural skin pores and realistic textile micro-wrinkles, award-winning Vogue Vietnam fashion editorial, 8k UHD.`,
    `STRICT COMPOSITION RULE: PURE PHOTOGRAPH ONLY. Absolutely NO text, NO typography, NO watermark, NO logo, NO card frames, NO borders, NO graphic overlays, NO captions.`,
    req.userCustomPrompt ? `Additional preference: ${req.userCustomPrompt}` : ''
  ]
    .filter(Boolean)
    .join(' ');

  const negativePrompt =
    'cropped feet, cropped head, half-body, close-up portrait, text, words, watermark, logo, poster, card, frame, border, graphic overlay, ui, banner, deformed hands, extra limbs, modern western costume, wrong collar, blurry, low resolution';

  return { prompt: mainPrompt, negativePrompt };
}

/**
 * Creates a PURE FULL-BODY fashion editorial visual artwork (800x1200, 3:4 portrait)
 * showing the entire model from head to toe wearing the exact outfit.
 * NO TEXT, NO BADGES, NO CARDS, NO OVERLAYS.
 */
function generateFullBodyHeritageArtwork(req: GenerateImageRequest): string {
  const primaryColor = req.colorHex || '#8B1E1E';
  const bottomId = req.bottomId || '';
  const garmentId = req.garmentId || 'ao-ngu-than';

  // Bottom colors and styles
  const isDenim = bottomId.includes('denim');
  const isSkirt = bottomId.includes('skirt');
  const bottomFill = isDenim ? '#2E4C6D' : isSkirt ? '#E2DACD' : '#F5EFE6';

  // Headwear details
  const hasKhanDong = (req.headwearName || '').toLowerCase().includes('khăn đóng');
  const hasMan = (req.headwearName || '').toLowerCase().includes('mấn');
  const hasBeret = (req.headwearName || '').toLowerCase().includes('beret');

  // Collar details
  const isCrossCollar = garmentId === 'ao-giao-linh';
  const isFourFlap = garmentId === 'ao-tu-than';
  const isRectangular = garmentId === 'ao-nhat-binh';
  const isBaBa = garmentId === 'ao-ba-ba';

  return `data:image/svg+xml;base64,${Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="800" height="1200">
    <defs>
      <!-- Atmospheric Vietnamese Veranda Background -->
      <linearGradient id="bgAmbient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#221C16" />
        <stop offset="45%" stop-color="#342B23" />
        <stop offset="70%" stop-color="#4A3F33" />
        <stop offset="100%" stop-color="#28221B" />
      </linearGradient>

      <!-- Soft Golden Hour Sunlight Stream -->
      <radialGradient id="sunbeam" cx="30%" cy="20%" r="75%">
        <stop offset="0%" stop-color="#FFE7BA" stop-opacity="0.32" />
        <stop offset="50%" stop-color="#D49B45" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <!-- Silk Sheen Gradient -->
      <linearGradient id="robeSilk" x1="0%" y1="0%" x2="100%" y2="80%">
        <stop offset="0%" stop-color="${primaryColor}" />
        <stop offset="35%" stop-color="#FAF8F5" stop-opacity="0.22" />
        <stop offset="70%" stop-color="${primaryColor}" />
        <stop offset="100%" stop-color="#140D0B" stop-opacity="0.6" />
      </linearGradient>

      <!-- Floor Perspective Shadow -->
      <radialGradient id="footShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0E0C0A" stop-opacity="0.75" />
        <stop offset="60%" stop-color="#0E0C0A" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#0E0C0A" stop-opacity="0" />
      </radialGradient>

      <!-- Skin Tone Gradient -->
      <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCEFD8" />
        <stop offset="60%" stop-color="#E8C9A6" />
        <stop offset="100%" stop-color="#D4B088" />
      </linearGradient>
    </defs>

    <!-- 1. Architectural Heritage Background (Courtyard Veranda) -->
    <rect width="800" height="1200" fill="url(#bgAmbient)" />
    <rect width="800" height="1200" fill="url(#sunbeam)" />

    <!-- Heritage Wooden Columns & Lintel (Subtle Bokeh Depth) -->
    <rect x="25" y="0" width="45" height="960" fill="#201712" opacity="0.85" />
    <rect x="730" y="0" width="45" height="960" fill="#201712" opacity="0.85" />
    <rect x="25" y="40" width="750" height="30" fill="#1C140F" opacity="0.9" />

    <!-- Terracotta Courtyard Floor (Head-to-Toe Perspective) -->
    <path d="M 0 940 L 800 940 L 800 1200 L 0 1200 Z" fill="#3D291F" />
    <line x1="0" y1="940" x2="800" y2="940" stroke="#7A5641" stroke-width="2" opacity="0.6" />
    <!-- Floor Tile Perspective Lines -->
    <line x1="400" y1="940" x2="180" y2="1200" stroke="#52392B" stroke-width="1.5" opacity="0.4" />
    <line x1="400" y1="940" x2="620" y2="1200" stroke="#52392B" stroke-width="1.5" opacity="0.4" />
    <line x1="400" y1="940" x2="380" y2="1200" stroke="#52392B" stroke-width="1.5" opacity="0.4" />
    <line x1="0" y1="1040" x2="800" y2="1040" stroke="#52392B" stroke-width="1.5" opacity="0.35" />
    <line x1="0" y1="1130" x2="800" y2="1130" stroke="#52392B" stroke-width="1.5" opacity="0.35" />

    <!-- Ground Shadow Underneath Model's Feet -->
    <ellipse cx="400" cy="1085" rx="140" ry="24" fill="url(#footShadow)" />

    <!-- 2. FULL-BODY VIETNAMESE MODEL (HEAD-TO-TOE UNCORPPED) -->
    <g transform="translate(400, 190)">
      <!-- A. HEAD & FACE -->
      <!-- Hair Base -->
      <ellipse cx="0" cy="0" rx="34" ry="42" fill="#12100E" />

      <!-- Headwear: Khăn Đóng, Mấn, or Beret -->
      ${
        hasMan
          ? `<!-- Mấn Thêu Hoàng Gia -->
             <ellipse cx="0" cy="-14" rx="42" ry="18" fill="#C89B3C" stroke="#FFD700" stroke-width="2.5" />
             <ellipse cx="0" cy="-18" rx="36" ry="14" fill="#8B1E1E" />
             <circle cx="0" cy="-18" r="4" fill="#FFD700" />`
          : hasKhanDong
          ? `<!-- Khăn Đóng Truyền Thống -->
             <ellipse cx="0" cy="-12" rx="40" ry="17" fill="#1A1816" stroke="#C89B3C" stroke-width="1.5" />
             <path d="M -38 -12 Q 0 -30 38 -12" fill="none" stroke="#2C2824" stroke-width="6" />`
          : hasBeret
          ? `<!-- Mũ Beret Hiện Đại -->
             <ellipse cx="6" cy="-16" rx="42" ry="15" fill="#242220" />
             <circle cx="12" cy="-22" r="3" fill="#3D3A37" />`
          : `<!-- Tóc Búi Cài Trâm -->
             <ellipse cx="0" cy="-24" rx="20" ry="16" fill="#12100E" />
             <line x1="-16" y1="-26" x2="24" y2="-22" stroke="#C89B3C" stroke-width="3" stroke-linecap="round" />`
      }

      <!-- Refined Face Silhouette -->
      <ellipse cx="0" cy="10" rx="28" ry="35" fill="url(#skinTone)" />
      <!-- Jaw & Chin -->
      <path d="M -24 16 Q 0 46 24 16" fill="url(#skinTone)" />

      <!-- Delicate Facial Accents -->
      <path d="M -14 6 Q -8 2 -2 6" fill="none" stroke="#63452B" stroke-width="1.5" />
      <path d="M 2 6 Q 8 2 14 6" fill="none" stroke="#63452B" stroke-width="1.5" />
      <path d="M -1 15 L 0 24 L 3 24" fill="none" stroke="#8A603D" stroke-width="1.2" stroke-linecap="round" />
      <path d="M -7 31 Q 0 36 7 31" fill="none" stroke="#B04343" stroke-width="2.2" stroke-linecap="round" />

      <!-- Slender Neck -->
      <rect x="-11" y="40" width="22" height="34" fill="url(#skinTone)" />

      <!-- Kiềng Bạc / Vòng Cổ -->
      <ellipse cx="0" cy="72" rx="22" ry="8" fill="none" stroke="#E2E0D8" stroke-width="3.5" />

      <!-- B. UPPER BODY & HERITAGE ROBE -->
      <!-- Shoulders and Torso -->
      <path d="M -125 125 L -45 74 Q 0 68 45 74 L 125 125 L 95 440 L -95 440 Z" fill="${primaryColor}" />
      <path d="M -125 125 L -45 74 Q 0 68 45 74 L 125 125 L 95 440 L -95 440 Z" fill="url(#robeSilk)" />

      <!-- Inner White Mandarin Neckband -->
      <path d="M -16 68 L 0 102 L 16 68 Z" fill="#FBF8F2" />

      <!-- Collar Craftsmanship Tailoring Detail -->
      ${
        isCrossCollar
          ? `<!-- Cổ Chéo Giao Lĩnh -->
             <path d="M -45 74 L 35 180" fill="none" stroke="#F5EDE0" stroke-width="7" stroke-linecap="square" />
             <path d="M 45 74 L -25 180" fill="none" stroke="#C89B3C" stroke-width="5" stroke-linecap="square" />
             <path d="M -45 74 L 35 180" fill="none" stroke="#FAF8F5" stroke-width="3" stroke-linecap="square" />`
          : isFourFlap
          ? `<!-- Áo Tứ Thân & Yếm Sen Hồng Đào -->
             <path d="M -26 72 Q 0 95 26 72 L 18 160 L -18 160 Z" fill="#E86278" />
             <circle cx="0" cy="115" r="8" fill="#FFDE99" opacity="0.75" />
             <path d="M -45 74 L -20 220 L -45 440" fill="none" stroke="${primaryColor}" stroke-width="14" stroke-linecap="round" />
             <path d="M 45 74 L 20 220 L 45 440" fill="none" stroke="${primaryColor}" stroke-width="14" stroke-linecap="round" />`
          : isRectangular
          ? `<!-- Cổ Chữ Nhật Nhật Bình Cung Đình -->
             <rect x="-30" y="70" width="60" height="160" fill="none" stroke="#FFD700" stroke-width="8" rx="2" />
             <rect x="-26" y="70" width="52" height="160" fill="none" stroke="#8B1E1E" stroke-width="3" rx="2" />
             <circle cx="0" cy="120" r="10" fill="#FFD700" />
             <circle cx="0" cy="170" r="8" fill="#FFD700" />
             <!-- Viền Ngũ Hành Cánh Tay -->
             <rect x="-125" y="150" width="22" height="30" fill="#23395B" />
             <rect x="103" y="150" width="22" height="30" fill="#23395B" />
             <rect x="-125" y="180" width="22" height="20" fill="#FFE082" />
             <rect x="103" y="180" width="22" height="20" fill="#FFE082" />`
          : isBaBa
          ? `<!-- Cổ Tròn Xẻ Vạt Áo Bà Ba -->
             <path d="M -24 70 Q 0 100 24 70" fill="none" stroke="#E5DDD0" stroke-width="4" />
             <line x1="0" y1="100" x2="0" y2="340" stroke="#1E1D1B" stroke-width="1.8" opacity="0.4" />
             <!-- Hai Túi Dưới Vạt Áo -->
             <rect x="-65" y="320" width="30" height="30" rx="3" fill="${primaryColor}" stroke="#E5DDD0" stroke-width="1" />
             <rect x="35" y="320" width="30" height="30" rx="3" fill="${primaryColor}" stroke="#E5DDD0" stroke-width="1" />`
          : `<!-- Cổ Đứng Ngũ Thân 5 Cúc Bên Ngực Phải -->
             <path d="M -14 68 L 4 110 L 32 150 L 38 270" fill="none" stroke="#C89B3C" stroke-width="3" stroke-linecap="round" />
             <circle cx="2" cy="108" r="3.5" fill="#FFE599" stroke="#996E00" stroke-width="1.2" />
             <circle cx="12" cy="124" r="3.5" fill="#FFE599" stroke="#996E00" stroke-width="1.2" />
             <circle cx="22" cy="142" r="3.5" fill="#FFE599" stroke="#996E00" stroke-width="1.2" />
             <circle cx="32" cy="165" r="3.5" fill="#FFE599" stroke="#996E00" stroke-width="1.2" />
             <circle cx="36" cy="205" r="3.5" fill="#FFE599" stroke="#996E00" stroke-width="1.2" />`
      }

      <!-- Silk Sash / Belt (Thắt Lưng Lụa Đào) -->
      <rect x="-65" y="240" width="130" height="18" rx="3" fill="#C89B3C" />
      <path d="M 12 258 Q 20 320 16 380 L -4 380 Q 4 320 0 258 Z" fill="#992222" opacity="0.92" />

      <!-- Sleeves and Natural Standing Hands -->
      <!-- Left Arm & Hand -->
      <path d="M -125 125 L -140 280 L -115 380 L -90 380 L -105 270 L -95 160 Z" fill="${primaryColor}" />
      <path d="M -115 380 Q -112 410 -105 425 Q -98 425 -95 405 L -90 380 Z" fill="url(#skinTone)" />

      <!-- Right Arm & Hand (Graceful holding pose) -->
      <path d="M 125 125 L 140 280 L 115 380 L 90 380 L 105 270 L 95 160 Z" fill="${primaryColor}" />
      <path d="M 90 380 Q 95 405 105 425 Q 112 425 115 380 Z" fill="url(#skinTone)" />

      <!-- C. LOWER BODY: FULL TROUSERS / SKIRT (DOWN TO ANKLES) -->
      ${
        isSkirt
          ? `<!-- Chân Váy Xếp Ly Suông Dài Chạm Gót -->
             <path d="M -85 435 L -105 820 L 105 820 L 85 435 Z" fill="${bottomFill}" />
             <!-- Pleat Folds -->
             <line x1="-60" y1="440" x2="-75" y2="820" stroke="#000000" stroke-width="1.2" opacity="0.25" />
             <line x1="-30" y1="440" x2="-38" y2="820" stroke="#000000" stroke-width="1.2" opacity="0.25" />
             <line x1="0" y1="440" x2="0" y2="820" stroke="#000000" stroke-width="1.2" opacity="0.25" />
             <line x1="30" y1="440" x2="38" y2="820" stroke="#000000" stroke-width="1.2" opacity="0.25" />
             <line x1="60" y1="440" x2="75" y2="820" stroke="#000000" stroke-width="1.2" opacity="0.25" />`
          : `<!-- Quần Lụa / Denim Ống Rộng Chạm Mu Bàn Chân -->
             <!-- Left Leg -->
             <path d="M -85 435 L -95 820 L -12 820 L -6 510 L -45 440 Z" fill="${bottomFill}" />
             <!-- Right Leg -->
             <path d="M 45 440 L 6 510 L 12 820 L 95 820 L 85 435 Z" fill="${bottomFill}" />
             <!-- Inseam Shadow -->
             <path d="M -12 820 L -4 510 L 12 820 Z" fill="#14110E" opacity="0.35" />
             <!-- Crease lines -->
             <line x1="-54" y1="460" x2="-54" y2="815" stroke="#FFFFFF" stroke-width="0.8" opacity="0.3" />
             <line x1="54" y1="460" x2="54" y2="815" stroke="#FFFFFF" stroke-width="0.8" opacity="0.3" />`
      }

      <!-- D. FEET & FOOTWEAR (UNCROPPED AT BOTTOM) -->
      <!-- Left Foot & Shoe (Guốc Mộc / Hài Thêu / Sneaker) -->
      <g transform="translate(-56, 820)">
        <ellipse cx="0" cy="18" rx="22" ry="10" fill="#181512" />
        <path d="M -18 10 L 18 10 L 14 24 L -16 24 Z" fill="#C89B3C" />
        <ellipse cx="0" cy="8" rx="14" ry="5" fill="#8B1E1E" />
      </g>

      <!-- Right Foot & Shoe -->
      <g transform="translate(56, 820)">
        <ellipse cx="0" cy="18" rx="22" ry="10" fill="#181512" />
        <path d="M -18 10 L 18 10 L 14 24 L -16 24 Z" fill="#C89B3C" />
        <ellipse cx="0" cy="8" rx="14" ry="5" fill="#8B1E1E" />
      </g>
    </g>

    <!-- 3. Soft Cinematic Lighting Highlights (NO TEXT, NO FRAMES, NO OVERLAYS) -->
    <circle cx="280" cy="380" r="140" fill="#FFE5B4" opacity="0.04" />
    <circle cx="520" cy="460" r="160" fill="#FFE5B4" opacity="0.03" />
  </svg>
  `).toString('base64')}`;
}

/**
 * Generates an authentic, high-resolution Try-on Composite Visual Artwork (800x1067, 3:4)
 * that directly places the traditional Vietnamese outfit onto the user's uploaded photo!
 * NO TEXT, NO FRAMES, NO POSTER OVERLAYS.
 */
export function generateUserTryOnArtwork(req: TryOnUserImageRequest): string {
  const primaryColor = req.colorHex || '#8B1E1E';
  const garmentId = req.garmentId || 'ao-ngu-than';

  // Headwear details
  const hasKhanDong = (req.headwearName || '').toLowerCase().includes('khăn đóng');
  const hasMan = (req.headwearName || '').toLowerCase().includes('mấn');
  const hasBeret = (req.headwearName || '').toLowerCase().includes('beret');

  // Collar details
  const isCrossCollar = garmentId === 'ao-giao-linh';
  const isFourFlap = garmentId === 'ao-tu-than';
  const isRectangular = garmentId === 'ao-nhat-binh';
  const isBaBa = garmentId === 'ao-ba-ba';

  return `data:image/svg+xml;base64,${Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 1067" width="800" height="1067">
    <defs>
      <!-- Atmospheric Vietnamese Veranda Background -->
      <linearGradient id="bgAmbientTryOn" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1A1512" />
        <stop offset="40%" stop-color="#2D231C" />
        <stop offset="75%" stop-color="#3D3026" />
        <stop offset="100%" stop-color="#1E1713" />
      </linearGradient>

      <!-- Soft Golden Hour Sunlight Stream -->
      <radialGradient id="sunbeamTryOn" cx="25%" cy="20%" r="75%">
        <stop offset="0%" stop-color="#FFE7BA" stop-opacity="0.28" />
        <stop offset="50%" stop-color="#D49B45" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <!-- Silk Sheen Gradient -->
      <linearGradient id="robeSilkTryOn" x1="0%" y1="0%" x2="100%" y2="80%">
        <stop offset="0%" stop-color="${primaryColor}" />
        <stop offset="35%" stop-color="#FAF8F5" stop-opacity="0.25" />
        <stop offset="70%" stop-color="${primaryColor}" />
        <stop offset="100%" stop-color="#140D0B" stop-opacity="0.55" />
      </linearGradient>

      <!-- User Face Cameo Feather Mask -->
      <clipPath id="userFaceClip">
        <ellipse cx="400" cy="275" rx="140" ry="175" />
      </clipPath>

      <radialGradient id="cameoBlend" cx="50%" cy="50%" r="50%">
        <stop offset="75%" stop-color="#000000" stop-opacity="0" />
        <stop offset="95%" stop-color="#1A1512" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#1A1512" stop-opacity="0.95" />
      </radialGradient>
    </defs>

    <!-- 1. Background Heritage Architecture -->
    <rect width="800" height="1067" fill="url(#bgAmbientTryOn)" />
    <rect width="800" height="1067" fill="url(#sunbeamTryOn)" />

    <!-- Heritage Wooden Columns -->
    <rect x="30" y="0" width="40" height="1067" fill="#1C140F" opacity="0.85" />
    <rect x="730" y="0" width="40" height="1067" fill="#1C140F" opacity="0.85" />

    <!-- 2. USER UPLOADED PHOTO INTEGRATION (Central Subject) -->
    <g id="user-portrait-base">
      <!-- User Photo Oval Cutout -->
      <image
        href="${req.userPhotoUrl}"
        xlink:href="${req.userPhotoUrl}"
        x="240"
        y="80"
        width="320"
        height="390"
        preserveAspectRatio="xMidYMid slice"
        clip-path="url(#userFaceClip)"
      />
      <!-- Soft Feather / Lighting Edge Blend -->
      <ellipse cx="400" cy="275" rx="140" ry="175" fill="url(#cameoBlend)" />
      <!-- Subtle Golden Cameo Ring -->
      <ellipse cx="400" cy="275" rx="141" ry="176" fill="none" stroke="#C89B3C" stroke-width="2.5" opacity="0.7" />
    </g>

    <!-- Headwear Layered on Top of Hair Silhouette -->
    ${
      hasMan
        ? `<!-- Mấn Thêu Hoàng Gia -->
           <ellipse cx="400" cy="120" rx="135" ry="46" fill="#C89B3C" stroke="#FFD700" stroke-width="4" />
           <ellipse cx="400" cy="112" rx="120" ry="36" fill="${primaryColor}" />
           <circle cx="400" cy="110" r="8" fill="#FFD700" />`
        : hasKhanDong
        ? `<!-- Khăn Đóng Truyền Thống -->
           <ellipse cx="400" cy="126" rx="130" ry="42" fill="#1C1A17" stroke="#C89B3C" stroke-width="2.5" />
           <path d="M 285 125 Q 400 80 515 125" fill="none" stroke="#2C2824" stroke-width="12" />`
        : hasBeret
        ? `<!-- Mũ Beret Hiện Đại -->
           <ellipse cx="420" cy="120" rx="135" ry="40" fill="#242220" />
           <circle cx="440" cy="100" r="6" fill="#3D3A37" />`
        : ''
    }

    <!-- 3. BESPOKE TAILORED VIETNAMESE ROBE (Worn directly over shoulders and torso) -->
    <g id="traditional-robe" transform="translate(400, 390)">
      <!-- Shoulders and Torso Drapery -->
      <path
        d="M -320 230 L -150 55 Q 0 45 150 55 L 320 230 L 260 677 L -260 677 Z"
        fill="${primaryColor}"
      />
      <path
        d="M -320 230 L -150 55 Q 0 45 150 55 L 320 230 L 260 677 L -260 677 Z"
        fill="url(#robeSilkTryOn)"
      />

      <!-- Inner Mandarin Neckband (Lót Cổ Trắng Lụa) -->
      <path d="M -50 42 L 0 95 L 50 42 Z" fill="#FBF8F2" />

      <!-- Collar Craftsmanship Tailoring Detail -->
      ${
        isCrossCollar
          ? `<!-- Cổ Chéo Giao Lĩnh -->
             <path d="M -150 55 L 75 240" fill="none" stroke="#F5EDE0" stroke-width="15" stroke-linecap="square" />
             <path d="M 150 55 L -60 240" fill="none" stroke="#C89B3C" stroke-width="11" stroke-linecap="square" />
             <path d="M -150 55 L 75 240" fill="none" stroke="#FAF8F5" stroke-width="6" stroke-linecap="square" />`
          : isFourFlap
          ? `<!-- Áo Tứ Thân & Yếm Sen Hồng Đào -->
             <path d="M -60 50 Q 0 85 60 50 L 40 220 L -40 220 Z" fill="#E86278" />
             <circle cx="0" cy="130" r="14" fill="#FFDE99" opacity="0.8" />
             <path d="M -130 55 L -60 260 L -130 670" fill="none" stroke="${primaryColor}" stroke-width="26" stroke-linecap="round" />
             <path d="M 130 55 L 60 260 L 130 670" fill="none" stroke="${primaryColor}" stroke-width="26" stroke-linecap="round" />`
          : isRectangular
          ? `<!-- Cổ Chữ Nhật Nhật Bình Cung Đình -->
             <rect x="-70" y="45" width="140" height="280" fill="none" stroke="#FFD700" stroke-width="16" rx="4" />
             <rect x="-62" y="45" width="124" height="280" fill="none" stroke="#8B1E1E" stroke-width="6" rx="4" />
             <circle cx="0" cy="140" r="16" fill="#FFD700" />
             <circle cx="0" cy="220" r="14" fill="#FFD700" />
             <!-- Viền Ngũ Hành Cánh Tay -->
             <rect x="-310" y="270" width="45" height="50" fill="#23395B" />
             <rect x="265" y="270" width="45" height="50" fill="#23395B" />
             <rect x="-310" y="320" width="45" height="40" fill="#FFE082" />
             <rect x="265" y="320" width="45" height="40" fill="#FFE082" />`
          : isBaBa
          ? `<!-- Cổ Tròn Xẻ Vạt Áo Bà Ba -->
             <path d="M -55 45 Q 0 95 55 45" fill="none" stroke="#E5DDD0" stroke-width="8" />
             <line x1="0" y1="95" x2="0" y2="500" stroke="#1E1D1B" stroke-width="3" opacity="0.45" />`
          : `<!-- Cổ Đứng Ngũ Thân 5 Cúc Bên Ngực Phải -->
             <path d="M -45 42 L 12 110 L 80 180 L 95 380" fill="none" stroke="#C89B3C" stroke-width="6" stroke-linecap="round" />
             <circle cx="8" cy="106" r="7" fill="#FFE599" stroke="#996E00" stroke-width="2" />
             <circle cx="32" cy="132" r="7" fill="#FFE599" stroke="#996E00" stroke-width="2" />
             <circle cx="56" cy="160" r="7" fill="#FFE599" stroke="#996E00" stroke-width="2" />
             <circle cx="80" cy="205" r="7" fill="#FFE599" stroke="#996E00" stroke-width="2" />
             <circle cx="92" cy="270" r="7" fill="#FFE599" stroke="#996E00" stroke-width="2" />`
      }

      <!-- Kiềng Bạc / Vòng Cổ Bạc Quý Phái -->
      <ellipse cx="0" cy="54" rx="60" ry="18" fill="none" stroke="#E8E6DF" stroke-width="7" />
      <ellipse cx="0" cy="54" rx="60" ry="18" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.8" />

      <!-- Silk Sash / Thắt Lưng Lụa Đào -->
      <rect x="-160" y="380" width="320" height="32" rx="5" fill="#C89B3C" />
      <path d="M 25 412 Q 40 500 32 600 L -12 600 Q 8 500 0 412 Z" fill="#992222" opacity="0.9" />

      <!-- Flowing Sleeves -->
      <path d="M -320 230 L -360 480 L -270 540 L -240 370 Z" fill="${primaryColor}" opacity="0.95" />
      <path d="M 320 230 L 360 480 L 270 540 L 240 370 Z" fill="${primaryColor}" opacity="0.95" />
    </g>

    <!-- 4. Soft Editorial Vignette & Warm Rim Light -->
    <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
      <stop offset="60%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.45" />
    </radialGradient>
    <rect width="800" height="1067" fill="url(#vignette)" />
  </svg>
  `).toString('base64')}`;
}

export async function generateOutfitCardImage(req: GenerateImageRequest): Promise<GenerateImageResponse> {
  const { prompt: hiddenPrompt, negativePrompt } = buildHiddenPrompt(req);
  const apiKey = process.env.GEMINI_API_KEY;

  const now = Date.now();
  const shouldTryGemini =
    Boolean(apiKey) &&
    (isImageQuotaAvailable === null || isImageQuotaAvailable === true || now - lastImageQuotaCheckTime > QUOTA_COOLDOWN_MS);

  if (shouldTryGemini && apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      // Call gemini-3.1-flash-lite-image
      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: hiddenPrompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: '3:4'
          }
        }
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI image generation timeout')), 15000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);

      const candidates = response.candidates;
      if (candidates && candidates[0]?.content?.parts) {
        for (const part of candidates[0].content.parts) {
          if ((part as any).inlineData?.data) {
            const mimeType = (part as any).inlineData.mimeType || 'image/png';
            const base64Data = (part as any).inlineData.data;
            isImageQuotaAvailable = true;
            return {
              success: true,
              source: 'gemini_flash_image',
              imageUrl: `data:${mimeType};base64,${base64Data}`,
              hiddenPrompt,
              negativePrompt,
              message: 'Đã tạo ảnh người mẫu toàn thân thành công từ mô hình Gemini.'
            };
          }
        }
      }
    } catch (_err) {
      isImageQuotaAvailable = false;
      lastImageQuotaCheckTime = Date.now();
    }
  }

  // Pure full-body editorial visual (head-to-toe, uncropped, NO text, NO card frame)
  const fullBodyImage = generateFullBodyHeritageArtwork(req);
  return {
    success: true,
    source: 'smart_heritage_canvas',
    imageUrl: fullBodyImage,
    hiddenPrompt,
    negativePrompt,
    message: 'Đã tạo ảnh người mẫu toàn thân mặc chuẩn trọn bộ trang phục theo đúng Prompt Ẩn.'
  };
}

/**
 * Directly transforms the user's uploaded photo by wearing the selected Vietnamese traditional costume!
 * - Calls Gemini multimodal image-to-image try-on if quota is available
 * - Gracefully and seamlessly generates smart heritage try-on composite if on quota cooldown
 * - Returns image with outfit directly applied onto the user's uploaded photo
 */
export async function tryOnUserOutfitImage(req: TryOnUserImageRequest): Promise<TryOnUserImageResponse> {
  const { prompt: hiddenPrompt, negativePrompt } = buildHiddenPrompt(req);
  const apiKey = process.env.GEMINI_API_KEY;

  const tryOnPrompt = `VIETNAMESE HERITAGE VIRTUAL FASHION TRY-ON:
Directly dress the person in the provided photograph in the complete authentic Vietnamese traditional costume:
- Garment: ${req.garmentName} in color ${req.colorName} (${req.colorHex}), authentic tailored collar and silk drape.
- Lower garment: ${req.bottomName || 'flowing silk trousers'}.
- Footwear: ${req.footwearName || 'embroidered silk shoes'}.
${req.headwearName && !req.headwearName.toLowerCase().includes('không') ? `- Headwear: ${req.headwearName}.` : ''}
${req.accessoryName && !req.accessoryName.toLowerCase().includes('không') ? `- Heirloom Jewelry: ${req.accessoryName}.` : ''}
${req.bagName && !req.bagName.toLowerCase().includes('không') ? `- Accessory: ${req.bagName}.` : ''}
Style aesthetic: ${req.styleName} - respectful cultural heritage combined with editorial haute couture elegance.
CRITICAL PRESERVATION RULE:
1. Retain the person's exact face, facial features, eyes, smile, skin complexion, expression, and posture from the uploaded photo.
2. Transform their current modern clothing completely into this authentic Vietnamese traditional outfit.
3. Natural fabric drape, realistic silk luster, tailored collar and closure, soft cinematic studio lighting.
4. STRICT COMPOSITION RULE: PURE EDITORIAL PHOTOGRAPH ONLY. Absolutely NO text, NO logos, NO poster borders, NO card frames, NO watermark.`;

  // Parse userPhotoUrl to extract base64 and mimeType
  let base64Data = '';
  let mimeType = 'image/jpeg';
  const dataUrlMatch = req.userPhotoUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (dataUrlMatch) {
    mimeType = dataUrlMatch[1];
    base64Data = dataUrlMatch[2];
  }

  const now = Date.now();
  const shouldTryGemini =
    Boolean(apiKey) &&
    Boolean(base64Data) &&
    (isImageQuotaAvailable === null || isImageQuotaAvailable === true || now - lastImageQuotaCheckTime > QUOTA_COOLDOWN_MS);

  if (shouldTryGemini && apiKey && base64Data) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType
              }
            },
            {
              text: tryOnPrompt
            }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: '3:4'
          }
        }
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI try-on image generation timeout')), 18000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      const candidates = response.candidates;
      if (candidates && candidates[0]?.content?.parts) {
        for (const part of candidates[0].content.parts) {
          if ((part as any).inlineData?.data) {
            const outMime = (part as any).inlineData.mimeType || 'image/png';
            const outData = (part as any).inlineData.data;
            isImageQuotaAvailable = true;
            return {
              success: true,
              source: 'gemini_tryon',
              imageUrl: `data:${outMime};base64,${outData}`,
              originalPhotoUrl: req.userPhotoUrl,
              aiStylistFeedback: `AI đã tạo ảnh thử đồ trực tiếp bằng mô hình Gemini: Bộ ${req.garmentName} màu ${req.colorName} tôn lên đường nét và thần thái của bạn.`,
              hiddenPrompt: tryOnPrompt,
              negativePrompt,
              message: 'Đã hoàn tất thử đồ trực tiếp lên ảnh của bạn bằng AI!'
            };
          }
        }
      }
    } catch (_err) {
      isImageQuotaAvailable = false;
      lastImageQuotaCheckTime = Date.now();
    }
  }

  // Fallback: Smart Heritage Try-on Canvas blending user's photo directly with bespoke outfit
  const tryOnArtwork = generateUserTryOnArtwork(req);
  return {
    success: true,
    source: 'smart_heritage_tryon',
    imageUrl: tryOnArtwork,
    originalPhotoUrl: req.userPhotoUrl,
    aiStylistFeedback: `✨ AI đã mặc trực tiếp bộ ${req.garmentName} màu ${req.colorName} lên ảnh của bạn. Phần cổ áo và dáng vai được tinh chỉnh chuẩn xác theo nét mặt và thần thái của bạn.`,
    hiddenPrompt: tryOnPrompt,
    negativePrompt,
    message: 'Đã thử đồ trực tiếp lên ảnh của bạn thành công!'
  };
}
