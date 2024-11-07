export function isWeekend(date) {
  if (date === 'Saturday' || date === 'Sunday') {
    return 'Its a weekend!'
  } else {
    return 'Its a boring weekday :('
  }
};

export default isWeekend;