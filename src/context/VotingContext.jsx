import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {VOTING_ABI, VOTING_ADDRESS} from '../utils/constants';

export const VotingContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const VotingContract = new ethers.Contract(VOTING_ADDRESS, VOTING_ABI, signer);
    return VotingContract;
}

export const VotingProvider = ({children}) =>{

    const [currentAccount, setcurrentAccount] = useState("");
    const [option, setOption] = useState("");
    const [winner, setWinner] = useState("");

   



    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please connect to a metamask wallet');

            const accounts = await ethereum.request({method:'eth_requestAccounts',}) 
            setcurrentAccount(accounts[0]);
            // window.location.reload();
        } catch (error) {
            console.log(error);
            throw new error('No ethereum object');
        }
    };

    const givePermission = async () => {
        try {
            if(!ethereum) return alert('Please connect to a metamask wallet');
            const VotingContract =  getEthereumContract();
            VotingContract.giveRight(currentAccount);
            console.log("Permission given");
            // window.location.reload();
        } catch (error) {
            console.log(error);
            throw new error('No ethereum object');
        }
    }


    const sendVote = async (option) => {
        if(!ethereum) return alert('Please connect to a metamask wallet');
        const VotingContract =  getEthereumContract();
        const VoteHash = await VotingContract.vote(option);
        console.log(VoteHash);
        
    }

    const getWinner = async () => {
        if(!ethereum) return alert('Please connect to a metamask wallet');  
        const VotingContract =  getEthereumContract();    
        const winner = await VotingContract.winningCandidate();
        setWinner(VotingContract.winningCandidate());
        console.log(winner);
    }

    const getReactVote = () => {
        const VotingContract =  getEthereumContract();
        return VotingContract.ReactVote();
    }

    const getVueVote = () => {
        const VotingContract =  getEthereumContract();
        return VotingContract.VueVote();
    }
    const getAngularVote = () => {
        const VotingContract =  getEthereumContract();
        return VotingContract.AngularVote();
    }
    const getSvelteVote = () => {
        const VotingContract=  getEthereumContract();
        return VotingContract.SvelteVote();
    }
    const getBackBoneVote = () => {
        const VotingContract = getEthereumContract();
        return VotingContract.BackBoneVote();
    }


    useEffect(() => {
      
        // getEthereumContract();
      givePermission();
    }, [currentAccount])
    

    return(
        <VotingContext.Provider value={{ getReactVote, getVueVote, getAngularVote,getSvelteVote, getBackBoneVote, sendVote,connectWallet,option, setOption, currentAccount, givePermission, winner, setWinner}}>
            {children}
        </VotingContext.Provider>
    )
}
