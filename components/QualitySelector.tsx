import React from 'react';
import { QualityOption } from '../constants.ts';

interface QualitySelectorProps {
  options: QualityOption[];
  selectedQuality: string;
  onSelectQuality: (qualityValue: string) => void;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({ options, selectedQuality, onSelectQuality }) => {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Output Quality</h3>
      <div className="flex bg-zinc-900 p-1 rounded-md">
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => onSelectQuality(option.value)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-sm transition-all duration-200 ${
              selectedQuality === option.value
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
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