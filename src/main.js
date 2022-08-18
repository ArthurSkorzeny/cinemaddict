import UserProfileView from './view/header-profile-view.js';
import FooterStatisticView from './view/footer-statistics-view.js';
import PagePresenter from './presenter/films-presenter.js';
import CardsModel from './model/card-model.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistic = siteFooterElement.querySelector('.footer__statistics');

const cardsModel = new CardsModel();
const pagePresenter = new PagePresenter();

render(new UserProfileView(), siteHeaderElement);
render(new FooterStatisticView(), siteFooterStatistic);

pagePresenter.init(siteMainElement, cardsModel);
