import AbstractView from '../framework/view/abstract-view.js';

const createNavigationButtonsTemplate = (filtersCount) => {
  const {watchlist, history, favorites} = filtersCount;
  /*const navigationValues = () => {
    let navigationValue = 0;

    document.querySelectorAll('.film-card__controls-item').forEach()
  };*/
  return (
    `<nav class="main-navigation">
       <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
       <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
       <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
       <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
     </nav>`
  );
};

export default class NavigationButtonsView extends AbstractView{
  #filtersCount = null;

  constructor(filtersCount) {
    super();
    this.#filtersCount = filtersCount;
  }

  get template() {
    return createNavigationButtonsTemplate(this.#filtersCount);
  }
}
