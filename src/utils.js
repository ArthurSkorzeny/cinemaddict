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

export {getRandomInteger, getYear, generateRandomPart, getRandomNumber};
