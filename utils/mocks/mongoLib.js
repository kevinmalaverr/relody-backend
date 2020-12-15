const sinon = require('sinon')
const { tutorialsMocks, filteredTutorialsMock } = require('./tutorials')

const getAllStub = sinon.stub()
getAllStub.withArgs('tutorials').resolves(tutorialsMocks)

const tagQuery = { tags: { $in: ['jhon'] } }
getAllStub.withArgs('tutorials', tagQuery).resolves(tutorialsMocks)

const createStub = sinon.stub().resolves(tutorialsMocks[0].id)

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query)
  }

  create(collection, data) {
    return createStub(collection, data)
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
}