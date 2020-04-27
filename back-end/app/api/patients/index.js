const { Router } = require('express')
const StyleRouter = require('./styles')
const StatisticsRouter = require('./statistics')
const { Patient, Style, Statistics } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildPatient, buildPatients } = require('./manager')

const router = new Router()
router.use('/:patientId/styles', StyleRouter)
router.use('/:patientId/statistics', StatisticsRouter)

router.get('/', (req, res) => {
  try {
    const patients = buildPatients()
    res.status(200).json(patients)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:patientId', (req, res) => {
  try {
    const patient = buildPatient(req.params.patientId)
    res.status(200).json(patient)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const patient = Patient.create({ ...req.body, style: [], statistics: [] })
    // eslint-disable-next-line no-unused-vars
    Style.create({
      heightPolice: 1, colorBody: '#ffffff ', colorPolice: ' #000000', patientId: parseInt(patient.id, 10),
    })
    Statistics.create({
      patientId: patient.id,
      quizStat: [],
    })
    res.status(201).json(patient)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:patientId', (req, res) => {
  try {
    res.status(200).json(Patient.update(req.params.patientId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:patientId/quizzes', (req, res) => {
  try {
    const patient = req.body
    patient.style = []
    patient.statistics = []
    res.status(200).json(Patient.update(req.params.patientId, patient))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:styleId', (req, res) => {
  try {
    Patient.delete(req.params.styleId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
