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
  {path: '*', redirect: '/'},
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      page: 1
    }
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import(/* webpackChunkName: "quiz" */ '../views/Quiz.vue'),
    meta: {
      page: 1
    },
    beforeEnter(to, from, next) {
      console.log(store.state)
      if (store.state.quiz.match && store.state.player.player) {
        next()
      } else {
        next({
          name: 'home'
        })
      }
    }
  },
  {
    path: '/match/:id',
    name: 'match',
    meta: {
      page: 3
    },
    async beforeEnter(to, from, next) {
      try {
        const isMatch = await store.dispatch('client/getMatchDetails', to.params.id)
        if (isMatch) {
          next({
            name: 'home'
          })
        } else {
          next({
            name: 'home',
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

router.beforeEach((to, from, next) => {
  const state = store.state
  const hasPlayer = state.player

  if (to.name === 'match') {
    return next()
  }

  if (to.name === 'quiz' && !hasPlayer) {
    return next({
      name: 'home'
    })
  }

  return next()
})

export default router
