
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generateVideoWithVeo } from '../services/geminiService.ts';
import ImageUploader from '../components/ImageUploader.tsx';
import VideoResultDisplay from '../components/VideoResultDisplay.tsx';
import { MovieIcon } from '../components/icons/MovieIcon.tsx';
import { LandscapeIcon } from '../components/icons/LandscapeIcon.tsx';
import { PortraitIcon } from '../components/icons/PortraitIcon.tsx';
import { UserPlusIcon } from '../components/icons/UserPlusIcon.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
import { downloadResource } from '../utils/fileUtils.ts';
import { SlidersIcon } from '../components/icons/SlidersIcon.tsx';
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

const LOADING_MESSAGES = [
    "Warming up the digital cameras...",
    "Choreographing the pixels...",
    "Rendering the first few frames...",
    "Adding a touch of cinematic magic...",
    "Stitching video segments together...",
];

const PROMPT_SUGGESTIONS = [
    "Cinematic slow zoom",
    "Subtle breeze through hair",
    "Person gently smiles",
    "Camera pans left to right",
];

const AnimatePage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [apiKeySelected, setApiKeySelected] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('A gentle breeze makes the clothes and hair sway subtly, cinematic lighting.');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const [referenceImages, setReferenceImages] = useState<{ id: number; file: File; url: string; }[]>([]);
    const [isExtendedLength, setIsExtendedLength] = useState(false);
    const referenceFileInputRef = useRef<HTMLInputElement>(null);

    const checkApiKey = useCallback(async () => {
        if (window.aistudio && (await window.aistudio.hasSelectedApiKey())) {
            setApiKeySelected(true);
        }
    }, []);

    useEffect(() => {
        checkApiKey();
    }, [checkApiKey]);

    useEffect(() => {
        let interval: number;
        if (isLoading) {
            interval = window.setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = LOADING_MESSAGES.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
                    return LOADING_MESSAGES[nextIndex];
                });
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleSelectKey = async () => {
        if(window.aistudio) {
            await window.aistudio.openSelectKey();
            setApiKeySelected(true);
        }
    };

    const handleImageUpload = (file: File, dataUrl: string) => {
        setImageFile(file);
        setImageUrl(dataUrl);
        setVideoUrl(null);
        setError(null);
    };

    const handleReferenceFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files)
                .slice(0, 3 - referenceImages.length)
                .map((file: File) => ({
                    id: Date.now() + Math.random(),
                    file,
                    url: URL.createObjectURL(file)
                }));
            setReferenceImages(prev => [...prev, ...newImages]);
        }
        if (event.target) {
            event.target.value = '';
        }
    };

    const handleRemoveReferenceImage = (idToRemove: number) => {
        setReferenceImages(prev => prev.filter(img => img.id !== idToRemove));
    };

    const isReferenceImagesUsed = referenceImages.length > 0;
    const finalAspectRatio = isReferenceImagesUsed ? '16:9' : aspectRatio;
    
    const allReferenceImages = [...referenceImages.map(ref => ref.file)];
    if (isReferenceImagesUsed && imageFile) {
        allReferenceImages.unshift(imageFile);
    }
    const mainImageForService = isReferenceImagesUsed ? null : imageFile;


    const handleGenerate = useCallback(async () => {
        if ((!imageFile && !isReferenceImagesUsed) || !prompt) {
            setError('Please upload an image and provide a prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setVideoUrl(null);
        setLoadingMessage(LOADING_MESSAGES[0]);
        setIsSidebarOpen(false);

        try {
            const resultUrl = await generateVideoWithVeo(
                mainImageForService,
                prompt,
                finalAspectRatio,
                isExtendedLength,
                isReferenceImagesUsed ? allReferenceImages : []
            );
            setVideoUrl(resultUrl);
        } catch (e: unknown) {
            console.error(e);
            if (e instanceof Error && e.message.includes('Requested entity was not found.')) {
                setError('API Key validation failed. Please select your API key again.');
                setApiKeySelected(false);
            } else {
                setError('Failed to generate video. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [imageFile, prompt, finalAspectRatio, isExtendedLength, referenceImages, isReferenceImagesUsed, allReferenceImages, mainImageForService]);
    
    const handleDownload = () => {
        if (!videoUrl) return;
        downloadResource(videoUrl, `geo-studio-animation.mp4`);
    };

    if (!apiKeySelected) {
        return (
            <main className="h-full flex items-center justify-center px-4 pt-20">
                <div className="max-w-md w-full bg-white/50 dark:bg-zinc-900/30 backdrop-blur-xl p-8 rounded-sm border border-zinc-200 dark:border-white/10 text-center shadow-2xl">
                    <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white font-playfair">Access Required</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed font-light">
                        To use the Veo cinematic engine, please verify your API key. This ensures secure access to our high-compute rendering pipeline.
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
                            <MovieIcon className="w-5 h-5 text-amber-400" />
                         </div>
                         <span className="font-playfair text-xl text-zinc-900 dark:text-white font-bold tracking-wide">Motion Config</span>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(false)} 
                        className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-95 border border-black/5 dark:border-white/5"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                 {/* Scrollable Controls */}
                 <div className="flex-grow overflow-y-auto custom-scrollbar pb-32 lg:pb-0">
                    <div className="p-6 space-y-6">
                         <ImageUploader onImageUpload={handleImageUpload} originalImage={imageUrl} generatedImage={null} isLoading={false} />
                    </div>

                    <CollapsibleSection title="Reference & Context" isOpen={true}>
                         <div>
                            <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wide">Additional Frames</h4>
                            <input type="file" multiple ref={referenceFileInputRef} onChange={handleReferenceFilesChange} accept="image/*" className="hidden" />
                            <div className="flex flex-wrap items-start gap-3">
                                {referenceImages.map(img => (
                                    <div key={img.id} className="relative group">
                                        <img src={img.url} alt="Reference" className="w-16 h-16 object-cover rounded-sm border border-zinc-200 dark:border-white/10" />
                                        <button 
                                            onClick={() => handleRemoveReferenceImage(img.id)}
                                            className="absolute -top-2 -right-2 bg-red-500/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <CloseIcon className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                {referenceImages.length < 3 && (
                                    <button onClick={() => referenceFileInputRef.current?.click()} className="w-16 h-16 bg-zinc-100 dark:bg-white/5 border border-dashed border-zinc-300 dark:border-white/20 rounded-sm flex flex-col items-center justify-center text-zinc-500 hover:border-amber-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors group">
                                        <UserPlusIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Motion Prompt" isOpen={true}>
                         <div>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe the movement..."
                                rows={4}
                                className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-200 text-sm rounded-sm px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors resize-none placeholder-zinc-500 dark:placeholder-zinc-600"
                            />
                            <div className="mt-3 flex flex-wrap gap-2">
                                {PROMPT_SUGGESTIONS.map(suggestion => (
                                    <button 
                                        key={suggestion}
                                        onClick={() => setPrompt(suggestion)}
                                        className="px-3 py-1 text-[10px] uppercase tracking-wider bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-sm hover:bg-zinc-50 dark:hover:bg-white/10 hover:border-amber-500/50 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Video Settings" isOpen={true}>
                         <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wide">Format</h4>
                                <div className="flex gap-2">
                                    <button onClick={() => setAspectRatio('16:9')} disabled={isReferenceImagesUsed} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-sm transition-colors ${finalAspectRatio === '16:9' ? 'bg-white dark:bg-zinc-200 text-black shadow-lg' : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-white/10'} ${isReferenceImagesUsed ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <LandscapeIcon className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setAspectRatio('9:16')} disabled={isReferenceImagesUsed} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-sm transition-colors ${finalAspectRatio === '9:16' ? 'bg-white dark:bg-zinc-200 text-black shadow-lg' : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-white/10'} ${isReferenceImagesUsed ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <PortraitIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wide">Duration</h4>
                                <button
                                    onClick={() => setIsExtendedLength(!isExtendedLength)}
                                    className={`w-full py-3 px-3 rounded-sm border text-[10px] font-bold uppercase tracking-wider transition-all ${isExtendedLength ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 hover:border-zinc-400 dark:hover:border-white/30'}`}
                                >
                                    {isExtendedLength ? 'Extended (~30s)' : 'Standard (~5s)'}
                                </button>
                            </div>
                        </div>
                    </CollapsibleSection>
                 </div>

                  {/* Desktop Generate Button Area */}
                <div className="p-6 border-t border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-lg hidden lg:block">
                     <button
                         onClick={handleGenerate}
                         disabled={(!imageFile && !isReferenceImagesUsed) || isLoading}
                        className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:bg-amber-400 disabled:bg-zinc-200 dark:disabled:bg-zinc-900 disabled:text-zinc-400 dark:disabled:text-zinc-700 disabled:shadow-none transition-all btn-tech"
                    >
                        {isLoading ? 'Rendering...' : 'Generate Video'}
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

                 <div className="w-full max-w-4xl animate-fade-in">
                    <div className="sticky top-24 space-y-6">
                         <VideoResultDisplay videoUrl={videoUrl} isLoading={isLoading} loadingMessage={loadingMessage} />
                         
                         {videoUrl && !isLoading && (
                             <div className="flex justify-center">
                                 <button
                                     onClick={handleDownload}
                                     className="px-8 py-4 bg-transparent text-zinc-900 dark:text-white font-bold text-sm uppercase tracking-[0.2em] rounded-sm border border-zinc-300 dark:border-white/20 hover:bg-zinc-100 dark:hover:bg-white/5 hover:border-zinc-400 dark:hover:border-white transition-all"
                                 >
                                     Download MP4
                                 </button>
                             </div>
                         )}
                         {!videoUrl && !isLoading && (
                             <div className="text-center mt-8 opacity-50">
                                <MovieIcon className="w-16 h-16 mx-auto text-zinc-700 dark:text-zinc-700 mb-4" />
                                <p className="text-zinc-500 text-sm uppercase tracking-widest">Configure motion settings to begin</p>
                             </div>
                        )}
                     </div>
                 </div>
             </div>

             {/* Mobile Sticky Bottom Action Bar */}
             <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-white/5 z-50">
                 <button
                    onClick={handleGenerate}
                    disabled={(!imageFile && !isReferenceImagesUsed) || isLoading}
                    className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-lg disabled:opacity-50 btn-tech"
                >
                    {isLoading ? 'Rendering...' : 'Generate Video'}
                </button>
                {error && <p className="text-red-500 dark:text-red-400 mt-2 text-center text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default AnimatePage;
