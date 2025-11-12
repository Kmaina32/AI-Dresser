import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading }) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'african-bespoke-look.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const imageToShow = generatedImage || originalImage;

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
          <img src={imageToShow} alt="Styled result" className="object-cover w-full h-full" />
        ) : (
          !isLoading && (
            <div className="text-center p-4">
              <SparklesIcon className="w-12 h-12 mx-auto mb-2 text-zinc-700" />
              <p className="font-semibold text-gray-500">Your styled image will appear here</p>
            </div>
          )
        )}
        {generatedImage && !isLoading && (
          <button
            onClick={handleDownload}
            className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-amber-500/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Download image"
          >
            <DownloadIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;