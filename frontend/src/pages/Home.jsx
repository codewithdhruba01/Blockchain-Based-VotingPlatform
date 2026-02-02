import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

import { FAQSection } from '../components/FAQSection';
import { FeatureSection } from '../components/FeatureSection';
const Home = () => {
    const { account, connectWallet } = useWeb3();

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <svg
                            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                            fill="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Decentralized</span>{' '}
                                    <span className="block text-primary-600 xl:inline">Voting Platform</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Secure, transparent, and tamper-proof elections powered by blockchain technology.
                                    Experience the future of democracy with our decentralized voting system.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    {!account ? (
                                        <div className="rounded-md shadow">
                                            <button
                                                onClick={connectWallet}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg transition-all duration-300 transform hover:scale-105"
                                            >
                                                Get Started - Connect Wallet
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-4">
                                            <div className="rounded-md shadow">
                                                <Link
                                                    to="/voter"
                                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg transition-all duration-300 transform hover:scale-105"
                                                >
                                                    Cast Your Vote
                                                </Link>
                                            </div>
                                            <div className="rounded-md shadow">
                                                <Link
                                                    to="/results"
                                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg transition-all duration-300"
                                                >
                                                    View Results
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-primary-50">
                    <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-indigo-600">
                        <img src="/coverlogo.png" alt="BlockVote Logo" className="h-60 w-auto opacity-20 filter invert brightness-0" />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <FeatureSection />

            {/* How It Works Section */}
            <div className="py-16 bg-white overflow-hidden lg:py-24">
                <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                    <div className="relative">
                        <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-12">
                            How It Works
                        </h2>
                    </div>

                    <div className="relative lg:grid lg:grid-cols-4 lg:gap-8 lg:items-center">
                        {[
                            { step: 1, title: 'Connect Wallet', desc: 'Securely link your MetaMask wallet to authenticate your identity.' },
                            { step: 2, title: 'Get Registered', desc: 'Admin verifies your eligibility and registers you to vote.' },
                            { step: 3, title: 'Cast Vote', desc: 'Select your preferred candidate and confirm your choice on the blockchain.' },
                            { step: 4, title: 'View Results', desc: 'Watch real-time updates and verify the final election outcomes.' }
                        ].map((item, index) => (
                            <div key={index} className="relative mt-10 lg:mt-0 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
                                <div className="flex justify-center">
                                    <span className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold ring-4 ring-white group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                        {item.step}
                                    </span>
                                </div>
                                <div className="mt-5 text-center">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{item.title}</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                                {index < 3 && (
                                    <div className="hidden lg:block absolute top-14 -right-4 w-8 h-0.5 bg-gray-300 transform translate-x-1/2"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* FAQ Section */}
            <FAQSection />

            {/* CTA Section */}
            <div className="bg-primary-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to vote?</span>
                        <span className="block text-primary-200">Start participating in decentralized elections today.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-primary-200">
                        Join thousands of users who trust our platform for secure and transparent decision making.
                    </p>
                    <div className="mt-8 flex justify-center">
                        {!account ? (
                            <button
                                onClick={connectWallet}
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
                            >
                                Connect Wallet Now
                            </button>
                        ) : (
                            <Link
                                to="/voter"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
                            >
                                Go to Voting Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;
