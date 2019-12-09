import React from 'react'
import styles from '../styles/PlayerList.css'
import KickButton from './KickButton'

function PlayerList(props) {
  const {players} = props.match
  const {onKickPlayer} = props
  
    return (
      <ul className={styles.root}>
        {players && players.map(player => {
          const handleKickPlayer = () => onKickPlayer(player._id)
          return (
            <li className={styles.player} key={player._id}>
              {player.name} <KickButton onKickPlayer={handleKickPlayer} />
            </li>
          )
        })}
        {!players && (
          <li className={styles.noPlayers}>No players have joined yet...</li>
        )}
      </ul>
    )
}

export default PlayerList
