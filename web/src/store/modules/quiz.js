const state = {
  match: false, // object
  isOngoing: false, // boolean
  isQuestionOpen: false, // boolean
  currentQuestionKey: false, // string
  questions: false, // array
  players: false, // array
  isFinished: false // boolean
}

const getters = {
  playerCount(state) {
    const players = state.players.length
    return players ? players : null
  },
  currentQuestion(state) {
    const question = state.questions.find(question => question._key === state.currentQuestionKey)
    return question ? question : null
  },
  progress() {
    // Get the index of the current question in the question array
    return ''
  }
}

const mutations = {
  // Set current match to play
  SET_MATCH_DETAILS(state, match) {
    state.match = match
  },
  SET_QUESTIONS(state, questions) {
    state.questions = questions
  },
  SET_CURRENT_QUESTION_KEY(state, key) {
    state.currentQuestionKey = key
  },
  SET_PLAYERS(state, players) {
    state.players = players
  },
  // Set whether game has started or not
  SET_IS_ONGOING(state, status) {
    state.isOngoing = status
  },
  // Set whether the current question accepts answers
  SET_IS_CURRENT_QUESTION_OPEN(state, status) {
    state.isQuestionOpen = status
  },
  RESET_ALL(state) {
    state.match = null
    state.isOngoing = null
    state.isQuestionOpen = null
    state.currentQuestionKey = null
    state.questions = null
    state.players = null
  },
  SET_IS_FINISHED(state, status) {
    state.isFinished = status
  }
}

const actions = {
  resetAll({commit}) {
    commit('RESET_ALL')
  },
  getMatchDetails({commit}, match) {
    commit('SET_MATCH_DETAILS', match)
  },
  getPlayers({commit}, players) {
    commit('SET_PLAYERS', players)
  },
  getQuestions({commit}, questions) {
    commit('SET_QUESTIONS', questions)
  },
  getCurrentQuestionKey({commit}, key) {
    commit('SET_CURRENT_QUESTION_KEY', key)
  },
  getIsCurrentQuestionOpen({commit}, status) {
    commit('SET_IS_CURRENT_QUESTION_OPEN', status)
  },
  getIsOngoing({commit}, status) {
    commit('SET_IS_ONGOING', status)
  },
  finishGame({commit}, status) {
    commit('SET_IS_FINISHED', status)
    if (status) {
      commit('player/REGISTER_PLAYER', false, {root: true})
      commit('SET_MATCH_DETAILS', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
