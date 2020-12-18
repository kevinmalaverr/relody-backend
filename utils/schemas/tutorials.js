const joi = require('@hapi/joi')
const { mongoIdSchema } = require('./common')

const tutorialIdSchema = mongoIdSchema
const tutorialSongName = joi.string().max(60)
const tutorialArtist = joi.string().max(60)
const tutorialAutor = mongoIdSchema
const tutorialInstrument = joi.string()
const tutorialDifficult = joi.number().min(1).max(5)
const tutorialContent = joi.object()

const createTutorialSchema = {
  songName: tutorialSongName.required(),
  artist: tutorialArtist.required(),
  autor: tutorialAutor.required(),
  instrument: tutorialInstrument.required(),
  difficult: tutorialDifficult.required(),
  content: tutorialContent.required(),
}

const updateTutorialSchema = {
  songName: tutorialSongName,
  artist: tutorialArtist,
  instrument: tutorialInstrument,
  difficult: tutorialDifficult,
  content: tutorialContent,
}

module.exports = { tutorialIdSchema, createTutorialSchema, updateTutorialSchema }