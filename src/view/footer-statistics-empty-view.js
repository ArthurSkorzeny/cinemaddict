import {createElement} from '../render.js';

const createFooterStatisticEmptyTemplate = () => ('<p>0 movies inside</p>');

export default class FooterStatisticEmptyView {
  #element = null;

  get template() {
    return createFooterStatisticEmptyTemplate();
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
