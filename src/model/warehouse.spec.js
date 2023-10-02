const error = require("../utils/error");
const Rack = require("./slot");
const Warehouse = require("./warehouse");

describe("Add rack suite", function () {
  /**
   * @type {Warehouse}
   */
  let warehouse = null;

  beforeEach(function () {
    warehouse = new Warehouse(2);
  });

  it("should add rack successfully", function () {
    const res = warehouse.addSlot(new Rack("test", new Date("2011-01-02")));

    expect(res.data).toBe(1);
    expect(warehouse.size()).toBe(1);
    expect(warehouse.getSlots()[0].getSkuNo()).toBe("test");
  });

  it("should assign things to previous slot when previous slot is null", function () {
    warehouse.addSlot(new Rack("test", new Date("2011-01-02")));

    warehouse.addSlot(new Rack("tes2", new Date("2011-01-02")));

    warehouse.deleteSlot(1);

    const res = warehouse.addSlot(new Rack("test1", new Date("2011-01-02")));

    expect(res.data).toBe(1);
    expect(warehouse.size()).toBe(2);
    expect(warehouse.getSlots()[0].getSkuNo()).toBe("test1");
  });

  it("should assign product to null slot ", function () {
    warehouse.addSlot(new Rack("test", new Date("2011-01-02")));

    warehouse.addSlot(new Rack("tes2", new Date("2011-01-02")));

    expect(warehouse.size()).toBe(2);
    expect(warehouse.getSlots()[1].getSkuNo()).toBe("tes2");
  });
});

describe("Delete rack suite", function () {
  /**
   * @type {Warehouse}
   */
  let warehouse = null;

  beforeEach(function () {
    warehouse = new Warehouse(2);
  });

  it("should delete rack successfully", function () {
    warehouse.addSlot(new Rack("test", new Date("2011-01-02")));

    warehouse.deleteSlot(1);

    expect(warehouse.size()).toBe(0);
    expect(warehouse.getSlots()[0]).toBe(null);
  });

  it("should error when no is out of bound", function () {
    warehouse.addSlot(new Rack("test", new Date("2011-01-02")));

    const lowerThan0 = warehouse.deleteSlot(0);

    const afterMaxLength = warehouse.deleteSlot(10);

    expect(lowerThan0.error).toBe(error.VALIDATION_ERROR);

    expect(afterMaxLength.error).toBe(error.VALIDATION_ERROR);
  });
});
