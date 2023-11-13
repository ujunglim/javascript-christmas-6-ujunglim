import Constants from "../util/Constants.js";
import ErrorMsg from "../util/ErrorMsg.js";

class Order {
  constructor(input) {
    this.#validate(input);
  }

  #validate(input) {
    this.#checkOrderFormat(input);
  }

  #checkOrderFormat(inputs) {
    inputs.split(",").forEach((input) => {
      if (!Constants.REGEX_KOREAN.test(input)) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
    });

    return true;
  }
}

export default Order;
