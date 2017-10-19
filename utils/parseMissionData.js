const armaClassParser = require('arma-class-parser')

module.exports = function parseMissionData (data) {
  return armaClassParser(data)
}
