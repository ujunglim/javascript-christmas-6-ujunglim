const checkDay = {
  isWeekday(date) {
    const targetDate = new Date(`2023-12-${date}`);
    const dayOfWeek = targetDate.getDay(); // 0은 일요일, 1은 월요일, ..., 6은 토요일
    return dayOfWeek >= 0 && dayOfWeek <= 4;
  },
};

export default checkDay;
