import React from 'react'

function PlayerList(props) {
  const {players} = props.match

  if (players && players.length > 0) {
    return (
      <ol>
        {players.map(player => {
          return <li key={player._id}>{player.name}</li>
        })}
      </ol>
    )
  }
}

export default PlayerList
