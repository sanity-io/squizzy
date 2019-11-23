import React from 'react'
import client from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'

import {findCurrenQuestion} from './utils'

import QuestionCountdown from './QuestionCountdown'
import styles from './styles/Match.css'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

const colors = ['green', 'red', 'blue', 'pink']
const symbols = ['⭐', '⚪', '🐹', '🟦']

class MatchQuestion extends React.Component {
  handleCloseQuestion = () => {
    this.props.onCloseQuestion()
  }

  renderChoices = () => {
    const {match} = this.props
    const currentQuestion = findCurrenQuestion(match)
    return currentQuestion.choices.map((choice, index) => {
      return (
        <div key={choice._key} className={styles.choice} style={{backgroundColor: colors[index]}}>
          {symbols[index]} {choice.title}
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
    console.log('lll', questionImageUrl)
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

export default MatchQuestion
