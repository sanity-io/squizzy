const state = {
  match: false, // object
  isCurrentQuestionOpen: false, // boolean
  currentQuestionKey: false // boolean/string
}

const getters = {
  slug(state) {
    return state.match && state.match.slug.current
  },
  title(state) {
    return state.match.quiz.title
  },
  playerCount(state) {
    return state.match.players ? state.match.players.length : 0
  },
  currentQuestion(state) {
    const question = state.match.quiz.questions.find(
      question => question._key === state.currentQuestionKey
    )
    return question
  },
  isFinished(state) {
    return state.match.startedAt && state.match.finishedAt
  },
  isOngoing(state) {
    return state.match.startedAt && !state.match.finishedAt
  },
  progress(state) {
    const progress =
      state.match.quiz.questions.findIndex(question => question._key === state.currentQuestionKey) +
      1
    return `(${progress}/${state.match.quiz.questions.length})`
  }
}

const mutations = {
  // Set current match to play
  SET_MATCH_DETAILS(state, match) {
    state.match = match
  },
  SET_IS_CURRENT_QUESTION_OPEN(state, status) {
    state.isCurrentQuestionOpen = status
  },
  SET_CURRENT_QUESTION_KEY(state, key) {
    state.currentQuestionKey = key
  },
  RESET_ALL(state) {
    ;(state.match = false), (state.isCurrentQuestionOpen = false)
    state.currentQuestionKey = false
  }
}

const actions = {
  resetAll({commit}) {
    commit('RESET_ALL')
  },
  getMatchDetails({commit}, match) {
    commit('SET_MATCH_DETAILS', match)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
