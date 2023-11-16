import { Console } from "@woowacourse/mission-utils";
import InfoMsg from "./util/InfoMsg.js";

const OutputView = {
  display(msg) {
    Console.print(msg);
  },
  displayGreeting() {
    Console.print(InfoMsg.GREETING);
  },
  displayEventPreviewTitle(date) {
    Console.print(InfoMsg.EVENT_PREVIEW_TITLE(date));
  },
  displayOrder(orders) {
    Console.print(InfoMsg.ORDER_TITLE);
    orders.forEach((detail, name) => {
      Console.print(InfoMsg.ORDER(name, detail.count));
    });
  },
  displayBeforeDiscount(sum) {
    Console.print(InfoMsg.BEFORE_DISCOUNT(sum));
  },
  displayPromotion(has) {
    Console.print(InfoMsg.PROMOTION(has));
  },
  displayEventTitle() {
    Console.print(InfoMsg.EVENT_TITLE);
  },
  displayEvent(name, discount) {
    Console.print(`${name}: -${discount}원`);
  },
  displayTotalDiscount(total) {
    Console.print(InfoMsg.TOTAL_DISCOUNT(total));
  },
  displayAfterDiscountBill(bill) {
    Console.print(InfoMsg.AFTER_DISCOUNT_BILL(bill));
  },
  displayBadge(badge) {
    Console.print(InfoMsg.BADGE(badge));
  },
};

export default OutputView;
