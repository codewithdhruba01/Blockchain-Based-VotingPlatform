import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const Home = () => {
    const { account, connectWallet } = useWeb3();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Decentralized Voting Platform
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Secure, transparent, and tamper-proof elections powered by blockchain technology.
                        Vote with confidence knowing your voice truly counts.
                    </p>

                    {!account ? (
                        <button onClick={connectWallet} className="btn-primary text-lg px-8 py-3">
                            Get Started - Connect Wallet
                        </button>
                    ) : (
                        <div className="flex justify-center space-x-4">
                            <Link to="/voter" className="btn-primary text-lg px-8 py-3">
                                Cast Your Vote
                            </Link>
                            <Link to="/results" className="btn-secondary text-lg px-8 py-3">
                                View Results
                            </Link>
                        </div>
                    )}
                </div>

                {/* Features */}
                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    <div className="card text-center">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                        <p className="text-gray-600">
                            Your vote is encrypted and stored securely on the blockchain, ensuring complete privacy.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold mb-2">Transparent</h3>
                        <p className="text-gray-600">
                            All votes are recorded on the blockchain, making the process fully transparent and auditable.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold mb-2">Tamper-Proof</h3>
                        <p className="text-gray-600">
                            Once cast, votes cannot be altered or deleted, ensuring the integrity of the election.
                        </p>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary-600">1</span>
                            </div>
                            <h4 className="font-semibold mb-2">Connect Wallet</h4>
                            <p className="text-sm text-gray-600">Link your MetaMask wallet to authenticate</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary-600">2</span>
                            </div>
                            <h4 className="font-semibold mb-2">Get Registered</h4>
                            <p className="text-sm text-gray-600">Admin verifies and registers eligible voters</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary-600">3</span>
                            </div>
                            <h4 className="font-semibold mb-2">Cast Vote</h4>
                            <p className="text-sm text-gray-600">Select your candidate and submit your vote</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary-600">4</span>
                            </div>
                            <h4 className="font-semibold mb-2">View Results</h4>
                            <p className="text-sm text-gray-600">See real-time results after election ends</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
