import client from '../../sanityClient'
import router from '../../router'
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

  startListener({commit, dispatch, rootGetters}, matchSlug) {
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
        .subscribe(async event => {
          console.log('Listener event!', event.type)

          // Something has happened with the match doc, let's fetch it
          const match = await client.fetch(query, {slug})
          console.log('Listener got match', match)

          dispatch('matchStore/setMatchDetails', match, {root: true})

          // Remove player from store if not in match.players array
          // const activePlayerId = rootState.player.player.id
          // const playerExists = match.players.find(player => player._ref === activePlayerId)

          // TODO if player is no longer i match.players array, don't delte player data, just redirect to /home

          if (router.currentRoute.name !== 'quiz' && match.isCurrentQuestionOpen) {
            router.push({name: 'quiz'})
          }

          if (match.isCurrentQuestionOpen) {
            commit('playerStore/SET_ANSWER_SUBMITTED', false, {root: true})
          }
        })
    }
  },

  stopListener() {
    console.log('Listener stopped')
    if (subscription) {
      subscription.unsubscribe()
    }
  },

  submitAnswer({commit, rootState}, key) {
    const {player, quiz} = rootState
    const params = {
      playerId: player.player.id,
      matchSlug: quiz.match.slug.current,
      questionKey: quiz.currentQuestionKey,
      selectedChoiceKey: key
    }
    return submitAnswerToQuestion(params).then(result => {
      if (result === true) {
        // Commit the player mutation
        commit('playerStore/SET_ANSWER_SUBMITTED', true, {root: true})
      } else {
        commit('playerStore/SET_ANSWER_SUBMITTED', false, {root: true})
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
