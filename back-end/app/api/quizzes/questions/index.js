const { Router } = require('express')
const { Answer, Quiz, Question } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const AnswersRouter = require('./answers')
const { filterQuestionsFromQuizz, buildQuestion, buildQuestions } = require('./manager')

const router = new Router({ mergeParams: true })
router.use('/:questionId/answers', AnswersRouter)


router.get('/', (req, res) => {
  try {
    const questions = buildQuestions()
    res.status(200).json(questions)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = buildQuestion(req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    const quizId = parseInt(req.params.quizId, 10)
    const question = Question.create({ ...req.body, quizId })
    question.answers = []
    // If answers have been provided in the request, we create the answer and update the response to send.
    if (req.body.answers && req.body.answers.length > 0) {
      req.body.answers.map((answer) => Answer.create({ ...answer, questionId: question.id }))
    }
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    const updatedQuestion = req.body
    updatedQuestion.answers = []
    res.status(200).json(Question.update(req.params.questionId, updatedQuestion))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    Question.delete(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:questionId/answers', AnswersRouter)

module.exports = router
