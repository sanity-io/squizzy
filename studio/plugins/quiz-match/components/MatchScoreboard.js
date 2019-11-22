import React from 'react'

import styles from './styles/Match.css'

class MatchScoreboard extends React.Component {
  handleNextQuestion = () => {
    this.props.onNextQuestion()
  }

  render() {
    const {match} = this.props

    return (
      <div className={styles.container}>
        during match scoreboard
        <button onClick={this.handleNextQuestion}>Next question</button>
      </div>
    )
  }
}

export default MatchScoreboard
