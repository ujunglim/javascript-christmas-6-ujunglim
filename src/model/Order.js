import OutputView from "../OutputView.js";
import Constants from "../util/Constants.js";
import ErrorMsg from "../util/ErrorMsg.js";
import formatNumberWithComma from "../util/formatNumberWithComma.js";

class Order {
  #orderMap;
  #billBeforeDiscount;

  constructor(input) {
    this.#orderMap = new Map();
    this.#validate(input);
  }

  #validate(input) {
    this.#checkOrderFormat(input);
    this.#checkExistaneAndRedundancy(input);
  }

  #checkOrderFormat(inputs) {
    inputs.split(",").forEach((input) => {
      if (!Constants.REGEX_KOREAN.test(input)) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
    });
  }

  #checkExistaneAndRedundancy(inputs) {
    inputs.split(",").forEach((input) => {
      const [name, count] = input.split("-");
      // 없는 메뉴이거나 중복된 메뉴 입력시
      if (!Constants.MENU[name] || this.#orderMap.has(name)) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
      this.#addOrder(name, count);
    });
  }

  #addOrder(name, count) {
    this.#orderMap.set(name, {
      count: Number(count),
      cost: Constants.MENU[name]?.cost,
      type: Constants.MENU[name]?.type,
    });
  }

  getOrder() {
    return this.#orderMap;
  }

  calcBeforeDiscount() {
    let sum = 0;
    this.#orderMap.forEach((detail, name) => {
      const { count, cost } = detail;
      sum += cost * count;
    });
    this.#billBeforeDiscount = sum;
    // 1000단위 나누기
    const formattedStr = formatNumberWithComma(sum);
    OutputView.printBeforeDiscount(formattedStr);
  }

  checkPromotion() {
    OutputView.printPromotion(
      this.#billBeforeDiscount >= Constants.STANDARD_TO_GET_PROMOTION
    );
  }

  getBillBeforeDiscount() {
    return this.#billBeforeDiscount;
  }

  getDessertCount() {
    return Array.from(this.#orderMap.values()).filter(
      (order) => order.type === Constants.MENU_TYPE.DESSERT
    ).length;
  }
}

export default Order;
