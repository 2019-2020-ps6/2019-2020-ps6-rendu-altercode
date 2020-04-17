const { Router } = require('express')
const StyleRouter = require('./styles')
const { Patient } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildPatient, buildPatients } = require('./manager')

const router = new Router()
router.use('/:patientId/styles', StyleRouter)

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
