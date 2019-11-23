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
    const answersToThisChoice = answers.filter(
      answer =>
        answer.questionKey === currentQuestionKey && answer.selectedChoiceKey === choice._key
    )

    return Object.assign({}, choice, {answerCount: answersToThisChoice.length})
  })

  return choicesWithAnswerCount
}
