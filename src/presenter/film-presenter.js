/* eslint-disable no-useless-return */
import {render, replace, remove} from '../framework/render.js';
import {UpdateType, EventValues} from '../const.js';

import CommentPresenter from './comments-presenter.js';


import FilmCardView from '../view/film-card-view.js';
import FilmCommentView from '../view/popup-comment-view.js';

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

  #filmCommentComponent = new FilmCommentView();
  #filmCardComponent = null;
  #popupSection = null;
  #popupInner = null;
  #popupComponent = null;

  #popupBottomContainer = null;
  #popupCommentsWrap = null;
  #popupCommentsList = null;
  #popupNewCommentForm = null;
  #commentsModel = null;
  #commentsWrap = null;

  #commentPresenter = new Map();

  constructor({filmlistContainer, filmDataChange, pageModeChange, pageContainer, sortButtonsHandler, commentsModel}) {
    this.#filmListContainer = filmlistContainer;
    this.#changeData = filmDataChange;
    this.#changeMode = pageModeChange;
    this.#pageContainer = pageContainer;
    this.#sortButtonsHandler = sortButtonsHandler;
    this.#commentsModel = commentsModel;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init = (card) => {
    this.#card = card;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmPopupComponent = this.#popupComponent;

    this.#filmCardComponent = new FilmCardView(this.#card);
    this.#popupInner = new FilmDeatilsInnerView();

    this.#popupSection = new FilmsDetailsView();
    this.#popupComponent = new FilmPopupView(this.#card);

    this.#popupBottomContainer = new FilmDetailsBottomContainerView();
    this.#popupCommentsWrap = new FilmDetailsCommentsWrapView(card);
    this.#popupNewCommentForm = new FilmDetailsNewCommentFormView();
    this.#popupCommentsList = new FilmDetailsCommentsListView();

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

  #handleDownloadEvent = () => {
    this.#renderCommentsInner();
  };

  #handleCommentEvent = (result) => {
    document.querySelectorAll('button').forEach((button) => {button.disabled = false;});

    if(result === EventValues.SUCCES){
      this.#commentsModel.init(this.#card);
      this.#clearCommentsInner();
      this.#renderCommentsInner();
    }
  };

  #openPopup = () => {
    this.#commentsModel.addObserver(this.#handleDownloadEvent);
    this.#commentsModel.init(this.#card);

    render(this.#popupSection, this.#pageContainer);
    render(this.#popupInner, this.#popupSection.element);
    render(this.#popupComponent, this.#popupInner.element);
  };

  #closePopup = () => {
    this.#clearCommentsInner();
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

    this.#changeData(
      UpdateType.PATCH,
      {
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

    this.#changeData(
      UpdateType.PATCH,
      {
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

    this.#changeData(
      UpdateType.PATCH,
      {
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

  #handleNewComment = () => {
    document.querySelectorAll('button').forEach((button) => {button.disabled = true;});
    this.#commentsModel.addObserver(this.#handleCommentEvent);
    this.#commentsModel.add(this.#card, this.#popupNewCommentForm.getNewComment());
  };

  #handleDeleteComment = (comment) => {
    document.querySelectorAll('button').forEach((button) => {button.disabled = true;});
    this.#commentsModel.addObserver(this.#handleCommentEvent);
    this.#commentsModel.delete(comment);
  };

  //комментарии
  #renderComment = (comment) => {
    const commentPresenterArguments = {
      'commentlistContainer':this.#popupCommentsList.element,
      'card':this.#card,
      'deleteCommentHandler':this.#handleDeleteComment,
    };

    const commentPresenter = new CommentPresenter(commentPresenterArguments);
    commentPresenter.init(comment);
    this.#commentPresenter.set(comment.id, commentPresenter);
  };

  #renderComments = (comments) => {
    comments.forEach((comment) => this.#renderComment(comment));
  };

  #renderCommentsInner = () => {
    render(this.#popupBottomContainer, this.#popupInner.element);
    render(this.#popupCommentsWrap, this.#popupBottomContainer.element);
    render(this.#popupCommentsList, this.#popupCommentsWrap.element);
    this.#renderComments(this.comments);
    render(this.#popupNewCommentForm, this.#popupCommentsWrap.element);
    document.addEventListener('keydown', (evt)=> {
      if (evt.key === 'Enter' && evt.ctrlKey) {
        evt.preventDefault();
        this.#handleNewComment();
      }
    });
    this.#commentsModel.removeObserver(this.#handleDownloadEvent);
  };

  #clearCommentsInner = () => {
    remove(this.#popupNewCommentForm);
    remove(this.#popupBottomContainer);
    remove(this.#popupCommentsList);
    this.#popupNewCommentForm.setBasicValues();
  };
}
