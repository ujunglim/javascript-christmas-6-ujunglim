import Constants from "./Constants.js";
import ErrorMsg from "./ErrorMsg.js";

class InputVaildator {
  static Date(date) {
    const numDate = Number(date);
    if (isNaN(numDate) || numDate < 1 || numDate > 31) {
      throw new Error(ErrorMsg.INVALID_DATE);
    }
    return true;
  }

  static Order(orders) {
    InputVaildator.CheckOrderFormat(orders);
    InputVaildator.CheckOrderNonExist(orders);
  }

  static CheckOrderFormat(orders) {
    orders.split(",").forEach((order) => {
      if (!Constants.REGEX_KOREAN.test(order)) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
    });
  }

  static CheckOrderNonExist(orders) {
    orders.split(",").forEach((order) => {
      const [name, count] = order.split("-");
      // 없는 메뉴이거나 중복된 메뉴 입력시
      if (!Constants.MENU[name]) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
    });
  }

  // static CheckOrderRedundancy(orders) {
  //   const names = orders.split(",").map((order) => {
  //     const [name, count] = order.split("-");
  //     return name;
  //   });
  //   if (names.length !== new Set(names).size) {
  //     throw new Error(ErrorMsg.INVALID_ORDER);
  //   }
  // }
}

export default InputVaildator;
