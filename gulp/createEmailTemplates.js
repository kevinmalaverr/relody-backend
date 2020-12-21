const { src, dest, task } = require("gulp");
const through = require("through2");
const mjmlEngine = require("mjml");
const rename = require("gulp-rename");

const TEMPLATES_PATH = "./email-templates/mjml/";
const FILES_NAMES = ["header"];

const filesToRender = FILES_NAMES.map(
  (file) => TEMPLATES_PATH + file + ".mjml"
);

const templateToJs = through.obj((file, _, cb) => {
  if (file.isBuffer()) {
    const output = file.clone();
    let render = "";

    try {
      render += "module.exports = function (content){ return `";
      render += mjmlEngine(file.contents.toString(), {
        filePath: TEMPLATES_PATH,
        minify: true,
        keepComments: false,
      }).html;
      render += "`}";
    } catch (e) {
      console.error(e);
      return cb();
    }

    output.contents = Buffer.from(render);

    cb(null, output);
  }
});

task("create-email", () => {
  return src(filesToRender)
    .pipe(templateToJs)
    .pipe(rename({ extname: ".js" }))
    .pipe(dest("./email-templates/"));
});
