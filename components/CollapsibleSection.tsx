
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon.tsx';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  icon?: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, isOpen = false, icon }) => {
  const [isSectionOpen, setIsSectionOpen] = useState(isOpen);

  return (
    <div className="border-b border-zinc-200 dark:border-white/5 last:border-b-0 group">
      <button
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        className="w-full flex justify-between items-center py-5 px-6 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-white/5"
        aria-expanded={isSectionOpen}
      >
        <div className="flex items-center gap-3">
            {icon}
            <h3 className={`text-xs font-bold uppercase tracking-widest transition-colors ${isSectionOpen ? 'text-amber-600 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'}`}>{title}</h3>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-zinc-400 dark:text-zinc-600 transition-transform duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 ${
            isSectionOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`collapsible-content ${isSectionOpen ? 'open' : ''}`}
      >
        <div className="px-6 pb-6 pt-2">
            {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
