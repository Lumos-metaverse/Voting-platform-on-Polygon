import React, { useEffect, useState, useContext } from "react";
import { VotingContext } from "../context/VotingContext";

function Card({ img, title, description, myOption, showwinner, idx, darkMode }) {
  const { connectWallet, clickHandler, setWinner, winner, sendVote } = useContext(VotingContext);
  const [data, setData] = useState("");
  const [swipe, setSwipe] = useState(true);

  const cardBgColor = darkMode ? "#2d2d2d" : "white";
  const cardTextColor = darkMode ? "white" : "#4a4a4a";
  const voteButtonBgColor = darkMode ? "#1f2937" : "#f3f4f6";
  const voteButtonTextColor = darkMode ? "#d1d5db" : "#374151";
  const voteButtonBorderColor = darkMode ? "#1f2937" : "#3b82f6";
  return (
    <div
      onMouseEnter={() => setSwipe(false)}
      onMouseLeave={() => setSwipe(true)}
      className={`flex flex-col ${swipe ? "justify-center shadow-none" : "shadow-lg"} w-[90%] lg:w-[40%] md:flex-row bg-${cardBgColor} rounded-lg mt-4 transition-all duration-700 ease-in-out`}
    >
      <div
        className={`max-h-full ${swipe ? "z-50" : "z-0"} w-auto md:w-1/2 flex justify-center lg:w-full transition-all duration-700 ease-in-out`}
      >
        <img
          className={`inset-0 ${swipe ? (idx % 2 === 0 ? "rounded-lg lg:ml-[200px]" : "rounded-lg lg:ml-[300px]") : "rounded-l-lg"} h-full w-full object-cover object-center transition duration-700 ease-in-out hover:scale-110`}
          src={img}
        />
      </div>
      <div
        className={`lg:w-1/2 py-4 px-6 ${swipe ? "text-transparent" : cardTextColor} lg:relative ${swipe ? "lg:-left-80" : "lg:left-0"} flex flex-col justify-between transition-all duration-700 ease-in-out`}
      >
        <h3 className="font-semibold text-lg text-center leading-tight truncate">{title}</h3>
        <p className={`mt-2 ${swipe ? "" : "opacity-100"} transition-all duration-700 ease-in-out`}>{description}</p>
        <div className="flex justify-center items-center my-5">
  <button
    onClick={(e) => {
      setData(myOption);
      showwinner(true);
      setWinner(myOption);
      sendVote(myOption);
    }}
    className={`bg-transparent  ${swipe ? "text-transparent" : voteButtonTextColor} font-semibold py-3 px-6 border ${swipe && darkMode ? "border-0" : `border ${voteButtonBorderColor}`} rounded transition-all duration-700 ease-in-out text-blue-700`}
    style={{
      backgroundColor: swipe ? "" : voteButtonBgColor,
      border: swipe ? "none" : `1px solid ${voteButtonBorderColor}`,
      boxShadow: swipe ? "none" : "0 0 0 2px rgba(59, 130, 246, 0.5)",
      color: swipe ? "transparent" : voteButtonTextColor,
      transition: "all 0.3s ease",
      ":hover": {
        backgroundColor: "#3b82f6",
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
        color: "#fff",
      },
    }}
  >
    Vote
  </button>
</div>

      </div>
    </div>
  );
}

export default Card;
