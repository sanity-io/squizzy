import React from 'react'
import {get} from 'lodash'
import MatchQrCode from './MatchQrCode'
import Squizzy from '../Squizzy'
import PlayerList from './PlayerList'
import styles from '../styles/BeforeMatch.css'
import globals from '../styles/globals.css'

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
    const hasPlayers = players && players.length
    return (
      <div className={styles.container}>
        <div className={styles.gridItem}>
          <Squizzy expression={{eyes: 'default', mouth: 'happy'}}/>
          <h1 className={globals.heading}>Let's get Squizzy with it!</h1>
          <p>{quiz.questions && <span>This quiz has {quiz.questions.length}</span>} questions. Are you ready?</p>
          <p className={styles.waitingPlayers}>Waiting for players...</p>
        </div>

        <div className={styles.gridItem}>
          <MatchQrCode match={match} />
          <p className={globals.p}>Scan the QR code to get started!</p>
          <PlayerList match={match} onKickPlayer={this.handleKickPlayer} />
        </div>
      </div>
    )
  }
}

export default BeforeStart
