import AbstractView from '../framework/view/abstract-view.js';

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
         </section>
       </section>
     </main>`
);

export default class EmptyFilmsListView extends AbstractView{
  get template() {
    return createEmptyFilmsListTemplate();
  }
}
