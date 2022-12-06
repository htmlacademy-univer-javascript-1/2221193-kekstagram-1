import { getRandomInt } from "./get-random-number.js";
import { getRandomElement } from "./util.js";

const OBJECTS_COUNT = 25;

const NAMES = [
  'Максим',
  'Илья',
  'Артур',
  'Никита',
  'Ира',
  'Катя',
  'Николай'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Прекрасный снимок',
  'Прекрасное воспоминание',
  'Незабываемый опыт',
  'Фотография'
];

const objectsArray = [];

const addComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: i,
      avatar:  `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES)
    });
  }
  return comments;
};

const addPhoto = () => {
  for (let i = 0; i < OBJECTS_COUNT; i++){
    objectsArray.push({
      id: i + 1,
      url:`photos/${i + 1}.jpg`,
      descriptions: getRandomElement(DESCRIPTIONS),
      likes: getRandomInt(15,200),
      comments: addComments(getRandomInt(1,3))
    });
  }
};

export{addPhoto}
<<<<<<< HEAD
export{objectsArray}
=======
>>>>>>> 24a3beabe95b32763b597464992ec3f450a10e68
