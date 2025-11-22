
import React from 'react';
import { LockClosedIcon } from './icons/LockClosedIcon.tsx';
import { LockOpenIcon } from './icons/LockOpenIcon.tsx';

interface FaceLockToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  mode?: 'apparel' | 'vehicle' | 'interior' | 'landscape';
}

const FaceLockToggle: React.FC<FaceLockToggleProps> = ({ isEnabled, onToggle, mode = 'apparel' }) => {
  
  let title = "Identity Lock";
  let desc = "Strictly preserves facial features.";
  
  if (mode === 'vehicle') {
      title = "Geometry Lock";
      desc = "Preserves exact car model/angle.";
  } else if (mode === 'interior') {
      title = "Architectural Lock";
      desc = "Preserves walls, windows & layout.";
  } else if (mode === 'landscape') {
      title = "Terrain Lock";
      desc = "Preserves topography & buildings.";
  }

  return (
    <div className="flex items-center justify-between py-2">
        <div className="flex flex-col">
            <h3 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
                {isEnabled ? <LockClosedIcon className="w-4 h-4 text-amber-400" /> : <LockOpenIcon className="w-4 h-4 text-zinc-600" />}
                <span>{title}</span>
            </h3>
            <p className="text-[10px] text-zinc-500 max-w-[200px] leading-tight mt-1">
                {desc}
            </p>
        </div>
        <button
            onClick={() => onToggle(!isEnabled)}
            className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors duration-300 focus:outline-none ${isEnabled ? 'bg-amber-500' : 'bg-zinc-700'}`}
            role="switch"
            aria-checked={isEnabled}
        >
            <span
                className={`inline-block w-3 h-3 transform bg-black rounded-full transition-transform duration-300 shadow-sm ${isEnabled ? 'translate-x-5' : 'translate-x-1'}`}
            />
        </button>
    </div>
  );
};

export default FaceLockToggle;
