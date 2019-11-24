import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import client from '../sanityClient'
import axios from 'axios'
import nanoid from 'nanoid'
import router from '../router'

Vue.use(Vuex)

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
    question: {},
    player: null,
    currentQuestionKey: null
  },
  mutations: {
    REGISTER_PLAYER(state, player) {
      console.log('Player mutation', player)
      state.player = player
    },
    SET_CURRENT_QUESTION(state, question) {
      state.currentQuestion = question
    },
    SET_MATCH(state, match) {
      state.match = match
    }
  },
  actions: {
    // eslint-disable-next-line no-empty-pattern
    findMatch({commit}, slug) {
      const query = `*[_type == "match" && slug.current  == $slug][0]{
        "title": quiz->title,
        "slug": slug.current,
        "questions": quiz->questions,
        "players": players[]->
      }`
      return client
        .fetch(query, {slug})
        .then(match => {
          if (match.slug) {
            commit('SET_MATCH', match)
            return true
          } else {
            return false
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
    async registerPlayer({commit, state}, playerName) {
      try {
        const url = `https://squizzy-server.sanity-io.now.sh/api/sign-up-player`
        const player = {
          playerId: nanoid(),
          playerName,
          matchSlug: state.match.slug
        }
        const response = await axios.post(url, player)
        console.log(response)
        commit('REGISTER_PLAYER', player)
        router.push({name: 'gameroom'})
      } catch (error) {
        console.error(error)
      }
    },
    getCurrentQuestion(/* {commit}, question */) {
      // get currentQuestion from sanity client
    },
    startListener() {
      // client.subscribe()
    },
    stopListener() {
      // client.unsubscribe()
    }
  },
  modules: {},
  plugins: [vuexLocalStorage.plugin]
})
