import React from 'react'
import client from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'
import {findCurrentQuestion} from '../../utils'
import styles from '../styles/AnswerCount.css'

function AnswerCount(props) {
  const {currentQuestionKey, players = [], answers = []} = props.match
  const numberOfPlayers = players.length
  const numberOfAnswersToQuestion = answers.filter(
    answer => answer.questionKey === currentQuestionKey
  ).length

  return (
    <div className={styles.root}>
      <h2 className={styles.count}>
        {numberOfAnswersToQuestion}/{numberOfPlayers}
      </h2>
    </div>
  )
}

export default AnswerCount
