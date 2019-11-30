import React from 'react'

function PlayerList(props) {
  const {players} = props.match
  const {onKickPlayer} = props

  if (players && players.length > 0) {
    return (
      <ol>
        {players.map(player => {
          const handleKickPlayer = () => onKickPlayer(player._id)
          return (
            <li key={player._id}>
              {player.name} <button onClick={handleKickPlayer}>Kick</button>
            </li>
          )
        })}
      </ol>
    )
  }
  return (<p>
  No players yet
</p>)
}

export default PlayerList
