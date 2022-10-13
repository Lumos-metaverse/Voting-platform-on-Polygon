// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract Voting{

    struct Voter{
        uint weight;
        bool voted;
        uint vote;
    }

    uint public ReactVote;
    uint public VueVote;
    uint public AngularVote;

    address public chairperson;

    mapping(address => Voter) public Voters;

    string[] public candidates;

    constructor() public {
        candidates =["React","Vue","Angular"];
        chairperson = msg.sender;
        Voters[chairperson].weight = 1;
        ReactVote=0;
        VueVote=0;
        AngularVote=0;

    }

    function giveRight(address voter) public {
        // require(msg.sender==chairperson, "Only chairperson can give right to vote");
        require(!Voters[voter].voted, "The voter has already voted");
        require(Voters[voter].weight==0);
        Voters[voter].weight=1;
    }

    function vote(uint option) payable public {
        Voter storage sender = Voters[msg.sender];
        require(sender.weight != 0, "has no right to vote");
        require(!sender.voted, "has already voted");
        sender.voted=true;
        sender.vote=option;
        if(option==0){
            ReactVote++;
        }
        else if (option==1) {
            VueVote++;
        }
        else{
            AngularVote++;
        }
    }

    function winningCandidate() public view returns (string memory winningCandidate_){
        if(ReactVote > VueVote && ReactVote > AngularVote){
            winningCandidate_ = "React";
        }
        else if(VueVote > ReactVote && VueVote > AngularVote){
            winningCandidate_ = "Vue";
        }
        else{
            winningCandidate_ = "Angular";
        }
    }

}

