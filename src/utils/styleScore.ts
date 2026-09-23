import { OutfitSelection } from '../types';
import {
  GARMENTS,
  BOTTOM_PIECES,
  HEADWEAR_PIECES,
  FOOTWEAR_PIECES,
  BAG_PIECES,
  ACCESSORY_PIECES,
  STYLES,
  COLORS
} from '../data/mockData';

export interface StyleScoreResult {
  traditionalScore: number;
  modernScore: number;
  individualityScore: number;
  whyThisWorks: string;
  culturalInsight: string;
  keyPieceNames: string[];
  garmentName: string;
  styleName: string;
  colorName: string;
}

export function calculateStyleScore(selection: OutfitSelection): StyleScoreResult {
  const garment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const bottom = BOTTOM_PIECES.find((b) => b.id === selection.bottomId) || BOTTOM_PIECES[0];
  const headwear = HEADWEAR_PIECES.find((h) => h.id === selection.headwearId) || HEADWEAR_PIECES[0];
  const footwear = FOOTWEAR_PIECES.find((f) => f.id === selection.footwearId) || FOOTWEAR_PIECES[0];
  const bag = BAG_PIECES.find((b) => b.id === selection.bagId) || BAG_PIECES[0];
  const accessory = ACCESSORY_PIECES.find((a) => a.id === selection.accessoryId) || ACCESSORY_PIECES[0];
  const style = STYLES.find((s) => s.id === selection.styleId) || STYLES[0];
  const color = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];

  // Base score from style template
  let trad = style.traditionalRatio;
  let mod = style.modernRatio;
  let indiv = style.individualityScore;

  // Modulate based on pieces
  if (!bottom.isTraditional) {
    trad -= 6;
    mod += 8;
  } else {
    trad += 5;
  }

  if (headwear.isTraditional && headwear.id !== 'head-none') {
    trad += 7;
  } else if (headwear.id !== 'head-none') {
    mod += 5;
    indiv += 4;
  }

  if (!footwear.isTraditional) {
    mod += 6;
    trad -= 4;
  } else {
    trad += 6;
  }

  if (!bag.isTraditional) {
    mod += 4;
  } else {
    trad += 4;
  }

  if (accessory.id === 'acc-headphones' || accessory.id === 'acc-sunglasses-oval') {
    mod += 8;
    indiv += 6;
  } else if (accessory.isTraditional) {
    trad += 6;
  }

  // Normalize scores within 30 - 98 range
  const traditionalScore = Math.max(30, Math.min(96, Math.round(trad)));
  const modernScore = Math.max(20, Math.min(95, Math.round(mod)));
  const individualityScore = Math.max(60, Math.min(99, Math.round(indiv)));

  // Generate dynamic explanation
  const modernItems: string[] = [];
  if (!bottom.isTraditional) modernItems.push(bottom.name.toLowerCase());
  if (!footwear.isTraditional) modernItems.push(footwear.name.toLowerCase());
  if (!bag.isTraditional) modernItems.push(bag.name.toLowerCase());
  if (!accessory.isTraditional) modernItems.push(accessory.name.toLowerCase());

  let explanation = '';
  if (modernItems.length > 0) {
    explanation = `Bản phối lấy ${garment.name} (${color.name}) làm linh hồn văn hóa trung tâm, kết hợp khéo léo với ${modernItems.slice(0, 2).join(' và ')} để tạo nhịp cầu giao thoa tự nhiên với lối sống năng động của Gen Z mà không làm mất đi phom dáng trang trọng ban đầu.`;
  } else {
    explanation = `Bản phối tập trung vào chiều sâu di sản nguyên bản của ${garment.name} với toàn bộ các chi tiết thủ công truyền thống, toát lên phong thái tao nhã mực thước và tinh thần gìn giữ văn hóa Việt chuẩn mực.`;
  }

  return {
    traditionalScore,
    modernScore,
    individualityScore,
    whyThisWorks: explanation,
    culturalInsight: garment.culturalContext,
    keyPieceNames: [garment.name, bottom.name, footwear.name, bag.name, accessory.name],
    garmentName: garment.name,
    styleName: style.name,
    colorName: color.name
  };
}
