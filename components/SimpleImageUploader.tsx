import React, { useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon.tsx';

interface SimpleImageUploaderProps {
  label: string;
  imageUrl: string | null;
  onImageUpload: (file: File, dataUrl: string) => void;
}

const SimpleImageUploader: React.FC<SimpleImageUploaderProps> = ({ label, imageUrl, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="glass-panel p-4 rounded-lg">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 pl-1">{label}</h3>
        <div 
            className="aspect-w-1 aspect-h-1 w-full bg-zinc-950/50 rounded-md border border-dashed border-zinc-800 flex items-center justify-center text-gray-400 overflow-hidden relative group transition-all duration-300 hover:border-amber-500/50 hover:bg-zinc-900 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            />
            
            {imageUrl ? (
            <img src={imageUrl} alt="Uploaded preview" className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
            ) : (
            <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                     <UploadIcon className="w-5 h-5 text-zinc-500 group-hover:text-amber-400" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 group-hover:text-zinc-300">Upload Image</p>
            </div>
            )}
            
            {imageUrl && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <p className="text-white text-xs font-bold uppercase tracking-wider border border-white/20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                        Replace
                    </p>
                </div>
            )}
        </div>
    </div>
  );
};

export default SimpleImageUploader;