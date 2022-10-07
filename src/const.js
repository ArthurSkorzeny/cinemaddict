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
  'FAIL': 'FAIL'
};

const CommentDeleteStatus = {
  'DELETE': 'Delete',
  'DELETING': 'Deleting...'
};

export {UpdateType, sortModes, filterModes, Method, EventValues, CommentDeleteStatus};
