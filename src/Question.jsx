import React from 'react'
import he from 'he'

function Question(props) {
    const answers = [...props.incorrect_answers, props.correct_answer]
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5)

    return (
        <form className='container-question'>
            <h2>{he.decode(props.question)}</h2>
            <div className='container-answers'>
                {shuffledAnswers.map((answer, index) => (
                    <label key={index}>
                        <input
                            type='radio'
                            name='answer'
                            id={index}
                            value={he.decode(answer)}
                            key={index}
                        />
                        {he.decode(answer)}
                    </label>
                ))}
            </div>
            <hr />
        </form>
    )
}

export default Question
