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
    orders.forEach((order) =>
      Console.print(InfoMsg.ORDER(order.name, order.count))
    );
  },
  printBeforeDiscount(sum) {
    Console.print(InfoMsg.BEFORE_DISCOUNT(sum));
  },
  printPromotion(has) {
    Console.print(InfoMsg.PROMOTION(has));
  },
  printChristmasEvent(discount) {
    Console.print(InfoMsg.CHRISTMAS_EVENT(discount));
  },
};

export default OutputView;
