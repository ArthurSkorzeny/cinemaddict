/* eslint-disable no-useless-return */
import {render, replace, remove} from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';

import FilmsDetailsView from '../view/film-details-section-view.js';
import FilmDeatilsInnerView from '../view/film-details-inner-view.js';
import FilmPopupView from '../view/film-details-top-container-view.js';

import FilmDetailsBottomContainerView from '../view/film-details-bottom-container-view.js.js';
import FilmDetailsCommentsWrapView from '../view/film-details-comments-wrap-view.js';
import FilmDetailsCommentsListView from '../view/popup-comments-list-view.js';
import FilmDetailsNewCommentFormView from '../view/new-comment-form-view.js';

const Mode = {
  CARD: 'CARD',
  POPUP: 'POPUP',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #pageContainer = null;
  #changeData = null;
  #changeMode = null;
  #sortButtonsHandler = null;

  #card = null;
  #mode = Mode.CARD;
  #scrollPosition = null;

  #filmCardComponent = null;

  #popupSection = null;
  #popupInner = null;
  #popupComponent = null;

  #popupBottomContainer = null;
  #popupCommentsWrap = null;
  #popupCommentsList = null;
  #popupNewCommentForm = null;

  constructor({filmlistContainer, filmDataChange, pageModeChange, pageContainer, sortButtonsHandler}) {
    this.#filmListContainer = filmlistContainer;
    this.#changeData = filmDataChange;
    this.#changeMode = pageModeChange;
    this.#pageContainer = pageContainer;
    this.#sortButtonsHandler = sortButtonsHandler;
  }

  init = (card) => {
    this.#card = card;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmPopupComponent = this.#popupComponent;

    this.#filmCardComponent = new FilmCardView(this.#card);

    this.#popupSection = new FilmsDetailsView();
    this.#popupInner = new FilmDeatilsInnerView;
    this.#popupComponent = new FilmPopupView(this.#card);

    this.#popupBottomContainer = new FilmDetailsBottomContainerView();
    this.#popupCommentsWrap = new FilmDetailsCommentsWrapView;
    this.#popupCommentsList = new FilmDetailsCommentsListView();
    this.#popupNewCommentForm = new FilmDetailsNewCommentFormView();

    this.#popupButtonsHandler();

    if (prevFilmCardComponent === null){
      render(this.#filmCardComponent, this.#filmListContainer);
      this.#cardButtonsHandler();
      return;
    } else {
      replace(this.#filmCardComponent, prevFilmCardComponent);
      this.#cardButtonsHandler();
      remove(prevFilmCardComponent);
    }

    if (prevFilmPopupComponent === null){
      render(this.#popupComponent, this.#pageContainer);
      return;
    }
    if (this.#mode === Mode.POPUP){
      this.#popupSection.deleteFilmDetailsSection();
      replace(this.#popupComponent, prevFilmPopupComponent);
      this.#handleOpenClick();
      this.#popupComponent.scrollToNedeedPosition(this.#scrollPosition);
      remove(prevFilmPopupComponent);
    }
  };

  resetView = () => {
    if (this.#mode === Mode.POPUP){
      this.#closePopup();
    }
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#popupComponent);
  };

  #openPopup = () => {
    render(this.#popupSection, this.#pageContainer);
    render(this.#popupInner, this.#popupSection.element);
    render(this.#popupComponent, this.#popupInner.element);

    render(this.#popupBottomContainer, this.#popupInner.element);
    render(this.#popupCommentsWrap, this.#popupBottomContainer.element);
    render(this.#popupCommentsList, this.#popupCommentsWrap.element);
    render(this.#popupNewCommentForm, this.#popupCommentsWrap.element);
  };

  #closePopup = () => {
    remove(this.#popupSection);
    this.#popupComponent.deleteHideOverFlowFromBody();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#popupComponent.deleteClickHandler(this.#closePopup);
    this.#mode = Mode.CARD;
    this.#sortButtonsHandler(this.#mode);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #handleOpenClick = () => {
    this.#changeMode();
    this.#mode = Mode.POPUP;
    document.querySelector('body').classList.add('hide-overflow');
    this.#openPopup();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#popupComponent.setClickHandler(this.#closePopup);
    this.#sortButtonsHandler(this.#mode);
  };

  #handleFavoriteClick = () => {
    if(this.#mode === Mode.POPUP){
      this.#scrollPosition = this.#popupComponent.getScrollPosition();
    }
    this.#changeData({
      ...this.#card,
      userDetails: {
        ...this.#card.userDetails,
        favorite: !this.#card.userDetails.favorite
      }
    });
  };

  #handleWatchListClick = () => {
    if(this.#mode === Mode.POPUP){
      this.#scrollPosition = this.#popupComponent.getScrollPosition();
    }
    this.#changeData({
      ...this.#card,
      userDetails: {
        ...this.#card.userDetails,
        watchlist: !this.#card.userDetails.watchlist
      }
    });
  };

  #handleWatchedClick = () => {
    if(this.#mode === Mode.POPUP){
      this.#scrollPosition = this.#popupComponent.getScrollPosition();
    }
    this.#changeData({
      ...this.#card,
      userDetails: {
        ...this.#card.userDetails,
        alreadyWatched: !this.#card.userDetails.alreadyWatched
      }
    });
  };

  #cardButtonsHandler = () => {
    this.#filmCardComponent.setClickHandler(this.#handleOpenClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleWatchedClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchListClick);
  };

  #popupButtonsHandler = () => {
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchListClick);
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#handleWatchedClick);
  };
}
