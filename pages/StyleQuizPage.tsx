
import React, { useState } from 'react';
import { QUIZ_QUESTIONS, getStyleRecommendations } from '../data/quizData.ts';
import { RemixConfig } from '../constants.ts';
import { SparklesIcon } from '../components/icons/SparklesIcon.tsx';
import { StyleOption } from '../constants.ts';
import { DnaIcon } from '../components/icons/DnaIcon.tsx';

interface StyleQuizPageProps {
  onRemix: (config: RemixConfig) => void;
}

type AttireType = 'menswear' | 'womenswear';

const StyleQuizPage: React.FC<StyleQuizPageProps> = ({ onRemix }) => {
  const [step, setStep] = useState(0); // 0: attire choice, 1...n: questions, n+1: analyzing, n+2: results
  const [attireType, setAttireType] = useState<AttireType>('menswear');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<StyleOption[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAttireSelect = (type: AttireType) => {
    setAttireType(type);
    setStep(1);
  };

  const handleAnswer = (questionKey: string, answerValue: string) => {
    const newAnswers = { ...answers, [questionKey]: answerValue };
    setAnswers(newAnswers);

    if (step < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
        // Start analysis sequence
        setIsAnalyzing(true);
        const results = getStyleRecommendations(newAnswers, attireType);
        setRecommendations(results);
        
        // Simulate processing time
        setTimeout(() => {
            setIsAnalyzing(false);
            setStep(step + 1);
        }, 2500);
    }
  };

  const handleApplyStyle = (style: StyleOption) => {
    onRemix({
        attireType: attireType,
        stylePrompt: style.prompt,
        backgroundPrompt: '',
        lightingPrompt: '',
    });
  }

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setRecommendations([]);
    setIsAnalyzing(false);
  }

  const renderContent = () => {
    // Step 0: Choose Attire Type
    if (step === 0) {
      return (
        <div className="text-center animate-fade-in max-w-3xl mx-auto pt-10">
          <h2 className="text-6xl md:text-8xl font-bold font-playfair mb-4 text-white tracking-tighter">Style DNA</h2>
          <div className="flex items-center justify-center gap-2 mb-12">
              <div className="h-[1px] w-12 bg-amber-500/50"></div>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-amber-500">System Configuration</p>
              <div className="h-[1px] w-12 bg-amber-500/50"></div>
          </div>
          <p className="text-xl text-zinc-400 mb-16 font-light leading-relaxed">Initiate neural analysis to determine your optimal aesthetic profile.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <button onClick={() => handleAttireSelect('menswear')} className="group relative overflow-hidden px-8 py-20 glass-panel border-zinc-800 hover:border-amber-500/50 transition-all duration-500 rounded-xl">
              <span className="relative z-10 text-3xl font-playfair text-white group-hover:text-amber-400 transition-colors">Menswear</span>
              <p className="relative z-10 text-[10px] uppercase tracking-widest text-zinc-500 mt-2 group-hover:text-zinc-300">Sequence A</p>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <button onClick={() => handleAttireSelect('womenswear')} className="group relative overflow-hidden px-8 py-20 glass-panel border-zinc-800 hover:border-amber-500/50 transition-all duration-500 rounded-xl">
              <span className="relative z-10 text-3xl font-playfair text-white group-hover:text-amber-400 transition-colors">Womenswear</span>
              <p className="relative z-10 text-[10px] uppercase tracking-widest text-zinc-500 mt-2 group-hover:text-zinc-300">Sequence B</p>
               <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      );
    }

    // Analyzing State
    if (isAnalyzing) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                <div className="relative w-32 h-32 mb-12">
                    <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-4 border-4 border-zinc-800 rounded-full"></div>
                    <div className="absolute inset-4 border-4 border-b-amber-500 border-t-transparent border-l-transparent border-r-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <DnaIcon className="w-8 h-8 text-amber-500 animate-pulse" />
                    </div>
                </div>
                <h3 className="text-2xl font-playfair text-white mb-2 animate-pulse">Analyzing Biometrics</h3>
                <p className="text-xs font-mono text-zinc-500">CALCULATING OPTIMAL VECTORS...</p>
                
                <div className="w-64 h-1 bg-zinc-900 rounded-full mt-8 overflow-hidden">
                    <div className="h-full bg-amber-500 animate-progress"></div>
                </div>
            </div>
        );
    }

    // Steps 1...n: Questions
    if (step <= QUIZ_QUESTIONS.length) {
        const currentQuestion = QUIZ_QUESTIONS[step - 1];
        return (
            <div className="text-center animate-fade-in max-w-4xl mx-auto pt-10">
            <div className="mb-16 relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-800 -z-10"></div>
                <div className="inline-flex items-center justify-center bg-zinc-950 px-4">
                    <div className="h-1 w-48 bg-zinc-900 rounded-full overflow-hidden relative">
                        <div className="h-full bg-amber-500 transition-all duration-700 ease-out relative" style={{ width: `${(step / QUIZ_QUESTIONS.length) * 100}%`}}>
                             <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[2px]"></div>
                        </div>
                    </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mt-4">Phase 0{step} / 0{QUIZ_QUESTIONS.length}</p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white font-playfair leading-tight">{currentQuestion.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentQuestion.options.map((option, idx) => (
                <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.key, option.value)}
                    className="group relative p-8 text-xl font-light bg-zinc-900/40 border border-white/5 hover:border-amber-500/50 text-zinc-300 hover:text-white transition-all duration-300 rounded-xl overflow-hidden text-left"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10 flex justify-between items-center">
                        {option.label}
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300">Select</span>
                    </span>
                </button>
                ))}
            </div>
            </div>
        );
    }
    
    // Final Step: Results
    return (
        <div className="text-center animate-fade-in pt-10">
            <div className="inline-flex items-center justify-center p-6 rounded-full bg-amber-500/5 border border-amber-500/20 mb-8 relative overflow-hidden">
                 <div className="absolute inset-0 bg-amber-500/10 animate-pulse rounded-full"></div>
                <DnaIcon className="w-10 h-10 text-amber-400 relative z-10" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white font-playfair">Analysis Complete</h2>
            <p className="text-lg text-zinc-400 mb-16 font-light max-w-2xl mx-auto">The neural engine has curated the following aesthetic profiles based on your inputs.</p>
            
            {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {recommendations.map((style, idx) => (
                        <div key={style.id} className="glass-panel rounded-xl overflow-hidden flex flex-col hover:border-amber-500/40 transition-all group hover:-translate-y-2 duration-500 shadow-2xl" style={{ animationDelay: `${idx * 150}ms` }}>
                            <div className="aspect-w-3 aspect-h-4 bg-zinc-900 relative overflow-hidden">
                                {style.previewImage ? (
                                    <img src={style.previewImage} alt={style.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-700 group-hover:scale-110"/>
                                ) : (
                                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center border-b border-white/5">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                                        <SparklesIcon className="w-12 h-12 text-zinc-700 group-hover:text-amber-400 transition-colors duration-500" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-[10px] text-amber-500 uppercase tracking-widest mb-1 font-bold">Match Rate: {(95 - idx * 4)}%</p>
                                    <h3 className="font-bold text-2xl text-white font-playfair leading-tight">{style.name}</h3>
                                </div>
                            </div>
                            <div className="p-6 bg-black/40 backdrop-blur-md border-t border-white/5 flex-grow flex flex-col justify-end">
                                <button onClick={() => handleApplyStyle(style)} className="w-full bg-white text-black hover:bg-amber-400 font-bold text-[10px] uppercase tracking-[0.2em] py-4 px-4 rounded-sm transition-colors btn-tech">
                                    Apply DNA
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-zinc-500 border border-dashed border-zinc-800 p-8 rounded-xl">No exact matches found in the database.</p>
            )}
             <button onClick={handleRestart} className="mt-20 text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors border-b border-transparent hover:border-white pb-1 hover:pb-2 duration-300">
                Restart Diagnosis
            </button>
        </div>
    )
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
        <main className="container mx-auto px-4 py-12 pt-20 md:pt-24 md:py-20">
        <div className="max-w-7xl mx-auto">
            {renderContent()}
        </div>
        </main>
    </div>
  );
};

export default StyleQuizPage;
