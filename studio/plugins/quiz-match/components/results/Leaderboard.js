import React from 'react'
import PropTypes from 'prop-types'
import {scoresByPlayer} from '../../utils'
import styles from '../styles/Leaderboard.css'

class Leaderboard extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      _id: PropTypes.string,
      isCurrentQuestionOpen: PropTypes.bool,
      currentQuestionKey: PropTypes.string,
      startedAt: PropTypes.string,
      finishedAt: PropTypes.string,
      answers: PropTypes.arrayOf(),
      quiz: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            _key: PropTypes.string,
            _type: PropTypes.string,
            title: PropTypes.string,
            timeLimit: PropTypes.number,
            choices: PropTypes.arrayOf(
              PropTypes.shape({
                _key: PropTypes.string,
                _type: PropTypes.string,
                isCorrect: PropTypes.bool,
                title: PropTypes.string,
              })
            ),
          })
        ),
      }),
      players: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          _key: PropTypes.string,
          name: PropTypes.string,
          score: PropTypes.number,
        })
      ),
    }),
  }

  render() {
    const {match} = this.props
    const playersWithScores = scoresByPlayer(match)
    // const playersWithScoresCurrentQuestion = scoresByPlayer(match, match.currentQuestionKey)
    return (
      <div className={styles.root}>
        <h2 className={styles.heading}>Leaderboard</h2>
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {playersWithScores.map((player, index) => (
              <li className={styles.item} key={player._id}>
                <span className={styles.rank}>{index + 1}</span>
                <span className={styles.name}>{player.name}</span>
                <span className={styles.points}>
                  {player.score > 0 ? Math.round(player.score) : 0}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Leaderboard
