import React, { useState } from 'react';
import { QUIZ_QUESTIONS, getStyleRecommendations } from '../data/quizData';
import { RemixConfig } from '../App';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { StyleOption } from '../constants';
import { DnaIcon } from '../components/icons/DnaIcon';

interface StyleQuizPageProps {
  onRemix: (config: RemixConfig) => void;
}

type AttireType = 'menswear' | 'womenswear';

const StyleQuizPage: React.FC<StyleQuizPageProps> = ({ onRemix }) => {
  const [step, setStep] = useState(0); // 0: attire choice, 1...n: questions, n+1: results
  const [attireType, setAttireType] = useState<AttireType>('menswear');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<StyleOption[]>([]);

  const handleAttireSelect = (type: AttireType) => {
    setAttireType(type);
    setStep(1);
  };

  const handleAnswer = (questionKey: string, answerValue: string) => {
    const newAnswers = { ...answers, [questionKey]: answerValue };
    setAnswers(newAnswers);

    if (step < QUIZ_QUESTIONS.length + 1) {
      setStep(step + 1);
    }
    
    // If it's the last question, calculate results
    if (step === QUIZ_QUESTIONS.length) {
        const results = getStyleRecommendations(newAnswers, attireType);
        setRecommendations(results);
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
  }

  const renderContent = () => {
    // Step 0: Choose Attire Type
    if (step === 0) {
      return (
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 text-white">Let's find your style.</h2>
          <p className="text-lg text-gray-400 mb-8">Which style collection would you like to explore?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
            <button onClick={() => handleAttireSelect('menswear')} className="w-full px-6 py-4 text-lg text-center font-semibold rounded-lg transition-all duration-300 bg-zinc-800 text-gray-200 hover:bg-amber-500 hover:text-black hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/50">
              Menswear
            </button>
            <button onClick={() => handleAttireSelect('womenswear')} className="w-full px-6 py-4 text-lg text-center font-semibold rounded-lg transition-all duration-300 bg-zinc-800 text-gray-200 hover:bg-amber-500 hover:text-black hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/50">
              Womenswear
            </button>
          </div>
        </div>
      );
    }

    // Steps 1...n: Questions
    const currentQuestion = QUIZ_QUESTIONS[step - 1];
    if (currentQuestion) {
      return (
        <div className="text-center animate-fade-in">
          <p className="text-amber-400 font-semibold mb-2">Question {step} of {QUIZ_QUESTIONS.length}</p>
          <h2 className="text-3xl font-bold mb-8 text-white">{currentQuestion.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.key, option.value)}
                className="p-6 text-lg font-semibold bg-zinc-900 border-2 border-zinc-800 rounded-xl hover:border-amber-500 hover:bg-zinc-800 transition-all duration-200"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      );
    }
    
    // Final Step: Results
    return (
        <div className="text-center animate-fade-in">
            <DnaIcon className="w-12 h-12 mx-auto mb-4 text-amber-400" />
            <h2 className="text-3xl font-bold mb-4 text-white">Your Style DNA Results</h2>
            <p className="text-lg text-gray-400 mb-10">Based on your choices, here are a few styles we think you'll love.</p>
            {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recommendations.map(style => (
                        <div key={style.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
                            <div className="aspect-w-4 aspect-h-5 bg-zinc-800">
                                {style.previewImage && (
                                    <img src={style.previewImage} alt={style.name} className="w-full h-full object-cover"/>
                                )}
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg text-white flex-grow">{style.name}</h3>
                                <button onClick={() => handleApplyStyle(style)} className="mt-4 w-full bg-amber-500 text-black font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black">
                                    <SparklesIcon className="w-5 h-5"/>
                                    Apply this Style
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">We couldn't find a perfect match, but feel free to explore all styles on the Creator page!</p>
            )}
             <button onClick={handleRestart} className="mt-12 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Start Over
            </button>
        </div>
    )
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="p-4 sm:p-8 bg-black/30 border border-zinc-800 rounded-2xl">
            {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default StyleQuizPage;
