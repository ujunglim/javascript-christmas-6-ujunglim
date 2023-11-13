import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

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
describe("예외 테스트", () => {
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
