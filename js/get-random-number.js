const getRandomInt = (min, max) => {
  if (max < min || min < 0 || max === min)
  {
    return 'Неправильно задан диапазон';
  }
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export{getRandomInt}
