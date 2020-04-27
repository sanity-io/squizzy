/* eslint-disable no-unused-vars */
import nanoid from 'nanoid'

import {signUp} from '../squizzyServerApi'

const state = {
  player: false, // object
  isLoading: false // boolean
}

const getters = {
  playerId(state) {
    return state.player.id
  },
  playerAnswer(state, getters, rootState, rootGetters) {
    const match = rootState.matchStore.match
    const currentQuestion = rootGetters['matchStore/currentQuestion']
    // Get the ID of the player
    const playerId = state.player.id
    // Find the answer that the player selected
    const {answers = []} = match
    const playerAnswer = answers.find(
      answer => answer.player._id === playerId && answer.questionKey === match.currentQuestionKey
    )

    if (!playerAnswer) return false

    const playerAnswerKey = playerAnswer.selectedChoiceKey
    // Check if the player's answer is a correct one
    const correctAnswer = currentQuestion.choices.some(
      answer => answer._key === playerAnswerKey && answer.isCorrect
    )
    // Return an object with the answer key and whether the answer is correct or not
    return {_key: playerAnswerKey, isCorrect: correctAnswer}
    // return playerAnswerKey
  }
}

const mutations = {
  REGISTER_PLAYER(state, player) {
    if (player) {
      state.player = {
        name: player.playerName,
        id: player.playerId
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
  registerNewPlayer({commit, rootGetters}, playerName) {
    commit('SET_IS_LOADING', true)
    // The registered player
    const body = {
      playerId: nanoid(),
      playerName,
      matchSlug: rootGetters['matchStore/slug']
    }
    return signUp(body).then(result => {
      if (result === true) {
        // Commit the player mutation
        commit('REGISTER_PLAYER', body)
      }
      // Set the loading state to false
      commit('SET_IS_LOADING', false)
      return result
    })
  },

  registerExistingPlayer({commit, state, rootGetters}) {
    commit('SET_IS_LOADING', true)
    // The registered player
    const body = {
      playerId: state.player.id,
      playerName: state.player.name,
      matchSlug: rootGetters['matchStore/slug']
    }
    return signUp(body).then(result => {
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
