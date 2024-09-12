import React from 'react'
import he from 'he'

function Question(props) {
    const [shuffledAnswers, setShuffledAnswers] = React.useState([])

    React.useEffect(() => {
        const answers = [...props.incorrect_answers, props.correct_answer]
        const shuffled = answers.sort(() => Math.random() - 0.5)
        setShuffledAnswers(shuffled)
    }, [props.incorrect_answers, props.correct_answer])

    return (
        <form className='container-question'>
            <h2>{he.decode(props.question)}</h2>
            <div className='container-answers'>
                {shuffledAnswers.map((answer, index) => {
                    let styles = {}
                    if (props.answersChecked) {
                        if (answer === props.correct_answer) {
                            styles.backgroundColor = '#94D7A2'
                            styles.border = '1px solid #94D7A2'
                        } else if (props.userAnswers[props.questionIndex] === answer) {
                            styles.backgroundColor = '#F8BCBC'
                            styles.border = '1px solid #F8BCBC'
                        }
                    }
                    return (
                        <label
                            key={index}
                            style={ styles }
                        >
                            <input
                                type='radio'
                                name={`answer-${props.questionIndex}`}
                                id={`answer-${props.questionIndex}-${index}`}
                                value={he.decode(answer)}
                                onChange={props.handleChange}
                                checked={props.userAnswers[props.questionIndex] === he.decode(answer)}
                            />
                            {he.decode(answer)}
                        </label>
                    )
                })}
            </div>
            <hr />
        </form>
    )
}

export default Question
