const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizStat', {
  statisticsId: Joi.number(),
  quizId: Joi.number(),
  nbQuizDone: Joi.number(),
  nbQuizTry: Joi.number(),
  nbMissClick: Joi.number(),
  nbWrongAnswer: Joi.number(),
  nbGoodAnswer: Joi.number(),
})
