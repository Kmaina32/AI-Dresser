
import React, { useState, useCallback, useEffect } from 'react';
import SimpleImageUploader from '../components/SimpleImageUploader.tsx';
import ResultDisplay from '../components/ResultDisplay.tsx';
import DropdownSelector from '../components/DropdownSelector.tsx';
import QualitySelector from '../components/QualitySelector.tsx';
import { KENYAN_PARTIES, CAMPAIGN_POSITIONS, CAMPAIGN_WRAP_STYLES, CAMPAIGN_MODS, CATEGORIZED_CAMPAIGN_TEMPLATES, CATEGORIZED_MANIFESTO_TEMPLATES, QUALITY_OPTIONS, MANIFESTO_FORMATS } from '../constants.ts';
import { generateCampaignMaterial, generateManifestoText } from '../services/geminiService.ts';
import { CampaignIcon } from '../components/icons/CampaignIcon.tsx';
import { SlidersIcon } from '../components/icons/SlidersIcon.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
import { SparklesIcon } from '../components/icons/SparklesIcon.tsx';
import CollapsibleSection from '../components/CollapsibleSection.tsx';

declare global {
    interface AIStudio {
        hasSelectedApiKey: () => Promise<boolean>;
        openSelectKey: () => Promise<void>;
    }
    interface Window {
        aistudio?: AIStudio;
    }
}

const PosterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

const VehicleIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
);

const ManifestoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

const CampaignPage: React.FC = () => {
    const [apiKeySelected, setApiKeySelected] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mode, setMode] = useState<'poster' | 'vehicle' | 'manifesto'>('poster');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    
    const [selectedPartyId, setSelectedPartyId] = useState<string>(KENYAN_PARTIES[0].id);
    const [position, setPosition] = useState<string>(CAMPAIGN_POSITIONS[0].value);
    const [candidateName, setCandidateName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [slogan, setSlogan] = useState<string>('');
    const [wrapStyle, setWrapStyle] = useState<string>(CAMPAIGN_WRAP_STYLES[0].value || 'full');
    const [selectedCampaignMods, setSelectedCampaignMods] = useState<string[]>([]);
    const [selectedQuality, setSelectedQuality] = useState<string>(QUALITY_OPTIONS[0].value);
    const [manifestoPoints, setManifestoPoints] = useState<string>('');
    const [isGeneratingText, setIsGeneratingText] = useState(false);
    
    // Background Config
    const [backgroundColor, setBackgroundColor] = useState<string>(KENYAN_PARTIES[0].hexColor);
    const [backgroundOpacity, setBackgroundOpacity] = useState<number>(100);

    // Logo Upload
    const [partyLogoFile, setPartyLogoFile] = useState<File | null>(null);
    const [partyLogoUrl, setPartyLogoUrl] = useState<string | null>(null);

    // Template Selection
    const [selectedTemplate, setSelectedTemplate] = useState<string>(CATEGORIZED_CAMPAIGN_TEMPLATES[0].styles[0].prompt);
    const [selectedManifestoTemplate, setSelectedManifestoTemplate] = useState<string>(CATEGORIZED_MANIFESTO_TEMPLATES[0].styles[0].prompt);
    const [selectedManifestoFormat, setSelectedManifestoFormat] = useState<string>(MANIFESTO_FORMATS[2].prompt); // Default to A4

    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const SLOGAN_LIMIT = 50;

    // --- API Key Logic ---
    const checkApiKey = useCallback(async () => {
        if (window.aistudio && (await window.aistudio.hasSelectedApiKey())) {
            setApiKeySelected(true);
        }
    }, []);

    useEffect(() => {
        checkApiKey();
    }, [checkApiKey]);
    
    const handleSelectKey = async () => {
        if(window.aistudio) {
            await window.aistudio.openSelectKey();
            setApiKeySelected(true);
        }
    };
    // ---------------------

    const handleImageUpload = (file: File, dataUrl: string) => {
        setImageFile(file);
        setImageUrl(dataUrl);
        setGeneratedImage(null);
    };

    const handleLogoUpload = (file: File, dataUrl: string) => {
        setPartyLogoFile(file);
        setPartyLogoUrl(dataUrl);
    };

    const selectedParty = KENYAN_PARTIES.find(p => p.id === selectedPartyId) || KENYAN_PARTIES[0];

    // Auto-fill slogan and background color when party changes
    useEffect(() => {
        if (selectedParty.defaultSlogan) {
            setSlogan(selectedParty.defaultSlogan);
        }
        if (selectedParty.hexColor) {
            setBackgroundColor(selectedParty.hexColor);
        }
    }, [selectedParty]);

    const handleModToggle = (modPrompt: string) => {
        setSelectedCampaignMods(prev => prev.includes(modPrompt) 
            ? prev.filter(p => p !== modPrompt) 
            : [...prev, modPrompt]
        );
    };

    const handleGenerateText = async () => {
        if (!manifestoPoints.trim()) {
            setError("Please enter some key topics first (e.g. 'Better Health, Jobs').");
            return;
        }
        setIsGeneratingText(true);
        setError(null);
        try {
            const polishedText = await generateManifestoText(manifestoPoints, selectedParty.fullName, candidateName || 'The Candidate');
            setManifestoPoints(polishedText);
        } catch (e) {
            console.error(e);
            setError("Failed to generate text using AI.");
        } finally {
            setIsGeneratingText(false);
        }
    };

    const handleGenerate = useCallback(async () => {
        if (!imageFile) {
            setError(`Please upload a ${mode === 'vehicle' ? 'vehicle' : 'candidate'} image.`);
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setIsSidebarOpen(false);

        let templatePrompt = selectedTemplate;
        if (mode === 'manifesto') {
            templatePrompt = selectedManifestoTemplate;
        }

        try {
            const result = await generateCampaignMaterial(
                imageFile,
                mode,
                selectedParty,
                position,
                slogan,
                mode === 'vehicle' ? wrapStyle : undefined,
                mode === 'vehicle' ? selectedCampaignMods : undefined,
                templatePrompt,
                candidateName,
                location,
                partyLogoFile || undefined,
                (mode === 'poster' || mode === 'manifesto') ? backgroundColor : undefined,
                (mode === 'poster' || mode === 'manifesto') ? backgroundOpacity : undefined,
                selectedQuality,
                mode === 'manifesto' ? manifestoPoints : undefined,
                mode === 'manifesto' ? selectedManifestoFormat : undefined
            );
            setGeneratedImage(result);
        } catch (e: unknown) {
            console.error(e);
             if (e instanceof Error && e.message.includes('Requested entity was not found.')) {
                setError('API Key validation failed. Please select your API key again.');
                setApiKeySelected(false);
            } else {
                setError('Failed to generate campaign material. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [imageFile, mode, selectedParty, position, slogan, wrapStyle, selectedCampaignMods, selectedTemplate, selectedManifestoTemplate, candidateName, location, partyLogoFile, backgroundColor, backgroundOpacity, selectedQuality, manifestoPoints, selectedManifestoFormat]);

    const partyOptions = KENYAN_PARTIES.map(p => ({ label: p.name, value: p.id }));
    const positionOptions = CAMPAIGN_POSITIONS.map(p => ({ label: p.name, value: p.value }));
    const wrapStyleOptions = CAMPAIGN_WRAP_STYLES.map(w => ({ label: w.name, value: w.value || w.name }));
    const manifestoFormatOptions = MANIFESTO_FORMATS.map(f => ({ label: f.name, value: f.prompt }));

    const shareText = `Vote for ${candidateName || 'Me'} for ${position}: "${slogan}". Proudly supporting ${selectedParty.name}!`;
    const shareTitle = `Vote for ${selectedParty.name}`;

    if (!apiKeySelected) {
        return (
            <main className="h-full flex items-center justify-center px-4 pt-20">
                <div className="max-w-md w-full bg-white/50 dark:bg-zinc-900/30 backdrop-blur-xl p-8 rounded-sm border border-zinc-200 dark:border-white/10 text-center shadow-2xl">
                    <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white font-playfair">Professional Access</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed font-light">
                        To access the high-fidelity typography engine (Gemini 3 Pro) for campaign materials, please verify your API key. This ensures specific text rendering accuracy.
                    </p>
                    <button
                        onClick={handleSelectKey}
                        className="w-full px-6 py-4 bg-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-amber-400 transition-all"
                    >
                        Connect API Key
                    </button>
                    <p className="text-xs text-zinc-500 dark:text-zinc-600 mt-6">
                        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors underline">
                            View Billing Documentation
                        </a>
                    </p>
                </div>
            </main>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-4rem)] relative overflow-hidden">
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
                border-r-0 lg:border-r border-zinc-200 dark:border-white/5
                flex flex-col z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex-shrink-0 
                bg-white dark:bg-zinc-950 h-full overflow-hidden
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
                         <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-100 dark:bg-black/40 rounded-lg border border-zinc-200 dark:border-white/5">
                            <button
                                onClick={() => setMode('poster')}
                                className={`flex items-center justify-center gap-2 py-3 rounded-md transition-all duration-300 ${mode === 'poster' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-white/5'}`}
                            >
                                <PosterIcon />
                                <span className="text-[9px] font-bold uppercase tracking-wide">Poster</span>
                            </button>
                            <button
                                onClick={() => setMode('manifesto')}
                                className={`flex items-center justify-center gap-2 py-3 rounded-md transition-all duration-300 ${mode === 'manifesto' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-white/5'}`}
                            >
                                <ManifestoIcon />
                                <span className="text-[9px] font-bold uppercase tracking-wide">Manifesto</span>
                            </button>
                            <button
                                onClick={() => setMode('vehicle')}
                                className={`flex items-center justify-center gap-2 py-3 rounded-md transition-all duration-300 ${mode === 'vehicle' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-lg' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-white/5'}`}
                            >
                                <VehicleIcon />
                                <span className="text-[9px] font-bold uppercase tracking-wide">Wrap</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                         <SimpleImageUploader
                            label={mode === 'vehicle' ? 'Vehicle Photo' : 'Candidate Photo'}
                            imageUrl={imageUrl}
                            onImageUpload={handleImageUpload}
                        />
                    </div>

                    <CollapsibleSection title="Party Identity" isOpen={true}>
                        <div className="space-y-6">
                            <DropdownSelector label="Political Party" options={partyOptions} selectedValue={selectedPartyId} onSelect={setSelectedPartyId} />
                            
                            {/* Dynamic Party Info Display */}
                            <div className="p-4 bg-zinc-100 dark:bg-black/40 rounded-sm border-l-4 border-amber-500 flex items-start gap-4 transition-all relative">
                                <div className="flex-shrink-0 mt-1">
                                    {partyLogoUrl ? (
                                        <div className="w-10 h-10 rounded-full shadow-lg border border-white/10 overflow-hidden bg-white">
                                            <img src={partyLogoUrl} alt="Custom Logo" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full shadow-lg border border-white/10" style={{ backgroundColor: selectedParty.hexColor }}></div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-zinc-900 dark:text-white text-sm font-bold tracking-wide">{selectedParty.fullName}</h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 font-medium">Symbol: <span className="text-zinc-700 dark:text-white">{selectedParty.symbol}</span></p>
                                    <p className="text-zinc-400 dark:text-zinc-500 text-[10px] mt-0.5 uppercase tracking-wider">Colors: {selectedParty.colors}</p>
                                </div>
                            </div>

                            {/* Logo Uploader */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 pl-1">Official Logo (Optional)</label>
                                <div className="flex items-center gap-4">
                                    <SimpleImageUploader 
                                        label="" 
                                        imageUrl={partyLogoUrl} 
                                        onImageUpload={handleLogoUpload} 
                                    />
                                    <p className="text-[10px] text-zinc-400 leading-tight max-w-[150px]">
                                        Upload SVG/PNG for highest accuracy. This overrides the default symbol.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Campaign Details" isOpen={true}>
                        <div className="space-y-6">
                             <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Candidate Name</label>
                                <input 
                                    type="text" 
                                    value={candidateName} 
                                    onChange={(e) => setCandidateName(e.target.value)}
                                    className="w-full input-tech rounded-sm px-4 py-3 text-sm placeholder-zinc-500 dark:placeholder-zinc-600 bg-white dark:bg-black/40"
                                    placeholder="e.g. Jane Doe (Full Name)"
                                />
                             </div>

                             <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">County / Constituency</label>
                                <input 
                                    type="text" 
                                    value={location} 
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full input-tech rounded-sm px-4 py-3 text-sm placeholder-zinc-500 dark:placeholder-zinc-600 bg-white dark:bg-black/40"
                                    placeholder="e.g. Nairobi County"
                                />
                             </div>

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

                    {mode === 'poster' && (
                        <CollapsibleSection title="Poster Design" isOpen={true}>
                            <DropdownSelector 
                                label="Design Language" 
                                optionGroups={CATEGORIZED_CAMPAIGN_TEMPLATES} 
                                selectedValue={selectedTemplate} 
                                onSelect={setSelectedTemplate} 
                                valueProp="prompt"
                            />
                        </CollapsibleSection>
                    )}

                    {mode === 'manifesto' && (
                        <CollapsibleSection title="Manifesto Agenda" isOpen={true}>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <DropdownSelector 
                                        label="Design Style" 
                                        optionGroups={CATEGORIZED_MANIFESTO_TEMPLATES} 
                                        selectedValue={selectedManifestoTemplate} 
                                        onSelect={setSelectedManifestoTemplate} 
                                        valueProp="prompt"
                                    />
                                    <DropdownSelector 
                                        label="Output Format" 
                                        options={manifestoFormatOptions}
                                        selectedValue={selectedManifestoFormat} 
                                        onSelect={setSelectedManifestoFormat}
                                        valueProp="prompt"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Key Priorities / Vision</label>
                                    <textarea 
                                        value={manifestoPoints} 
                                        onChange={(e) => setManifestoPoints(e.target.value)}
                                        className="w-full input-tech rounded-sm px-4 py-3 text-sm placeholder-zinc-500 dark:placeholder-zinc-600 bg-white dark:bg-black/40 min-h-[120px] resize-y mb-2"
                                        placeholder="e.g. Better Healthcare, Free Education, Infrastructure Development..."
                                    />
                                    <div className="flex justify-between items-center">
                                        <p className="text-[9px] text-zinc-400 pl-1">
                                            Enter topics and click 'AI Writer' to expand.
                                        </p>
                                        <button 
                                            onClick={handleGenerateText}
                                            disabled={isGeneratingText || !manifestoPoints}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 font-bold text-[10px] uppercase tracking-wider rounded-sm transition-all disabled:opacity-50 shadow-md"
                                        >
                                            <SparklesIcon className="w-3 h-3" />
                                            {isGeneratingText ? 'Writing...' : 'AI Writer'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CollapsibleSection>
                    )}

                    {(mode === 'poster' || mode === 'manifesto') && (
                        <CollapsibleSection title="Background Styling" isOpen={true}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Background Color</label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <div className="w-4 h-4 rounded-full border border-zinc-300 dark:border-white/20 shadow-sm" style={{ backgroundColor: backgroundColor }}></div>
                                            </div>
                                            <input 
                                                type="text" 
                                                value={backgroundColor} 
                                                readOnly
                                                className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-sm text-zinc-700 dark:text-zinc-300 font-mono"
                                            />
                                            <input 
                                                type="color" 
                                                value={backgroundColor} 
                                                onChange={(e) => setBackgroundColor(e.target.value)}
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Opacity / Intensity</label>
                                        <span className="text-[10px] font-mono text-amber-500">{backgroundOpacity}%</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={backgroundOpacity} 
                                        onChange={(e) => setBackgroundOpacity(parseInt(e.target.value))}
                                        className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                    />
                                    <p className="text-[9px] text-zinc-400 mt-2 pl-1">
                                        {backgroundOpacity === 100 ? 'Solid color replacement.' : 'Semi-transparent overlay blend.'}
                                    </p>
                                </div>
                            </div>
                        </CollapsibleSection>
                    )}

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

                    <CollapsibleSection title="Final Output">
                        <div className="space-y-6">
                            <QualitySelector 
                                options={QUALITY_OPTIONS} 
                                selectedQuality={selectedQuality} 
                                onSelectQuality={setSelectedQuality} 
                            />
                        </div>
                    </CollapsibleSection>
                 </div>

                 {/* Desktop Generate Button Area */}
                <div className="p-6 border-t border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-lg hidden lg:block shrink-0">
                     <button
                        onClick={handleGenerate}
                        disabled={!imageFile || isLoading}
                        className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:bg-amber-400 disabled:bg-zinc-200 dark:disabled:bg-zinc-900 disabled:text-zinc-400 dark:disabled:text-zinc-700 disabled:shadow-none transition-all btn-tech"
                    >
                        {isLoading ? 'Processing...' : (mode === 'poster' ? 'Generate Poster' : (mode === 'manifesto' ? 'Build Manifesto' : 'Generate Wrap'))}
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
