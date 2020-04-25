const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Style', {
  typePolice: Joi.string(),
  heightPolice: Joi.string(),
  colorBody: Joi.string(),
  colorPolice: Joi.string(),
  patientId: Joi.number(),
})
