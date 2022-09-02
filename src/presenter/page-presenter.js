import {render, remove} from '../framework/render.js';

import FilmPresenter from './film-presenter.js';

import SortButtonsView from '../view/sort-view.js';
import NavigationButtonsView from '../view/films-navigation-view.js';
import FilmsView from '../view/films-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmsListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';

import UserProfileView from '../view/header-profile-view.js';
import FooterStatisticView from '../view/footer-statistics-view.js';

import EmptyFilmsListView from '../view/films-list-empty-view.js';
import {updateItem} from '../utils/common.js';

import {generateFilter} from '../mock/films-navigation.js';

const FILMS_PER_CLICK = 5;


export default class PagePresenter {
  #pageContainer = null;
  #cardsModel = null;
  #headerContainer = null;
  #footerContainer = null;

  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmsListView();
  #filmListContainerComponent = new FilmListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #pageFilms = [];
  #renderedFilmsCount = FILMS_PER_CLICK;
  #filmPresenter = new Map();

  constructor(pageContainer, cardsModel, headerContainer, footerContainer) {
    this.#headerContainer = headerContainer;
    this.#footerContainer = footerContainer;

    this.#pageContainer = pageContainer;
    this.#cardsModel = cardsModel;
  }

  init = () => {
    this.#pageFilms = [...this.#cardsModel.cards];
    this.#renderPage();
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainerComponent.element, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(card, this.#pageContainer);
    this.#filmPresenter.set(card.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#pageFilms
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
  };

  #clearFilms = () =>{
    this.filmPresenter.forEach((presenter) => presenter.destroy);
    this.filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_PER_CLICK;
    remove(this.#showMoreButtonComponent);
  };

  #renderFilmsList = () => {
    render(this.#filmsComponent, this.#pageContainer);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    for (let i = 0; i < Math.min(this.#pageFilms.length, FILMS_PER_CLICK); i++) {
      this.#renderCard(this.#pageFilms[i]);
    }

    if(this.#pageFilms.length > FILMS_PER_CLICK) {
      this.#renderShowMoreButton();
    }
  };

  #emptyFilmsList = () => {
    render(new EmptyFilmsListView(), this.#pageContainer);
    render(new FooterStatisticView(), this.#footerContainer);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmsComponent.element);
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_PER_CLICK);

    this.#renderedFilmsCount += FILMS_PER_CLICK;

    if (this.#renderedFilmsCount >= this.#pageFilms.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderUserProfile = () => {
    render(new UserProfileView(), this.#headerContainer);
  };

  #renderFooterStatistic = () => {
    render(new FooterStatisticView(), this.#footerContainer);
  };

  #renderNavigationButtons = () => {
    const filtersCount = generateFilter();
    render(new NavigationButtonsView(filtersCount), this.#pageContainer);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#pageFilms = updateItem(this.#pageFilms, updatedFilm);
  };

  #renderSortButtons = () => {
    render(new SortButtonsView(), this.#pageContainer);
  };

  #renderPage = () => {
    if(this.#pageFilms.every((card) => card.isArchive)){

      this.#emptyFilmsList();

    } else {

      this.#renderUserProfile();
      this.#renderFooterStatistic();
      this.#renderNavigationButtons();
      this.#renderSortButtons();

      this.#renderFilmsList();
    }
  };
}
