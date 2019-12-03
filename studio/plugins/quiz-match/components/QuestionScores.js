import React from 'react'

import Scoreboard from './Scoreboard'
import {answerDistribution, choiceColors, choiceSymbols, scoresByPlayer} from '../utils'
import styles from './styles/Match.css'

class QuestionScores extends React.Component {
  renderAnswerDistribution = () => {
    const {match} = this.props
    return answerDistribution(match, null, 2).map((choice, index) => {
      const barHeight = 25 + choice.answerCount * 50
      return (
        <div
          key={choice._key}
          className={styles.choiceBar}
          style={{backgroundColor: choiceColors[index], height: `${barHeight}px`}}
        >
          {choiceSymbols[index]} {choice.answers} {choice.isCorrect ? 'CORRECT' : ''}
        </div>
      )
    })
  }

  render() {
    const {match} = this.props
    const playersWithScores = scoresByPlayer(match)
    const playersWithScoresCurrentQuestion = scoresByPlayer(match, match.currentQuestionKey)
    return (
      <div>
        {this.renderAnswerDistribution()}

        <h2>Scores - This question</h2>
        <Scoreboard playersWithScores={playersWithScoresCurrentQuestion} />

        <h2>Scores - Overall </h2>
        <Scoreboard playersWithScores={playersWithScores} />
      </div>
    )
  }
}

export default QuestionScores
