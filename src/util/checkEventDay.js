const checkEventDay = {
  getDayOfWeek(date) {
    const targetDate = new Date(`2023-12-${date}`);
    const dayOfWeek = targetDate.getDay(); // 0은 일요일, 1은 월요일, ..., 6은 토요일
    return dayOfWeek;
  },
  isWeekday(date) {
    const dayOfWeek = this.getDayOfWeek(date);
    return dayOfWeek >= 0 && dayOfWeek <= 4;
  },
  isWeekend(date) {
    const dayOfWeek = this.getDayOfWeek(date);
    return 5 <= dayOfWeek && dayOfWeek <= 6;
  },
  isSpecialDay(date) {
    const specials = new Set([3, 10, 17, 24, 25, 31]);
    return specials.has(date);
  },
};

export default checkEventDay;
