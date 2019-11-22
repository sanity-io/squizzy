import React from 'react'
import {get} from 'lodash'
import MatchQrCode from './MatchQrCode'
import PlayerList from './PlayerList'

import styles from './styles/BeforeMatch.css'

class BeforeStart extends React.Component {
  handleStart = () => {
    this.props.onStart()
  }

  render() {
    const {match} = this.props
    const {players, quiz} = match
    const hasQuestions = get(quiz, 'questions', []).length > 0
    return (
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <div>
            <img src="/static/squizzy-mock.png" />
          </div>
          <h3>{quiz.title}</h3>
          <h4>This quiz has {quiz.questions.length} questions! Get your Squizzies on!</h4>
          <div>Waiting for players...</div>
          <h3>{players.length} have joined</h3>
          <button onClick={this.handleStart} disabled={!hasQuestions}>
            Start Game
          </button>
        </div>

        <div className={styles.rightBox}>
          <MatchQrCode match={match} />
          <div>Scan QR code to get started!</div>
          <PlayerList match={match} />
        </div>
      </div>
    )
  }
}

export default BeforeStart
