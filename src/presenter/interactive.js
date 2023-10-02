const argsParser = require("../utils/argsParser");
const comander = require("../action/commander");

const errors = require("../utils/error");

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

const pretty = (str) => {
  switch (str) {
    case errors.COMMAND_NOT_FOUND:
      return "Command not found";
    case errors.DATA_NOT_FOUND:
      return "Not found";
    case errors.RACKS_OUT_OF_BOUND:
      return "Sorry, rack is full";
    case errors.WAREHOUSE_NOT_INIT:
      return "Warehouse not initialized";
  }
};

module.exports = () => {
  rl.prompt();

  rl.on("line", (line) => {
    const args = argsParser(line);

    const err = comander({ ...args });

    if (err !== null) {
      console.log(pretty(err));
    }

    rl.prompt();
  }).on("close", () => {
    process.exit(0);
  });
};
