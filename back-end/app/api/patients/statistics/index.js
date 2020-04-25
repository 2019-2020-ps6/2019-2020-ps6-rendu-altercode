const { Router } = require('express')
const { Statistics } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const { buildStat, buildStats, filterStatFromPatient } = require('./manager')
const QuizStatRouter = require('./quizStats')

const router = new Router({ mergeParams: true })
router.use('/:statisticsId/quiz/:quizId/quizStat', QuizStatRouter)

router.get('/', (req, res) => {
  try {
    const stats = buildStats()
    res.status(200).json(stats)
    // res.status(200).json(filterStatisticsFromPatient(req.params.patientId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:statisticsId/quizStat', (req, res) => {
  try {
    const stat = buildStat(req.params.statisticsId)
    res.status(200).json(stat)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const stat = Statistics.create({ ...req.body })
    res.status(201).json(stat)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:statisticsId', (req, res) => {
  try {
    const statistics = filterStatFromPatient(req.params.patientId)
    const updatedStatistics = Statistics.update(req.params.statisticsId, { ...req.body, patientId: statistics.patientId })
    res.status(200).json(updatedStatistics)
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

router.delete('/:statisticsId', (req, res) => {
  try {
    Statistics.delete(req.params.statisticsId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
