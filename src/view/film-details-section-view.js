import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsTemplate = () => ('<section class="film-details"></section>');

export default class FilmsDetailsView extends AbstractView{
  get template() {
    return createFilmDetailsTemplate();
  }
}
