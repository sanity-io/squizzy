import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import Spinner from 'part:@sanity/components/loading/spinner'
import Preview from 'part:@sanity/base/preview'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'

import styles from './QuizMatchTool.css'

const playableGamesQuery = `*[
  !(_id in path("drafts.**"))
  && _type == "match"
  && !defined(startedAt)
][0...50] | order (_updatedAt desc)`

class QuizMatchTool extends React.Component {
  state = {
    match: null,
    matches: null
  }

  observables = {}

  handleReceiveList = matches => {
    this.setState({matches: matches})
  }

  handleReceiveDocument = match => {
    this.setState({match})
  }

  componentWillMount() {
    // Fetch published, unplayed Match documents
    this.observables.list = client.observable
      .fetch(playableGamesQuery)
      .subscribe(this.handleReceiveList)

    // If we have a document ID as part of our route, load that document as well
    const documentId = this.props.router.state.selectedDocumentId
    if (documentId) {
      this.fetchDocument(documentId)
    }
  }

  fetchDocument(documentId) {
    // If we're already fetching a document, make sure to cancel that request
    if (this.observables.document) {
      this.observables.document.unsubscribe()
    }

    this.observables.document = client.observable
      .getDocument(documentId)
      .subscribe(this.handleReceiveDocument)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const current = this.props.router.state.selectedDocumentId
    const next = nextProps.router.state.selectedDocumentId

    if (current !== next) {
      this.fetchDocument(next)
    }
  }

  // When unmounting, cancel any ongoing requests
  componentWillUnmount() {
    Object.keys(this.observables).forEach(obs => {
      this.observables[obs].unsubscribe()
    })
  }

  renderMatches() {
    const {matches} = this.state
    if (!matches) {
      return (
        <div className={styles.list}>
          <Spinner message="Loading..." center />}
        </div>
      )
    }

    return (
      <ul className={styles.list}>
        {matches.map(match => (
          <li key={match._id} className={styles.listItem}>
            <StateLink state={{selectedDocumentId: match._id}}>
              <Preview value={match} type={schema.get(match._type)} />
            </StateLink>
          </li>
        ))}
      </ul>
    )
  }

  renderDocumentView() {
    const {match} = this.state
    if (!match) {
      return (
        <div className={styles.document}>
          <Spinner message="Loading document..." center />}
        </div>
      )
    }

    const {_id, _type} = match
    return (
      <div className={styles.document}>
        <h2>
          {_id} -{' '}
          <IntentLink intent="edit" params={{id: _id, type: _type}}>
            Edit
          </IntentLink>
        </h2>

        <pre>
          <code>{JSON.stringify(match, null, 2)}</code>
        </pre>
      </div>
    )
  }

  render() {
    const {matches, match} = this.state
    const {selectedDocumentId} = this.props.router.state

    return (
      <div className={styles.container}>
        {this.renderMatches()}
        {selectedDocumentId && this.renderDocumentView()}
      </div>
    )
  }
}

export default withRouterHOC(QuizMatchTool)
