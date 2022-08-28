import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatisticTemplate = () => ('<p>130 291 movies inside</p>');

export default class FooterStatisticView extends AbstractView{
  get template() {
    return createFooterStatisticTemplate();
  }
}
