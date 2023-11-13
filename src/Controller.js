import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import DateValidator from "./util/DateValidator.js";

class Controller {
  constructor() {}

  async start() {
    OutputView.printGreeting();
    const date = await this.getValidDate();
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
}
export default Controller;
