import Vue from 'vue'
import Vuex from 'vuex'
import client from '../sanityClient'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    match: {
      title: null,
      slug: null,
      questions: [],
      players: []
    },
    player: null,
    currentQuestionKey: null
  },
  mutations: {
    REGISTER_PLAYER(state, player) {
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
    registerPlayer(/* {commit}, player */) {
      // generate ID for player
      // talk to endpoint
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
  modules: {}
})
