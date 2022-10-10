export const dateConvertor = (dateInput:string) => {
  if (!dateInput) return '-';

  const date = new Date(dateInput);
  let dateString =
    date.getFullYear().toString() +
    '.' +
    (date.getMonth() + 1).toString() +
    '.' +
    date.getDate().toString() +' '
  ;

  if (date.getHours() === 0) {
    dateString += '오전 12';
  } else if (date.getHours() < 12) {
    dateString += '오전 ' + date.getHours().toString();
  } else if (date.getHours() === 12) {
    dateString += '오후 12';
  } else {
    dateString += '오후 ' + (date.getHours() - 12).toString();
  }

  dateString +=
    ':' +
    date.getMinutes().toString().padStart(2, '0') +
    ':' +
    date.getSeconds().toString().padStart(2, '0');

  return dateString;
};