import {generateRandomPart, getRandomInteger, getRandomNumber, getRuntimeFromMinutes} from '../utils/common';
import {nanoid} from 'nanoid';

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

const directors = [
  'James Cameron',
  'Christopher Nolan',
  'Martin Scorsese',
  'Steven Spielberg',
  'Ridley Scott',
  'Stanley Kubrick',
  'Luc Besson',
];

const writers = [
  'Woody Allen',
  'Billy Wilder',
  'William Goldman',
  'Ben Hecht',
  'Ridley Scott',
  'Robert Towne',
  'Joel Coen',
];

const actors = [
  'Marlon Brando',
  'Christian Bale',
  'Morgan Freeman',
  'Heath Ledger',
  'Liam Neeson',
  'Jason Statham',
  'Vin Diesel',
];

const countries = [
  'USA',
  'Germany',
  'Canada',
  'France',
  'Italia',
  'South Korea',
  'Russia',
];

const ageRating = [
  '8+',
  '12+',
  '14+',
  '16+',
  '18+',
];

export const generateFilmCard = () => ({
  'id': nanoid(),
  'comments': [1, 2, 3],
  'filmInfo': {
    'title': generateRandomPart(titles),
    'alternativeTitle': generateRandomPart(titles),
    'totalRating': getRandomNumber(4, 10, 1),
    'poster': `./images/posters/${generateRandomPart(posters)}`,
    'ageRating': generateRandomPart(ageRating),
    'director': generateRandomPart(directors),
    'writers': [
      generateRandomPart(writers)
    ],
    'actors': [
      generateRandomPart(actors)
    ],
    'release': {
      'date': `${getRandomInteger(1954, 2022)}-05-11T00:00:00.000Z`,
      'releaseCountry': generateRandomPart(countries)
    },
    'runtime': getRuntimeFromMinutes(getRandomInteger(44,175)),
    'genre': [
      generateRandomPart(genres)
    ],
    'description': generateRandomPart(descriptions)
  },
  'userDetails': {
    'watchlist': Boolean(getRandomInteger(0,4)),
    'alreadyWatched': Boolean(getRandomInteger(0,4)),
    'watchingDate': `${getRandomInteger(2019, 2022)}-04-12T16:12:32.554Z`,
    'favorite': Boolean(getRandomInteger(0,4))
  }
});
