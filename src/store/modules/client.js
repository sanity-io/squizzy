import {isEmpty} from 'lodash'
import {asyncScheduler} from 'rxjs'
import {throttleTime} from 'rxjs/operators'
import client from '../../sanityClient'
import {submitAnswerToQuestion} from '../squizzyServerApi'

// Query to get all info about a match
const query = `
  *[_type == "match" && slug.current  == $slug && !(_id in path("drafts.**"))][0]{..., quiz->, players[]->, answers[]{...,player->}}
`

// Query to listen for new match updates
const listenerQuery = `*[_type == "match" && slug.current == $slug && !(_id in path("drafts.**"))][0]{_id}`

// Variable for listener to subscribe and unsubscribe
let subscription

const state = {
  isListening: false // boolean
}

const mutations = {
  SET_IS_LISTENING(state, status) {
    state.isListening = status
  }
}

const actions = {
  // Get the match to play
  getMatchDetails({dispatch}, slug) {
    dispatch('stopListener')
    dispatch('matchStore/resetMatch', false, {root: true})
    return client
      .fetch(query, {slug})
      .then(match => {
        if (isEmpty(match)) {
          return false
        }

        // Start the listener to get latest match updates
        dispatch('startListener', match.slug.current)

        // Set the match details
        dispatch('matchStore/setMatchDetails', match, {root: true})

        // Return to beforeEnter route on /match/:id
        return true
      })
      .catch(error => {
        console.error(error) // eslint-disable-line
        return false
      })
  },

  startListener({dispatch, rootGetters}, matchSlug) {
    const slug = matchSlug || rootGetters['matchStore/slug']
    if (slug) {
      subscription = client
        .listen(
          listenerQuery,
          {slug},
          {
            includeResult: false,
            visibility: 'query',
            events: ['welcome', 'mutation', 'reconnect']
          }
        )
        .pipe(throttleTime(1000, asyncScheduler, {trailing: true})) // Safety valve in case a huge number of events arrive at once (e.g. many players answering simulatneously)
        .subscribe(async () => {
          // Something has happened with the match doc, let's fetch it
          const match = await client.fetch(query, {slug})
          dispatch('matchStore/setMatchDetails', match, {root: true})
        })
    }
  },

  stopListener() {
    if (subscription) {
      subscription.unsubscribe()
    }
  },

  submitAnswer({rootState}, key) {
    const {playerStore, matchStore} = rootState
    const params = {
      playerId: playerStore.player.id,
      matchSlug: matchStore.match.slug.current,
      questionKey: matchStore.match.currentQuestionKey,
      selectedChoiceKey: key
    }
    return submitAnswerToQuestion(params)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
