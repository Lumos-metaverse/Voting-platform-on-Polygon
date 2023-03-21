import React, { useEffect, useState, useContext } from "react";
import { VotingContext } from "../context/VotingContext";

function Card({ img, title, description, myOption, showwinner }) {
  const { connectWallet, clickHandler, setWinner, winner, sendVote } =
    useContext(VotingContext);
  const [data, setData] = useState("");

  return (
    <div class="flex flex-col w-[95%] lg:w-[40%] md:flex-row bg-white rounded-lg shadow-2xl mt-4">
      <div class="h-full w-auto md:w-1/2">
        <img
          class="inset-0 rounded-l-lg h-full w-full object-cover object-center"
          src={img}
        />
      </div>
      <div class="lg:w-1/2 py-4 px-6 text-gray-800 flex flex-col justify-between">
        <h3 class="font-semibold text-lg text-center leading-tight truncate">
          {title}
        </h3>
        <p class="mt-2">{description}</p>
        <div class="flex justify-center items-center my-5">
          <button
            onClick={(e) => {
              setData(myOption);
              showwinner(true);
              setWinner(myOption);
              sendVote(myOption);
            }}
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-24 border border-blue-500 hover:border-transparent rounded"
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
