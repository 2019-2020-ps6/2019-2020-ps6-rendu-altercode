const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const Style = require('./style.model')

module.exports = new BaseModel('Patient', {
  name: Joi.string().required(),
  surname: Joi.string().required(),
  date: Joi.string().required(),
  sexe: Joi.string().required(),
  pathology: Joi.string().required(),
  personality: Joi.string().required(),
  urlImg: Joi.string().empty(''),
  style: Style,
})
