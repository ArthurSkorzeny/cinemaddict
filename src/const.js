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

export {UserAction, UpdateType, FilterType, sortModes, filterModes};
