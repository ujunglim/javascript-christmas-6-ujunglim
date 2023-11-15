import OutputView from "../OutputView.js";
import Constants from "../util/Constants.js";
import ErrorMsg from "../util/ErrorMsg.js";
import InputValidator from "../util/InputValidator.js";
import formatNumberWithComma from "../util/formatNumberWithComma.js";

class Order {
  #orderMap;

  constructor(input) {
    this.#converOrderStr(input);
  }

  #converOrderStr(inputs) {
    this.#orderMap = new Map();
    inputs.split(",").forEach((input) => {
      const [name, count] = input.split("-");
      this.#orderMap.set(name, {
        count: Number(count),
        cost: Constants.MENU[name]?.cost,
        type: Constants.MENU[name]?.type,
      });
    });
  }

  checkAbleToGetEvent() {
    if (this.getBillBeforeDiscount() < Constants.MIN_BILL_TO_GET_EVENT) {
      OutputView.display("없음"); // 총주문 금액 만원 미만시 이벤트가 없다
      return;
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
