import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home'

// const matchFound = store.state.match && store.state.match.slug
// const matchHasStarted = matchFound && store.state.match.startedAt
// const showQuestion = store.state.isQuestionOpen
// const hasPlayer = store.state.player

Vue.use(VueRouter)

const routes = [
  {path: '*', redirect: '/'},
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/match/:slug',
    name: 'match',
    component: () => import(/* webpackChunkName: "match" */ '../views/Match.vue'),
    async beforeEnter(to, from, next) {
      try {
        const isMatch = await store.dispatch('client/getMatchDetails', to.params.slug)
        if (isMatch) {
          next()
        } else {
          next({
            name: 'home'
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  {
    path: '/matches',
    name: 'matches',
    component: () => import(/* webpackChunkName: "matches" */ '../views/Matches.vue'),
    meta: {
      page: 6
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
