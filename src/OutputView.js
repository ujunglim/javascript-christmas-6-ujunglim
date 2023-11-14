import { Console } from "@woowacourse/mission-utils";
import InfoMsg from "./util/InfoMsg.js";

const OutputView = {
  print(msg) {
    Console.print(msg);
  },
  printGreeting() {
    Console.print(InfoMsg.GREETING);
  },
  printEventPreviewTitle(date) {
    Console.print(InfoMsg.EVENT_PREVIEW_TITLE(date));
  },
  printOrder(orders) {
    Console.print(InfoMsg.ORDER_TITLE);
    orders.forEach((detail, name) => {
      Console.print(InfoMsg.ORDER(name, detail.count));
    });
  },
  printBeforeDiscount(sum) {
    Console.print(InfoMsg.BEFORE_DISCOUNT(sum));
  },
  printPromotion(has) {
    Console.print(InfoMsg.PROMOTION(has));
  },
  printEvent(name, discount) {
    Console.print(`${name}: -${discount}원`);
  },
  printTotalDiscount(total) {
    Console.print(InfoMsg.TOTAL_DISCOUNT(total));
  },
};

export default OutputView;
