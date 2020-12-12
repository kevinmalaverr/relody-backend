const joi = require('@hapi/joi')

const songName = joi.string().max(60)
const artist = joi.string()
const autor = joi.string(12).hex()
const instrument = joi.string()
const difficult = joi.number().min(1).max(5)
const likes = joi.number()
const content = joi.object()

const createMovieSchema = {
  songName: 'g',
  artist: '',
  autor: '',
  instrument: '',
  difficult: 5,
  likes: tr,
  content: 'df',
}

const C_SHARP = {
  type: 'CHORDS',
  body: [
    [{ comment: 'intro' },]
  ]
}