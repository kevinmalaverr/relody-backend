const express = require('express')
const { config } = require('./config/index')
const { errorHandler, logErrors, wrapErrors } = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')
const emailsPreview = require('./routes/emailsPreview')

// routes
const tutorialsApi = require('./routes/tutorials')

const app = express()

// body parser
app.use(express.json())

//routes
tutorialsApi(app)

// emails preview
if (config.dev) {
  emailsPreview(app)
}

// catch 404 error
app.use(notFoundHandler)

// error middleware
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)




app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`)
})