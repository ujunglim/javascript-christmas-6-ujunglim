import OutputView from "../OutputView.js";
import Constants from "../util/Constants.js";
import checkEventDay from "../util/checkEventDay.js";
import formatNumberWithComma from "../util/formatNumberWithComma.js";

class Event {
  #events;

  constructor() {
    this.#events = new Map();
  }

  checkEvents(date, order) {
    this.checkChristams(date);
    this.checkWeekday(date, order);
    this.checkWeekend(date, order);
    this.checkSpecialday(date);
    this.checkPromotionEvent(order);
  }

  checkChristams(date) {
    if (Number(date) > Constants.CHRISTMAS_EVENT_LAST_DATE) {
      return;
    }
    this.#events[Constants.EVENT_TYPE.CHRISTMAS] = 1000 + (date - 1) * 100;
  }

  // 평일 디저트 이벤트
  checkWeekday(date, order) {
    const dessertCount = order.getCountOfTargetType(
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

  // 주말 메인메뉴 이벤트
  checkWeekend(date, order) {
    const mainCount = order.getCountOfTargetType(Constants.MENU_TYPE.MAIN);
    if (mainCount === 0) {
      return;
    }
    if (checkEventDay.isWeekend(date)) {
      this.#events[Constants.EVENT_TYPE.WEEKEND] =
        mainCount * Constants.DISCOUNT_PER_MENU;
    }
  }

  checkSpecialday(date) {
    if (checkEventDay.isSpecialDay(date)) {
      this.#events[Constants.EVENT_TYPE.SPECIAL] = 1000;
    }
  }

  checkPromotionEvent(order) {
    if (order.getBillBeforeDiscount() >= Constants.STANDARD_TO_GET_PROMOTION) {
      this.#events[Constants.EVENT_TYPE.PROMOTION] = 2500;
    }
  }

  displayEvents() {
    OutputView.displayEventTitle();
    if (!Object.keys(this.#events).length) {
      OutputView.display("없음");
      return;
    }
    Object.entries(this.#events).forEach(([name, discount]) => {
      OutputView.displayEvent(name, formatNumberWithComma(discount));
    });
  }

  #getTotalDiscount() {
    let totalDiscount = 0;
    Object.entries(this.#events).forEach(([name, discount]) => {
      totalDiscount += discount;
    });
    return totalDiscount;
  }

  displayTotalDiscount() {
    const formatedStr = formatNumberWithComma(this.#getTotalDiscount());
    OutputView.displayTotalDiscount(formatedStr);
  }

  displayAfterDiscountBill(order) {
    const afterDiscount = formatNumberWithComma(
      order.getBillBeforeDiscount() - this.#getTotalDiscount()
    );
    OutputView.displayAfterDiscountBill(afterDiscount);
  }
}

export default Event;
