const argsParser = require("./argsParser");

describe("argsParser suite", function () {
  it("should parse successfully", function () {
    const str = "command a b";

    const { command, args } = argsParser(str);
    expect(command).toBe("command");
    expect(args).toEqual(["a", "b"]);
  });
});
