const InfoMsg = {
  GREETING: "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
  ASK_DATE:
    "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  ASK_ORDER:
    "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
  EVENT_PREVIEW_TITLE: (
    date
  ) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!
    `,
  ORDER_TITLE: "<주문 메뉴>",
  ORDER: (menu, count) => `${menu} ${count}개`,
  BEFORE_DISCOUNT: (sum) => `\n<할인 전 총주문 금액>\n ${sum}원`,
  PROMOTION: (has) => `\n<증정 메뉴>\n ${has ? "샴페인 1개" : "없음"}`,
  EVENT_TITLE: "\n<혜택 내역>",
  CHRISTMAS_EVENT: (discount) => `크리스마스 디데이 할인: -${discount}원`,
};

export default InfoMsg;
