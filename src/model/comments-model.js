import Observable from '../framework/observable.js';
import {EventValues} from '../const.js';


export default class CommentsModel extends Observable{
  #comments = [];
  #apiService = null;
  #cardsModel = null;

  constructor(apiService, cardsModel){
    super();
    this.#apiService = apiService;
    this.#cardsModel = cardsModel;
  }

  get comments() {
    return [...this.#comments];
  }

  init = async (card) => {
    try {
      this.#comments = await this.#apiService.get(card);
    } catch(err) {
      this.#comments = [];
    }

    this._notify();
    this.#comments = [];
  };

  add = async (card, createdComment) => {
    try{
      const response = await this.#apiService.add(card,createdComment);
      this.#comments = response.comments;

    }catch{
      throw new Error('Can\'t add comment');
    }

    this._notify(EventValues.SUCCES);
    this.#comments = [];
  };

  delete = async (comment) => {
    try {
      await this.#apiService.deleteComment(comment);

    } catch (err) {
      throw new Error('Cant delete comment');
    }

    this._notify(EventValues.SUCCES);
    this.#comments = [];
  };
}
