const { Patient } = require('../../models')
const { filterStyleFromStyle } = require('./styles/manager')
const { filterStatFromPatient } = require('./statistics/manager')
const { filterQuizStatsFromStat } = require('./statistics/quizStats/manager')

const buildPatient = (patientId) => {
  const patient = Patient.getById(patientId)
  const style = filterStyleFromStyle(patient.id)
  const statistics = filterStatFromPatient(patient.id)
  const statisticsWithQuizStat = statistics.map((stat) => {
    const quizStat = filterQuizStatsFromStat(stat.id)
    return { ...stat, quizStat }
  })
  return { ...patient, statistics: statisticsWithQuizStat, style }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildPatients = () => {
  const patients = Patient.get()
  return patients.map((patient) => buildPatient(patient.id))
}

module.exports = {
  buildPatient,
  buildPatients,
}
