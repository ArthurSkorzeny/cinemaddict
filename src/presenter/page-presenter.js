import {render, remove, replace} from '../framework/render.js';

import FilmPresenter from './film-presenter.js';

import SortButtonsView from '../view/sort-view.js';
import NavigationButtonsView from '../view/films-navigation-view.js';
import FilmsView from '../view/films-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmsListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';

import FilmsDetailsView from '../view/film-details-section-view.js';

import UserProfileView from '../view/header-profile-view.js';
import FooterStatisticView from '../view/footer-statistics-view.js';

import EmptyFilmsListView from '../view/films-list-empty-view.js';
import {updateItem, sortByDate, sortByRating} from '../utils/common.js';

const FILMS_PER_CLICK = 5;
const CARD_MODE = 'CARD';

const sortModes = {
  default: 'default',
  date: 'date',
  rating: 'rating',
};

export default class PagePresenter {
  #pageContainer = null;
  #cardsModel = null;
  #headerContainer = null;
  #footerContainer = null;

  #filterButtonsComponent = null;

  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmsListView();
  #filmListContainerComponent = new FilmListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #navigationButtonsComponent = new SortButtonsView();

  #popupSection = new FilmsDetailsView();

  #pageFilms = [];
  #defaultPageFilms = [];

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
    this.#defaultPageFilms = [...this.#cardsModel.cards];

    this.#renderPage(this.#pageFilms);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderCard = (card) => {
    const filmPresenterArguments = {
      'filmlistContainer':this.#filmListContainerComponent.element,
      'filmDataChange':this.#handleFilmDataChange,
      'pageModeChange':this.#handleModeChange,
      'pageContainer':this.#pageContainer,
      'sortButtonsHandler':this.#sortButtonsHandler,
    };

    const filmPresenter = new FilmPresenter(filmPresenterArguments);
    filmPresenter.init(card, this.#pageContainer);
    this.#filmPresenter.set(card.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#pageFilms
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
  };

  #clearFilms = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_PER_CLICK;
    remove(this.#showMoreButtonComponent);
  };

  #renderFilmsList = (filmsArray) => {
    render(this.#filmsComponent, this.#pageContainer);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    for (let i = 0; i < Math.min(this.#pageFilms.length, FILMS_PER_CLICK); i++) {
      this.#renderCard(filmsArray[i]);
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
    render(new FooterStatisticView(this.#pageFilms.length), this.#footerContainer);
  };

  #renderNavigationButtons = () => {
    const prevFilmCardComponent = this.#filterButtonsComponent;
    this.#filterButtonsComponent = new NavigationButtonsView(this.#findFilmsMarks());

    if(prevFilmCardComponent === null){
      render(this.#filterButtonsComponent, this.#pageContainer);
    } else {
      replace(this.#filterButtonsComponent, prevFilmCardComponent);
    }
  };

  #findFilmsMarks = () => {
    let watchList = 0;
    let alreadyWatched = 0;
    let favorite = 0;

    this.#pageFilms.forEach((element) => {
      if(element.userDetails.watchlist === false){
        watchList = watchList + 1;
      }
    });

    this.#pageFilms.forEach((element) => {
      if(element.userDetails.alreadyWatched === false){
        alreadyWatched = alreadyWatched + 1;
      }
    });

    this.#pageFilms.forEach((element) => {
      if(element.userDetails.favorite === false){
        favorite = favorite + 1;
      }
    });

    return [watchList, alreadyWatched, favorite];
  };

  #handleFilmDataChange = (updatedFilm) => {
    this.#pageFilms = updateItem(this.#pageFilms, updatedFilm);
    this.#defaultPageFilms = updateItem(this.#defaultPageFilms, updatedFilm);

    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);

    this.#renderNavigationButtons(this.#findFilmsMarks());
  };

  #renderSortButtons = () => {
    this.#sortButtonsHandler(CARD_MODE);
    render(this.#navigationButtonsComponent, this.#pageContainer);
  };

  #renderPage = (filmsArray) => {
    if(filmsArray.length === 0){

      this.#emptyFilmsList();

    } else {

      this.#renderUserProfile();
      this.#renderFooterStatistic();
      this.#renderNavigationButtons();
      this.#renderSortButtons();

      this.#renderFilmsList(filmsArray);
    }
  };

  #sortButtonsHandler = (mode) => {

    if(mode === 'CARD'){
      this.#navigationButtonsComponent.setDateClickHandler(this.#sortByDate);
      this.#navigationButtonsComponent.setDefaultClickHandler(this.#sortByDefault);
      this.#navigationButtonsComponent.setRatingClickHandler(this.#sortByRating);
    }
    if(mode === 'POPUP'){
      this.#navigationButtonsComponent.deleteDateClickHandler(this.#sortByDate);
      this.#navigationButtonsComponent.deleteDefaultClickHandler(this.#sortByDefault);
      this.#navigationButtonsComponent.deleteRatingClickHandler(this.#sortByRating);
    }
  };

  filmsRenderMode = (filmsArray, mode) => {
    if(mode === sortModes.date){
      const sorted = filmsArray.sort(sortByDate);
      this.#renderFilmsList(sorted);
    }
    if(mode === sortModes.rating){
      const sorted = filmsArray.sort(sortByRating);
      this.#renderFilmsList(sorted);
    }
    if(mode === sortModes.default){
      this.#renderFilmsList(this.#defaultPageFilms);
    }
  };

  #sortByDefault = () => {
    this.#clearFilms();
    this.filmsRenderMode(this.#pageFilms, sortModes.default);
  };

  #sortByDate = () => {
    this.#clearFilms();
    this.filmsRenderMode(this.#pageFilms, sortModes.date);
  };

  #sortByRating = () => {
    this.#clearFilms();
    this.filmsRenderMode(this.#pageFilms, sortModes.rating);
  };
}
