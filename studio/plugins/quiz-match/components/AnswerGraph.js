import React from 'react'
import Scoreboard from './Scoreboard'
import {answerDistribution} from '../utils'
import styles from './styles/AnswerGraph.css'
import Icons from './Icons'
import CheckIcon from 'part:@sanity/base/check-icon'

class AnswerGraph extends React.Component {
  render() {
    const {match} = this.props
    return (
      <div className={styles.root}>
        {answerDistribution(match, null, 2).map((choice, index) => {
          // TODO: calculate height in % instead
          const barHeight = 35 + choice.answerCount * 50
          const Symbol = Icons[index]
          return (
            <div
              key={choice._key}
              className={styles.choice}
              data-choice={index}
            >
              <div className={styles.column} style={{height: `${barHeight}%`}}>
                {choice.isCorrect && <div className={styles.isCorrect}><CheckIcon/></div>}
              </div>
              <div className={styles.symbol} data-symbol={index}><Symbol/></div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default AnswerGraph
