import AbstractView from '../framework/view/abstract-view.js';
import he from 'he';

const CommentValues = {
  'emoji-smile': 'images/emoji/smile.png',
  'emoji-sleeping': 'images/emoji/sleeping.png',
  'emoji-puke': 'images/emoji/puke.png',
  'emoji-angry': 'images/emoji/angry.png',
};
const CommentEmotion = ['smile', 'sleeping', 'puke', 'angry'];

let currentText = '';
let currentEmoji = 'images/emoji/smile.png';
let commentEmotion = CommentEmotion[1];

const createCommentFormTemplate = () => (
  `<form class="film-details__new-comment" action="" method="get">
     <div class="film-details__add-emoji-label">
       <img src="${currentEmoji}" width="55" height="55" alt="emoji-smile">
     </div>

     <label class="film-details__comment-label">
       <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(currentText)}</textarea>
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

    this.setInnerHandlers();
  }

  get template() {
    return createCommentFormTemplate();
  }

  _restoreHandlers = () => {
    this.setInnerHandlers();
  };

  setInnerHandlers = () => {

    const emojiButtons = this.element.querySelectorAll('.film-details__emoji-item');

    emojiButtons.forEach((b) => {b.addEventListener('click',
      (evt) => {
        let currentId = '';
        currentId = evt.target.id;

        currentEmoji = CommentValues[currentId];

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
    currentText = evt.target.value;
  };

  #rerenderElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  };

  getNewComment = () => {
    if(currentEmoji === CommentValues['emoji-smile']){
      commentEmotion = CommentEmotion[0];
    }
    if(currentEmoji === CommentValues['emoji-sleeping']){
      commentEmotion = CommentEmotion[1];
    }
    if(currentEmoji === CommentValues['emoji-puke']){
      commentEmotion = CommentEmotion[2];
    }
    if(currentEmoji === CommentValues['emoji-angry']){
      commentEmotion = CommentEmotion[3];
    }

    return {
      'comment': currentText,
      'emotion': commentEmotion
    };
  };

  setBasicValues = () => {
    currentText = 'Great movie!';
    currentEmoji = 'images/emoji/smile.png';
    commentEmotion = CommentEmotion[1];
  };
}
