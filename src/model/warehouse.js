const Errors = require("../utils/error");
const Slot = require("./slot");
const Result = require("../utils/result");

class Warehouse {
  /**
   * @returns {Array.<Rack>}
   */
  #slots = [];

  /**
   * @type {number}
   */
  #maxLength;

  /**
   *
   * @param {number} maxLength
   */
  constructor(maxLength) {
    this.#maxLength = maxLength;

    for (let i = 0; i < maxLength; i++) {
      this.#slots.push(null);
    }
  }

  /**
   * @param {Slot} slot
   */
  addSlot(slot) {
    const findIdxNull = this.#slots.findIndex((val) => val === null);

    if (findIdxNull === -1) {
      return Result(null, Errors.RACKS_OUT_OF_BOUND);
    }

    this.#slots[findIdxNull] = slot;

    return Result(findIdxNull + 1, null);
  }

  /**
   *
   * @param {int} slotNumber
   */
  deleteSlot(slotNumber) {
    if (slotNumber < 1) {
      return Result(null, Errors.VALIDATION_ERROR);
    }

    if (slotNumber > this.#maxLength) {
      return Result(null, Errors.VALIDATION_ERROR);
    }

    this.#slots[slotNumber - 1] = null;

    return Result(slotNumber, null);
  }

  /**
   *
   * @returns {Array.<Slot>}
   */
  getSlots() {
    return this.#slots;
  }

  size() {
    return this.#slots.filter((val) => val !== null).length;
  }
}

module.exports = Warehouse;
