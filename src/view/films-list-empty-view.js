import {createElement} from '../render.js';

const createEmptyFilmsListTemplate = () => (
  `<main class="main">
     <nav class="main-navigation">
       <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
       <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">0</span></a>
       <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">0</span></a>
       <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">0</span></a>
     </nav>

      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title">There are no movies in our database</h2>

      <!--
        Значение отображаемого текста зависит от выбранного фильтра:
          * All movies – 'There are no movies in our database'
          * Watchlist — 'There are no movies to watch now';
          * History — 'There are no watched movies now';
          * Favorites — 'There are no favorite movies now'.
      -->
         </section>
       </section>
     </main>`
);

export default class EmptyFilmsListView {
  #element = null;

  get template() {
    return createEmptyFilmsListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
