import React, { useState } from 'react';
import { GeoLogo } from '../components/logo.tsx';

const AboutPage: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <main className="container mx-auto px-4 py-12 pt-20 md:pt-24 md:py-20">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-end gap-6 mb-16 border-b border-white/10 pb-8">
              <div className="flex-1">
                  <h2 className="text-6xl md:text-9xl font-bold font-playfair text-white tracking-tighter leading-none">
                      Geo<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-700">Studio</span>
                  </h2>
              </div>
              <div className="md:w-64 pb-2">
                  <p className="text-xs font-mono text-amber-500 mb-2">/// SYSTEM STATUS: ONLINE</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                      An experimental neural interface for procedural design generation. Bridging the gap between conceptual thought and photorealistic rendering.
                  </p>
              </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column: Manifesto */}
              <div className="lg:col-span-2 space-y-12">
                   <div className="p-10 bg-zinc-900/30 border border-white/5 rounded-sm backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                        <h3 className="text-2xl font-playfair text-white mb-6">The Architect's Vision</h3>
                        <p className="text-lg text-zinc-300 font-light leading-relaxed mb-6">
                            We believe that design should be fluid, instant, and boundless. Geo Studio is not just an image generator; it is a 
                            <span className="text-white font-medium"> semantic translation engine</span>. 
                        </p>
                        <p className="text-lg text-zinc-300 font-light leading-relaxed">
                            Powered by the Gemini 2.5 Flash model, we employ advanced techniques like "Identity Locking" and "Geometry Preservation" to allow you to manipulate the fabric of reality—whether that's the fabric of a bespoke suit, the steel of a rally car, or the pixels of a cinematic poster—without losing the essence of the subject.
                        </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-black/20 border border-white/5 p-6 rounded-sm">
                            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-3">01. Apparel Engine</h4>
                            <p className="text-zinc-500 text-sm">Cultural specificity meets haute couture. From Nigerian Agbada to Savile Row tailoring, visualized on you instantly.</p>
                        </div>
                        <div className="bg-black/20 border border-white/5 p-6 rounded-sm">
                            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-3">02. Automotive Works</h4>
                            <p className="text-zinc-500 text-sm">Complete vehicle modification. Wraps, rims, aero-kits, and lighting, respecting the original chassis geometry.</p>
                        </div>
                        <div className="bg-black/20 border border-white/5 p-6 rounded-sm">
                            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-3">03. Campaign Bureau</h4>
                            <p className="text-zinc-500 text-sm">Rapid visualization for political and brand campaigns. Posters and vehicle branding that maintain brand integrity.</p>
                        </div>
                        <div className="bg-black/20 border border-white/5 p-6 rounded-sm">
                            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-3">04. Veo Cinema</h4>
                            <p className="text-zinc-500 text-sm">Motion synthesis. Transforming static concepts into breathing, moving cinematic moments.</p>
                        </div>
                   </div>
              </div>

              {/* Right Column: Stats & Credits */}
              <div className="space-y-8">
                  <div className="bg-zinc-950 border border-white/10 p-8 rounded-sm">
                      <GeoLogo className="scale-75 origin-left mb-6" />
                      <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                              <span className="text-zinc-500 text-xs uppercase tracking-wider">Version</span>
                              <span className="text-white font-mono text-xs">2.4.0 (Beta)</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                              <span className="text-zinc-500 text-xs uppercase tracking-wider">Model</span>
                              <span className="text-white font-mono text-xs">Gemini 2.5 Flash</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                              <span className="text-zinc-500 text-xs uppercase tracking-wider">Video</span>
                              <span className="text-white font-mono text-xs">Veo</span>
                          </div>
                          <div className="flex justify-between items-center pb-2">
                              <span className="text-zinc-500 text-xs uppercase tracking-wider">Latency</span>
                              <span className="text-green-400 font-mono text-xs">~2.4s</span>
                          </div>
                      </div>
                  </div>

                  <div className="p-6 border border-dashed border-zinc-800 rounded-sm">
                      <p className="text-zinc-600 text-xs leading-loose text-center italic">
                          "The computer is the most remarkable tool that we have ever come up with. It's the equivalent of a bicycle for our minds."
                      </p>
                  </div>
              </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AboutPage;