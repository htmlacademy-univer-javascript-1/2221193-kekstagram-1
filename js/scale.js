const RADIX = 10;
const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const imgOverlay = document.querySelector('.img-upload__overlay');
const img = imgOverlay.querySelector('.img-upload__preview').querySelector('img');
const controlScale = imgOverlay.querySelector('.img-upload__scale');
const scaleField = controlScale.querySelector('.scale__control--value');

const setDefaultScale = () => {
  scaleField.value = `${Scale.MAX}%`;
  img.style = `transform: scale(${1})`;
};

const setCorrectValue = (scale) => {
  if(Scale.MIN > scale){
    return Scale.MIN;
  }

  if(Scale.MAX < scale){
    return Scale.MAX;
  }

  return scale;
};

const onScaleControlClick = (evt) => {
  const target = evt.target;
  if(target.tagName === 'BUTTON'){
    let scaleValue = scaleField.value;
    const coefficient = target.classList.contains('scale__control--smaller') ? -1 : 1;
    scaleValue = scaleField.value.substr(0,scaleValue.length - 1);
    scaleValue = parseInt(scaleValue,RADIX) + coefficient * Scale.STEP;
    scaleValue = setCorrectValue(scaleValue);
    img.style = `transform: scale(${scaleValue / Scale.MAX})`;
    scaleField.value = `${scaleValue}%`;
  }
};

controlScale.addEventListener('click',onScaleControlClick);
export{setDefaultScale};
