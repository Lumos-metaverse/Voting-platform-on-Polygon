import React, { useEffect, useState, useContext } from "react";
import { VotingContext } from "../context/VotingContext";

function Card({ img, title, description, myOption, showwinner, idx }) {
  const { connectWallet, clickHandler, setWinner, winner, sendVote } =
    useContext(VotingContext);
  const [data, setData] = useState("");
  const [swipe, setswipe] = useState(true);

  return (
    <div
      onMouseEnter={() => setswipe(false)}
      onMouseLeave={() => setswipe(true)}
      class={`flex flex-col ${
        swipe ? "justify-center shadow-none" : "shadow-lg"
      } w-[90%] lg:w-[40%] md:flex-row bg-white shadow-lg rounded-lg mt-4 transition-all duration-700 ease-in-out`}
    >
      <div
        class={`max-h-full ${
          swipe ? "z-50" : "z-0"
        } w-auto md:w-1/2 flex justify-center lg:w-full transition-all duration-700 ease-in-out`}
      >
        <img
          class={`inset-0 ${
            swipe
              ? idx % 2 === 0
                ? "rounded-lg lg:ml-[200px]"
                : "rounded-lg lg:ml-[300px]"
              : "rounded-l-lg"
          } h-full w-full object-cover object-center transition duration-700 ease-in-out hover:scale-110`}
          src={img}
        />
      </div>
      <div
        class={`lg:w-1/2 py-4 px-6 ${
          swipe ? "lg:text-white" : "text-gray-800"
        } lg:relative ${
          swipe ? "lg:-left-80" : "lg:left-0"
        } flex flex-col justify-between transition-all duration-700 ease-in-out`}
      >
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
            class={`bg-transparent hover:bg-blue-500 ${
              swipe ? "lg:text-white" : "text-blue-700"
            } font-semibold hover:text-white py-2 px-24 border ${
              swipe ? "lg:border-white" : "border-blue-500"
            } hover:border-transparent rounded transition-all border-blue-500 text-blue-700 duration-700 ease-in-out`}
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
