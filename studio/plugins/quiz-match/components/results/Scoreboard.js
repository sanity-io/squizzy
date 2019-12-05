import React from 'react'
import styles from '../styles/Match.css'

function Scoreboard(props) {
  const {playersWithScores} = props
  return (
    <div>
      <table className={styles.scoreboard}>
        <thead></thead>
        <tbody>
          {playersWithScores.map((player, index) => {
            return (
              <tr key={player._id}>
                <td>{index + 1}.</td>
                <td>{player.name}</td>
                <td>{Math.round(player.score)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard
