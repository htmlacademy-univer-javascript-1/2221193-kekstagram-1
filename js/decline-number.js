const declineNum = (num, nominative, genitiveSing, genitivePlural) => {
  const hundreds = num%100;
  if (hundreds <= 4 || hundreds > 20){
    const tenths = num %10;
    if (tenths === 1){
      return nominative;
    }
    if(tenths <=4 && tenths>=2){
      return genitiveSing;
    }
  }
  return genitivePlural;
};

export{declineNum};
