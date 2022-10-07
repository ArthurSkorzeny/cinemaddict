import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';


const createFilmDetailsCommentTemplate = (comment, buttonStatus) => (
  `<li class="film-details__comment">
   <span class="film-details__comment-emoji">
     <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
   </span>
   <div>
     <p class="film-details__comment-text">${comment.comment}</p>
     <p class="film-details__comment-info">
       <span class="film-details__comment-author">${comment.author}</span>
       <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/M/D h:mm')}</span>
       <button class="film-details__comment-delete">${buttonStatus}</button>
     </p>
   </div>
   </li>`
);


export default class FilmCommentView extends AbstractView{
  #comment = null;
  #buttonStatus = null;

  constructor(comment, buttonStatus){
    super();
    this.#comment = comment;
    this.#buttonStatus = buttonStatus;
  }

  get template() {
    return createFilmDetailsCommentTemplate(this.#comment, this.#buttonStatus);
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback();
  };

  setDeleteClickHandler = (callback) => {
    this._callback = callback;
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#deleteClickHandler);
  };
}
