const minutesInHours = {
  'oneHour': 60,
  'twoHours': 120,
  'threeHours': 180,
  'fourHours': 240,
  'fiveHours': 300
};

const minutesInHour = 60;

const getYear = (date) => date.replace(/['']+/g, '').substring(0, 4);

const sortByDate = (a, b) => (getYear(a.filmInfo.release.date) > getYear(b.filmInfo.release.date)) ? -1 : 1;

const sortByRating = (a, b) => (a.filmInfo.totalRating > b.filmInfo.totalRating) ? -1 : 1;

const getRuntimeFromMinutes = (valueFromServer) => {

  if(valueFromServer < minutesInHour){
    return `${valueFromServer}m`;
  }

  if(Object.keys(minutesInHours).includes(valueFromServer)){
    return `${valueFromServer / 6 / 10}h`;
  }

  if(valueFromServer > minutesInHour){
    return `${parseInt(valueFromServer / minutesInHour, 10)}h ${valueFromServer % minutesInHour}m`;
  }
};

export {getYear, sortByDate, sortByRating, getRuntimeFromMinutes};
