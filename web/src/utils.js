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
