import AbstractView from '../framework/view/abstract-view.js';

const createPopupCommentsWrapTemplate = () => (
  `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
   </section>`
);

export default class FilmDetailsCommentsWrapView extends AbstractView{
  get template() {
    return createPopupCommentsWrapTemplate();
  }
}
