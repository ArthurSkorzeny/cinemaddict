import {generateRandomPart} from '../utils.js';

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

export const generateFilmCard = () => ({
  'id': '1',
  'comments': [1, 2, 3],
  'filmInfo': {
    'title': 'A Little Pony Without The Carpet',
    'alternativeTitle': 'Laziness Who Sold Themselves',
    'totalRating': 5.3,
    'poster': `./images/posters/${generateRandomPart(posters)}`,
    'ageRating': 0,
    'director': 'Tom Ford',
    'writers': [
      'Takeshi Kitano'
    ],
    'actors': [
      'Morgan Freeman'
    ],
    'release': {
      'date': '2019-05-11T00:00:00.000Z',
      'releaseCountry': 'Finland'
    },
    'runtime': 77,
    'genre': [
      'Comedy'
    ],
    'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
  },
  'userDetails': {
    'watchlist': false,
    'alreadyWatched': true,
    'watchingDate': '2019-04-12T16:12:32.554Z',
    'favorite': false
  }
});
