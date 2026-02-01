import { expect } from "chai";
import hre from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

const { ethers } = hre;

describe("VotingContract", function () {
    let votingContract;
    let admin;
    let voter1;
    let voter2;
    let voter3;

    beforeEach(async function () {
        // Get signers
        [admin, voter1, voter2, voter3] = await ethers.getSigners();

        // Deploy contract
        const VotingContract = await ethers.getContractFactory("VotingContract");
        votingContract = await VotingContract.deploy();
        await votingContract.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the correct admin", async function () {
            expect(await votingContract.admin()).to.equal(admin.address);
        });

        it("Should initialize election count to 0", async function () {
            expect(await votingContract.electionCount()).to.equal(0);
        });
    });

    describe("Election Creation", function () {
        it("Should allow admin to create an election", async function () {
            const startTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
            const endTime = startTime + 86400; // 24 hours after start

            await expect(
                votingContract.createElection("Presidential Election", startTime, endTime)
            )
                .to.emit(votingContract, "ElectionCreated")
                .withArgs(1, "Presidential Election", startTime, endTime);

            expect(await votingContract.electionCount()).to.equal(1);
        });

        it("Should not allow non-admin to create an election", async function () {
            const startTime = Math.floor(Date.now() / 1000) + 3600;
            const endTime = startTime + 86400;

            await expect(
                votingContract.connect(voter1).createElection("Test Election", startTime, endTime)
            ).to.be.revertedWith("Only admin can perform this action");
        });

        it("Should reject election with invalid time range", async function () {
            const startTime = Math.floor(Date.now() / 1000) + 3600;
            const endTime = startTime - 1000; // End before start

            await expect(
                votingContract.createElection("Invalid Election", startTime, endTime)
            ).to.be.revertedWith("Start time must be before end time");
        });
    });

    describe("Candidate Management", function () {
        let electionId;
        let startTime;

        beforeEach(async function () {
            startTime = Math.floor(Date.now() / 1000) + 3600;
            const endTime = startTime + 86400;
            await votingContract.createElection("Test Election", startTime, endTime);
            electionId = 1;
        });

        it("Should allow admin to add candidates", async function () {
            await expect(
                votingContract.addCandidate(electionId, "Alice Johnson", "Democratic Party")
            )
                .to.emit(votingContract, "CandidateAdded")
                .withArgs(electionId, 1, "Alice Johnson", "Democratic Party");

            const candidates = await votingContract.getCandidates(electionId);
            expect(candidates.length).to.equal(1);
            expect(candidates[0].name).to.equal("Alice Johnson");
        });

        it("Should not allow adding candidates after election starts", async function () {
            // Fast forward to election start time
            await time.increaseTo(startTime + 1);

            await expect(
                votingContract.addCandidate(electionId, "Bob Smith", "Republican Party")
            ).to.be.revertedWith("Cannot add candidates after election starts");
        });

        it("Should not allow non-admin to add candidates", async function () {
            await expect(
                votingContract.connect(voter1).addCandidate(electionId, "Charlie Brown", "Independent")
            ).to.be.revertedWith("Only admin can perform this action");
        });
    });

    describe("Voter Registration", function () {
        let electionId;

        beforeEach(async function () {
            const startTime = Math.floor(Date.now() / 1000) + 3600;
            const endTime = startTime + 86400;
            await votingContract.createElection("Test Election", startTime, endTime);
            electionId = 1;
        });

        it("Should allow admin to register voters", async function () {
            await expect(votingContract.registerVoter(electionId, voter1.address))
                .to.emit(votingContract, "VoterRegistered")
                .withArgs(electionId, voter1.address);

            const voterStatus = await votingContract.getVoterStatus(electionId, voter1.address);
            expect(voterStatus.isRegistered).to.be.true;
            expect(voterStatus.hasVoted).to.be.false;
        });

        it("Should not allow registering the same voter twice", async function () {
            await votingContract.registerVoter(electionId, voter1.address);

            await expect(
                votingContract.registerVoter(electionId, voter1.address)
            ).to.be.revertedWith("Voter already registered");
        });

        it("Should not allow non-admin to register voters", async function () {
            await expect(
                votingContract.connect(voter1).registerVoter(electionId, voter2.address)
            ).to.be.revertedWith("Only admin can perform this action");
        });
    });

    describe("Voting", function () {
        let electionId;
        let startTime;

        beforeEach(async function () {
            startTime = Math.floor(Date.now() / 1000) + 100; // Start soon
            const endTime = startTime + 86400;
            await votingContract.createElection("Test Election", startTime, endTime);
            electionId = 1;

            // Add candidates
            await votingContract.addCandidate(electionId, "Alice Johnson", "Democratic Party");
            await votingContract.addCandidate(electionId, "Bob Smith", "Republican Party");

            // Register voters
            await votingContract.registerVoter(electionId, voter1.address);
            await votingContract.registerVoter(electionId, voter2.address);
        });

        it("Should allow registered voter to cast vote", async function () {
            // Fast forward to election start
            await time.increaseTo(startTime + 1);

            await expect(votingContract.connect(voter1).castVote(electionId, 1))
                .to.emit(votingContract, "VoteCast")
                .withArgs(electionId, voter1.address, 1);

            const voterStatus = await votingContract.getVoterStatus(electionId, voter1.address);
            expect(voterStatus.hasVoted).to.be.true;
            expect(voterStatus.votedCandidateId).to.equal(1);

            const candidates = await votingContract.getCandidates(electionId);
            expect(candidates[0].voteCount).to.equal(1);
        });

        it("Should prevent double voting", async function () {
            await time.increaseTo(startTime + 1);

            await votingContract.connect(voter1).castVote(electionId, 1);

            await expect(
                votingContract.connect(voter1).castVote(electionId, 2)
            ).to.be.revertedWith("You have already voted");
        });

        it("Should not allow unregistered voter to vote", async function () {
            await time.increaseTo(startTime + 1);

            await expect(
                votingContract.connect(voter3).castVote(electionId, 1)
            ).to.be.revertedWith("You are not registered for this election");
        });

        it("Should not allow voting before election starts", async function () {
            await expect(
                votingContract.connect(voter1).castVote(electionId, 1)
            ).to.be.revertedWith("Election has not started yet");
        });

        it("Should not allow voting after election ends", async function () {
            const endTime = startTime + 86400;
            await time.increaseTo(endTime + 1);

            await expect(
                votingContract.connect(voter1).castVote(electionId, 1)
            ).to.be.revertedWith("Election has ended");
        });

        it("Should reject vote for invalid candidate", async function () {
            await time.increaseTo(startTime + 1);

            await expect(
                votingContract.connect(voter1).castVote(electionId, 999)
            ).to.be.revertedWith("Invalid candidate");
        });
    });

    describe("Election Results", function () {
        let electionId;
        let startTime;

        beforeEach(async function () {
            startTime = Math.floor(Date.now() / 1000) + 100;
            const endTime = startTime + 86400;
            await votingContract.createElection("Test Election", startTime, endTime);
            electionId = 1;

            // Add candidates
            await votingContract.addCandidate(electionId, "Alice Johnson", "Democratic Party");
            await votingContract.addCandidate(electionId, "Bob Smith", "Republican Party");
            await votingContract.addCandidate(electionId, "Charlie Brown", "Independent");

            // Register voters
            await votingContract.registerVoter(electionId, voter1.address);
            await votingContract.registerVoter(electionId, voter2.address);
            await votingContract.registerVoter(electionId, voter3.address);

            // Fast forward to election start
            await time.increaseTo(startTime + 1);

            // Cast votes
            await votingContract.connect(voter1).castVote(electionId, 1); // Alice
            await votingContract.connect(voter2).castVote(electionId, 1); // Alice
            await votingContract.connect(voter3).castVote(electionId, 2); // Bob
        });

        it("Should calculate correct vote counts", async function () {
            const candidates = await votingContract.getCandidates(electionId);
            expect(candidates[0].voteCount).to.equal(2); // Alice
            expect(candidates[1].voteCount).to.equal(1); // Bob
            expect(candidates[2].voteCount).to.equal(0); // Charlie
        });

        it("Should determine correct winner when election ends", async function () {
            await expect(votingContract.endElection(electionId))
                .to.emit(votingContract, "ElectionEnded")
                .withArgs(electionId, 1, 2); // Alice wins with 2 votes

            const election = await votingContract.getElectionDetails(electionId);
            expect(election.winnerId).to.equal(1);
            expect(election.isActive).to.be.false;
        });

        it("Should get complete results", async function () {
            await votingContract.endElection(electionId);

            const results = await votingContract.getResults(electionId);
            expect(results.winnerId).to.equal(1);
            expect(results.totalVotes).to.equal(3);
            expect(results.candidateList.length).to.equal(3);
        });
    });

    describe("Election History", function () {
        it("Should return all elections", async function () {
            const startTime1 = Math.floor(Date.now() / 1000) + 3600;
            const endTime1 = startTime1 + 86400;
            await votingContract.createElection("Election 1", startTime1, endTime1);

            const startTime2 = Math.floor(Date.now() / 1000) + 7200;
            const endTime2 = startTime2 + 86400;
            await votingContract.createElection("Election 2", startTime2, endTime2);

            const allElections = await votingContract.getAllElections();
            expect(allElections.length).to.equal(2);
            expect(allElections[0].name).to.equal("Election 1");
            expect(allElections[1].name).to.equal("Election 2");
        });
    });
});
