const { Patient, Style } = require('../../../models')

/**
 * filterQuestionsFromQuizz.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param quizId
 */
const filterStylesFromPatient = (patientId) => {
  const styles = Style.get()
  const parsedId = parseInt(patientId, 10)
  return styles.filter((style) => style.patientId === parsedId)
}

/**
 * getQuestionFromQuiz.
 * This function retrieves a question from a quiz. It will throw a not found exception if the quizId in the question is different from the one provided in parameter.
 * @param quizId
 * @param questionId
 */
const getStyleFromPatient = (patientId, styleId) => {
  // Check if patientId exists, if not it will throw a NotFoundError
  const patient = Patient.getById(patientId)
  const patientIdInt = parseInt(patientId, 10)
  const style = Style.getById(styleId)
  if (style.patientId !== patientIdInt) throw new NotFoundError(`${patient.name} id=${styleId} was not found for ${patient.name} id=${patient.id} : not found`)
  return style
}

module.exports = {
  filterStylesFromPatient,
  getStyleFromPatient,
}
