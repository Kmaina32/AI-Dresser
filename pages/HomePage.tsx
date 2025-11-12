import React, { useState, useCallback } from 'react';
import ImageUploader from '../components/ImageUploader';
import ResultDisplay from '../components/ResultDisplay';
import { CATEGORIZED_SUIT_STYLES, BACKGROUND_OPTIONS, CATEGORIZED_SHOE_STYLES, DEFAULT_SHOE_OPTION, QUALITY_OPTIONS, LIGHTING_OPTIONS } from '../constants';
import { editImageWithGemini } from '../services/geminiService';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import FaceLockToggle from '../components/FaceLockToggle';
import QualitySelector from '../components/QualitySelector';
import DropdownSelector from '../components/DropdownSelector';

const HomePage: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(CATEGORIZED_SUIT_STYLES[0].styles[0].prompt);
  const [selectedBackground, setSelectedBackground] = useState<string>(BACKGROUND_OPTIONS[0].prompt);
  const [selectedLighting, setSelectedLighting] = useState<string>(LIGHTING_OPTIONS[0].prompt);
  const [selectedShoe, setSelectedShoe] = useState<string>(DEFAULT_SHOE_OPTION.prompt);
  const [selectedQuality, setSelectedQuality] = useState<string>(QUALITY_OPTIONS[0].value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFaceLockEnabled, setIsFaceLockEnabled] = useState<boolean>(true);

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

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const result = await editImageWithGemini(originalImageFile, selectedStyle, selectedBackground, selectedLighting, selectedShoe, isFaceLockEnabled, selectedQuality);
      setGeneratedImage(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, selectedStyle, selectedBackground, selectedLighting, selectedShoe, isFaceLockEnabled, selectedQuality]);

  const backgroundOptions = BACKGROUND_OPTIONS.map(option => ({ label: option.name, value: option.prompt }));
  const lightingOptions = LIGHTING_OPTIONS.map(option => ({ label: option.name, value: option.prompt }));
  const shoeOptions = [{ label: DEFAULT_SHOE_OPTION.name, value: DEFAULT_SHOE_OPTION.prompt }];

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
              <h2 className="text-xl font-semibold mb-6 text-center text-gray-300">2. Customize Your Look</h2>
              <FaceLockToggle
                  isEnabled={isFaceLockEnabled}
                  onToggle={setIsFaceLockEnabled}
              />
              <div className="space-y-8">
                <QualitySelector
                  options={QUALITY_OPTIONS}
                  selectedQuality={selectedQuality}
                  onSelectQuality={setSelectedQuality}
                />
                <DropdownSelector
                  label="Suit Style"
                  optionGroups={CATEGORIZED_SUIT_STYLES}
                  selectedValue={selectedStyle}
                  onSelect={setSelectedStyle}
                />
                <DropdownSelector
                  label="Background"
                  options={backgroundOptions}
                  selectedValue={selectedBackground}
                  onSelect={setSelectedBackground}
                />
                <DropdownSelector
                  label="Lighting"
                  options={lightingOptions}
                  selectedValue={selectedLighting}
                  onSelect={setSelectedLighting}
                />
                <DropdownSelector
                  label="Shoes"
                  options={shoeOptions}
                  optionGroups={CATEGORIZED_SHOE_STYLES}
                  selectedValue={selectedShoe}
                  onSelect={setSelectedShoe}
                />
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