import {generateFilmCard} from '../mock/card.js';
const START_FILMS_ON_PAGE = 12;

export default class CardsModel {
  #cards = Array.from({length: START_FILMS_ON_PAGE}, generateFilmCard);

  get cards() {
    return this.#cards;
  }
}
