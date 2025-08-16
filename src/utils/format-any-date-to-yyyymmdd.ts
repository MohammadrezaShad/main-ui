export function formatAnyDateToYYYYMMDD(
  dateOrPersianDate: string | number | Date,
  options?: {seperator?: string},
) {
  const {seperator = '-'} = options || {};

  let date = dateOrPersianDate as Date;

  if (typeof dateOrPersianDate === 'string' || typeof dateOrPersianDate === 'number')
    date = new Date(dateOrPersianDate);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${yyyy}${seperator}${mm}${seperator}${dd}T${hh}:${min}:${ss}+03:30`;
}
