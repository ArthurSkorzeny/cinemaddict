import {render, remove, replace} from '../framework/render.js';
import {sortByDate, sortByRating} from '../utils/common.js';
import {sortModes, filterModes} from '../const.js';

import FilmPresenter from './film-presenter.js';

import SortButtonsView from '../view/sort-view.js';
import FilterButtonsView from '../view/filter-view.js';
import FilmsView from '../view/films-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmsListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';

import UserProfileView from '../view/header-profile-view.js';
import FooterStatisticView from '../view/footer-statistics-view.js';

import EmptyFilmsListView from '../view/films-list-empty-view.js';
import EmptyFilterFilmListView from '../view/filter-film-list-empty-view.js';

const FILMS_PER_CLICK = 5;
const CARD_MODE = 'CARD';


export default class PagePresenter {
  #pageContainer = null;
  #cardsModel = null;
  #headerContainer = null;
  #footerContainer = null;

  #filterButtonsComponent = null;
  #emptyFilterFilmListComponent = null;

  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmsListView();
  #filmListContainerComponent = new FilmListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #sortButtonsComponent = new SortButtonsView();
  #footerStatisticComponent = new FooterStatisticView();
  #emptyFilmListComponent = new EmptyFilmsListView();

  #currentSortType = sortModes.default;
  #currentFilterType = filterModes.all;

  #renderedFilmsCount = FILMS_PER_CLICK;
  #filmPresenter = new Map();

  constructor(pageContainer, cardsModel, headerContainer, footerContainer) {
    this.#headerContainer = headerContainer;
    this.#footerContainer = footerContainer;

    this.#pageContainer = pageContainer;
    this.#cardsModel = cardsModel;
  }

  get cards() {

    switch (this.#currentSortType) {
      case sortModes.date:
        return [...this.#cardsModel.cards].sort(sortByDate);
      case sortModes.rating:
        return [...this.#cardsModel.cards].sort(sortByRating);
    }

    return this.#cardsModel.cards;
  }

  init = () => {
    this.#renderPage();
  };

  //взаимодействие с film-presenter и отрисовка фильмов
  #renderCard = (card) => {
    const filmPresenterArguments = {
      'filmlistContainer':this.#filmListContainerComponent.element,
      'filmDataChange':this.#handleViewAction,
      'pageModeChange':this.#handleModeChange,
      'pageContainer':this.#pageContainer,
      'sortButtonsHandler':this.#sortButtonsHandler,
    };

    const filmPresenter = new FilmPresenter(filmPresenterArguments);
    filmPresenter.init(card, this.#pageContainer);
    this.#filmPresenter.set(card.id, filmPresenter);
  };

  #renderFilms = (cards) => {
    cards.forEach((card) => this.#renderCard(card));
  };

  #clearFilms = ({resetRenderedCardCount = false, resetSortType = false} = {}) => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#emptyFilmListComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedCardCount) {
      this.#renderedFilmsCount = FILMS_PER_CLICK;
    }

    if (resetSortType) {
      this.#currentSortType = sortModes.default;
    }
  };

  #renderFilmsList = () => {
    let cardsCount = null;
    let cards = null;

    switch (this.#currentFilterType) {
      case filterModes.all:
        cardsCount = this.cards.length;
        cards = this.cards.slice(0, Math.min(cardsCount, FILMS_PER_CLICK));
        break;
      case filterModes.watchlist:
        cards = this.cards.filter((item) => item.userDetails.watchlist === false);
        cardsCount = cards.length;
        cards = cards.slice(0, Math.min(cardsCount, FILMS_PER_CLICK));
        break;
      case filterModes.history:
        cards = this.cards.filter((item) => item.userDetails.alreadyWatched === false);
        cardsCount = cards.length;
        cards = cards.slice(0, Math.min(cardsCount, FILMS_PER_CLICK));
        break;
      case filterModes.favorites:
        cards = this.cards.filter((item) => item.userDetails.favorite === false);
        cardsCount = cards.length;
        cards = cards.slice(0, Math.min(cardsCount, FILMS_PER_CLICK));
        break;
    }
    remove(this.#emptyFilterFilmListComponent);
    render(this.#filmsComponent, this.#pageContainer);
    render(this.#filmListComponent, this.#filmsComponent.element);

    if(this.#currentFilterType === filterModes.watchlist && cards.length === 0){
      this.#emptyFilterFilmListComponent = new EmptyFilterFilmListView(this.#currentFilterType);
      render(this.#emptyFilterFilmListComponent, this.#filmListComponent.element);
    }

    if(this.#currentFilterType === filterModes.history && cards.length === 0){
      this.#emptyFilterFilmListComponent = new EmptyFilterFilmListView(this.#currentFilterType);
      render(this.#emptyFilterFilmListComponent, this.#filmListComponent.element);
    }

    if(this.#currentFilterType === filterModes.favorites && cards.length === 0){
      this.#emptyFilterFilmListComponent = new EmptyFilterFilmListView(this.#currentFilterType);
      render(this.#emptyFilterFilmListComponent, this.#filmListComponent.element);
    } else {
      render(this.#filmListContainerComponent, this.#filmListComponent.element);
    }

    this.#renderFilms(cards);

    if(cardsCount > FILMS_PER_CLICK) {
      this.#renderShowMoreButton();
    }
  };

  #emptyFilmsList = () => {
    render(this.#emptyFilmListComponent, this.#pageContainer);
    render(this.#footerStatisticComponent, this.#footerContainer);
  };

  //отрисовка всеъ элементов на странице
  #renderPage = () => {
    if(this.cards.length === 0){

      this.#emptyFilmsList();

    } else {

      this.#renderUserProfile();
      this.#renderFooterStatistic();
      this.#renderFilterButtons();
      this.#renderSortButtons();

      this.#renderFilmsList();
    }
  };

  #renderUserProfile = () => {
    render(new UserProfileView(), this.#headerContainer);
  };

  #renderFilterButtons = () => {
    const prevFilmCardComponent = this.#filterButtonsComponent;
    this.#filterButtonsComponent = new FilterButtonsView(this.#findFilmsMarks());

    if(prevFilmCardComponent === null){
      render(this.#filterButtonsComponent, this.#pageContainer);
      this.#filterButtonsHandler();
    } else {
      replace(this.#filterButtonsComponent, prevFilmCardComponent);
      this.#filterButtonsHandler();
    }
  };

  #renderSortButtons = () => {
    this.#sortButtonsHandler(CARD_MODE);
    render(this.#sortButtonsComponent, this.#pageContainer);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmsComponent.element);
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderFooterStatistic = () => {
    render(new FooterStatisticView(this.cards.length), this.#footerContainer);
  };

  //функции для элементов
  #handleViewAction = (updateType, update) => {
    this.#cardsModel.updateCard(updateType, update);

    this.#filmPresenter.get(update.id).init(update);

    this.#renderFilterButtons(this.#findFilmsMarks());

    if(this.#currentFilterType !== filterModes.all){
      this.#clearFilms({resetRenderedCardCount: true});
      this.#renderFilmsList();
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleShowMoreButtonClick = () => {
    const cardsCount = this.cards.length;
    const newRenderedCardCount = Math.min(cardsCount, this.#renderedFilmsCount + FILMS_PER_CLICK);
    const cards = this.cards.slice(this.#renderedFilmsCount, newRenderedCardCount);

    this.#renderFilms(cards);
    this.#renderedFilmsCount = newRenderedCardCount;

    if (this.#renderedFilmsCount >= cardsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #findFilmsMarks = () =>
    //при реальных данных поменять false на true
    this.cards.reduce((marks, card) => {

      if(card.userDetails.watchlist === false){
        marks.watchlist = marks.watchlist + 1;
      }

      if(card.userDetails.alreadyWatched === false){
        marks.alreadyWatched = marks.alreadyWatched + 1;
      }

      if(card.userDetails.favorite === false){
        marks.favorite = marks.favorite + 1;
      }

      return marks;
    }, new Object({
      watchlist: 0,
      alreadyWatched: 0,
      favorite: 0,
    })
    );

  //логика сортировки
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilms({resetRenderedCardCount: true});
    this.#renderFilmsList();
  };

  #sortButtonsHandler = (mode) => {

    if(mode === 'CARD'){
      this.#sortButtonsComponent.setDateClickHandler(this.#sortByDate);
      this.#sortButtonsComponent.setDefaultClickHandler(this.#sortByDefault);
      this.#sortButtonsComponent.setRatingClickHandler(this.#sortByRating);
    }
    if(mode === 'POPUP'){
      this.#sortButtonsComponent.deleteDateClickHandler(this.#sortByDate);
      this.#sortButtonsComponent.deleteDefaultClickHandler(this.#sortByDefault);
      this.#sortButtonsComponent.deleteRatingClickHandler(this.#sortByRating);
    }
  };

  #sortByDefault = () => {
    this.#handleSortTypeChange(sortModes.default);
  };

  #sortByDate = () => {
    this.#handleSortTypeChange(sortModes.date);
  };

  #sortByRating = () => {
    this.#handleSortTypeChange(sortModes.rating);
  };

  //логика фильтров
  #handleFilterTypeChange = (filterType) => {
    if (this.#currentFilterType === filterType) {
      return;
    }

    this.#currentFilterType = filterType;
    this.#clearFilms({resetRenderedCardCount: true});
    this.#renderFilmsList();
  };

  #filterButtonsHandler = () => {
    this.#filterButtonsComponent.setAllClickHandler(this.#allFilter);
    this.#filterButtonsComponent.setWatchListClickHandler(this.#watchListFilter);
    this.#filterButtonsComponent.setAlreadyWatchedClickHandler(this.#historyFilter);
    this.#filterButtonsComponent.setFavoriteClickHandler(this.#favoriteFilter);
  };

  #allFilter = () => {
    this.#handleFilterTypeChange(filterModes.all);
  };

  #watchListFilter = () => {
    this.#handleFilterTypeChange(filterModes.watchlist);
  };

  #historyFilter = () => {
    this.#handleFilterTypeChange(filterModes.history);
  };

  #favoriteFilter = () => {
    this.#handleFilterTypeChange(filterModes.favorites);
  };
}
