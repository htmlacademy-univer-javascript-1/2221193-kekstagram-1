import { sendData } from './form-sending.js';

const MaxValues = {
  COMMENT_SYMBOLS: 140,
  HASHTAG_SYMBOLS: 20,
  HASHTAGS: 5,
};

const form = document.querySelector('.img-upload__form');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text',
});

let errorMessage = '';

const error = () => errorMessage;

const validateHashtag = (value) => {
  const text = value.toLowerCase().trim();

  if(!text){
    return true;
  }

  const inputArray = text.split(/\s+/);

  if(inputArray.length === 0){
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => (item[0] === '#' && item.length === 1)),
      error: 'Хеш-тег не может состоять только из одной решётки',
    },
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MaxValues.HASHTAG_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${MaxValues.HASHTAG_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MaxValues.HASHTAGS,
      error: `Нельзя указать больше ${MaxValues.HASHTAGS} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    }
  ];

  return rules.every((rule) => {
    const isWrong = rule.check;
    if (isWrong){
      errorMessage = rule.error;
    }
    return !isWrong;
  });
};

const validateComment = (value) => value.length <= MaxValues.COMMENT_SYMBOLS;

const onFormInput = (evt) => {
  evt.preventDefault();

  if(pristine.validate()){
    sendData();
  }
};

const resetForm = () => {
  pristine.reset();
};

pristine.addValidator(hashtag, validateHashtag, error);

pristine.addValidator(description, validateComment,
  `Длина комментария должна быть не более ${MaxValues.COMMENT_SYMBOLS} символов`,
);

export {onFormInput, resetForm};
