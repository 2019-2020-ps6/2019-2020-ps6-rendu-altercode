const { Question } = require('../../../models')
const { filterAnswersFromQuestion } = require('./answers/manager')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

/**
 * filterQuestionsFromQuizz.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param quizId
 */
const filterQuestionsFromQuizz = (quizId) => Question.get().filter((quest) => (quest.quizId === quizId))

const buildQuestion = (questionId) => {
  const quest = Question.getById(questionId)
  const answers = filterAnswersFromQuestion(quest.id)
  return { ...quest, answers }
}

const buildQuestions = () => {
  const questions = Question.get()
  return questions.map((quest) => buildQuestion(quest.id))
}

module.exports = {
  filterQuestionsFromQuizz,
  buildQuestion,
  buildQuestions,
}
