import React from 'react'
import {get} from 'lodash'
import MatchQrCode from './MatchQrCode'
import PlayerList from './PlayerList'

import styles from './styles/BeforeMatch.css'

class BeforeStart extends React.Component {
  handleStart = () => {
    this.props.onStart()
  }

  handleKickPlayer = playerId => {
    this.props.onKickPlayer(playerId)
  }

  render() {
    const {match} = this.props
    const {players, quiz} = match
    const hasQuestions = quiz.questions && get(quiz, 'questions', []).length > 0
    return (
      <div className={styles.container}>
        <div className={styles.infoBox}>
          <div>
            <img src="/static/squizzy-mock.png" />
          </div>
          <h3>{quiz.title}</h3>
          <h4>{quiz.questions && <span>This quiz has {quiz.questions.length}</span>} questions! Get your Squizzies on!</h4>
          <div>Waiting for players...</div>
          {players && players.length && <h3>{players.lentgh} have joined</h3>}
          
          <button onClick={this.handleStart} disabled={!hasQuestions}>
            Start Game
          </button>
        </div>

        <div className={styles.infoBox}>
          <MatchQrCode match={match} />
          <div>Scan QR code to get started!</div>
          <PlayerList match={match} onKickPlayer={this.handleKickPlayer} />
        </div>
      </div>
    )
  }
}

export default BeforeStart
