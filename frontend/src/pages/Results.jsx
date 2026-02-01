import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

const Results = () => {
    const { contract } = useWeb3();
    const [elections, setElections] = useState([]);
    const [selectedElection, setSelectedElection] = useState(null);
    const [results, setResults] = useState(null);

    useEffect(() => {
        if (contract) {
            loadElections();
        }
    }, [contract]);

    const loadElections = async () => {
        try {
            const allElections = await contract.methods.getAllElections().call();
            setElections(allElections);
        } catch (error) {
            console.error('Error loading elections:', error);
        }
    };

    const loadResults = async (electionId) => {
        try {
            const electionResults = await contract.methods.getResults(electionId).call();
            const electionDetails = await contract.methods.getElectionDetails(electionId).call();

            setResults({
                candidates: electionResults.candidateList,
                winnerId: electionResults.winnerId,
                totalVotes: electionResults.totalVotes,
                electionName: electionDetails.name,
                isActive: electionDetails.isActive
            });
            setSelectedElection(electionId);
        } catch (error) {
            console.error('Error loading results:', error);
        }
    };

    const calculatePercentage = (votes, total) => {
        if (total === '0') return 0;
        return ((parseInt(votes) / parseInt(total)) * 100).toFixed(2);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Election Results</h1>

            {!selectedElection ? (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Select an Election</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {elections.map((election) => (
                            <div
                                key={election.id}
                                className="card hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => loadResults(election.id)}
                            >
                                <h3 className="text-xl font-bold mb-2">{election.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Status: {election.isActive ? 'Active' : 'Ended'}
                                </p>
                                <p className="text-sm text-gray-600 mb-4">
                                    Total Votes: {election.totalVotes}
                                </p>
                                <button className="btn-primary w-full">
                                    View Results
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setSelectedElection(null)}
                        className="mb-6 text-primary-600 hover:text-primary-700 font-medium"
                    >
                        ← Back to Elections
                    </button>

                    <div className="card mb-8">
                        <h2 className="text-3xl font-bold mb-2">{results.electionName}</h2>
                        <p className="text-gray-600">
                            Total Votes Cast: <span className="font-semibold">{results.totalVotes}</span>
                        </p>
                        <p className="text-gray-600">
                            Status: <span className="font-semibold">{results.isActive ? 'Active' : 'Ended'}</span>
                        </p>
                    </div>

                    {results.winnerId !== '0' && (
                        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-xl p-6 mb-8">
                            <h3 className="text-2xl font-bold text-yellow-900 mb-2">🏆 Winner</h3>
                            <p className="text-xl font-semibold text-yellow-800">
                                {results.candidates.find(c => c.id === results.winnerId)?.name}
                            </p>
                            <p className="text-yellow-700">
                                {results.candidates.find(c => c.id === results.winnerId)?.party}
                            </p>
                        </div>
                    )}

                    <h3 className="text-2xl font-semibold mb-4">Detailed Results</h3>
                    <div className="space-y-4">
                        {results.candidates.map((candidate) => {
                            const percentage = calculatePercentage(candidate.voteCount, results.totalVotes);
                            const isWinner = candidate.id === results.winnerId;

                            return (
                                <div
                                    key={candidate.id}
                                    className={`card ${isWinner ? 'border-2 border-yellow-400 bg-yellow-50' : ''}`}
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <h4 className="text-xl font-bold flex items-center">
                                                {candidate.name}
                                                {isWinner && <span className="ml-2 text-yellow-600">👑</span>}
                                            </h4>
                                            <p className="text-gray-600">{candidate.party}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-bold text-primary-600">
                                                {candidate.voteCount}
                                            </p>
                                            <p className="text-sm text-gray-500">votes</p>
                                        </div>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                        <div
                                            className={`h-full ${isWinner ? 'bg-yellow-500' : 'bg-primary-600'} transition-all duration-500`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-right text-sm text-gray-600 mt-2">{percentage}%</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Results;
