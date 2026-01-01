import React, { useState, useCallback } from 'react';
import SimpleImageUploader from '../components/SimpleImageUploader.tsx';
import ResultDisplay from '../components/ResultDisplay.tsx';
import DropdownSelector from '../components/DropdownSelector.tsx';
import { ARCHITECT_STYLES, ARCHITECT_VIEW_TYPES, ARCHITECT_SCALES } from '../constants/architect.ts';
import { generateArchitecturalDesign } from '../services/geminiService.ts';
import { BuildingIcon } from '../components/icons/BuildingIcon.tsx';
import { SlidersIcon } from '../components/icons/SlidersIcon.tsx';
import { CloseIcon } from '../components/icons/CloseIcon.tsx';
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

interface GeneratedAsset {
    id: string;
    url: string;
    label: string;
}

const ArchitectPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const [landWidth, setLandWidth] = useState<string>('20');
    const [landLength, setLandLength] = useState<string>('30');
    const [sqm, setSqm] = useState<string>('250');
    const [floors, setFloors] = useState<string>('2');
    
    const [selectedStyle, setSelectedStyle] = useState<string>(ARCHITECT_STYLES[0].value);
    const [selectedView, setSelectedView] = useState<string>(ARCHITECT_VIEW_TYPES[0].value);
    const [selectedScale, setSelectedScale] = useState<string>(ARCHITECT_SCALES[1].value); 
    const [requirements, setRequirements] = useState<string>('');
    
    const [generationMode, setGenerationMode] = useState<'single' | 'set'>('single');
    const [variations, setVariations] = useState<number>(1);

    const [sketchFile, setSketchFile] = useState<File | null>(null);
    const [sketchUrl, setSketchUrl] = useState<string | null>(null);

    const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSketchUpload = (file: File, dataUrl: string) => {
        setSketchFile(file);
        setSketchUrl(dataUrl);
        setGeneratedAssets([]);
    };

    const handleGenerate = useCallback(async () => {
        if (!landWidth || !landLength || !sqm) {
            setError('Please fill in the project dimensions.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedAssets([]);
        setIsSidebarOpen(false);

        if (!sketchFile && window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
             await window.aistudio.openSelectKey();
        }

        try {
            const requests: Promise<{ url: string, label: string }>[] = [];

            if (generationMode === 'set') {
                const viewsToGenerate = [
                    { label: 'Front Elevation', view: 'Front Elevation' },
                    { label: 'Back Elevation', view: 'Back Elevation' },
                    { label: 'Left Elevation', view: 'Left Elevation' },
                    { label: 'Right Elevation', view: 'Right Elevation' },
                    { label: 'Roof Plan (Top)', view: 'Top Elevation (Roof Plan)' },
                    { label: 'Floor Plan', view: 'Architectural Floor Plan' },
                ];

                viewsToGenerate.forEach(v => {
                    requests.push(
                        generateArchitecturalDesign(
                            landWidth, landLength, sqm, floors, selectedStyle, 
                            v.view, requirements, selectedScale, sketchFile || undefined
                        ).then(url => ({ url, label: v.label }))
                    );
                });

            } else {
                for (let i = 0; i < variations; i++) {
                    const viewLabel = ARCHITECT_VIEW_TYPES.find(v => v.value === selectedView)?.name || "View";
                    const label = variations > 1 ? `${viewLabel} (Option ${i+1})` : viewLabel;
                    
                    requests.push(
                        generateArchitecturalDesign(
                            landWidth, landLength, sqm, floors, selectedStyle, 
                            selectedView, requirements, selectedScale, sketchFile || undefined
                        ).then(url => ({ url, label }))
                    );
                }
            }

            const results = await Promise.all(requests);
            
            const newAssets = results.map((res, idx) => ({
                id: `gen-${Date.now()}-${idx}`,
                url: res.url,
                label: res.label
            }));
            
            setGeneratedAssets(newAssets);

        } catch (e) {
            console.error(e);
            setError('Failed to generate design. ' + (e as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [landWidth, landLength, sqm, floors, selectedStyle, selectedView, requirements, selectedScale, sketchFile, generationMode, variations]);

    const styleOptions = ARCHITECT_STYLES.map(s => ({ label: s.name, value: s.value }));
    const viewOptions = ARCHITECT_VIEW_TYPES.map(v => ({ label: v.name, value: v.value }));
    const scaleOptions = ARCHITECT_SCALES.map(s => ({ label: s.name, value: s.value }));

    return (
        <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-4rem)] relative overflow-hidden">
             {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden" 
                />
            )}

            <div className={`
                fixed inset-0 lg:relative lg:inset-auto
                w-full sm:w-[420px] lg:w-[420px]
                border-r-0 lg:border-r border-zinc-200 dark:border-white/5
                flex flex-col z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex-shrink-0 
                bg-white dark:bg-zinc-950 h-full overflow-hidden
            `}>
                 <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-white/5 lg:hidden bg-white dark:bg-zinc-950/80 backdrop-blur-md relative z-20 shadow-2xl">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                            <BuildingIcon className="w-5 h-5 text-amber-400" />
                         </div>
                         <span className="font-playfair text-xl text-zinc-900 dark:text-white font-bold tracking-wide">Blueprint Engine</span>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(false)} 
                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-95 border border-black/5 dark:border-white/5"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar pb-32 lg:pb-0">
                    <CollapsibleSection title="Land & Specs" isOpen={true}>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Width (m)</label>
                                    <input type="number" value={landWidth} onChange={(e) => setLandWidth(e.target.value)} className="w-full input-tech rounded-sm px-4 py-3 text-sm bg-white dark:bg-black/40" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Length (m)</label>
                                    <input type="number" value={landLength} onChange={(e) => setLandLength(e.target.value)} className="w-full input-tech rounded-sm px-4 py-3 text-sm bg-white dark:bg-black/40" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Area (SQM)</label>
                                    <input type="number" value={sqm} onChange={(e) => setSqm(e.target.value)} className="w-full input-tech rounded-sm px-4 py-3 text-sm bg-white dark:bg-black/40" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Floors</label>
                                    <input type="number" value={floors} onChange={(e) => setFloors(e.target.value)} className="w-full input-tech rounded-sm px-4 py-3 text-sm bg-white dark:bg-black/40" />
                                </div>
                            </div>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Design Mode" isOpen={true}>
                        <div className="space-y-6">
                            <div className="p-1 bg-zinc-100 dark:bg-black/40 rounded-lg border border-zinc-200 dark:border-white/5 flex">
                                <button 
                                    onClick={() => setGenerationMode('single')}
                                    className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${generationMode === 'single' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500'}`}
                                >
                                    Single View
                                </button>
                                <button 
                                    onClick={() => setGenerationMode('set')}
                                    className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${generationMode === 'set' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500'}`}
                                >
                                    Project Set
                                </button>
                            </div>

                            {generationMode === 'single' ? (
                                <>
                                    <DropdownSelector label="View Type" options={viewOptions} selectedValue={selectedView} onSelect={setSelectedView} />
                                    <div>
                                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Variations</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4].map(num => (
                                                <button
                                                    key={num}
                                                    onClick={() => setVariations(num)}
                                                    className={`flex-1 py-2 text-xs font-bold border rounded-sm transition-all ${variations === num ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-500'}`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-sm">
                                    <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium leading-relaxed">
                                        Generating a full consistent set: <br/>
                                        • Front, Back, Left, Right Elevations <br/>
                                        • Roof Plan & Floor Plan
                                    </p>
                                </div>
                            )}
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Style & Context" isOpen={true}>
                        <div className="space-y-6">
                            <DropdownSelector label="Architectural Style" options={styleOptions} selectedValue={selectedStyle} onSelect={setSelectedStyle} />
                            <DropdownSelector label="Target Scale" options={scaleOptions} selectedValue={selectedScale} onSelect={setSelectedScale} />
                            
                            <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Contextual Requirements</label>
                                <textarea 
                                    value={requirements} 
                                    onChange={(e) => setRequirements(e.target.value)}
                                    className="w-full input-tech rounded-sm px-4 py-3 text-sm placeholder-zinc-500 dark:placeholder-zinc-600 bg-white dark:bg-black/40 min-h-[100px] resize-y"
                                    placeholder="E.g. Large south-facing windows, open plan kitchen, infinity pool, sustainable materials..."
                                />
                            </div>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Sketch (Optional)">
                        <div className="space-y-4">
                            <p className="text-[10px] text-zinc-400 pl-1 leading-relaxed">
                                Upload a rough doodle or existing site plan to guide the generation. If left empty, AI generates from scratch.
                            </p>
                            <SimpleImageUploader 
                                label="Site Plan / Sketch" 
                                imageUrl={sketchUrl} 
                                onImageUpload={handleSketchUpload} 
                            />
                        </div>
                    </CollapsibleSection>
                </div>
                
                <div className="p-6 border-t border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-lg hidden lg:block shrink-0">
                     <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:bg-amber-400 disabled:bg-zinc-200 dark:disabled:bg-zinc-900 disabled:text-zinc-400 dark:disabled:text-zinc-700 disabled:shadow-none transition-all btn-tech"
                    >
                        {isLoading ? 'Architecting...' : 'Generate Blueprint'}
                    </button>
                    {error && <p className="text-red-500 dark:text-red-400 mt-3 text-center text-[10px] uppercase tracking-wide border border-red-500/20 bg-red-500/5 py-2 rounded-sm">{error}</p>}
                </div>
            </div>

             <div className="flex-grow h-full relative overflow-y-auto custom-scrollbar flex flex-col items-center justify-start pt-12 pb-32 px-4 md:px-12 lg:py-12 z-0">
                 <div className="lg:hidden absolute top-6 right-6 z-20">
                     <button onClick={() => setIsSidebarOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/60 backdrop-blur-xl text-zinc-900 dark:text-white rounded-full border border-zinc-200 dark:border-white/10 shadow-xl hover:border-amber-400/50 transition-all active:scale-95">
                         <SlidersIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                         <span className="text-[10px] font-bold uppercase tracking-wide">Specs</span>
                     </button>
                 </div>

                 <div className="w-full max-w-6xl animate-fade-in pb-20">
                     {generatedAssets.length > 0 ? (
                         <div className={`grid gap-8 ${generatedAssets.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                             {generatedAssets.map((asset) => (
                                 <div key={asset.id} className="space-y-3">
                                     <div className="flex justify-between items-center px-1">
                                         <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{asset.label}</h3>
                                     </div>
                                     <ResultDisplay
                                        originalImage={sketchUrl}
                                        generatedImage={asset.url}
                                        isLoading={false}
                                        showBeforeAfterToggle={!!sketchUrl && generatedAssets.length === 1}
                                        shareText={`Check out this ${asset.label} from Geo Studio!`}
                                        shareTitle={asset.label}
                                    />
                                 </div>
                             ))}
                         </div>
                     ) : (
                         <div className="max-w-4xl mx-auto">
                            <ResultDisplay
                                originalImage={sketchUrl}
                                generatedImage={null}
                                isLoading={isLoading}
                                showBeforeAfterToggle={!!sketchUrl}
                                shareText=""
                                shareTitle=""
                            />
                            {!isLoading && (
                                <div className="text-center mt-8 opacity-50">
                                    <BuildingIcon className="w-16 h-16 mx-auto text-zinc-700 dark:text-zinc-700 mb-4" />
                                    <p className="text-zinc-500 text-sm uppercase tracking-widest">Enter project specs to generate</p>
                                </div>
                            )}
                         </div>
                     )}
                 </div>
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-white/5 z-50">
                 <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full px-8 py-4 bg-amber-500 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-lg disabled:opacity-50 btn-tech"
                >
                    {isLoading ? 'Processing...' : 'Generate'}
                </button>
                {error && <p className="text-red-500 dark:text-red-400 mt-2 text-center text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default ArchitectPage;
