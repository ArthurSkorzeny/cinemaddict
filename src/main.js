import PagePresenter from './presenter/page-presenter.js';
import CardsModel from './model/card-model.js';
import CardsApiService from './api-services/cards-api-service';

const AUTHORIZATION = 'Basic dfhjkd433wsysg34';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistic = siteFooterElement.querySelector('.footer__statistics');

const cardsModel = new CardsModel(new CardsApiService(END_POINT, AUTHORIZATION));
const pagePresenter = new PagePresenter(siteMainElement, cardsModel, siteHeaderElement, siteFooterStatistic);


pagePresenter.init();
cardsModel.init();
