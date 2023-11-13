import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Order from "./model/Order.js";
import DateValidator from "./util/DateValidator.js";

class Controller {
  constructor() {}

  async start() {
    OutputView.printGreeting();
    const date = await this.getValidDate();
    const order = await this.getValidOrder();
    OutputView.printMenuTitle(date);
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
}
export default Controller;
