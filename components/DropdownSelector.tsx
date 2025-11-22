
import React from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon.tsx';

interface DropdownOption {
  label: string;
  value: string;
}

interface StyleOption {
    id: string;
    name: string;
    prompt?: string;
}

interface OptionGroup {
    category: string;
    styles: StyleOption[];
}

interface DropdownSelectorProps {
  label: string;
  options?: DropdownOption[];
  optionGroups?: OptionGroup[];
  selectedValue: string;
  onSelect: (value: string) => void;
  valueProp?: 'id' | 'prompt';
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ label, options, optionGroups, selectedValue, onSelect, valueProp = 'id' }) => {
  const selectId = `dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="group">
      <label htmlFor={selectId} className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors pl-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={selectedValue}
          onChange={(e) => onSelect(e.target.value)}
          className="appearance-none w-full bg-white dark:bg-zinc-950/50 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 text-xs font-medium py-3 pl-4 pr-10 rounded-sm focus:ring-0 focus:border-amber-500 focus:bg-zinc-50 dark:focus:bg-zinc-900 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600"
          style={{ backgroundImage: 'none' }}
        >
          {options && options.map((option) => (
            <option key={option.label} value={option.value} className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300 py-2">
              {option.label}
            </option>
          ))}
          {optionGroups && optionGroups.map((group) => (
            <optgroup key={group.category} label={group.category} className="bg-white dark:bg-zinc-950 text-zinc-500 font-bold uppercase">
              {group.styles.map((style) => (
                <option key={style.id} value={valueProp === 'prompt' && style.prompt ? style.prompt : style.id} className="bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300 font-normal normal-case">
                  {style.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500 dark:text-zinc-600 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default DropdownSelector;
