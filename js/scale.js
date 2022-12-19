const RADIX = 10;

const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const overlay = document.querySelector('.img-upload__overlay');
const img = overlay.querySelector('.img-upload__preview').querySelector('img');
const scaleControl = overlay.querySelector('.img-upload__scale');
const scaleField = scaleControl.querySelector('.scale__control--value');

const setDefaultScale = () => {
  scaleField.value = `${Scale.MAX}%`;
  img.style = `transform: scale(${1})`;
};

const setCorrectValue = (value) => {
  if(Scale.MIN > value){
    return Scale.MIN;
  }

  if(Scale.MAX < value)
  {
    return Scale.MAX;
  }

  return value;
};

const onScaleControlClick = (evt) => {
  const target = evt.target;

  if(target.tagName === 'BUTTON'){
    let value = scaleField.value;
    value = scaleField.value.substr(0,value.length - 1);

    const scaleCoefficient = target.classList.contains('scale__control--smaller') ? -1 : 1;

    value = parseInt(value,RADIX) + Scale.STEP * scaleCoefficient;
    value = setCorrectValue(value);

    img.style = `transform: scale(${value / Scale.MAX})`;
    scaleField.value = `${value}%`;
  }
};

scaleControl.addEventListener('click', onScaleControlClick);

export {setDefaultScale};
