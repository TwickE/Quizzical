import React from 'react'
import he from 'he'

function Question(props) {
    const answers = [...props.incorrect_answers, props.correct_answer]
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5)

    return (
        <div className='container-question'>
            <h2>{he.decode(props.question)}</h2>
            {shuffledAnswers.map((answer, index) => (
                <button key={index}>{he.decode(answer)}</button>
            ))}
            <hr />
        </div>
    )
}

export default Question
