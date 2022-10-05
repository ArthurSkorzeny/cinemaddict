import {render} from '../framework/render.js';
import {UpdateType} from '../const.js';
import FilmCommentView from '../view/popup-comment-view.js';


export default class CommentPresenter {
  #commentList = null;
  #card = null;
  #comment = null;
  #filmCommentComponent = null;
  #deleteCommentHandler = null;

  constructor({commentlistContainer, card, deleteCommentHandler}){

    this.#commentList = commentlistContainer;
    this.#card = card;
    this.#deleteCommentHandler = deleteCommentHandler;

  }

  init = (comment) => {
    this.#comment = comment;
    this.#filmCommentComponent = new FilmCommentView(comment);
    render(this.#filmCommentComponent, this.#commentList);
    this.#filmCommentComponent.setDeleteClickHandler(this.#deleteCommentButton);
  };

  #deleteCommentButton = () => {
    this.#deleteCommentHandler(UpdateType.MINOR, this.#comment);
  };
}
