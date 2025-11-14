import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  icon?: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, isOpen = false, icon }) => {
  const [isSectionOpen, setIsSectionOpen] = useState(isOpen);

  return (
    <div className="border-b border-zinc-800 last:border-b-0">
      <button
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        className="w-full flex justify-between items-center p-4 text-left transition-colors hover:bg-zinc-800/50"
        aria-expanded={isSectionOpen}
      >
        <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            isSectionOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`collapsible-content ${isSectionOpen ? 'open' : ''}`}
      >
        <div className="pt-0 p-4">
            {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
