const fs = require('fs')
const gulp = require('gulp')
const HubRegistry = require('gulp-hub')

const TASK_PATH = './gulp/'

const taskList = fs.readdirSync(TASK_PATH).map(task => TASK_PATH + task)

const hub = new HubRegistry(taskList)

gulp.registry(hub)
