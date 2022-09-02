const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomNumber = (min, max, precision) => {
  const x = Math.random() * (max - min) + min;
  const p = Math.pow(10, precision);
  return Math.round(x * p) / p;
};

const getYear = (date) => date.replace(/['']+/g, '').substring(0, 4);

const generateRandomPart = (array) => {

  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getFilterType = (filterNumber) => {
  if(filterNumber === false){
    return ['film-card__controls-item--active','film-details__control-button--active'];
  }else{
    return '';
  }
};

export {getRandomInteger, getYear, generateRandomPart, getRandomNumber, updateItem, getFilterType};
