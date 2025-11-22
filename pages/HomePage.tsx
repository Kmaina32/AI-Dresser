
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import CreatorDisplay from '../components/ImageUploader.tsx';
import { 
  CATEGORIZED_SUIT_STYLES, 
  CATEGORIZED_WOMENS_STYLES,
  CATEGORIZED_KIDS_STYLES,
  CATEGORIZED_VEHICLE_STYLES,
  CATEGORIZED_INTERIOR_STYLES,
  CATEGORIZED_LANDSCAPE_STYLES,
  APPAREL_BACKGROUNDS,
  VEHICLE_BACKGROUNDS,
  INTERIOR_BACKGROUNDS,
  LANDSCAPE_BACKGROUNDS,
  APPAREL_LIGHTING,
  VEHICLE_LIGHTING,
  INTERIOR_LIGHTING,
  LANDSCAPE_LIGHTING,
  CATEGORIZED_SHOE_STYLES, 
  CATEGORIZED_WOMENS_SHOE_STYLES,
  CATEGORIZED_KIDS_SHOE_STYLES,
  DEFAULT_SHOE_OPTION, 
  QUALITY_OPTIONS, 
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
  CATEGORIZED_HEADWEAR_STYLES,
  StyleOption,
  DEFAULT_VEHICLE_MOD_OPTION,
  CATEGORIZED_VEHICLE_RIMS,
  CATEGORIZED_VEHICLE_AERO,
  CATEGORIZED_VEHICLE_INTERIOR,
  CATEGORIZED_VEHICLE_LIGHTING_GRILL
} from '../constants.ts';
import { editImageWithGemini, DesignMode } from '../services/geminiService.ts';
import { SparklesIcon } from '../components/icons/SparklesIcon.tsx';
import FaceLockToggle from '../components/FaceLockToggle.tsx';
import QualitySelector from '../components/QualitySelector.tsx';
import DropdownSelector from '../components/DropdownSelector.tsx';
import { RemixConfig } from '../App.tsx';
import StyleSelector from '../components/StyleSelector.tsx';
import CollapsibleSection from '../components/CollapsibleSection.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
import { SlidersIcon } from '../components/icons/SlidersIcon.tsx';

// Icons for Modes
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>;
const CarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
const TreeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 20.25V21a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-.75a2.25 2.25 0 0 1 2.25-2.25h3a2.25 2.25 0 0 1 2.25 2.25Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v3.75M12 2.25a9.75 9.75 0 0 1 9.75 9.75c0 1.656-.403 3.224-1.116 4.609-.3.586-1.247.562-1.512-.05-.21-.484-.327-1.009-.327-1.559 0-3.012-2.033-5.55-4.8-6.378-.484-.144-1-.04-1.383.268-.297.237-.576.499-.834.783-.57.624-1.543.624-2.113 0a9.725 9.725 0 0 0-.834-.783c-.384-.308-.9-.412-1.383-.268C5.033 4.45 3 6.988 3 10c0 .55.117 1.075.327 1.559.265.612-.678.636-.978.05A9.75 9.75 0 0 1 12 2.25Z" /></svg>;


type AttireType = 'menswear' | 'womenswear' | 'kidswear';

interface HomePageProps {
  initialRemixConfig: RemixConfig | null;
  clearRemixConfig: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ initialRemixConfig, clearRemixConfig }) => {
  const [mode, setMode] = useState<DesignMode>('apparel');
  const [attireType, setAttireType] = useState<AttireType>('menswear');

  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // Changed to Array for Multi-Select
  const [selectedStyleIds, setSelectedStyleIds] = useState<string[]>([]);
  
  const [selectedColor, setSelectedColor] = useState<string>('automatic');
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [selectedLighting, setSelectedLighting] = useState<string>('');
  const [selectedQuality, setSelectedQuality] = useState<string>(QUALITY_OPTIONS[0].value);
  const [isLockEnabled, setIsLockEnabled] = useState<boolean>(true);

  const [targetPerson, setTargetPerson] = useState<string>('');
  const [selectedPosture, setSelectedPosture] = useState<string>(DEFAULT_POSTURE_OPTION.prompt);
  
  // Apparel Accessories
  const [selectedShoe, setSelectedShoe] = useState<string>(DEFAULT_SHOE_OPTION.prompt);
  const [selectedShirt, setSelectedShirt] = useState<string>(DEFAULT_SHIRT_OPTION.prompt);
  const [selectedTie, setSelectedTie] = useState<string>(DEFAULT_TIE_OPTION.prompt);
  const [selectedHandbag, setSelectedHandbag] = useState<string>(DEFAULT_HANDBAG_OPTION.prompt);
  const [selectedEyewear, setSelectedEyewear] = useState<string>(DEFAULT_EYEWEAR_OPTION.prompt);
  const [selectedHeadwear, setSelectedHeadwear] = useState<string>(DEFAULT_HEADWEAR_OPTION.prompt);

  // Vehicle Mods
  const [selectedRims, setSelectedRims] = useState<string>(DEFAULT_VEHICLE_MOD_OPTION.prompt);
  const [selectedAero, setSelectedAero] = useState<string>(DEFAULT_VEHICLE_MOD_OPTION.prompt);
  const [selectedVehicleInterior, setSelectedVehicleInterior] = useState<string>(DEFAULT_VEHICLE_MOD_OPTION.prompt);
  const [selectedVehicleLighting, setSelectedVehicleLighting] = useState<string>(DEFAULT_VEHICLE_MOD_OPTION.prompt);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const currentStylesSource = useMemo(() => {
      switch(mode) {
          case 'vehicle': return CATEGORIZED_VEHICLE_STYLES;
          case 'interior': return CATEGORIZED_INTERIOR_STYLES;
          case 'landscape': return CATEGORIZED_LANDSCAPE_STYLES;
          default: 
            if (attireType === 'kidswear') return CATEGORIZED_KIDS_STYLES;
            return attireType === 'menswear' ? CATEGORIZED_SUIT_STYLES : CATEGORIZED_WOMENS_STYLES;
      }
  }, [mode, attireType]);

  const currentBackgrounds = useMemo(() => {
      switch(mode) {
          case 'vehicle': return VEHICLE_BACKGROUNDS;
          case 'interior': return INTERIOR_BACKGROUNDS;
          case 'landscape': return LANDSCAPE_BACKGROUNDS;
          default: return APPAREL_BACKGROUNDS;
      }
  }, [mode]);

  const currentLighting = useMemo(() => {
      switch(mode) {
          case 'vehicle': return VEHICLE_LIGHTING;
          case 'interior': return INTERIOR_LIGHTING;
          case 'landscape': return LANDSCAPE_LIGHTING;
          default: return APPAREL_LIGHTING;
      }
  }, [mode]);

  useEffect(() => {
      // Reset selections when mode changes, default to first item
      const firstStyle = currentStylesSource[0]?.styles[0];
      if (firstStyle) setSelectedStyleIds([firstStyle.id]);
      setSelectedBackground(currentBackgrounds[0]?.prompt || '');
      setSelectedLighting(currentLighting[0]?.prompt || '');
  }, [currentStylesSource, currentBackgrounds, currentLighting, mode]);

  // Used for finding color palette of the LAST selected item
  const lastSelectedStyleId = selectedStyleIds[selectedStyleIds.length - 1];
  const selectedStyleObject: StyleOption | undefined = useMemo(() => 
      currentStylesSource.flatMap(c => c.styles).find(s => s.id === lastSelectedStyleId),
      [lastSelectedStyleId, currentStylesSource]
  );

  const handleStyleToggle = (id: string) => {
      setSelectedStyleIds(prev => {
          if (prev.includes(id)) {
              // Prevent deselecting the last item
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

  const handleGenerateClick = useCallback(async () => {
    if (!originalImageFile) {
      setError('Please upload an image first.');
      return;
    }
    
    // Construct combined style prompt
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
        mode,
        // Pass new vehicle mod params (will be ignored by other modes)
        selectedRims, selectedAero, selectedVehicleInterior, selectedVehicleLighting
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
    isLockEnabled, selectedQuality, mode, attireType,
    selectedRims, selectedAero, selectedVehicleInterior, selectedVehicleLighting
  ]);

  const backgroundOptions = useMemo(() => currentBackgrounds.map(option => ({ label: option.name, value: option.prompt })), [currentBackgrounds]);
  const lightingOptions = useMemo(() => currentLighting.map(option => ({ label: option.name, value: option.prompt })), [currentLighting]);
  
  const shoeOptions = [{ label: DEFAULT_SHOE_OPTION.name, value: DEFAULT_SHOE_OPTION.prompt }];
  const shirtOptionsList = [DEFAULT_SHIRT_OPTION, ...SHIRT_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  const postureOptionsList = [DEFAULT_POSTURE_OPTION, ...POSTURE_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  
  const currentShoeStyles = useMemo(() => {
      if (attireType === 'kidswear') return CATEGORIZED_KIDS_SHOE_STYLES;
      return attireType === 'menswear' ? CATEGORIZED_SHOE_STYLES : CATEGORIZED_WOMENS_SHOE_STYLES;
  }, [attireType]);

  const ModeButton = ({ m, label, icon }: { m: DesignMode, label: string, icon: React.ReactNode }) => (
      <button 
        onClick={() => setMode(m)}
        className={`flex-1 flex flex-col items-center justify-center py-4 gap-2 transition-all border-b-2 relative overflow-hidden ${mode === m ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5'}`}
      >
          <div className={`transform transition-transform ${mode === m ? 'scale-110' : ''}`}>{icon}</div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{label}</span>
          {mode === m && <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 to-transparent pointer-events-none"></div>}
      </button>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full relative">
        {/* Backdrop for mobile menu */}
        {isSidebarOpen && (
            <div 
                onClick={() => setIsSidebarOpen(false)} 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden" 
            />
        )}

        {/* Sidebar */}
        <div className={`
            fixed inset-0 lg:relative lg:inset-auto
            w-full sm:w-[420px] lg:w-[420px]
            glass-panel border-r-0 lg:border-r border-white/5
            flex flex-col z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex-shrink-0 bg-white/90 dark:bg-zinc-950/80
        `}>
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 lg:hidden bg-zinc-50 dark:bg-zinc-950/80 backdrop-blur-md relative z-20 shadow-2xl">
                <div className="flex items-center gap-3">
                     <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <SlidersIcon className="w-5 h-5 text-amber-400" />
                     </div>
                     <span className="font-playfair text-xl text-zinc-900 dark:text-white font-bold tracking-wide">Configuration</span>
                </div>
                <button 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-95 border border-black/5 dark:border-white/5"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Mode Selector */}
            <div className="flex border-b border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-black/20 backdrop-blur-sm">
                <ModeButton m="apparel" label="Apparel" icon={<UserIcon />} />
                <ModeButton m="vehicle" label="Vehicle" icon={<CarIcon />} />
                <ModeButton m="interior" label="Interior" icon={<HomeIcon />} />
                <ModeButton m="landscape" label="Garden" icon={<TreeIcon />} />
            </div>

            {/* Scrollable Controls */}
            <div className="flex-grow overflow-y-auto custom-scrollbar pb-32 lg:pb-0">
                {mode === 'apparel' && (
                    <div className="p-6 border-b border-zinc-200 dark:border-white/5">
                        <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-100 dark:bg-black/40 rounded-lg border border-zinc-200 dark:border-white/5">
                            <button onClick={() => setAttireType('menswear')} className={`py-2 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${attireType === 'menswear' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg border border-zinc-200 dark:border-white/10' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}>Men</button>
                            <button onClick={() => setAttireType('womenswear')} className={`py-2 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${attireType === 'womenswear' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg border border-zinc-200 dark:border-white/10' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}>Women</button>
                            <button onClick={() => setAttireType('kidswear')} className={`py-2 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${attireType === 'kidswear' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg border border-zinc-200 dark:border-white/10' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}>Kids</button>
                        </div>
                    </div>
                )}

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

                <CollapsibleSection title="Environment">
                    <div className="space-y-6">
                        <DropdownSelector label="Background" options={backgroundOptions} selectedValue={selectedBackground} onSelect={setSelectedBackground} />
                        <DropdownSelector label="Lighting" options={lightingOptions} selectedValue={selectedLighting} onSelect={setSelectedLighting} />
                    </div>
                </CollapsibleSection>
                
                {mode === 'apparel' && (
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
                )}

                {mode === 'vehicle' && (
                    <CollapsibleSection title="Vehicle Customization">
                        <div className="space-y-6">
                            <DropdownSelector label="Wheels & Rims" options={[{ label: DEFAULT_VEHICLE_MOD_OPTION.name, value: DEFAULT_VEHICLE_MOD_OPTION.prompt }]} optionGroups={CATEGORIZED_VEHICLE_RIMS} selectedValue={selectedRims} onSelect={setSelectedRims} valueProp="prompt" />
                            <DropdownSelector label="Aero & Body" options={[{ label: DEFAULT_VEHICLE_MOD_OPTION.name, value: DEFAULT_VEHICLE_MOD_OPTION.prompt }]} optionGroups={CATEGORIZED_VEHICLE_AERO} selectedValue={selectedAero} onSelect={setSelectedAero} valueProp="prompt" />
                            <DropdownSelector label="Lighting & Grill" options={[{ label: DEFAULT_VEHICLE_MOD_OPTION.name, value: DEFAULT_VEHICLE_MOD_OPTION.prompt }]} optionGroups={CATEGORIZED_VEHICLE_LIGHTING_GRILL} selectedValue={selectedVehicleLighting} onSelect={setSelectedVehicleLighting} valueProp="prompt" />
                            <DropdownSelector label="Interior (Visible)" options={[{ label: DEFAULT_VEHICLE_MOD_OPTION.name, value: DEFAULT_VEHICLE_MOD_OPTION.prompt }]} optionGroups={CATEGORIZED_VEHICLE_INTERIOR} selectedValue={selectedVehicleInterior} onSelect={setSelectedVehicleInterior} valueProp="prompt" />
                        </div>
                    </CollapsibleSection>
                )}

                <CollapsibleSection title="Settings">
                   <div className="space-y-6">
                        <QualitySelector options={QUALITY_OPTIONS} selectedQuality={selectedQuality} onSelectQuality={setSelectedQuality} />
                        <FaceLockToggle isEnabled={isLockEnabled} onToggle={setIsLockEnabled} mode={mode} />
                        {mode === 'apparel' && (
                            <DropdownSelector label="Posture" options={postureOptionsList} selectedValue={selectedPosture} onSelect={setSelectedPosture} />
                        )}
                    </div>
                </CollapsibleSection>
            </div>
            
            {/* Desktop Generate Button Area */}
            <div className="p-6 border-t border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-lg hidden lg:block">
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

        {/* Main Canvas Area */}
        <div className="flex-grow h-full relative overflow-y-auto custom-scrollbar flex flex-col items-center justify-center pt-12 pb-32 px-4 md:px-12 lg:py-12 z-0">
             {/* Mobile Toggle Button */}
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
        
        {/* Mobile Sticky Bottom Action Bar */}
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
