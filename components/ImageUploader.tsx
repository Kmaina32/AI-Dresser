import React, { useState, useEffect, useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { LionLogo, getLogoSvgDataUrl } from './logo';
import { downloadResource } from '../utils/fileUtils';

interface CreatorDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  onImageUpload: (file: File, dataUrl: string) => void;
}

const CreatorDisplay: React.FC<CreatorDisplayProps> = ({ originalImage, generatedImage, isLoading, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showGenerated, setShowGenerated] = useState(true);
  const [addLogo, setAddLogo] = useState(false);

  useEffect(() => {
    if (generatedImage) {
      setShowGenerated(true);
    }
  }, [generatedImage]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(file, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            onImageUpload(file, e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    const mimeTypeMatch = generatedImage.match(/^data:(image\/[a-z]+);base64,/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/png';
    const extension = mimeType.split('/')[1] || 'png';

    if (!addLogo) {
      await downloadResource(generatedImage, `lion-apparel-look.${extension}`);
      return;
    }

    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const mainImage = await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = generatedImage;
        });

        canvas.width = mainImage.naturalWidth;
        canvas.height = mainImage.naturalHeight;
        ctx.drawImage(mainImage, 0, 0);

        const logoImage = await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = getLogoSvgDataUrl(mainImage.naturalWidth);
        });
        
        const padding = mainImage.naturalWidth * 0.025;
        const logoWidth = logoImage.width;
        const logoHeight = logoImage.height;
        const x = mainImage.naturalWidth - logoWidth - padding;
        const y = mainImage.naturalHeight - logoHeight - padding;

        ctx.globalAlpha = 0.85;
        ctx.drawImage(logoImage, x, y, logoWidth, logoHeight);
        ctx.globalAlpha = 1.0;

        const dataUrlWithLogo = canvas.toDataURL(mimeType);
        await downloadResource(dataUrlWithLogo, `lion-apparel-look-watermarked.${extension}`);

    } catch (err) {
        console.error("Failed to load logo for watermarking.", err);
        await downloadResource(generatedImage, `lion-apparel-look.${extension}`);
    }
  };
  
  const imageToShow = showGenerated ? generatedImage : originalImage;
  const hasBothImages = originalImage && generatedImage;

  return (
    <div className="w-full">
      <div 
        className="aspect-w-4 aspect-h-5 w-full bg-zinc-900 rounded-xl border-2 border-dashed border-zinc-800 flex items-center justify-center text-gray-400 overflow-hidden relative group transition-all duration-300 hover:border-amber-500 hover:bg-zinc-800"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !originalImage && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <div className="animate-pulse">
                <LionLogo />
            </div>
            <p className="mt-4 text-lg font-semibold text-white">Generating new look...</p>
          </div>
        )}

        {originalImage ? (
          <img src={imageToShow || originalImage} alt={showGenerated ? "Styled result" : "Original upload"} className="object-cover w-full h-full" />
        ) : (
          <div className="text-center p-4 cursor-pointer">
            <UploadIcon className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Click to upload or drag & drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, or WEBP</p>
          </div>
        )}
         
        {originalImage && (
             <div 
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300 z-10 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
               <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Change Image
               </p>
            </div>
        )}

        {hasBothImages && !isLoading && (
          <div className="absolute bottom-4 left-4 z-20">
            <div className="flex items-center bg-black/60 backdrop-blur-sm rounded-full p-1">
              <button 
                onClick={() => setShowGenerated(false)} 
                className={`px-3 py-1 text-sm rounded-full transition-colors ${!showGenerated ? 'bg-amber-500 text-black font-semibold' : 'text-white'}`}
                aria-pressed={!showGenerated}
              >
                Before
              </button>
              <button 
                onClick={() => setShowGenerated(true)} 
                className={`px-3 py-1 text-sm rounded-full transition-colors ${showGenerated ? 'bg-amber-500 text-black font-semibold' : 'text-white'}`}
                aria-pressed={showGenerated}
              >
                After
              </button>
            </div>
          </div>
        )}

        {generatedImage && !isLoading && (
          <div className="absolute bottom-4 right-4 flex items-center gap-3 z-20">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full py-2 pl-2 pr-3">
              <input 
                type="checkbox" 
                id="addLogoToggle" 
                checked={addLogo} 
                onChange={(e) => setAddLogo(e.target.checked)}
                className="h-4 w-4 rounded bg-zinc-700 border-zinc-600 text-amber-500 focus:ring-amber-500 cursor-pointer"
              />
              <label htmlFor="addLogoToggle" className="text-white text-sm cursor-pointer select-none">Add Logo</label>
            </div>
            
            <button
              onClick={handleDownload}
              className="bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-amber-500/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Download image"
            >
              <DownloadIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDisplay;