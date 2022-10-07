import AbstractView from '../framework/view/abstract-view.js';
import {filterModes} from '../const.js';

const createEmptyFilterFilmListTemplate = (filter) => {
  const currentFilter = () => {
    if(filter === filterModes.watchlist){
      return 'There are no movies to watch now';
    }

    if(filter === filterModes.history){
      return 'There are no watched movies now';
    }

    if(filter === filterModes.favorites){
      return 'There are no favorite movies now';
    }
  };

  return(
    `<section class="films-list">
      <h2 class="films-list__title">${currentFilter()}</h2>
     </section>`
  );
};

export default class EmptyFilterFilmListView extends AbstractView{
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createEmptyFilterFilmListTemplate(this.#filter);
  }
}
