export const buildDateString = entry => {
  const date = new Date(entry.date.toDate());
  const rawDay = date.getDate();
  const day = rawDay < 10 ? "0" + rawDay : rawDay;
  const rawMonth = date.getMonth() + 1;
  const month = rawMonth < 10 ? "0" + rawMonth : rawMonth;
  const dateStr = day + "-" + month + "-" + date.getFullYear();
  return dateStr;
};
