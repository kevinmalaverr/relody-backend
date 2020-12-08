const MongoLib = require('../lib/mongo')

class TutorialsService {
  constructor() {
    this.collection = 'tutorials'
    this.mongoDb = new MongoLib()
  }

  async getTutorials({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const movies = await this.mongoDb.getAll(this.collection, query)
    return movies || []
  }
}

module.exports = TutorialsService