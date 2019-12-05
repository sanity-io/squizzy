import React from 'react'
import {formatDistance} from 'date-fns'
import Spinner from 'part:@sanity/components/loading/spinner'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'

import Scoreboard from './results/Scoreboard'
import {scoresByPlayer} from '../utils'
import styles from './styles/Match.css'

class AfterMatch extends React.Component {
  render() {
    const {match} = this.props
    const playersWithScores = scoresByPlayer(match)

    return (
      <div>
        <h2>Match ended {formatDistance(new Date(match.finishedAt), new Date())} ago</h2>
        <Scoreboard playersWithScores={playersWithScores} />
        <a href="/desk/match">Play again?</a>
      </div>
    )
  }
}

export default AfterMatch
