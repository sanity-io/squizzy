import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasAnswered: false,
    countdown: null,
    activeCountdown: 10,
    secondsLeft: 10,
    activeAnswer: null
  },
  mutations: {
    START_COUNTDOWN(state) {
      state.countdown = setInterval(() => {
        state.secondsLeft = state.secondsLeft - 1
      }, 1000)
    },
    STOP_COUNTDOWN(state) {
      clearInterval(state.countdown)
    },
    SET_ANSWER(state, id) {
      state.activeAnswer = id
      state.hasAnswered = true
    }
  },
  actions: {
    startCountdown({commit}) {
      commit('START_COUNTDOWN')
    },
    stopCountdown({commit}) {
      commit('STOP_COUNTDOWN')
    },
    getAnswer({commit}, id) {
      commit('SET_ANSWER', id)
    }
  },
  modules: {}
})
