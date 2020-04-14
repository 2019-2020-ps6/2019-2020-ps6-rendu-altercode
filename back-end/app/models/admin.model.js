const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Admin', {
  connectId: Joi.string().required(),
  pwd: Joi.string().required(),
})
