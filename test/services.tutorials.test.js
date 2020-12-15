const assert = require('assert')
const proxyquire = require('proxyquire')

const { getAllStub, MongoLibMock } = require('../utils/mocks/mongoLib')
const { tutorialsMocks } = require('../utils/mocks/tutorials')

describe('services - tutorials', () => {
  const TutorialsService = proxyquire('../services/tutorials', {
    '../lib/mongo': MongoLibMock
  })

  const tutorialsService = new TutorialsService()

  describe('when getTutorials is called', async () => {
    it('should call the getall MongoLib method', async () => {
      await tutorialsService.getTutorials({})
      assert.strictEqual(getAllStub.called, true)
    })

    it('should return an array of tutorials', async () => {
      const result = await tutorialsService.getTutorials({})
      const expected = tutorialsMocks
      assert.deepStrictEqual(result, expected)
    })
  })
})