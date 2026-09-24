export type GarmentCategory = 'garment' | 'bottom' | 'headwear' | 'footwear' | 'bag' | 'accessories';
export type FabricTextureType = 'silk' | 'linen' | 'brocade' | 'grain' | 'none';
export type TextureIntensityType = 'subtle' | 'medium' | 'rich';

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
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
}

export type SkinToneType = 'porcelain' | 'warm-ivory' | 'golden-honey' | 'caramel';
export type TuckStyleType = 'untucked' | 'full-tuck' | 'half-tuck';
export type GenderType = 'female' | 'male' | 'androgynous';

export interface OutfitSelection {
  garmentId: string;
  bottomId: string;
  headwearId: string;
  footwearId: string;
  bagId: string;
  accessoryId: string;
  styleId: string;
  colorId: string;
  avatarId?: string;
  gender?: GenderType;
  tuckStyle?: TuckStyleType;
  skinTone?: SkinToneType;
  skinToneId?: SkinToneType;
  customPhotoUrl?: string;
  fabricTexture?: FabricTextureType;
  textureIntensity?: TextureIntensityType;
}

export interface AvatarModel {
  id: string;
  name: string;
  vietnameseTitle: string;
  gender: 'female' | 'male' | 'androgynous';
  description: string;
  vibe: string;
  badge: string;
  skinTone: SkinToneType;
  skinHex: string;
  shadowHex: string;
  blushHex: string;
  lipHex: string;
  faceStyle: 'female-classic' | 'female-modern' | 'female-poet' | 'male-sharp' | 'male-dandy' | 'editorial';
  hairDescription: string;
  quote: string;
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

export interface WeatherOption {
  id: 'summer-hot' | 'autumn-cool' | 'spring-drizzle' | 'winter-cold';
  name: string;
  icon: string;
  temperature: string;
  description: string;
  recommendedFabric: string;
}

export interface EventOption {
  id: 'cafe-street' | 'temple-heritage' | 'gala-party' | 'university' | 'festival-concert';
  name: string;
  icon: string;
  description: string;
  formalityLevel: string;
}

export interface ColorHarmonyReport {
  score: number;
  ruleName: string;
  status: 'excellent' | 'balanced' | 'daring' | 'clashing';
  explanation: string;
  culturalPhilosophy: string;
  elementAffinity: string;
  paletteColors: { name: string; hex: string }[];
}

export interface CulturalIntegrityCheck {
  isSafe: boolean;
  severity: 'safe' | 'caution' | 'warning';
  title: string;
  message: string;
  reason: string;
  respectfulSuggestion: string;
  culturalContextRef: string;
}

export interface Lookbook {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverOutfit: SavedOutfit;
  outfits: SavedOutfit[];
  author: string;
  createdAt: string;
  theme: string;
}

export interface WhereToWearLocation {
  id: string;
  name: string;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh' | 'Huế' | 'Hội An' | 'Đà Lạt';
  category: 'heritage' | 'contemporary_art' | 'concept_cafe' | 'indie_event' | 'festival';
  categoryName: string;
  address: string;
  vibeTag: string;
  matchScore: number;
  bestTime: string;
  photoAngleTip: string;
  recommendedGarments: string[];
  stylingTips: string;
  quote: string;
  thumbnailUrl?: string;
  heroColor: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  googleMapsUrl?: string;
}

export interface SustainableItem {
  id: string;
  name: string;
  category: 'bottom' | 'garment' | 'footwear' | 'bag' | 'accessories';
  brandOrType: string;
  material: string;
  waterSavedLiters: number;
  co2SavedKg: number;
  compatibilityNote: string;
  targetSlotId: 'bottomId' | 'footwearId' | 'bagId' | 'accessoryId';
  mappedItemId: string;
  icon: string;
  imageUrl?: string;
}

export interface SmartAIContext {
  id: string;
  title: string;
  seasonOrFestival: string;
  city: string;
  temperature: string;
  weatherCondition: string;
  icon: string;
  aiPromptMessage: string;
  stylingRecommendation: string;
  suggestedSelection: Partial<OutfitSelection>;
  destinationRefId: string;
  badge: string;
}
