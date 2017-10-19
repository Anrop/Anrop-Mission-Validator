const { exec } = require('child_process')

function readBinarizedFile(missionFilePath, callback) {
  exec(`armake cat ${missionFilePath} mission.sqm | armake derapify`, callback)
}

function readNonBinarizedFile(missionFilePath, callback) {
  exec(`armake cat ${missionFilePath} mission.sqm`, callback)
}

module.exports = function readMissionData (missionFilePath) {
  return new Promise((resolve, reject) => {
    return readBinarizedFile(missionFilePath, (error, stdout, stderr) => {
      if (error) {
        return readNonBinarizedFile(missionFilePath, (error, stdout, stderr) => {
          if (error) {
            return reject(error)
          }

          return resolve(stdout)
        })
      }

      return resolve(stdout)
    })
  })
}
