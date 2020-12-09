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
    const fileName = crypto.randomBytes(12).toString("hex")
    writeFile('tutorials', fileName + '.json', JSON.stringify(tutorial.content))
    const newTutorial = { ...tutorial, content: fileName }
    const createdTutorialId = await this.mongoDb.create(this.collection, newTutorial);
    return createdTutorialId;
  }

  async updateMovie({ movieId, movie } = {}) {
    const updatedMovieId = await this.mongoDb.update(
      this.collection,
      movieId,
      movie
    );
    return updatedMovieId;
  }

  async deleteMovie({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  }
}

module.exports = TutorialsService