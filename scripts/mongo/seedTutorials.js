// DEBUG=app:* node scripts/mongo/seedTutorials.js

const chalk = require('chalk')
const debug = require('debug')('app:scripts:tutorials')
const MongoLib = require('../../lib/mongo')
const { tutorialsMocks } = require('../../utils/mocks/tutorials')

async function seedTutorials () {
  try {
    const mongoDb = new MongoLib()

    const promises = tutorialsMocks.map(async (tutorial) => {
      await mongoDb.create('tutorials', { ...tutorial, likes: Math.floor(Math.random() * 200) })
    })

    await Promise.all(promises)
    debug(chalk.green(`${promises.length} tutorials have been created succesfully`)) // prettier-ignore
    return process.exit(0)
  } catch (error) {
    debug(chalk.red(error))
    process.exit(1)
  }
}

seedTutorials()
