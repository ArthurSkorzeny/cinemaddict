import AbstractView from '../framework/view/abstract-view.js';

const createFilmPopupTemplate = () => (
  `<div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">

        <p class="film-details__age">18+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">The Great Flamarion</h3>
            <p class="film-details__title-original">Original: The Great Flamarion</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">8.9</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">Anthony Mann</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">30 March 1945</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">1h 18m</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">USA</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              <span class="film-details__genre">Drama</span>
              <span class="film-details__genre">Film-Noir</span>
              <span class="film-details__genre">Mystery</span></td>
          </tr>
        </table>

        <p class="film-details__film-description">
          The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>`
);

export default class FilmPopupView extends AbstractView{
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createFilmPopupTemplate();
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

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click',this.#favoriteClickHandler);
  };


  setActiveFavorite = () => {
    if(this.element.querySelector('.film-details__control-button--favorite').classList.contains('film-details__control-button--active')){
      this.element.querySelector('.film-details__control-button--favorite').classList.remove('film-details__control-button--active');
    }else{
      this.element.querySelector('.film-details__control-button--favorite').classList.add('film-details__control-button--active');
    }
  };


  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setActiveWatched = () => {
    if(this.element.querySelector('.film-details__control-button--watched').classList.contains('film-details__control-button--active')){
      this.element.querySelector('.film-details__control-button--watched').classList.remove('film-details__control-button--active');
    }else{
      this.element.querySelector('.film-details__control-button--watched').classList.add('film-details__control-button--active');
    }
  };

  #watcListHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick();
  };

  setWatchListHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watcListHandler);
  };

  setActiveWatchList = () => {
    if(this.element.querySelector('.film-details__control-button--watchlist').classList.contains('film-details__control-button--active')){
      this.element.querySelector('.film-details__control-button--watchlist').classList.remove('film-details__control-button--active');
    }else{
      this.element.querySelector('.film-details__control-button--watchlist').classList.add('film-details__control-button--active');
    }
  };
}
