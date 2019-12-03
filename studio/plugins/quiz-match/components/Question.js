import React from 'react'
import client from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'

import {findCurrenQuestion, choiceColors, choiceSymbols} from '../utils'

import QuestionCountdown from './QuestionCountdown'
import styles from './styles/Match.css'

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
    const currentQuestion = findCurrenQuestion(match)
    return currentQuestion.choices.map((choice, index) => {
      return (
        <div
          key={choice._key}
          className={styles.choice}
          style={{backgroundColor: choiceColors[index]}}
        >
          {choiceSymbols[index]} {choice.title}
        </div>
      )
    })
  }

  render() {
    const {match} = this.props
    const currentQuestion = findCurrenQuestion(match)
    const questionImageUrl = urlFor(currentQuestion.image)
      .width(300)
      .url()

    return (
      <div className={styles.container}>
        <div>
          <img src={questionImageUrl} />
        </div>

        <QuestionCountdown match={match} onCountdownDone={this.handleCloseQuestion} />
        <div>
          <h1>{currentQuestion.title}</h1>
        </div>

        <div>{this.renderChoices()}</div>
      </div>
    )
  }
}

export default Question
