export type GarmentCategory = 'garment' | 'bottom' | 'headwear' | 'footwear' | 'bag' | 'accessories';

export interface Garment {
  id: string;
  name: string;
  vietnameseName: string;
  englishSub: string;
  category: 'garment';
  era: string;
  description: string;
  culturalContext: string;
  structureDetails: string[];
  modernTips: string;
  defaultColor: string;
  supportedColors: string[];
  silhouetteSvg: string;
}

export interface BottomPiece {
  id: string;
  name: string;
  category: 'bottom';
  isTraditional: boolean;
  styleTag: string;
  description: string;
  silhouetteSvg: string;
}

export interface HeadwearPiece {
  id: string;
  name: string;
  category: 'headwear';
  isTraditional: boolean;
  styleTag: string;
  description: string;
  silhouetteSvg: string;
}

export interface FootwearPiece {
  id: string;
  name: string;
  category: 'footwear';
  isTraditional: boolean;
  styleTag: string;
  description: string;
  silhouetteSvg: string;
}

export interface BagPiece {
  id: string;
  name: string;
  category: 'bag';
  isTraditional: boolean;
  styleTag: string;
  description: string;
  silhouetteSvg: string;
}

export interface AccessoryPiece {
  id: string;
  name: string;
  category: 'accessories';
  isTraditional: boolean;
  styleTag: string;
  description: string;
  silhouetteSvg: string;
}

export interface StyleOption {
  id: string;
  name: string;
  tag: string;
  description: string;
  traditionalRatio: number;
  modernRatio: number;
  individualityScore: number;
  badge: string;
}

export interface ColorOption {
  id: string;
  name: string;
  vietnameseName: string;
  hex: string;
  secondaryHex: string;
  textColor: string;
  culturalMeaning: string;
}

export interface OutfitSelection {
  garmentId: string;
  bottomId: string;
  headwearId: string;
  footwearId: string;
  bagId: string;
  accessoryId: string;
  styleId: string;
  colorId: string;
}

export interface SavedOutfit {
  id: string;
  code: string; // e.g. "VIỆT PHỤC REMIX #027"
  name: string;
  selection: OutfitSelection;
  mixRatio: {
    traditional: number;
    modern: number;
    individuality: number;
  };
  whyThisWorks: string;
  culturalSummary: string;
  creator: {
    name: string;
    handle: string;
    avatar: string;
    isCommunity?: boolean;
  };
  likesCount: number;
  createdAt: string;
  tags: string[];
}

export interface AIStylistPromptExample {
  id: string;
  prompt: string;
  targetContext: string;
  suggestedSelection: OutfitSelection;
  reasoning: string;
}
