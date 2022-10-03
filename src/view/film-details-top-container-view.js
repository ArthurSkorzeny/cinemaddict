import AbstractView from '../framework/view/abstract-view.js';
import {getYear, getRuntimeFromMinutes} from '../utils/common';

const createFilmPopupTemplate = (card) => {
  const {filmInfo, userDetails} = card;

  const getFilterType = (filterValue) => filterValue === true ? 'film-details__control-button--active' : '';

  const createGenresElement = (genres) => {

    let text = '';

    for(let i = 0; i <= genres.length - 1; i++){

      text = `${text}<span class="film-details__genre">${genres[i]}</span>`;
    }

    return text;
  };

  return (
    `<div class="film-details__top-container">
     <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
     </div>
     <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

        <p class="film-details__age">${filmInfo.ageRating}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${filmInfo.title}</h3>
            <p class="film-details__title-original">${filmInfo.alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${filmInfo.totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${filmInfo.director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${filmInfo.writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${filmInfo.actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${getYear(filmInfo.release.date)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${getRuntimeFromMinutes(filmInfo.runtime)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              ${createGenresElement(filmInfo.genre)}
            </td>
          </tr>
        </table>

        <p class="film-details__film-description">
        ${filmInfo.description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${getFilterType(userDetails.watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${getFilterType(userDetails.alreadyWatched)}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${getFilterType(userDetails.favorite)}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>`
  );
};

export default class FilmPopupView extends AbstractView{
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createFilmPopupTemplate(this.#card);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  deleteClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').removeEventListener('click', this.#clickHandler);
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
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  getScrollPosition = () => document.querySelector('.film-details').scrollTop;

  scrollToNedeedPosition = (position) => {document.querySelector('.film-details').scrollTop += position;};

  deleteHideOverFlowFromBody = () => document.querySelector('body').removeAttribute('class', 'hide-overflow');
}
