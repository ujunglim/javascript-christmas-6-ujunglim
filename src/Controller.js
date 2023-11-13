import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Order from "./model/Order.js";
import DateValidator from "./util/DateValidator.js";

class Controller {
  constructor() {}

  async start() {
    OutputView.printGreeting();
    const date = await this.getValidDate();
    const orders = await this.getValidOrder();
    this.printOrder(date, orders);
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
        const order = new Order(input);
        return order.getOrder();
      } catch (error) {
        OutputView.print(error.message);
      }
    }
  }

  printOrder(date, orders) {
    OutputView.printEventPreviewTitle(date);
    OutputView.printOrderTitle();
    orders.forEach((order) => OutputView.printOrder(order));
  }
}
export default Controller;
