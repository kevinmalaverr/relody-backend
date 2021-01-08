const MongoLib = require('../lib/mongo')

class TutorialsService {
  constructor () {
    this.collection = 'tutorials'
    this.mongoDb = new MongoLib()
  }

  async getTutorials ({ pageNumber }) {
    const nPerPage = 10
    const tutorials = await this.mongoDb.getPagination(this.collection, { query: {}, sort: { likes: -1 }, pageNumber, nPerPage })
    return tutorials || []
  }

  async getTutorial ({ tutorialId }) {
    const tutorial = await this.mongoDb.get(this.collection, tutorialId)
    return tutorial || {}
  }

  async createTutorial ({ tutorial }) {
    const createdTutorialId = await this.mongoDb.create(this.collection, tutorial)
    return createdTutorialId
  }

  async updateTutorial ({ tutorialId, tutorial } = {}) {
    const updatedTutorialId = await this.mongoDb.update(
      this.collection,
      tutorialId,
      tutorial
    )
    return updatedTutorialId
  }

  async deleteTutorial ({ tutorialId }) {
    const deletedTutorialId = await this.mongoDb.delete(this.collection, tutorialId)
    return deletedTutorialId
  }
}

module.exports = TutorialsService
