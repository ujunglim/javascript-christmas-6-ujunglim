import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Event from "./model/Event.js";
import Order from "./model/Order.js";
import Constants from "./util/Constants.js";
import InputValidator from "./util/InputValidator.js";
class Controller {
  #order;
  #events;
  #totalDiscount;

  constructor() {
    this.#events = {};
    this.#totalDiscount = 0;
  }

  async start() {
    OutputView.displayGreeting();
    const date = await this.getValidDate();
    const orders = await this.getValidOrder();
    this.#order = new Order(orders);
    this.#order.displayOrder(date);
    this.#order.displayBillBeforeDiscount();
    this.#order.checkPromotion();
    this.#order.checkAbleToGetEvent();
    const event = new Event();
    event.checkEvents(date, this.#order);
    event.displayEvents(this.#totalDiscount);
    event.displayTotalDiscount(this.#totalDiscount);
    event.displayAfterDiscountBill(this.#order);
    this.displayBadge();
  }

  async getValidInput(inputFunc, validationFunc, type) {
    while (true) {
      try {
        const input = await inputFunc();
        validationFunc(input);
        return type === Constants.INPUT_TYPES.DATE ? Number(input) : input;
      } catch (err) {
        OutputView.display(err.message);
      }
    }
  }

  async getValidDate() {
    return this.getValidInput(
      InputView.readDate,
      InputValidator.Date,
      Constants.INPUT_TYPES.DATE
    );
  }

  async getValidOrder() {
    return this.getValidInput(
      InputView.readOrder,
      InputValidator.Order,
      Constants.INPUT_TYPES.ORDER
    );
  }

  displayBadge() {
    let badge;
    if (this.#totalDiscount === 0) {
      badge = null;
    } else if (this.#totalDiscount >= 20000) {
      badge = "산타";
    } else if (this.#totalDiscount >= 10000) {
      badge = "트리";
    } else if (this.#totalDiscount >= 5000) {
      badge = "별";
    }
    OutputView.displayBadge(badge);
  }
}
export default Controller;
