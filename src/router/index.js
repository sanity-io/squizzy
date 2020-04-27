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
    component: Home
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
        console.error(error) // eslint-disable-line
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
