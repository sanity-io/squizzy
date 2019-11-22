import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import client from 'part:@sanity/base/client'

import BeforeMatch from './BeforeMatch'
import AfterMatch from './AfterMatch'
import MatchQuestion from './MatchQuestion'
import MatchScoreboard from './MatchScoreboard'

import styles from './styles/Match.css'

function nextQuestion(match) {
  const {questions} = match.quiz
  const currentQuestionIndex = questions.find(
    question => question._key === match.currentQuestionKey
  )
  return questions[currentQuestionIndex + 1]
}

class Match extends React.Component {
  handleStart = () => {
    const {match} = this.props
    console.log('start button clicked')
    const firstQuestionKey = match.quiz.questions[0]._key
    client
      .patch(match._id)
      .set({startedAt: new Date().toISOString(), currentQuestionKey: firstQuestionKey})
      .commit()
  }

  handleNextQuestion = () => {
    const {match} = this.props
    console.log('next question button clicked')

    const next = nextQuestion(match)
    if (next) {
      client
        .patch(match._id)
        .set({currentQuestionKey: next._key})
        .commit()
    }
  }

  handleCancelMatch = () => {
    console.log('cancel button clicked')
    const {match} = this.props
    client
      .patch(match._id)
      .unset(['startedAt', 'currentQuestionKey'])
      .commit()
  }

  render() {
    const {match} = this.props
    const {selectedDocumentId} = this.props.router.state
    if (!match) {
      return <div>No match for {selectedDocumentId}</div>
    }
    const {startedAt, finishedAt, quiz} = match

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

    return (
      <div className={styles.container}>
        {isNotYetStarted && <BeforeMatch match={match} onStart={this.handleStart} />}
        {isOngoing && (
          <div>
            <button onClick={this.handleCancelMatch}>Stop Game</button>
            <MatchQuestion match={match} />
            <MatchScoreboard match={match} onNextQuestion={this.handleNextQuestion} />
          </div>
        )}
        {isFinished && <AfterMatch match={match} />}
      </div>
    )
  }
}

export default withRouterHOC(Match)
