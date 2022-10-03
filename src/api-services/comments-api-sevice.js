import ApiService from '../framework/api-service.js';
import {Method} from '../const.js';

export default class CommentsApiService extends ApiService {

  get = (card) => this._load({url: `comments/${card.id}`})
    .then(ApiService.parseResponse)
    .catch(() => null);

  add = async (card, comment) => {
    const response = await this._load({
      url: `comments/${card.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}
