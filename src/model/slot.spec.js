const Slot = require("./slot");

describe("Slot creation", function () {
  it("should successfully created", function () {
    const rack = new Slot("TEST", new Date("2023-01-01"));

    expect(rack.getSkuNo() === "TEST").toBe(true);

    expect(
      rack.getExpireDate().getTime() === new Date("2023-01-01").getTime()
    ).toBe(true);
  });
});

describe("Slot formatting", function () {
  it("should do formatting on string conversion", function () {
    const rack = new Slot("TEST", new Date("2023-01-01"));

    expect(rack.getSkuNo() === "TEST").toBe(true);

    expect(rack.toString()).toBe(`TEST 2023-01-01`);
  });
});
