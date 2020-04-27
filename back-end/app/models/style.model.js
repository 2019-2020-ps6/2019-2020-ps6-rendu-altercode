const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Style', {
  heightPolice: Joi.number(),
  colorBody: Joi.string(),
  colorPolice: Joi.string(),
  patientId: Joi.number(),
})
