const getRandomNumber = (min, max) => {
  if(min < 0 || max < 0){
    return -1;
  }
  min = Math.min(min,max);
  max = Math.max(min, max);
  return Math.round(Math.random()* (max - min) + min);
};

export{getRandomNumber};
