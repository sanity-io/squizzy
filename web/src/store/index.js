import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasAnswered: false,
    activeAnswer: null,
    gameIdExists: null
  },
  mutations: {
    SET_ANSWER(state, id) {
      state.activeAnswer = id
      state.hasAnswered = true
    },
    GAME_ID_FOUND(state, status) {
      state.gameIdExists = status
    }
  },
  actions: {
    checkGameId({commit}) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('GAME_ID_FOUND', true)
          resolve(true)
        }, 500)
      })
    },
    getAnswer({commit}, id) {
      commit('SET_ANSWER', id)
    }
  },
  modules: {}
})
