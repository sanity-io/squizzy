/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios'

const backendRootUrl = '/api'

export const withdrawFromGame = ({playerId, matchSlug}) => {
  const url = `${backendRootUrl}/withdraw-player`
  const postBody = {
    playerId,
    matchSlug
  }
  return axios
    .post(url, postBody)
    .then(response => {
      if (response.status === 200) {
        return true
      }
      console.error(`Error while trying to leave game. ${playerId}/${matchSlug}`)
      return false
    })
    .catch(error => {
      console.error(`Error while trying to leave game. ${playerId}/${matchSlug}`, error)
      return false
    })
}

export const signUp = ({playerId, playerName, matchSlug}) => {
  const url = `${backendRootUrl}/sign-up-player`
  const postBody = {
    playerId,
    playerName,
    matchSlug
  }
  return axios
    .post(url, postBody)
    .then(response => {
      if (response.status === 200) {
        return true
      }
      console.error(`Error while trying to sign up player. ${playerId}/${playerName}/${matchSlug}`)
      return false
    })
    .catch(error => {
      console.error(
        `Error while trying to sign up player. ${playerId}/${playerName}/${matchSlug}`,
        error
      )
      return false
    })
}

export const submitAnswerToQuestion = ({playerId, matchSlug, questionKey, selectedChoiceKey}) => {
  const url = `${backendRootUrl}/submit-answer`
  const postBody = {
    playerId,
    matchSlug,
    questionKey,
    selectedChoiceKey
  }
  return axios
    .post(url, postBody)
    .then(response => {
      if (response.status === 200) {
        return true
      }
      console.error(
        `Error while trying to submit answer. ${playerId}/${matchSlug}/${questionKey}/${selectedChoiceKey}`
      )
      return false
    })
    .catch(error => {
      console.error(
        `Error while trying to submit answer. ${playerId}/${matchSlug}/${questionKey}/${selectedChoiceKey}`,
        error
      )
      return false
    })
}
