import AbstractView from '../framework/view/abstract-view.js';

let type = 'Delete';

const createFilmDetailsCommentTemplate = (comment) => (
  `<li class="film-details__comment">
   <span class="film-details__comment-emoji">
     <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
   </span>
   <div>
     <p class="film-details__comment-text">${comment.comment}</p>
     <p class="film-details__comment-info">
       <span class="film-details__comment-author">${comment.author}</span>
       <span class="film-details__comment-day">${comment.date}</span>
       <button class="film-details__comment-delete">${type}</button>
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

  onDeleteButtonClick = () => {

    this.element.querySelector('.film-details__comment-delete').addEventListener('click', () => {
      type = 'Deleting...';
      this.rerenderElement();
    });
  };

  rerenderElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback();
  };

  setDeleteClickHandler = (callback) => {
    this._callback = callback;
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#deleteClickHandler);
  };
}
