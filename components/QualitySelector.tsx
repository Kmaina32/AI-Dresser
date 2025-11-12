import React from 'react';
import { QualityOption } from '../constants';

interface QualitySelectorProps {
  options: QualityOption[];
  selectedQuality: string;
  onSelectQuality: (qualityValue: string) => void;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({ options, selectedQuality, onSelectQuality }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-center text-gray-300">Image Quality</h3>
      <div className="flex justify-center gap-4">
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => onSelectQuality(option.value)}
            className={`px-6 py-3 w-32 text-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
              selectedQuality === option.value
                ? 'bg-amber-500 text-black shadow-lg scale-105 ring-amber-500'
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white'
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QualitySelector;