import React from 'react';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { LockOpenIcon } from './icons/LockOpenIcon';

interface FaceLockToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const FaceLockToggle: React.FC<FaceLockToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <div className="mb-8 p-4 bg-black/50 rounded-lg border border-zinc-800 flex items-center justify-between">
        <div>
            <h3 className="text-lg font-semibold text-white flex items-center">
                {isEnabled ? <LockClosedIcon className="w-5 h-5 mr-2 text-amber-400" /> : <LockOpenIcon className="w-5 h-5 mr-2 text-gray-400" />}
                Face Lock
            </h3>
            <p className="text-sm text-gray-400 mt-1 max-w-md">
                {isEnabled 
                    ? "Ensures the person's face is a 100% match. The AI will not alter facial features."
                    : "Allows for artistic variations. The AI may subtly enhance features for a stylized look."}
            </p>
        </div>
        <button
            onClick={() => onToggle(!isEnabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 ${isEnabled ? 'bg-amber-500 focus:ring-amber-500' : 'bg-zinc-700 focus:ring-gray-500'}`}
            role="switch"
            aria-checked={isEnabled}
            aria-label="Toggle Face Lock"
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    </div>
  );
};

export default FaceLockToggle;