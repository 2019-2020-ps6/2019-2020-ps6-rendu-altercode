const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Statistics', {
  patientId: Joi.number(),
  quizStat: Joi.array(),
  nbMissClick: Joi.number(),
  nbWrongAnswer: Joi.number(),
  nbGoodAnswer: Joi.number(),
})
