import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatisticEmptyTemplate = () => ('<p>0 movies inside</p>');

export default class FooterStatisticEmptyView extends AbstractView{
  get template() {
    return createFooterStatisticEmptyTemplate();
  }
}
