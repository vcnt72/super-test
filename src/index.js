const interactive = require("./presenter/interactive");
const file = require("./presenter/file");

const isFile = process.argv.length !== 2;

if (isFile) {
  file();
} else {
  interactive();
}
