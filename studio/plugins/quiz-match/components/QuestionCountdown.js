import React from 'react'
import client from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'
import {findCurrenQuestion} from './utils'
import styles from './styles/Match.css'

const defaultTimeLimit = 20

class QuestionCountdown extends React.Component {
  state = {
    seconds: 0
  }

  handleCountdownDone = () => {
    this.props.onCountdownDone()
  }

  componentDidMount() {
    const {match} = this.props
    const currentQuestion = findCurrenQuestion(match)
    this.setState({seconds: currentQuestion.timeLimit || defaultTimeLimit})
    this.myInterval = setInterval(() => {
      const {seconds} = this.state

      if (seconds > 0) {
        this.setState(({seconds}) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        this.handleCountdownDone()
        clearInterval(this.myInterval)
      }
    }, 1000)
  }

  render() {
    const {seconds} = this.state

    return <h2 className={styles.countdown}>{seconds}</h2>
  }
}

export default QuestionCountdown
