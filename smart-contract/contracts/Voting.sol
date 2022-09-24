//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.0 <0.9.0;

contract Voting{

    uint public ReactVote = 0;
    uint public VueVote = 0;
    uint public AngularVote = 0;

    struct Voter{
        bool voted ;
        uint voteIndex;
        string optionChosen;
    }

    // event WinnerFound();

    mapping (address=>Voter) public Voters;

    string[] public Options=["React", "Vue", "Angular"];

    function canVote(address voter) view public {
        require(
            Voters[voter].voted == false, "You Have Already Voted"
        );
    }

    function finalVote(address voter, string memory option) public {
        canVote(voter);
        Voters[voter].optionChosen = option;
        if(keccak256(abi.encodePacked(option)) == keccak256("React")){
            ReactVote++;
        }else if(keccak256(abi.encodePacked(option)) == keccak256("Vue")){
            VueVote++;
        }else{
            AngularVote++;
        }
        !Voters[voter].voted;
    }

    function Winner() public view returns(string memory){
        if(ReactVote>VueVote && ReactVote>AngularVote){
            return "React";
        }else if(VueVote>ReactVote && VueVote>AngularVote){
            return  "Vue";
        }else{
            return "Angular";
        }

        // emit WinnerFound();
    }

    




}