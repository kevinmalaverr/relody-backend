const MongoLib = require('../lib/mongo')
const crypto = require('crypto')
const { writeFile } = require('../utils/dir/readWriteFile')


class TutorialsService {
  constructor() {
    this.collection = 'tutorials'
    this.mongoDb = new MongoLib()
  }

  async getTutorials({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const tutorials = await this.mongoDb.getAll(this.collection, query)
    return tutorials || []
  }

  async getTutorial({ tutorialId }) {
    const tutorial = await this.mongoDb.get(this.collection, tutorialId);
    return tutorial || {};
  }

  async createTutorial({ tutorial }) {
    const createdTutorialId = await this.mongoDb.create(this.collection, tutorial);
    return createdTutorialId;
  }

  async updateTutorial({ tutorialId, tutorial } = {}) {
    const updatedTutorialId = await this.mongoDb.update(
      this.collection,
      tutorialId,
      tutorial
    );
    return updatedTutorialId;
  }

  async deleteTutorial({ tutorialId }) {
    const deletedTutorialId = await this.mongoDB.delete(this.collection, tutorialId);
    return deletedTutorialId;
  }
}

module.exports = TutorialsService