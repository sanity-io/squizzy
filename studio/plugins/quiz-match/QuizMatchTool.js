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
][0...50] | order (_updatedAt desc)`

class QuizMatchTool extends React.Component {
  state = {
    match: null,
    matches: null
  }

  observables = {}

  subscription = null

  handleReceiveList = matches => {
    this.setState({matches})
  }

  handleReceiveDocument = incoming => {
    const documentId = this.props.router.state.selectedDocumentId
    client
      .fetch(`*[_id==$documentId][0]{..., quiz->, players[]->}`, {documentId})
      .then(match => this.setState({match: match}))
  }

  componentDidMount() {
    // Fetch published Match documents
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
    if (this.subscription) {
      this.subscription.unsubscribe()
    }

    this.subscription = client
      .listen(
        `*[_id==$documentId]`,
        {documentId},
        {
          includeResult: true,
          visibility: 'query',
          events: ['welcome', 'mutation', 'reconnect']
        }
      )
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
    const {matches, match} = this.state
    const {selectedDocumentId} = this.props.router.state

    if (selectedDocumentId && match && match._type !== 'match') {
      return <div>that's not a match, my friend</div>
    }

    return (
      <div className={styles.container}>
        {selectedDocumentId && <Match match={match} />}
        {!selectedDocumentId && this.renderMatchList()}
      </div>
    )
  }
}

export default withRouterHOC(QuizMatchTool)
