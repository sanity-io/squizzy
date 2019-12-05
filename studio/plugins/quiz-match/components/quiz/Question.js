import React from 'react'
import client from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'
import styles from '../styles/MatchQuestion.css'
import Icons from '../Icons'

import {findCurrentQuestion, choiceColors, choiceSymbols} from '../../utils'

import QuestionCountdown from './QuestionCountdown'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

class Question extends React.Component {
  handleCloseQuestion = () => {
    this.props.onCloseQuestion()
  }

  renderChoices = () => {
    const {match} = this.props
    const currentQuestion = findCurrentQuestion(match)

    return currentQuestion.choices.map((choice, index) => {
      const Symbol = Icons[index]
      return (
        <div
          key={choice._key}
          className={styles.choiceCard}
          data-choice={index}
        >
          <div className={styles.inner}>
          <div className={styles.symbol}>
            <Symbol />
          </div>
         
            <div className={styles.choiceTitle}>{choice.title}</div>
          </div>
        </div>
      )
    })
  }

  render() {
    const {match} = this.props
    const currentQuestion = findCurrentQuestion(match)
    const questionImageUrl = urlFor(currentQuestion.image)
      .width(300)
      .url()

    return (
      <div className={styles.root}>
        <div className={styles.countdown}>
        <div>
            <img src="/static/squizzy-mock.png" />
          </div>
          <QuestionCountdown match={match} onCountdownDone={this.handleCloseQuestion} />
        </div>
       <div className={styles.question}>
         <h2 className={styles.matchProgress}>Question X of TOTAL Q</h2>
        <div className={styles.questionImage}>
            <img className={styles.imageSrc} src={questionImageUrl} />
          </div>
          <h1>{currentQuestion.title}</h1>
          <div className={styles.questionChoices}>{this.renderChoices()}</div>
       </div>
      </div>
    )
  }
}

export default Question
