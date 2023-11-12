import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class Controller {
  constructor() {
    OutputView.printGreeting();
    InputView.readDate();
  }
}
export default Controller;
