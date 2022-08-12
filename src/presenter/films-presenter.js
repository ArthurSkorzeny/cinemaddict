import SortButtonsView from '../view/sort-view.js';
import NavigationButtonsView from '../view/films-navigation-view.js';
import FilmsView from '../view/films-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import FilmsListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import {render} from '../render.js';

const START_FILMS_ON_PAGE = 5;

export default class PagePresenter {
  filmsComponent = new FilmsView();
  filmList = new FilmsListView();
  filmListContainer = new FilmListContainerView();


  init = (pageContainer) => {
    this.pageContainer = pageContainer;

    render(new NavigationButtonsView(), pageContainer);
    render(new SortButtonsView(), pageContainer);

    render(this.filmsComponent, pageContainer);
    render(this.filmList, this.filmsComponent.getElement());
    render(this.filmListContainer, this.filmList.getElement());

    for (let i = 0; i < START_FILMS_ON_PAGE;; i++) {
      render(new FilmCardView(), this.filmListContainer.getElement());
    }


    render(new ShowMoreButtonView(), this.filmList.getElement());
  };
}
