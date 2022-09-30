import AbstractView from '../framework/view/abstract-view.js';

const FilterValues = {
  'ALL': '.main-navigation__item--all',
  'WATCHLIST': '.main-navigation__item--watchlist',
  'HISTORY': '.main-navigation__item--history',
  'FAVORITES': '.main-navigation__item--favorites',
};

const FILTER_MODES = {
  all: 'ALL',
  watchlist: 'WATCHLIST',
  history: 'HISTORY',
  favorites: 'FAVORITES',
};

let currentFilter = 'ALL';

const createFilterButtonsTemplate = (marksCount) => {
  const {watchlist, alreadyWatched, favorite} = marksCount;
  return(
    `<nav class="main-navigation">
     <a href="#all" class="main-navigation__item main-navigation__item--all main-navigation__item--active" >All movies</a>
     <a href="#watchlist" class="main-navigation__item main-navigation__item--watchlist">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
     <a href="#history" class="main-navigation__item main-navigation__item--history">History <span class="main-navigation__item-count">${alreadyWatched}</span></a>
     <a href="#favorites" class="main-navigation__item main-navigation__item--favorites">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
   </nav>`
  );
};

export default class FilterButtonsView extends AbstractView{
  #marksCount = null;

  constructor(marksCount) {
    super();
    this.#marksCount = marksCount;

    this.#replaceWithCurrentFilter();
  }

  get template() {
    return createFilterButtonsTemplate(this.#marksCount);
  }

  #replaceWithCurrentFilter = () => {
    this.#clearFilterView();

    this.element.querySelector(FilterValues[currentFilter]).classList.add('main-navigation__item--active');
  };

  #clearFilterView = () => {
    this.element.querySelectorAll('.main-navigation__item').forEach((e) => e.classList.remove('main-navigation__item--active'));
  };

  #allClickHandler = (evt) => {
    const isSortButtonActive = this.element.querySelector('.main-navigation__item--all').classList.contains('main-navigation__item--active');
    if (!isSortButtonActive){
      evt.preventDefault();
      this._callback.allClick();
      this.#clearFilterView();
      this.element.querySelector('.main-navigation__item--all').classList.add('main-navigation__item--active');
      currentFilter = FILTER_MODES.all;
    }
  };

  setAllClickHandler = (callback) => {
    this._callback.allClick = callback;
    this.element.querySelector('.main-navigation__item--all').addEventListener('click', this.#allClickHandler);
  };

  #watchListClickHandler = (evt) => {
    const isSortButtonActive = this.element.querySelector('.main-navigation__item--watchlist').classList.contains('main-navigation__item--active');
    if (!isSortButtonActive){
      evt.preventDefault();
      this._callback.watchListClick();
      this.#clearFilterView();
      this.element.querySelector('.main-navigation__item--watchlist').classList.add('main-navigation__item--active');
      currentFilter = FILTER_MODES.watchlist;
    }
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.main-navigation__item--watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    const isSortButtonActive = this.element.querySelector('.main-navigation__item--history').classList.contains('main-navigation__item--active');
    if (!isSortButtonActive){
      evt.preventDefault();
      this._callback.alreadyWatchedClick();
      this.#clearFilterView();
      this.element.querySelector('.main-navigation__item--history').classList.add('main-navigation__item--active');
      currentFilter = FILTER_MODES.history;
    }
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.main-navigation__item--history').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    const isSortButtonActive = this.element.querySelector('.main-navigation__item--favorites').classList.contains('main-navigation__item--active');
    if (!isSortButtonActive){
      evt.preventDefault();
      this._callback.favoriteClick();
      this.#clearFilterView();
      this.element.querySelector('.main-navigation__item--favorites').classList.add('main-navigation__item--active');
      currentFilter = FILTER_MODES.favorites;
    }
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.main-navigation__item--favorites').addEventListener('click', this.#favoriteClickHandler);
  };
}
