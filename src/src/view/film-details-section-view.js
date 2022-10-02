import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsTemplate = () => ('<section class="film-details"></section>');

export default class FilmsDetailsView extends AbstractView{
  get template() {
    return createFilmDetailsTemplate();
  }

  deleteFilmDetailsSection = () => {
    if(document.querySelector('.film-details')){
      document.querySelector('.film-details').remove();
      document.querySelector('body').classList.remove('hide-overflow');
    }
  };
}
