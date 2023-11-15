import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";
import ErrorMsg from "../src/util/ErrorMsg.js";
import formatNumberWithComma from "../src/util/formatNumberWithComma.js";
import InputValidator from "../src/util/InputValidator.js";

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
      InputValidator.Order("해산물파스타3");
    }).toThrow(ErrorMsg.INVALID_ORDER);
  });

  test("메뉴 갯수를 1미만 입력 시", () => {
    expect(() => {
      InputValidator.Order("해산물파스타-0");
    }).toThrow(ErrorMsg.INVALID_ORDER);
  });

  test("메뉴판에 없는 메뉴 입력시 ", () => {
    expect(() => {
      InputValidator.Order("김치찌개-2");
    }).toThrow(ErrorMsg.INVALID_ORDER);
  });

  test("중복된 메뉴 입력시", () => {
    expect(() => {
      InputValidator.Order("해산물파스타-2,해산물파스타-1");
    }).toThrow(ErrorMsg.INVALID_ORDER);
  });

  test("음료수만 주문할 수 없다", () => {
    expect(() => {
      InputValidator.Order("제로콜라-1,레드와인-1");
    }).toThrow(ErrorMsg.ORDERED_ONLY_DRINK);
  });

  test("메뉴는 한번에 최대 20개까지 주문 할 수 있다", () => {
    expect(() => {
      InputValidator.Order("초코케이크-2,해산물파스타-1,바비큐립-22");
    }).toThrow(ErrorMsg.ORDERED_OVER_MAX_COUNT);
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
    mockQuestions(["3", "타파스-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
      "타파스 1개",
      "<할인 전 총주문 금액>",
      "5,500원",
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

describe("기능 테스트", () => {
  test("모든 정상 출력", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["10", "레드와인-1,초코케이크-2,해산물파스타-1,바비큐립-2"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
      "레드와인 1개",
      "초코케이크 2개",
      "해산물파스타 1개",
      "바비큐립 2개",
      "<할인 전 총주문 금액>",
      "233,000원",
      "<증정 메뉴>",
      "샴페인 1개",
      "<혜택 내역>",
      "크리스마스 디데이 할인: -1,900원",
      "평일 할인: -4,046원",
      "특별 할인: -1,000원",
      "증정 이벤트: -2,500원",
      "<총혜택 금액>",
      "-9,446원",
      "<할인 후 예상 결제 금액>",
      "223,554원",
      "<12월 이벤트 배지>",
      "별",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("혜택 내역 타이틀과 없음 출력", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["26", "타파스-1,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["<혜택 내역>" + LINE_SEPARATOR + "없음"];

    expectLogContains(getOutput(logSpy), expected);
  });
});

// describe("평일 할인", () => {
//   test("평일에 디저트를 주문할 때 할인가격", () => {
//     const ctrl = new Controller();
//     ctrl.start();
//     const a = ctrl.checkWeekdaysDessertEvent(3);
//     expect(a).toBe(2023);
//   });
// });

// test.each([
//   [1000, "1,000"],
//   [2000000, "2,000,000"],
// ])("숫자를 1000단위씩 끊는 메서드 테스트", (input, answer) => {
//   expect(formatNumberWithComma(input)).toBe(answer);
// });

// describe("주말 할인", () => {
//   test("평일에 디저트를 주문할 때 할인가격", () => {
//     expect(() => {
//       const order = new Order("해산물파스타-2");
//       order.checkWeekdaysDessertEvent(3)
//     }).toBe({});
//   });
// });
