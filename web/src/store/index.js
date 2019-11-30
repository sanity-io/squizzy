/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import axios from 'axios'
import router from '../router'
import client from './modules/client'
import player from './modules/player'
import quiz from './modules/quiz'

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
    leaveGame({commit, state}) {
      if (router.currentRoute.name === 'quiz' && player.state.player) {
        commit('player/REGISTER_PLAYER', null, {root: true})
      } else {
        commit('quiz/RESET_ALL', {root: true})
      }
      // if (state.player) {
      //   try {
      //     // TODO: Update to actual endpoint
      //     const url = 'https://squizzy-server.sanity-io.now.sh/api/remove-player'
      //     const response = await axios.post(url, state.player.playerId)
      //     if (response.status === 200) {
      //       commit('REGISTER_PLAYER', null)
      //       router.push({name: 'register'})
      //     }
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
    }
  },
  modules: {
    client,
    player,
    quiz
  },
  plugins: [vuexLocalStorage.plugin]
})
