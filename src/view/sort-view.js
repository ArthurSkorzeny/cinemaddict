import {createElement} from '../render.js';

const createSortButtonsTemplate = () => (
  `<ul class="sort">
     <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
     <li><a href="#" class="sort__button">Sort by date</a></li>
     <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);

export default class SortButtonsView {
  #element = null;

  get template() {
    return createSortButtonsTemplate();
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
