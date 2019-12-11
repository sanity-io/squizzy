import nanoid from 'nanoid'

import {signUp} from '../squizzyServerApi'

const state = {
  player: false, // object
  isLoading: false // boolean
}

const getters = {
  playerId(state) {
    return state.player.id
  }
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
  registerPlayer({commit, rootGetters}, playerName) {
    commit('SET_IS_LOADING', true)
    // The registered player
    const player = {
      playerId: nanoid(),
      playerName,
      matchSlug: rootGetters['matchStore/slug']
    }
    return signUp(player).then(result => {
      if (result === true) {
        // Commit the player mutation
        commit('REGISTER_PLAYER', player)
      }
      // Set the loading state to false
      commit('SET_IS_LOADING', false)
      return result
    })
  },
  kickPlayer({commit}) {
    commit('REGISTER_PLAYER', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
