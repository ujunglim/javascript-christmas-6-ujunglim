import Constants from "../util/Constants.js";
import ErrorMsg from "../util/ErrorMsg.js";

class Order {
  #orders;

  constructor(input) {
    this.#orders = [];
    this.#validate(input);
  }

  #validate(input) {
    this.#checkOrderFormat(input);
    this.#checkMenuExistance(input);
  }

  #checkOrderFormat(inputs) {
    inputs.split(",").forEach((input) => {
      if (!Constants.REGEX_KOREAN.test(input)) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
      this.#getMenuAndCout(input);
    });

    return true;
  }

  #getMenuAndCout(input) {
    const [menu, count] = input.split("-");
    this.#orders.push({
      name: menu,
      count: Number(count),
    });
  }

  #checkMenuExistance() {
    this.#orders.forEach((order) => {
      if (!Object.keys(Constants.MENU).includes(order.name)) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
    });
  }

  getOrder() {
    return this.#orders;
  }
}

export default Order;
