import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { DownloadIcon } from './icons/DownloadIcon.tsx';
import { getLogoSvgDataUrl } from './logo.tsx';
import { downloadResource } from '../utils/fileUtils.ts';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  showBeforeAfterToggle?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  originalImage, 
  generatedImage, 
  isLoading, 
  showBeforeAfterToggle = true 
}) => {
  const [showGenerated, setShowGenerated] = useState(true);
  const [addLogo, setAddLogo] = useState(false);

  useEffect(() => {
    // When a new image is generated, always show it.
    if (generatedImage) {
      setShowGenerated(true);
    }
  }, [generatedImage]);
  
  const handleDownload = async () => {
    if (!generatedImage) return;

    const downloadFormat = 'image/jpeg';
    const extension = 'jpeg';
    const quality = 0.95; // High quality JPEG

    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            // Fallback if canvas is not supported
            await downloadResource(generatedImage, `lion-apparel-poster.png`);
            return;
        };

        const mainImage = await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = generatedImage;
        });

        canvas.width = mainImage.naturalWidth;
        canvas.height = mainImage.naturalHeight;
        
        // Draw the main generated image onto the canvas
        // This is necessary for both adding a logo and for converting format
        ctx.drawImage(mainImage, 0, 0);

        let finalFilename = `lion-apparel-poster.${extension}`;

        if (addLogo) {
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
            finalFilename = `lion-apparel-poster-watermarked.${extension}`;
        }

        // Convert canvas to the desired format (JPEG) and trigger download
        const finalDataUrl = canvas.toDataURL(downloadFormat, quality);
        await downloadResource(finalDataUrl, finalFilename);

    } catch (err) {
        console.error("Failed during download process:", err);
        // Fallback to downloading the original generated image data
        const originalMimeTypeMatch = generatedImage.match(/^data:(image\/[a-z]+);base64,/);
        const originalExtension = originalMimeTypeMatch ? originalMimeTypeMatch[1].split('/')[1] || 'png' : 'png';
        await downloadResource(generatedImage, `lion-apparel-poster-fallback.${originalExtension}`);
    }
  };


  const imageToShow = showGenerated ? generatedImage : originalImage;
  const hasBothImages = originalImage && generatedImage;

  return (
    <div className="w-full">
      <div className="aspect-w-1 aspect-h-1 md:aspect-w-4 md:aspect-h-5 w-full bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-gray-400 overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400"></div>
            <p className="mt-4 text-lg font-semibold text-white">Generating new look...</p>
          </div>
        )}
        {imageToShow ? (
          <img src={imageToShow} alt={showGenerated ? "Styled result" : "Original upload"} className="object-cover w-full h-full" />
        ) : (
          !isLoading && originalImage ? (
            <img src={originalImage} alt="Original upload" className="object-cover w-full h-full" />
          ) : (
            !isLoading && (
                <div className="text-center p-4">
                  <SparklesIcon className="w-12 h-12 mx-auto mb-2 text-zinc-700" />
                  <p className="font-semibold text-gray-500">Your styled image will appear here</p>
                </div>
            )
          )
        )}
        
        {showBeforeAfterToggle && hasBothImages && !isLoading && (
          <div className="absolute bottom-4 left-4">
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
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
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

export default ResultDisplay;
