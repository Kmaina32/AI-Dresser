import React, { useState, useCallback, useEffect } from 'react';
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
  DEFAULT_POSTURE_OPTION
} from '../constants';
import { editImageWithGemini } from '../services/geminiService';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import FaceLockToggle from '../components/FaceLockToggle';
import QualitySelector from '../components/QualitySelector';
import DropdownSelector from '../components/DropdownSelector';
import { RemixConfig } from '../App';
import { WandIcon } from '../components/icons/WandIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';

type AttireType = 'menswear' | 'womenswear';

interface HomePageProps {
  initialRemixConfig: RemixConfig | null;
  clearRemixConfig: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ initialRemixConfig, clearRemixConfig }) => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const [attireType, setAttireType] = useState<AttireType>('menswear');
  const [targetPerson, setTargetPerson] = useState<string>('');
  const [selectedPosture, setSelectedPosture] = useState<string>(DEFAULT_POSTURE_OPTION.prompt);
  
  const [selectedStyle, setSelectedStyle] = useState<string>(CATEGORIZED_SUIT_STYLES[0].styles[0].prompt);
  const [stylePreviewImage, setStylePreviewImage] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string>(BACKGROUND_OPTIONS[0].prompt);
  const [selectedLighting, setSelectedLighting] = useState<string>(LIGHTING_OPTIONS[0].prompt);
  const [selectedShoe, setSelectedShoe] = useState<string>(DEFAULT_SHOE_OPTION.prompt);
  const [selectedShirt, setSelectedShirt] = useState<string>(DEFAULT_SHIRT_OPTION.prompt);
  const [selectedTie, setSelectedTie] = useState<string>(DEFAULT_TIE_OPTION.prompt);
  const [selectedHandbag, setSelectedHandbag] = useState<string>(DEFAULT_HANDBAG_OPTION.prompt);
  
  const [selectedQuality, setSelectedQuality] = useState<string>(QUALITY_OPTIONS[0].value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFaceLockEnabled, setIsFaceLockEnabled] = useState<boolean>(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);

  const handleImageUpload = (file: File, dataUrl: string) => {
    setOriginalImageFile(file);
    setOriginalImage(dataUrl);
    setGeneratedImage(null);
    setError(null);
  };

  const updateStyleAndPreview = useCallback((stylePrompt: string, currentAttireType: AttireType = attireType) => {
    setSelectedStyle(stylePrompt);
    const allStyles = (currentAttireType === 'menswear' ? CATEGORIZED_SUIT_STYLES : CATEGORIZED_WOMENS_STYLES).flatMap(cat => cat.styles);
    const styleObject = allStyles.find(s => s.prompt === stylePrompt);
    setStylePreviewImage(styleObject?.previewImage || null);
  }, [attireType]);

  // Handle Remix Config
  useEffect(() => {
    if (initialRemixConfig) {
      setAttireType(initialRemixConfig.attireType);
      updateStyleAndPreview(initialRemixConfig.stylePrompt, initialRemixConfig.attireType);
      setSelectedBackground(initialRemixConfig.backgroundPrompt);
      setSelectedLighting(initialRemixConfig.lightingPrompt);
      // Optional fields
      setSelectedShoe(initialRemixConfig.shoePrompt ?? DEFAULT_SHOE_OPTION.prompt);
      setSelectedShirt(initialRemixConfig.shirtPrompt ?? DEFAULT_SHIRT_OPTION.prompt);
      setSelectedTie(initialRemixConfig.tiePrompt ?? DEFAULT_TIE_OPTION.prompt);
      // Clean up after applying
      clearRemixConfig();
    }
  }, [initialRemixConfig, clearRemixConfig, updateStyleAndPreview]);


  // Reset selections when attire type changes and set initial preview
  useEffect(() => {
    // This effect should not run when a remix is being applied
    if (!initialRemixConfig) {
      let initialStylePrompt: string;
      if (attireType === 'menswear') {
        initialStylePrompt = CATEGORIZED_SUIT_STYLES[0].styles[0].prompt;
      } else {
        initialStylePrompt = CATEGORIZED_WOMENS_STYLES[0].styles[0].prompt;
      }
      updateStyleAndPreview(initialStylePrompt);
      
      setSelectedShoe(DEFAULT_SHOE_OPTION.prompt);
      setSelectedShirt(DEFAULT_SHIRT_OPTION.prompt);
      setSelectedTie(DEFAULT_TIE_OPTION.prompt);
      setSelectedHandbag(DEFAULT_HANDBAG_OPTION.prompt);
    }
  }, [attireType, updateStyleAndPreview, initialRemixConfig]);

  const handleGenerateClick = useCallback(async () => {
    if (!originalImageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const result = await editImageWithGemini(
        originalImageFile, 
        selectedStyle, 
        selectedBackground, 
        selectedLighting, 
        selectedShoe, 
        selectedShirt,
        selectedTie,
        selectedHandbag,
        targetPerson,
        selectedPosture,
        isFaceLockEnabled, 
        selectedQuality
      );
      setGeneratedImage(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, selectedStyle, selectedBackground, selectedLighting, selectedShoe, selectedShirt, selectedTie, selectedHandbag, targetPerson, selectedPosture, isFaceLockEnabled, selectedQuality]);
  
  const handleSurpriseMe = () => {
    // 1. Randomly select attire type
    const randomAttireType = Math.random() < 0.5 ? 'menswear' : 'womenswear';
    setAttireType(randomAttireType);
    
    // 2. Get styles for that type and pick a random one
    const styles = (randomAttireType === 'menswear' ? CATEGORIZED_SUIT_STYLES : CATEGORIZED_WOMENS_STYLES).flatMap(cat => cat.styles);
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    updateStyleAndPreview(randomStyle.prompt, randomAttireType);

    // 3. Pick a random background (excluding "Original")
    const backgrounds = BACKGROUND_OPTIONS.slice(1);
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setSelectedBackground(randomBackground.prompt);

    // 4. Pick random lighting (excluding "Original")
    const lightings = LIGHTING_OPTIONS.slice(1);
    const randomLighting = lightings[Math.floor(Math.random() * lightings.length)];
    setSelectedLighting(randomLighting.prompt);

    // Reset advanced options to default
    setSelectedShoe(DEFAULT_SHOE_OPTION.prompt);
    setSelectedShirt(DEFAULT_SHIRT_OPTION.prompt);
    setSelectedTie(DEFAULT_TIE_OPTION.prompt);
    setSelectedHandbag(DEFAULT_HANDBAG_OPTION.prompt);
    setTargetPerson('');
    setSelectedPosture(DEFAULT_POSTURE_OPTION.prompt);
  };


  const backgroundOptions = BACKGROUND_OPTIONS.map(option => ({ label: option.name, value: option.prompt }));
  const lightingOptions = LIGHTING_OPTIONS.map(option => ({ label: option.name, value: option.prompt }));
  const shoeOptions = [{ label: DEFAULT_SHOE_OPTION.name, value: DEFAULT_SHOE_OPTION.prompt }];
  const shirtOptionsList = [DEFAULT_SHIRT_OPTION, ...SHIRT_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  const tieOptionsList = [DEFAULT_TIE_OPTION, ...TIE_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));
  const postureOptionsList = [DEFAULT_POSTURE_OPTION, ...POSTURE_OPTIONS].map(o => ({ label: o.name, value: o.prompt }));

  const currentSuitStyles = attireType === 'menswear' ? CATEGORIZED_SUIT_STYLES : CATEGORIZED_WOMENS_STYLES;
  const currentShoeStyles = attireType === 'menswear' ? CATEGORIZED_SHOE_STYLES : CATEGORIZED_WOMENS_SHOE_STYLES;
  
  const AttireTypeButton: React.FC<{type: AttireType; label: string}> = ({ type, label }) => (
    <button
      onClick={() => setAttireType(type)}
      className={`px-6 py-3 w-full text-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
        attireType === type
          ? 'bg-amber-500 text-black shadow-lg scale-105 ring-amber-500'
          : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white'
      }`}
    >
      {label}
    </button>
  );


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
          Experience bespoke tailoring like never before. Upload a photo, select your desired style, and let our AI create your perfect look.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-300">1. Upload Photo</h2>
              <ImageUploader onImageUpload={handleImageUpload} originalImage={originalImage} />
            </div>
            
            <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-300">2. Customize Your Look</h2>
                <button 
                  onClick={handleSurpriseMe}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-zinc-800 text-amber-400 rounded-lg border border-zinc-700 hover:bg-zinc-700 hover:border-amber-500 transition-all"
                  title="Generate a random style combination"
                >
                  <WandIcon className="w-4 h-4" />
                  Surprise Me!
                </button>
              </div>

              <FaceLockToggle
                  isEnabled={isFaceLockEnabled}
                  onToggle={setIsFaceLockEnabled}
              />
              <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-center text-gray-300">Attire Type</h3>
                    <div className="flex justify-center gap-4">
                        <AttireTypeButton type="menswear" label="Menswear" />
                        <AttireTypeButton type="womenswear" label="Womenswear" />
                    </div>
                </div>
                
                <DropdownSelector
                  label={attireType === 'menswear' ? "Suit Style" : "Attire Style"}
                  optionGroups={currentSuitStyles}
                  selectedValue={selectedStyle}
                  onSelect={updateStyleAndPreview}
                />
                {stylePreviewImage && (
                    <div className="animate-fade-in">
                        <h3 className="text-base font-semibold mb-3 text-center text-gray-400">Style Preview</h3>
                        <div className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 aspect-w-4 aspect-h-5">
                            <img src={stylePreviewImage} alt="A representative image of the selected style" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
                <DropdownSelector
                  label="Background"
                  options={backgroundOptions}
                  selectedValue={selectedBackground}
                  onSelect={setSelectedBackground}
                />
                <QualitySelector
                  options={QUALITY_OPTIONS}
                  selectedQuality={selectedQuality}
                  onSelectQuality={setSelectedQuality}
                />
                
                {/* --- Advanced Customization --- */}
                <div className="border-t border-zinc-800 pt-6">
                  <button 
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-300"
                    aria-expanded={isAdvancedOpen}
                    aria-controls="advanced-options"
                  >
                    Advanced Customization
                    <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div id="advanced-options" className={`collapsible-content space-y-8 pt-6 ${isAdvancedOpen ? 'open' : ''}`}>
                    <div>
                        <label htmlFor="target-person" className="block text-lg font-semibold mb-3 text-center text-gray-300">Target Person (Optional)</label>
                        <input
                            id="target-person"
                            type="text"
                            value={targetPerson}
                            onChange={(e) => setTargetPerson(e.target.value)}
                            placeholder="e.g., 'person on the left'"
                            className="appearance-none w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                            aria-label="Target person for styling"
                        />
                    </div>

                    <DropdownSelector
                      label="Posture (Optional)"
                      options={postureOptionsList}
                      selectedValue={selectedPosture}
                      onSelect={setSelectedPosture}
                    />
                    
                    {attireType === 'menswear' && (
                      <>
                        <DropdownSelector
                          label="Shirt Style"
                          options={shirtOptionsList}
                          selectedValue={selectedShirt}
                          onSelect={setSelectedShirt}
                        />
                        <DropdownSelector
                          label="Tie Style"
                          options={tieOptionsList}
                          selectedValue={selectedTie}
                          onSelect={setSelectedTie}
                        />
                      </>
                    )}

                    {attireType === 'womenswear' && (
                        <DropdownSelector
                          label="Handbag"
                          options={[{ label: DEFAULT_HANDBAG_OPTION.name, value: DEFAULT_HANDBAG_OPTION.prompt }]}
                          optionGroups={CATEGORIZED_HANDBAG_STYLES}
                          selectedValue={selectedHandbag}
                          onSelect={setSelectedHandbag}
                        />
                    )}

                    <DropdownSelector
                      label="Lighting"
                      options={lightingOptions}
                      selectedValue={selectedLighting}
                      onSelect={setSelectedLighting}
                    />
                    <DropdownSelector
                      label="Shoes"
                      options={shoeOptions}
                      optionGroups={currentShoeStyles}
                      selectedValue={selectedShoe}
                      onSelect={setSelectedShoe}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Result */}
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-gray-300">3. View Result</h2>
             <ResultDisplay 
                originalImage={originalImage}
                generatedImage={generatedImage} 
                isLoading={isLoading} 
             />
             <div className="mt-6 text-center">
              <button
                onClick={handleGenerateClick}
                disabled={!originalImage || isLoading}
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-amber-500 text-black font-bold rounded-lg shadow-lg hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50"
              >
                <SparklesIcon className="w-6 h-6 mr-3" />
                {isLoading ? 'Creating Your Look...' : 'Generate New Look'}
              </button>
              {error && <p className="text-red-400 mt-4">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;