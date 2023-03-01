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
    uint public SvelteVote;
    uint public BackBoneVote;

    address public chairperson;

    mapping(address => Voter) public Voters;

    string[] public candidates;

    constructor() public {
        candidates =["React","Vue","Angular", "Svelte", "BackBone"];
        chairperson = msg.sender;
        Voters[chairperson].weight = 1;
        ReactVote=0;
        VueVote=0;
        AngularVote=0;
        SvelteVote=0;
        BackBoneVote=0;

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
        else if (option==2){
            AngularVote++;
        }
        else if(option==3){
            SvelteVote++;
        }
        else{
            BackBoneVote++;
        }

    }

    function winningCandidate() public view returns (string memory winningCandidate_){
        if(ReactVote > VueVote && ReactVote > AngularVote && ReactVote > SvelteVote && ReactVote > BackBoneVote){
            winningCandidate_ = "React";
        }
        else if(VueVote > ReactVote && VueVote > AngularVote && VueVote > SvelteVote && VueVote > BackBoneVote){
            winningCandidate_ = "Vue";
        }
        else if(AngularVote > ReactVote && AngularVote > VueVote && AngularVote > SvelteVote && AngularVote > BackBoneVote){
            winningCandidate_ = "Angular";
        }
        else if(SvelteVote > ReactVote && SvelteVote > VueVote && SvelteVote > AngularVote && SvelteVote > BackBoneVote){
            winningCandidate_ = "Svelte";
        }
        else{
            winningCandidate_ = "BackBone";
        }
    }

}

