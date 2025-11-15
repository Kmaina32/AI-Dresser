import React, { useState, useCallback } from 'react';
import SimpleImageUploader from '../components/SimpleImageUploader.tsx';
import ResultDisplay from '../components/ResultDisplay.tsx';
import DropdownSelector from '../components/DropdownSelector.tsx';
import { POSTER_POSES, POSTER_ASPECT_RATIOS, POSTER_BACKGROUND_OPTIONS, POSTER_LIGHTING_OPTIONS, POSTER_DISTANCE_OPTIONS, POSTER_INDIVIDUAL_POSTURES, POSTER_FONT_OPTIONS, POSTER_ICON_OPTIONS } from '../constants.ts';
import { generateMusicPoster } from '../services/geminiService.ts';
import { SparklesIcon } from '../components/icons/SparklesIcon.tsx';
import { LockClosedIcon } from '../components/icons/LockClosedIcon.tsx';

const MusicPosterPage: React.FC = () => {
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

        const finalBackgroundPrompt = selectedBackground.includes('hex color') 
            ? `${selectedBackground}${studioBackgroundColor}` 
            : selectedBackground;
        
        // --- NEW CONTEXT-AWARE PROMPT LOGIC ---
        const poseDetailParts = [];
        if (selectedDistance && selectedDistance !== POSTER_DISTANCE_OPTIONS[0].prompt) {
            poseDetailParts.push(selectedDistance);
        }
        if (selectedPosture && selectedPosture !== POSTER_INDIVIDUAL_POSTURES[0].prompt) {
            poseDetailParts.push(selectedPosture);
        }
        const poseDetails = poseDetailParts.join(' ');
        // --- END ---

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

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold font-playfair mb-2 text-white">Music Poster Creator</h2>
                    <p className="text-gray-400">Create concept art for dream collaborations. Upload two artists, choose a pose, and generate a poster.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Controls */}
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <SimpleImageUploader
                                label="Artist 1"
                                imageUrl={artist1Url}
                                onImageUpload={handleArtist1Upload}
                            />
                             <SimpleImageUploader
                                label="Artist 2"
                                imageUrl={artist2Url}
                                onImageUpload={handleArtist2Upload}
                            />
                        </div>
                        
                        <div className="p-4 bg-zinc-900/50 rounded-lg border border-amber-500/30 flex items-center gap-4">
                            <LockClosedIcon className="w-8 h-8 text-amber-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-white">Identity Preservation Enabled</h3>
                                <p className="text-sm text-gray-400">Artist faces and body physiques are automatically preserved to ensure a realistic, high-quality result.</p>
                            </div>
                        </div>


                        <div className="space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-xl font-semibold text-white -mb-2">Fine-Tune Poster</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="music-title" className="block text-sm font-medium mb-2 text-gray-300">Music Title (Optional)</label>
                                    <input id="music-title" type="text" value={musicTitle} onChange={(e) => setMusicTitle(e.target.value)} placeholder="e.g., 'Midnight Echoes'" className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"/>
                                </div>
                                 <div>
                                    <label htmlFor="artist-names" className="block text-sm font-medium mb-2 text-gray-300">Artist Names (Optional)</label>
                                    <input id="artist-names" type="text" value={artistNames} onChange={(e) => setArtistNames(e.target.value)} placeholder="e.g., 'Leo & The Void'" className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"/>
                                </div>
                             </div>
                             <DropdownSelector
                                label="Font Style"
                                options={fontOptions}
                                selectedValue={selectedFont}
                                onSelect={setSelectedFont}
                                isCentered={false}
                            />
                             <DropdownSelector
                                label="Main Pose"
                                options={poseOptions}
                                selectedValue={selectedPose}
                                onSelect={setSelectedPose}
                                isCentered={false}
                            />
                             <DropdownSelector
                                label="Artist Distance"
                                options={distanceOptions}
                                selectedValue={selectedDistance}
                                onSelect={setSelectedDistance}
                                isCentered={false}
                            />
                            <DropdownSelector
                                label="Individual Posture"
                                options={postureOptions}
                                selectedValue={selectedPosture}
                                onSelect={setSelectedPosture}
                                isCentered={false}
                            />
                             <DropdownSelector
                                label="Background"
                                options={backgroundOptions}
                                selectedValue={selectedBackground}
                                onSelect={setSelectedBackground}
                                isCentered={false}
                            />
                            {selectedBackground.includes('hex color') && (
                                <div className="pl-4 border-l-2 border-zinc-700">
                                    <label htmlFor="studio-color" className="block text-sm font-medium mb-2 text-gray-300">Studio Background Color</label>
                                    <div className="relative w-full h-10 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center px-2">
                                        <input
                                            id="studio-color"
                                            type="color"
                                            value={studioBackgroundColor}
                                            onChange={(e) => setStudioBackgroundColor(e.target.value)}
                                            className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                                            aria-label="Choose custom background color"
                                        />
                                        <span className="ml-3 text-white">{studioBackgroundColor.toUpperCase()}</span>
                                    </div>
                                </div>
                            )}
                             <DropdownSelector
                                label="Lighting"
                                options={lightingOptions}
                                selectedValue={selectedLighting}
                                onSelect={setSelectedLighting}
                                isCentered={false}
                            />
                             <DropdownSelector
                                label="Icon / Sticker (Optional)"
                                options={iconOptions}
                                selectedValue={selectedIcon}
                                onSelect={setSelectedIcon}
                                isCentered={false}
                            />
                             <div>
                                <h4 className="block text-lg font-semibold mb-2 text-gray-300">Aspect Ratio</h4>
                                <div className="flex flex-wrap gap-2">
                                {POSTER_ASPECT_RATIOS.map(ratio => (
                                    <button
                                        key={ratio.value}
                                        onClick={() => setSelectedAspectRatio(ratio.value)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-md border-2 transition-colors ${
                                            selectedAspectRatio === ratio.value
                                            ? 'bg-amber-500 text-black border-amber-500'
                                            : 'bg-zinc-800 text-gray-300 border-zinc-700 hover:border-amber-400'
                                        }`}
                                    >
                                        {ratio.name} ({ratio.value.split('-')[0]})
                                    </button>
                                ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                             <button
                                onClick={handleGenerate}
                                disabled={!artist1File || !artist2File || isLoading}
                                className="inline-flex items-center justify-center w-full px-8 py-4 bg-amber-500 text-black font-bold rounded-lg shadow-lg hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                <SparklesIcon className="w-6 h-6 mr-3" />
                                {isLoading ? 'Creating Poster...' : 'Generate Poster'}
                            </button>
                            {error && <p className="text-red-400 mt-2 text-center text-sm">{error}</p>}
                        </div>

                    </div>

                    {/* Right Column: Result */}
                    <div className="sticky top-24">
                         <ResultDisplay
                            originalImage={null}
                            generatedImage={generatedImage}
                            isLoading={isLoading}
                            showBeforeAfterToggle={false}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MusicPosterPage;
