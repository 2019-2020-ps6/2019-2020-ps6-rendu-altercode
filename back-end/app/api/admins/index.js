const { Router } = require('express')

const { Admin } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Admin.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:adminId', (req, res) => {
  try {
    res.status(200).json(Admin.getById(req.params.adminId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = Admin.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:adminId', (req, res) => {
  try {
    res.status(200).json(Admin.update(req.params.adminId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:adminId', (req, res) => {
  try {
    Admin.delete(req.params.adminId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
