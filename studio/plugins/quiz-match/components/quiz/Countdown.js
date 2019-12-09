import React from 'react'
import client from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'
import {findCurrentQuestion} from '../../utils'
import styles from '../styles/Countdown.css'

const defaultTimeLimit = 20

class Countdown extends React.Component {
  state = {
    seconds: 0
  }

  handleCountdownDone = () => {
    this.props.onCountdownDone()
  }

  componentDidMount() {
    const {match} = this.props
    const currentQuestion = findCurrentQuestion(match)
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
    return (
      <div className={styles.root}>
        <h2 className={`${styles.countdown} ${seconds <= 5 ? styles.red : ''}`}>{seconds}</h2>
      </div>
    )
  }
}

export default Countdown
