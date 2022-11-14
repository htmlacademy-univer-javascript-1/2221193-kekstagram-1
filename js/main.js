const getRandomInt = (min, max) => {
  if (max < min || min < 0 || max === min)
  {
    return "Неправильно задан диапазон";
  }
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const checkLength = (str,max) => {
  return str.length <= max;
}

const objectsArray = [];

const NAMES = [
  'Максим',
  'Илья',
  'Артур',
  'Никита',
  'Ира',
  'Катя',
  'Николай'
]

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

const DESCRIPTIONS = [
  'Прекрасный снимок',
  'Прекрасное воспоминание',
  'Незабываемый опыт',
  'Фотография'
]

const OBJECTS_COUNT = 25;

const getRandomElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
}

const addComments = (count) => {
  let comments = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: i,
      avatar:  `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES)
    });
  }
  return comments;
}

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
}
addPhoto();
