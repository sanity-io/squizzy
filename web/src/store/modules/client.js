import client from '../../sanityClient'
import router from '../../router'
import {submitAnswerToQuestion} from '../squizzyServerApi'

// Query to get all info about a match
const query = `
  *[_type == "match" && slug.current  == $slug][0]{
    "title": quiz->title,
    "slug": slug.current,
    "questions": quiz->questions,
    "players": players[]->,
    startedAt,
    finishedAt,
    answers
  }
`
// Query to listen for new match updates
const listenerQuery = `*[_type == "match" && slug.current == $slug]`

// Variable for listener to subscribe and unsubscribe
let subscription

const state = {
  isListening: false // boolean
}

const mutations = {
  SET_IS_LISTENING(state, status) {
    state.isListening = status
  }
}

const actions = {
  // Get the match to play
  getMatchDetails({dispatch}, slug) {
    dispatch('quiz/resetAll', null, {root: true})
    return client
      .fetch(query, {slug})
      .then(match => {
        // Start the listener to get latest match updates
        dispatch('startListener', match.slug)
        // Set the match details
        dispatch(
          'quiz/getMatchDetails',
          {
            title: match.title,
            slug: match.slug
          },
          {root: true}
        )
        // Set players
        dispatch('quiz/getPlayers', match.players, {root: true})
        // Set questions for this match
        dispatch('quiz/getQuestions', match.questions, {root: true})
        // Return resolved promise to resolve beforeEnter route on /match/:id
        return Promise.resolve(true)
      })
      .catch(e => {
        console.error(e)
        return Promise.resolve(false)
      })
  },
  startListener({dispatch, rootState}, slug) {
    if (slug || rootState.quiz.match) {
      console.log('Match found. Listener started.')
      const params = {slug: slug || rootState.quiz.match.slug}
      subscription = client.listen(listenerQuery, params).subscribe(update => {
        dispatch('updateQuiz', update.result)
      })
    } else {
      console.log('No match found. Listener not started.')
    }
  },
  stopListener() {
    console.log('Listener started stopped.')
    subscription.unsubscribe()
  },
  updateQuiz({dispatch, rootState}, match) {
    // Update quiz/isOngoing
    const isOngoing = match.startedAt && !match.finishedAt
    dispatch('quiz/getIsOngoing', isOngoing, {root: true})

    const isFinished = match.startedAt && match.finishedAt
    if (isFinished) {
      dispatch('quiz/finishGame', true, {root: true})
    }

    // Update player/players array
    dispatch('quiz/getPlayers', match.players, {root: true})

    // Update quiz/isQuestionOpen
    dispatch('quiz/getIsCurrentQuestionOpen', match.isCurrentQuestionOpen, {root: true})

    // Get the current question key
    if (match.isCurrentQuestionOpen) {
      dispatch('quiz/getCurrentQuestionKey', match.currentQuestionKey, {root: true})
    } else {
      dispatch('quiz/getCurrentQuestionKey', null, {root: true})
    }

    // Kick active player if active player is no longer in array
    const activePlayerId = rootState.player.player.id
    const playerExists = match.players.find(player => player._ref === activePlayerId)
    if (!playerExists) {
      dispatch('player/kickPlayer', true, {root: true})
    }

    if (router.currentRoute.name !== 'quiz' && match.isCurrentQuestionOpen) {
      router.push({name: 'quiz'})
    }
  },
  submitAnswer({rootState}, key) {
    const {player, quiz} = rootState
    const params = {
      playerId: player.player.id,
      matchSlug: quiz.match.slug,
      questionKey: quiz.currentQuestionKey,
      selectedChoiceKey: key
    }
    return submitAnswerToQuestion(params)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
