class Slot {
  #skuNo;
  #expireDate;

  /**
   * Create a slot
   * @param {string} skuNo - The skuNo value.
   * @param {Date} expireDate - Expired date as object.
   */

  constructor(skuNo, expireDate) {
    this.#skuNo = skuNo;
    this.#expireDate = expireDate;
  }

  getSkuNo() {
    return this.#skuNo;
  }

  getExpireDate() {
    return this.#expireDate;
  }

  toString() {
    return `${this.#skuNo} ${this.#expireDate.toISOString().substring(0, 10)}`;
  }
}

module.exports = Slot;
