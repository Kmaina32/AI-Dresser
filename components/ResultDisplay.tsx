
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { DownloadIcon } from './icons/DownloadIcon.tsx';
import { WhatsAppIcon } from './icons/WhatsAppIcon.tsx';
import { InstagramIcon } from './icons/InstagramIcon.tsx';
import { ShareIcon } from './icons/ShareIcon.tsx';
import { ExpandIcon } from './icons/ExpandIcon.tsx';
import { CloseIcon } from './icons/CloseIcon.tsx';
import { getLogoSvgDataUrl } from './logo.tsx';
import { downloadResource, dataUrlToFile } from '../utils/fileUtils.ts';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  showBeforeAfterToggle?: boolean;
  shareText?: string;
  shareTitle?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  originalImage, 
  generatedImage, 
  isLoading, 
  showBeforeAfterToggle = true,
  shareText = "Check out my new look generated with Geo Studio AI!",
  shareTitle = "Geo Studio Style"
}) => {
  const [showGenerated, setShowGenerated] = useState(true);
  const [addLogo, setAddLogo] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'jpg' | 'png'>('jpg');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // When a new image is generated, always show it.
    if (generatedImage) {
      setShowGenerated(true);
    }
  }, [generatedImage]);
  
  const prepareImageForExport = async (format: 'image/jpeg' | 'image/png'): Promise<string> => {
      if (!generatedImage) throw new Error("No image");

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return generatedImage;

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
      }
      
      return canvas.toDataURL(format, format === 'image/jpeg' ? 0.95 : 1.0);
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
        const mimeType = downloadFormat === 'png' ? 'image/png' : 'image/jpeg';
        const finalDataUrl = await prepareImageForExport(mimeType);
        await downloadResource(finalDataUrl, `geo-studio-look${addLogo ? '-watermarked' : ''}.${downloadFormat}`);
    } catch (err) {
        console.error("Failed during download process:", err);
        // Fallback to downloading the original generated image data
        const originalMimeTypeMatch = generatedImage.match(/^data:(image\/[a-z]+);base64,/);
        const originalExtension = originalMimeTypeMatch ? originalMimeTypeMatch[1].split('/')[1] || 'png' : 'png';
        await downloadResource(generatedImage, `geo-studio-poster-fallback.${originalExtension}`);
    }
  };

  const handleSocialShare = async (platform?: 'whatsapp' | 'instagram') => {
      if (!generatedImage) return;
      setIsSharing(true);

      try {
          const finalDataUrl = await prepareImageForExport('image/jpeg');
          const file = await dataUrlToFile(finalDataUrl, `geo-look.jpg`);
          
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                  files: [file],
                  title: shareTitle,
                  text: shareText,
              });
          } else {
              if (platform === 'whatsapp') {
                   await downloadResource(finalDataUrl, 'geo-look-share.jpg');
                   setTimeout(() => {
                       const text = encodeURIComponent(shareText);
                       window.open(`https://web.whatsapp.com/send?text=${text}`, '_blank');
                   }, 1000);
                   return;
              }

              await downloadResource(finalDataUrl, 'geo-look-share.jpg');
              alert("Image downloaded! You can now upload it manually to " + (platform === 'instagram' ? "Instagram Stories" : "social media") + ".");
          }
      } catch (error) {
          if ((error as Error).name !== 'AbortError') {
             console.error("Error sharing:", error);
             alert("Could not open share menu. Image downloaded instead.");
             await handleDownload();
          }
      } finally {
          setIsSharing(false);
      }
  };

  const imageToShow = showGenerated ? generatedImage : originalImage;
  const hasBothImages = originalImage && generatedImage;

  return (
    <div className="w-full glass-panel rounded-xl p-1 relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
      <div className="aspect-w-1 aspect-h-1 md:aspect-w-4 md:aspect-h-5 w-full bg-zinc-100/50 dark:bg-zinc-950/50 rounded-lg border border-zinc-200 dark:border-white/5 flex items-center justify-center text-gray-400 overflow-hidden relative scanline-container">
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-30">
             <div className="scanline-bar"></div>
             <div className="w-64 h-64 border border-amber-500/30 rounded-full animate-pulse absolute"></div>
             <div className="w-48 h-48 border border-amber-500/50 rounded-full animate-ping absolute"></div>
             <div className="relative z-10 text-center">
                <p className="text-amber-500 dark:text-amber-400 font-bold text-xl tracking-[0.2em] animate-pulse">PROCESSING</p>
                <p className="text-zinc-500 text-xs mt-2 font-mono">AI RENDERING ENGINE ACTIVE</p>
             </div>
          </div>
        )}

        {imageToShow ? (
          <img src={imageToShow} alt={showGenerated ? "Styled result" : "Original upload"} className="object-cover w-full h-full" />
        ) : (
          !isLoading && originalImage ? (
            <img src={originalImage} alt="Original upload" className="object-cover w-full h-full grayscale opacity-50" />
          ) : (
            !isLoading && (
                <div className="text-center p-4 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                    <SparklesIcon className="w-8 h-8 text-zinc-400 dark:text-zinc-600 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-600 dark:text-zinc-300 tracking-wide">Awaiting Input</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-600 mt-1">Configure your style to begin generation</p>
                  </div>
                </div>
            )
          )
        )}
        
        {/* Expand Button */}
        {imageToShow && !isLoading && (
            <button 
                onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:scale-110"
                title="Expand View"
            >
                <ExpandIcon className="w-5 h-5" />
            </button>
        )}
        
        {showBeforeAfterToggle && hasBothImages && !isLoading && (
          <div className="absolute bottom-4 left-4 z-20">
            <div className="flex items-center bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-full p-1 border border-zinc-200 dark:border-white/10 shadow-lg">
              <button 
                onClick={() => setShowGenerated(false)} 
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${!showGenerated ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
              >
                Source
              </button>
              <button 
                onClick={() => setShowGenerated(true)} 
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${showGenerated ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
              >
                Result
              </button>
            </div>
          </div>
        )}

        {/* Overlay Actions */}
        {generatedImage && !isLoading && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
        )}

        {generatedImage && !isLoading && (
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-3 z-20">
             
             {/* Format & Watermark Group */}
             <div className="flex flex-col items-end gap-2 mb-2">
                <p className="text-[9px] font-bold uppercase text-zinc-400 mb-0.5 tracking-wider hidden group-hover:block transition-all">Download As</p>
                <div className="flex items-center gap-1 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-lg p-1 border border-zinc-200 dark:border-white/10">
                    <button 
                        onClick={() => setDownloadFormat('jpg')} 
                        className={`px-3 py-1.5 text-[9px] font-bold uppercase rounded-md transition-colors ${downloadFormat === 'jpg' ? 'bg-amber-500 text-black shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'}`}
                    >
                        JPG
                    </button>
                    <button 
                        onClick={() => setDownloadFormat('png')} 
                        className={`px-3 py-1.5 text-[9px] font-bold uppercase rounded-md transition-colors ${downloadFormat === 'png' ? 'bg-amber-500 text-black shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'}`}
                    >
                        PNG
                    </button>
                </div>

                <div className="flex items-center gap-2 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-full py-1.5 pl-3 pr-3 border border-zinc-200 dark:border-white/10 mt-1">
                    <input 
                        type="checkbox" 
                        id="addLogoToggle" 
                        checked={addLogo} 
                        onChange={(e) => setAddLogo(e.target.checked)}
                        className="h-3 w-3 rounded bg-zinc-100 dark:bg-zinc-800 border-zinc-400 dark:border-zinc-600 text-amber-500 focus:ring-amber-500 cursor-pointer accent-amber-500"
                    />
                    <label htmlFor="addLogoToggle" className="text-zinc-900 dark:text-white text-[9px] font-bold uppercase tracking-wider cursor-pointer select-none">Watermark</label>
                </div>
            </div>

            <div className="flex items-center gap-2">
                 {/* Direct Share Buttons */}
                 <button
                    onClick={() => handleSocialShare('whatsapp')}
                    disabled={isSharing}
                    className="bg-[#25D366] text-white p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-lg border border-white/10 group/whatsapp relative btn-tech"
                    title="Share to WhatsApp Status"
                 >
                    <WhatsAppIcon className="w-5 h-5" />
                 </button>

                 <button
                    onClick={() => handleSocialShare('instagram')}
                    disabled={isSharing}
                    className="bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-lg border border-white/10 btn-tech"
                    title="Share to Instagram Stories/Post"
                 >
                    <InstagramIcon className="w-5 h-5" />
                 </button>

                 <button
                    onClick={() => handleSocialShare()}
                    disabled={isSharing}
                    className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md text-zinc-800 dark:text-white p-3 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-110 transition-all duration-300 shadow-lg border border-zinc-300 dark:border-white/10 btn-tech"
                    title="More Share Options"
                 >
                    <ShareIcon className="w-5 h-5" />
                 </button>

                {/* Download Button */}
                <button
                onClick={handleDownload}
                className="bg-amber-500 text-black p-3 rounded-full hover:bg-amber-400 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] btn-tech"
                title={`Download as ${downloadFormat.toUpperCase()}`}
                >
                <DownloadIcon className="w-6 h-6" />
                </button>
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

export default ResultDisplay;
