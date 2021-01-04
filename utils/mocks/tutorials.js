const tutorialsMocks = require('./tutorialsMocks.json')

function filteredTutorialsMock (tag) {
  return tutorialsMocks.filter(tutorial => tutorial.songName.includes(tag))
}

class TutorialsServiceMock {
  async getTutorials () {
    return Promise.resolve(tutorialsMocks)
  }

  async createTutorial () {
    return Promise.resolve(tutorialsMocks[0])
  }
}

module.exports = {
  filteredTutorialsMock,
  tutorialsMocks,
  TutorialsServiceMock
}
