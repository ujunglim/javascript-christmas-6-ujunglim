import { Console } from "@woowacourse/mission-utils";
import InfoMsg from "./util/InfoMsg.js";

const OutputView = {
  print(msg) {
    Console.print(msg);
  },
  printGreeting() {
    Console.print(InfoMsg.GREETING);
  },
  printMenu() {
    Console.print("<주문 메뉴>");
    // ...
  },
  // ...
};

export default OutputView;
