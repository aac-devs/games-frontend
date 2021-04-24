import React from 'react';
import dayjs from 'dayjs';

const listItems = (title, max, plus) => {
  const arrayList = [<option key={plus - 1}>Select a {title}</option>];

  const setTitle = (value) => {
    let optionTitle;
    switch (title) {
      case 'day':
        optionTitle = dayjs()
          .date(value + 1)
          .format('DD');
        break;
      case 'month':
        optionTitle = dayjs().month(value).format('MMMM');
        break;
      case 'year':
        optionTitle = dayjs()
          .year(value + 1970)
          .format('YYYY');
        break;
      default:
        break;
    }
    return optionTitle;
  };

  for (let i = 0; i < max; i += 1) {
    arrayList.push(
      <option key={i + plus} value={i + plus}>
        {setTitle(i)}
      </option>,
    );
  }
  return arrayList;
};

export default listItems;
