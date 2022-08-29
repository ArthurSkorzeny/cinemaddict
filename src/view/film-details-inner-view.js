import AbstractView from '../framework/view/abstract-view.js';

const createFilmDeatilsInnerTemplate = () => ('<div class="film-details__inner"></div>');

export default class FilmDeatilsInnerView extends AbstractView{
  get template() {
    return createFilmDeatilsInnerTemplate();
  }
}
