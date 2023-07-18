import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { VOTING_ABI, VOTING_ADDRESS } from "../utils/constants";

export const VotingContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = await  provider.getSigner();

	const VotingContract = new ethers.Contract(
		VOTING_ADDRESS,
		VOTING_ABI,
		signer
	);
	
	return VotingContract;
};

export const VotingProvider = ({ children }) => {
	const [currentAccount, setcurrentAccount] = useState("");
	const [option, setOption] = useState("");
	const [winner, setWinner] = useState("");

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please connect to a metamask wallet");

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			
			setcurrentAccount(accounts[0]);
			// window.location.reload();
		} catch (error) {
			
			throw new error("No ethereum object");
		}
		
	};
	const checkifWalletConnected=async()=>{
        try{
            if(!window.ethereum){
                return "Install Metamask";
            }
            const accounts=await window.ethereum.request({
                method:"eth_accounts",
            });

            if(accounts.length){
				setcurrentAccount(accounts[0]);
            }
            else{
                return "No Account";
            }

        }
        catch(e){
           return "not Connected";
        }
    };
	useEffect(()=>{
        checkifWalletConnected();
    },[ethereum]);

	const givePermission = async () => {
		try {
			if (!ethereum) return alert("Please connect to a metamask wallet");
			const VotingContract = await getEthereumContract();
			
			await VotingContract.giveRight(currentAccount);
			
			// window.location.reload();
		} catch (error) {
			console.log(error);
			// throw new error("No ethereum object");
		}
	};

	const sendVote = async (option) => {
		try{
			if (!ethereum) return alert("Please connect to a metamask wallet");
			const VotingContract = await getEthereumContract();
			const VoteHash = await VotingContract.vote(option,{gasLimit:300000,});
		}
		catch(e){
			console.log(e);
		}
		// console.log(VoteHash);
	};

	const getWinner = async () => {
		if (!ethereum) return alert("Please connect to a metamask wallet");
		const VotingContract = getEthereumContract();
		const winner = await VotingContract.winningCandidate();
		setWinner(VotingContract.winningCandidate());
		
	};

	const getReactVote =async() => {
		const VotingContract = await getEthereumContract();
		return await VotingContract.ReactVote();
	};

	const getVueVote =async () => {
		const VotingContract = await getEthereumContract();
		return VotingContract.VueVote();
	};
	const getAngularVote =async () => {
		const VotingContract =await getEthereumContract();
		return VotingContract.AngularVote();
	};
	const getSvelteVote=async()=>{
		const VotingContract =await getEthereumContract();
		return VotingContract.SvelteVote();
	};
	const getBackBoneVote =async () => {
		const VotingContract =await  getEthereumContract();
		return VotingContract.BackBoneVote();
	};

	useEffect(() => {
		// getEthereumContract();
		givePermission();
	}, [currentAccount]);

	return (
		<VotingContext.Provider
			value={{
				getReactVote,
				getVueVote,
				getAngularVote,
				getSvelteVote,
				getBackBoneVote,
				sendVote,
				connectWallet,
				option,
				setOption,
				currentAccount,
				givePermission,
				winner,
				setWinner,
			}}
		>
			{children}
		</VotingContext.Provider>
	);
};
