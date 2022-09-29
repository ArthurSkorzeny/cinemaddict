import AbstractView from '../framework/view/abstract-view.js';
import {getYear} from '../utils/common';


const createFilmCardTemplate = (card, commentsLength) => {
  const {filmInfo, userDetails} = card;

  const getFilterType = (filterValue) => filterValue === false ? 'film-card__controls-item--active' : '';

  return (
    `<article class="film-card">
     <a class="film-card__link">
       <h3 class="film-card__title">${filmInfo.title}</h3>
       <p class="film-card__rating">${filmInfo.totalRating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${getYear(filmInfo.release.date)}</span>
         <span class="film-card__duration">${filmInfo.runtime}</span>
         <span class="film-card__genre">${filmInfo.genre}</span>
       </p>
       <img src="${filmInfo.poster}" alt="" class="film-card__poster">
       <p class="film-card__description">${filmInfo.description}</p>
       <span class="film-card__comments">${commentsLength}</span>
     </a>
     <div class="film-card__controls">
       <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getFilterType(userDetails.watchlist)}" type="button">Add to watchlist</button>
       <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getFilterType(userDetails.alreadyWatched)}" type="button">Mark as watched</button>
       <button class="film-card__controls-item film-card__controls-item--favorite ${getFilterType(userDetails.favorite)}" type="button">Mark as favorite</button>
     </div>
   </article>`
  );
};


export default class FilmCardView extends AbstractView{
  #card = null;
  #commentsModel = null;

  constructor(card, commentsModel) {
    super();
    this.#card = card;
    this.#commentsModel = commentsModel;
  }

  get template() {
    return createFilmCardTemplate(this.#card, this.#commentsModel);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  };
}
