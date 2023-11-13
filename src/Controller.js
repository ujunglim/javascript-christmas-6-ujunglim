import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import DateValidator from "./util/DateValidator.js";

class Controller {
  constructor() {}

  async start() {
    OutputView.printGreeting();
    const date = await this.getValidDate();
    const order = await this.getValidOrder();
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
    const input = await InputView.readOrder();
  }
}
export default Controller;
