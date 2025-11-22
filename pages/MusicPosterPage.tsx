
import React, { useState, useCallback } from 'react';
import SimpleImageUploader from '../components/SimpleImageUploader.tsx';
import ResultDisplay from '../components/ResultDisplay.tsx';
import DropdownSelector from '../components/DropdownSelector.tsx';
import { POSTER_POSES, POSTER_ASPECT_RATIOS, POSTER_BACKGROUND_OPTIONS, POSTER_LIGHTING_OPTIONS, POSTER_DISTANCE_OPTIONS, POSTER_INDIVIDUAL_POSTURES, POSTER_FONT_OPTIONS, POSTER_ICON_OPTIONS } from '../constants.ts';
import { generateMusicPoster } from '../services/geminiService.ts';
import { LockClosedIcon } from '../components/icons/LockClosedIcon.tsx';
import { SlidersIcon } from '../components/icons/SlidersIcon.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
import { MusicIcon } from '../components/icons/MusicIcon.tsx';
import CollapsibleSection from '../components/CollapsibleSection.tsx';

const MusicPosterPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [artist1File, setArtist1File] = useState<File | null>(null);
    const [artist1Url, setArtist1Url] = useState<string | null>(null);
    const [artist2File, setArtist2File] = useState<File | null>(null);
    const [artist2Url, setArtist2Url] = useState<string | null>(null);

    const [musicTitle, setMusicTitle] = useState<string>('');
    const [artistNames, setArtistNames] = useState<string>('');
    const [selectedPose, setSelectedPose] = useState<string>(POSTER_POSES[0].prompt);
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>(POSTER_ASPECT_RATIOS[0].value);
    const [selectedBackground, setSelectedBackground] = useState<string>(POSTER_BACKGROUND_OPTIONS[0].prompt);
    const [selectedLighting, setSelectedLighting] = useState<string>(POSTER_LIGHTING_OPTIONS[0].prompt);
    const [studioBackgroundColor, setStudioBackgroundColor] = useState<string>('#1E1B18');
    const [selectedDistance, setSelectedDistance] = useState<string>(POSTER_DISTANCE_OPTIONS[0].prompt);
    const [selectedPosture, setSelectedPosture] = useState<string>(POSTER_INDIVIDUAL_POSTURES[0].prompt);
    const [selectedFont, setSelectedFont] = useState<string>(POSTER_FONT_OPTIONS[0].prompt);
    const [selectedIcon, setSelectedIcon] = useState<string>(POSTER_ICON_OPTIONS[0].prompt);


    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleArtist1Upload = (file: File, dataUrl: string) => {
        setArtist1File(file);
        setArtist1Url(dataUrl);
    };

    const handleArtist2Upload = (file: File, dataUrl: string) => {
        setArtist2File(file);
        setArtist2Url(dataUrl);
    };

    const handleGenerate = useCallback(async () => {
        if (!artist1File || !artist2File) {
            setError('Please upload an image for both artists.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setIsSidebarOpen(false);

        const finalBackgroundPrompt = selectedBackground.includes('hex color') 
            ? `${selectedBackground}${studioBackgroundColor}` 
            : selectedBackground;
        
        const poseDetailParts = [];
        if (selectedDistance && selectedDistance !== POSTER_DISTANCE_OPTIONS[0].prompt) {
            poseDetailParts.push(selectedDistance);
        }
        if (selectedPosture && selectedPosture !== POSTER_INDIVIDUAL_POSTURES[0].prompt) {
            poseDetailParts.push(selectedPosture);
        }
        const poseDetails = poseDetailParts.join(' ');

        try {
            const result = await generateMusicPoster(
                artist1File, 
                artist2File, 
                selectedPose, 
                selectedAspectRatio,
                musicTitle,
                artistNames,
                finalBackgroundPrompt,
                selectedLighting,
                poseDetails,
                selectedFont,
                selectedIcon
            );
            setGeneratedImage(result);
        } catch (e) {
            console.error(e);
            setError('Failed to generate poster. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [artist1File, artist2File, selectedPose, selectedAspectRatio, musicTitle, artistNames, selectedBackground, selectedLighting, studioBackgroundColor, selectedDistance, selectedPosture, selectedFont, selectedIcon]);

    const poseOptions = POSTER_POSES.map(p => ({ label: p.name, value: p.prompt }));
    const backgroundOptions = POSTER_BACKGROUND_OPTIONS.map(b => ({ label: b.name, value: b.prompt }));
    const lightingOptions = POSTER_LIGHTING_OPTIONS.map(l => ({ label: l.name, value: l.prompt }));
    const distanceOptions = POSTER_DISTANCE_OPTIONS.map(d => ({ label: d.name, value: d.prompt }));
    const postureOptions = POSTER_INDIVIDUAL_POSTURES.map(p => ({ label: p.name, value: p.prompt }));
    const fontOptions = POSTER_FONT_OPTIONS.map(f => ({ label: f.name, value: f.prompt }));
    const iconOptions = POSTER_ICON_OPTIONS.map(i => ({ label: i.name, value: i.prompt }));

    const shareText = `New Single Alert: "${musicTitle}" by ${artistNames}. Check out the official art created with Lion's Apparel AI!`;

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
                border-r-0 lg:border-r border-zinc-200 dark:border-white/5
                flex flex-col z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex-shrink-0 
                bg-white dark:bg-zinc-950/90 backdrop-blur-xl
            `}>
                 {/* Mobile Sidebar Header */}
                 <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-white/5 lg:hidden bg-white dark:bg-zinc-950/80 backdrop-blur-md relative z-20 shadow-2xl">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                            <MusicIcon className="w-5 h-5 text-amber-400" />
                         </div>
                         <span className="font-playfair text-xl text-zinc-900 dark:text-white font-bold tracking-wide">Poster Config</span>
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
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <SimpleImageUploader
                                label="Subject A"
                                imageUrl={artist1Url}
                                onImageUpload={handleArtist1Upload}
                            />
                            <SimpleImageUploader
                                label="Subject B"
                                imageUrl={artist2Url}
                                onImageUpload={handleArtist2Upload}
                            />
                        </div>
                        
                        <div className="px-4 py-3 bg-amber-500/5 border border-amber-500/20 rounded-sm flex items-center gap-3 justify-center">
                            <LockClosedIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em]">Identity Lock Active</h3>
                            </div>
                        </div>
                    </div>

                     <CollapsibleSection title="Typography" isOpen={true}>
                        <div className="space-y-6">
                             <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wide">Title Text</label>
                                <input type="text" value={musicTitle} onChange={(e) => setMusicTitle(e.target.value)} placeholder="Title..." className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white rounded-sm px-4 py-3 focus:border-amber-500 focus:outline-none text-sm placeholder-zinc-500 dark:placeholder-zinc-700 transition-colors"/>
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wide">Subtitle</label>
                                <input type="text" value={artistNames} onChange={(e) => setArtistNames(e.target.value)} placeholder="Names..." className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white rounded-sm px-4 py-3 focus:border-amber-500 focus:outline-none text-sm placeholder-zinc-500 dark:placeholder-zinc-700 transition-colors"/>
                            </div>
                            <DropdownSelector label="Font Style" options={fontOptions} selectedValue={selectedFont} onSelect={setSelectedFont} />
                            <DropdownSelector label="Sticker" options={iconOptions} selectedValue={selectedIcon} onSelect={setSelectedIcon} />
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Composition" isOpen={true}>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <DropdownSelector label="Main Pose" options={poseOptions} selectedValue={selectedPose} onSelect={setSelectedPose} />
                                <DropdownSelector label="Distance" options={distanceOptions} selectedValue={selectedDistance} onSelect={setSelectedDistance} />
                            </div>
                            <DropdownSelector label="Posture" options={postureOptions} selectedValue={selectedPosture} onSelect={setSelectedPosture} />
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Atmosphere" isOpen={true}>
                        <div className="space-y-6">
                            <DropdownSelector label="Background" options={backgroundOptions} selectedValue={selectedBackground} onSelect={setSelectedBackground} />
                            <DropdownSelector label="Lighting" options={lightingOptions} selectedValue={selectedLighting} onSelect={setSelectedLighting} />
                             {selectedBackground.includes('hex color') && (
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wide">Studio Hex</label>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={studioBackgroundColor} onChange={(e) => setStudioBackgroundColor(e.target.value)} className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"/>
                                        <span className="text-xs text-zinc-400 font-mono">{studioBackgroundColor}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Output Settings">
                         <div>
                            <h4 className="block text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wide">Aspect Ratio</h4>
                            <div className="flex flex-wrap gap-2">
                            {POSTER_ASPECT_RATIOS.map(ratio => (
                                <button
                                    key={ratio.value}
                                    onClick={() => setSelectedAspectRatio(ratio.value)}
                                    className={`flex-1 px-2 py-2 text-[10px] font-bold uppercase tracking-wider rounded-sm border transition-all ${
                                        selectedAspectRatio === ratio.value
                                        ? 'bg-white dark:bg-zinc-200 text-black border-white shadow-lg'
                                        : 'bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300'
                                    }`}
                                >
                                    {ratio.name}
                                </button>
                            ))}
                            </div>
                        </div>
                    </CollapsibleSection>
                </div>
                
                {/* Desktop Generate Button Area */}
                <div className="p-6 border-t border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-lg hidden lg:block">
                     <button
                        onClick={handleGenerate}
                        disabled={!artist1File || !artist2File || isLoading}
                        className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:bg-amber-400 disabled:bg-zinc-200 dark:disabled:bg-zinc-900 disabled:text-zinc-400 dark:disabled:text-zinc-700 disabled:shadow-none transition-all btn-tech"
                    >
                        {isLoading ? 'Compositing...' : 'Generate Poster'}
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
                        shareTitle="New Music Poster"
                    />
                    {!generatedImage && !isLoading && (
                         <div className="text-center mt-8 opacity-50">
                            <MusicIcon className="w-16 h-16 mx-auto text-zinc-700 dark:text-zinc-700 mb-4" />
                            <p className="text-zinc-500 text-sm uppercase tracking-widest">Configure poster composition to begin</p>
                         </div>
                    )}
                 </div>
            </div>

             {/* Mobile Sticky Bottom Action Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-white/5 z-50">
                 <button
                    onClick={handleGenerate}
                    disabled={!artist1File || !artist2File || isLoading}
                    className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-lg disabled:opacity-50 btn-tech"
                >
                    {isLoading ? 'Processing...' : 'Generate Poster'}
                </button>
                {error && <p className="text-red-500 dark:text-red-400 mt-2 text-center text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default MusicPosterPage;
