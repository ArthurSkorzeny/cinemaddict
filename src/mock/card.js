import {generateRandomPart, getRandomInteger, getRandomNumber} from '../utils.js';

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const titles = [
  'A Little Pony Without The Carpet',
  'Made for Each Other',
  'Sagebrush Trail',
  'The Great Flamarion',
  'Santa Claus Conquers the Martians',
  'The Dance of Life',
  'The Man with the Golden Arm',
];

const genres = [
  'Action',
  'Comedy',
  'Adventure',
  'Drama',
  'Animated',
  'Horror',
  'Fantasy',
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
];


export const generateFilmCard = () => ({
  'id': getRandomInteger(1, 100),
  'comments': Array.from({length: getRandomInteger(2, 45)}, () => Math.floor(Math.random() * getRandomInteger(2, 45))),
  'filmInfo': {
    'title': generateRandomPart(titles),
    'alternativeTitle': 'Laziness Who Sold Themselves',
    'totalRating': getRandomNumber(4, 10, 1),
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
      'date': `${getRandomInteger(1954, 2022)}-05-11T00:00:00.000Z`,
      'releaseCountry': 'Finland'
    },
    'runtime': getRandomInteger(60,134),
    'genre': [
      generateRandomPart(genres)
    ],
    'description': generateRandomPart(descriptions)
  },
  'userDetails': {
    'watchlist': Boolean(getRandomInteger(0, 1)),
    'alreadyWatched': Boolean(getRandomInteger(0, 1)),
    'watchingDate': '2019-04-12T16:12:32.554Z',
    'favorite': Boolean(getRandomInteger(0, 1))
  }
});
