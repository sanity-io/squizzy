import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/match/:id',
    name: 'match',
    component: () => import(/* webpackChunkName: "game" */ '../views/Match.vue'),
    async beforeEnter(to, from, next) {
      try {
        const isMatch = await store.dispatch('findMatch', to.params.id)
        if (isMatch) {
          next()
        } else {
          next({
            name: 'home',
            query: {matchFound: false}
          })
        }
      } catch (e) {
        next({
          name: 'home', // back home
          query: {matchFound: false}
        })
      }
    }
  },
  {
    path: '/matches',
    name: 'matches',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Matches.vue')
  },
  {
    path: '/q',
    name: 'question',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Question.vue')
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Leaderboard.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
