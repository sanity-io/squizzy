import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import Spinner from 'part:@sanity/components/loading/spinner'
import Preview from 'part:@sanity/base/preview'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'
import Match from './components/Match'

import styles from './QuizMatchTool.css'

const playableGamesQuery = `*[
  !(_id in path("drafts.**"))
  && _type == "match"
  && !defined(startedAt)
][0...50] | order (_updatedAt desc)`

class QuizMatchTool extends React.Component {
  state = {
    match: null,
    matches: null,
    isLoading: true
  }

  observables = {}

  handleReceiveList = matches => {
    this.setState({matches: matches, isLoading: false})
  }

  handleReceiveDocument = match => {
    this.setState({match, isLoading: false})
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
      .fetch(`*[_id==$documentId][0]{..., quiz->, players[]->}`, {documentId})
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

  renderMatchList() {
    const {matches, isLoading} = this.state
    if (isLoading) {
      return (
        <div className={styles.list}>
          <Spinner message="Loading documents..." center />}
        </div>
      )
    }

    if (!matches) {
      return (
        <div className={styles.document}>
          <h2>No matches found 😞, but that's no problem you can just creat one 😍</h2>
          <IntentLink intent="create" params={{type: 'match'}}>
            Create
          </IntentLink>
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

  render() {
    const {matches, match, isLoading} = this.state
    const {selectedDocumentId} = this.props.router.state

    return (
      <div className={styles.container}>
        {selectedDocumentId && <Match match={match} />}
        {!selectedDocumentId && this.renderMatchList()}
      </div>
    )
  }
}

export default withRouterHOC(QuizMatchTool)
