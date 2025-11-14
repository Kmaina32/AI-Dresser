import React from 'react';
import { StyleCategory, StyleOption } from '../constants';
import ColorSelector from './ColorSelector';
import { SearchIcon } from './icons/SearchIcon';
import { CloseIcon } from './icons/CloseIcon';

type AttireType = 'menswear' | 'womenswear';

const FILTER_TAGS = [
  { label: 'Formal', value: 'formal' },
  { label: 'Business', value: 'business' },
  { label: 'Everyday', value: 'everyday' },
  { label: 'Cultural', value: 'cultural' },
  { label: 'Modern', value: 'modern' },
  { label: 'Classic', value: 'classic' },
  { label: 'Themed', value: 'themed' },
];

interface StyleSelectorProps {
    attireType: AttireType;
    onAttireTypeChange: (type: AttireType) => void;
    categories: StyleCategory[];
    selectedStyleId: string;
    onSelectStyle: (id: string) => void;
    selectedColor: string;
    onSelectColor: (color: string) => void;
    selectedStyleObject?: StyleOption;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeFilters: string[];
    onFilterToggle: (tag: string) => void;
    onClearFilters: () => void;
}

const AttireTypeButton: React.FC<{type: AttireType; label: string; currentType: AttireType; onClick: (type: AttireType) => void}> = ({ type, label, currentType, onClick }) => (
    <button
      onClick={() => onClick(type)}
      className={`px-4 py-2 w-full text-center text-sm font-semibold rounded-md transition-colors ${
        currentType === type
          ? 'bg-amber-500 text-black'
          : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
      }`}
    >
      {label}
    </button>
);

const StyleSelector: React.FC<StyleSelectorProps> = ({
    attireType, onAttireTypeChange, categories, selectedStyleId, onSelectStyle,
    selectedColor, onSelectColor, selectedStyleObject, searchQuery, onSearchChange,
    activeFilters, onFilterToggle, onClearFilters
}) => {
  const filteredCategories = React.useMemo(() => {
    if (activeFilters.length === 0 && searchQuery.trim() === '') {
      return categories;
    }
    
    let tempCategories = categories;

    if (activeFilters.length > 0) {
        tempCategories = tempCategories.map(category => ({
            ...category,
            styles: category.styles.filter(style => 
                activeFilters.every(filter => style.tags.includes(filter))
            )
        }));
    }

    if (searchQuery.trim() !== '') {
        const lowercasedQuery = searchQuery.toLowerCase().trim();
        tempCategories = tempCategories.map(category => ({
            ...category,
            styles: category.styles.filter(style => 
                style.name.toLowerCase().includes(lowercasedQuery) ||
                style.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
            )
        }));
    }
    
    return tempCategories.filter(category => category.styles.length > 0);
  }, [activeFilters, categories, searchQuery]);

  React.useEffect(() => {
    const allAvailableIds = filteredCategories.flatMap(cat => cat.styles.map(s => s.id));
    if (!allAvailableIds.includes(selectedStyleId) && allAvailableIds.length > 0) {
      onSelectStyle(allAvailableIds[0]);
    }
  }, [filteredCategories, selectedStyleId, onSelectStyle]);

  return (
    <div className="p-4 space-y-6">
        <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Attire Type</h3>
            <div className="flex justify-center gap-2">
                <AttireTypeButton type="menswear" label="Menswear" currentType={attireType} onClick={onAttireTypeChange} />
                <AttireTypeButton type="womenswear" label="Womenswear" currentType={attireType} onClick={onAttireTypeChange} />
            </div>
        </div>
        
        <div className="space-y-2">
            <label htmlFor="style-search" className="text-lg font-semibold text-gray-300">Search Styles</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    id="style-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="e.g., 'Tuxedo'"
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 pl-10 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
                 {searchQuery && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                        aria-label="Clear search"
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Filter by Tag</h3>
            <div className="flex flex-wrap gap-2">
                {FILTER_TAGS.map(tag => (
                    <button
                        key={tag.value}
                        onClick={() => onFilterToggle(tag.value)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        activeFilters.includes(tag.value)
                            ? 'bg-amber-500 text-black border-amber-500'
                            : 'bg-zinc-800 text-gray-300 border-zinc-700 hover:border-amber-400'
                        }`}
                    >
                        {tag.label}
                    </button>
                ))}
                {activeFilters.length > 0 && (
                <button onClick={onClearFilters} className="px-3 py-1 text-xs font-semibold text-red-400 hover:text-red-300">
                    Clear
                </button>
                )}
            </div>
        </div>

        {selectedStyleObject?.isColorCustomizable !== false && (
            <ColorSelector 
                palette={selectedStyleObject?.colorPalette || []}
                selectedColor={selectedColor}
                onSelectColor={onSelectColor}
            />
        )}
      
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">{category.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => onSelectStyle(style.id)}
                  className={`p-4 text-left rounded-lg transition-all border-2 w-full h-full flex flex-col justify-center ${
                    selectedStyleId === style.id
                      ? 'border-amber-500 bg-zinc-700'
                      : 'bg-zinc-800 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <p className="font-semibold text-gray-200 whitespace-normal text-sm">{style.name}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize whitespace-normal">{style.tags.join(' • ')}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
         {filteredCategories.length === 0 && (
            <div className="text-center p-4 bg-zinc-800 rounded-lg">
                <p className="font-semibold text-gray-400">No styles match.</p>
                <p className="text-sm text-gray-500 mt-1">Try a different search or filter.</p>
            </div>
        )}
      </div>

    </div>
  );
};

export default StyleSelector;