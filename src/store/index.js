/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import axios from 'axios'
import router from '../router'
import client from './modules/client'
import playerStore from './modules/playerStore'
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
  actions: {
    leaveMatch({dispatch, rootState, rootGetters}) {
      const currentRoute = router.currentRoute.name
      const slug = rootGetters['matchStore/slug']
      const player = rootState.playerStore.player
      dispatch('matchStore/resetMatch', false, {root: true})
      dispatch('client/stopListener', false, {root: true})

      const params = {
        playerId: player.id,
        matchSlug: slug
      }
      if (currentRoute !== 'home') {
        router.push({name: 'home'})
      }
      return withdrawFromGame(params).then(result => {
        return result
      })
    }
  },
  modules: {
    client,
    playerStore,
    matchStore
  },
  plugins: [vuexLocalStorage.plugin]
})
