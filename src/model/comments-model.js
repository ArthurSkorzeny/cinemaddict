import Observable from '../framework/observable.js';

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

  add = async (updateType, card, createdComment) => {
    try{
      const response = await this.#apiService.add(card,createdComment);

      this.#comments = response.comments;

      this.#cardsModel.updateCard({
        updateType,
        update: response.movie,
        isAdapted: false
      });

    }catch{
      throw new Error('Can\'t add comment');
    }
  };
}
