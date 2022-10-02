/* eslint-disable no-console */
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';


export default class CardsModel extends Observable{
  #cardsApiService = null;
  #cards = [];

  constructor(cardsApiService) {
    super();
    this.#cardsApiService = cardsApiService;
  }

  get cards() {
    return this.#cards;
  }

  init = async () => {
    try {
      const cards = await this.#cardsApiService.cards;
      this.#cards = cards.map(this.#adaptToClient);
      console.log(this.#cards);
    } catch(err) {
      this.#cards = [];
    }

    this._notify(UpdateType.INIT);
  };

  updateCard = async (updateType, update) => {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    try {
      const response = await this.#cardsApiService.updateCard(update);
      const updatedCard = this.#adaptToClient(response);
      this.#cards = [
        ...this.#cards.slice(0, index),
        updatedCard,
        ...this.#cards.slice(index + 1),
      ];
      this._notify(updateType, updatedCard);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  };

  #adaptToClient = (card) => {
    const adaptedCard = {...card,
      filmInfo: {
        ...card['film_info'],
        alternativeTitle: card['film_info']['alternative_title'],
        totalRating: card['film_info']['total_rating'],
        ageRating: card['film_info']['age_rating'],
        release:{
          ...card['film_info'].release,
          releaseCountry: card['film_info'].release['release_country']
        }
      },
      userDetails: {
        ...card['user_details'],
        alreadyWatched: card['user_details']['already_watched'] ,
        watchingDate: card['user_details']['watching_date'] ,
      }

    };

    delete adaptedCard['film_info'];
    delete adaptedCard['user_details'];

    delete adaptedCard.filmInfo['alternative_title'];
    delete adaptedCard.filmInfo['total_rating'];
    delete adaptedCard.filmInfo['age_rating'];
    delete adaptedCard.filmInfo.release['release_country'];

    delete adaptedCard.userDetails['already_watched'];
    delete adaptedCard.userDetails['watching_date'];

    return adaptedCard;

  };
}
