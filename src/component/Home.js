import React from 'react'
import Card from './Card'

const library = [
    {
        img: require('../assets/react.png'),
        title: "ReactJS",
        description: "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.",
    },
    {
        img: require('../assets/vue.jpeg'),
        title: "VUE JS",
        description: "Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.",
    },
    {
        img: require('../assets/angular.jpg'),
        title: "Angular",
        description: "Angular is an open-source, JavaScript framework written in TypeScript. Google maintains it, and primarily used to develop single-page applications.",
    },
]

function Home() {
    return (
        <div className='flex flex-col justify-center bg'>
            <h1 className='text-4xl font-bold text-center py-12'>Vote for Your Favourite JS Library</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {library.map((lib) => (
                    <Card key={lib.title} img={lib.img} title={lib.title} description={lib.description} />
                ))}
            </div>
        </div>
    )
}

export default Home


