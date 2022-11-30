import { getRandomInt } from "./get-random-number.js";

const getRandomElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

export{getRandomElement}
