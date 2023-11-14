import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";
import Order from "../src/model/Order.js";
import ErrorMsg from "../src/util/ErrorMsg.js";
import formatNumberWithComma from "../src/util/formatNumberWithComma.js";

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
      new Order("해산물파스타3");
    }).toThrow(ErrorMsg.INVALID_ORDER);
  });

  test("메뉴 갯수를 1미만 입력 시", () => {
    expect(() => {
      new Order("해산물파스타-0");
    }).toThrow(ErrorMsg.INVALID_ORDER);
  });

  test("메뉴판에 없는 메뉴 입력시 ", () => {
    expect(() => {
      new Order("김치찌개-2");
    }).toThrow(ErrorMsg.INVALID_ORDER);
  });

  test("중복된 메뉴 입력시", () => {
    expect(() => {
      new Order("해산물파스타-2,해산물파스타-1");
    }).toThrow(ErrorMsg.INVALID_ORDER);
  });
});

describe("기능 테스트", () => {
  test("주문 메뉴 출력", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-1,초코케이크-2"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["<주문 메뉴>", "티본스테이크 1개", "초코케이크 2개"];

    expectLogContains(getOutput(logSpy), expected);
  });

  test.each([
    [1000, "1,000"],
    [2000000, "2,000,000"],
  ])("숫자를 1000단위씩 끊는 메서드 테스트", (input, answer) => {
    expect(formatNumberWithComma(input)).toBe(answer);
  });

  test("12만원 이상시 샴페인을 증정한다", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "초코케이크-1,해산물파스타-3"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
      "초코케이크 1개",
      "해산물파스타 3개",
      "<할인 전 총주문 금액>",
      "120,000원",
      "<증정 메뉴>",
      "샴페인 1개",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("12만원 미만시 샴페인 증정이 없다", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "초코케이크-1,해산물파스타-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
      "초코케이크 1개",
      "해산물파스타 1개",
      "<할인 전 총주문 금액>",
      "50,000원",
      "<증정 메뉴>",
      "없음",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("총주문 금액 만원 미만시 혜택이 없다", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
      "제로콜라 1개",
      "<할인 전 총주문 금액>",
      "3,000원",
      "<증정 메뉴>",
      "없음",
      "<혜택 내역>",
      "없음",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("25일 크리스마스 디데이 혜택", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["25", "초코케이크-1,해산물파스타-3"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
      "초코케이크 1개",
      "해산물파스타 3개",
      "<할인 전 총주문 금액>",
      "120,000원",
      "<증정 메뉴>",
      "샴페인 1개",
      "<혜택 내역>",
      "크리스마스 디데이 할인: -3,400원",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });
});

// describe("평일 할인", () => {
//   test("평일에 디저트를 주문할 때 할인가격", () => {
//     expect(() => {
//       const order = new Order("초코케이크-1");
//       order.checkWeekdaysDessertEvent(3)
//     }).toBe(2023);
//   });
// });
