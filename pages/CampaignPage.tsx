
import React, { useState, useCallback } from 'react';
import SimpleImageUploader from '../components/SimpleImageUploader.tsx';
import ResultDisplay from '../components/ResultDisplay.tsx';
import DropdownSelector from '../components/DropdownSelector.tsx';
import { KENYAN_PARTIES, CAMPAIGN_POSITIONS, CAMPAIGN_WRAP_STYLES, CAMPAIGN_MODS } from '../constants.ts';
import { generateCampaignMaterial } from '../services/geminiService.ts';
import { CampaignIcon } from '../components/icons/CampaignIcon.tsx';
import { SlidersIcon } from '../components/icons/SlidersIcon.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
import CollapsibleSection from '../components/CollapsibleSection.tsx';

const PosterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

const VehicleIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
);

const CampaignPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mode, setMode] = useState<'poster' | 'vehicle'>('poster');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    
    const [selectedPartyId, setSelectedPartyId] = useState<string>(KENYAN_PARTIES[0].id);
    const [position, setPosition] = useState<string>(CAMPAIGN_POSITIONS[0].value);
    const [slogan, setSlogan] = useState<string>('Maendeleo kwa Wote');
    const [wrapStyle, setWrapStyle] = useState<string>(CAMPAIGN_WRAP_STYLES[0].value);
    const [selectedCampaignMods, setSelectedCampaignMods] = useState<string[]>([]);

    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const SLOGAN_LIMIT = 50;

    const handleImageUpload = (file: File, dataUrl: string) => {
        setImageFile(file);
        setImageUrl(dataUrl);
        setGeneratedImage(null);
    };

    const selectedParty = KENYAN_PARTIES.find(p => p.id === selectedPartyId) || KENYAN_PARTIES[0];

    const handleModToggle = (modPrompt: string) => {
        setSelectedCampaignMods(prev => prev.includes(modPrompt) 
            ? prev.filter(p => p !== modPrompt) 
            : [...prev, modPrompt]
        );
    };

    const handleGenerate = useCallback(async () => {
        if (!imageFile) {
            setError(`Please upload a ${mode === 'poster' ? 'candidate' : 'vehicle'} image.`);
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setIsSidebarOpen(false);

        try {
            const result = await generateCampaignMaterial(
                imageFile,
                mode,
                selectedParty,
                position,
                slogan,
                mode === 'vehicle' ? wrapStyle : undefined,
                mode === 'vehicle' ? selectedCampaignMods : undefined
            );
            setGeneratedImage(result);
        } catch (e) {
            console.error(e);
            setError('Failed to generate campaign material. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [imageFile, mode, selectedParty, position, slogan, wrapStyle, selectedCampaignMods]);

    const partyOptions = KENYAN_PARTIES.map(p => ({ label: p.name, value: p.id }));
    const positionOptions = CAMPAIGN_POSITIONS.map(p => ({ label: p.name, value: p.value }));
    const wrapStyleOptions = CAMPAIGN_WRAP_STYLES.map(w => ({ label: w.name, value: w.value }));

    const shareText = `Vote for ${position}: "${slogan}". Proudly supporting ${selectedParty.name}! Generated with Campaign Builder.`;
    const shareTitle = `Vote for ${selectedParty.name}`;

    return (
        <div className="flex flex-col lg:flex-row h-full relative">
             {/* Backdrop for mobile menu */}
             {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden" 
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-0 lg:relative lg:inset-auto
                w-full sm:w-[420px] lg:w-[420px]
                glass-panel border-r-0 lg:border-r border-zinc-200 dark:border-white/5
                flex flex-col z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex-shrink-0 
                bg-white/95 dark:bg-zinc-950/80 backdrop-blur-xl
            `}>
                 {/* Mobile Sidebar Header */}
                 <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-white/5 lg:hidden bg-white dark:bg-zinc-950/80 backdrop-blur-md relative z-20 shadow-2xl">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                            <CampaignIcon className="w-5 h-5 text-amber-400" />
                         </div>
                         <span className="font-playfair text-xl text-zinc-900 dark:text-white font-bold tracking-wide">Campaign Setup</span>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(false)} 
                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-95 border border-black/5 dark:border-white/5"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                 {/* Scrollable Controls */}
                 <div className="flex-grow overflow-y-auto custom-scrollbar pb-32 lg:pb-0">
                    {/* Mode Toggle */}
                    <div className="p-6 border-b border-zinc-200 dark:border-white/5">
                         <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 dark:bg-black/40 rounded-lg border border-zinc-200 dark:border-white/5">
                            <button
                                onClick={() => setMode('poster')}
                                className={`flex items-center justify-center gap-2 py-3 rounded-md transition-all duration-300 ${mode === 'poster' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-white/5'}`}
                            >
                                <PosterIcon />
                                <span className="text-[10px] font-bold uppercase tracking-wide">Poster</span>
                            </button>
                            <button
                                onClick={() => setMode('vehicle')}
                                className={`flex items-center justify-center gap-2 py-3 rounded-md transition-all duration-300 ${mode === 'vehicle' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-white/5'}`}
                            >
                                <VehicleIcon />
                                <span className="text-[10px] font-bold uppercase tracking-wide">Wrap</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                         <SimpleImageUploader
                            label={mode === 'poster' ? 'Candidate Photo' : 'Vehicle Photo'}
                            imageUrl={imageUrl}
                            onImageUpload={handleImageUpload}
                        />
                    </div>

                    <CollapsibleSection title="Party Identity" isOpen={true}>
                        <div className="space-y-6">
                            <DropdownSelector label="Political Party" options={partyOptions} selectedValue={selectedPartyId} onSelect={setSelectedPartyId} />
                            
                            {/* Dynamic Party Info Display */}
                            <div className="p-4 bg-zinc-100 dark:bg-black/40 rounded-sm border-l-4 border-amber-500 flex items-start gap-4 transition-all">
                                <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full shadow-lg border border-white/10" style={{ backgroundColor: selectedParty.hexColor }}></div>
                                </div>
                                <div>
                                    <h4 className="text-zinc-900 dark:text-white text-sm font-bold tracking-wide">{selectedParty.fullName}</h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 font-medium">Symbol: <span className="text-zinc-700 dark:text-white">{selectedParty.symbol}</span></p>
                                    <p className="text-zinc-400 dark:text-zinc-500 text-[10px] mt-0.5 uppercase tracking-wider">Colors: {selectedParty.colors}</p>
                                </div>
                            </div>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Campaign Details" isOpen={true}>
                        <div className="space-y-6">
                             <DropdownSelector label="Position" options={positionOptions} selectedValue={position} onSelect={setPosition} />

                             <div>
                                <div className="flex justify-between items-end mb-2">
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Campaign Slogan</label>
                                    <span className={`text-[10px] font-mono ${slogan.length >= SLOGAN_LIMIT ? 'text-red-500' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                        {slogan.length}/{SLOGAN_LIMIT}
                                    </span>
                                </div>
                                <input 
                                    type="text" 
                                    value={slogan} 
                                    onChange={(e) => setSlogan(e.target.value)}
                                    maxLength={SLOGAN_LIMIT} 
                                    className="w-full input-tech rounded-sm px-4 py-3 text-sm placeholder-zinc-500 dark:placeholder-zinc-600 bg-white dark:bg-black/40"
                                    placeholder="Enter slogan..."
                                />
                             </div>
                        </div>
                    </CollapsibleSection>

                    {mode === 'vehicle' && (
                        <CollapsibleSection title="Vehicle Wrap Config" isOpen={true}>
                             <div className="space-y-6">
                                <DropdownSelector label="Wrap Style" options={wrapStyleOptions} selectedValue={wrapStyle} onSelect={setWrapStyle} />
                                
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3 pl-1">PA Accessories</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {CAMPAIGN_MODS.map(mod => (
                                            <button
                                                key={mod.value || mod.name}
                                                onClick={() => handleModToggle(mod.prompt)}
                                                className={`px-3 py-3 text-[10px] font-bold uppercase tracking-wider border rounded-sm transition-all duration-200 text-center ${
                                                    selectedCampaignMods.includes(mod.prompt)
                                                    ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                                                    : 'bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-600'
                                                }`}
                                            >
                                                {mod.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                             </div>
                        </CollapsibleSection>
                    )}
                 </div>

                 {/* Desktop Generate Button Area */}
                <div className="p-6 border-t border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-lg hidden lg:block">
                     <button
                        onClick={handleGenerate}
                        disabled={!imageFile || isLoading}
                        className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:bg-amber-400 disabled:bg-zinc-200 dark:disabled:bg-zinc-900 disabled:text-zinc-400 dark:disabled:text-zinc-700 disabled:shadow-none transition-all btn-tech"
                    >
                        {isLoading ? (mode === 'poster' ? 'Designing...' : 'Wrapping...') : (mode === 'poster' ? 'Generate Poster' : 'Generate Wrap')}
                    </button>
                    {error && <p className="text-red-500 dark:text-red-400 mt-3 text-center text-[10px] uppercase tracking-wide border border-red-500/20 bg-red-500/5 py-2 rounded-sm">{error}</p>}
                </div>
            </div>

            {/* Main Canvas Area */}
            <div className="flex-grow h-full relative overflow-y-auto custom-scrollbar flex flex-col items-center justify-center pt-12 pb-32 px-4 md:px-12 lg:py-12 z-0">
                 {/* Mobile Toggle Button */}
                 <div className="lg:hidden absolute top-6 right-6 z-20">
                     <button onClick={() => setIsSidebarOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/60 backdrop-blur-xl text-zinc-900 dark:text-white rounded-full border border-zinc-200 dark:border-white/10 shadow-xl hover:border-amber-400/50 transition-all active:scale-95">
                         <SlidersIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                         <span className="text-[10px] font-bold uppercase tracking-wide">Settings</span>
                     </button>
                 </div>

                <div className="w-full max-w-3xl animate-fade-in">
                     <ResultDisplay
                        originalImage={null}
                        generatedImage={generatedImage}
                        isLoading={isLoading}
                        showBeforeAfterToggle={false}
                        shareText={shareText}
                        shareTitle={shareTitle}
                    />
                    {!generatedImage && !isLoading && (
                         <div className="text-center mt-8 opacity-50">
                            <CampaignIcon className="w-16 h-16 mx-auto text-zinc-700 dark:text-zinc-700 mb-4" />
                            <p className="text-zinc-500 text-sm uppercase tracking-widest">Configure campaign settings to begin</p>
                         </div>
                    )}
                </div>
            </div>

            {/* Mobile Sticky Bottom Action Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-white/5 z-50">
                 <button
                    onClick={handleGenerate}
                    disabled={!imageFile || isLoading}
                    className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-lg disabled:opacity-50 btn-tech"
                >
                    {isLoading ? 'Processing...' : 'Generate Material'}
                </button>
                {error && <p className="text-red-500 dark:text-red-400 mt-2 text-center text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default CampaignPage;
