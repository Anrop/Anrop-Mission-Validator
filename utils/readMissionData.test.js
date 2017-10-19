const assert = require('assert')
const path = require('path')
const readMissionData = require('./readMissionData')

const binarizedMissionFile = path.join(__dirname, '..', 'testMissions', 'binarized.altis.pbo')
const nonBinarizedMissionFile = path.join(__dirname, '..', 'testMissions', 'nonbinarized.altis.pbo')

describe('utils', () => {
  describe('readMissionData', () => {
    it('should return mission data for binarized mission.sqm', (done) => {
      readMissionData(binarizedMissionFile)
        .then((data) => {
          assert(data)
          done()
        })
        .catch((err) => {
          done(err)
        })
    })

    it('should return mission data for non binarized mission.sqm', (done) => {
      readMissionData(nonBinarizedMissionFile)
        .then((data) => {
          assert(data)
          done()
        })
        .catch((err) => {
          done(err)
        })
    })
  })
})
