export function findCurrenQuestion(match) {
  return match.quiz.questions.find(question => question._key === match.currentQuestionKey)
}
