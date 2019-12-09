import client from '../../sanityClient'
import router from '../../router'
import {submitAnswerToQuestion} from '../squizzyServerApi'

// Query to get all info about a match
const query = `
  *[_type == "match" && slug.current  == $slug][0]{..., quiz->, players[]->, answers[]{...,player->}}
`

// Query to listen for new match updates
const listenerQuery = `*[_type == "match" && slug.current == $slug]`

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
  getMatchDetails({commit, dispatch, rootState}, slug) {
    dispatch('quiz/resetAll', null, {root: true})
    return client
      .fetch(query, {slug})
      .then(match => {
        if (match.startedAt && match.finishedAt) {
          const status = {
            title: 'Oops! Game already finished',
            message: 'Please scan another code.'
          }
          commit('SET_STATUS_MESSAGE', status, {root: true})
          return Promise.resolve(false)
        } else {
          if (!rootState.quiz.match) {
            // Start the listener to get latest match updates
            dispatch('startListener', match.slug.current)
          }
          // Get the match details
          dispatch('quiz/getMatchDetails', match, {root: true})
          // Reset status message
          commit('SET_STATUS_MESSAGE', false, {root: true})
          // Return resolved promise to resolve beforeEnter route on /match/:id
          return Promise.resolve(true)
        }
      })
      .catch(e => {
        const status = {
          title: 'Game not found',
          message: `Sorry, I couldn't find the game you are looking for.`
        }
        commit('SET_STATUS_MESSAGE', status, {root: true})
        console.error(e)
        return Promise.resolve(false)
      })
  },
  startListener({commit, dispatch, rootState, rootGetters}, matchSlug) {
    const slug = matchSlug || rootGetters['quiz/slug']
    if (slug) {
      console.log('listener started')
      subscription = client.listen(listenerQuery, {slug}).subscribe(update => {
        const match = update.result
        // Kick active player if active player is no longer in array
        const activePlayerId = rootState.player.player.id
        const playerExists = match.players.find(player => player._ref === activePlayerId)
        if (!playerExists) {
          dispatch('player/kickPlayer', true, {root: true})
        }

        if (router.currentRoute.name !== 'quiz' && match.isCurrentQuestionOpen) {
          router.push({name: 'quiz'})
        }
        commit('quiz/SET_IS_CURRENT_QUESTION_OPEN', match.isCurrentQuestionOpen, {root: true})
        if (match.isCurrentQuestionOpen) {
          commit('player/SET_ANSWER_SUBMITTED', false, {root: true})
        }
        commit('quiz/SET_CURRENT_QUESTION_KEY', match.currentQuestionKey, {root: true})
        dispatch('updateMatch', update.result)
      })
    }
  },
  stopListener() {
    console.log('Listener started stopped.')
    subscription.unsubscribe()
  },
  updateMatch({dispatch}, match) {
    client.fetch(query, {slug: match.slug.current}).then(match => {
      dispatch('quiz/getMatchDetails', match, {root: true})
    })
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
        commit('player/SET_ANSWER_SUBMITTED', true, {root: true})
      } else {
        commit('player/SET_ANSWER_SUBMITTED', false, {root: true})
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
