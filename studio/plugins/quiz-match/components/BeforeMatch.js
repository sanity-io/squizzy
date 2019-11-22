import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import Spinner from 'part:@sanity/components/loading/spinner'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'
import MatchQrCode from './MatchQrCode'

import styles from './styles/BeforeMatch.css'

class BeforeStart extends React.Component {
  render() {
    const {match} = this.props
    const {players} = match
    return (
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <div>
            <img src="/static/squizzy-mock.png" />
          </div>
          <h2>Get your Squizzy on!</h2>
          <div>Waiting for players...</div>
          <h3>{players.length} have joined</h3>
          <button>Start Game</button>
        </div>
        <div className={styles.rightBox}>
          <MatchQrCode match={match} />
          <div>Scan QR code to get started!</div>
        </div>
      </div>
    )
  }
}

export default withRouterHOC(BeforeStart)
