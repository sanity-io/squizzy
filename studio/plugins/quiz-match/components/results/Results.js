import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import client from 'part:@sanity/base/client'
import Button from 'part:@sanity/components/buttons/default'
import QuestionScores from './QuestionScores'
import AnswerGraph from './AnswerGraph'
import styles from '../styles/Results.css'
import Icons from '../Icons'
import Squizzy from '../Squizzy'



class Match extends React.Component {
  render() {
    const {match} = this.props
    const {selectedDocumentId} = this.props.router.state
    const {startedAt, finishedAt, quiz, isCurrentQuestionOpen, currentQuestionKey} = match
    const isCurrentQuestionTheLast =
      quiz.questions.map(question => question._key).indexOf(currentQuestionKey) ===
      quiz.questions.length - 1
    const isFinalQuestionCompleted = isCurrentQuestionTheLast && !isCurrentQuestionOpen
    const choices = match.quiz.questions.find(question => question._key === currentQuestionKey).choices
    const isCorrect = choices.map((choice, index) => ({title: choice.title, index, isCorrect: choice.isCorrect})).filter(choice => choice.isCorrect)
    return (
      <div className={styles.root}>
        <div className={styles.graph}>
          <div>
            {/* <Squizzy /> */}
            <h1 className={styles.heading}>What a squiddy round!</h1>
          </div>
          <AnswerGraph match={match} />
          {/* TODO: add correct answer with correct symbol and color */}
          <div className={styles.isCorrectAnswerWrapper}>
            <div className={styles.label}>Correct answer{isCorrect.length > 1 ? 's' : ''}</div>
              <div className={styles.answers}>
                {isCorrect.map(choice => {
                  const Symbol = Icons[choice.index]
                  return <div key={choice.title} className={styles.answer}>
                          <div className={styles.symbol} data-symbol={choice.index}><Symbol /></div>
                          <span>{choice.title}</span>
                        </div>
                })}
              </div>
          </div>
        </div>
        
        <div className={styles.leaderboardWrapper}>
          <QuestionScores match={match}/>
        </div>
      </div>
    )
  }
}

export default withRouterHOC(Match)
