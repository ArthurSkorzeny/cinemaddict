import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatisticTemplate = (filmsValue) => (`<p>${filmsValue} movies inside</p>`);

export default class FooterStatisticView extends AbstractView{
  #filmsValue = null;

  constructor(filmsValue) {
    super();
    this.#filmsValue = filmsValue;
  }

  get template() {
    return createFooterStatisticTemplate(this.#filmsValue);
  }
}
