const { Statistics } = require('../../../models')

/**
 * filterStatisticsFromQuizz.
 * This function filters among the statistics to return only the Statistics linked with the given patientId.
 * @param patientId
 */
const filterStatisticsFromPatient = (patientId) => {
  const statistics = Statistics.get()
  const parsedId = parseInt(patientId, 10)
  return statistics.filter((statistic) => statistic.patientId === parsedId)
}

module.exports = {
  filterStatisticsFromPatient,
}
