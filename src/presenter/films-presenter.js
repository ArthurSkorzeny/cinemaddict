import SortButtonsView from '../view/sort-view.js';
import NavigationButtonsView from '../view/films-navigation-view.js';
import FilmsView from '../view/films-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmsListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';

import UserProfileView from '../view/header-profile-view.js';
import FooterStatisticView from '../view/footer-statistics-view.js';
import FilmCardView from '../view/film-card-view.js';

import FilmsDetailsView from '../view/film-details-section-view.js';
import FilmDeatilsInnerView from '../view/film-details-inner-view.js';
import FilmPopupView from '../view/film-details-top-container-view.js';

import FilmDetailsBottomContainerView from '../view/film-details-bottom-container-view.js.js';
import FilmDetailsCommentsWrapView from '../view/film-details-comments-wrap-view.js';
import FilmDetailsCommentsListView from '../view/popup-comments-list-view.js';
import FilmCommentView from '../view/popup-comment-view.js';

import EmptyFilmsListView from '../view/films-list-empty-view.js';

import {render} from '../render.js';

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

  #popupSection = new FilmsDetailsView();
  #popupInner = new FilmDeatilsInnerView;
  #popupComponent = new FilmPopupView();

  #popupBottomContainer = new FilmDetailsBottomContainerView();
  #popupCommentsWrap = new FilmDetailsCommentsWrapView;
  #popupCommentsList = new FilmDetailsCommentsListView();
  #popupComment = new FilmCommentView();

  #pageFilms = [];
  #renderedFilmsCount = FILMS_PER_CLICK;

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


  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#pageFilms
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_PER_CLICK)
      .forEach((card) => this.#renderCard(card));

    this.#renderedFilmsCount += FILMS_PER_CLICK;

    if (this.#renderedFilmsCount >= this.#pageFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderCard = (card) => {

    const filmsComponent = new FilmCardView(card);

    const openPopup = () => {
      render(this.#popupSection, this.#pageContainer);
      render(this.#popupInner, this.#popupSection.element);
      render(this.#popupComponent, this.#popupInner.element);

      render(this.#popupBottomContainer, this.#popupInner.element);
      render(this.#popupCommentsWrap, this.#popupBottomContainer.element);
      render(this.#popupCommentsList, this.#popupCommentsWrap.element);
    };

    const closePopup = () => {
      document.body.querySelector('.main').querySelector('.film-details').remove();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        document.querySelector('body').classList.remove('hide-overflow');
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmsComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      document.querySelector('body').classList.add('hide-overflow');
      openPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    this.#popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      document.querySelector('body').classList.remove('hide-overflow');
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmsComponent, this.#filmListContainerComponent.element);
  };

  #renderPage = () => {
    if(this.#pageFilms.every((card) => card.isArchive)){
      render(new EmptyFilmsListView(), this.#pageContainer);
      render(new FooterStatisticView(), this.#footerContainer);
    } else {
      render(new UserProfileView(), this.#headerContainer);
      render(new FooterStatisticView(), this.#footerContainer);

      render(new NavigationButtonsView(), this.#pageContainer);
      render(new SortButtonsView(), this.#pageContainer);

      render(this.#filmsComponent, this.#pageContainer);
      render(this.#filmListComponent, this.#filmsComponent.element);
      render(this.#filmListContainerComponent, this.#filmListComponent.element);

      for (let i = 0; i < Math.min(this.#pageFilms.length, FILMS_PER_CLICK); i++) {
        this.#renderCard(this.#pageFilms[i]);
      }

      if (this.#pageFilms.length > FILMS_PER_CLICK) {
        render(this.#showMoreButtonComponent, this.#filmsComponent.element);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
      }
    }

  };
}
