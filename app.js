const express = require('express')
const multer = require('multer')

const parseMissionData = require('./utils/parseMissionData')
const readMissionData = require('./utils/readMissionData')

const app = express()
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const limits = {
  fileSize: 100 * 1024 * 1024, // 100 MB
  files: 1
}
const upload = multer({
  limits: limits,
  preservePath: true,
  storage: storage
})

const port = process.env.PORT || 3000

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/upload', upload.single('mission'), (req, res) => {
  readMissionData(req.file.path)
    .then((data) => {
      const mission = parseMissionData(data)
      res.json(mission)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

app.listen(port, () => {
  console.log('App is running on port ' + port)
})
