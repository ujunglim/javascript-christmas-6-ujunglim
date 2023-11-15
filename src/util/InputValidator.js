import ErrorMsg from "./ErrorMsg";

class InputVaildator {
  static Date(date) {
    const numDate = Number(date);
    if (isNaN(numDate) || numDate < 1 || numDate > 31) {
      throw new Error(ErrorMsg.INVALID_DATE);
    }
    return true;
  }
}

export default InputVaildator;
