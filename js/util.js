import { getRandomInt } from './get-random-number';

const DELAY = 500;
const isEscape = (evt) => evt.key === 'Escape';

const getRandomElement = (array, count) => {
  const randomArray = [];
  const elements = [];

  for(let i = 0; i < array.length; i++) {
    const number = getRandomInt(0,array.length - 1);

    if(elements.indexOf(number) === -1){
      randomArray.push(array[number]);
      elements.push(number);
    }
    if( count === randomArray.length){
      break;
    }
  }
  return randomArray;
};
const debounce = (callback) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), DELAY);
  };
};

export{isEscape, getRandomElement,debounce};
