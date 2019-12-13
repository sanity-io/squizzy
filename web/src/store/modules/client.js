import client from '../../sanityClient'
import {submitAnswerToQuestion} from '../squizzyServerApi'

// Query to get all info about a match
const query = `
  *[_type == "match" && slug.current  == $slug && !(_id in path("drafts.**"))][0]{..., quiz->, players[]->, answers[]{...,player->}}
`

// Query to listen for new match updates
const listenerQuery = `*[_type == "match" && slug.current == $slug && !(_id in path("drafts.**"))][0]`

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
  getMatchDetails({commit, dispatch}, slug) {
    dispatch('stopListener')
    dispatch('matchStore/resetAll', null, {root: true})
    return client
      .fetch(query, {slug})
      .then(match => {
        if (match.startedAt && match.finishedAt) {
          const status = {
            title: 'Oops! Game already finished',
            message: 'Please scan another code.'
          }
          commit('SET_STATUS_MESSAGE', status, {root: true})
          return false
        } else {
          // Start the listener to get latest match updates
          dispatch('startListener', match.slug.current)

          // Set the match details
          dispatch('matchStore/setMatchDetails', match, {root: true})

          // Reset status message
          commit('SET_STATUS_MESSAGE', false, {root: true})

          // Return to beforeEnter route on /match/:id
          return true
        }
      })
      .catch(e => {
        const status = {
          title: 'Game not found',
          message: `Sorry, I couldn't find the game you are looking for.`
        }
        commit('SET_STATUS_MESSAGE', status, {root: true})
        console.error(e)
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
            includeResult: true,
            visibility: 'query',
            events: ['welcome', 'mutation', 'reconnect']
          }
        )
        .subscribe(async () => {
          // Something has happened with the match doc, let's fetch it
          const match = await client.fetch(query, {slug})
          console.log('match updated', match)
          dispatch('matchStore/setMatchDetails', match, {root: true})

          // Remove player from store if not in match.players array
          // const activePlayerId = rootState.player.player.id
          // const playerExists = match.players.find(player => player._ref === activePlayerId)

          // TODO if player is no longer i match.players array, don't delte player data, just redirect to /home
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
