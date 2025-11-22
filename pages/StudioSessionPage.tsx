
import React, { useState, useCallback } from 'react';
import SimpleImageUploader from '../components/SimpleImageUploader.tsx';
import ResultDisplay from '../components/ResultDisplay.tsx';
import DropdownSelector from '../components/DropdownSelector.tsx';
import { STUDIO_SCENARIOS, STUDIO_POSES, APPAREL_BACKGROUNDS, APPAREL_LIGHTING, POSTER_ASPECT_RATIOS } from '../constants.ts';
import { generateStudioSession } from '../services/geminiService.ts';
import { LockClosedIcon } from '../components/icons/LockClosedIcon.tsx';
import { UsersIcon } from '../components/icons/UsersIcon.tsx';
import { SlidersIcon } from '../components/icons/SlidersIcon.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
import CollapsibleSection from '../components/CollapsibleSection.tsx';

const StudioSessionPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [person1File, setPerson1File] = useState<File | null>(null);
    const [person1Url, setPerson1Url] = useState<string | null>(null);
    const [person2File, setPerson2File] = useState<File | null>(null);
    const [person2Url, setPerson2Url] = useState<string | null>(null);

    const [selectedScenario, setSelectedScenario] = useState<string>(STUDIO_SCENARIOS[0].prompt);
    const [selectedPose, setSelectedPose] = useState<string>(STUDIO_POSES[0].prompt);
    const [selectedBackground, setSelectedBackground] = useState<string>(APPAREL_BACKGROUNDS[0].prompt);
    const [selectedLighting, setSelectedLighting] = useState<string>(APPAREL_LIGHTING[0].prompt);
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>(POSTER_ASPECT_RATIOS[2].value); // Default to Landscape

    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handlePerson1Upload = (file: File, dataUrl: string) => {
        setPerson1File(file);
        setPerson1Url(dataUrl);
    };

    const handlePerson2Upload = (file: File, dataUrl: string) => {
        setPerson2File(file);
        setPerson2Url(dataUrl);
    };

    const handleGenerate = useCallback(async () => {
        if (!person1File || !person2File) {
            setError('Please upload images for both people.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setIsSidebarOpen(false);

        try {
            const result = await generateStudioSession(
                person1File,
                person2File,
                selectedScenario,
                selectedPose,
                selectedBackground,
                selectedLighting,
                selectedAspectRatio
            );
            setGeneratedImage(result);
        } catch (e) {
            console.error(e);
            setError('Failed to generate studio session. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [person1File, person2File, selectedScenario, selectedPose, selectedBackground, selectedLighting, selectedAspectRatio]);

    const scenarioOptions = STUDIO_SCENARIOS.map(s => ({ label: s.name, value: s.prompt }));
    const poseOptions = STUDIO_POSES.map(p => ({ label: p.name, value: p.prompt }));
    const backgroundOptions = APPAREL_BACKGROUNDS.map(b => ({ label: b.name, value: b.prompt }));
    const lightingOptions = APPAREL_LIGHTING.map(l => ({ label: l.name, value: l.prompt }));

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
                            <UsersIcon className="w-5 h-5 text-amber-400" />
                         </div>
                         <span className="font-playfair text-xl text-zinc-900 dark:text-white font-bold tracking-wide">Session Setup</span>
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
                                label="Person A"
                                imageUrl={person1Url}
                                onImageUpload={handlePerson1Upload}
                            />
                                <SimpleImageUploader
                                label="Person B"
                                imageUrl={person2Url}
                                onImageUpload={handlePerson2Upload}
                            />
                        </div>
                        
                        <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-900/50 border border-amber-500/30 rounded-sm flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <LockClosedIcon className="w-4 h-4 text-amber-400" />
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Identity & Physique Lock</span>
                            </div>
                            <p className="text-[10px] text-zinc-600 dark:text-zinc-500 pl-6">AI is instructed to strictly maintain facial features and body build.</p>
                        </div>
                    </div>

                    <CollapsibleSection title="Scene Composition" isOpen={true}>
                         <div className="grid grid-cols-1 gap-6">
                                <DropdownSelector label="Scenario" options={scenarioOptions} selectedValue={selectedScenario} onSelect={setSelectedScenario} />
                                <DropdownSelector label="Pose / Action" options={poseOptions} selectedValue={selectedPose} onSelect={setSelectedPose} />
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Environment" isOpen={true}>
                        <div className="space-y-6">
                            <DropdownSelector label="Environment" options={backgroundOptions} selectedValue={selectedBackground} onSelect={setSelectedBackground} />
                            <DropdownSelector label="Lighting" options={lightingOptions} selectedValue={selectedLighting} onSelect={setSelectedLighting} />
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
                        disabled={!person1File || !person2File || isLoading}
                        className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:bg-amber-400 disabled:bg-zinc-200 dark:disabled:bg-zinc-900 disabled:text-zinc-400 dark:disabled:text-zinc-700 disabled:shadow-none transition-all btn-tech"
                    >
                        {isLoading ? 'Processing Session...' : 'Generate Photo'}
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
                        shareText="Check out this studio session created with Lion's Apparel AI!"
                        shareTitle="My Studio Session"
                    />
                    {!generatedImage && !isLoading && (
                         <div className="text-center mt-8 opacity-50">
                            <UsersIcon className="w-16 h-16 mx-auto text-zinc-700 dark:text-zinc-700 mb-4" />
                            <p className="text-zinc-500 text-sm uppercase tracking-widest">Setup your studio session to begin</p>
                         </div>
                    )}
                 </div>
            </div>

            {/* Mobile Sticky Bottom Action Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-white/5 z-50">
                 <button
                    onClick={handleGenerate}
                    disabled={!person1File || !person2File || isLoading}
                    className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-lg disabled:opacity-50 btn-tech"
                >
                    {isLoading ? 'Processing...' : 'Generate Photo'}
                </button>
                {error && <p className="text-red-500 dark:text-red-400 mt-2 text-center text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default StudioSessionPage;
