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
    <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-300">{label}</h3>
        <div 
            className="aspect-w-1 aspect-h-1 w-full bg-zinc-900 rounded-xl border-2 border-dashed border-zinc-800 flex items-center justify-center text-gray-400 overflow-hidden relative group transition-all duration-300 hover:border-amber-500 hover:bg-zinc-800"
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
            <img src={imageUrl} alt="Uploaded preview" className="object-cover w-full h-full" />
            ) : (
            <div className="text-center p-4 cursor-pointer">
                <UploadIcon className="w-12 h-12 mx-auto mb-2" />
                <p className="font-semibold">Click to upload or drag & drop</p>
            </div>
            )}
            
            {imageUrl && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300 z-10 cursor-pointer">
                    <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Change Image
                    </p>
                </div>
            )}
        </div>
    </div>
  );
};

export default SimpleImageUploader;
