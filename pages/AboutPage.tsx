import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-gray-300">
        <h2 className="text-4xl font-bold font-playfair mb-6 text-center text-white">About Lion's Apparel</h2>
        
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl space-y-6 text-lg leading-relaxed">
            <p>
                Welcome to Lion's Apparel, a revolutionary application that brings the tailor's shop to your fingertips.
                Powered by Google's advanced Gemini AI, our tool allows you to visualize yourself in a vast collection of
                exquisite attire from around the world without ever leaving your home.
            </p>
            <p>
                Our mission is to blend cutting-edge technology with timeless fashion. Whether you're exploring the rich traditions of
                African bespoke, the regal elegance of Indian Sherwanis, or the sharp sophistication of Western classics, our AI
                can seamlessly restyle your photo in seconds.
            </p>
            <h3 className="text-2xl font-semibold font-playfair text-amber-400 pt-4">How It Works</h3>
            <ol className="list-decimal list-inside space-y-3">
                <li><span className="font-semibold">Upload Your Photo:</span> Start with a clear photo of yourself. For best results, use an image where your current outfit is simple.</li>
                <li><span className="font-semibold">Customize Your Look:</span> Browse through our extensive catalog of suit styles, backgrounds, lighting, and shoes. Mix and match to create your perfect ensemble.</li>
                <li><span className="font-semibold">Generate & See:</span> With a single click, our AI gets to work, meticulously editing your photo to dress you in your chosen style. Our "Face Lock" technology ensures your identity is perfectly preserved.</li>
                <li><span className="font-semibold">Download & Share:</span> Instantly download your high-quality new look and share it with the world.</li>
            </ol>
            <p className="pt-4">
                This application is a demonstration of the creative power of generative AI. We hope you enjoy exploring the endless possibilities of style.
            </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;