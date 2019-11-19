import React from 'react'
import {StateLink, withRouterHOC, IntentLink} from 'part:@sanity/base/router'
import Spinner from 'part:@sanity/components/loading/spinner'
import Preview from 'part:@sanity/base/preview'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'

// Sanity uses CSS modules for styling. We import a stylesheet and get an
// object where the keys matches the class names defined in the CSS file and
// the values are a unique, generated class name. This allows you to write CSS
// with only your components in mind without any conflicting class names.
// See https://github.com/css-modules/css-modules for more info.
import styles from './QuizMatchTool.css'

function getDocumentTypeNames() {
  return schema
    .getTypeNames()
    .map(typeName => schema.get(typeName))
    .filter(type => type.type && type.type.name === 'document')
    .map(type => type.name)
}

class MyTool extends React.Component {
  state = {}
  observables = {}

  handleReceiveList = documents => {
    this.setState({documents})
  }

  handleReceiveDocument = document => {
    this.setState({document})
  }

  componentWillMount() {
    // Fetch 50 last updated, published documents
    this.observables.list = client.observable
      .fetch(
        '*[!(_id in path("drafts.**")) && _type in $types][0...50] | order (_updatedAt desc)',
        {types: getDocumentTypeNames()}
      )
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

  componentWillReceiveProps(nextProps) {
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

  renderDocumentsList() {
    const {documents} = this.state
    if (!documents) {
      return (
        <div className={styles.list}>
          <Spinner message="Loading..." center />}
        </div>
      )
    }

    return (
      <ul className={styles.list}>
        {documents.map(doc => (
          <li key={doc._id} className={styles.listItem}>
            <StateLink state={{selectedDocumentId: doc._id}}>
              <Preview value={doc} type={schema.get(doc._type)} />
            </StateLink>
          </li>
        ))}
      </ul>
    )
  }

  renderDocumentView() {
    const {document} = this.state
    if (!document) {
      return (
        <div className={styles.document}>
          <Spinner message="Loading document..." center />}
        </div>
      )
    }

    const {_id, _type} = document
    return (
      <div className={styles.document}>
        <h2>
          {_id} -{' '}
          <IntentLink intent="edit" params={{id: _id, type: _type}}>
            Edit
          </IntentLink>
        </h2>

        <pre>
          <code>{JSON.stringify(document, null, 2)}</code>
        </pre>
      </div>
    )
  }

  render() {
    const {documents, document} = this.state
    const {selectedDocumentId} = this.props.router.state

    return (
      <div className={styles.container}>
        {this.renderDocumentsList()}
        {selectedDocumentId && this.renderDocumentView()}
      </div>
    )
  }
}

export default withRouterHOC(MyTool)
