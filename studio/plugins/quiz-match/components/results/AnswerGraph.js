import React from 'react'
import Scoreboard from './Scoreboard'
import {answerDistribution} from '../../utils'
import styles from '../styles/AnswerGraph.css'
import Icons from '../Icons'
import CheckIcon from 'part:@sanity/base/check-icon'

class AnswerGraph extends React.Component {
  render() {
    const {match} = this.props
    const totalAnswerCount = answerDistribution(match, null, 2).reduce(
      (sum, {answerCount}) => sum + answerCount,
      0
    )
    return (
      <div className={styles.root}>
        {answerDistribution(match, null, 2).map((choice, index) => {
          const height = (100 / totalAnswerCount) * choice.answerCount
          const Symbol = Icons[index]
          return (
            <div key={choice._key} className={styles.choice} data-choice={index}>
              <div className={styles.column} style={{height: `${height}%`}}>
                {choice.isCorrect && (
                  <div className={styles.isCorrect}>
                    <CheckIcon />
                  </div>
                )}
              </div>
              <div className={styles.symbol} data-symbol={index}>
                <Symbol />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default AnswerGraph
