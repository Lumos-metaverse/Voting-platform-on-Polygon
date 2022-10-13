import React, {useEffect, useState, useContext} from 'react';
import { VotingContext } from '../context/VotingContext'


function Card({ img, title, description, myOption, showwinner }) {

  const {connectWallet, clickHandler, setWinner, winner, sendVote} = useContext(VotingContext)
  const [data, setData] = useState("")

  


  return (
    <div className='border p-4 rounded-md flex flex-col justify-between items-center shadow-md my-8 w-4/5 mx-auto'>
      <img src={img} alt="" className='rounded-md' />
      <h1 className='font-bold text-xl py-2'>{title}</h1>
      <p className='font-medium text-center py-2'>{description}</p>
      
      <button className='font-bold border w-fit px-4 py-2 rounded-md text-lg transition duration-300 hover:bg-gray-600 hover:text-white' onClick={(e)=>{setData(myOption);console.log(myOption);showwinner(true);setWinner(myOption); sendVote(myOption)}}>Vote</button>
    </div>
  )
}

export default Card