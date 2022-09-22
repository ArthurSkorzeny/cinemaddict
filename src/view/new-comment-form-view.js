import AbstractView from '../framework/view/abstract-view.js';

const COMMENT_VALUES = {
  'emoji-smile': 'images/emoji/smile.png',
  'emoji-sleeping': 'images/emoji/sleeping.png',
  'emoji-puke': 'images/emoji/puke.png',
  'emoji-angry': 'images/emoji/angry.png',
  currentEmoji: 'images/emoji/smile.png',
  currentText: 'Great movie!',
};

const createCommentFormTemplate = () => (
  `<form class="film-details__new-comment" action="" method="get">
     <div class="film-details__add-emoji-label">
       <img src="${COMMENT_VALUES.currentEmoji}" width="55" height="55" alt="emoji-smile">
     </div>

     <label class="film-details__comment-label">
       <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${COMMENT_VALUES.currentText}</textarea>
     </label>

     <div class="film-details__emoji-list">
       <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
       <label class="film-details__emoji-label" for="emoji-smile">
         <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
       </label>

       <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
       <label class="film-details__emoji-label" for="emoji-sleeping">
         <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
       </label>

       <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
       <label class="film-details__emoji-label" for="emoji-puke">
         <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
       </label>

       <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
       <label class="film-details__emoji-label" for="emoji-angry">
         <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
       </label>
    </div>
    </form>`);

export default class FilmDetailsNewCommentFormView extends AbstractView{

  constructor() {
    super();

    this.#setInnerHandlers();
  }

  get template() {
    return createCommentFormTemplate();
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  #setInnerHandlers = () => {

    const emojiButtons = this.element.querySelectorAll('.film-details__emoji-item');

    emojiButtons.forEach((b) => {b.addEventListener('click',
      (e) => {

        let currentId = '';
        currentId = e.target.id;

        if(currentId === Object.keys(COMMENT_VALUES)[1]){
          COMMENT_VALUES.currentEmoji = COMMENT_VALUES['emoji-sleeping'];
        }
        if(currentId === Object.keys(COMMENT_VALUES)[0]){
          COMMENT_VALUES.currentEmoji = COMMENT_VALUES['emoji-smile'];
        }
        if(currentId === Object.keys(COMMENT_VALUES)[2]){
          COMMENT_VALUES.currentEmoji = COMMENT_VALUES['emoji-puke'];
        }
        if(currentId === Object.keys(COMMENT_VALUES)[3]){
          COMMENT_VALUES.currentEmoji = COMMENT_VALUES['emoji-angry'];
        }

        this.#rerenderElement();

        emojiButtons.forEach((elem) => {elem.removeAttribute('checked', '');});
        document.getElementById(currentId).setAttribute('checked', '');

      });

    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);
    });
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    COMMENT_VALUES.currentText = evt.target.value;
  };

  #rerenderElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  };
}
