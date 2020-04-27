import React from 'react'
import PropTypes from 'prop-types'
import {get} from 'lodash'

import {withRouterHOC} from 'part:@sanity/base/router' // eslint-disable-line
import client from 'part:@sanity/base/client' // eslint-disable-line
import Button from 'part:@sanity/components/buttons/default' // eslint-disable-line
import Spinner from 'part:@sanity/components/loading/spinner' // eslint-disable-line
import IntentButton from 'part:@sanity/components/buttons/intent' // eslint-disable-line

import BeforeMatch from './pregame/BeforeMatch'
import Question from './quiz/Question'
import Results from './results/Results'
import {allPlayersHaveSubmitted, scoresByPlayer} from '../utils'

import styles from './styles/Match.css'
import TopPlayers from './TopPlayers'
import MediaPlayer from './MediaPlayer'

function nextQuestion(match) {
  const {currentQuestionKey, quiz} = match
  const {questions} = quiz
  const index = questions.map(question => question._key).indexOf(currentQuestionKey)
  return questions[index + 1]
}

class Match extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      _id: PropTypes.string,
      isCurrentQuestionOpen: PropTypes.bool,
      currentQuestionKey: PropTypes.string,
      startedAt: PropTypes.string,
      finishedAt: PropTypes.string,
      answers: PropTypes.array,
      quiz: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            _key: PropTypes.string,
            _type: PropTypes.string,
            title: PropTypes.string,
            choices: PropTypes.arrayOf(
              PropTypes.shape({
                _key: PropTypes.string,
                _type: PropTypes.string,
                isCorrect: PropTypes.bool,
                title: PropTypes.string
              })
            ),
            image: PropTypes.object
          })
        )
      }),
      players: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          _type: PropTypes.string,
          name: PropTypes.string,
          score: PropTypes.number
        })
      )
    }),
    router: PropTypes.shape({
      state: PropTypes.shape({
        selectedDocumentId: PropTypes.string
      })
    })
  }

  componentDidUpdate() {
    const {match} = this.props
    if (!match) {
      return
    }
    const {currentQuestionKey, isCurrentQuestionOpen} = match
    if (isCurrentQuestionOpen && allPlayersHaveSubmitted(match, currentQuestionKey)) {
      this.handleCloseQuestion()
    }
  }

  handleStartMatch = () => {
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
    const {match} = this.props
    const next = nextQuestion(match)
    if (next) {
      client
        .patch(match._id)
        .set({currentQuestionKey: next._key, isCurrentQuestionOpen: true})
        .commit()
    }
  }

  handleFinishMatch = () => {
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
    const {match} = this.props
    client
      .patch(match._id)
      .set({isCurrentQuestionOpen: false})
      .unset(['startedAt', 'currentQuestionKey', 'players', 'answers'])
      .commit()
  }

  handleRestartMatch = () => {
    const {match} = this.props
    client
      .patch(match._id)
      .set({isCurrentQuestionOpen: false})
      .unset(['startedAt', 'finishedAt'])
      .commit()
  }

  handleCloseQuestion = () => {
    const {match} = this.props
    client
      .patch(match._id)
      .set({isCurrentQuestionOpen: false})
      .commit()
  }

  handleKickPlayer = playerId => {
    const {match} = this.props
    client
      .patch(match._id)
      .unset([`players[_ref=="${playerId}"]`])
      .commit()
  }

  isCurrentQuestionTheLast = () => {
    const {quiz, currentQuestionKey} = this.props.match
    return (
      quiz.questions.map(question => question._key).indexOf(currentQuestionKey) ===
      quiz.questions.length - 1
    )
  }

  render() {
    const {match} = this.props
    const {selectedDocumentId} = this.props.router.state

    if (!match) {
      return <Spinner message="Loading match..." center />
    }

    const {startedAt, finishedAt, quiz, isCurrentQuestionOpen, currentQuestionKey} = match
    const isOngoing = startedAt && !finishedAt
    const isNotYetStarted = !startedAt && !finishedAt
    const isFinished = startedAt && finishedAt

    if (!quiz) {
      return (
        <div className={styles.simpleLayout}>
          <p>Your match seems to be missing a quiz.</p>
          <p>Please add one to continue!</p>
          <div className={styles.buttonsWrapper}>
            <IntentButton
              color="primary"
              intent="edit"
              params={{id: match._id}}
              onClick={() => {}}
              title="Edit new match"
              className={styles.button}
            >
              Edit match
            </IntentButton>
          </div>
        </div>
      )
    }

    const isCurrentQuestionTheLast =
      quiz.questions.map(question => question._key).indexOf(currentQuestionKey) ===
      quiz.questions.length - 1
    const isFinalQuestionCompleted = isCurrentQuestionTheLast && !isCurrentQuestionOpen

    const hasPlayers = match.players && match.players.length > 0
    const hasQuestions = quiz.questions && get(quiz, 'questions', []).length > 0

    const topPlayers = scoresByPlayer(match).slice(0, 3)
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

            {currentQuestionKey && !isCurrentQuestionOpen && (
              <Results match={match} onKickPlayer={this.handleKickPlayer} />
            )}
          </>
        )}

        {isFinished && (
          <div className={styles.simpleLayout}>
            <div className={styles.finishedMatch}>
              <TopPlayers players={topPlayers} />
              <IntentButton
                color="success"
                intent="create"
                params={{type: 'match'}}
                onClick={() => {}}
                title="Create new match"
                className={styles.button}
              >
                Create new match
              </IntentButton>
            </div>
          </div>
        )}

        <div className={styles.buttonsWrapper}>
          {isNotYetStarted && hasPlayers && (
            <Button
              onClick={this.handleStartMatch}
              disabled={!hasQuestions}
              color="success"
              className={styles.button}
            >
              Start game
            </Button>
          )}
          {isOngoing && !isFinalQuestionCompleted && !isCurrentQuestionOpen && (
            <>
              <Button onClick={this.handleCancelMatch} color="danger" className={styles.button}>
                Cancel match
              </Button>
              <Button onClick={this.handleNextQuestion} color="success" className={styles.button}>
                Next question
              </Button>
            </>
          )}
          {isOngoing && isFinalQuestionCompleted && (
            <Button color="success" onClick={this.handleFinishMatch} className={styles.button}>
              Finish game
            </Button>
          )}
        </div>
        {isOngoing && !isFinalQuestionCompleted && !isCurrentQuestionOpen && (
          <MediaPlayer match={match} />
        )}
      </div>
    )
  }
}

export default withRouterHOC(Match)
