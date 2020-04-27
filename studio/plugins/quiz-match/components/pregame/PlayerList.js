import React from 'react'
import styles from '../styles/Leaderboard.css'
import KickButton from './KickButton'

function PlayerList(props) {
  const {players = []} = props.match
  const {onKickPlayer} = props

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {players &&
          players.map((player, index) => {
            const handleKickPlayer = () => onKickPlayer(player._id)
            return (
              <li className={styles.item} key={player._id}>
                <span className={styles.rank}>{index + 1}</span>
                <span className={styles.name}>{player.name}</span>
                <span className={styles.points}>
                  <KickButton onKickPlayer={handleKickPlayer} />
                </span>
              </li>
            )
          })}
        {!players.length && (
          <li className={styles.noPlayers} key="no-players">
            No players have joined yet...
          </li>
        )}
      </ul>
    </div>
  )
}

export default PlayerList
