import PagePresenter from './presenter/page-presenter.js';
import CardsModel from './model/card-model.js';
import CommentsModel from './model/comments-model.js';
import CardsApiService from './api-services/cards-api-service';
import CommentsApiService from './api-services/comments-api-sevice.js';

const AUTHORIZATION = 'Basic dfhjkd4337fwsyg34';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistic = siteFooterElement.querySelector('.footer__statistics');

const cardsModel = new CardsModel(new CardsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));


const pagePresenter = new PagePresenter(siteMainElement, cardsModel, siteHeaderElement, siteFooterStatistic, commentsModel);


pagePresenter.init();
cardsModel.init();
