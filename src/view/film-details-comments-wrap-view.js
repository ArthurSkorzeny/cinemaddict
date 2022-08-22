import {createElement} from '../render.js';

const createPopupCommentsWrapTemplate = () => (
  `
  <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
  </section>
`
);

export default class FilmDetailsCommentsWrapView {
  #element = null;

  get template() {
    return createPopupCommentsWrapTemplate();
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
