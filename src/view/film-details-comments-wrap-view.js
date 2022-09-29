import AbstractView from '../framework/view/abstract-view.js';

const createPopupCommentsWrapTemplate = (commentsLength) => (
  `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsLength}</span></h3>
   </section>`
);

export default class FilmDetailsCommentsWrapView extends AbstractView{
  #commentsLength = null;

  constructor(commentsLength) {
    super();
    this.#commentsLength = commentsLength;
  }

  get template() {
    return createPopupCommentsWrapTemplate(this.#commentsLength);
  }
}
