import axios from 'axios'
import nanoid from 'nanoid'

const state = {
  player: false, // object
  isLoading: false // boolean
}

const mutations = {
  REGISTER_PLAYER(state, player) {
    if (player) {
      state.player = {
        name: player.playerName,
        id: player.playerId,
        match: player.matchSlug
      }
    } else {
      state.player = player
    }
  },
  SET_IS_LOADING(state, status) {
    state.isLoading = status
  }
}

const actions = {
  registerPlayer({commit, dispatch, rootState}, playerName) {
    commit('SET_IS_LOADING', true)
    const url = `https://squizzy-server.sanity-io.now.sh/api/sign-up-player`
    // The registered player
    const player = {
      playerId: nanoid(),
      playerName,
      matchSlug: rootState.quiz.match.slug
    }
    return (
      axios
        // Create the player with a POST
        .post(url, player)
        .then(() => {
          // Commit the player mutation
          commit('REGISTER_PLAYER', player)
          // Start the listener to get game updates
          dispatch('client/startListener', {root: true})
          // Set the loading state to false
          commit('SET_IS_LOADING', false)
          return Promise.resolve(true)
        })
        .catch(error => {
          commit('SET_IS_LOADING', false)
          console.error(error)
          return Promise.resolve(false)
        })
    )
  },
  kickPlayer({commit}) {
    commit('REGISTER_PLAYER', false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
