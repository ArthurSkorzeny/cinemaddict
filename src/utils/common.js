const hoursInMinutesArray = [60, 120, 180, 240, 300];
const hourInMinutes = 60;

const getYear = (date) => date.replace(/['']+/g, '').substring(0, 4);

const sortByDate = (a, b) => (getYear(a.filmInfo.release.date) > getYear(b.filmInfo.release.date)) ? -1 : 1;

const sortByRating = (a, b) => (a.filmInfo.totalRating > b.filmInfo.totalRating) ? -1 : 1;

const getRuntimeFromMinutes = (valueFromServer) => {

  if(valueFromServer < hourInMinutes){
    return `${valueFromServer}m`;
  }

  if(hoursInMinutesArray.includes(valueFromServer)){
    return `${valueFromServer / 6 / 10}h`;
  }

  if(valueFromServer > hourInMinutes){
    return `${parseInt(valueFromServer / hourInMinutes)}h ${valueFromServer % 60}m`;
  }
};

export {getYear, sortByDate, sortByRating, getRuntimeFromMinutes};
