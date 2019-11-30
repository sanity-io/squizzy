import axios from 'axios'
import nanoid from 'nanoid'

const state = {
  player: false, // object
  isLoading: false // boolean
}

const mutations = {
  REGISTER_PLAYER(state, player) {
    state.player = {
      name: player.playerName,
      id: player.playerId,
      match: player.matchSlug
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
        .then(response => {
          if (response.status === 200) {
            // Commit the player mutation
            commit('REGISTER_PLAYER', player)
            // Start the listener to get game updates
            dispatch('startListener', {root: true})
            // Set the loading state to false
            commit('SET_IS_LOADING', false)
          } else {
            commit('SET_IS_LOADING', false)
          }
        })
        .catch(error => {
          commit('SET_IS_LOADING', false)
          console.error(error)
        })
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
