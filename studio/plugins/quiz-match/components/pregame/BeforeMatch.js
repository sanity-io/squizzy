import React from 'react'
import {get} from 'lodash'
import MatchQrCode from './MatchQrCode'
import Squizzy from '../Squizzy'
import PlayerList from './PlayerList'
import styles from '../styles/BeforeMatch.css'

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
        <section className={styles.section}>
          <Squizzy mouth="happy"/>
          <div>
            <div className={styles.infoLabel}>Quiz Name</div>
            <h1 className={styles.quizName}>{quiz.title}</h1>
            <div className={styles.infoLabel}>No. Questions</div>
            <div className={styles.questionNumber}>{quiz.questions.length}</div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Players in-game</h2>
          <PlayerList match={match} onKickPlayer={this.handleKickPlayer} />
        </section>

        <section className={`${styles.section} ${styles.qrWrapper}`}>
            <MatchQrCode match={match} />
            <p className={styles.instructions}>Scan the QR code to get started!</p>
        </section>
      </div>
    )
  }
}

export default BeforeStart
