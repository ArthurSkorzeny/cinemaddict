const FilterType = {
  ALL: 'all',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

const UserAction = {
  UPDATE_CARD: 'UPDATE_TASK',
  //удалить комм
  //добав комм
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const sortModes = {
  default: 'default',
  date: 'date',
  rating: 'rating',
};

const filterModes = {
  all: 'all',
  watchlist: 'watchlist',
  history: 'history',
  favorites: 'favorites',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const EventValues = {
  'SUCCES': 'SUCCES',
  'FAIL': 'SUCCES'
};

export {UserAction, UpdateType, FilterType, sortModes, filterModes, Method, EventValues};
