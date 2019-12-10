/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import axios from 'axios'
import router from '../router'
import client from './modules/client'
import player from './modules/playerStore'
import matchStore from './modules/matchStore'

import {withdrawFromGame} from './squizzyServerApi'

Vue.use(Vuex)

let subscription

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

export default new Vuex.Store({
  // strict: true,
  state: {
    status: false
  },
  mutations: {
    SET_STATUS_MESSAGE(state, status) {
      state.status = status
    }
  },
  actions: {
    leaveGame({commit, rootState, rootGetters}) {
      const slug = rootGetters['matchStore/slug']
      const player = rootState.playerStore.player
      if (player && slug) {
        const params = {
          playerId: player.id,
          matchSlug: slug
        }
        commit('SET_STATUS_MESSAGE', false)
        return withdrawFromGame(params).then(result => {
          if (result === true) {
            commit('playerStore/REGISTER_PLAYER', false, {root: true})
          }
        })
      } else {
        commit('player/REGISTER_PLAYER', false, {root: true})
        commit('matchStore/RESET_ALL', null, {root: true})
        if (router.currentRoute.name !== 'home') {
          const status = {
            title: 'You left the game',
            message: 'Join another one to continue.'
          }
          commit('SET_STATUS_MESSAGE', status)
          return router.push({name: 'home'})
        }
      }
    }
  },
  modules: {
    client,
    player,
    matchStore
  },
  plugins: [vuexLocalStorage.plugin]
})
