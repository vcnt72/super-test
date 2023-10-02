const { Warehouse, Rack } = require("../model");
const error = require("../utils/error");
const {
  WAREHOUSE_NOT_INIT,
  COMMAND_NOT_FOUND,
  DATA_NOT_FOUND,
} = require("../utils/error");

/**
 * @type {Warehouse}
 */
let warehouse = null;

class Commander {
  action({ command, args }) {
    if (warehouse == null && command != "create_warehouse_rack") {
      return WAREHOUSE_NOT_INIT;
    }

    switch (command) {
      case "create_warehouse_rack":
        return this.#createWarehouseRack(args);
      case "rack":
        return this.#rack(args);

      case "rack_out":
        return this.#rackOut(args);
      case "status":
        return this.#status();
      case "sku_numbers_for_product_with_exp_date":
        return this.#skuNumbersForProductWithExpDate(args);
      case "slot_number_for_sku_number":
        return this.#slotNumberForSkuNumber(args);
      case "slot_numbers_for_product_with_exp_date":
        return this.#slotNumbersForProductWithExpDate(args);
      default:
        return COMMAND_NOT_FOUND;
    }
  }

  #createWarehouseRack(args) {
    const [maxLength] = args;

    if (Number.isNaN(maxLength)) {
      return error.VALIDATION_ERROR;
    }

    if (+maxLength < 0) {
      return error.VALIDATION_ERROR;
    }

    warehouse = new Warehouse(maxLength);
    console.log(`Created a warehouse rack with ${+maxLength} slots`);
    return null;
  }

  #rack(args) {
    const [skuNo, expiredDate] = args;

    if (skuNo === "") {
      return error.VALIDATION_ERROR;
    }

    if (expiredDate === "") {
      return error.VALIDATION_ERROR;
    }

    const result = warehouse.addSlot(new Rack(skuNo, new Date(expiredDate)));

    if (result.error != null) {
      return result.error;
    }

    console.log(`Allocated slot number: ${result.data}`);

    return null;
  }

  #rackOut(args) {
    const result = warehouse.deleteSlot(args[0]);
    if (result.error != null) {
      return result.error;
    }

    console.log(`Slot number ${result.data} is free`);
    return null;
  }

  #status() {
    const racks = warehouse
      .getSlots()
      .map((val, idx) =>
        !val ? null : `${idx + 1}\t\t${val.toString().replace(/\s/g, "\t\t")}`
      )
      .filter((val) => val !== null);
    console.log(["Slot No.\tSKU No.\tExp Date", ...racks].join("\n"));
    return null;
  }

  #skuNumbersForProductWithExpDate(args) {
    const [expireDate] = args;

    const racks = warehouse
      .getSlots()
      .filter(
        (val) =>
          val !== null &&
          val.getExpireDate().getTime() === new Date(expireDate).getTime()
      );

    if (racks.length === 0) {
      return DATA_NOT_FOUND;
    }

    console.log(racks.map((val) => val.getSkuNo()).join(", "));
    return null;
  }

  #slotNumberForSkuNumber(args) {
    const [skuNo] = args;
    const rackIndex = warehouse
      .getSlots()
      .findIndex((val) => val.getSkuNo() === skuNo);

    if (rackIndex === -1) {
      return DATA_NOT_FOUND;
    }

    console.log(rackIndex + 1);

    return null;
  }

  #slotNumbersForProductWithExpDate(args) {
    const [expireDate] = args;

    const racks = warehouse
      .getSlots()
      .map((val, idx) =>
        val ? { date: val.getExpireDate(), no: idx + 1 } : null
      )
      .filter(
        (val) =>
          val != null && val.date.getTime() === new Date(expireDate).getTime()
      );

    if (racks.length === 0) {
      return DATA_NOT_FOUND;
    }

    console.log(racks.map((val) => val.no).join(", "));
    return null;
  }
}

module.exports = ({ command, args }) => {
  if (command == "exit") {
    process.exit(0);
  }

  const commander = new Commander();

  return commander.action({ command, args });
};
