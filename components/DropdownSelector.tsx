import React from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

// Interfaces to describe the shape of categorized data without importing from constants
interface StyleOption {
    name: string;
    prompt: string;
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
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ label, options, optionGroups, selectedValue, onSelect }) => {
  const selectId = `dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div>
      <label htmlFor={selectId} className="block text-lg font-semibold mb-3 text-center text-gray-300">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={selectedValue}
          onChange={(e) => onSelect(e.target.value)}
          className="appearance-none w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
          aria-label={`Select ${label}`}
        >
          {options && options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
          {optionGroups && optionGroups.map((group) => (
            <optgroup key={group.category} label={group.category}>
              {group.styles.map((style) => (
                <option key={style.name} value={style.prompt}>
                  {style.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DropdownSelector;