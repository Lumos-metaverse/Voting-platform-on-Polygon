import React, {useEffect, useState, useContext} from 'react';
import { VotingContext } from '../context/VotingContext'


export default function Popup(props) {
  return (
    <div className='mt-10'>
        <div className=' font-bold bg-sky-200 p-5'>
            <p className='bg-white p-5'>{`React Votes :- ${props.react} `}</p>
            <p className='bg-white p-5'>{`Vue Votes :- ${props.vue} `}</p>
            <p className='bg-white p-5'>{`Angular Votes :- ${props.angular} `}</p>
            <p className='bg-white p-5'>{`Svelte Votes :- ${props.svelte} `}</p>
            <p className='bg-white p-5'>{`BlackBone Votes :- ${props.blackbone} `}</p>
        </div>
    </div>
  )
}
