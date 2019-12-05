import React from 'react'
import Scoreboard from './Scoreboard'
import {answerDistribution, choiceColors, choiceSymbols, scoresByPlayer} from '../../utils'
import styles from '../styles/MatchQuestion.css'
import Icons from '../Icons'

class QuestionScores extends React.Component {
  render() {
    const {match} = this.props
    // const playersWithScores = scoresByPlayer(match)
    // const playersWithScoresCurrentQuestion = scoresByPlayer(match, match.currentQuestionKey)
    return (
      <div>
        <h2>Scores - This question</h2>
        {/* <Scoreboard playersWithScores={playersWithScoresCurrentQuestion} />
        <h2>Scores - Overall </h2>
        <Scoreboard playersWithScores={playersWithScores} /> */}
      </div>
    )
  }
}

export default QuestionScores
