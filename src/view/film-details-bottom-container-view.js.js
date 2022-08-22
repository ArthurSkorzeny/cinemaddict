import {createElement} from '../render.js';

const createPopupBottomContainerTemplate = () => ('<div class="film-details__bottom-container"></div>');

export default class FilmDetailsBottomContainerView {
  #element = null;

  get template() {
    return createPopupBottomContainerTemplate();
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
