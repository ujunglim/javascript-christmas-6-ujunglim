import { Console } from "@woowacourse/mission-utils";
import InfoMsg from "./util/InfoMsg.js";

const InputView = {
  async readDate() {
    return await Console.readLineAsync(InfoMsg.ASK_DATE);
  },
  async readOrder() {
    return await Console.readLineAsync(InfoMsg.ASK_ORDER);
  },
  // ...
};

export default InputView;
