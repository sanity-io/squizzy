import React from 'react'
import PropTypes from 'prop-types'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import Spinner from 'part:@sanity/components/loading/spinner'
import Preview from 'part:@sanity/base/preview'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'
import Squizzy from './components/Squizzy'
import Match from './components/Match'

import styles from './QuizMatchTool.css'

const playableGamesQuery = `//groq
  *[
    _type == "match" && // get all documents of type “match”
    defined(quiz) && // which have a quiz attached
    !(_id in path("drafts.**")) // filter out matches that's not published
  ]| order (_updatedAt desc) // order them by last updated
  [0...50] // only show the last 50 updated
  `

class QuizMatchTool extends React.Component {
  state = {
    match: null,
    matches: null
  }

  observables = {}

  subscription = null

  static propTypes = {
    router: PropTypes.shape({
      state: PropTypes.shape({
        selectedDocumentId: PropTypes.string
      })
    })
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
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  fetchDocument(documentId) {
    // If we're already fetching a document, make sure to cancel that request
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    if (documentId) {
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
  }

  handleReceiveList = matches => {
    this.setState({matches})
  }

  handleReceiveDocument = () => {
    const documentId = this.props.router.state.selectedDocumentId
    if (documentId) {
      client
        .fetch(`*[_id==$documentId][0]{..., quiz->, players[]->, answers[]{...,player->}}`, {
          documentId
        })
        .then(match => this.setState({match}))
        .catch(error => console.log(error))
    }
  }

  renderMatchList() {
    const {matches} = this.state

    if (!matches) {
      return (
        <div className={styles.document}>
          <h2>No matches found. You should create one!</h2>
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
    const {match} = this.state
    const {selectedDocumentId} = this.props.router.state

    if (selectedDocumentId && match && match._type !== 'match') {
      return <div>that's not a match, my friend</div>
    }

    return (
      <div className={styles.container}>
        {selectedDocumentId && <Match match={match} />}
        {!selectedDocumentId && (
          <>
            {this.renderMatchList()}
            <div className={styles.welcome}>
              <Squizzy />
              <h1 className={styles.welcomeMessage}>Welcome to Squizzy!</h1>
              <p className={styles.welcomeMessage}>Please select a match to start playing.</p>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default withRouterHOC(QuizMatchTool)
