import React, { createContext, useState, useEffect, useContext } from 'react';
import Web3 from 'web3';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [network, setNetwork] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load contract ABI and address
    const loadContract = async (web3Instance) => {
        try {
            const response = await fetch('/src/contracts/VotingContract.json');
            const contractData = await response.json();

            const networkId = await web3Instance.eth.net.getId();
            const contractInstance = new web3Instance.eth.Contract(
                contractData.abi,
                contractData.address
            );

            setContract(contractInstance);
            setNetwork(networkId);
        } catch (err) {
            console.error('Error loading contract:', err);
            setError('Failed to load contract');
        }
    };

    // Connect to MetaMask
    const connectWallet = async () => {
        setLoading(true);
        setError(null);

        try {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const accounts = await web3Instance.eth.getAccounts();
                setWeb3(web3Instance);
                setAccount(accounts[0]);

                await loadContract(web3Instance);

                // Listen for account changes
                window.ethereum.on('accountsChanged', (accounts) => {
                    setAccount(accounts[0] || null);
                });

                // Listen for chain changes
                window.ethereum.on('chainChanged', () => {
                    window.location.reload();
                });
            } else {
                setError('Please install MetaMask!');
            }
        } catch (err) {
            console.error('Error connecting wallet:', err);
            setError('Failed to connect wallet');
        } finally {
            setLoading(false);
        }
    };

    // Disconnect wallet
    const disconnectWallet = () => {
        setAccount(null);
        setWeb3(null);
        setContract(null);
    };

    const value = {
        web3,
        account,
        contract,
        network,
        loading,
        error,
        connectWallet,
        disconnectWallet
    };

    return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
