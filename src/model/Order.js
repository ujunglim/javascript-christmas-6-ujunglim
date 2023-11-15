import OutputView from "../OutputView.js";
import Constants from "../util/Constants.js";
import ErrorMsg from "../util/ErrorMsg.js";
import formatNumberWithComma from "../util/formatNumberWithComma.js";

class Order {
  #orderMap;

  constructor(input) {
    this.#orderMap = new Map();
    this.#validate(input);
  }

  #validate(input) {
    this.#checkOrderFormat(input);
    this.#checkExistaneAndRedundancy(input);
    this.#checkOnlyOrderedDrink();
    this.#checkOrderedOverMaxCount();
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

  #checkOnlyOrderedDrink() {
    for (const [name, detail] of this.#orderMap) {
      if (detail.type !== Constants.MENU_TYPE.DRINK) {
        return;
      }
    }
    throw new Error(ErrorMsg.ORDERED_ONLY_DRINK);
  }

  #checkOrderedOverMaxCount() {
    let totalCount = 0;
    for (const [name, detail] of this.#orderMap) {
      totalCount += detail.count;
      if (totalCount > Constants.MAX_MENU_COUNT) {
        throw new Error(ErrorMsg.ORDERED_OVER_MAX_COUNT);
      }
    }
  }

  getOrder() {
    return this.#orderMap;
  }

  getBillBeforeDiscount() {
    let sum = 0;
    this.#orderMap.forEach((detail, name) => {
      const { count, cost } = detail;
      sum += cost * count;
    });
    return sum;
  }

  displayBillBeforeDiscount() {
    const formattedStr = formatNumberWithComma(this.getBillBeforeDiscount());
    OutputView.displayBeforeDiscount(formattedStr);
  }

  checkPromotion() {
    OutputView.displayPromotion(
      this.getBillBeforeDiscount() >= Constants.STANDARD_TO_GET_PROMOTION
    );
  }

  getCountOfTargetType(targetType) {
    let count = 0;
    Array.from(this.#orderMap.values())
      .filter((order) => order.type === targetType)
      .forEach((menu) => {
        count += menu.count;
      });
    return count;
  }
}

export default Order;
