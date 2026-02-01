import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

const ElectionHistory = () => {
    const { contract } = useWeb3();
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (contract) {
            loadElectionHistory();
        }
    }, [contract]);

    const loadElectionHistory = async () => {
        try {
            const allElections = await contract.methods.getAllElections().call();
            setElections(allElections);
        } catch (error) {
            console.error('Error loading election history:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toLocaleString();
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <p className="text-xl">Loading election history...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Election History</h1>

            <div className="space-y-6">
                {elections.length === 0 ? (
                    <p className="text-gray-500 text-center">No elections found</p>
                ) : (
                    elections.map((election) => (
                        <div key={election.id} className="card">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{election.name}</h3>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p>
                                            <span className="font-semibold">Election ID:</span> {election.id}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Start Time:</span>{' '}
                                            {formatTimestamp(election.startTime)}
                                        </p>
                                        <p>
                                            <span className="font-semibold">End Time:</span>{' '}
                                            {formatTimestamp(election.endTime)}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold ${election.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {election.isActive ? 'Active' : 'Ended'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary-600">
                                        {election.candidateCount}
                                    </p>
                                    <p className="text-sm text-gray-600">Candidates</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary-600">
                                        {election.totalVotes}
                                    </p>
                                    <p className="text-sm text-gray-600">Total Votes</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary-600">
                                        {election.winnerId !== '0' ? `#${election.winnerId}` : 'TBD'}
                                    </p>
                                    <p className="text-sm text-gray-600">Winner ID</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500">
                                    🔗 All votes are permanently recorded on the blockchain and can be verified
                                    through the transaction history
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ElectionHistory;
