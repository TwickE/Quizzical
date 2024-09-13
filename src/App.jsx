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

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data.results)
            })
    }, [])

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

    return (
        <main>
            <img className='blob1' src={blob1} alt="blob1" />
            <img className='blob2' src={blob2} alt="blob2" />
            {
                gameStarted ? (
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
                        {answersChecked && <p>You scored {score}/{questions.length} correct answers</p>}
                        <button onClick={checkAnswers} className='btn-quiz'>{answersChecked ? 'Play Again' : 'Check Answers'}</button>
                    </section>
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
