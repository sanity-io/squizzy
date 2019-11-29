/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import client from '../sanityClient'
import axios from 'axios'
import nanoid from 'nanoid'
import router from '../router'

Vue.use(Vuex)

let subscription

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

export default new Vuex.Store({
  state: {
    match: null,
    player: null,
    playerCount: null,
    isLoading: false,
    isListening: false,
    // Store question details
    currentQuestion: null,
    // Question accepts answers
    isQuestionOpen: null,
    // Game has started
    isOngoing: null
  },
  mutations: {
    REGISTER_PLAYER(state, player) {
      state.player = player
    },
    SET_PLAYER_COUNT(state, count) {
      state.playerCount = count
    },
    SET_LOADING_STATE(state, loading) {
      state.isLoading = loading
    },
    SET_CURRENT_QUESTION(state, question) {
      state.currentQuestion = question
    },
    SET_IS_CURRENT_QUESTION_OPEN(state, status) {
      state.isQuestionOpen = status
    },
    SET_MATCH(state, match) {
      state.match = match
    },
    SET_LISTENER(state, status) {
      state.isListening = status
    },
    RESET_ALL(state) {
      state.currentQuestion = null
      state.match = null
      state.player = null
      state.playerCount = null
      state.isQuestionOpen = null
    },
    SET_IS_ONGOING(state, status) {
      state.isOngoing = status
    }
  },
  actions: {
    // eslint-disable-next-line no-empty-pattern
    findMatch({commit, dispatch}, slug) {
      commit('RESET_ALL')
      const query = `*[_type == "match" && slug.current  == $slug][0]{
        "title": quiz->title,
        "slug": slug.current,
        "questions": quiz->questions,
        "players": players[]->,
        ...
      }`
      return client
        .fetch(query, {slug})
        .then(match => {
          if (match.slug) {
            commit('SET_MATCH', match)
            commit('SET_PLAYER_COUNT', match.players.length)
            dispatch('startListener')
            return Promise.resolve(true)
          } else {
            return Promise.reject(false)
          }
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(e)
          return false
        })
    },
    getAnswer({commit}, id) {
      commit('SET_ANSWER', id)
    },
    registerPlayer({commit, dispatch, state}, playerName) {
      dispatch('getLoadingState', true)
      const url = `https://squizzy-server.sanity-io.now.sh/api/sign-up-player`
      const player = {
        playerId: nanoid(),
        playerName,
        matchSlug: state.match.slug
      }
      return axios
        .post(url, player)
        .then(response => {
          if (response.status === 200) {
            commit('REGISTER_PLAYER', player)
            dispatch('startListener')
            dispatch('getLoadingState', false)
            router.push({name: 'gameroom'})
          } else {
            dispatch('getLoadingState', false)
            console.error('something went wrong', response)
          }
        })
        .catch(error => {
          dispatch('getLoadingState', false)
          console.error(error)
        })
    },
    startListener({commit, dispatch, state}) {
      dispatch('getListener', true)
      // Start a listener to make game work
      const query = `*[_type == "match" && slug.current == $slug]`
      const params = {slug: state.match.slug}
      subscription = client.listen(query, params).subscribe(update => {
        console.log(update)
        dispatch('handleUpdatedData', update)
      })
    },
    stopListener({commit, dispatch}) {
      dispatch('getListener', false)
      subscription.unsubscribe()
    },
    handleUpdatedData({commit, dispatch, state}, data) {
      const result = data.result
      // Host clicks start game or next question
      // isCurrentQuestion: false -> true
      // if true, set currentQuestionKey
      // if false,
      commit('SET_PLAYER_COUNT', result.players.length)
      dispatch('getIsQuestionOpen', result.isCurrentQuestionOpen)
      if (result.isCurrentQuestionOpen) {
        dispatch('setCurrentQuestion', result.currentQuestionKey)
      }
      if (!state.isOngoing && result.startedAt) {
        if (result.finishedAt) {
          commit('SET_IS_GOING', false)
        } else {
          commit('SET_IS_GOING', true)
        }
      }
    },
    getLoadingState({commit}, loading) {
      commit('SET_LOADING_STATE', loading)
    },
    getPlayerCount({commit}, count) {
      commit('SET_PLAYER_COUNT', count)
    },
    setCurrentQuestion({commit, state}, key) {
      const question = state.match.questions.find(question => question._key === key)
      commit('SET_CURRENT_QUESTION', question)
    },
    getIsQuestionOpen({commit}, status) {
      commit('SET_IS_QUESTION_OPEN', status)
      status ? router.push({name: 'question'}) : router.push('leaderboard')
    },
    leaveGame({commit, state}) {
      if (router.currentRoute.name === 'register') {
        commit('RESET_ALL')
        router.push({name: 'welcome'})
      } else {
        commit('REGISTER_PLAYER', null)
        router.push({name: 'register'})
      }
      // if (state.player) {
      //   try {
      //     // TODO: Update to actual endpoint
      //     const url = 'https://squizzy-server.sanity-io.now.sh/api/remove-player'
      //     const response = await axios.post(url, state.player.playerId)
      //     if (response.status === 200) {
      //       commit('REGISTER_PLAYER', null)
      //       router.push({name: 'register'})
      //     }
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
    },
    getListener({commit}, status) {
      commit('SET_LISTENER', status)
    }
  },
  modules: {},
  plugins: [vuexLocalStorage.plugin]
})
