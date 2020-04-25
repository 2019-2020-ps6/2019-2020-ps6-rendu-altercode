const { Router } = require('express')
const { Patient, Style } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const { filterStyleFromPatient } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200).json(filterStyleFromPatient(req.params.patientId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:styleId', (req, res) => {
  try {
    const style = Style.getById(req.params.styleId)
    res.status(200).json(style)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    Patient.getById(req.params.patientId)
    const patientId = parseInt(req.params.patientId, 10)
    const style = Style.create({ ...req.body, patientId })
    res.status(201).json(style)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:styleId', (req, res) => {
  try {
    const updatedStyle = Style.update(req.params.styleId, { ...req.body, patientId: parseInt(req.params.patientId, 10) })
    res.status(200).json(updatedStyle)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:styleId', (req, res) => {
  try {
    Style.delete(req.params.styleId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
