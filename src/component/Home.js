import React,{useContext, useState} from 'react'
import Card from './Card'
import { VotingContext } from '../context/VotingContext'
import Popup from './Popup'

const library = [
    {
        img: require('../assets/react.png'),
        title: "ReactJS",
        description: "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.",
        myOption: 0
    },
    {
        img: require('../assets/vue.jpeg'),
        title: "VUE JS",
        description: "Vue builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.",
        myOption: 1
        

    },
    {
        img: require('../assets/angular.jpg'),
        title: "Angular",
        description: "Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and primarily used to develop single-page applications.",
        myOption: 2

    },
]

function Home() {
    const {getReactVote, getVueVote, getAngularVote, connectWallet, currentAccount,sendVote, option, setOption, givePermission, winner} = useContext(VotingContext)

    const [showwinner, setShowwinner] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)
    const [showReactVotes, setShowReactVotes] = useState()
    const [showVueVotes, setShowVueVotes] = useState()
    const [showAngularVotes, setShowAngularVotes] = useState()

    const initialProcess = async () => {
        await connectWallet()
        await givePermission()
    }

    const handleVotes = async() => {
        setShowReactVotes(await getReactVote());
        setShowVueVotes(await getVueVote());
        setShowAngularVotes(await getAngularVote());
        setShowPopUp(true);
    }

    
    

    return (
        <div className='flex flex-col justify-center bg'>
            <h1 className='text-4xl font-bold text-center py-6'>Vote for Your Favourite JS Library</h1>
            {currentAccount ? (
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-2xl font-bold text-center py-4'>Connected with {currentAccount}</h1>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-2xl font-bold text-center pb-4'>Connect Wallet to Vote</h1>
                    <button type="button" onClick={initialProcess} className='font-bold border-2 w-fit px-4 py-2 rounded-md text-lg transition duration-300 hover:bg-gray-600 hover:text-white'>Connect Wallet</button>
                </div>
            )}
              <div className={!showwinner ? `hidden` :'flex flex-col justify-center items-center mt-12'}>
                    <button type="button" onClick={handleVotes} className='font-bold border-2 w-fit px-4 py-2 rounded-md text-lg transition duration-300 hover:bg-gray-600 hover:text-white'>Show Votes</button>
                    {showPopUp && <Popup react={parseInt(showReactVotes._hex, 16)} vue={parseInt(showVueVotes._hex, 16)} angular={parseInt(showAngularVotes._hex, 16)}/>}
                </div>
            <div className={ showwinner ? `hidden`:`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
                {library.map((lib) => (
                    <Card key={lib.title} img={lib.img} title={lib.title} description={lib.description} myOption={lib.myOption} showwinner={setShowwinner} />

                ))}
            </div>
            
        </div>
    )
}

export default Home


