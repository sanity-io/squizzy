import { get } from "lodash";

const state = {
  match: null
};

const getters = {
  slug(state) {
    return get(state, "match.slug.current");
  },

  title(state) {
    return get(state, "match.quiz.title");
  },

  playerCount(state) {
    return get(state, "match.players", []).length;
  },

  currentQuestionKey(state) {
    return get(state, "match.currentQuestionKey");
  },

  currentQuestion(state) {
    const currentQuestionKey = get(state, "match.currentQuestionKey");
    const question = get(state, "match.quiz.questions").find(
      question => question._key === currentQuestionKey
    );
    return question;
  },

  isFinished(state) {
    return get(state, "match.startedAt") && get(state, "match.finishedAt");
  },

  isOngoing(state) {
    return get(state, "match.startedAt") && !get(state, "match.finishedAt");
  },

  progress(state) {
    const { quiz, currentQuestionKey } = state.match;
    const progress = quiz.questions.findIndex(
      question => question._key === currentQuestionKey
    );
    return `(${progress + 1}/${quiz.questions.length})`;
  }
};

const mutations = {
  // Set current match to play
  SET_MATCH_DETAILS(state, updatedMatch) {
    state.match = updatedMatch;
  },

  RESET_ALL(state) {
    state.match = null;
  }
};

const actions = {
  resetAll({ commit }) {
    commit("RESET_ALL");
  },
  setMatchDetails({ commit }, match) {
    commit("SET_MATCH_DETAILS", match);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
