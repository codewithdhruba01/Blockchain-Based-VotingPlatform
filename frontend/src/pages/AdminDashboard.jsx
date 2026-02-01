import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

const AdminDashboard = () => {
    const { contract, account } = useWeb3();
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form states
    const [electionName, setElectionName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [candidateName, setCandidateName] = useState('');
    const [candidateParty, setCandidateParty] = useState('');
    const [voterAddress, setVoterAddress] = useState('');
    const [selectedElection, setSelectedElection] = useState('');

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

    const createElection = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const start = Math.floor(new Date(startTime).getTime() / 1000);
            const end = Math.floor(new Date(endTime).getTime() / 1000);

            await contract.methods
                .createElection(electionName, start, end)
                .send({ from: account });

            alert('Election created successfully!');
            setElectionName('');
            setStartTime('');
            setEndTime('');
            loadElections();
        } catch (error) {
            console.error('Error creating election:', error);
            alert('Failed to create election');
        } finally {
            setLoading(false);
        }
    };

    const addCandidate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await contract.methods
                .addCandidate(selectedElection, candidateName, candidateParty)
                .send({ from: account });

            alert('Candidate added successfully!');
            setCandidateName('');
            setCandidateParty('');
        } catch (error) {
            console.error('Error adding candidate:', error);
            alert('Failed to add candidate');
        } finally {
            setLoading(false);
        }
    };

    const registerVoter = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await contract.methods
                .registerVoter(selectedElection, voterAddress)
                .send({ from: account });

            alert('Voter registered successfully!');
            setVoterAddress('');
        } catch (error) {
            console.error('Error registering voter:', error);
            alert('Failed to register voter');
        } finally {
            setLoading(false);
        }
    };

    if (!account) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Please connect your wallet</h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Create Election */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Create Election</h2>
                    <form onSubmit={createElection} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Election Name</label>
                            <input
                                type="text"
                                value={electionName}
                                onChange={(e) => setElectionName(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Start Time</label>
                            <input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">End Time</label>
                            <input
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Election'}
                        </button>
                    </form>
                </div>

                {/* Add Candidate */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Add Candidate</h2>
                    <form onSubmit={addCandidate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Select Election</label>
                            <select
                                value={selectedElection}
                                onChange={(e) => setSelectedElection(e.target.value)}
                                className="input-field"
                                required
                            >
                                <option value="">Choose election...</option>
                                {elections.map((election) => (
                                    <option key={election.id} value={election.id}>
                                        {election.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Candidate Name</label>
                            <input
                                type="text"
                                value={candidateName}
                                onChange={(e) => setCandidateName(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Party</label>
                            <input
                                type="text"
                                value={candidateParty}
                                onChange={(e) => setCandidateParty(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Candidate'}
                        </button>
                    </form>
                </div>

                {/* Register Voter */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Register Voter</h2>
                    <form onSubmit={registerVoter} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Select Election</label>
                            <select
                                value={selectedElection}
                                onChange={(e) => setSelectedElection(e.target.value)}
                                className="input-field"
                                required
                            >
                                <option value="">Choose election...</option>
                                {elections.map((election) => (
                                    <option key={election.id} value={election.id}>
                                        {election.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Voter Wallet Address</label>
                            <input
                                type="text"
                                value={voterAddress}
                                onChange={(e) => setVoterAddress(e.target.value)}
                                className="input-field"
                                placeholder="0x..."
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full" disabled={loading}>
                            {loading ? 'Registering...' : 'Register Voter'}
                        </button>
                    </form>
                </div>

                {/* Elections List */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Active Elections</h2>
                    <div className="space-y-2">
                        {elections.length === 0 ? (
                            <p className="text-gray-500">No elections created yet</p>
                        ) : (
                            elections.map((election) => (
                                <div key={election.id} className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold">{election.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        Status: {election.isActive ? 'Active' : 'Ended'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Total Votes: {election.totalVotes}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
