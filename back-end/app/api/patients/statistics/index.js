const { Router } = require('express')
const { Patient, Statistics } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const { filterStatisticsFromPatient } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    Patient.getById(req.params.patientId)
    res.status(200).json(filterStatisticsFromPatient(req.params.patientId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    Patient.getById(req.params.patientId)
    const patientId = parseInt(req.params.patientId, 10)
    const statistics = Statistics.create({patientId, nbQuizDone: 0, nbMissClick: 0, nbWrongAnswer: 0, nbGoodAnswer: 0})
    res.status(201).json(statistics)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:statisticsId', (req, res) => {
  try {
    const statistics = filterStatisticsFromPatient(req.params.patientId)
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

module.exports = router
