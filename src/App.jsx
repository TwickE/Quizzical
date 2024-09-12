import React from 'react'
import blob1 from './assets/blob1.svg'
import blob2 from './assets/blob2.svg'

function App() {
    const [gameStarted, setGameStarted] = React.useState(false)
    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then((response) => response.json())
            .then((data) => {
                setQuestions(JSON.stringify(data.results))
            })
    }, [])


    return (
        <main>
            <img className='blob1' src={blob1} alt="blob1" />
            <img className='blob2' src={blob2} alt="blob2" />
            {
                gameStarted ? (
                    <p>{questions}</p>
                ) : (
                    <section className='container-start-game'>
                        <h1>Quizzical</h1>
                        <p>A quizz about everything!!!</p>
                        <button onClick={() => setGameStarted(true)}>Start Quiz</button>
                    </section>
                )
            }
        </main>
    )
}

export default App
