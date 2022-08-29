import AbstractView from '../framework/view/abstract-view.js';

const createPopupBottomContainerTemplate = () => ('<div class="film-details__bottom-container"></div>');

export default class FilmDetailsBottomContainerView extends AbstractView{
  get template() {
    return createPopupBottomContainerTemplate();
  }
}
