export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthString = month < 10 ? `0${month}` : month.toString();
  const dayString = day < 10 ? `0${day}` : day.toString();

  return `${year}-${monthString}-${dayString}`;
};
