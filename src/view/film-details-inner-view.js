import {createElement} from '../render.js';

const createFilmDeatilsInnerTemplate = () => ('<div class="film-details__inner"></div>');

export default class FilmDeatilsInnerView {
  #element = null;

  get template() {
    return createFilmDeatilsInnerTemplate();
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
