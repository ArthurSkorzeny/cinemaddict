import {render, replace} from '../framework/render.js';
import FilmCommentView from '../view/popup-comment-view.js';
import {CommentDeleteStatus, EventValues} from '../const.js';

export default class CommentPresenter {
  #commentList = null;
  #card = null;
  #comment = null;
  #filmCommentComponent = null;
  #commentsModel = null;
  #commentEvent = null;

  constructor({commentlistContainer, card, commentsModel, commentEvent}){

    this.#commentList = commentlistContainer;
    this.#card = card;
    this.#commentsModel = commentsModel;
    this.#commentEvent = commentEvent;

  }

  init = (comment, deleteButtonStatus) => {
    this.#comment = comment;
    const prevCommentComponent = this.#filmCommentComponent;
    this.#filmCommentComponent = new FilmCommentView(comment, deleteButtonStatus);

    if(prevCommentComponent === null){
      render(this.#filmCommentComponent, this.#commentList);
      this.#filmCommentComponent.setDeleteClickHandler(this.#deleteCommentButton);
    } else {
      replace(this.#filmCommentComponent, prevCommentComponent);
      this.#filmCommentComponent.setDeleteClickHandler(this.#deleteCommentButton);
    }
  };

  #deleteCommentButton = () => {
    this.#handleDeleteComment(this.#comment);
  };

  #handleDeleteComment = (comment) => {
    document.querySelectorAll('button').forEach((button) => {button.disabled = true;});
    this.#commentsModel.addObserver(this.#onFailResult);
    this.#commentsModel.delete(comment);
    this.init(this.#comment, CommentDeleteStatus.DELETING);
  };

  #onFailResult = (result) => {
    if(result === EventValues.FAIL){
      document.querySelectorAll('button').forEach((button) => {button.disabled = false;});
      this.init(this.#comment, CommentDeleteStatus.DELETE);
      this.#filmCommentComponent.shake();
      this.#commentsModel.removeObserver(this.#onFailResult);
    }else{
      this.#commentEvent(result);
    }

  };
}
