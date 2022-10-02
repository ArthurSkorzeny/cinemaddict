import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class CardsApiService extends ApiService {
  get cards() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateCard = async (card) => {
    const response = await this._load({
      url: `movies/${card.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(card)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (card) => {
    const adaptedCard = {
      ...card,
      ['film_info']: {
        ...card.filmInfo,
        ['alternative_title']: card.filmInfo.alternativeTitle,
        ['total_rating']: card.filmInfo.totalRating,
        ['age_rating']: card.filmInfo.ageRating,
        release:{
          ...card.filmInfo.release,
          ['release_country']: card.filmInfo.release.releaseCountry
        }
      },
      ['user_details']: {
        ...card.userDetails,
        ['already_watched']: card.userDetails.alreadyWatched ,
        ['watching_date']: card.userDetails.watchingDate ,
      }
    };

    delete adaptedCard.filmInfo;
    delete adaptedCard.userDetails;

    delete adaptedCard.filmInfo.alternativeTitle;
    delete adaptedCard.filmInfo.totalRating;
    delete adaptedCard.filmInfo.ageRating;
    delete adaptedCard.filmInfo.release.releaseCountry;

    delete adaptedCard.userDetails.alreadyWatched;
    delete adaptedCard.userDetails.watchingDate;

    return adaptedCard;
  };
}
