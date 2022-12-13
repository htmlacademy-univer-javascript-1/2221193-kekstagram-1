import { getRandomNumber } from './random-number.js';

const DELAY = 500;

const isEscape = (evt) => evt.key === 'Escape';

const getRandomElements = (elements, count) => {
  const element = [];
  const randomElements = [];

  for(let i = 0; i < elements.length; i++){
    const number = getRandomNumber(0, elements.length - 1);

    if(element.indexOf(number) === -1){
      randomElements.push(elements[number]);
      element.push(number);
    }

    if(randomElements.length === count){
      break;
    }
  }
  return randomElements;
};

const debounce = (callback) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), DELAY);
  };
};

export {isEscape, getRandomElements, debounce};
