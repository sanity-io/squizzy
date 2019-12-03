import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import client from 'part:@sanity/base/client'
import Button from 'part:@sanity/components/buttons/default'

import BeforeMatch from './BeforeMatch'
import AfterMatch from './AfterMatch'
import Question from './Question'
import QuestionScores from './QuestionScores'
import AnswerGraph from './AnswerGraph'
import globals from './styles/globals.css'

import styles from './styles/Match.css'

function nextQuestion(match) {
  const {currentQuestionKey, quiz} = match
  const {questions} = quiz
  const index = questions.map(question => question._key).indexOf(currentQuestionKey)
  return questions[index + 1]
}

class Match extends React.Component {
  handleStartMatch = () => {
    console.log('start match button clicked')
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

  handleFinishMatch = () => {
    console.log('finish match button clicked')
    const {match} = this.props

    client
      .patch(match._id)
      .set({
        finishedAt: new Date().toISOString(),
        isCurrentQuestionOpen: false
      })
      .unset(['currentQuestionKey'])
      .commit()
  }

  handleCancelMatch = () => {
    console.log('cancel match button clicked')
    const {match} = this.props
    client
      .patch(match._id)
      .set({isCurrentQuestionOpen: false})
      .unset(['startedAt', 'currentQuestionKey'])
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

  handleKickPlayer = playerId => {
    console.log('kick player button clicked')
    const {match} = this.props

    client
      .patch(match._id)
      .unset([`players[_ref=="${playerId}"]`])
      .commit()
  }

  render() {
    const {match} = this.props
    const {selectedDocumentId} = this.props.router.state

    if (!match) {
      return <div>No match for {selectedDocumentId}</div>
    }

    const {startedAt, finishedAt, quiz, isCurrentQuestionOpen, currentQuestionKey} = match
    const isOngoing = startedAt && !finishedAt
    const isNotYetStarted = !startedAt && !finishedAt
    const isFinished = startedAt && finishedAt
    const isCurrentQuestionTheLast =
      quiz.questions.map(question => question._key).indexOf(currentQuestionKey) ===
      quiz.questions.length - 1
    const isFinalQuestionCompleted = isCurrentQuestionTheLast && !isCurrentQuestionOpen

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
      <div className={styles.root}>
        {isNotYetStarted && (
          <BeforeMatch
            match={match}
            onStart={this.handleStartMatch}
            onKickPlayer={this.handleKickPlayer}
          />
        )}

        {isOngoing && (
          <>
            {isCurrentQuestionOpen && (
              <Question match={match} onCloseQuestion={this.handleCloseQuestion} />
            )}

            <Button onClick={this.handleCancelMatch} color="primary" className={styles.stopButton}>
              Stop game
            </Button>

            {!isCurrentQuestionOpen && (
              <div className={styles.resultView}>
                <div className={styles.graphColumn}>
                  <div>
                    <div className={styles.squiddy}>
                      <img src="/static/squizzy-mock.png" />
                    </div>
                    <h1 className={globals.heading}>What a squiddy round!</h1>
                  </div>
                  <AnswerGraph match={match} />
                </div>


                <div className={styles.leaderboardWrapper}>
                  <QuestionScores match={match}/>
                </div>
                
                 {!isFinalQuestionCompleted && (
                    <div className={styles.nextQuestion}>
                      <Button onClick={this.handleNextQuestion} color="primary" className={styles.nextButton}>
                        Next question
                      </Button>
                    </div>
                  )}
              </div>
            )}
          </>
        )}

        {isFinished && <AfterMatch match={match} />}
      </div>
    )
  }
}

export default withRouterHOC(Match)
