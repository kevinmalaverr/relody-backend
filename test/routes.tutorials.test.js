const assert = require('assert')
const proxyquire = require('proxyquire')

const { TutorialsServiceMock, filteredTutorialsMock, tutorialsMocks } = require('../utils/mocks/tutorials')
const testServer = require('../utils/testServer')

describe('routes - tutorials', () => {
  const route = proxyquire('../routes/tutorials', {
    '../services/tutorials': TutorialsServiceMock
  })

  const request = testServer(route)
  describe('GET /tutorials', () => {
    it('should respond with status 200', (done) => {
      request.get('/api/tutorials').expect(200, done)
    })
  })
})