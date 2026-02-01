import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

const VoterDashboard = () => {
    const { contract, account } = useWeb3();
    const [elections, setElections] = useState([]);
    const [selectedElection, setSelectedElection] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [voterStatus, setVoterStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (contract && account) {
            loadElections();
        }
    }, [contract, account]);

    const loadElections = async () => {
        try {
            const allElections = await contract.methods.getAllElections().call();
            const activeElections = allElections.filter(e => e.isActive);
            setElections(activeElections);
        } catch (error) {
            console.error('Error loading elections:', error);
        }
    };

    const selectElection = async (electionId) => {
        setSelectedElection(electionId);
        try {
            const candidateList = await contract.methods.getCandidates(electionId).call();
            setCandidates(candidateList);

            const status = await contract.methods.getVoterStatus(electionId, account).call();
            setVoterStatus(status);
        } catch (error) {
            console.error('Error loading election details:', error);
        }
    };

    const castVote = async (candidateId) => {
        setLoading(true);
        try {
            await contract.methods
                .castVote(selectedElection, candidateId)
                .send({ from: account });

            alert('Vote cast successfully!');
            selectElection(selectedElection); // Reload status
        } catch (error) {
            console.error('Error casting vote:', error);
            alert(error.message || 'Failed to cast vote');
        } finally {
            setLoading(false);
        }
    };

    if (!account) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Please connect your wallet to vote</h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Voter Dashboard</h1>

            {!selectedElection ? (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Active Elections</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {elections.length === 0 ? (
                            <p className="text-gray-500">No active elections available</p>
                        ) : (
                            elections.map((election) => (
                                <div key={election.id} className="card hover:shadow-xl transition-shadow cursor-pointer"
                                    onClick={() => selectElection(election.id)}>
                                    <h3 className="text-xl font-bold mb-2">{election.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Candidates: {election.candidateCount}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Total Votes: {election.totalVotes}
                                    </p>
                                    <button className="btn-primary w-full">
                                        View & Vote
                                    </button>
                                </div>
                            ))
                        )}
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

                    {voterStatus && !voterStatus.isRegistered && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            You are not registered for this election. Please contact the admin.
                        </div>
                    )}

                    {voterStatus && voterStatus.hasVoted && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                            ✓ You have already voted in this election!
                        </div>
                    )}

                    <h2 className="text-2xl font-semibold mb-6">Candidates</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {candidates.map((candidate) => (
                            <div key={candidate.id} className="card">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold">{candidate.name}</h3>
                                        <p className="text-gray-600">{candidate.party}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-primary-600">
                                            {candidate.voteCount}
                                        </p>
                                        <p className="text-sm text-gray-500">votes</p>
                                    </div>
                                </div>

                                {voterStatus && voterStatus.isRegistered && !voterStatus.hasVoted && (
                                    <button
                                        onClick={() => castVote(candidate.id)}
                                        disabled={loading}
                                        className="btn-primary w-full"
                                    >
                                        {loading ? 'Voting...' : 'Vote for this candidate'}
                                    </button>
                                )}

                                {voterStatus && voterStatus.hasVoted &&
                                    voterStatus.votedCandidateId === candidate.id && (
                                        <div className="bg-green-100 text-green-700 py-2 px-4 rounded text-center font-medium">
                                            ✓ You voted for this candidate
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoterDashboard;
