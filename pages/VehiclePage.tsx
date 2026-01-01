import React, { useState, useCallback, useMemo } from 'react';
import CreatorDisplay from '../components/ImageUploader.tsx';
import { 
  CATEGORIZED_VEHICLE_STYLES,
  VEHICLE_BACKGROUNDS,
  VEHICLE_LIGHTING,
  DEFAULT_VEHICLE_MOD_OPTION,
  CATEGORIZED_VEHICLE_RIMS,
  CATEGORIZED_VEHICLE_AERO,
  CATEGORIZED_VEHICLE_INTERIOR,
  CATEGORIZED_VEHICLE_LIGHTING_GRILL
} from '../constants/vehicle.ts';
import { 
  QUALITY_OPTIONS, 
  StyleOption
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

const CarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;

const VehiclePage: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const [selectedStyleIds, setSelectedStyleIds] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('automatic');
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [selectedLighting, setSelectedLighting] = useState<string>('');
  const [selectedQuality, setSelectedQuality] = useState<string>(QUALITY_OPTIONS[0].value);
  const [isLockEnabled, setIsLockEnabled] = useState<boolean>(true);

  const [selectedRims, setSelectedRims] = useState<string>(DEFAULT_VEHICLE_MOD_OPTION.prompt);
  const [selectedAero, setSelectedAero] = useState<string>(DEFAULT_VEHICLE_MOD_OPTION.prompt);
  const [selectedVehicleInterior, setSelectedVehicleInterior] = useState<string>(DEFAULT_VEHICLE_MOD_OPTION.prompt);
  const [selectedVehicleLighting, setSelectedVehicleLighting] = useState<string>(DEFAULT_VEHICLE_MOD_OPTION.prompt);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const currentStylesSource = CATEGORIZED_VEHICLE_STYLES;
  const currentBackgrounds = VEHICLE_BACKGROUNDS;
  const currentLighting = VEHICLE_LIGHTING;

  useState(() => {
      if (selectedStyleIds.length === 0 && currentStylesSource[0]?.styles[0]) {
          setSelectedStyleIds([currentStylesSource[0].styles[0].id]);
          setSelectedBackground(currentBackgrounds[0]?.prompt || '');
          setSelectedLighting(currentLighting[0]?.prompt || '');
      }
  });

  const lastSelectedStyleId = selectedStyleIds[selectedStyleIds.length - 1];
  const selectedStyleObject: StyleOption | undefined = useMemo(() => 
      currentStylesSource.flatMap(c => c.styles).find(s => s.id === lastSelectedStyleId),
      [lastSelectedStyleId]
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

  const handleGenerateClick = useCallback(async () => {
    if (!originalImageFile) {
      setError('Please upload a vehicle image first.');
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

    try {
      const result = await editImageWithGemini(
        originalImageFile, combinedStylePrompt, selectedColor,
        selectedBackground, selectedLighting, 
        '', '', '', '', '', '', 
        '', '', 
        isLockEnabled, selectedQuality,
        'vehicle', 
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
    selectedLighting, isLockEnabled, selectedQuality,
    selectedRims, selectedAero, selectedVehicleInterior, selectedVehicleLighting
  ]);

  const backgroundOptions = useMemo(() => currentBackgrounds.map(option => ({ label: option.name, value: option.prompt })), [currentBackgrounds]);
  const lightingOptions = useMemo(() => currentLighting.map(option => ({ label: option.name, value: option.prompt })), [currentLighting]);

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
                        <CarIcon />
                     </div>
                     <span className="font-playfair text-xl text-zinc-900 dark:text-white font-bold tracking-wide">Automotive Works</span>
                </div>
                <button 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-95 border border-black/5 dark:border-white/5"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar pb-32 lg:pb-0">
                <CollapsibleSection title="Wrap & Paint" isOpen={true}>
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

                <CollapsibleSection title="Mods & Parts" isOpen={true}>
                    <div className="space-y-6">
                        <DropdownSelector label="Wheels & Rims" options={[{ label: DEFAULT_VEHICLE_MOD_OPTION.name, value: DEFAULT_VEHICLE_MOD_OPTION.prompt }]} optionGroups={CATEGORIZED_VEHICLE_RIMS} selectedValue={selectedRims} onSelect={setSelectedRims} valueProp="prompt" />
                        <DropdownSelector label="Aero & Body" options={[{ label: DEFAULT_VEHICLE_MOD_OPTION.name, value: DEFAULT_VEHICLE_MOD_OPTION.prompt }]} optionGroups={CATEGORIZED_VEHICLE_AERO} selectedValue={selectedAero} onSelect={setSelectedAero} valueProp="prompt" />
                        <DropdownSelector label="Lights, Glass & Tint" options={[{ label: DEFAULT_VEHICLE_MOD_OPTION.name, value: DEFAULT_VEHICLE_MOD_OPTION.prompt }]} optionGroups={CATEGORIZED_VEHICLE_LIGHTING_GRILL} selectedValue={selectedVehicleLighting} onSelect={setSelectedVehicleLighting} valueProp="prompt" />
                        <DropdownSelector label="Interior (Visible)" options={[{ label: DEFAULT_VEHICLE_MOD_OPTION.name, value: DEFAULT_VEHICLE_MOD_OPTION.prompt }]} optionGroups={CATEGORIZED_VEHICLE_INTERIOR} selectedValue={selectedVehicleInterior} onSelect={setSelectedVehicleInterior} valueProp="prompt" />
                    </div>
                </CollapsibleSection>

                <CollapsibleSection title="Environment" isOpen={true}>
                    <div className="space-y-6">
                        <DropdownSelector label="Background" options={backgroundOptions} selectedValue={selectedBackground} onSelect={setSelectedBackground} />
                        <DropdownSelector label="Lighting" options={lightingOptions} selectedValue={selectedLighting} onSelect={setSelectedLighting} />
                    </div>
                </CollapsibleSection>

                <CollapsibleSection title="Settings">
                   <div className="space-y-6">
                        <QualitySelector options={QUALITY_OPTIONS} selectedQuality={selectedQuality} onSelectQuality={setSelectedQuality} />
                        <FaceLockToggle isEnabled={isLockEnabled} onToggle={setIsLockEnabled} mode="vehicle" />
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
                                <span>Modify Vehicle</span>
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
                {isLoading ? 'Processing...' : 'Modify Vehicle'}
            </button>
            {error && <p className="text-red-500 dark:text-red-400 mt-2 text-center text-xs">{error}</p>}
        </div>
    </div>
  );
};

export default VehiclePage;
