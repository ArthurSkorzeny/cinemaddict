import {render, remove, replace} from '../framework/render.js';
import {sortByDate, sortByRating} from '../utils/common.js';
import {sortModes, filterModes, UpdateType} from '../const.js';

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
import LoadingView from '../view/loading-view.js';

const FILMS_PER_CLICK = 5;
const CARD_MODE = 'CARD';


export default class PagePresenter {
  #pageContainer = null;
  #cardsModel = null;
  #headerContainer = null;
  #footerContainer = null;
  #cardsList = null;

  #filterButtonsComponent = null;
  #emptyFilterFilmListComponent = null;

  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmsListView();
  #filmListContainerComponent = new FilmListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #sortButtonsComponent = new SortButtonsView();
  #emptyFilmListComponent = new EmptyFilmsListView();
  #loadingComponent = new LoadingView();
  #userProfileComponent = new UserProfileView();
  #footerStatiscticComponent = null;

  #currentSortType = sortModes.default;
  #currentFilterType = filterModes.all;
  #isLoading = true;

  #renderedFilmsCount = FILMS_PER_CLICK;
  #filmPresenter = new Map();

  constructor(pageContainer, cardsModel, headerContainer, footerContainer) {
    this.#headerContainer = headerContainer;
    this.#footerContainer = footerContainer;

    this.#pageContainer = pageContainer;
    this.#cardsModel = cardsModel;

    this.#cardsModel.addObserver(this.#handleModelEvent);
  }

  get cards() {

    switch (this.#currentSortType) {
      case sortModes.date:
        return [...this.#cardsModel.cards].sort(sortByDate);
      case sortModes.rating:
        return [...this.#cardsModel.cards].sort(sortByRating);
      default:
        return this.#cardsModel.cards;
    }
  }

  init = () => {
    this.#renderPage();
  };

  //взаимодействие с film-presenter и отрисовка фильмов
  #renderCard = (card) => {
    const filmPresenterArguments = {
      'filmlistContainer':this.#filmListContainerComponent.element,
      'filmDataChange':this.#handleDataChange,
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

  #clearPage = () => {
    remove(this.#emptyFilmListComponent);
    remove(this.#userProfileComponent);
    remove(this.#filterButtonsComponent);
    remove(this.#sortButtonsComponent);
    remove(this.#filmsComponent);
    remove(this.#footerStatiscticComponent);
    remove(this.#showMoreButtonComponent);
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#emptyFilmListComponent);
    remove(this.#showMoreButtonComponent);
  };

  #renderFilmsList = () => {
    let cardsCount = null;

    switch (this.#currentFilterType) {
      case filterModes.watchlist:
        this.#cardsList = this.cards.filter((item) => item.userDetails.watchlist === true);
        cardsCount = this.#cardsList.length;
        break;
      case filterModes.history:
        this.#cardsList = this.cards.filter((item) => item.userDetails.alreadyWatched === true);
        cardsCount = this.#cardsList.length;
        break;
      case filterModes.favorites:
        this.#cardsList = this.cards.filter((item) => item.userDetails.favorite === true);
        cardsCount = this.#cardsList.length;
        break;
      default:
        cardsCount = this.cards.length;
        this.#cardsList = this.cards;
        break;
    }

    remove(this.#emptyFilterFilmListComponent);
    remove(this.#loadingComponent);
    render(this.#filmsComponent, this.#pageContainer);
    render(this.#filmListComponent, this.#filmsComponent.element);

    if(this.#currentFilterType !== filterModes.all && this.#cardsList.length === 0){
      this.#emptyFilterFilmListComponent = new EmptyFilterFilmListView(this.#currentFilterType);
      render(this.#emptyFilterFilmListComponent, this.#filmListComponent.element);
    } else {
      render(this.#filmListContainerComponent, this.#filmListComponent.element);
    }

    this.#renderFilms(this.#cardsList.slice(0, Math.min(cardsCount, FILMS_PER_CLICK)));
    this.#renderedFilmsCount = FILMS_PER_CLICK;

    if(cardsCount > FILMS_PER_CLICK) {
      this.#renderShowMoreButton();
    }
  };

  //отрисовка всех элементов на странице
  #renderPage = () => {
    if(this.#isLoading === true){
      this.#renderLoading();
    } else {

      this.#renderUserProfile();
      this.#renderFooterStatistic();
      this.#renderFilterButtons();
      this.#renderSortButtons();

      this.#renderFilmsList();
    }
  };

  #renderUserProfile = () => {
    render(this.#userProfileComponent, this.#headerContainer);
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
    this.#footerStatiscticComponent = new FooterStatisticView(this.cards.length);
    render(this.#footerStatiscticComponent, this.#footerContainer);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pageContainer);
  };

  //функции для элементов
  #handleDataChange = (updateType, data) => {
    this.#cardsModel.updateCard(updateType, data);
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#clearPage();
        this.#renderPage();
        break;
    }
    switch (updateType) {
      case UpdateType.MAJOR:
        this.#clearPage();
        this.#renderPage();
        break;
    }
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);

        this.#renderFilterButtons(this.#findFilmsMarks());

        if(this.#currentFilterType !== filterModes.all){
          this.#clearFilmList();
          this.#renderFilmsList();
        }
        break;
    }
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPage();
        break;
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleShowMoreButtonClick = () => {
    const newRenderedCardCount = Math.min(this.#cardsList.length, this.#renderedFilmsCount + FILMS_PER_CLICK);
    const cards = this.#cardsList.slice(this.#renderedFilmsCount, newRenderedCardCount);

    this.#renderFilms(cards);
    this.#renderedFilmsCount = newRenderedCardCount;

    if (this.#renderedFilmsCount >= this.#cardsList.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #findFilmsMarks = () =>
    this.cards.reduce((marks, card) => {

      if(card.userDetails.watchlist === true){
        marks.watchlist = marks.watchlist + 1;
      }

      if(card.userDetails.alreadyWatched === true){
        marks.alreadyWatched = marks.alreadyWatched + 1;
      }

      if(card.userDetails.favorite === true){
        marks.favorite = marks.favorite + 1;
      }

      return marks;
    }, {
      watchlist: 0,
      alreadyWatched: 0,
      favorite: 0,
    }
    );

  //логика сортировки
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmList();
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
    this.#clearFilmList();
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
