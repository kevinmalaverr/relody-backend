const fs = require('fs')
const path = require('path')

const STATIC_PATH = path.join(process.cwd(), 'static')

function readFile(dir, name) {
  const file = fs.createReadStream(path.join(STATIC_PATH, dir))
  const data = file.read()
  file.end()

  return data
}


function writeFile(dir, name, data) {
  try {
    mkdirIfNotExists(path.join(STATIC_PATH, dir))
    const file = fs.createWriteStream(path.join(STATIC_PATH, dir, name), { flags: 'w' })
    file.write(data)
    file.end()
  } catch (error) {
    console.log(error)
  }
}


function mkdirIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    return fs.mkdirSync(dir, { recursive: true }, (err) => { throw new Error(err) })
  }
}



module.exports = { readFile, writeFile }