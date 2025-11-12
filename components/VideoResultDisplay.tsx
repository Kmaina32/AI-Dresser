import React from 'react';

interface VideoResultDisplayProps {
  videoUrl: string | null;
  isLoading: boolean;
  loadingMessage: string;
}

const VideoResultDisplay: React.FC<VideoResultDisplayProps> = ({ videoUrl, isLoading, loadingMessage }) => {
  return (
    <div className="w-full">
      <div className={`aspect-w-16 aspect-h-9 w-full bg-zinc-900 rounded-xl border ${isLoading ? 'border-2 animate-pulse-border' : 'border-zinc-800'} flex items-center justify-center text-gray-400 overflow-hidden relative transition-all`}>
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10 p-4 text-center">
            {/* The pulsing border serves as the main loading indicator */}
            <p className="text-lg font-semibold text-white">Generating video...</p>
            <p className="mt-2 text-sm text-gray-300 max-w-xs">{loadingMessage}</p>
          </div>
        )}
        {videoUrl && !isLoading ? (
          <video src={videoUrl} controls autoPlay loop className="object-contain w-full h-full" />
        ) : (
          !isLoading && (
            <div className="text-center p-4">
              <p className="font-semibold text-gray-500">Your animated image will appear here</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default VideoResultDisplay;