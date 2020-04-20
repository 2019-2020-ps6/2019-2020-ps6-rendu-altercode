const { Patient} = require('../../models')
const { filterStylesFromPatient } = require('./styles/manager')

const buildPatient = (patientId) => {
  const patient = Patient.getById(patientId)
  const style = filterStylesFromPatient(patient.id)
  return { ...patient, style}
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
