import React, { useState, useCallback, useEffect, useMemo } from 'react';
import CreatorDisplay from '../components/ImageUploader.tsx';
import SimpleImageUploader from '../components/SimpleImageUploader.tsx';
import { 
  CATEGORIZED_SUIT_STYLES, 
  CATEGORIZED_WOMENS_STYLES,
  CATEGORIZED_KIDS_STYLES,
  APPAREL_BACKGROUNDS,
  APPAREL_LIGHTING,
  CATEGORIZED_SHOE_STYLES, 
  CATEGORIZED_WOMENS_SHOE_STYLES,
  CATEGORIZED_KIDS_SHOE_STYLES,
  DEFAULT_SHOE_OPTION, 
  SHIRT_OPTIONS,
  DEFAULT_SHIRT_OPTION,
  CATEGORIZED_TIE_STYLES,
  DEFAULT_TIE_OPTION,
  CATEGORIZED_HANDBAG_STYLES,
  DEFAULT_HANDBAG_OPTION,
  POSTURE_OPTIONS,
  DEFAULT_POSTURE_OPTION,
  DEFAULT_EYEWEAR_OPTION,
  CATEGORIZED_EYEWEAR_STYLES,
  DEFAULT_HEADWEAR_OPTION,
  CATEGORIZED_HEADWEAR_STYLES
} from '../constants/apparel.ts';
import { 
  QUALITY_OPTIONS, 
  StyleOption,
  RemixConfig
} from '../constants/shared.ts';
import { editImageWithGemini } from '../services/geminiService.ts';
import { SparklesIcon } from '../components/icons/SparklesIcon.tsx';
import FaceLockToggle from '../components/FaceLockToggle.tsx';
import QualitySelector from '../components/QualitySelector.tsx';
import DropdownSelector from '../components/DropdownSelector.tsx';
import StyleSelector from '../components/StyleSelector.tsx';
import CollapsibleSection from '../components/CollapsibleSection.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
import { SlidersIcon } from '../components/icons/SlidersIcon.tsx';
import { UserIcon } from '../components/icons/UserIcon.tsx';

type AttireType = 'menswear' | 'womenswear' | 'kidswear';

interface HomePageProps {
  initialRemixConfig: RemixConfig | null;
  clearRemixConfig: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ initialRemixConfig, clearRemixConfig }) => {
  const [attireType, setAttireType] = useState<AttireType>('menswear');

  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const [selectedStyleIds, setSelectedStyleIds] = useState<string[]>([]);
  
  const [selectedColor, setSelectedColor] = useState<string>('automatic');
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [selectedLighting, setSelectedLighting] = useState<string>('');
  const [selectedQuality, setSelectedQuality] = useState<string>(QUALITY_OPTIONS[0].value);
  const [isLockEnabled, setIsLockEnabled] = useState<boolean>(true);

  const [envImageFile, setEnvImageFile] = useState<File | null>(null);
  const [envImageUrl, setEnvImageUrl] = useState<string | null>(null);

  const [targetPerson, setTargetPerson] = useState<string>('');
  const [selectedPosture, setSelectedPosture] = useState<string>(DEFAULT_POSTURE_OPTION.prompt);
  
  const [selectedShoe, setSelectedShoe] = useState<string>(DEFAULT_SHOE_OPTION.prompt);
  const [selectedShirt, setSelectedShirt] = useState<string>(DEFAULT_SHIRT_OPTION.prompt);
  const [selectedTie, setSelectedTie] = useState<string>(DEFAULT_TIE_OPTION.prompt);
  const [selectedHandbag, setSelectedHandbag] = useState<string>(DEFAULT_HANDBAG_OPTION.prompt);
  const [selectedEyewear, setSelectedEyewear] = useState<string>(DEFAULT_EYEWEAR_OPTION.prompt);
  const [selectedHeadwear, setSelectedHeadwear] = useState<string>(DEFAULT_HEADWEAR_OPTION.prompt);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const currentStylesSource = useMemo(() => {
        if (attireType === 'kidswear') return CATEGORIZED_KIDS_STYLES;
        return attireType === 'menswear' ? CATEGORIZED_SUIT_STYLES : CATEGORIZED_WOMENS_STYLES;
  }, [attireType]);

  useEffect(() => {
      if (initialRemixConfig) {
          setAttireType(initialRemixConfig.attireType as AttireType);
          const foundStyle = currentStylesSource.flatMap(c => c.styles).find(s => s.prompt === initialRemixConfig.stylePrompt);
          if (foundStyle) {
              setSelectedStyleIds([foundStyle.id]);
          }
          
          setSelectedBackground(initialRemixConfig.backgroundPrompt);
          setSelectedLighting(initialRemixConfig.lightingPrompt);
          
          if (initialRemixConfig.shoePrompt) setSelectedShoe(initialRemixConfig.shoePrompt);
          if (initialRemixConfig.shirtPrompt) setSelectedShirt(initialRemixConfig.shirtPrompt);
          if (initialRemixConfig.tiePrompt) setSelectedTie(initialRemixConfig.tiePrompt);
          
          clearRemixConfig();
      } else {
          if (selectedStyleIds.length === 0 && currentStylesSource[0]?.styles[0]) {
              setSelectedStyleIds([currentStylesSource[0].styles[0].id]);
              setSelectedBackground(APPAREL_BACKGROUNDS[0]?.prompt || '');
              setSelectedLighting(APPAREL_LIGHTING[0]?.prompt || '');
          }
      }
  }, [initialRemixConfig, currentStylesSource, clearRemixConfig]);

  const lastSelectedStyleId = selectedStyleIds[selectedStyleIds.length - 1];
  const selectedStyleObject: StyleOption | undefined = useMemo(() => 
      currentStylesSource.flatMap(c => c.styles).find(s => s.id === lastSelectedStyleId),
      [lastSelectedStyleId, currentStylesSource]
  );

  const handleStyleToggle = (id: string) => {
      setSelectedStyleIds(prev => {
          if (prev.includes(id)) {
              if (prev.length === 1) return prev;
              return prev.filter(item => item !== id);
          } else {
              return [...prev, id];
          }
      });
      setSelectedColor('automatic');
  };

  const handleImageUpload = (file: File, dataUrl: string) => {
    setOriginalImageFile(file);
    setOriginalImage(dataUrl);
    setGeneratedImage(null);
    setError(null);
  };

  const handleEnvImageUpload = (file: File, dataUrl: string) => {
      setEnvImageFile(file);
      setEnvImageUrl(dataUrl);
      setSelectedBackground('');
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImageFile) {
      setError('Please upload an image first.');
      return;
    }
    
    const allStyles = currentStylesSource.flatMap(c => c.styles);
    const activeStyles = allStyles.filter(s => selectedStyleIds.includes(s.id));
    
    if (activeStyles.length === 0) {
        setError('Please select at least one style.');
        return;
    }

    const combinedStylePrompt = activeStyles.map(s => s.prompt).join(' combined with ');

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);
    setIsSidebarOpen(false);

    const effectiveTargetPerson = targetPerson || (attireType === 'kidswear' ? 'child' : '');

    try {
      const result = await editImageWithGemini(
        originalImageFile, combinedStylePrompt, selectedColor,
        selectedBackground, selectedLighting, selectedShoe, selectedShirt,
        selectedTie, selectedHandbag, selectedEyewear, selectedHeadwear,
        effectiveTargetPerson, selectedPosture, isLockEnabled, selectedQuality,
        'apparel', 
        undefined, undefined, undefined, undefined, 
        envImageFile || undefined 
      );
      setGeneratedImage(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [
    originalImageFile, selectedStyleIds, currentStylesSource, selectedColor, selectedBackground, 
    selectedLighting, selectedShoe, selectedShirt, selectedTie, selectedHandbag, 
    selectedEyewear, selectedHeadwear, targetPerson, selectedPosture, 
    isLockEnabled, selectedQuality, attireType,
    envImageFile
  ]);

  const backgroundOptions = useMemo(() => APPAREL_BACKGROUNDS.map(option => ({ label: option.name, value: option.prompt })), []);
  const lightingOptions = useMemo(() => APPAREL_LIGHTING.map(option => ({ label: option.name, value: option.prompt })), []);
  
  const shoeOptions = [{ label: DEFAULT_SHOE_OPTION.name, value: DEFAULT_SHOE_OPTION.prompt }];
  const shirtOptionsList = [DEFAULT_SHIRT_OPTION, ...SHIRT_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  const postureOptionsList = [DEFAULT_POSTURE_OPTION, ...POSTURE_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  
  const currentShoeStyles = useMemo(() => {
      if (attireType === 'kidswear') return CATEGORIZED_KIDS_SHOE_STYLES;
      return attireType === 'menswear' ? CATEGORIZED_SHOE_STYLES : CATEGORIZED_WOMENS_SHOE_STYLES;
  }, [attireType]);

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-4rem)] relative overflow-hidden">
        {isSidebarOpen && (
            <div 
                onClick={() => setIsSidebarOpen(false)} 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden" 
            />
        )}

        <div className={`
            fixed inset-0 lg:relative lg:inset-auto
            w-full sm:w-[420px] lg:w-[420px]
            border-r-0 lg:border-r border-zinc-200 dark:border-white/5
            flex flex-col z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex-shrink-0 
            bg-white dark:bg-zinc-950 h-full overflow-hidden
        `}>
            <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-white/5 lg:hidden bg-zinc-50 dark:bg-zinc-950/80 backdrop-blur-md relative z-20 shadow-2xl">
                <div className="flex items-center gap-3">
                     <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <UserIcon className="w-5 h-5 text-amber-400" />
                     </div>
                     <span className="font-playfair text-xl text-zinc-900 dark:text-white font-bold tracking-wide">Apparel Studio</span>
                </div>
                <button 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-95 border border-black/5 dark:border-white/5"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar pb-32 lg:pb-0">
                <div className="p-6 border-b border-zinc-200 dark:border-white/5">
                    <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-100 dark:bg-black/40 rounded-lg border border-zinc-200 dark:border-white/5">
                        <button onClick={() => setAttireType('menswear')} className={`py-2 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${attireType === 'menswear' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg border border-zinc-200 dark:border-white/10' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}>Men</button>
                        <button onClick={() => setAttireType('womenswear')} className={`py-2 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${attireType === 'womenswear' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg border border-zinc-200 dark:border-white/10' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}>Women</button>
                        <button onClick={() => setAttireType('kidswear')} className={`py-2 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${attireType === 'kidswear' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg border border-zinc-200 dark:border-white/10' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}>Kids</button>
                    </div>
                </div>

                <CollapsibleSection title="Style Selection" isOpen={true}>
                    <StyleSelector 
                        categories={currentStylesSource}
                        selectedStyleIds={selectedStyleIds}
                        onSelectStyle={handleStyleToggle}
                        selectedColor={selectedColor}
                        onSelectColor={setSelectedColor}
                        selectedStyleObject={selectedStyleObject}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        activeFilters={activeFilters}
                        onFilterToggle={(tag) => setActiveFilters(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                        onClearFilters={() => setActiveFilters([])}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="Environment" isOpen={true}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 pl-1">
                                Upload Custom Scene (Overrides Background)
                            </label>
                            <SimpleImageUploader 
                                label="Custom Environment" 
                                imageUrl={envImageUrl} 
                                onImageUpload={handleEnvImageUpload} 
                            />
                        </div>
                        
                        {!envImageUrl && (
                             <DropdownSelector label="Background" options={backgroundOptions} selectedValue={selectedBackground} onSelect={setSelectedBackground} />
                        )}

                        <DropdownSelector label="Lighting" options={lightingOptions} selectedValue={selectedLighting} onSelect={setSelectedLighting} />
                    </div>
                </CollapsibleSection>
                
                <CollapsibleSection title="Accessories">
                    <div className="space-y-6">
                        <DropdownSelector label="Footwear" options={shoeOptions} optionGroups={currentShoeStyles} selectedValue={selectedShoe} onSelect={setSelectedShoe} valueProp="prompt" />
                        {attireType === 'menswear' && (
                            <>
                                <DropdownSelector label="Shirt" options={shirtOptionsList} selectedValue={selectedShirt} onSelect={setSelectedShirt} />
                                <DropdownSelector label="Neckwear" options={[{ label: DEFAULT_TIE_OPTION.name, value: DEFAULT_TIE_OPTION.prompt }]} optionGroups={CATEGORIZED_TIE_STYLES} selectedValue={selectedTie} onSelect={setSelectedTie} valueProp="prompt" />
                            </>
                        )}
                        {attireType === 'womenswear' && (
                            <DropdownSelector label="Handbag" options={[{ label: DEFAULT_HANDBAG_OPTION.name, value: DEFAULT_HANDBAG_OPTION.prompt }]} optionGroups={CATEGORIZED_HANDBAG_STYLES} selectedValue={selectedHandbag} onSelect={setSelectedHandbag} valueProp="prompt" />
                        )}
                        <DropdownSelector label="Eyewear" options={[{ label: DEFAULT_EYEWEAR_OPTION.name, value: DEFAULT_EYEWEAR_OPTION.prompt }]} optionGroups={CATEGORIZED_EYEWEAR_STYLES} selectedValue={selectedEyewear} onSelect={setSelectedEyewear} valueProp="prompt" />
                        <DropdownSelector label="Headwear" options={[{ label: DEFAULT_HEADWEAR_OPTION.name, value: DEFAULT_HEADWEAR_OPTION.prompt }]} optionGroups={CATEGORIZED_HEADWEAR_STYLES} selectedValue={selectedHeadwear} onSelect={setSelectedHeadwear} valueProp="prompt" />
                    </div>
                </CollapsibleSection>

                <CollapsibleSection title="Settings">
                   <div className="space-y-6">
                        <QualitySelector options={QUALITY_OPTIONS} selectedQuality={selectedQuality} onSelectQuality={setSelectedQuality} />
                        <FaceLockToggle isEnabled={isLockEnabled} onToggle={setIsLockEnabled} mode="apparel" />
                        <DropdownSelector label="Posture" options={postureOptionsList} selectedValue={selectedPosture} onSelect={setSelectedPosture} />
                    </div>
                </CollapsibleSection>
            </div>
            
            <div className="p-6 border-t border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-lg hidden lg:block shrink-0">
                 <button
                    onClick={handleGenerateClick}
                    disabled={!originalImage || isLoading || selectedStyleIds.length === 0}
                    className="group relative w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] disabled:bg-zinc-200 dark:disabled:bg-zinc-900 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 btn-tech"
                >
                    <span className="flex items-center justify-center gap-3 relative z-10">
                        {isLoading ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <span>Generate Design</span>
                                <SparklesIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            </>
                        )}
                    </span>
                </button>
                {error && <p className="text-red-500 dark:text-red-400 mt-3 text-center text-[10px] uppercase tracking-wide border border-red-500/20 bg-red-500/5 py-2 rounded-sm">{error}</p>}
            </div>
        </div>

        <div className="flex-grow h-full relative overflow-y-auto custom-scrollbar flex flex-col items-center justify-center pt-12 pb-32 px-4 md:px-12 lg:py-12 z-0">
             <div className="lg:hidden absolute top-6 right-6 z-20">
                 <button onClick={() => setIsSidebarOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/60 backdrop-blur-xl text-zinc-900 dark:text-white rounded-full border border-zinc-200 dark:border-white/10 shadow-xl hover:border-amber-400/50 transition-all active:scale-95">
                     <SlidersIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                     <span className="text-[10px] font-bold uppercase tracking-wide">Settings</span>
                 </button>
             </div>

            <div className="w-full max-w-3xl animate-fade-in">
                <CreatorDisplay 
                  onImageUpload={handleImageUpload} 
                  originalImage={originalImage} 
                  generatedImage={generatedImage} 
                  isLoading={isLoading} 
                />
            </div>
        </div>
        
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-white/5 z-50">
             <button
                onClick={handleGenerateClick}
                disabled={!originalImage || isLoading || selectedStyleIds.length === 0}
                className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-lg disabled:opacity-50 btn-tech"
            >
                {isLoading ? 'Processing...' : 'Generate Design'}
            </button>
            {error && <p className="text-red-500 dark:text-red-400 mt-2 text-center text-xs">{error}</p>}
        </div>
    </div>
  );
};

export default HomePage;
