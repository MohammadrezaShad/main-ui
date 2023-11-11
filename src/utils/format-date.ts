export const formatDate = (dateString: string): string => {
  let date = new Date(dateString);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let monthString = month < 10 ? '0' + month : month.toString();
  let dayString = day < 10 ? '0' + day : day.toString();

  return `${year}-${monthString}-${dayString}`;
};
