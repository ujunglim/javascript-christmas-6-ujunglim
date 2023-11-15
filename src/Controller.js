import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Order from "./model/Order.js";
import Constants from "./util/Constants.js";
import InputValidator from "./util/InputValidator.js";
import checkEventDay from "./util/checkEventDay.js";
import formatNumberWithComma from "./util/formatNumberWithComma.js";
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
    this.displayOrder(date, orders);
    this.#order.displayBillBeforeDiscount();
    this.#order.checkPromotion();
    this.checkEvents(date);
    this.showEvents();
    this.showTotalDiscount();
    this.showAfterDiscountBill();
    this.checkBadge();
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

  displayOrder(date, orders) {
    OutputView.displayEventPreviewTitle(date);
    OutputView.displayOrder(this.#order.getOrder());
  }

  checkEvents(date) {
    this.#order.checkAbleToGetEvent();
    this.checkChristamsEvent(date);
    this.checkWeekdaysDessertEvent(date);
    this.checkWeekendMainEvent(date);
    this.checkSpecialEvent(date);
    this.checkPromotionEvent();
  }

  checkChristamsEvent(date) {
    if (Number(date) > Constants.CHRISTMAS_EVENT_LAST_DATE) {
      return;
    }
    this.#events[Constants.EVENT_TYPE.CHRISTMAS] = 1000 + (date - 1) * 100;
  }
  checkWeekdaysDessertEvent(date) {
    const dessertCount = this.#order.getCountOfTargetType(
      Constants.MENU_TYPE.DESSERT
    );
    // 디저트가 없을때
    if (dessertCount === 0) {
      return;
    }
    // 평일일때
    if (checkEventDay.isWeekday(date)) {
      this.#events[Constants.EVENT_TYPE.WEEKDAY] =
        dessertCount * Constants.DISCOUNT_PER_MENU;
    }
  }

  checkWeekendMainEvent(date) {
    const mainCount = this.#order.getCountOfTargetType(
      Constants.MENU_TYPE.MAIN
    );
    if (mainCount === 0) {
      return;
    }
    if (checkEventDay.isWeekend(date)) {
      this.#events[Constants.EVENT_TYPE.WEEKEND] =
        mainCount * Constants.DISCOUNT_PER_MENU;
    }
  }

  checkSpecialEvent(date) {
    if (checkEventDay.isSpecialDay(date)) {
      this.#events[Constants.EVENT_TYPE.SPECIAL] = 1000;
    }
  }

  checkPromotionEvent() {
    if (
      this.#order.getBillBeforeDiscount() >= Constants.STANDARD_TO_GET_PROMOTION
    ) {
      this.#events[Constants.EVENT_TYPE.PROMOTION] = 2500;
    }
  }

  showEvents() {
    OutputView.displayEventTitle();
    if (!Object.keys(this.#events).length) {
      OutputView.display("없음");
      return;
    }
    Object.entries(this.#events).forEach(([name, discount]) => {
      OutputView.displayEvent(name, formatNumberWithComma(discount));
      this.#totalDiscount += discount;
    });
  }

  showTotalDiscount() {
    const formatedStr = formatNumberWithComma(this.#totalDiscount);
    OutputView.displayTotalDiscount(formatedStr);
  }

  showAfterDiscountBill() {
    const afterDiscount = formatNumberWithComma(
      this.#order.getBillBeforeDiscount() - this.#totalDiscount
    );
    OutputView.displayAfterDiscountBill(afterDiscount);
  }

  checkBadge() {
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
