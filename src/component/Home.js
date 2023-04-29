import React, { useContext, useState } from "react";
import Card from "./Card";
import { VotingContext } from "../context/VotingContext";
import Popup from "./Popup";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal, Web3NetworkSwitch } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

const library = [
  {
    img: require("../assets/react.png"),
    title: "ReactJS",
    description:
      "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.",
    myOption: 0,
  },
  {
    img: require("../assets/vue.jpeg"),
    title: "VUE JS",
    description:
      "Vue builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.",
    myOption: 1,
  },
  {
    img: require("../assets/angular.jpg"),
    title: "Angular",
    description:
      "Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and primarily used to develop single-page applications.",
    myOption: 2,
  },
  {
    img: require("../assets/svelte.avif"),
    title: "Svelte",
    description:
      "Svelte is a radical new approach to building user interfaces.",
    myOption: 3,
  },
  {
    img: require("../assets/backbonejs.jpg"),
    title: "BackBone",
    description:
      "Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.",
    myOption: 4,
  },
];

function Home() {
  const {
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
  } = useContext(VotingContext);

  const [showwinner, setShowwinner] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showReactVotes, setShowReactVotes] = useState();
  const [showVueVotes, setShowVueVotes] = useState();
  const [showAngularVotes, setShowAngularVotes] = useState();
  const [showSvelteVotes, setShowSvelteVotes] = useState();
  const [showBackBoneVotes, setShowBackBoneVotes] = useState();
  const[darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const initialProcess = async () => {
    await connectWallet();
    await givePermission();
  };

  // for connecting wallets
  const projectId = "720630d25f0f3d66ac27243a1c5437ed";
  const chains = [mainnet];
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId }),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      version: "1",
      appName: "voting platform - Lumos",
      chains,
      projectId,
    }),
    provider,
  });

  const ethereumClient = new EthereumClient(wagmiClient, chains);

  const handleVotes = async () => {
    setShowReactVotes(await getReactVote());
    setShowVueVotes(await getVueVote());
    setShowAngularVotes(await getAngularVote());
    setShowSvelteVotes(await getSvelteVote());
    setShowBackBoneVotes(await getBackBoneVote());
    setShowPopUp(true);
  };

  return (
    <div className={`flex flex-col justify-center bg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-end pr-4 pt-4">
        <button
          className={`p-2 rounded-full ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          onClick={handleDarkModeToggle}
        >
          {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center py-6">
        Vote for Your Favourite JS Library
      </h1>

      {/* button for wallet  */}
      <div className="flex flex-col justify-center items-center">
        <WagmiConfig client={wagmiClient}>
          <Web3Button />
        </WagmiConfig>

        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          themeBackground={"gradient"}
          themeColor={"orange"}
        />
      </div>

      <div
        className={
          !showwinner
            ? `hidden`
            : "flex flex-col justify-center items-center mt-12"
        }
      >
        <button
          type="button"
          onClick={handleVotes}
          className="font-bold border-2 w-fit px-4 py-2 rounded-md text-lg transition duration-300 hover:bg-gray-600 hover:text-white"
        >
          Show Votes
        </button>
        {showPopUp && (
          <Popup
            react={parseInt(showReactVotes._hex, 16)}
            vue={parseInt(showVueVotes._hex, 16)}
            angular={parseInt(showAngularVotes._hex, 16)}
            svelte={parseInt(showSvelteVotes._hex, 16)}
            backbone={parseInt(showBackBoneVotes._het, 16)}
          />
        )}
      </div>
      <div
        className={
          showwinner
            ? `hidden`
            : `flex flex-col mb-10 lg:flex-row flex-wrap lg:items-stretch items-center justify-center gap-10`
        }
      >
        {library.map((lib, index) => (
          <Card
            idx={index + 1}
            key={lib.title}
            img={lib.img}
            title={lib.title}
            description={lib.description}
            myOption={lib.myOption}
            showwinner={setShowwinner}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
