
import React from 'react';
import { StyleCategory, StyleOption } from '../constants.ts';
import ColorSelector from './ColorSelector.tsx';
import { SearchIcon } from './icons/SearchIcon.tsx';
import { CloseIcon } from './icons/CloseIcon.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';

const FILTER_TAGS = [
  { label: 'Formal', value: 'formal' },
  { label: 'Business', value: 'business' },
  { label: 'Everyday', value: 'everyday' },
  { label: 'Cultural', value: 'cultural' },
  { label: 'Modern', value: 'modern' },
  { label: 'Themed', value: 'themed' },
  { label: 'Cartoon', value: 'cartoon' },
  { label: 'Movie', value: 'movie' },
  { label: 'Mods', value: 'mod' },
];

interface StyleSelectorProps {
    categories: StyleCategory[];
    selectedStyleIds: string[];
    onSelectStyle: (id: string) => void;
    selectedColor: string;
    onSelectColor: (color: string) => void;
    selectedStyleObject?: StyleOption; // Keep for color palette (usually from the last selected)
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeFilters: string[];
    onFilterToggle: (tag: string) => void;
    onClearFilters: () => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
    categories, selectedStyleIds, onSelectStyle,
    selectedColor, onSelectColor, selectedStyleObject, searchQuery, onSearchChange,
    activeFilters, onFilterToggle, onClearFilters
}) => {
  const filteredCategories = React.useMemo(() => {
    if (activeFilters.length === 0 && searchQuery.trim() === '') {
      return categories;
    }

    // Deep copy structure to avoid mutation issues during filter
    let resultCategories = categories.map(cat => ({...cat, styles: [...cat.styles]}));

    // 1. Filter by Tags (AND logic)
    if (activeFilters.length > 0) {
        resultCategories = resultCategories.map(category => ({
            ...category,
            styles: category.styles.filter(style => 
                activeFilters.every(filter => style.tags.includes(filter))
            )
        }));
    }

    // 2. Filter by Search Query (Multi-term AND logic)
    if (searchQuery.trim() !== '') {
        const queryTerms = searchQuery.toLowerCase().trim().split(/\s+/);
        
        resultCategories = resultCategories.map(category => ({
            ...category,
            styles: category.styles.filter(style => {
                const styleName = style.name.toLowerCase();
                const styleTags = style.tags.join(' ').toLowerCase();
                const categoryName = category.category.toLowerCase();

                // Returns true if ALL terms are found in (Name OR Tags OR CategoryName)
                return queryTerms.every(term => 
                    styleName.includes(term) || 
                    styleTags.includes(term) || 
                    categoryName.includes(term)
                );
            })
        }));
    }

    // 3. Remove empty categories
    return resultCategories.filter(category => category.styles.length > 0);
  }, [activeFilters, categories, searchQuery]);

  return (
    <div className="space-y-6">
        {/* Search Input */}
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-amber-500 dark:group-focus-within:text-amber-400 transition-colors">
                <SearchIcon className="w-4 h-4" />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search styles (e.g., 'blue suit')..."
                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white py-2 pl-6 focus:border-amber-500 focus:outline-none transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
            />
             {searchQuery && (
                <button
                    onClick={() => onSearchChange('')}
                    className="absolute inset-y-0 right-0 flex items-center text-zinc-400 hover:text-black dark:hover:text-white"
                >
                    <CloseIcon className="w-4 h-4" />
                </button>
            )}
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
            {FILTER_TAGS.map(tag => (
                <button
                    key={tag.value}
                    onClick={() => onFilterToggle(tag.value)}
                    className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-sm transition-all duration-200 ${
                    activeFilters.includes(tag.value)
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white'
                        : 'bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300'
                    }`}
                >
                    {tag.label}
                </button>
            ))}
            {activeFilters.length > 0 && (
                <button onClick={onClearFilters} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-500 dark:text-red-400 hover:text-red-400 dark:hover:text-red-300">
                    Clear
                </button>
            )}
        </div>

        {/* Color Palette */}
        {selectedStyleObject?.isColorCustomizable !== false && (
            <ColorSelector 
                palette={selectedStyleObject?.colorPalette || []}
                selectedColor={selectedColor}
                onSelectColor={onSelectColor}
            />
        )}
      
      {/* Style List */}
      <div className="space-y-5">
        {filteredCategories.map((category) => (
          <div key={category.category}>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-600 mb-2">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.styles.map((style) => {
                const isSelected = selectedStyleIds.includes(style.id);
                return (
                    <button
                    key={style.id}
                    onClick={() => onSelectStyle(style.id)}
                    className={`text-left px-3 py-2 text-xs font-medium rounded-sm border transition-all duration-200 flex items-center gap-2 ${
                        isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.1)]'
                        : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                    >
                    {isSelected && <CheckIcon className="w-3 h-3" />}
                    {style.name}
                    </button>
                );
              })}
            </div>
          </div>
        ))}
         {filteredCategories.length === 0 && (
            <div className="text-center py-8 opacity-50">
                <p className="text-xs uppercase tracking-widest text-zinc-500">No styles found</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default StyleSelector;
