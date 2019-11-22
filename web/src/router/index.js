import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    meta: {
      page: 1
    },
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import(/* webpackChunkName: "matches" */ '../views/base/Welcome.vue'),
        meta: {
          page: 1.1
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "matches" */ '../views/base/Register.vue'),
        meta: {
          page: 1.2
        },
        beforeEnter(to, from, next) {
          next()
          const match = store.state.match
          if (match) {
            next()
          } else {
            next({
              name: 'welcome',
              params: {}
            })
          }
        }
      },
      {
        path: 'gameroom',
        name: 'gameroom',
        component: () => import(/* webpackChunkName: "gameroom" */ '../views/base/Gameroom.vue'),
        meta: {
          page: 1.3
        },
        beforeEnter(to, from, next) {
          const player = store.state.player
          if (player) {
            next()
          } else {
            next({
              name: 'register'
            })
          }
        }
      }
    ]
  },
  {
    path: '/match/:id',
    name: 'match',
    meta: {
      page: 3
    },
    async beforeEnter(to, from, next) {
      try {
        const isMatch = await store.dispatch('findMatch', to.params.id)
        if (isMatch) {
          next({
            name: 'register'
          })
        } else {
          next({
            name: 'welcome',
            params: {
              error: {
                title: `Oh no! Match not found...`,
                message: 'Please scan the QR code to try again.'
              }
            }
          })
        }
      } catch (e) {
        next({
          name: 'welcome',
          params: {
            error: {
              title: `Something went wrong...`,
              message: 'Please scan the QR code to try again.'
            }
          }
        })
      }
    }
  },
  {
    path: '/question',
    name: 'question',
    meta: {
      page: 4
    },
    component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue'),
    beforeEnter(to, from, next) {
      if (!store.state.match) {
        next({
          name: 'welcome',
          params: {
            error: {
              title: `Match not found...`,
              message: 'Please scan a QR code to try again.'
            }
          }
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/scores',
    name: 'scores',
    meta: {
      page: 5
    },
    component: () => import(/* webpackChunkName: "leaderboard" */ '../views/Leaderboard.vue'),
    beforeEnter(to, from, next) {
      if (!store.state.match || !store.state.player) {
        next({
          name: 'welcome',
          params: {
            error: {
              title: `Match or player not found...`,
              message: 'Please scan a QR code to try again.'
            }
          }
        })
      } else {
        next()
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
