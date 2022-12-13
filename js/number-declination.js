const declineNumber = (number, nominative, genitiveSingular, genitivePlural) => {
  const hundredths = number%100;
  if(hundredths  <= 4 || hundredths  > 20){
    const tenths = number%10;
    if(tenths === 1){
      return nominative;
    }
    if(tenths >= 2 && tenths <= 4){
      return genitiveSingular;
    }
  }
  return genitivePlural;
};

export {declineNumber};
