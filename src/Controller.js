import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Event from "./model/Event.js";
import Order from "./model/Order.js";
import Constants from "./util/Constants.js";
import InputValidator from "./util/InputValidator.js";
class Controller {
  constructor() {}

  async start() {
    OutputView.displayGreeting();
    const dateInput = await this.getValidDate();
    const orderInput = await this.getValidOrder();
    const order = new Order(orderInput);
    order.displayOrder(dateInput);
    order.displayBillBeforeDiscount();
    order.checkPromotion();
    order.checkAbleToGetEvent();
    const event = new Event();
    event.checkEvents(dateInput, order);
    event.displayEvents();
    event.displayTotalDiscount();
    event.displayAfterDiscountBill(order);
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
