import React from 'react'
import client from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'
import styles from '../styles/Question.css'
import Icons from '../Icons'
import AnswerCount from './AnswerCount'
import Countdown from './Countdown'
import {findCurrentQuestion} from '../../utils'

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
        <div key={choice._key} className={styles.choiceCard} data-choice={index}>
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
    const title = currentQuestion.title
    const questionImageUrl = urlFor(currentQuestion.image)
      .width(300)
      .url()

    return (
      <div className={styles.root}>
        <AnswerCount match={match} />
        <div className={styles.question}>
          {questionImageUrl && (
            <div className={styles.questionImage}>
              <img className={styles.imageSrc} src={questionImageUrl} />
            </div>
          )}
          <h1
            className={`${styles.questionTitle} ${questionImageUrl ? '' : styles.large} ${
              title.split('').length > 15 ? styles.short : ''
            }`}
          >
            {title}
          </h1>
        </div>
        <Countdown match={match} onCountdownDone={this.handleCloseQuestion} />
        <div className={styles.choices} data-grid={currentQuestion.choices.length}>
          {this.renderChoices()}
        </div>
      </div>
    )
  }
}

export default Question
