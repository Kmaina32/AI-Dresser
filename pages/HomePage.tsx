import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ImageUploader from '../components/ImageUploader';
import ResultDisplay from '../components/ResultDisplay';
import { 
  CATEGORIZED_SUIT_STYLES, 
  CATEGORIZED_WOMENS_STYLES,
  BACKGROUND_OPTIONS, 
  CATEGORIZED_SHOE_STYLES, 
  CATEGORIZED_WOMENS_SHOE_STYLES,
  DEFAULT_SHOE_OPTION, 
  QUALITY_OPTIONS, 
  LIGHTING_OPTIONS,
  SHIRT_OPTIONS,
  DEFAULT_SHIRT_OPTION,
  TIE_OPTIONS,
  DEFAULT_TIE_OPTION,
  CATEGORIZED_HANDBAG_STYLES,
  DEFAULT_HANDBAG_OPTION,
  POSTURE_OPTIONS,
  // Fix: Corrected typo from DEFAULT_POSTROW_OPTION to DEFAULT_POSTURE_OPTION.
  DEFAULT_POSTURE_OPTION,
  DEFAULT_EYEWEAR_OPTION,
  EYEWEAR_OPTIONS,
  DEFAULT_HEADWEAR_OPTION,
  CATEGORIZED_HEADWEAR_STYLES,
  StyleOption
} from '../constants';
import { editImageWithGemini } from '../services/geminiService';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import FaceLockToggle from '../components/FaceLockToggle';
import QualitySelector from '../components/QualitySelector';
import DropdownSelector from '../components/DropdownSelector';
import { RemixConfig } from '../App';
import { WandIcon } from '../components/icons/WandIcon';
import StyleSelector from '../components/StyleSelector';

import { ShirtIcon } from '../components/icons/ShirtIcon';
import { LandscapeIcon } from '../components/icons/LandscapeIcon';
import { AccessoriesIcon } from '../components/icons/AccessoriesIcon';
import { SlidersIcon } from '../components/icons/SlidersIcon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

type AttireType = 'menswear' | 'womenswear';
type ActivePanel = 'styles' | 'scene' | 'accessories' | 'refine' | null;

interface HomePageProps {
  initialRemixConfig: RemixConfig | null;
  clearRemixConfig: () => void;
}

const SidebarNavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-1 w-full p-2 rounded-lg transition-colors text-xs ${isActive ? 'bg-amber-500 text-black' : 'text-gray-300 hover:bg-zinc-700'}`}
        aria-label={`Open ${label} panel`}
    >
        {children}
        <span>{label}</span>
    </button>
);


const HomePage: React.FC<HomePageProps> = ({ initialRemixConfig, clearRemixConfig }) => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const [attireType, setAttireType] = useState<AttireType>('menswear');
  const [targetPerson, setTargetPerson] = useState<string>('');
  const [selectedPosture, setSelectedPosture] = useState<string>(DEFAULT_POSTURE_OPTION.prompt);
  
  const [selectedStyleId, setSelectedStyleId] = useState<string>(CATEGORIZED_SUIT_STYLES[0].styles[0].id);
  const [selectedColor, setSelectedColor] = useState<string>('automatic');

  const [selectedBackground, setSelectedBackground] = useState<string>(BACKGROUND_OPTIONS[0].prompt);
  const [selectedLighting, setSelectedLighting] = useState<string>(LIGHTING_OPTIONS[0].prompt);
  const [selectedShoe, setSelectedShoe] = useState<string>(DEFAULT_SHOE_OPTION.prompt);
  const [selectedShirt, setSelectedShirt] = useState<string>(DEFAULT_SHIRT_OPTION.prompt);
  const [selectedTie, setSelectedTie] = useState<string>(DEFAULT_TIE_OPTION.prompt);
  const [selectedHandbag, setSelectedHandbag] = useState<string>(DEFAULT_HANDBAG_OPTION.prompt);
  const [selectedEyewear, setSelectedEyewear] = useState<string>(DEFAULT_EYEWEAR_OPTION.prompt);
  const [selectedHeadwear, setSelectedHeadwear] = useState<string>(DEFAULT_HEADWEAR_OPTION.prompt);
  
  const [selectedQuality, setSelectedQuality] = useState<string>(QUALITY_OPTIONS[0].value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFaceLockEnabled, setIsFaceLockEnabled] = useState<boolean>(true);
  
  const [activePanel, setActivePanel] = useState<ActivePanel>('styles');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar

  const handleImageUpload = (file: File, dataUrl: string) => {
    setOriginalImageFile(file);
    setOriginalImage(dataUrl);
    setGeneratedImage(null);
    setError(null);
  };

  const updateStyleSelection = useCallback((styleId: string) => {
    setSelectedStyleId(styleId);
    setSelectedColor('automatic'); // Reset color when style changes
  }, []);

  const handleAttireTypeChange = (type: AttireType) => {
    if (attireType === type) return;

    setAttireType(type);
    setActiveFilters([]); 
    setSearchQuery(''); 
    
    setSelectedShoe(DEFAULT_SHOE_OPTION.prompt);
    setSelectedShirt(DEFAULT_SHIRT_OPTION.prompt);
    setSelectedTie(DEFAULT_TIE_OPTION.prompt);
    setSelectedHandbag(DEFAULT_HANDBAG_OPTION.prompt);
    setSelectedEyewear(DEFAULT_EYEWEAR_OPTION.prompt);
    setSelectedHeadwear(DEFAULT_HEADWEAR_OPTION.prompt);
    setSelectedColor('automatic');

    const initialStyleId = type === 'menswear' 
        ? CATEGORIZED_SUIT_STYLES[0].styles[0].id
        : CATEGORIZED_WOMENS_STYLES[0].styles[0].id;
    updateStyleSelection(initialStyleId);
  };

  useEffect(() => {
    if (initialRemixConfig) {
      const allStylesForType = (initialRemixConfig.attireType === 'menswear' ? CATEGORIZED_SUIT_STYLES : CATEGORIZED_WOMENS_STYLES).flatMap(c => c.styles);
      const styleToApply = allStylesForType.find(s => s.prompt === initialRemixConfig.stylePrompt);

      if (styleToApply) {
        setActiveFilters([]);
        setSearchQuery('');
        setAttireType(initialRemixConfig.attireType);
        updateStyleSelection(styleToApply.id);
        setSelectedBackground(initialRemixConfig.backgroundPrompt);
        setSelectedLighting(initialRemixConfig.lightingPrompt);
        setSelectedShoe(initialRemixConfig.shoePrompt ?? DEFAULT_SHOE_OPTION.prompt);
        setSelectedShirt(initialRemixConfig.shirtPrompt ?? DEFAULT_SHIRT_OPTION.prompt);
        setSelectedTie(initialRemixConfig.tiePrompt ?? DEFAULT_TIE_OPTION.prompt);
        setActivePanel('styles');
        setIsSidebarOpen(true); // Open sidebar on mobile when remixing
      }
      clearRemixConfig();
    }
  }, [initialRemixConfig, clearRemixConfig, updateStyleSelection]);

  const currentStylesSource = useMemo(() => 
    attireType === 'menswear' ? CATEGORIZED_SUIT_STYLES : CATEGORIZED_WOMENS_STYLES,
    [attireType]
  );

  const selectedStyleObject: StyleOption | undefined = useMemo(() => 
      currentStylesSource.flatMap(c => c.styles).find(s => s.id === selectedStyleId),
      [selectedStyleId, currentStylesSource]
  );

  const handleGenerateClick = useCallback(async () => {
    if (!originalImageFile) {
      setError('Please upload an image first.');
      return;
    }

    const selectedStylePrompt = selectedStyleObject?.prompt;
    if (!selectedStylePrompt) {
        setError('Please select a valid style.');
        return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);
    setIsSidebarOpen(false); // Close sidebar on mobile when generation starts

    try {
      const result = await editImageWithGemini(
        originalImageFile, selectedStylePrompt, selectedColor,
        selectedBackground, selectedLighting, selectedShoe, selectedShirt,
        selectedTie, selectedHandbag, selectedEyewear, selectedHeadwear,
        targetPerson, selectedPosture, isFaceLockEnabled, selectedQuality
      );
      setGeneratedImage(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [
    originalImageFile, selectedStyleObject, selectedColor, selectedBackground, 
    selectedLighting, selectedShoe, selectedShirt, selectedTie, selectedHandbag, 
    selectedEyewear, selectedHeadwear, targetPerson, selectedPosture, 
    isFaceLockEnabled, selectedQuality
  ]);
  
  const handleSurpriseMe = () => {
    setActiveFilters([]);
    setSearchQuery('');
    const randomAttireType = Math.random() < 0.5 ? 'menswear' : 'womenswear';
    
    handleAttireTypeChange(randomAttireType);

    const styles = (randomAttireType === 'menswear' ? CATEGORIZED_SUIT_STYLES : CATEGORIZED_WOMENS_STYLES).flatMap(cat => cat.styles);
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    updateStyleSelection(randomStyle.id);

    const backgrounds = BACKGROUND_OPTIONS.slice(1);
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setSelectedBackground(randomBackground.prompt);

    const lightings = LIGHTING_OPTIONS.slice(1);
    const randomLighting = lightings[Math.floor(Math.random() * lightings.length)];
    setSelectedLighting(randomLighting.prompt);

    setSelectedShoe(DEFAULT_SHOE_OPTION.prompt);
    setSelectedShirt(DEFAULT_SHIRT_OPTION.prompt);
    setSelectedTie(DEFAULT_TIE_OPTION.prompt);
    setSelectedHandbag(DEFAULT_HANDBAG_OPTION.prompt);
    setSelectedEyewear(DEFAULT_EYEWEAR_OPTION.prompt);
    setSelectedHeadwear(DEFAULT_HEADWEAR_OPTION.prompt);
    setTargetPerson('');
    setSelectedPosture(DEFAULT_POSTURE_OPTION.prompt);
    setSelectedColor('automatic');
    setActivePanel('styles');
    setIsSidebarOpen(true);
  };

  const backgroundOptions = BACKGROUND_OPTIONS.map(option => ({ label: option.name, value: option.prompt }));
  const lightingOptions = LIGHTING_OPTIONS.map(option => ({ label: option.name, value: option.prompt }));
  const shoeOptions = [{ label: DEFAULT_SHOE_OPTION.name, value: DEFAULT_SHOE_OPTION.prompt }];
  const shirtOptionsList = [DEFAULT_SHIRT_OPTION, ...SHIRT_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  const tieOptionsList = [DEFAULT_TIE_OPTION, ...TIE_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  const postureOptionsList = [DEFAULT_POSTURE_OPTION, ...POSTURE_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  const eyewearOptionsList = [DEFAULT_EYEWEAR_OPTION, ...EYEWEAR_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  const currentShoeStyles = attireType === 'menswear' ? CATEGORIZED_SHOE_STYLES : CATEGORIZED_WOMENS_SHOE_STYLES;
  
  const renderPanelContent = () => {
    switch(activePanel) {
        case 'styles':
            return <StyleSelector 
                        attireType={attireType}
                        onAttireTypeChange={handleAttireTypeChange}
                        categories={currentStylesSource}
                        selectedStyleId={selectedStyleId}
                        onSelectStyle={updateStyleSelection}
                        selectedColor={selectedColor}
                        onSelectColor={setSelectedColor}
                        selectedStyleObject={selectedStyleObject}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        activeFilters={activeFilters}
                        onFilterToggle={(tag) => setActiveFilters(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                        onClearFilters={() => setActiveFilters([])}
                    />;
        case 'scene':
            return <div className="p-4 space-y-6">
                <DropdownSelector label="Background" options={backgroundOptions} selectedValue={selectedBackground} onSelect={setSelectedBackground} isCentered={false} />
                <DropdownSelector label="Lighting" options={lightingOptions} selectedValue={selectedLighting} onSelect={setSelectedLighting} isCentered={false} />
            </div>;
        case 'accessories':
            return <div className="p-4 space-y-6">
                <DropdownSelector label="Shoes" options={shoeOptions} optionGroups={currentShoeStyles} selectedValue={selectedShoe} onSelect={setSelectedShoe} valueProp="prompt" isCentered={false} />
                {attireType === 'menswear' && (
                  <>
                    <DropdownSelector label="Shirt Style" options={shirtOptionsList} selectedValue={selectedShirt} onSelect={setSelectedShirt} isCentered={false} />
                    <DropdownSelector label="Tie Style" options={tieOptionsList} selectedValue={selectedTie} onSelect={setSelectedTie} isCentered={false} />
                  </>
                )}
                {attireType === 'womenswear' && (
                    <DropdownSelector label="Handbag" options={[{ label: DEFAULT_HANDBAG_OPTION.name, value: DEFAULT_HANDBAG_OPTION.prompt }]} optionGroups={CATEGORIZED_HANDBAG_STYLES} selectedValue={selectedHandbag} onSelect={setSelectedHandbag} valueProp="prompt" isCentered={false} />
                )}
                <DropdownSelector label="Eyewear (Optional)" options={eyewearOptionsList} selectedValue={selectedEyewear} onSelect={setSelectedEyewear} isCentered={false} />
                <DropdownSelector label="Headwear (Optional)" options={[{ label: DEFAULT_HEADWEAR_OPTION.name, value: DEFAULT_HEADWEAR_OPTION.prompt }]} optionGroups={CATEGORIZED_HEADWEAR_STYLES} selectedValue={selectedHeadwear} onSelect={setSelectedHeadwear} valueProp="prompt" isCentered={false} />
            </div>;
        case 'refine':
            return <div className="p-4 space-y-6">
                <FaceLockToggle isEnabled={isFaceLockEnabled} onToggle={setIsFaceLockEnabled} />
                <QualitySelector options={QUALITY_OPTIONS} selectedQuality={selectedQuality} onSelectQuality={setSelectedQuality} />
                 <div>
                    <label htmlFor="target-person" className="block text-lg font-semibold mb-2 text-gray-300">Target Person (Optional)</label>
                    <input id="target-person" type="text" value={targetPerson} onChange={(e) => setTargetPerson(e.target.value)} placeholder="e.g., 'person on the left'" className="appearance-none w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200" aria-label="Target person for styling" />
                </div>
                <DropdownSelector label="Posture (Optional)" options={postureOptionsList} selectedValue={selectedPosture} onSelect={setSelectedPosture} isCentered={false} />
            </div>;
        default:
            return null;
    }
  }

  const panelTitles: Record<string, string> = {
    styles: 'Styles',
    scene: 'Scene',
    accessories: 'Accessories',
    refine: 'Refine & Finalize',
  };

  const generateButton = (
    <>
      <button
        onClick={handleGenerateClick}
        disabled={!originalImage || isLoading || !selectedStyleId}
        className="inline-flex items-center justify-center w-full px-8 py-4 bg-amber-500 text-black font-bold rounded-lg shadow-lg hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300"
      >
        <SparklesIcon className="w-6 h-6 mr-3" />
        {isLoading ? 'Creating...' : 'Generate'}
      </button>
      {error && <p className="text-red-400 mt-2 text-center text-sm">{error}</p>}
    </>
  );

  return (
    <main className="h-[calc(100vh-81px)] flex flex-col lg:flex-row">
        {/* --- Mobile Sidebar Overlay --- */}
        {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-30 lg:hidden" />}

        {/* --- Sidebar (Handles both desktop and mobile) --- */}
        <div className={`
            fixed lg:relative
            inset-y-0 left-0 
            h-full lg:h-auto 
            flex z-40
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
        `}>
            {/* Primary Nav */}
            <div className={`
                w-24 bg-black flex-shrink-0 
                flex flex-col items-center p-2 gap-2 border-r border-zinc-800
                ${activePanel ? 'hidden lg:flex' : 'flex'}
            `}>
                <SidebarNavButton label="Styles" isActive={activePanel === 'styles'} onClick={() => setActivePanel('styles')}>
                    <ShirtIcon className="w-6 h-6" />
                </SidebarNavButton>
                <SidebarNavButton label="Scene" isActive={activePanel === 'scene'} onClick={() => setActivePanel('scene')}>
                    <LandscapeIcon className="w-6 h-6" />
                </SidebarNavButton>
                <SidebarNavButton label="Accessories" isActive={activePanel === 'accessories'} onClick={() => setActivePanel('accessories')}>
                    <AccessoriesIcon className="w-6 h-6" />
                </SidebarNavButton>
                <SidebarNavButton label="Refine" isActive={activePanel === 'refine'} onClick={() => setActivePanel('refine')}>
                    <SlidersIcon className="w-6 h-6" />
                </SidebarNavButton>

                <div className="mt-auto w-full">
                     <button 
                      onClick={handleSurpriseMe}
                      className="flex flex-col items-center justify-center gap-1 w-full p-2 rounded-lg transition-colors text-xs text-amber-400 hover:bg-zinc-700"
                      title="Generate a random style combination"
                    >
                      <WandIcon className="w-6 h-6" />
                      Surprise Me
                    </button>
                </div>
            </div>

            {/* Secondary Panel */}
            <div className={`
                w-screen sm:w-96 bg-zinc-900 h-full flex flex-col 
                transition-all duration-300
                ${activePanel ? 'translate-x-0' : '-translate-x-full'}
                ${activePanel && 'lg:w-96'}
                
            `}>
                {activePanel && (
                    <>
                        <div className="flex items-center p-4 border-b border-zinc-800 flex-shrink-0">
                           <button onClick={() => setActivePanel(null)} className="text-gray-400 hover:text-white mr-3 lg:hidden">
                                <ArrowLeftIcon className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-semibold text-white">{panelTitles[activePanel]}</h2>
                        </div>
                        <div className="flex-grow overflow-y-auto custom-scrollbar">
                            {renderPanelContent()}
                        </div>
                        <div className="p-4 border-t border-zinc-800 hidden lg:block flex-shrink-0">
                             {generateButton}
                        </div>
                    </>
                )}
            </div>
        </div>

        {/* --- Main Content Area --- */}
        <div className="flex-grow h-full bg-zinc-950 p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-5xl mx-auto">
                 {/* Mobile Controls Header */}
                 <div className="lg:hidden flex justify-end items-center mb-4">
                     <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg border border-zinc-700"
                    >
                         <SlidersIcon className="w-5 h-5" />
                         Controls
                     </button>
                 </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <ImageUploader onImageUpload={handleImageUpload} originalImage={originalImage} />
                    <ResultDisplay originalImage={originalImage} generatedImage={generatedImage} isLoading={isLoading} />
                </div>
                 {!originalImage && (
                    <div className="text-center mt-12">
                         <h1 className="text-4xl font-bold font-playfair mb-4 text-white">Welcome to the Creator</h1>
                         <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                           Get started by uploading a photo. Then, use the panel on the left to customize your perfect look.
                         </p>
                    </div>
                 )}
            </div>
        </div>
        
        {/* --- Mobile Sticky CTA --- */}
        <div className="lg:hidden sticky-cta">
            {generateButton}
        </div>
    </main>
  );
};

export default HomePage;