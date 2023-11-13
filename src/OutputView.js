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
  printOrderTitle() {
    Console.print(InfoMsg.ORDER_TITLE);
  },
  printOrder(order) {
    Console.print(InfoMsg.ORDER(order.name, order.count));
  },
};

export default OutputView;
