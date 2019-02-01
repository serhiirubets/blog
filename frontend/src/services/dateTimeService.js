export const toDateString = (date) => {
  if (typeof date === "string") {
    return new Date(parseInt(date, 10)).toDateString();
  }
}