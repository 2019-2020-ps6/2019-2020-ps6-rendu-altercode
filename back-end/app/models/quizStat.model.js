const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('quizStat', {
    quizId: Joi.number(),
    nbQuizDone: Joi.number(),
    nbQuizTry: Joi.number(),
})
