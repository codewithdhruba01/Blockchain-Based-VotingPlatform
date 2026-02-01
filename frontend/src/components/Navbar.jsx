import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const Navbar = () => {
    const { account, connectWallet, disconnectWallet, network } = useWeb3();

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-primary-600">🗳️ BlockVote</span>
                        </Link>
                        <div className="hidden md:flex ml-10 space-x-4">
                            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/admin" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                Admin
                            </Link>
                            <Link to="/voter" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                Vote
                            </Link>
                            <Link to="/results" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                Results
                            </Link>
                            <Link to="/history" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                History
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {network && (
                            <span className="text-sm text-gray-600">
                                Network: {network}
                            </span>
                        )}
                        {account ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-700">
                                    {formatAddress(account)}
                                </span>
                                <button
                                    onClick={disconnectWallet}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Disconnect
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={connectWallet}
                                className="btn-primary"
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
