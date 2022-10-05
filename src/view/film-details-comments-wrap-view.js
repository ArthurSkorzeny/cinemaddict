import AbstractView from '../framework/view/abstract-view.js';

const createPopupCommentsWrapTemplate = (card) => (
  `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${card.comments.length}</span></h3>
   </section>`
);

export default class FilmDetailsCommentsWrapView extends AbstractView{
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createPopupCommentsWrapTemplate(this.#card);
  }
}
