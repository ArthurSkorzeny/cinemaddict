import AbstractView from '../framework/view/abstract-view.js';

const createSortButtonsTemplate = () => (
  `<ul class="sort">
     <li><a href="#" class="sort__button sort__button--default sort__button--active">Sort by default</a></li>
     <li><a href="#" class="sort__button sort__button--date">Sort by date</a></li>
     <li><a href="#" class="sort__button sort__button--rating">Sort by rating</a></li>
  </ul>`
);

export default class SortButtonsView extends AbstractView{
  get template() {
    return createSortButtonsTemplate();
  }

  #clearFilterView = () => {
    document.querySelectorAll('.sort__button').forEach((e) => e.classList.remove('sort__button--active'));
  };

  #sortByDefaultClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.defaultClick();
    this.#clearFilterView();
    this.element.querySelector('.sort__button--default').classList.add('sort__button--active');
  };

  setDefaultClickHandler = (callback) => {
    this._callback.defaultClick = callback;
    this.element.querySelector('.sort__button--default').addEventListener('click', this.#sortByDefaultClickHandler);
  };

  #sortByDateClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.dateClick();
    this.#clearFilterView();
    this.element.querySelector('.sort__button--date').classList.add('sort__button--active');
  };

  setDateClickHandler = (callback) => {
    this._callback.dateClick = callback;
    this.element.querySelector('.sort__button--date').addEventListener('click', this.#sortByDateClickHandler);
  };

  #sortByRatingClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.ratingClick();
    this.#clearFilterView();
    this.element.querySelector('.sort__button--rating').classList.add('sort__button--active');
  };

  setRatingClickHandler = (callback) => {
    this._callback.ratingClick = callback;
    this.element.querySelector('.sort__button--rating').addEventListener('click', this.#sortByRatingClickHandler);
  };
}
