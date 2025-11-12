import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black/50 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
          👔 African Bespoke
        </h1>
      </div>
    </header>
  );
};

export default Header;