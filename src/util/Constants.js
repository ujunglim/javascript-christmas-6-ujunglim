const Constants = {
  STANDARD_TO_GET_PROMOTION: 120000,
  MIN_BILL_TO_GET_EVENT: 10000,
  REGEX_KOREAN: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+\-[1-9]\d*/,
  CHRISTMAS_EVENT_LAST_DATE: 25,
  DISCOUNT_PER_MENU: 2023,
  MAX_MENU_COUNT: 20,
  EVENT_TYPE: {
    CHRISTMAS: "크리스마스 디데이 할인",
    WEEKDAY: "평일 할인",
    WEEKEND: "주말 할인",
    SPECIAL: "특별 할인",
    PROMOTION: "증정 이벤트",
  },
  MENU_TYPE: {
    APPETIZER: "APPETIZER",
    MAIN: "MAIN",
    DESSERT: "DESSERT",
    DRINK: "DRINK",
  },
  MENU: {
    양송이수프: { cost: 6000, type: "APPETIZER" },
    타파스: { cost: 5500, type: "APPETIZER" },
    시저샐러드: { cost: 8000, type: "APPETIZER" },

    티본스테이크: { cost: 55000, type: "MAIN" },
    바비큐립: { cost: 54000, type: "MAIN" },
    해산물파스타: { cost: 35000, type: "MAIN" },
    크리스마스파스타: { cost: 25000, type: "MAIN" },

    초코케이크: { cost: 15000, type: "DESSERT" },
    아이스크림: { cost: 5000, type: "DESSERT" },

    제로콜라: { cost: 3000, type: "DRINK" },
    레드와인: { cost: 60000, type: "DRINK" },
    샴페인: { cost: 25000, type: "DRINK" },
  },
};
export default Constants;
