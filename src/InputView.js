import { Console } from "@woowacourse/mission-utils";
import InfoMsg from "./util/InfoMsg.js";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(InfoMsg.ASK_DATE);
    return input;
  },
  // ...
};

export default InputView;
