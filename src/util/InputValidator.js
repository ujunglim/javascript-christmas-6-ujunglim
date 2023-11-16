import Constants from "./Constants.js";
import ErrorMsg from "./ErrorMsg.js";

class InputValidator {
  static date(date) {
    const numDate = Number(date);
    if (isNaN(numDate) || numDate < 1 || numDate > 31) {
      throw new Error(ErrorMsg.INVALID_DATE);
    }
    return true;
  }

  static order(orders) {
    InputValidator.checkOrderFormat(orders);
    const deformattedOrder = InputValidator.getDeformatOrders(orders);
    InputValidator.checkOrderNonExist(deformattedOrder);
    InputValidator.checkOrderRedundancy(deformattedOrder);
    InputValidator.checkOrderOnlyDrink(deformattedOrder);
    InputValidator.checkOrderOverMaxCount(deformattedOrder);
  }

  static checkOrderFormat(orders) {
    orders.split(",").forEach((order) => {
      if (!Constants.REGEX_KOREAN.test(order)) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
    });
  }

  static getDeformatOrders(orders) {
    const deformatedOrders = orders.split(",").map((order) => {
      const [name, count] = order.split("-");
      return {
        name,
        count: Number(count),
      };
    });
    return deformatedOrders;
  }

  static checkOrderNonExist(orders) {
    // 없는 메뉴일때
    orders.forEach((order) => {
      if (!Constants.MENU[order.name]) {
        throw new Error(ErrorMsg.INVALID_ORDER);
      }
    });
  }

  static checkOrderRedundancy(orders) {
    const names = orders.map((order) => order.name);
    if (names.length !== new Set(names).size) {
      throw new Error(ErrorMsg.INVALID_ORDER);
    }
  }

  static checkOrderOnlyDrink(orders) {
    const names = orders.map((order) => order.name);
    for (const name of names) {
      if (Constants.MENU[name].type !== Constants.MENU_TYPE.DRINK) {
        return;
      }
    }
    throw new Error(ErrorMsg.ORDERED_ONLY_DRINK);
  }

  static checkOrderOverMaxCount(orders) {
    let totalCount = 0;
    const counts = orders.map((order) => order.count);
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
