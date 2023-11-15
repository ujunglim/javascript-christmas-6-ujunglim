import Constants from "./Constants.js";
import ErrorMsg from "./ErrorMsg.js";

class InputValidator {
  static Date(date) {
    const numDate = Number(date);
    if (isNaN(numDate) || numDate < 1 || numDate > 31) {
      throw new Error(ErrorMsg.INVALID_DATE);
    }
    return true;
  }

  static Order(orders) {
    InputValidator.CheckOrderFormat(orders);
    InputValidator.CheckOrderNonExist(orders);
    InputValidator.CheckOrderRedundancy(orders);
    InputValidator.CheckOrderOnlyDrink(orders);
    InputValidator.CheckOrderOverMaxCount(orders);
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

  static CheckOrderRedundancy(orders) {
    const names = orders.split(",").map((order) => {
      const [name, count] = order.split("-");
      return name;
    });
    if (names.length !== new Set(names).size) {
      throw new Error(ErrorMsg.INVALID_ORDER);
    }
  }

  static CheckOrderOnlyDrink(orders) {
    const names = orders.split(",").map((order) => {
      const [name, count] = order.split("-");
      return name;
    });
    for (const name of names) {
      if (Constants.MENU[name].type !== Constants.MENU_TYPE.DRINK) {
        return;
      }
    }
    throw new Error(ErrorMsg.ORDERED_ONLY_DRINK);
  }

  static CheckOrderOverMaxCount(orders) {
    let totalCount = 0;
    const counts = orders.split(",").map((order) => {
      const [name, count] = order.split("-");
      return Number(count);
    });
    console.log(counts);
    for (const count of counts) {
      totalCount += count;
      if (totalCount > Constants.MAX_MENU_COUNT) {
        throw new Error(ErrorMsg.ORDERED_OVER_MAX_COUNT);
      }
    }
    return;
  }
}

export default InputValidator;
