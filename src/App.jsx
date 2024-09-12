import React from 'react'
import blob1 from './assets/blob1.svg'
import blob2 from './assets/blob2.svg'

function App() {
    const [gameStarted, setGameStarted] = React.useState(false)

    return (
        <main>
            <img className='blob1' src={blob1} alt="blob1" />
            <img className='blob2' src={blob2} alt="blob2" />
            {
                gameStarted ? (
                    <h1>Game Started</h1>
                ) : (
                    <section className='container-start-game'>
                        <h1>Quizzical</h1>
                        <p>A quizz about something???</p>
                        <button onClick={() => setGameStarted(true)}>Start Quiz</button>
                    </section>
                )
            }
        </main>
    )
}

export default App
