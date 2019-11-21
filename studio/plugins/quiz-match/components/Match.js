import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import Spinner from 'part:@sanity/components/loading/spinner'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'
import MatchQrCode from './MatchQrCode'

import styles from './Match.css'

class Match extends React.Component {
  state = {}

  observables = {}

  render() {
    const {match} = this.props
    const {selectedDocumentId} = this.props.router.state
    if (!match) {
      return <div>No match for {selectedDocumentId}</div>
    }
    const {startedAt, finishedAt, players, quiz, currentQuestion, answers, slug} = match

    if (!quiz) {
      return (
        <div>
          The Match must be based on a Quiz. Go back and add one
          <IntentLink intent="edit" params={{id: match._id}}>
            Create
          </IntentLink>
        </div>
      )
    }
    const isOngoing = startedAt && !finishedAt
    const isNotYetStarted = !startedAt && !finishedAt
    const isFinished = startedAt && finishedAt
    const atFirstQuestion = quiz.questions[0]._key === currentQuestion

    // Available controls: Start, Stop (abort), Next question, Previous question
    // Always displays a QR code which aspiring players can scan at any time to join the game
    // If game hasn't started: Display the players who have signed up
    // If game is running and the question timer hasn't expired: Display the current question
    // If game is running and the question timer has expired: Display the correct answer(s) and scoreboard so far
    // If game is over (i.e. last question has been answered): Display the the final scoreboard
    // QR code from URL

    return (
      <div className={styles.container}>
        <div className={styles.matchControls}>
          <button disabled={!isNotYetStarted}>Start Game</button>
          <button disabled={!isOngoing}>Cancel Game</button>
          <button disabled={!isOngoing}>Next question</button>
        </div>

        {isNotYetStarted && <MatchQrCode match={match} />}

        <pre>
          <code>{JSON.stringify(match, null, 2)}</code>
        </pre>
      </div>
    )
  }
}

export default withRouterHOC(Match)
