const { Style } = require('../../../models')

const filterStyleFromStyle = (patientId) => Style.get().filter((style) => (style.patientId === patientId))

module.exports = {
  filterStyleFromStyle,
}
