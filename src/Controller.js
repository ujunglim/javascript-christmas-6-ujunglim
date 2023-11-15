import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Event from "./model/Event.js";
import Order from "./model/Order.js";
import Constants from "./util/Constants.js";
import InputValidator from "./util/InputValidator.js";
class Controller {
  #order;

  constructor() {}

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
    event.displayEvents();
    event.displayTotalDiscount();
    event.displayAfterDiscountBill(this.#order);
    event.displayBadge();
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
}
export default Controller;
