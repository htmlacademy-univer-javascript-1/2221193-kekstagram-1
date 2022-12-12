import { isEscape } from './util.js';
import { onFormInp as onFormSubmit, resetForm } from './validation-form.js';
import { setDefaultScale } from './scale.js';
import { setDefaultEffect } from './effect.js';

const form = document.querySelector('.img-upload__form');
const closingButton = form.querySelector('#upload-cancel');
const uploadingField = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadingField.value = '';
  form.querySelector('.text__hashtags').value = '';
  form.querySelector('.text__description').value = '';
  resetForm();
  form.removeEventListener('submit', onFormSubmit);
};

const onCloseClick = () => {
  closeForm();
  closingButton.removeEventListener('click', onCloseClick);
};

const onClosingButtonClick = () => onCloseClick();

const isNotTarget = (evt) =>  !evt.target.classList.contains('text__descriptions') && !evt.target.classList.contains('text__hashtags');

const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt) && isNotTarget(evt)) {
    onCloseClick();
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  }
};

const onUploadingFieldInput = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closingButton.addEventListener('click',onClosingButtonClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
  form.addEventListener('submit', onFormSubmit);

  setDefaultScale();
  setDefaultEffect();
};

uploadingField.addEventListener('input',onUploadingFieldInput);
export{closeForm, onDocumentEscKeyDown};
