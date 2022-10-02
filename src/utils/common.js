/* eslint-disable radix */
const getYear = (date) => date.replace(/['']+/g, '').substring(0, 4);

const sortByDate = (a, b) => (getYear(a.filmInfo.release.date) > getYear(b.filmInfo.release.date)) ? -1 : 1;

const sortByRating = (a, b) => (a.filmInfo.totalRating > b.filmInfo.totalRating) ? -1 : 1;

const getRuntimeFromMinutes = (valueFromServer) => {

  if(valueFromServer < 60){
    return `${valueFromServer}m`;
  }

  if([60, 120, 180, 240, 300].includes(valueFromServer)){
    return `${valueFromServer / 6 / 10}h`;
  }

  if(valueFromServer > 60){
    return `${parseInt(valueFromServer / 60)}h ${valueFromServer % 60}m`;
  }
};

export {getYear, sortByDate, sortByRating, getRuntimeFromMinutes};
