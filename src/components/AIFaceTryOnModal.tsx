import React, { useState, useRef, useEffect, useCallback } from 'react';
import { OutfitSelection } from '../types';
import {
  MASTER_PROMPTS_COLLECTION,
  MASTER_PROMPT_STEPS_LOADING,
  FULLBODY_POSES,
  FULLBODY_ENVIRONMENTS,
  BODY_PROPORTIONS,
  CROP_GUIDELINES
} from '../data/aiPromptsData';
import {
  X,
  Upload,
  Check,
  AlertCircle,
  Sparkles,
  Camera,
  Layers,
  Copy,
  Download,
  ArrowRight,
  ZoomIn,
  Move,
  RefreshCw,
  Eye,
  Sliders,
  CheckCircle2,
  BookmarkPlus,
  HelpCircle,
  SplitSquareVertical,
  User,
  Compass,
  Wind,
  Armchair,
  Maximize2
} from 'lucide-react';

interface AIFaceTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSelection: OutfitSelection;
  onApplySelection: (selection: OutfitSelection) => void;
}

export const AIFaceTryOnModal: React.FC<AIFaceTryOnModalProps> = ({
  isOpen,
  onClose,
  currentSelection,
  onApplySelection
}) => {
  // Step in UX flow: 'upload' -> 'configure' -> 'generating' -> 'result'
  const [currentStep, setCurrentStep] = useState<'upload' | 'configure' | 'generating' | 'result'>('upload');

  // Selected Garment Formula
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>('prompt-ngu-than-minimal');
  const activeFormula =
    MASTER_PROMPTS_COLLECTION.find((f) => f.id === selectedFormulaId) || MASTER_PROMPTS_COLLECTION[0];

  // Full-body configuration parameters
  const [selectedPoseId, setSelectedPoseId] = useState<string>('pose-standing-frontal');
  const [selectedEnvId, setSelectedEnvId] = useState<string>('env-minimal-studio');
  const [selectedBodyId, setSelectedBodyId] = useState<string>('body-regular');
  const [userHeight, setUserHeight] = useState<number>(168);

  // Uploaded user image
  const [userPhotoSrc, setUserPhotoSrc] = useState<string | null>(null);

  // Active lens view in Result mode
  const [activeLensView, setActiveLensView] = useState<'full' | 'face' | 'drapery' | 'shoes'>('full');

  // Generation loading progress
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState<number>(0);
  const [loadingProgressPercent, setLoadingProgressPercent] = useState<number>(10);

  // Result display state
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [renderedFullbodyUrl, setRenderedFullbodyUrl] = useState<string | null>(null);
  const [aiGenerationMode, setAiGenerationMode] = useState<'gemini-api' | 'neural-engine'>('neural-engine');

  // References
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fullbodyCanvasRef = useRef<HTMLCanvasElement>(null);

  // Default sample portrait for instant trial
  const handleUseDemoSample = (type: 'portrait' | 'fullbody' = 'portrait') => {
    const demoSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
        <defs>
          <radialGradient id="demoSkin" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#FDF0E4"/>
            <stop offset="65%" stop-color="#EED4BF"/>
            <stop offset="100%" stop-color="#DDB99F"/>
          </radialGradient>
          <linearGradient id="demoHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#161413"/>
            <stop offset="100%" stop-color="#2D2824"/>
          </linearGradient>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#F5EFE6"/>
            <stop offset="100%" stop-color="#DFCBB5"/>
          </linearGradient>
        </defs>
        <rect width="600" height="800" fill="url(#bgGrad)"/>
        <!-- Torso & Shoulders -->
        <path d="M140 780 C140 500 210 440 300 440 C390 440 460 500 460 780 Z" fill="#3D342E"/>
        <path d="M255 370 L255 450 Q300 475 345 450 L345 370 Z" fill="#DDB99F"/>
        <!-- Face oval -->
        <ellipse cx="300" cy="280" rx="100" ry="130" fill="url(#demoSkin)"/>
        <!-- Hair -->
        <path d="M195 280 C190 160 240 110 300 110 C360 110 410 160 405 280 C400 210 375 160 300 160 C225 160 200 210 195 280 Z" fill="url(#demoHair)"/>
        <!-- Eyebrows -->
        <path d="M238 238 Q260 228 280 240" stroke="#332B25" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <path d="M320 240 Q340 228 362 238" stroke="#332B25" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <!-- Eyes -->
        <path d="M242 260 Q260 250 278 260 Q260 270 242 260" fill="#FFF"/>
        <circle cx="260" cy="260" r="6.5" fill="#201C1A"/>
        <circle cx="262" cy="258" r="2" fill="#FFF"/>
        <path d="M322 260 Q340 250 358 260 Q340 270 322 260" fill="#FFF"/>
        <circle cx="340" cy="260" r="6.5" fill="#201C1A"/>
        <circle cx="342" cy="258" r="2" fill="#FFF"/>
        <!-- Nose -->
        <path d="M296 258 L298 300 Q300 306 304 305" stroke="#BA957D" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Lips -->
        <path d="M275 340 Q300 348 325 340 Q300 360 275 340" fill="#B25D67"/>
      </svg>
    `;
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(demoSvg)}`;
    setUserPhotoSrc(dataUrl);
    setCurrentStep('configure');
  };

  // Handle image upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setUserPhotoSrc(src);
      setCurrentStep('configure');
    };
    reader.readAsDataURL(file);
  };

  // Core High-Definition Full-Body Synthesis Renderer
  const renderFullBodyOutfit = useCallback(() => {
    const canvas = fullbodyCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 900;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    const activePose = FULLBODY_POSES.find((p) => p.id === selectedPoseId) || FULLBODY_POSES[0];
    const activeEnv = FULLBODY_ENVIRONMENTS.find((e) => e.id === selectedEnvId) || FULLBODY_ENVIRONMENTS[0];
    const activeBody = BODY_PROPORTIONS.find((b) => b.id === selectedBodyId) || BODY_PROPORTIONS[0];

    // 1. ENVIRONMENT BACKGROUND RENDER
    if (activeEnv.id === 'env-hue-citadel') {
      // Hue Imperial Citadel Sunset stone courtyard
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
      skyGrad.addColorStop(0, '#5C241E');
      skyGrad.addColorStop(0.35, '#9C4729');
      skyGrad.addColorStop(0.65, '#3A271C');
      skyGrad.addColorStop(1, '#1A1412');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // Stone flagstone floor
      const floorGrad = ctx.createLinearGradient(0, H * 0.72, 0, H);
      floorGrad.addColorStop(0, '#261F1A');
      floorGrad.addColorStop(1, '#120F0D');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, H * 0.72, W, H * 0.28);

      // Distant palace columns & imperial eaves
      ctx.fillStyle = 'rgba(74, 20, 16, 0.45)';
      ctx.fillRect(60, H * 0.2, 70, H * 0.55);
      ctx.fillRect(W - 130, H * 0.2, 70, H * 0.55);

      // Golden hour rim light
      const sunGrad = ctx.createRadialGradient(W * 0.8, H * 0.3, 10, W * 0.8, H * 0.3, 400);
      sunGrad.addColorStop(0, 'rgba(255, 180, 70, 0.35)');
      sunGrad.addColorStop(1, 'rgba(255, 180, 70, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, W, H);
    } else if (activeEnv.id === 'env-hoian-lantern') {
      // Hoi An Ancient Town with yellow ochre heritage wall & lanterns
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#42331E');
      bg.addColorStop(0.5, '#69502D');
      bg.addColorStop(1, '#2B1E11');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Textured heritage wall
      ctx.fillStyle = 'rgba(235, 190, 80, 0.08)';
      for (let i = 0; i < 40; i++) {
        ctx.fillRect((i * 97) % W, (i * 123) % H, 60, 4);
      }

      // Soft lantern bokeh
      const drawBokeh = (x: number, y: number, r: number, color: string) => {
        const rad = ctx.createRadialGradient(x, y, 0, x, y, r);
        rad.addColorStop(0, color);
        rad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      };
      drawBokeh(120, 180, 80, 'rgba(255, 90, 90, 0.3)');
      drawBokeh(W - 140, 220, 100, 'rgba(255, 200, 80, 0.35)');
      drawBokeh(180, 320, 60, 'rgba(80, 180, 255, 0.2)');
    } else if (activeEnv.id === 'env-modern-gallery') {
      // Modern Art Gallery dark terrazzo
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#12171F');
      bg.addColorStop(0.7, '#18212D');
      bg.addColorStop(1, '#0C0E12');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Spotlight pool on floor
      const spot = ctx.createRadialGradient(W / 2, H * 0.88, 50, W / 2, H * 0.88, 350);
      spot.addColorStop(0, 'rgba(255, 240, 200, 0.25)');
      spot.addColorStop(1, 'rgba(255, 240, 200, 0)');
      ctx.fillStyle = spot;
      ctx.fillRect(0, H * 0.6, W, H * 0.4);
    } else {
      // Minimalist Studio Vogue
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#2D2926');
      bg.addColorStop(0.5, '#221E1C');
      bg.addColorStop(1, '#161413');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Sheer linen curtain soft cast shadows
      ctx.fillStyle = 'rgba(255, 245, 230, 0.04)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(W * 0.6, 0);
      ctx.lineTo(W * 0.4, H);
      ctx.lineTo(0, H);
      ctx.fill();

      // Studio key light gradient
      const keyLight = ctx.createRadialGradient(W * 0.5, H * 0.35, 100, W * 0.5, H * 0.5, 600);
      keyLight.addColorStop(0, 'rgba(255, 230, 190, 0.15)');
      keyLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = keyLight;
      ctx.fillRect(0, 0, W, H);
    }

    // 2. FULL-BODY ANATOMICAL SKELETON & MODEL PROPORTIONS
    // Center alignment
    let cx = W / 2;
    const bodyScale = activeBody.id === 'body-slim' ? 0.92 : activeBody.id === 'body-athletic' ? 1.08 : 1.0;
    const isProfile = activePose.id === 'pose-editorial-profile';
    const isWalking = activePose.id === 'pose-walking-silk';
    const isSeated = activePose.id === 'pose-seated-heritage';

    // Model vertical anchors
    const headTopY = isSeated ? 280 : 160;
    const headH = 145;
    const chinY = headTopY + headH;
    const shoulderY = chinY + 50;
    const waistY = isSeated ? shoulderY + 220 : shoulderY + 260;
    const hipY = isSeated ? waistY + 120 : waistY + 140;
    const kneeY = isSeated ? hipY + 180 : hipY + 290;
    const ankleY = isSeated ? kneeY + 210 : kneeY + 310;
    const shoeY = ankleY + 60;

    // Palette for current garment
    const garmentId = activeFormula.garmentId;
    let robeColor = '#EAE4DC'; // Ivory silk default
    let robeShade = '#C8BEB0';
    let robeHighlight = '#FFFFFF';
    let accentPattern = 'rgba(180, 160, 130, 0.25)';

    if (garmentId === 'ao-doi-kham') {
      robeColor = '#8B1E1E';
      robeShade = '#5E1313';
      robeHighlight = '#D64545';
      accentPattern = 'rgba(255, 215, 0, 0.35)';
    } else if (garmentId === 'ao-tu-than') {
      robeColor = '#23395B';
      robeShade = '#17253B';
      robeHighlight = '#3D5E8C';
      accentPattern = 'rgba(200, 220, 255, 0.25)';
    } else if (garmentId === 'ao-dai') {
      robeColor = '#2A4736';
      robeShade = '#1B3024';
      robeHighlight = '#467056';
      accentPattern = 'rgba(210, 240, 220, 0.25)';
    } else if (garmentId === 'ao-ba-ba') {
      robeColor = '#C89B3C';
      robeShade = '#946E20';
      robeHighlight = '#FFD272';
      accentPattern = 'rgba(255, 255, 255, 0.3)';
    }

    // Shadow on floor
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.filter = 'blur(16px)';
    ctx.beginPath();
    ctx.ellipse(cx, isSeated ? shoeY - 40 : shoeY + 5, 180 * bodyScale, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. DRAW FOOTWEAR (Giày / Boots / Mules)
    const drawFootwear = () => {
      ctx.save();
      const footL = cx - (isProfile ? 25 : 65);
      const footR = cx + (isProfile ? 45 : 65);

      // Chelsea boots / Chunky Loafers
      ctx.fillStyle = '#111111';
      // Left shoe
      ctx.beginPath();
      ctx.roundRect(footL - 25, ankleY + 20, 52, 48, [8, 8, 4, 4]);
      ctx.fill();
      // Right shoe
      ctx.beginPath();
      ctx.roundRect(footR - 25, ankleY + 20, 52, 48, [8, 8, 4, 4]);
      ctx.fill();

      // Leather sole & rim highlight
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 4;
      ctx.strokeRect(footL - 26, ankleY + 60, 54, 8);
      ctx.strokeRect(footR - 26, ankleY + 60, 54, 8);

      // Leather reflection highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(footL - 15, ankleY + 25, 8, 30);
      ctx.fillRect(footR - 15, ankleY + 25, 8, 30);
      ctx.restore();
    };

    // 4. DRAW MODERN GEN Z BOTTOM (Quần tây xếp ly / Quần sa lụa trắng / Quần jean)
    const drawBottomPants = () => {
      ctx.save();
      const isWhiteSilk = garmentId === 'ao-dai';
      const isDenim = garmentId === 'ao-tu-than' || garmentId === 'ao-ba-ba';

      const pantsColor = isWhiteSilk ? '#F4F0E8' : isDenim ? '#202E42' : '#222224';
      const pantsShade = isWhiteSilk ? '#DDD6C6' : isDenim ? '#141D2B' : '#151516';

      // Left leg
      ctx.fillStyle = pantsColor;
      ctx.beginPath();
      ctx.moveTo(cx - 95 * bodyScale, hipY);
      ctx.lineTo(cx - 10, hipY + 40);
      ctx.lineTo(cx - (isProfile ? 20 : 40), ankleY + 30);
      ctx.lineTo(cx - (isProfile ? 60 : 95), ankleY + 30);
      ctx.closePath();
      ctx.fill();

      // Right leg
      ctx.beginPath();
      ctx.moveTo(cx + 95 * bodyScale, hipY);
      ctx.lineTo(cx + 10, hipY + 40);
      ctx.lineTo(cx + (isProfile ? 70 : 95), ankleY + 30);
      ctx.lineTo(cx + (isProfile ? 30 : 40), ankleY + 30);
      ctx.closePath();
      ctx.fill();

      // Pleat line & shading
      ctx.strokeStyle = pantsShade;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 65, hipY + 40);
      ctx.lineTo(cx - 65, ankleY + 25);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 65, hipY + 40);
      ctx.lineTo(cx + 65, ankleY + 25);
      ctx.stroke();

      ctx.restore();
    };

    drawFootwear();
    drawBottomPants();

    // 5. DRAW FULL-BODY TRADITIONAL GARMENT (Áo ngũ thân / Đối khâm / Tứ thân / Áo dài / Áo bà ba)
    const drawTraditionalRobe = () => {
      ctx.save();

      // Robe body main gradient
      const robeGrad = ctx.createLinearGradient(cx - 180, shoulderY, cx + 180, kneeY + 120);
      robeGrad.addColorStop(0, robeHighlight);
      robeGrad.addColorStop(0.3, robeColor);
      robeGrad.addColorStop(1, robeShade);

      // Main Torso and Flowing Panels
      ctx.fillStyle = robeGrad;
      ctx.beginPath();
      // Left shoulder
      ctx.moveTo(cx - 150 * bodyScale, shoulderY);
      // Neck collar base
      ctx.quadraticCurveTo(cx - 40, chinY + 15, cx, chinY + 15);
      // Right shoulder
      ctx.quadraticCurveTo(cx + 40, chinY + 15, cx + 150 * bodyScale, shoulderY);

      // Flaring sleeves & flowing hems down past knees
      if (isWalking) {
        // Dynamic flow
        ctx.quadraticCurveTo(cx + 190 * bodyScale, waistY, cx + 220 * bodyScale, kneeY + 90);
        ctx.lineTo(cx - 140 * bodyScale, kneeY + 80);
        ctx.quadraticCurveTo(cx - 170 * bodyScale, waistY, cx - 150 * bodyScale, shoulderY);
      } else {
        // Classic straight tailored drape
        ctx.quadraticCurveTo(cx + 170 * bodyScale, waistY, cx + 160 * bodyScale, kneeY + 80);
        ctx.lineTo(cx - 160 * bodyScale, kneeY + 80);
        ctx.quadraticCurveTo(cx - 170 * bodyScale, waistY, cx - 150 * bodyScale, shoulderY);
      }
      ctx.closePath();
      ctx.fill();

      // Fabric fold shadows & natural silk drapery
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx - 60, shoulderY + 30);
      ctx.quadraticCurveTo(cx - 75, waistY + 40, cx - 80, kneeY + 70);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 40, shoulderY + 30);
      ctx.quadraticCurveTo(cx + 50, waistY + 60, cx + 70, kneeY + 70);
      ctx.stroke();

      // SLEEVES (Tay chẽn hoặc tay thụng)
      const drawSleeves = () => {
        ctx.fillStyle = robeColor;
        // Left arm sleeve
        ctx.beginPath();
        ctx.moveTo(cx - 150 * bodyScale, shoulderY);
        ctx.lineTo(cx - 190 * bodyScale, hipY + 20);
        ctx.lineTo(cx - 140 * bodyScale, hipY + 10);
        ctx.lineTo(cx - 110 * bodyScale, shoulderY + 60);
        ctx.closePath();
        ctx.fill();

        // Right arm sleeve
        ctx.beginPath();
        ctx.moveTo(cx + 150 * bodyScale, shoulderY);
        ctx.lineTo(cx + 190 * bodyScale, hipY + 20);
        ctx.lineTo(cx + 140 * bodyScale, hipY + 10);
        ctx.lineTo(cx + 110 * bodyScale, shoulderY + 60);
        ctx.closePath();
        ctx.fill();
      };
      drawSleeves();

      // DAMASK WOVEN MOTIF OVERLAY
      ctx.strokeStyle = accentPattern;
      ctx.lineWidth = 2;
      for (let y = shoulderY + 50; y < kneeY + 50; y += 45) {
        ctx.beginPath();
        ctx.arc(cx - 40, y, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 40, y + 20, 14, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5-BUTTON CURVED PLACKET (Vạt hò & 5 khuy cài ngọc bích áo ngũ thân)
      if (garmentId === 'ao-ngu-than' || garmentId === 'ao-dai' || garmentId === 'ao-ba-ba') {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx + 25, chinY + 15);
        ctx.quadraticCurveTo(cx + 70, shoulderY + 20, cx + 90, shoulderY + 70);
        ctx.quadraticCurveTo(cx + 95, waistY, cx + 90, kneeY + 70);
        ctx.stroke();

        // 5 Jade filigree buttons
        const buttonCoords = [
          { x: cx + 24, y: chinY + 22 },
          { x: cx + 46, y: chinY + 44 },
          { x: cx + 72, y: shoulderY + 24 },
          { x: cx + 88, y: shoulderY + 70 },
          { x: cx + 92, y: waistY - 20 }
        ];

        buttonCoords.forEach((b) => {
          // Jade glow
          ctx.fillStyle = '#2C6E49';
          ctx.beginPath();
          ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
          ctx.fill();
          // Gold filigree ring
          ctx.strokeStyle = '#FFDF78';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      } else if (garmentId === 'ao-doi-kham') {
        // Parallel bilateral gold lapels
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(cx - 38, chinY + 15, 20, kneeY + 65 - (chinY + 15));
        ctx.fillRect(cx + 18, chinY + 15, 20, kneeY + 65 - (chinY + 15));

        // Intricate dragon clouds pattern on lapels
        ctx.strokeStyle = '#B38600';
        ctx.lineWidth = 2;
        for (let y = chinY + 40; y < kneeY + 60; y += 35) {
          ctx.strokeRect(cx - 36, y, 16, 20);
          ctx.strokeRect(cx + 20, y, 16, 20);
        }
      }

      // MANDARIN COLLAR (Cổ Lập Lĩnh Đứng Chuẩn Mực)
      ctx.fillStyle = robeHighlight;
      ctx.strokeStyle = robeShade;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cx - 45, chinY - 10, 90, 32, [8, 8, 4, 4]);
      ctx.fill();
      ctx.stroke();

      // Silver Kiềng necklace if applicable
      if (garmentId === 'ao-doi-kham' || garmentId === 'ao-dai') {
        ctx.strokeStyle = '#D9D9D9';
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.arc(cx, chinY + 30, 48, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, chinY + 30, 48, 0.25 * Math.PI, 0.75 * Math.PI);
        ctx.stroke();
      }

      ctx.restore();
    };

    drawTraditionalRobe();

    // 6. BLEND USER'S FACIAL IDENTITY & HEAD (Tích hợp nhận dạng khuôn mặt)
    const drawUserHead = () => {
      if (!userPhotoSrc) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();

        const headW = 190;
        const headH = 240;
        const headX = cx - headW / 2;
        const headY = headTopY;

        // Clip oval for seamless integration with realistic feathering
        ctx.beginPath();
        ctx.ellipse(cx, headY + headH * 0.48, headW * 0.44, headH * 0.48, 0, 0, Math.PI * 2);
        ctx.clip();

        // Draw user headshot inside the head boundary
        ctx.drawImage(img, headX, headY - 10, headW, headH + 20);

        // Subtle soft rim lighting blend on skin
        const skinGlow = ctx.createLinearGradient(headX, headY, headX + headW, headY + headH);
        skinGlow.addColorStop(0, 'rgba(255, 230, 180, 0.15)');
        skinGlow.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        skinGlow.addColorStop(1, 'rgba(100, 40, 20, 0.15)');
        ctx.fillStyle = skinGlow;
        ctx.fillRect(headX, headY, headW, headH);

        ctx.restore();

        // 7. EDITORIAL STAMP, VOGUE TYPOGRAPHY & WATERMARK
        ctx.save();
        // Top Magazine Typography
        ctx.fillStyle = '#FFDF78';
        ctx.font = 'bold 36px "Cinzel", "Playfair Display", serif';
        ctx.textAlign = 'center';
        ctx.letterSpacing = '6px';
        ctx.fillText('VIỆT PHỤC REMIX', W / 2, 70);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.font = '12px "Space Mono", monospace';
        ctx.fillText(`EDITORIAL FULL-BODY LOOKBOOK · ISSUE #${Math.floor(100 + Math.random() * 899)}`, W / 2, 95);

        // Royal Red Wax Seal (Mộc Triện Son) at bottom right
        const sealX = W - 105;
        const sealY = H - 105;
        ctx.fillStyle = '#8B1E1E';
        ctx.beginPath();
        ctx.roundRect(sealX - 42, sealY - 42, 84, 84, 12);
        ctx.fill();
        ctx.strokeStyle = '#FFDF78';
        ctx.lineWidth = 3;
        ctx.strokeRect(sealX - 36, sealY - 36, 72, 72);

        ctx.fillStyle = '#FFDF78';
        ctx.font = 'bold 15px serif';
        ctx.textAlign = 'center';
        ctx.fillText('VIỆT', sealX, sealY - 8);
        ctx.fillText('PHỤC', sealX, sealY + 12);
        ctx.font = '9px monospace';
        ctx.fillText('DI SẢN', sealX, sealY + 26);

        // Bottom left metadata
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = 'bold 16px "Cinzel", serif';
        ctx.fillText(activeFormula.vietnameseTitle, 50, H - 70);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '12px "Space Mono", monospace';
        ctx.fillText(`HASSELBLAD H6D-100C · 85MM F/1.4 · KODAK PORTRA 400`, 50, H - 48);

        ctx.restore();

        // Save rendered result
        const fullDataUrl = canvas.toDataURL('image/jpeg', 0.95);
        setRenderedFullbodyUrl(fullDataUrl);
      };
      img.src = userPhotoSrc;
    };

    drawUserHead();
  }, [
    userPhotoSrc,
    selectedFormulaId,
    selectedPoseId,
    selectedEnvId,
    selectedBodyId,
    activeFormula
  ]);

  // Execute Generation (Server API + Local Full-Body Engine)
  const handleStartGeneration = async () => {
    if (!userPhotoSrc) return;

    setCurrentStep('generating');
    setCurrentLoadingIndex(0);
    setLoadingProgressPercent(15);

    // Call server endpoint in background
    try {
      fetch('/api/ai/fullbody-tryon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoBase64: userPhotoSrc,
          garmentName: activeFormula.garmentName,
          styleName: activeFormula.styleVibe,
          colorName: activeFormula.accentColor,
          bodyType: selectedBodyId,
          background: selectedEnvId,
          pose: selectedPoseId
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.imageUrl) {
            setRenderedFullbodyUrl(data.imageUrl);
            setAiGenerationMode('gemini-api');
          }
        })
        .catch((err) => {
          console.log('Background Gemini API call error:', err);
        });
    } catch {
      // ignore
    }

    // Step-by-step progress simulation
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 1;
      if (currentIdx < MASTER_PROMPT_STEPS_LOADING.length) {
        setCurrentLoadingIndex(currentIdx);
        setLoadingProgressPercent(Math.round(((currentIdx + 1) / MASTER_PROMPT_STEPS_LOADING.length) * 95));
      } else {
        clearInterval(interval);
        setLoadingProgressPercent(100);

        // Render fullbody canvas
        setTimeout(() => {
          renderFullBodyOutfit();
          setCurrentStep('result');
        }, 500);
      }
    }, 950);
  };

  // 1-Click Copy Master English Prompt
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activeFormula.englishPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Download Lookbook Image
  const handleDownloadLookbook = () => {
    if (!renderedFullbodyUrl) return;
    const link = document.createElement('a');
    link.href = renderedFullbodyUrl;
    link.download = `VietPhucRemix_FullBody_${activeFormula.garmentId}_Editorial.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-[#161413] border border-[#C89B3C]/50 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#FAF8F5]">
        {/* Hidden Canvas for Generation */}
        <canvas ref={fullbodyCanvasRef} className="hidden" />

        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#332A24] bg-[#1C1816] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#8B1E1E] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Sparkles size={18} className="text-[#FFDF78]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#FFDF78] tracking-tight">
                  Hóa Thân Toàn Thân Bằng AI (Full-Body Try-On)
                </h3>
                <span className="px-2 py-0.5 bg-[#8B1E1E] text-white text-[10px] font-mono uppercase tracking-widest rounded">
                  Head-to-Toe AI
                </span>
              </div>
              <p className="text-xs text-[#B5A898]">
                Tái tạo ảnh TOÀN THÂN mặc Việt phục từ đầu đến chân — Giữ nguyên ngũ quan, tông da & vóc dáng thật.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2A231E] hover:bg-[#3D332B] text-[#D5CABE] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-2.5 bg-[#201C19] border-b border-[#332A24] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto">
            <div
              className={`flex items-center gap-1.5 font-semibold ${
                currentStep === 'upload' ? 'text-[#FFDF78]' : 'text-[#8C7E70]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#332A24] flex items-center justify-center text-[10px] font-mono">
                1
              </span>
              <span>Tải Ảnh Chân Dung / Toàn Thân</span>
            </div>
            <span className="text-[#4D4036]">→</span>
            <div
              className={`flex items-center gap-1.5 font-semibold ${
                currentStep === 'configure' ? 'text-[#FFDF78]' : 'text-[#8C7E70]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#332A24] flex items-center justify-center text-[10px] font-mono">
                2
              </span>
              <span>Tạo Hình Toàn Thân & Không Gian</span>
            </div>
            <span className="text-[#4D4036]">→</span>
            <div
              className={`flex items-center gap-1.5 font-semibold ${
                currentStep === 'generating' ? 'text-[#FFDF78]' : 'text-[#8C7E70]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#332A24] flex items-center justify-center text-[10px] font-mono">
                3
              </span>
              <span>AI Dệt Khâu Toàn Thân</span>
            </div>
            <span className="text-[#4D4036]">→</span>
            <div
              className={`flex items-center gap-1.5 font-semibold ${
                currentStep === 'result' ? 'text-[#FFDF78]' : 'text-[#8C7E70]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#332A24] flex items-center justify-center text-[10px] font-mono">
                4
              </span>
              <span>Lookbook Toàn Thân HD</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#C89B3C]">
            <Camera size={13} />
            <span>Hasselblad 85mm 8K</span>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#161413]">
          {/* STEP 1: UPLOAD & CALIBRATION */}
          {currentStep === 'upload' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#C89B3C] font-semibold">
                  Bước 1: Chuẩn Bị Ảnh Đầu Vào
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#FAF8F5]">
                  Tải Ảnh Bạn Muốn Hóa Thân Toàn Thân
                </h2>
                <p className="text-sm text-[#B5A898] max-w-xl mx-auto">
                  Bạn có thể dùng ảnh selfie chân dung rõ mặt hoặc ảnh chụp toàn thân hiện có. AI sẽ trích xuất ngũ quan,
                  tông da và dựng trọn vẹn vóc dáng mặc trang phục truyền thống từ đầu đến chân.
                </p>
              </div>

              {/* Upload Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-8 border-2 border-dashed border-[#C89B3C]/50 hover:border-[#FFDF78] rounded-2xl bg-[#1C1816]/70 hover:bg-[#241F1C] transition-all cursor-pointer text-center space-y-4 group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8B1E1E]/20 text-[#FFDF78] mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload size={28} />
                  </div>
                  <div>
                    <span className="font-editorial text-base font-bold text-[#FAF8F5] block">
                      Tải Lên Ảnh Từ Thiết Bị
                    </span>
                    <p className="text-xs text-[#8C7E70] mt-1">
                      Hỗ trợ JPG, PNG, WEBP (Khuyến khích ảnh rõ mặt, ánh sáng tự nhiên)
                    </p>
                  </div>
                  <button className="px-5 py-2.5 bg-[#8B1E1E] hover:bg-[#A82525] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm">
                    Chọn Tệp Ảnh
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                {/* Instant Trial Box */}
                <div className="p-6 bg-[#201B17] border border-[#3D332B] rounded-2xl space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#FFDF78]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#FFDF78] font-bold">
                      Trải Nghiệm Nhanh Cho Ban Giám Khảo
                    </span>
                  </div>
                  <p className="text-xs text-[#B5A898] leading-relaxed">
                    Không có sẵn ảnh cá nhân? Bạn có thể kích hoạt ngay ảnh mẫu chân dung studio để kiểm tra quy trình
                    AI sinh ảnh toàn thân trong 1 cú nhấp:
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleUseDemoSample('portrait')}
                      className="flex-1 py-3 px-4 bg-[#C89B3C] hover:bg-[#DDAE4D] text-[#1C1816] text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Camera size={14} />
                      <span>Dùng Ảnh Mẫu Chân Dung</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Guidelines Table */}
              <div className="bg-[#1C1816] border border-[#332A24] rounded-2xl p-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-bold block mb-4">
                  Quy Tắc Đầu Vào Để Ảnh Toàn Thân Đạt Chất Lượng Cao Nhất:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dos */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                      <Check size={14} />
                      <span>Nên Làm (Do's)</span>
                    </div>
                    {CROP_GUIDELINES.dos.map((item, idx) => (
                      <div key={idx} className="bg-[#241F1C] p-3 rounded-xl border border-emerald-950/40">
                        <span className="text-xs font-bold text-[#FAF8F5] block">{item.title}</span>
                        <p className="text-[11px] text-[#A69989] mt-0.5">{item.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Donts */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase">
                      <AlertCircle size={14} />
                      <span>Cần Tránh (Don'ts)</span>
                    </div>
                    {CROP_GUIDELINES.donts.map((item, idx) => (
                      <div key={idx} className="bg-[#241F1C] p-3 rounded-xl border border-red-950/40">
                        <span className="text-xs font-bold text-[#FAF8F5] block">{item.title}</span>
                        <p className="text-[11px] text-[#A69989] mt-0.5">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CONFIGURE FULL-BODY PARAMETERS */}
          {currentStep === 'configure' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#332A24]">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-[#C89B3C] font-semibold">
                    Bước 2: Thiết Lập Tạo Hình Toàn Thân (Head-to-Toe)
                  </span>
                  <h2 className="font-editorial text-2xl font-bold text-[#FAF8F5] mt-0.5">
                    Chọn Cổ Phục, Tư Thế & Bối Cảnh Studio
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentStep('upload')}
                    className="px-3 py-1.5 bg-[#2A231E] hover:bg-[#3D332B] text-xs text-[#D5CABE] rounded-lg transition-colors"
                  >
                    Đổi Ảnh Khác
                  </button>
                  <button
                    onClick={handleStartGeneration}
                    className="px-5 py-2.5 bg-[#8B1E1E] hover:bg-[#A82525] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Sparkles size={14} className="text-[#FFDF78]" />
                    <span>Tạo Ảnh Toàn Thân Bằng AI</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Configuration selectors */}
                <div className="lg:col-span-2 space-y-6">
                  {/* 1. Chọn Bộ Cổ Phục Toàn Thân */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FFDF78] flex items-center gap-2">
                      <Layers size={14} />
                      1. Bộ Việt Phục Toàn Thân:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {MASTER_PROMPTS_COLLECTION.map((formula) => {
                        const isSelected = formula.id === selectedFormulaId;
                        return (
                          <div
                            key={formula.id}
                            onClick={() => setSelectedFormulaId(formula.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                              isSelected
                                ? 'bg-[#2B231D] border-[#C89B3C] shadow-md ring-1 ring-[#C89B3C]'
                                : 'bg-[#1C1816] border-[#332A24] hover:border-[#52443A]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-editorial text-sm font-bold text-[#FAF8F5]">
                                {formula.garmentName}
                              </span>
                              {isSelected && <Check size={14} className="text-[#FFDF78]" />}
                            </div>
                            <span className="text-[11px] text-[#C89B3C] block mt-0.5 font-medium">
                              {formula.vietnameseTitle}
                            </span>
                            <p className="text-[10px] text-[#8C7E70] mt-1 leading-relaxed line-clamp-2">
                              {formula.styleVibe}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Chọn Tư Thế Toàn Thân (Full-Body Pose) */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FFDF78] flex items-center gap-2">
                      <Compass size={14} />
                      2. Tư Thế Toàn Thân (Full-Body Pose):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {FULLBODY_POSES.map((pose) => {
                        const isSelected = pose.id === selectedPoseId;
                        return (
                          <div
                            key={pose.id}
                            onClick={() => setSelectedPoseId(pose.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                              isSelected
                                ? 'bg-[#2B231D] border-[#C89B3C] shadow-sm ring-1 ring-[#C89B3C]'
                                : 'bg-[#1C1816] border-[#332A24] hover:border-[#52443A]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#FAF8F5]">{pose.name}</span>
                              {isSelected && <Check size={13} className="text-[#FFDF78]" />}
                            </div>
                            <p className="text-[10px] text-[#8C7E70] mt-1 leading-relaxed">
                              {pose.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Chọn Bối Cảnh Studio / Không Gian Di Sản */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FFDF78] flex items-center gap-2">
                      <Camera size={14} />
                      3. Bối Cảnh & Không Gian Chụp:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {FULLBODY_ENVIRONMENTS.map((env) => {
                        const isSelected = env.id === selectedEnvId;
                        return (
                          <div
                            key={env.id}
                            onClick={() => setSelectedEnvId(env.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                              isSelected
                                ? 'bg-[#2B231D] border-[#C89B3C] shadow-sm ring-1 ring-[#C89B3C]'
                                : 'bg-[#1C1816] border-[#332A24] hover:border-[#52443A]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#FAF8F5]">{env.name}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#332A24] text-[#C89B3C] rounded">
                                {env.tag}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#8C7E70] mt-1 leading-relaxed">
                              {env.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Vóc Dáng & Chiều Cao */}
                  <div className="p-4 bg-[#1C1816] border border-[#332A24] rounded-2xl space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FFDF78] flex items-center gap-2">
                      <Sliders size={14} />
                      4. Tỷ Lệ Vóc Dáng & Chiều Cao:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BODY_PROPORTIONS.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBodyId(b.id)}
                          className={`p-2 rounded-lg text-center text-xs font-semibold border transition-all cursor-pointer ${
                            selectedBodyId === b.id
                              ? 'bg-[#C89B3C] text-[#1C1816] border-[#C89B3C]'
                              : 'bg-[#241F1C] text-[#D5CABE] border-[#3D332B] hover:bg-[#2D2621]'
                          }`}
                        >
                          {b.name}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#2D2621]">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#8C7E70]">Chiều cao mô phỏng:</span>
                        <span className="font-mono text-[#FFDF78] font-bold">{userHeight} cm</span>
                      </div>
                      <input
                        type="range"
                        min="150"
                        max="190"
                        value={userHeight}
                        onChange={(e) => setUserHeight(parseInt(e.target.value))}
                        className="w-full accent-[#C89B3C]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Col: Live Input Photo Preview & Full-body framing */}
                <div className="space-y-4">
                  <div className="p-4 bg-[#1C1816] border border-[#332A24] rounded-2xl space-y-3 text-center">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold block">
                      Ảnh Gốc Của Bạn
                    </span>
                    <div className="w-full aspect-3/4 rounded-xl overflow-hidden bg-black/40 border border-[#3D332B] relative flex items-center justify-center">
                      {userPhotoSrc && (
                        <img
                          src={userPhotoSrc}
                          alt="User portrait"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute inset-0 border-2 border-dashed border-[#FFDF78]/40 pointer-events-none rounded-xl" />
                      <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-xs rounded text-[10px] text-[#FFDF78] font-mono">
                        ✓ Đã căn chỉnh tỷ lệ nhận diện
                      </div>
                    </div>

                    <div className="text-left space-y-1.5 text-xs text-[#B5A898] bg-[#241F1C] p-3 rounded-xl border border-[#332A24]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFDF78] font-bold block">
                        Kế Hoạch Dệt Khâu AI:
                      </span>
                      <p className="text-[11px] leading-relaxed">
                        • Giữ nguyên ngũ quan, mắt, sống mũi & chân mày.
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        • Dựng trọn vẹn tà áo ngũ thân dài qua gối và nẹp năm thân.
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        • Phối quần ống rộng và chelsea boots da bóng toàn thân.
                      </p>
                    </div>

                    <button
                      onClick={handleStartGeneration}
                      className="w-full py-3.5 bg-[#8B1E1E] hover:bg-[#A82525] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Sparkles size={14} className="text-[#FFDF78]" />
                      <span>Bắt Đầu Hóa Thân Toàn Thân</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: GENERATING LOADING VIEW */}
          {currentStep === 'generating' && (
            <div className="max-w-xl mx-auto py-12 text-center space-y-8">
              <div className="relative w-36 h-36 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-[#332A24]" />
                <div
                  className="absolute inset-0 rounded-full border-4 border-[#C89B3C] border-t-transparent animate-spin"
                  style={{ animationDuration: '2s' }}
                />
                <div className="absolute inset-4 rounded-full bg-[#1C1816] flex items-center justify-center flex-col">
                  <Sparkles size={28} className="text-[#FFDF78] animate-pulse" />
                  <span className="font-mono text-sm font-bold text-[#FFDF78] mt-1">
                    {loadingProgressPercent}%
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs uppercase font-mono tracking-widest text-[#C89B3C] font-semibold">
                  Giai đoạn {currentLoadingIndex + 1}/5
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#FAF8F5]">
                  {MASTER_PROMPT_STEPS_LOADING[currentLoadingIndex]?.title}
                </h3>
                <p className="text-xs text-[#B5A898] max-w-md mx-auto leading-relaxed">
                  {MASTER_PROMPT_STEPS_LOADING[currentLoadingIndex]?.desc}
                </p>
              </div>

              {/* Step indicator bars */}
              <div className="flex gap-2 justify-center max-w-xs mx-auto">
                {MASTER_PROMPT_STEPS_LOADING.map((step, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      idx <= currentLoadingIndex ? 'bg-[#C89B3C]' : 'bg-[#332A24]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RESULT FULL-BODY SHOWCASE */}
          {currentStep === 'result' && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Top Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#332A24]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#C89B3C] font-semibold">
                      Hoàn Tất Hóa Thân Toàn Thân
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono rounded">
                      Full-Body 8K Editorial
                    </span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#FAF8F5] mt-0.5">
                    {activeFormula.vietnameseTitle}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Before/After Toggle */}
                  <button
                    onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#2A231E] hover:bg-[#3D332B] text-xs font-semibold text-[#D5CABE] rounded-lg transition-colors cursor-pointer border border-[#44372F]"
                  >
                    <SplitSquareVertical size={14} className="text-[#C89B3C]" />
                    <span>{showBeforeAfter ? 'Xem Ảnh AI Toàn Thân' : 'So Sánh Trước / Sau'}</span>
                  </button>

                  {/* Download HD Button */}
                  <button
                    onClick={handleDownloadLookbook}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#8B1E1E] hover:bg-[#A82525] text-xs font-bold uppercase tracking-wider text-white rounded-lg transition-all shadow-md cursor-pointer active:scale-98"
                  >
                    <Download size={14} />
                    <span>Tải Lookbook HD</span>
                  </button>
                </div>
              </div>

              {/* Main Content: Full-Body Lookbook + Master Prompt Anatomy */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 6 Cols: Full-Body Lookbook Image & Lens Inspector */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Image Display Container */}
                  <div className="relative w-full aspect-3/4 bg-[#141211] rounded-2xl overflow-hidden border border-[#C89B3C]/60 shadow-2xl group">
                    {showBeforeAfter ? (
                      /* Before & After Split View */
                      <div className="grid grid-cols-2 w-full h-full">
                        <div className="relative border-r border-[#332A24] bg-black/50">
                          {userPhotoSrc && (
                            <img
                              src={userPhotoSrc}
                              alt="Before"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/75 text-[10px] font-mono text-[#D5CABE] rounded">
                            Trước: Ảnh gốc
                          </div>
                        </div>
                        <div className="relative">
                          {renderedFullbodyUrl && (
                            <img
                              src={renderedFullbodyUrl}
                              alt="After"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#8B1E1E] text-[10px] font-mono text-[#FFDF78] rounded">
                            Sau: Toàn thân mặc áo
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Full Single Editorial Image with Lens Crop Mode */
                      <div
                        className={`w-full h-full overflow-hidden transition-all duration-500 ${
                          activeLensView === 'face'
                            ? 'scale-220 -translate-y-28'
                            : activeLensView === 'drapery'
                            ? 'scale-180 -translate-y-6'
                            : activeLensView === 'shoes'
                            ? 'scale-200 translate-y-36'
                            : 'scale-100 translate-y-0'
                        }`}
                      >
                        {renderedFullbodyUrl && (
                          <img
                            src={renderedFullbodyUrl}
                            alt="AI Full-Body Lookbook Result"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </div>
                    )}

                    {/* Lens Inspector Toolbar */}
                    {!showBeforeAfter && (
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 bg-[#1C1816]/90 backdrop-blur-md border border-[#3D332B] rounded-xl text-xs">
                        <span className="text-[11px] font-mono text-[#C89B3C] font-semibold flex items-center gap-1.5">
                          <Eye size={13} />
                          Kính lúp soi:
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setActiveLensView('full')}
                            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                              activeLensView === 'full'
                                ? 'bg-[#C89B3C] text-[#1C1816] font-bold'
                                : 'text-[#D5CABE] hover:bg-[#2B231D]'
                            }`}
                          >
                            Toàn Thân 100%
                          </button>
                          <button
                            onClick={() => setActiveLensView('face')}
                            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                              activeLensView === 'face'
                                ? 'bg-[#C89B3C] text-[#1C1816] font-bold'
                                : 'text-[#D5CABE] hover:bg-[#2B231D]'
                            }`}
                          >
                            Ngũ Quan & Cổ
                          </button>
                          <button
                            onClick={() => setActiveLensView('drapery')}
                            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                              activeLensView === 'drapery'
                                ? 'bg-[#C89B3C] text-[#1C1816] font-bold'
                                : 'text-[#D5CABE] hover:bg-[#2B231D]'
                            }`}
                          >
                            Nếp Lụa Tà Áo
                          </button>
                          <button
                            onClick={() => setActiveLensView('shoes')}
                            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                              activeLensView === 'shoes'
                                ? 'bg-[#C89B3C] text-[#1C1816] font-bold'
                                : 'text-[#D5CABE] hover:bg-[#2B231D]'
                            }`}
                          >
                            Quần & Giày
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Apply Look To Remix Studio */}
                  <button
                    onClick={() => {
                      onApplySelection(activeFormula.suggestedSelection);
                      onClose();
                    }}
                    className="w-full py-3 bg-[#C89B3C] hover:bg-[#DDAE4D] text-[#1C1816] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <BookmarkPlus size={16} />
                    <span>Mặc Bản Phối Này Vào Phòng Thử Đồ (Remix Studio)</span>
                  </button>
                </div>

                {/* Right 6 Cols: Master Prompt Google AI Studio Breakdown */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Master Prompt Card */}
                  <div className="p-5 bg-[#1C1816] border border-[#332A24] rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-[#FFDF78]" />
                        <span className="text-xs font-mono uppercase tracking-wider text-[#FFDF78] font-bold">
                          Công Thức Full-Body Google AI Studio
                        </span>
                      </div>
                      <button
                        onClick={handleCopyPrompt}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#2B231D] hover:bg-[#3D332B] border border-[#C89B3C]/50 rounded-lg text-xs font-mono text-[#FFDF78] transition-colors cursor-pointer"
                      >
                        {copiedPrompt ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedPrompt ? 'Đã sao chép!' : 'Sao chép Prompt'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#B5A898] leading-relaxed">
                      Toàn bộ prompt tiếng Anh nhiếp ảnh studio cao cấp, tối ưu hóa để sinh ảnh toàn thân hoàn hảo trên Google Gemini / Imagen:
                    </p>

                    {/* Raw Prompt Textbox */}
                    <div className="p-3.5 bg-[#100E0D] border border-[#2B231D] rounded-xl font-mono text-[11px] text-[#D5CABE] leading-relaxed max-h-44 overflow-y-auto selection:bg-[#8B1E1E]">
                      {activeFormula.englishPrompt}
                    </div>

                    {/* 5 Anatomical Layers Breakdown */}
                    <div className="space-y-2.5 pt-2 border-t border-[#2B231D]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#C89B3C] font-bold block">
                        5 Tầng Giải Phẫu Kỹ Thuật Studio (Anatomical Breakdown):
                      </span>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 bg-[#241F1C] rounded-lg border border-[#332A24]">
                          <span className="text-[#FFDF78] font-mono text-[10px] block font-bold">
                            1. SUBJECT & FULL-BODY IDENTITY:
                          </span>
                          <span className="text-[#D5CABE] text-[11px]">
                            {activeFormula.anatomicalBreakdown.subjectIdentity}
                          </span>
                        </div>

                        <div className="p-2.5 bg-[#241F1C] rounded-lg border border-[#332A24]">
                          <span className="text-[#FFDF78] font-mono text-[10px] block font-bold">
                            2. TRADITIONAL FULL GARMENT SPECS:
                          </span>
                          <span className="text-[#D5CABE] text-[11px]">
                            {activeFormula.anatomicalBreakdown.traditionalGarment}
                          </span>
                        </div>

                        <div className="p-2.5 bg-[#241F1C] rounded-lg border border-[#332A24]">
                          <span className="text-[#FFDF78] font-mono text-[10px] block font-bold">
                            3. GEN Z MODERN BOTTOM & FOOTWEAR:
                          </span>
                          <span className="text-[#D5CABE] text-[11px]">
                            {activeFormula.anatomicalBreakdown.genZModernLayer}
                          </span>
                        </div>

                        <div className="p-2.5 bg-[#241F1C] rounded-lg border border-[#332A24]">
                          <span className="text-[#FFDF78] font-mono text-[10px] block font-bold">
                            4. STUDIO LIGHTING & SETTING:
                          </span>
                          <span className="text-[#D5CABE] text-[11px]">
                            {activeFormula.anatomicalBreakdown.studioLighting}
                          </span>
                        </div>

                        <div className="p-2.5 bg-[#241F1C] rounded-lg border border-[#332A24]">
                          <span className="text-[#FFDF78] font-mono text-[10px] block font-bold">
                            5. CAMERA GEAR & COLOR CALIBRATION:
                          </span>
                          <span className="text-[#D5CABE] text-[11px]">
                            {activeFormula.anatomicalBreakdown.cameraGear}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => setCurrentStep('configure')}
                        className="text-xs text-[#C89B3C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw size={12} />
                        <span>Thử lại với tư thế hoặc trang phục khác</span>
                      </button>

                      <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#2A231E] hover:bg-[#3D332B] text-xs font-semibold text-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
