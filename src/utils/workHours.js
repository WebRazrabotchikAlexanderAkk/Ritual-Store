export function isInsideWorkHours(config, date = new Date()) {
  const day = date.getDay();
  if (!config.days.includes(day)) return false;

  const [startHour, startMinute] = config.start.split(':').map(Number);
  const [endHour, endMinute] = config.end.split(':').map(Number);
  const minutes = date.getHours() * 60 + date.getMinutes();

  return minutes >= startHour * 60 + startMinute && minutes <= endHour * 60 + endMinute;
}
