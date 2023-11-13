import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";
import Order from "../src/model/Order.js";
import ErrorMsg from "../src/util/ErrorMsg.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

const INPUTS_TO_END = ["1", "해산물파스타-2"];
describe("날짜입력 예외 테스트", () => {
  test.each([[["0", ...INPUTS_TO_END]], [["32", ...INPUTS_TO_END]]])(
    "날짜 1미만, 31초과 입력시 테스트",
    async (input) => {
      // given
      const INVALID_DATE_MESSAGE =
        "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
      const logSpy = getLogSpy();
      mockQuestions(input);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(INVALID_DATE_MESSAGE)
      );
    }
  );
});

describe("메뉴입력 예외 테스트", () => {
  test("메뉴이름과 갯수를-로 구분하지 않았을 때", () => {
    expect(() => {
      new Order("해물파스타3");
    }).toThrow(ErrorMsg.INVALID_ORDER);
  });

  test("메뉴 갯수를 1미만 입력 시", () => {
    expect(() => {
      new Order("해물파스타-0");
    });
  });
});
