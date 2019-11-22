import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import Spinner from 'part:@sanity/components/loading/spinner'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'

import BeforeMatch from './BeforeMatch'
import DuringMatch from './DuringMatch'
import AfterMatch from './AfterMatch'
import styles from './styles/Match.css'

class Match extends React.Component {
  render() {
    const {match} = this.props
    const {selectedDocumentId} = this.props.router.state
    if (!match) {
      return <div>No match for {selectedDocumentId}</div>
    }
    const {startedAt, finishedAt, quiz} = match

    if (!quiz) {
      return (
        <div>
          The Match must be based on a Quiz. Go back and add one
          <IntentLink intent="edit" params={{id: match._id}}>
            Create
          </IntentLink>
        </div>
      )
    }
    const isOngoing = startedAt && !finishedAt
    const isNotYetStarted = !startedAt && !finishedAt
    const isFinished = startedAt && finishedAt

    return (
      <div className={styles.container}>
        {isNotYetStarted && <BeforeMatch match={match} />}
        {isOngoing && <DuringMatch match={match} />}
        {isFinished && <AfterMatch match={match} />}
      </div>
    )
  }
}

export default withRouterHOC(Match)
