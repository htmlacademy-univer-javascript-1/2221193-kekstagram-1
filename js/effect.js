const RADIX = 10;
const MAX_EFFECT = 100;
const MAX_BLUR = 3;
const MAX_HEAT = 3;
const EFFECT_STEP = 0.01;

const SLIDER = {
  MIN: 0,
  MAX: MAX_EFFECT,
  STEP: 1,
};

const form = document.querySelector('.img-upload__form');
const effectsList = form.querySelector('.effects__list');
const preview = form.querySelector('.img-upload__preview');
const img = preview.querySelector('img');
const effectLevel = form.querySelector('.img-upload__effect-level');
const effectLevelValue = form.querySelector('.effect-level__value');
const slider = form.querySelector('.effect-level__slider');
const defaultImgClass = img.classList[0];

let currentEffect = '';

noUiSlider.create(slider,{
  range:{
    min: SLIDER.MIN,
    max: SLIDER.MAX,
  },
  start: SLIDER.MAX,
  step: SLIDER.STEP,
  connect: 'lower',
});

const getEffectStep = (maxValue) => maxValue * EFFECT_STEP;

const effects = {
  none: () => {
    effectLevel.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    effectLevel.classList.remove('visually-hidden');
    return `grayscale(${parseInt(effectLevelValue.value, RADIX)* getEffectStep(1)})`;
  },
  sepia: () => {
    effectLevel.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectLevelValue.value, RADIX)* getEffectStep(1)})`;
  },
  marvin: () => {
    effectLevel.classList.remove('visually-hidden');
    return `invert(${parseInt(effectLevelValue.value, RADIX)* getEffectStep(MAX_EFFECT)}%) `;
  },
  phobos: () => {
    effectLevel.classList.remove('visually-hidden');
    return `blur(${parseInt(effectLevelValue.value, RADIX)* getEffectStep(MAX_BLUR)}px)`;
  },
  heat: () => {
    effectLevel.classList.remove('visually-hidden');
    const minEffect = SLIDER.MAX / (MAX_HEAT - 1);
    return `brightness(${(minEffect + parseInt(effectLevelValue.value, RADIX))* getEffectStep(MAX_HEAT - 1)})`;
  },
};

const setDefaultEffect = () => {
  effectLevel.classList.add('visually-hidden');

  img.className = defaultImgClass;
  img.style.filter = effects.none;
};

const setEffect = (effect) => {
  img.style.filter = effects[effect.replace('effects__preview--','')]();
};

const onEffectsListCLick = (evt) => {
  let target = evt.target;
  if(target.classList.contains('effects__label')){
    target = evt.target.querySelector('span');
  }

  if(target.classList.contains('effects__preview')){
    if(currentEffect !== ''){
      img.classList.remove(currentEffect);
    }
    slider.noUiSlider.set(SLIDER.MAX);
    effectLevelValue.value = SLIDER.MAX;
    currentEffect = target.classList[1];
    img.classList.add(currentEffect);
    setEffect(currentEffect);
  }
};

const onSliderChange = () => {
  effectLevelValue.value = slider.noUiSlider.get();
  setEffect(currentEffect);
};

slider.noUiSlider.on('change', onSliderChange);
effectsList.addEventListener('click', onEffectsListCLick);
export{setDefaultEffect};
