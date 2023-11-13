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
    const orderArr = this.#getSplittedOrder(input);
    this.#checkMenuExistance(orderArr);
    this.#checkMenuReundancy(orderArr);
  }

  #checkOrderFormat(inputs) {
    inputs.split(",").forEach((input) => {
      if (!Constants.REGEX_KOREAN.test(input)) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
    });
  }

  #getSplittedOrder(inputs) {
    const orderArr = [];
    inputs.split(",").forEach((input) => {
      const [menu, count] = input.split("-");
      orderArr.push({
        name: menu,
        count: Number(count),
      });
    });
    return orderArr;
  }

  #checkMenuExistance(orderArr) {
    orderArr.forEach((order) => {
      if (!Object.keys(Constants.MENU).includes(order.name)) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
    });
  }

  #checkMenuReundancy(orderArr) {
    const menus = orderArr.map((order) => order.name);
    if (orderArr.length !== new Set(menus).size) {
      throw new Error(ErrorMsg.INVALID_ORDER);
    }
  }

  getOrder() {
    return this.#orders;
  }
}

export default Order;
