import React, { useRef } from 'react';
import { WandIcon } from './icons/WandIcon';

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
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-300">Attire Color</h3>
      <div className="flex flex-wrap gap-3 items-center">
        <button 
          onClick={() => onSelectColor('automatic')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${
            selectedColor === 'automatic' 
              ? 'border-amber-500 scale-110 ring-2 ring-amber-500 ring-offset-2 ring-offset-zinc-900' 
              : 'border-zinc-700 hover:border-white'
          }`}
          style={{ background: 'conic-gradient(from 180deg at 50% 50%, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)'}}
          aria-label="Automatic color selection"
          title="Automatic (Let AI choose)"
        >
          <WandIcon className="w-5 h-5 text-white" />
        </button>
        
        {palette.map(color => (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            className={`w-10 h-10 rounded-full transition-all border-2 ${
              selectedColor === color 
                ? 'border-white scale-110 ring-2 ring-white ring-offset-2 ring-offset-zinc-900' 
                : 'border-transparent hover:border-white'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
            title={color}
          />
        ))}

        <div className="relative w-10 h-10">
          <input
            ref={colorInputRef}
            type="color"
            value={isCustomColorSelected ? selectedColor : '#000000'} // Prevent showing black for palette colors
            onChange={handleCustomColorChange}
            className="absolute -top-full -left-full w-[300%] h-[300%] opacity-0 cursor-pointer"
            aria-label="Choose a custom color"
          />
          <button
            onClick={() => colorInputRef.current?.click()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${
              isCustomColorSelected
                ? 'border-white scale-110 ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
                : 'border-zinc-700 hover:border-white'
            }`}
            style={{ 
                background: isCustomColorSelected ? selectedColor : 'conic-gradient(from 180deg at 50% 50%, red, orange, yellow, green, blue, indigo, violet, red)',
            }}
            title="Choose a custom color"
          >
            {!isCustomColorSelected && <span className="text-white font-bold text-xl">+</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;