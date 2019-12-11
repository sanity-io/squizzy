import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter(to, from, next) {
      const match = store.state.matchStore.match
      return match ? next({name: 'match', params: {slug: match.slug.current}}) : next()
    }
  },
  {
    path: '/match/:slug',
    name: 'match',
    component: () => import(/* webpackChunkName: "match" */ '../views/Match.vue'),
    async beforeEnter(to, from, next) {
      try {
        const isMatch = await store.dispatch('client/getMatchDetails', to.params.slug)
        isMatch
          ? next()
          : next({
              name: 'home',
              params: {
                title: 'Match not found!',
                subtitle: 'Please scan another QR code to try again.'
              }
            })
      } catch (error) {
        console.error(error)
      }
    }
  },
  {
    path: '/matches',
    name: 'matches',
    component: () => import(/* webpackChunkName: "matches" */ '../views/Matches.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
