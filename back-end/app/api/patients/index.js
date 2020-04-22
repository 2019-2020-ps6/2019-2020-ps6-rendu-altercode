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
    const patient = Patient.create({ ...req.body })
    // eslint-disable-next-line no-unused-vars
    const style = Style.create({
      typePolice: 'Times New Roman', heightPolice: 50, colorBody: '#ffffff ', colorPolice: ' #000000', patientId: patient.id,
    })
    const stat = Statistics.create({
      patientId: 0,
      nbQuizDone: 0,
      nbMissClick: 0,
      nbWrongAnswer: 0,
      nbGoodAnswer: 0,
    })
    patient.statistics = stat
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

router.delete('/:patientId', (req, res) => {
  try {
    Patient.delete(req.params.patientId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
