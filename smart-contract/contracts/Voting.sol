// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

    struct Voter {
        bool voted;
        uint vote;
        bool enrolled;
        uint weight;
    }

    struct Proposal {
        string name;
        uint voteCount;
    }

    address public chairperson;
    mapping(address => Voter) public voters;
    Proposal[] public proposals;
    uint public votingEndTime;
    uint public quorumPercentage;

    event VoteStarted(uint indexed endTime, uint quorumPercentage);
    event Voterenrolled(address indexed voter);
    event Voted(address indexed voter, uint indexed proposal, uint indexed voteCount);
    event WinnerDeclared(string indexed proposalName, uint indexed voteCount);
    event VotingEnded(uint indexed endTime);

    constructor(string[] memory proposalNames, uint duration, uint percentage) {
        chairperson = msg.sender;
        voters[chairperson].weight=1;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
        votingEndTime = block.timestamp + duration;
        quorumPercentage = percentage;
        emit VoteStarted(votingEndTime, quorumPercentage);
    }

    function6 register() public {
        require(msg.sender != chairperson, "chairperson can only give right to vote.");
        require(!voters[msg.sender].enrolled, "Voted already.");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
        voters[msg.sender].enrolled = true;
        emit Voterenrolled(msg.sender);
    }

    function vote(uint proposal) public {
        require(block.timestamp < votingEndTime, "end of voting time");
        require(sender.weight != 0, "Has no right to vote");
        require(voters[msg.sender].enrolled, "not enrolled to vote.");
        require(!voters[msg.sender].voted, "voted already.");
        voters[msg.sender].voted = true;
        voters[msg.sender].vote = proposal;
        proposals[proposal].voteCount++= sender.weight;
        emit Voted(msg.sender, proposal, proposals[proposal].voteCount);
    }

    function declareWinner() public {
        require(block.timestamp >= votingEndTime, "Voting is going on.");
        uint totalVotes = 0;
        for (uint i = 0; i < proposals.length; i++) {
            totalVotes += proposals[i].voteCount;
        }
        require(totalVotes > 0, "No votes casted as of now.");
        uint quorum = (totalVotes * quorumPercentage) / 100;
        uint winningProposal = 0;
        uint winningVoteCount = 0;
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningProposal = i;
                winningVoteCount = proposals[i].voteCount;
            }
        }
        require(winningVoteCount >= quorum, "Not satisfied Quorum .");
        emit WinnerDeclared(proposals[winningProposal].name, winningVoteCount);
    }

    function endVoting() public {
        require(msg.sender == chairperson, "chairperson has the right to end the voting.");
        require(block.timestamp >= votingEndTime, "Voting is going on.");
        emit VotingEnded(votingEndTime);
    }

    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }

    function getProposal(uint index) public view returns (string memory, uint) {
        require(index < proposals.length, " index out of bound.");
        return (proposals[index].name, proposals[index].voteCount);
    }

    function hasVoted() public view returns (bool) {
        return voters[msg.sender].voted;
    }

    function getVoterVote() public view returns (uint) {
    require(voters[msg.sender].voted, "Hurry! go and vote.");
    return voters[msg.sender].vote;
}

function isenrolled(address voter) public view returns (bool) {
    return voters[voter].enrolled;
}


}

