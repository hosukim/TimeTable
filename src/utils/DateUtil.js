import { DAYS } from "__fixture__/Date";
const TODAY = new Date();
export const WEEK = 7;

export const getDayNameByIndex = (index) => {
  return Object.values(DAYS).find((day) => day.code === index)?.text;
};
export const checkToday = (date) => {
  return (
    date.getFullYear() === TODAY.getFullYear() &&
    date.getMonth() === TODAY.getMonth() &&
    date.getDate() === TODAY.getDate()
  );
};
export const getOneWeekByDate = (date) => {
  const distanceDateToSunday = date.getDate() - date.getDay();
  const frontDate = new Date(new Date().setDate(distanceDateToSunday));
  return Array(7)
    .fill()
    .map(
      (_, index) =>
        new Date(
          frontDate.getFullYear(),
          frontDate.getMonth(),
          frontDate.getDate() + index
        )
    );
};

export const formatDateToYYYYMMDD = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
};
