import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import Spinner from 'part:@sanity/components/loading/spinner'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'

import styles from './styles/DuringMatch.css'

class DuringMatch extends React.Component {
  handleNextQuestion = () => {
    this.props.onNextQuestion()
  }

  handleCancel = () => {
    this.props.onCancelMatch()
  }

  render() {
    const {match} = this.props

    return (
      <div className={styles.container}>
        <button onClick={this.handleCancel}>Stop Game</button>
        <button onClick={this.handleNextQuestion}>Next question</button>
        during match
      </div>
    )
  }
}

export default withRouterHOC(DuringMatch)
