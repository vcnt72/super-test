const fs = require("fs");
const commander = require("../action/commander");
const argsParser = require("../utils/argsParser");
const errors = require("../utils/error");

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
  const data = fs.readFileSync(process.argv[2], {
    encoding: "utf8",
    flag: "r",
  });

  data
    .trim()
    .split("\n")
    .forEach((val) => {
      const args = argsParser(val);
      const err = commander({ ...args });

      if (err !== null) {
        console.log(pretty(err));
      }
    });

  process.exit(0);
};
