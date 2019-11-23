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
  const index = questions.map(question => question._key).indexOf(match.currentQuestionKey)
  return questions[index + 1]
}

class Match extends React.Component {
  handleStart = () => {
    console.log('start button clicked')
    const {match} = this.props
    const firstQuestionKey = match.quiz.questions[0]._key
    client
      .patch(match._id)
      .set({
        startedAt: new Date().toISOString(),
        currentQuestionKey: firstQuestionKey,
        isCurrentQuestionOpen: true
      })
      .commit()
  }

  handleNextQuestion = () => {
    console.log('next question button clicked')
    const {match} = this.props

    const next = nextQuestion(match)
    if (next) {
      client
        .patch(match._id)
        .set({currentQuestionKey: next._key, isCurrentQuestionOpen: true})
        .commit()
    }
  }

  handleCloseQuestion = () => {
    console.log('closing current question')
    const {match} = this.props
    client
      .patch(match._id)
      .set({isCurrentQuestionOpen: false})
      .commit()
  }

  handleCancelMatch = () => {
    console.log('cancel button clicked')
    const {match} = this.props
    client
      .patch(match._id)
      .set({isCurrentQuestionOpen: false})
      .unset(['startedAt', 'currentQuestionKey'])
      .commit()
  }

  render() {
    const {match} = this.props
    const {selectedDocumentId} = this.props.router.state

    if (!match) {
      return <div>No match for {selectedDocumentId}</div>
    }

    const {startedAt, finishedAt, quiz, isCurrentQuestionOpen, selectedQuestionKey} = match
    const isOngoing = startedAt && !finishedAt
    const isNotYetStarted = !startedAt && !finishedAt
    const isFinished = startedAt && finishedAt

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

    return (
      <div className={styles.container}>
        {isNotYetStarted && <BeforeMatch match={match} onStart={this.handleStart} />}

        {isOngoing && (
          <div>
            <button onClick={this.handleCancelMatch}>Stop Game</button>

            {isCurrentQuestionOpen && (
              <MatchQuestion match={match} onCloseQuestion={this.handleCloseQuestion} />
            )}

            {!isCurrentQuestionOpen && (
              <MatchScoreboard match={match} onNextQuestion={this.handleNextQuestion} />
            )}
          </div>
        )}

        {isFinished && <AfterMatch match={match} />}
      </div>
    )
  }
}

export default withRouterHOC(Match)
