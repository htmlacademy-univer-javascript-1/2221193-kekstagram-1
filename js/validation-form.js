const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
let errorMessage = '';

const inputComment = document.querySelector('.text__description');
const inputHashtag = document.querySelector('.text__hashtags');
const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text',
});

const error = () => errorMessage;

const validateHash = (value) => {
  const text = value.toLowerCase().trim();

  if(!text) {
    return true;
  }

  const inputArray = text.split(/\s+/);

  if (inputArray.length === 0) {
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
      check: inputArray.some((item) => item.length > MAX_HASHTAG_LENGTH),
      error: `Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`,
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
  });
};

const confirmedComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const onFormInp = (evt) => {
  if(!pristine.validate()){
    evt.preventDefault();
  }
};

const resetForm = () => {
  pristine.reset();
};

pristine.addValidator(inputHashtag, validateHash, error);
pristine.addValidator(inputComment,confirmedComment, `Длина комментария должна быть не более ${MAX_COMMENT_LENGTH } символов`,);

export{onFormInp,resetForm};
