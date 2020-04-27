import React from 'react'
import Button from 'part:@sanity/components/buttons/default'
import Leaderboard from './Leaderboard'
import AnswerGraph from './AnswerGraph'
import styles from '../styles/Results.css'
import Icons from '../Icons'
import Squizzy from '../Squizzy'

class Results extends React.Component {
  render() {
    const {match, onKickPlayer} = this.props
    if (!match) {
      return null
    }
    const {quiz, currentQuestionKey} = match

    const currentQuestion = quiz.questions.find(question => question._key === currentQuestionKey)
    const choicesOnCurrentQuestion = currentQuestion.choices
    const handleKickPlayer = playerId => onKickPlayer(playerId)

    const correctChoices = choicesOnCurrentQuestion
      .map((choice, index) => ({...choice, index}))
      .filter(choice => choice.isCorrect)
    const titleLength = currentQuestion.title.split('').length
    return (
      <div className={styles.root}>
        <div className={styles.graph}>
          <div>
            <Squizzy mouth="happy" className={styles.resultSquizzy} />
            <p className={styles.label}>Question</p>
            <h2 className={`${styles.heading} ${titleLength >= 50 ? styles.long : ''}`}>
              {currentQuestion.title}
            </h2>
          </div>
          <div className={styles.correctChoicesAnswerWrapper}>
            <div className={styles.label}>Correct answer{correctChoices.length > 1 ? 's' : ''}</div>
            <div className={styles.answers}>
              {correctChoices.map(choice => {
                const Symbol = Icons[choice.index]
                return (
                  <div key={choice.title} className={styles.answer}>
                    <div className={styles.symbol} data-symbol={choice.index}>
                      <Symbol />
                    </div>
                    <span>{choice.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <AnswerGraph match={match} />
        </div>
        <Leaderboard match={match} onKickPlayer={handleKickPlayer} />
      </div>
    )
  }
}

export default Results
