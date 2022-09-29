import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsCommentTemplate = (comment) => (
  `<li class="film-details__comment">
   <span class="film-details__comment-emoji">
     <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
   </span>
   <div>
     <p class="film-details__comment-text">${comment.comment}</p>
     <p class="film-details__comment-info">
       <span class="film-details__comment-author">${comment.author}</span>
       <span class="film-details__comment-day">${comment.date}/12/31 23:59</span>
       <button class="film-details__comment-delete">Delete</button>
     </p>
   </div>
   </li>`
);


export default class FilmCommentView extends AbstractView{
  #comment = null;

  constructor(comment){
    super();
    this.#comment = comment;
  }

  get template() {
    return createFilmDetailsCommentTemplate(this.#comment);
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
