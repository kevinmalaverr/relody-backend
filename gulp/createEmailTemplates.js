const { src, dest, task } = require('gulp');
const through = require('through2');
const mjmlEngine = require('mjml');
const rename = require('gulp-rename');

const TEMPLATES_PATH = './email-templates/mjml/';
const FILES_NAMES = ['general'];

const filesToRender = FILES_NAMES.map(
  (file) => TEMPLATES_PATH + file + '.mjml'
);

const templateToJs = through.obj((file, _, cb) => {
  if (file.isBuffer()) {
    const output = file.clone();
    const fileString = file.contents.toString();
    const [...matches] = fileString.matchAll(/\$\{(.*)\}/g);

    let render = '';

    try {
      render += `module.exports = function ({${matches
        .map((match) => match[1])
        .join()}}){ `;

      render += 'return `';
      render += mjmlEngine(fileString, {
        filePath: TEMPLATES_PATH,
        minify: true,
        keepComments: false,
      }).html;
      render += '`}';
    } catch (e) {
      console.error(e);
      return cb();
    }

    output.contents = Buffer.from(render);

    cb(null, output);
  }
});

task('create-email-templates', () => {
  return src(filesToRender)
    .pipe(templateToJs)
    .pipe(rename({ extname: '.js' }))
    .pipe(dest('./email-templates/'));
});
