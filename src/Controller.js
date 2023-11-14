import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Order from "./model/Order.js";
import Constants from "./util/Constants.js";
import DateValidator from "./util/DateValidator.js";
import InfoMsg from "./util/InfoMsg.js";
import formatNumberWithComma from "./util/formatNumberWithComma.js";
import { Console } from "@woowacourse/mission-utils";
class Controller {
  #order;
  #events;
  constructor() {
    this.#events = {};
  }

  async start() {
    OutputView.printGreeting();
    const date = await this.getValidDate();
    const orders = await this.getValidOrder();
    this.printOrder(date, orders);
    this.#order.calcBeforeDiscount();
    this.#order.checkPromotion();
    this.checkEvents(date);
  }

  async getValidDate() {
    while (true) {
      try {
        const input = await InputView.readDate();
        DateValidator(input);
        return input;
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  }

  async getValidOrder() {
    while (true) {
      try {
        const input = await InputView.readOrder();
        this.#order = new Order(input);
        return this.#order.getOrder();
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  }

  printOrder(date, orders) {
    OutputView.printEventPreviewTitle(date);
    OutputView.printOrder(orders);
  }

  checkEvents(date) {
    Console.print(InfoMsg.EVENT_TITLE);
    // 총주문 금액 10,000원 미만시
    if (this.#order.getBillBeforeDiscount() < Constants.MIN_BILL_TO_GET_EVENT) {
      Console.print("없음");
      return;
    }
    this.checkChristamsEvent(date);
  }

  checkChristamsEvent(date) {
    if (Number(date) > Constants.CHRISTMAS_EVENT_LAST_DATE) {
      return;
    }
    // this.#events[Constants.CHRISTMAS] = 1000 + (date - 1) * 100;
    const discountStr = formatNumberWithComma(1000 + (date - 1) * 100);
    OutputView.printChristmasEvent(discountStr);
  }
}
export default Controller;
