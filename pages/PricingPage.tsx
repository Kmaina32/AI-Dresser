import React from 'react';
import { CheckIcon } from '../components/icons/CheckIcon.tsx';

const PricingPage: React.FC = () => {
    // Note: The buttons are currently for display purposes and are not functional.
    // They will be connected to an authentication and payment system in the future.

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold font-playfair mb-4 text-white">Find the Perfect Plan</h2>
                <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                    Unlock your creative potential. Choose a plan that fits your needs and start generating stunning, professional visuals today.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Hobbyist Plan */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full flex flex-col">
                        <h3 className="text-2xl font-semibold text-white">Hobbyist</h3>
                        <p className="text-gray-400 mt-2 mb-6">For personal projects and creative exploration.</p>
                        <p className="text-4xl font-bold my-4 text-white">$10<span className="text-lg font-medium text-gray-400">/mo</span></p>
                        <button className="w-full bg-zinc-800 text-white font-semibold py-3 px-6 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors">
                            Get Started
                        </button>
                        <ul className="text-left space-y-4 mt-8 text-gray-300 flex-grow">
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span><span className="font-semibold">50</span> generations per month</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Standard Quality</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Access to all styles</span>
                            </li>
                             <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Personal use license</span>
                            </li>
                        </ul>
                    </div>

                    {/* Professional Plan */}
                    <div className="bg-zinc-900 border-2 border-amber-500 rounded-2xl p-8 h-full flex flex-col shadow-2xl shadow-amber-500/10 relative transform scale-105">
                        <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
                        <h3 className="text-3xl font-semibold text-white">Professional</h3>
                        <p className="text-gray-400 mt-2 mb-6">For freelancers and small businesses.</p>
                        <p className="text-5xl font-bold my-4 text-white">$25<span className="text-lg font-medium text-gray-400">/mo</span></p>
                        <button className="w-full bg-amber-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-amber-400 transition-colors">
                            Choose Pro
                        </button>
                        <ul className="text-left space-y-4 mt-8 text-gray-300 flex-grow">
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span><span className="font-semibold">200</span> generations per month</span>
                            </li>
                             <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>High Quality generations</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Access to all styles</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Video animation features</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Commercial use license</span>
                            </li>
                             <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Priority support</span>
                            </li>
                        </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full flex flex-col">
                        <h3 className="text-2xl font-semibold text-white">Enterprise</h3>
                        <p className="text-gray-400 mt-2 mb-6">For large teams and custom needs.</p>
                        <p className="text-4xl font-bold my-4 text-white">Let's Talk</p>
                        <button className="w-full bg-zinc-800 text-white font-semibold py-3 px-6 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors">
                            Contact Sales
                        </button>
                         <ul className="text-left space-y-4 mt-8 text-gray-300 flex-grow">
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Unlimited generations</span>
                            </li>
                             <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>API Access</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Dedicated support & training</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Custom style models</span>
                            </li>
                             <li className="flex items-center gap-3">
                                <CheckIcon className="w-5 h-5 text-amber-400" />
                                <span>Team management tools</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PricingPage;
