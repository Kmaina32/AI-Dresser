import React, { useRef } from 'react';
import { WandIcon } from './icons/WandIcon.tsx';

interface ColorSelectorProps {
  palette: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ palette, selectedColor, onSelectColor }) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectColor(e.target.value);
  };

  const isCustomColorSelected = selectedColor !== 'automatic' && !palette.includes(selectedColor);
  
  return (
    <div className="bg-zinc-900/30 p-3 rounded-md border border-white/5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Attire Tone</h3>
      <div className="flex flex-wrap gap-2 items-center">
        <button 
          onClick={() => onSelectColor('automatic')}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border ${
            selectedColor === 'automatic' 
              ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
              : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500'
          }`}
          aria-label="Automatic color selection"
          title="Auto (AI Choice)"
        >
          <WandIcon className="w-4 h-4" />
        </button>
        
        {palette.map(color => (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            className={`w-8 h-8 rounded-full transition-all border ${
              selectedColor === color 
                ? 'border-white scale-110 shadow-md' 
                : 'border-transparent hover:border-white/50'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
            title={color}
          />
        ))}

        <div className="relative w-8 h-8">
          <input
            ref={colorInputRef}
            type="color"
            value={isCustomColorSelected ? selectedColor : '#000000'}
            onChange={handleCustomColorChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <button
            onClick={() => colorInputRef.current?.click()}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border ${
              isCustomColorSelected
                ? 'border-white scale-110 shadow-md'
                : 'bg-transparent border-zinc-700 border-dashed hover:border-zinc-500 text-zinc-500 hover:text-zinc-300'
            }`}
            style={{ 
                background: isCustomColorSelected ? selectedColor : 'transparent',
            }}
            title="Custom Color"
          >
            {!isCustomColorSelected && <span className="text-sm font-light">+</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;