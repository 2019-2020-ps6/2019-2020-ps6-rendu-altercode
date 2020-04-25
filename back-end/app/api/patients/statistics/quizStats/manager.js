const { QuizStat, Statistics } = require('../../../../models')

const filterQuizStatsFromStat = (statisticsId) => QuizStat.get().filter((quizStat) => (quizStat.statisticsId === statisticsId))

const getQuizStatFromStatistics = (patientId, statisticsId, quizStatId) => {
  const statistics = Statistics.getById(statisticsId)
  const quizStat = QuizStat.getById(quizStatId)
  // eslint-disable-next-line no-undef
  if (quizStat.statisticsId !== statistics.id) throw new NotFoundError(`${quizStat.id} id=${quizStatId} was not found for id=${statistics.id} : not found`)
  return quizStat
}

module.exports = {
  filterQuizStatsFromStat,
  getQuizStatFromStatistics,
}
