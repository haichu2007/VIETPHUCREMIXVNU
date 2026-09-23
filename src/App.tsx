import React, { useState, useEffect } from 'react';
import { OutfitSelection, SavedOutfit } from './types';
import { GARMENTS, BOTTOM_PIECES, HEADWEAR_PIECES, FOOTWEAR_PIECES, BAG_PIECES, ACCESSORY_PIECES, STYLES, COLORS, MOCK_COMMUNITY_OUTFITS } from './data/mockData';
import { calculateStyleScore } from './utils/styleScore';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RemixEditor } from './components/RemixEditor';
import { CommunityDiscover } from './components/CommunityDiscover';
import { AIStylistSection } from './components/AIStylistSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { OutfitResultModal } from './components/OutfitResultModal';
import { SocialShareModal } from './components/SocialShareModal';
import { DemoTourModal } from './components/DemoTourModal';
import { LookbookModal } from './components/LookbookModal';

const DEFAULT_SELECTION: OutfitSelection = {
  garmentId: 'ao-ngu-than',
  bottomId: 'pants-denim-wide',
  headwearId: 'head-none',
  footwearId: 'shoes-chunky-sneaker',
  bagId: 'bag-crossbody-nylon',
  accessoryId: 'acc-headphones',
  styleId: 'style-street',
  colorId: 'lacquer-red',
  fabricTexture: 'silk',
  textureIntensity: 'medium'
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'remix' | 'discover' | 'ai' | 'about'>('home');

  // Load active selection from localStorage or fallback
  const [selection, setSelection] = useState<OutfitSelection>(() => {
    try {
      const saved = localStorage.getItem('vietphuc_current_selection');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_SELECTION;
  });

  // Saved outfits list (persisted in localStorage)
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>(() => {
    try {
      const saved = localStorage.getItem('vietphuc_saved_outfits');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Modals state
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isGlobalLookbookOpen, setIsGlobalLookbookOpen] = useState(false);

  // Dynamic code for current configuration
  const currentCode = 'VIỆT PHỤC REMIX #027';

  // Persist selection
  useEffect(() => {
    try {
      localStorage.setItem('vietphuc_current_selection', JSON.stringify(selection));
    } catch {
      // ignore
    }
  }, [selection]);

  // Persist saved outfits
  useEffect(() => {
    try {
      localStorage.setItem('vietphuc_saved_outfits', JSON.stringify(savedOutfits));
    } catch {
      // ignore
    }
  }, [savedOutfits]);

  // Handle Save Outfit
  const handleSaveCurrentOutfit = () => {
    const scoreResult = calculateStyleScore(selection);
    const garment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
    const style = STYLES.find((s) => s.id === selection.styleId) || STYLES[0];

    const newOutfit: SavedOutfit = {
      id: `saved-${Date.now()}`,
      code: `VIỆT PHỤC REMIX #${Math.floor(100 + Math.random() * 900)}`,
      name: `${garment.name} ${style.name}`,
      selection,
      mixRatio: {
        traditional: scoreResult.traditionalScore,
        modern: scoreResult.modernScore,
        individuality: scoreResult.individualityScore
      },
      whyThisWorks: scoreResult.whyThisWorks,
      culturalSummary: scoreResult.culturalInsight,
      creator: {
        name: 'Bạn (Nhà sáng tạo)',
        handle: '@creator.you',
        avatar: 'ME',
        isCommunity: false
      },
      likesCount: 1,
      createdAt: 'Vừa xong',
      tags: [garment.name, style.name, 'Bản phối của tôi']
    };

    setSavedOutfits((prev) => [newOutfit, ...prev]);
  };

  // Is current selection already saved?
  const isCurrentSaved = savedOutfits.some(
    (item) => JSON.stringify(item.selection) === JSON.stringify(selection)
  );

  // Load a look from discover or AI into remix editor
  const handleLoadLookToRemix = (newSelection: OutfitSelection) => {
    setSelection(newSelection);
    setActiveTab('remix');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Demo flow finished
  const handleFinishDemo = (demoSelection: OutfitSelection) => {
    setSelection(demoSelection);
    setIsDemoModalOpen(false);
    setActiveTab('remix');
    setIsResultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1D1B] flex flex-col selection:bg-[#8B1E1E]/20 selection:text-[#8B1E1E]">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartDemo={() => setIsDemoModalOpen(true)}
        savedCount={savedOutfits.length}
        onOpenLookbook={() => setIsGlobalLookbookOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onStartRemix={() => {
                setActiveTab('remix');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartDemo={() => setIsDemoModalOpen(true)}
              onOpenAI={() => {
                setActiveTab('ai');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              heroSelection={selection}
            />

            {/* Teaser of Community Gallery on Home */}
            <div className="bg-[#FAF8F5] py-12 border-b border-[#E5DDD0]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#E5DDD0]">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E1E]">
                      Bộ Sưu Tập Nổi Bật
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E1D1B] mt-1">
                      12 Bản Phối Mẫu Tiêu Biểu
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('discover');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-[#8B1E1E] hover:underline cursor-pointer"
                  >
                    Xem tất cả bản phối →
                  </button>
                </div>

                <CommunityDiscover
                  onRemixLook={handleLoadLookToRemix}
                  savedOutfits={savedOutfits.slice(0, 4)}
                />
              </div>
            </div>

            {/* Quick About Teaser */}
            <AboutSection />
          </>
        )}

        {activeTab === 'remix' && (
          <RemixEditor
            selection={selection}
            setSelection={setSelection}
            onOpenResult={() => setIsResultModalOpen(true)}
            outfitCode={currentCode}
            savedOutfits={savedOutfits}
          />
        )}

        {activeTab === 'discover' && (
          <CommunityDiscover
            onRemixLook={handleLoadLookToRemix}
            savedOutfits={savedOutfits}
          />
        )}

        {activeTab === 'ai' && (
          <AIStylistSection onApplyOutfit={handleLoadLookToRemix} />
        )}

        {activeTab === 'about' && (
          <AboutSection />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Outfit Result Modal */}
      <OutfitResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        selection={selection}
        outfitCode={currentCode}
        onSaveOutfit={handleSaveCurrentOutfit}
        isSaved={isCurrentSaved}
        onShare={() => {
          setIsResultModalOpen(false);
          setIsShareModalOpen(true);
        }}
        onContinueRemix={() => setIsResultModalOpen(false)}
      />

      {/* Social Share Modal (4:5 or 1:1) */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        selection={selection}
        outfitCode={currentCode}
      />

      {/* Demo Tour Modal (30s Judge Experience) */}
      <DemoTourModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onFinishDemo={handleFinishDemo}
      />

      {/* Global Lookbook Modal */}
      <LookbookModal
        isOpen={isGlobalLookbookOpen}
        onClose={() => setIsGlobalLookbookOpen(false)}
        savedOutfits={savedOutfits}
      />
    </div>
  );
};

export default App;
