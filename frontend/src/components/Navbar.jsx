import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

const Navbar = () => {
    const { account, connectWallet, disconnectWallet, network } = useWeb3();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    };

    const isActive = (path) => {
        return location.pathname === path ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50';
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/admin', label: 'Admin' },
        { path: '/voter', label: 'Vote' },
        { path: '/results', label: 'Results' },
        { path: '/history', label: 'History' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <img src="/logo.png" alt="BlockVote Logo" className="h-10 w-auto" />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
                                BlockVote
                            </span>
                        </Link>
                        <div className="hidden md:flex ml-10 space-x-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-4">
                            {network && (
                                <span className="hidden lg:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                    Network: {network}
                                </span>
                            )}
                            {account ? (
                                <div className="flex items-center space-x-3">
                                    <div className="hidden sm:flex flex-col items-end mr-2">
                                        <span className="text-xs text-gray-500">Connected as</span>
                                        <span className="text-sm font-bold text-gray-700 font-mono">
                                            {formatAddress(account)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={disconnectWallet}
                                        className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={connectWallet}
                                    className="btn-primary shadow-lg shadow-primary-500/30"
                                >
                                    Connect Wallet
                                </button>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isMobileMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-200">
                        {account ? (
                            <div className="px-4 space-y-3">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                            {account.substring(2, 4)}
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">Connected Wallet</div>
                                        <div className="text-sm font-medium text-gray-500 font-mono truncate">{account}</div>
                                    </div>
                                </div>
                                {network && (
                                    <div className="px-2 py-1 rounded-md bg-gray-50 text-sm text-gray-600">
                                        Network: <span className="font-semibold">{network}</span>
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        disconnectWallet();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full text-center bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                >
                                    Disconnect
                                </button>
                            </div>
                        ) : (
                            <div className="px-4">
                                <button
                                    onClick={() => {
                                        connectWallet();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full btn-primary shadow-lg shadow-primary-500/30"
                                >
                                    Connect Wallet
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
