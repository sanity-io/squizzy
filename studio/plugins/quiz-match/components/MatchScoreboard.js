import React from 'react'

import {answerDistribution, choiceColors, choiceSymbols} from '../utils'
import styles from './styles/Match.css'

class MatchScoreboard extends React.Component {
  handleNextQuestion = () => {
    this.props.onNextQuestion()
  }

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

    return (
      <div className={styles.container}>
        {this.renderAnswerDistribution()}

        <pre>{JSON.stringify(answerDistribution(match), null, 2)}</pre>
        <button onClick={this.handleNextQuestion}>Next question</button>
      </div>
    )
  }
}

export default MatchScoreboard
