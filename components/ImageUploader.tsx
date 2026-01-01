
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { UploadIcon } from './icons/UploadIcon.tsx';
import { DownloadIcon } from './icons/DownloadIcon.tsx';
import { ExpandIcon } from './icons/ExpandIcon.tsx';
import { CloseIcon } from './icons/CloseIcon.tsx';
import { GeoLogo, getLogoSvgDataUrl } from './logo.tsx';
import { downloadResource } from '../utils/fileUtils.ts';

interface CreatorDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  onImageUpload: (file: File, dataUrl: string) => void;
}

const CreatorDisplay: React.FC<CreatorDisplayProps> = ({ originalImage, generatedImage, isLoading, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showGenerated, setShowGenerated] = useState(true);
  const [addLogo, setAddLogo] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      await downloadResource(generatedImage, `geo-studio-look.${extension}`);
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
        const padding = mainImage.naturalWidth * 0.04; // Consistent padding with ResultDisplay
        const logoWidth = logoImage.width;
        const logoHeight = logoImage.height;
        const x = mainImage.naturalWidth - logoWidth - padding;
        const y = mainImage.naturalHeight - logoHeight - padding;
        ctx.globalAlpha = 0.9;
        ctx.drawImage(logoImage, x, y, logoWidth, logoHeight);
        ctx.globalAlpha = 1.0;
        const dataUrlWithLogo = canvas.toDataURL(mimeType);
        await downloadResource(dataUrlWithLogo, `geo-studio-look-watermarked.${extension}`);
    } catch (err) {
        console.error("Failed to load logo for watermarking.", err);
        await downloadResource(generatedImage, `geo-studio-look.${extension}`);
    }
  };
  
  // Prioritize showing generated image if available and selected, otherwise fall back to original.
  const imageToShow = (showGenerated && generatedImage) ? generatedImage : originalImage;
  const hasBothImages = originalImage && generatedImage;

  return (
    <div className="w-full relative group glass-panel rounded-xl p-1 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        {/* Frame / Canvas */}
        <div 
            className="relative aspect-[4/5] w-full bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/5 rounded-lg overflow-hidden"
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
                <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md flex flex-col items-center justify-center z-30">
                    <div className="animate-pulse mb-6 scale-150">
                        <GeoLogo />
                    </div>
                    <div className="w-48 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 animate-progress"></div>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400 mt-4">Processing</p>
                </div>
            )}

            {imageToShow ? (
                <img 
                    src={imageToShow} 
                    alt={(showGenerated && generatedImage) ? "Styled result" : "Original upload"} 
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105" 
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-zinc-500 dark:text-zinc-600 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-400 cursor-pointer border-2 border-dashed border-zinc-300 dark:border-zinc-800 group-hover:border-amber-500/30 m-4 rounded-lg">
                    <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <UploadIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">Upload Source</p>
                    <p className="text-[10px] mt-2 opacity-60 uppercase tracking-wide">Drag & Drop or Click</p>
                </div>
            )}

            {originalImage && !isLoading && (
                 <button 
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="absolute top-4 left-4 z-20 p-3 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-full text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    title="Replace Image"
                >
                   <UploadIcon className="w-4 h-4" />
                </button>
            )}

            {/* Floating Controls for Result */}
            {hasBothImages && !isLoading && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1 bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-full shadow-2xl">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowGenerated(false); }}
                        className={`px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${!showGenerated ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg' : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
                    >
                        Original
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowGenerated(true); }}
                        className={`px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${showGenerated ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
                    >
                        Edited
                    </button>
                </div>
            )}

            {/* Download & Expand Actions */}
            {generatedImage && !isLoading && (
                <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                        {/* Expand Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
                            className="p-3 bg-white/80 dark:bg-black/80 backdrop-blur-md text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 rounded-full hover:bg-white dark:hover:bg-black transition-all duration-300 shadow-lg"
                            title="Expand"
                        >
                            <ExpandIcon className="w-5 h-5" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                            className="p-3 bg-amber-500 text-black rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-amber-400 hover:scale-110 transition-all duration-300 btn-tech"
                            title="Download"
                        >
                            <DownloadIcon className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="bg-amber-500/90 dark:bg-amber-500/90 backdrop-blur-md p-2 rounded-full border border-amber-400/50 flex items-center gap-2 px-3 shadow-lg hover:bg-amber-400 transition-colors">
                        <input 
                            type="checkbox" 
                            id="addLogoToggle" 
                            checked={addLogo} 
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setAddLogo(e.target.checked)}
                            className="w-3.5 h-3.5 rounded bg-white border-none text-amber-600 focus:ring-0 cursor-pointer accent-black"
                        />
                        <label htmlFor="addLogoToggle" className="text-[9px] font-black uppercase tracking-wider text-black cursor-pointer select-none">Watermark</label>
                    </div>
                </div>
            )}
        </div>

        {/* Fullscreen Modal Portal */}
        {isFullscreen && createPortal(
            <div 
                className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fade-in"
                onClick={() => setIsFullscreen(false)}
            >
                <button 
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-6 right-6 p-4 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
                >
                    <CloseIcon className="w-8 h-8" />
                </button>
                
                <div className="relative max-w-[95vw] max-h-[95vh] p-2 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <img 
                        src={imageToShow || ''} 
                        alt="Fullscreen view" 
                        className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
                    />
                </div>
            </div>,
            document.body
        )}
    </div>
  );
};

export default CreatorDisplay;
