import AbstractView from '../framework/view/abstract-view.js';

const createNavigationButtonsTemplate = (marksCount) => (
  `<nav class="main-navigation">
     <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
     <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${marksCount[0]}</span></a>
     <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${marksCount[1]}</span></a>
     <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${marksCount[2]}</span></a>
   </nav>`
);

export default class NavigationButtonsView extends AbstractView{
  #marksCount = null;

  constructor(marksCount) {
    super();
    this.#marksCount = marksCount;
  }

  get template() {
    return createNavigationButtonsTemplate(this.#marksCount);
  }
}
