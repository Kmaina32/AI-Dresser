import React from 'react';

const GalleryPage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-playfair mb-4 text-white">Style Gallery</h2>
        <p className="text-lg text-gray-400 mb-12">
          Discover a collection of stunning looks created with our AI Bespoke Styler.
        </p>
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl">
             <p className="text-gray-500">The gallery is currently empty. Create your own look on the Creator page to see the magic!</p>
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;