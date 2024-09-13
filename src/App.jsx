import React from 'react'
import blob1 from './assets/blob1.svg'
import blob2 from './assets/blob2.svg'
import Question from './Question'

function App() {
    const [gameStarted, setGameStarted] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState({})
    const [answersChecked, setAnswersChecked] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        if (gameStarted) {
            setLoading(true)
            setError(null)
            fetch('https://opentdb.com/api.php?amount=5')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then((data) => {
                    setQuestions(data.results)
                    setLoading(false)
                })
                .catch((error) => {
                    setError(error.message)
                    setLoading(false)
                })
        }
    }, [gameStarted])

    const handleChange = (questionIndex, answer) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: answer
        }))
    }

    const checkAnswers = () => {
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correct_answer) {
                setScore(prevScore => prevScore + 1)
            }
        })
        setAnswersChecked(true)
    }

    const playAgain = () => {
        setGameStarted(false)
        setQuestions([])
        setUserAnswers({})
        setAnswersChecked(false)
        setScore(0)
    }

    return (
        <main>
            <img className='blob1' src={blob1} alt="blob1" />
            <img className='blob2' src={blob2} alt="blob2" />
            {
                gameStarted ? (
                    loading ? (
                        <div className='container-start-game'>
                            <h2>Loading...</h2>
                        </div>
                    ) : error ? (
                        <div className='container-start-game'>
                            <h2>Error: {error}</h2>
                            <button onClick={playAgain} className='btn-quiz'>Try Again</button>
                        </div>
                    ) : (
                    <section className='conatiner-questions'>
                        {questions.map((question, index) => (
                                <Question
                                    key={index} 
                                    question={question.question}
                                    incorrect_answers={question.incorrect_answers}
                                    correct_answer={question.correct_answer}
                                    handleChange={(e) => handleChange(index, e.target.value)}
                                    userAnswers={userAnswers}
                                    questionIndex={index}
                                    answersChecked={answersChecked}
                                />
                            ))}
                            <div className='container-btn-quiz'>
                                {answersChecked && <p>You scored {score}/{questions.length} correct answers</p>}
                                <button style={answersChecked ? {padding: '10px 30px'} : null} onClick={answersChecked ? playAgain : checkAnswers} className='btn-quiz'>{answersChecked ? 'Play Again' : 'Check Answers'}</button>
                            </div>
                        </section>
                    )
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