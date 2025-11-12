import React, { useState, useEffect, useCallback } from 'react';
import { generateVideoWithVeo } from '../services/geminiService';
import ImageUploader from '../components/ImageUploader';
import VideoResultDisplay from '../components/VideoResultDisplay';
import { MovieIcon } from '../components/icons/MovieIcon';
import { LandscapeIcon } from '../components/icons/LandscapeIcon';
import { PortraitIcon } from '../components/icons/PortraitIcon';
import { DownloadIcon } from '../components/icons/DownloadIcon';

// FIX: To resolve the subsequent property declaration error, the AIStudio interface
// is moved inside the `declare global` block. This ensures it's part of the global
// scope and avoids type conflicts if `window.aistudio` is declared elsewhere.
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
            // Assume success to avoid race conditions, as per guidelines
            setApiKeySelected(true);
        }
    };

    const handleImageUpload = (file: File, dataUrl: string) => {
        setImageFile(file);
        setImageUrl(dataUrl);
        setVideoUrl(null);
        setError(null);
    };

    const handleGenerate = useCallback(async () => {
        if (!imageFile || !prompt) {
            setError('Please upload an image and provide a prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setVideoUrl(null);
        setLoadingMessage(LOADING_MESSAGES[0]);

        try {
            const resultUrl = await generateVideoWithVeo(imageFile, prompt, aspectRatio);
            setVideoUrl(resultUrl);
        } catch (e: any) {
            console.error(e);
            if (e.message?.includes('Requested entity was not found.')) {
                setError('API Key validation failed. Please select your API key again.');
                setApiKeySelected(false);
            } else {
                setError('Failed to generate video. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [imageFile, prompt, aspectRatio]);
    
    const handleDownload = () => {
        if (!videoUrl) return;
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = `ai-bespoke-styler-animation.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!apiKeySelected) {
        return (
            <main className="container mx-auto px-4 py-8 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-white">API Key Required for Video Generation</h2>
                    <p className="text-gray-400 mb-6">
                        The Veo video generation feature requires you to select a Google AI Studio API key.
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
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold font-playfair mb-2 text-white">Animate Your Images</h2>
                    <p className="text-gray-400">Bring your styled photos to life. Upload an image, describe the motion, and generate a short video with Veo.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Controls */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-300">1. Upload Image</h3>
                            <ImageUploader onImageUpload={handleImageUpload} originalImage={imageUrl} />
                        </div>
                        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-6">
                            <h3 className="text-xl font-semibold text-center text-gray-300">2. Describe the Animation</h3>
                            <div>
                                <label htmlFor="prompt" className="block text-lg font-semibold mb-3 text-gray-300">Prompt</label>
                                <textarea
                                    id="prompt"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g., A cinematic shot of a person looking at the camera."
                                    rows={4}
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
                             <div>
                                <h4 className="text-lg font-semibold mb-3 text-gray-300">Aspect Ratio</h4>
                                <div className="flex gap-4">
                                    <button onClick={() => setAspectRatio('16:9')} className={`flex items-center justify-center gap-2 px-4 py-2 w-full rounded-md transition-colors ${aspectRatio === '16:9' ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                                        <LandscapeIcon className="w-5 h-5" />
                                        <span>Landscape</span>
                                    </button>
                                    <button onClick={() => setAspectRatio('9:16')} className={`flex items-center justify-center gap-2 px-4 py-2 w-full rounded-md transition-colors ${aspectRatio === '9:16' ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                                        <PortraitIcon className="w-5 h-5" />
                                        <span>Portrait</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Result */}
                    <div className="sticky top-24">
                        <h3 className="text-xl font-semibold mb-4 text-gray-300">3. View Result</h3>
                        <VideoResultDisplay videoUrl={videoUrl} isLoading={isLoading} loadingMessage={loadingMessage} />
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleGenerate}
                                disabled={!imageFile || isLoading}
                                className="inline-flex items-center justify-center w-full px-8 py-4 bg-amber-500 text-black font-bold rounded-lg shadow-lg hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50"
                            >
                                <MovieIcon className="w-6 h-6 mr-3" />
                                {isLoading ? 'Animating...' : 'Generate Video'}
                            </button>
                            {videoUrl && !isLoading && (
                                <button
                                    onClick={handleDownload}
                                    className="mt-4 inline-flex items-center justify-center w-full px-8 py-3 bg-zinc-800 text-amber-400 font-bold rounded-lg border border-zinc-700 hover:bg-zinc-700 hover:border-amber-500 transition-all duration-300"
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