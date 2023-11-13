import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Order from "./model/Order.js";
import DateValidator from "./util/DateValidator.js";

class Controller {
  #order;
  constructor() {}

  async start() {
    OutputView.printGreeting();
    const date = await this.getValidDate();
    const orders = await this.getValidOrder();
    this.printOrder(date, orders);
    this.#order.calcBeforeDiscount();
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
}
export default Controller;
