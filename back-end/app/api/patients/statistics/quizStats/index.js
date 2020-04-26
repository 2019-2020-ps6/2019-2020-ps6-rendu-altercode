const { Router } = require('express')
const { QuizStat, Statistics, Quiz } = require('../../../../models')
const manageAllErrors = require('../../../../utils/routes/error-management')
const { filterQuizStatsFromStat, getQuizStatFromStatistics } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const stat = Statistics.getById(req.params.statisticsId)
    const quizStats = filterQuizStatsFromStat(stat.id)
    res.status(200).json(quizStats)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:quizStatId', (req, res) => {
  try {
    const answer = getQuizStatFromStatistics(req.params.patientId, req.params.statisticsId, req.params.quizStatId)
    res.status(200).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.post('/:quizId', (req, res) => {
  try {
    Statistics.getById(req.params.statisticsId)
    const statisticsId = parseInt(req.params.statisticsId, 10)
    const quizId = parseInt(req.params.quizId, 10)

    const quizStats = QuizStat.create({
      quizId, statisticsId, nbQuizDone: 0, nbQuizTry: 0, nbMissClick: 0, nbWrongAnswer: 0, nbGoodAnswer: 0,
    })
    res.status(201).json(quizStats)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizStatId', (req, res) => {
  try {
    res.status(200).json(QuizStat.update(req.params.quizStatId, { ...req.body }))
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:quizStatId', (req, res) => {
  try {
    QuizStat.delete(req.params.quizStatId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
