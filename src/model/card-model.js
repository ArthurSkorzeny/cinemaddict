import Observable from '../framework/observable.js';
import {generateFilmCard} from '../mock/card.js';

const START_FILMS_ON_PAGE = 12;

export default class CardsModel extends Observable{
  #cards = Array.from({length: START_FILMS_ON_PAGE}, generateFilmCard);

  get cards() {
    return this.#cards;
  }

  updateCard = (updateType, update) => {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      update,
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
