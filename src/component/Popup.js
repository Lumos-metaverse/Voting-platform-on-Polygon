import React, {useEffect, useState, useContext} from 'react';
import { VotingContext } from '../context/VotingContext'


export default function Popup() {
    const {winner} = useContext(VotingContext)
  return (
    <div className='absolute z-20 h-full  left-[35%] top-1/2'>
        <div className=' text-5xl font-bold bg-sky-200 p-5'>
            <h1 className='bg-zinc-200/50 p-5'>{winner} is winning!</h1>
        </div>
    </div>
  )
}
