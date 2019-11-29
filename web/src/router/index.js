import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

// const matchFound = store.state.match && store.state.match.slug
// const matchHasStarted = matchFound && store.state.match.startedAt
// const showQuestion = store.state.isQuestionOpen
// const hasPlayer = store.state.player

Vue.use(VueRouter)

const routes = [
  {path: '*', redirect: '/welcome'},
  {
    path: '/',
    name: 'home',
    redirect: {name: 'welcome'},
    component: Home,
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
        },
        beforeEnter(to, from, next) {
          if (store.state.match) {
            next({
              name: 'register'
            })
          } else {
            next()
          }
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "matches" */ '../views/base/Register.vue'),
        meta: {
          page: 1.2,
          requiresMatch: true
        }
      },
      {
        path: 'gameroom',
        name: 'gameroom',
        component: () => import(/* webpackChunkName: "gameroom" */ '../views/base/Gameroom.vue'),
        meta: {
          page: 1.3,
          requiresMatch: true,
          requiresPlayer: true
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
        console.error(e)
      }
    }
  },
  {
    path: '/question',
    name: 'question',
    meta: {
      page: 4,
      requiresMatch: true,
      requiresPlayer: true
    },
    component: () => import(/* webpackChunkName: "question" */ '../views/Question.vue'),
    beforeEnter(to, from, next) {
      if (store.state.isQuestionOpen) {
        next()
      } else {
        if (store.state.isOnGoing) {
          next({
            name: 'leaderboard'
          })
        } else {
          next({
            name: 'gameroom'
          })
        }
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
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: () => import(/* webpackChunkName: "leaderboard" */ '../views/Leaderboard.vue'),
    meta: {
      page: 7,
      requiresMatch: true,
      requiresPlayer: true
    },
    beforeEnter(to, from, next) {
      if (!store.state.isQuestionOpen) {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const state = store.state
  const requiresMatch = to.matched.some(route => route.meta.requiresMatch)
  const requiresPlayer = to.matched.some(route => route.meta.requiresPlayer)

  const hasMatch = state.match
  const hasPlayer = state.player

  if (to.name === 'match') {
    return next()
  }

  // If route requires a match
  if (requiresMatch) {
    // Check if it also requires a player
    if (requiresPlayer) {
      // If it requires a player, and player exists, go to next. If not, go to register
      return hasPlayer ? next() : next({name: 'register'})
    } else {
      // If it doesn't require a player, but has match, go to next, if not, go to welcome screen
      return hasMatch ? next() : next({name: 'welcome'})
    }
  } else {
    return next()
  }
})

export default router
