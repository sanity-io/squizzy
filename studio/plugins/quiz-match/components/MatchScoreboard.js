import React from 'react'

import {answerDistribution, choiceColors, choiceSymbols, currentScoreboard} from '../utils'
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

  renderScoreboard = () => {
    const {match} = this.props
    const scoreboard = currentScoreboard(match)
    return (
      <table className={styles.scoreboard}>
        <thead></thead>
        <tbody>
          {scoreboard.map((player, index) => {
            return (
              <tr key={player._id}>
                <td>{index + 1}.</td>
                <td>{player.name}</td>
                <td>{Math.round(player.score)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    const {match} = this.props

    return (
      <div>
        {this.renderAnswerDistribution()}
        {this.renderScoreboard()}
        <button onClick={this.handleNextQuestion}>Next question</button>
      </div>
    )
  }
}

export default MatchScoreboard
