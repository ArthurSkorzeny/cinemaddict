import PagePresenter from './presenter/page-presenter.js';
import CardsModel from './model/card-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistic = siteFooterElement.querySelector('.footer__statistics');

const cardsModel = new CardsModel();
const pagePresenter = new PagePresenter(siteMainElement, cardsModel, siteHeaderElement, siteFooterStatistic);


pagePresenter.init();
