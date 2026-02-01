// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title VotingContract
 * @dev Decentralized voting system with admin controls and voter authentication
 * @notice This contract enables transparent, tamper-proof elections on the blockchain
 */
contract VotingContract {
    
    // ============ State Variables ============
    
    address public admin;
    uint256 public electionCount;
    
    // ============ Structs ============
    
    struct Candidate {
        uint256 id;
        string name;
        string party;
        uint256 voteCount;
    }
    
    struct Election {
        uint256 id;
        string name;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        uint256 totalVotes;
        uint256 candidateCount;
        uint256 winnerId;
    }
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedCandidateId;
    }
    
    // ============ Mappings ============
    
    // electionId => Election
    mapping(uint256 => Election) public elections;
    
    // electionId => candidateId => Candidate
    mapping(uint256 => mapping(uint256 => Candidate)) public candidates;
    
    // electionId => voterAddress => Voter
    mapping(uint256 => mapping(address => Voter)) public voters;
    
    // ============ Events ============
    
    event ElectionCreated(
        uint256 indexed electionId,
        string name,
        uint256 startTime,
        uint256 endTime
    );
    
    event CandidateAdded(
        uint256 indexed electionId,
        uint256 indexed candidateId,
        string name,
        string party
    );
    
    event VoterRegistered(
        uint256 indexed electionId,
        address indexed voter
    );
    
    event VoteCast(
        uint256 indexed electionId,
        address indexed voter,
        uint256 indexed candidateId
    );
    
    event ElectionEnded(
        uint256 indexed electionId,
        uint256 winnerId,
        uint256 winningVotes
    );
    
    // ============ Modifiers ============
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier electionExists(uint256 _electionId) {
        require(_electionId > 0 && _electionId <= electionCount, "Election does not exist");
        _;
    }
    
    modifier electionActive(uint256 _electionId) {
        Election memory election = elections[_electionId];
        require(election.isActive, "Election is not active");
        require(block.timestamp >= election.startTime, "Election has not started yet");
        require(block.timestamp <= election.endTime, "Election has ended");
        _;
    }
    
    modifier onlyRegisteredVoter(uint256 _electionId) {
        require(voters[_electionId][msg.sender].isRegistered, "You are not registered for this election");
        _;
    }
    
    modifier hasNotVoted(uint256 _electionId) {
        require(!voters[_electionId][msg.sender].hasVoted, "You have already voted");
        _;
    }
    
    // ============ Constructor ============
    
    constructor() {
        admin = msg.sender;
        electionCount = 0;
    }
    
    // ============ Admin Functions ============
    
    /**
     * @dev Create a new election
     * @param _name Name of the election
     * @param _startTime Unix timestamp for election start
     * @param _endTime Unix timestamp for election end
     */
    function createElection(
        string memory _name,
        uint256 _startTime,
        uint256 _endTime
    ) public onlyAdmin {
        require(_startTime < _endTime, "Start time must be before end time");
        require(_endTime > block.timestamp, "End time must be in the future");
        
        electionCount++;
        
        elections[electionCount] = Election({
            id: electionCount,
            name: _name,
            startTime: _startTime,
            endTime: _endTime,
            isActive: true,
            totalVotes: 0,
            candidateCount: 0,
            winnerId: 0
        });
        
        emit ElectionCreated(electionCount, _name, _startTime, _endTime);
    }
    
    /**
     * @dev Add a candidate to an election
     * @param _electionId ID of the election
     * @param _name Name of the candidate
     * @param _party Political party of the candidate
     */
    function addCandidate(
        uint256 _electionId,
        string memory _name,
        string memory _party
    ) public onlyAdmin electionExists(_electionId) {
        Election storage election = elections[_electionId];
        require(block.timestamp < election.startTime, "Cannot add candidates after election starts");
        
        election.candidateCount++;
        uint256 candidateId = election.candidateCount;
        
        candidates[_electionId][candidateId] = Candidate({
            id: candidateId,
            name: _name,
            party: _party,
            voteCount: 0
        });
        
        emit CandidateAdded(_electionId, candidateId, _name, _party);
    }
    
    /**
     * @dev Register a voter for an election
     * @param _electionId ID of the election
     * @param _voterAddress Wallet address of the voter
     */
    function registerVoter(
        uint256 _electionId,
        address _voterAddress
    ) public onlyAdmin electionExists(_electionId) {
        require(!voters[_electionId][_voterAddress].isRegistered, "Voter already registered");
        
        voters[_electionId][_voterAddress] = Voter({
            isRegistered: true,
            hasVoted: false,
            votedCandidateId: 0
        });
        
        emit VoterRegistered(_electionId, _voterAddress);
    }
    
    /**
     * @dev Manually end an election
     * @param _electionId ID of the election
     */
    function endElection(uint256 _electionId) public onlyAdmin electionExists(_electionId) {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election already ended");
        
        election.isActive = false;
        
        // Calculate winner
        uint256 winningVoteCount = 0;
        uint256 winnerId = 0;
        
        for (uint256 i = 1; i <= election.candidateCount; i++) {
            if (candidates[_electionId][i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[_electionId][i].voteCount;
                winnerId = i;
            }
        }
        
        election.winnerId = winnerId;
        
        emit ElectionEnded(_electionId, winnerId, winningVoteCount);
    }
    
    // ============ Voter Functions ============
    
    /**
     * @dev Cast a vote for a candidate
     * @param _electionId ID of the election
     * @param _candidateId ID of the candidate
     */
    function castVote(
        uint256 _electionId,
        uint256 _candidateId
    ) public 
        electionExists(_electionId)
        electionActive(_electionId)
        onlyRegisteredVoter(_electionId)
        hasNotVoted(_electionId)
    {
        Election storage election = elections[_electionId];
        require(_candidateId > 0 && _candidateId <= election.candidateCount, "Invalid candidate");
        
        // Mark voter as voted
        voters[_electionId][msg.sender].hasVoted = true;
        voters[_electionId][msg.sender].votedCandidateId = _candidateId;
        
        // Increment candidate vote count
        candidates[_electionId][_candidateId].voteCount++;
        
        // Increment total votes
        election.totalVotes++;
        
        emit VoteCast(_electionId, msg.sender, _candidateId);
    }
    
    // ============ View Functions ============
    
    /**
     * @dev Get election details
     * @param _electionId ID of the election
     */
    function getElectionDetails(uint256 _electionId) 
        public 
        view 
        electionExists(_electionId) 
        returns (
            uint256 id,
            string memory name,
            uint256 startTime,
            uint256 endTime,
            bool isActive,
            uint256 totalVotes,
            uint256 candidateCount,
            uint256 winnerId
        ) 
    {
        Election memory election = elections[_electionId];
        return (
            election.id,
            election.name,
            election.startTime,
            election.endTime,
            election.isActive,
            election.totalVotes,
            election.candidateCount,
            election.winnerId
        );
    }
    
    /**
     * @dev Get all candidates for an election
     * @param _electionId ID of the election
     */
    function getCandidates(uint256 _electionId) 
        public 
        view 
        electionExists(_electionId) 
        returns (Candidate[] memory) 
    {
        uint256 count = elections[_electionId].candidateCount;
        Candidate[] memory candidateList = new Candidate[](count);
        
        for (uint256 i = 0; i < count; i++) {
            candidateList[i] = candidates[_electionId][i + 1];
        }
        
        return candidateList;
    }
    
    /**
     * @dev Get voter status
     * @param _electionId ID of the election
     * @param _voterAddress Address of the voter
     */
    function getVoterStatus(uint256 _electionId, address _voterAddress) 
        public 
        view 
        electionExists(_electionId) 
        returns (
            bool isRegistered,
            bool hasVoted,
            uint256 votedCandidateId
        ) 
    {
        Voter memory voter = voters[_electionId][_voterAddress];
        return (voter.isRegistered, voter.hasVoted, voter.votedCandidateId);
    }
    
    /**
     * @dev Get all elections
     */
    function getAllElections() public view returns (Election[] memory) {
        Election[] memory allElections = new Election[](electionCount);
        
        for (uint256 i = 0; i < electionCount; i++) {
            allElections[i] = elections[i + 1];
        }
        
        return allElections;
    }
    
    /**
     * @dev Get election results
     * @param _electionId ID of the election
     */
    function getResults(uint256 _electionId) 
        public 
        view 
        electionExists(_electionId) 
        returns (
            Candidate[] memory candidateList,
            uint256 winnerId,
            uint256 totalVotes
        ) 
    {
        Election memory election = elections[_electionId];
        candidateList = getCandidates(_electionId);
        
        return (candidateList, election.winnerId, election.totalVotes);
    }
}
