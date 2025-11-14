

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generateVideoWithVeo } from '../services/geminiService.ts';
import ImageUploader from '../components/ImageUploader.tsx';
import VideoResultDisplay from '../components/VideoResultDisplay.tsx';
import { MovieIcon } from '../components/icons/MovieIcon.tsx';
import { LandscapeIcon } from '../components/icons/LandscapeIcon.tsx';
import { PortraitIcon } from '../components/icons/PortraitIcon.tsx';
import { DownloadIcon } from '../components/icons/DownloadIcon.tsx';
import { UserPlusIcon } from '../components/icons/UserPlusIcon.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
import { downloadResource } from '../utils/fileUtils.ts';

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
    "This can take a few minutes, good things come to those who wait!",
    "Rendering the first few frames...",
    "Adding a touch of cinematic magic...",
    "The AI is working its magic, please be patient.",
    "Generating an extended video will take several minutes...",
    "Stitching video segments together...",
    "Almost there, finalizing the masterpiece...",
];

const PROMPT_SUGGESTIONS = [
    "Cinematic slow zoom",
    "Subtle breeze through hair",
    "Person gently smiles",
    "Camera pans left to right",
];

const AnimatePage: React.FC = () => {
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
                // FIX: Explicitly typing `file` as `File` to resolve type inference issue with `URL.createObjectURL`.
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
    
    // Combine main image with reference images for the service
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
        downloadResource(videoUrl, `lion-apparel-animation.mp4`);
    };

    if (!apiKeySelected) {
        return (
            <main className="container mx-auto px-4 py-8 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-white">API Key Required for Video Generation</h2>
                    <p className="text-gray-400 mb-6">
                        The Veo video generation feature requires you to select a Google AI Studio key.
                        Your key is used only for the duration of this session to make API calls.
                        Please note that charges may apply to your Google Cloud project.
                    </p>
                    <button
                        onClick={handleSelectKey}
                        className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-black font-bold rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50"
                    >
                        Select API Key
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                        For more information on billing, please visit the{' '}
                        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                            billing documentation
                        </a>.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold font-playfair mb-2 text-white">Animate Your Images</h2>
                    <p className="text-gray-400">Bring your styled photos to life. Upload an image, describe the motion, and generate a short video with Veo.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Controls */}
                    <div className="flex flex-col gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-300">1. Upload Main Image</h3>
                            {/* FIX: Pass required props to ImageUploader. isLoading is false and generatedImage is null
                                because this page handles its own video loading state and doesn't generate a new image. */}
                            <ImageUploader onImageUpload={handleImageUpload} originalImage={imageUrl} generatedImage={null} isLoading={false} />
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-300">2. Configure Animation</h3>
                            
                            {/* Reference Images */}
                            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                <h4 className="text-lg font-semibold mb-3 text-gray-300">Reference Characters (Optional)</h4>
                                <p className="text-sm text-gray-400 mb-4">Add up to 3 images to guide generation. Your main image will also be used as a reference. Aspect ratio will be locked to 16:9.</p>
                                
                                <input type="file" multiple ref={referenceFileInputRef} onChange={handleReferenceFilesChange} accept="image/*" className="hidden" />
                                <div className="flex flex-wrap items-start gap-3">
                                    {referenceImages.map(img => (
                                        <div key={img.id} className="relative group">
                                            <img src={img.url} alt="Reference" className="w-20 h-20 object-cover rounded-md" />
                                            <button 
                                                onClick={() => handleRemoveReferenceImage(img.id)}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-label="Remove image"
                                            >
                                                <CloseIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {referenceImages.length < 3 && (
                                        <button onClick={() => referenceFileInputRef.current?.click()} className="w-20 h-20 bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-md flex flex-col items-center justify-center text-gray-400 hover:border-amber-500 hover:text-white transition-colors">
                                            <UserPlusIcon className="w-8 h-8" />
                                            <span className="text-xs mt-1">Add</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Prompt */}
                             <div>
                                <label htmlFor="prompt" className="block text-lg font-semibold mb-3 text-gray-300">Prompt</label>
                                <textarea
                                    id="prompt"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g., A cinematic shot of a person looking at the camera."
                                    rows={3}
                                    className="appearance-none w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                />
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {PROMPT_SUGGESTIONS.map(suggestion => (
                                        <button 
                                            key={suggestion}
                                            onClick={() => setPrompt(suggestion)}
                                            className="px-3 py-1 text-sm bg-zinc-800 border border-zinc-700 rounded-full hover:bg-zinc-700 hover:border-amber-500 transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Settings */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-lg font-semibold mb-3 text-gray-300">Aspect Ratio</h4>
                                    <div className="flex gap-2">
                                        <button onClick={() => setAspectRatio('16:9')} disabled={isReferenceImagesUsed} className={`flex items-center justify-center gap-2 px-3 py-2 w-full rounded-md transition-colors ${finalAspectRatio === '16:9' ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-800 hover:bg-zinc-700'} ${isReferenceImagesUsed ? 'cursor-not-allowed' : ''}`}>
                                            <LandscapeIcon className="w-5 h-5" />
                                            <span>16:9</span>
                                        </button>
                                        <button onClick={() => setAspectRatio('9:16')} disabled={isReferenceImagesUsed} className={`flex items-center justify-center gap-2 px-3 py-2 w-full rounded-md transition-colors ${finalAspectRatio === '9:16' ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-800 hover:bg-zinc-700'} ${isReferenceImagesUsed ? 'cursor-not-allowed' : ''}`}>
                                            <PortraitIcon className="w-5 h-5" />
                                            <span>9:16</span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-3 text-gray-300">Video Length</h4>
                                    <div className="flex items-center justify-between bg-zinc-800 rounded-md p-2 h-full">
                                        <label htmlFor="extended-toggle" className="text-sm font-medium text-gray-300 cursor-pointer select-none">~30s (Slow)</label>
                                        <button
                                            id="extended-toggle"
                                            onClick={() => setIsExtendedLength(!isExtendedLength)}
                                            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 ${isExtendedLength ? 'bg-amber-500 focus:ring-amber-500' : 'bg-zinc-700 focus:ring-gray-500'}`}
                                            role="switch" aria-checked={isExtendedLength}
                                        >
                                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isExtendedLength ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Result */}
                    <div className="sticky top-24">
                        <h3 className="text-xl font-semibold mb-4 text-gray-300">3. View Result</h3>
                        <VideoResultDisplay videoUrl={videoUrl} isLoading={isLoading} loadingMessage={loadingMessage} />
                        <div className="mt-6 text-center space-y-4">
                            <button
                                onClick={handleGenerate}
                                disabled={(!imageFile && !isReferenceImagesUsed) || isLoading}
                                className="inline-flex items-center justify-center w-full px-8 py-4 bg-amber-500 text-black font-bold rounded-lg shadow-lg hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50"
                            >
                                <MovieIcon className="w-6 h-6 mr-3" />
                                {isLoading ? 'Animating...' : 'Generate Video'}
                            </button>
                            {videoUrl && !isLoading && (
                                <button
                                    onClick={handleDownload}
                                    className="inline-flex items-center justify-center w-full px-8 py-3 bg-zinc-800 text-amber-400 font-bold rounded-lg border border-zinc-700 hover:bg-zinc-700 hover:border-amber-500 transition-all duration-300"
                                >
                                    <DownloadIcon className="w-6 h-6 mr-3" />
                                    Download Video
                                </button>
                            )}
                            {error && <p className="text-red-400 mt-4">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AnimatePage;