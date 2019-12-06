/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import axios from 'axios'
import router from '../router'
import client from './modules/client'
import player from './modules/player'
import quiz from './modules/quiz'

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
  actions: {
    leaveGame({commit, rootState}) {
      if (rootState.player.player && rootState.quiz.match.slug) {
        const params = {
          playerId: rootState.player.player.id,
          matchSlug: rootState.quiz.match.slug
        }
        return withdrawFromGame(params).then(result => {
          if (result === true) {
            commit('player/REGISTER_PLAYER', false, {root: true})
          }
        })
      } else {
        commit('player/REGISTER_PLAYER', false, {root: true})
        commit('quiz/RESET_ALL', null, {root: true})
        if (router.currentRoute.name !== 'home') {
          return router.push({name: 'home'})
        }
      }
    }
  },
  modules: {
    client,
    player,
    quiz
  },
  plugins: [vuexLocalStorage.plugin]
})
