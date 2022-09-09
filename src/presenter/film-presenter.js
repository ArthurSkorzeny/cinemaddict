/* eslint-disable no-useless-return */
import {render, replace, remove} from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';

import FilmsDetailsView from '../view/film-details-section-view.js';
import FilmDeatilsInnerView from '../view/film-details-inner-view.js';
import FilmPopupView from '../view/film-details-top-container-view.js';

import FilmDetailsBottomContainerView from '../view/film-details-bottom-container-view.js.js';
import FilmDetailsCommentsWrapView from '../view/film-details-comments-wrap-view.js';
import FilmDetailsCommentsListView from '../view/popup-comments-list-view.js';
//import FilmCommentView from '../view/popup-comment-view.js';

const Mode = {
  CARD: 'CARD',
  POPUP: 'POPUP',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #pageContainer = null;
  #changeData = null;
  #changeMode = null;

  #card = null;
  #mode = Mode.CARD;

  #filmCardComponent = null;

  #popupSection = null;
  #popupInner = null;
  #popupComponent = null;

  #popupBottomContainer = null;
  #popupCommentsWrap = null;
  #popupCommentsList = null;
  //#popupComment = null;

  constructor({filmlistContainer, filmDataChange, pageModeChange, pageContainer}) {
    this.#filmListContainer = filmlistContainer;
    this.#changeData = filmDataChange;
    this.#changeMode = pageModeChange;
    this.#pageContainer = pageContainer;
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
    //this.#popupComment = new FilmCommentView();

    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchListClick);
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#handleWatchedClick);

    if (prevFilmCardComponent === null){
      render(this.#filmCardComponent, this.#filmListContainer);
      this.#filmCardComponent.setClickHandler(this.#handleOpenClick);
      return;
    } else {
      replace(this.#filmCardComponent, prevFilmCardComponent);
      this.#filmCardComponent.setClickHandler(this.#handleOpenClick);
      remove(prevFilmCardComponent);
    }

    if (prevFilmPopupComponent === null){
      render(this.#popupComponent, this.#pageContainer);
      return;
    } else {
      replace(this.#popupComponent, prevFilmPopupComponent);
      document.querySelector('.film-details').remove();
      this.#handleOpenClick();
      remove(prevFilmPopupComponent);
    }
  };

  resetView = () => {
    if (this.#mode !== Mode.CARD){
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
  };

  #closePopup = () => {
    remove(this.#popupSection);
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#popupComponent.deleteClickHandler(this.#closePopup);
    this.#mode = Mode.CARD;
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
  };

  #handleFavoriteClick = () => {
    this.#changeData({
      ...this.#card,
      userDetails: {
        ...this.#card.userDetails,
        favorite: !this.#card.userDetails.favorite
      }
    });
  };

  #handleWatchListClick = () => {
    this.#changeData({
      ...this.#card,
      userDetails: {
        ...this.#card.userDetails,
        watchlist: !this.#card.userDetails.watchlist
      }
    });
  };

  #handleWatchedClick = () => {
    this.#changeData({
      ...this.#card,
      userDetails: {
        ...this.#card.userDetails,
        alreadyWatched: !this.#card.userDetails.alreadyWatched
      }
    });
  };
}
