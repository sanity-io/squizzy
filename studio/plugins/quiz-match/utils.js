import * as config from '../../quizConfig'

const {correctAnswerScore, firstAnswerScore} = config.default.match

const calculateScore = placing => correctAnswerScore + firstAnswerScore / (placing + 1)

const sortBy = (sortField, direction = 'asc') => (a, b) => {
  if (a[sortField] < b[sortField]) {
    return direction === 'asc' ? -1 : 1
  }
  if (a[sortField] > b[sortField]) {
    return direction === 'asc' ? 1 : -1
  }
  return 0
}

export const assembleMatchUrl = ({slug}) => {
  if (window.location.hostname === 'localhost') {
    return `${config.default.localWebHost}/match/${slug.current}`
  }
  return `${config.default.remoteWebHost}/match/${slug.current}`
}

export function findCurrentQuestion(match) {
  return match.quiz.questions.find(question => question._key === match.currentQuestionKey)
}

export function getCurrentProgress(match) {
  const currentQuestionIndex =
    match.quiz.questions.findIndex(question => question._key === match.currentQuestionKey) + 1
  return `(${currentQuestionIndex}/${match.quiz.questions.length})`
}

export const answerDistribution = match => {
  const {currentQuestionKey, answers, quiz} = match
  const {questions} = quiz
  const currentQuestion = questions.find(question => question._key === currentQuestionKey)

  const choicesWithAnswerCount = currentQuestion.choices.map(choice => {
    const answersToThisChoice = answers
      ? answers.filter(
          answer =>
            answer.questionKey === currentQuestionKey && answer.selectedChoiceKey === choice._key
        )
      : []

    return Object.assign({}, choice, {answerCount: answersToThisChoice.length})
  })

  return choicesWithAnswerCount
}

// Use the questionKey parameter to get scores for that particular question only
export const scoresByPlayer = (match, questionKey = 0) => {
  const {currentQuestionKey, answers, quiz, players = []} = match
  const {questions} = quiz
  const indexOfCurrentQuestion = questions
    .map(question => question._key)
    .indexOf(currentQuestionKey)

  if (players.length === 0) {
    return []
  }

  // gather all answered questions
  let questionsToCalculate
  if (questionKey === 0) {
    // base calculation on all questions up until the current question
    // if no currentQuestion, use all questions
    const lastIndex = indexOfCurrentQuestion > -1 ? indexOfCurrentQuestion + 1 : questions.length
    questionsToCalculate = questions.slice(0, lastIndex)
  } else {
    // base calculation on a given question
    const questionIndex = questions.map(question => question._key).indexOf(questionKey)
    questionsToCalculate = questions.slice(questionIndex, questionIndex + 1)
  }

  // prime the return array
  const playersWithScores = players.map(player => ({
    name: player.name,
    _id: player._id,
    score: 0
  }))

  questionsToCalculate.forEach(question => {
    // begin with all answers to this questions
    answers &&
      answers
        .filter(
          answer =>
            answer.questionKey === question._key &&
            answer.selectedChoiceKey ===
              (question.choices.find(choice => choice.isCorrect) || {})._key
        ) // only correct answers to this question reamain
        .sort(sortBy('submittedAt', 'asc')) // order by who answered first
        .forEach((answer, index) => {
          const correctPlayer = playersWithScores.find(player => player._id === answer.player._id)
          if (correctPlayer) {
            // mutate player score based on placing
            correctPlayer.score += calculateScore(index) // boom
          } else {
            // If a player joined, but left the game after submitting some answers
            // should we add him/her to the playersWithScores list and count score?
          }
        })
  })

  return playersWithScores.sort(sortBy('score', 'desc')) // order by score high  -> low
}

export const allPlayersHaveSubmitted = (match, questionKey) => {
  const {answers, players} = match
  if (!answers || answers.length === 0 || !questionKey) {
    return false
  }
  const playerIdsWithSubmissions = match.answers
    .filter(answer => answer.questionKey === questionKey)
    .map(answer => answer.player._id)
    .sort()
    .join(',')
  const playerIds = players
    .map(player => player._id)
    .sort()
    .join(',')

  return playerIds === playerIdsWithSubmissions
}
