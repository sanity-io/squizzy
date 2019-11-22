import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import Spinner from 'part:@sanity/components/loading/spinner'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'

import styles from './styles/AfterMatch.css'

class AfterFinish extends React.Component {
  render() {
    const {match} = this.props

    return <div className={styles.container}>after finish</div>
  }
}

export default withRouterHOC(AfterFinish)
