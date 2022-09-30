import {getRandomInteger, generateRandomPart} from '../utils/common';

const author = [
  'author1',
  'author2',
  'author3',
  'author4',
  'author5',
  'author6',
];

const comment = [
  'comment1',
  'comment2',
  'comment3',
  'comment4',
  'comment5',
  'comment6',
];

const emoji = [
  'smile',
  'puke',
  'angry',
  'sleeping',
];

export const generateComment = () => ({
  'id': getRandomInteger(1, 3),
  'author': `${generateRandomPart(author)}`,
  'comment': `${generateRandomPart(comment)}`,
  'date': `${getRandomInteger(2018, 2022)}`,
  'emotion': `${generateRandomPart(emoji)}`
});
