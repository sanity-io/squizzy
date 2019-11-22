import React from 'react'
import client from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'

import styles from './styles/Match.css'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

class MatchQuestion extends React.Component {
  renderChoices = () => {
    return <span>CHOICES</span>
  }

  render() {
    const {match} = this.props
    const currentQuestion = match.quiz.questions.find(
      question => question._key === match.currentQuestionKey
    )
    return (
      <div className={styles.container}>
        <div>
          <img
            src={urlFor(currentQuestion.image)
              .width(300)
              .url()}
          />
        </div>

        <div>
          <h2>{currentQuestion.title}</h2>
        </div>

        <div>{this.renderChoices()}</div>
      </div>
    )
  }
}

export default MatchQuestion
