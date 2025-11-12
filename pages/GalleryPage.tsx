import React from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { RemixConfig } from '../App';
import { SparklesIcon } from '../components/icons/SparklesIcon';

interface GalleryPageProps {
  onRemix: (config: RemixConfig) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ onRemix }) => {

  const handleRemixClick = (item: GalleryItem) => {
    const { image, title, description, ...remixConfig } = item;
    onRemix(remixConfig);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-playfair mb-4 text-white">Style Gallery</h2>
        <p className="text-lg text-gray-400 mb-12">
          Discover stunning looks and remix them to create your own masterpiece.
        </p>
        
        {GALLERY_ITEMS.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_ITEMS.map((item, index) => (
              <div key={index} className="group relative bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden text-left">
                <div className="aspect-w-4 aspect-h-5">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white font-playfair">{item.title}</h3>
                  <p className="text-sm text-gray-300 mt-1 mb-4">{item.description}</p>
                  <button 
                    onClick={() => handleRemixClick(item)}
                    className="w-full bg-amber-500 text-black font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <SparklesIcon className="w-5 h-5" />
                    Remix this Look
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl">
               <p className="text-gray-500">The gallery is currently empty. Create your own look on the Creator page to see the magic!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default GalleryPage;