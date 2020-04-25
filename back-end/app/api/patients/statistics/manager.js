const { Statistics } = require('../../../models')
const { filterQuizStatsFromStat } = require('./quizStats/manager')

const filterStatFromPatient = (patientId) => Statistics.get().filter((stat) => (stat.patientId === patientId))

const buildStat = (statisticsId) => {
  const stat = Statistics.getById(statisticsId)
  const quizStat = filterQuizStatsFromStat(stat.id)
  return { ...stat, quizStat }
}

const buildStats = () => {
  const stats = Statistics.get()
  return stats.map((stat) => buildStat(stat.id))
}

module.exports = {
  filterStatFromPatient,
  buildStat,
  buildStats,
}
