const correctAnswerScore = 100
const firstAnswerScore = 50

const calculateScore = placing => {
  return correctAnswerScore + firstAnswerScore / (placing + 1)
}

const sortBy = (sortField, direction = 'asc') => {
  return (a, b) => {
    if (a[sortField] < b[sortField]) {
      return direction === 'asc' ? -1 : 1
    }
    if (a[sortField] > b[sortField]) {
      return direction === 'asc' ? 1 : -1
    }
    return 0
  }
}

export const assembleMatchUrl = match => {
  return `https://exmple.com/${match.slug.current}`
}

export const choiceColors = ['green', 'red', 'blue', 'pink']
export const choiceSymbols = ['⭐', '⚪', '🐹', '🟦']

export function findCurrenQuestion(match) {
  return match.quiz.questions.find(question => question._key === match.currentQuestionKey)
}

export const answerDistribution = match => {
  const {currentQuestionKey, answers, quiz} = match
  const {questions} = quiz
  const currentQuestion = questions.find(question => question._key === currentQuestionKey)

  const choicesWithAnswerCount = currentQuestion.choices.map(choice => {
    const answersToThisChoice = answers ? answers.filter(
      answer =>
        answer.questionKey === currentQuestionKey && answer.selectedChoiceKey === choice._key
    ) : []

    return Object.assign({}, choice, {answerCount: answersToThisChoice.length})
  })

  return choicesWithAnswerCount
}

export const currentScoreboard = match => {
  const {currentQuestionKey, answers, quiz, players} = match
  const {questions} = quiz

  const indexOfCurrentQuestion = questions
    .map(question => question._key)
    .indexOf(currentQuestionKey)

  // gather all answered questions
  const answeredQuestions = questions.slice(0, indexOfCurrentQuestion + 1)

  // prime the return array
  const playersWithScores = players.map(player => ({name: player.name, _id: player._id, score: 0}))

  answeredQuestions.forEach(question => {
    // begin with all answers to this questions
    answers && answers
      .filter(
        answer =>
          answer.questionKey === question._key &&
          answer.selectedChoiceKey === question.choices.find(choice => choice.isCorrect)._key
      ) // only correct answers to this question reamain
      .sort(sortBy('submittedAt', 'asc')) // order by who answered first
      .forEach((answer, index) => {
        const correctPlayer = playersWithScores.find(player => player._id === answer.player._id)
        correctPlayer.score = correctPlayer.score + calculateScore(index)
      }) // mutate player score based on placing
  })

  return playersWithScores.sort(sortBy('score', 'desc')) // order by score high  -> low
}
