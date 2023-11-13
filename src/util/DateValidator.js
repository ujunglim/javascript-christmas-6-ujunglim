import ErrorMsg from "./ErrorMsg.js";

function DateValidator(date) {
  const numDate = Number(date);
  if (isNaN(numDate) || numDate < 1 || numDate > 31) {
    throw new Error(ErrorMsg.INVALID_DATE_MSG);
  }
  return true;
}

export default DateValidator;
