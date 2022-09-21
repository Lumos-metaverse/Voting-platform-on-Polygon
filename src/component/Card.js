import React from 'react'

function Card({ img, title, description }) {
  return (
    <div className='border p-4 rounded-md flex flex-col justify-between items-center shadow-md my-8 w-4/5 mx-auto'>
      <img src={img} alt="" className='rounded-md' />
      <h1 className='font-bold text-xl py-2'>{title}</h1>
      <p className='font-medium text-center py-2'>{description}</p>
      <button className='font-bold border w-fit px-4 py-2 rounded-md text-lg hover:bg-gray-600 hover:text-white'>Vote</button>
    </div>
  )
}

export default Card