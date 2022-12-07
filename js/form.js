import { isEscape } from './util';
import { onFormInp, resetForm } from './validation-form';


const form = document.querySelector('.img-upload__form');
const comment = document.querySelector('.text__description');
const overlay = document.querySelector('.img-upload__overlay');
const hashtags = document.querySelector('.text__hashtags');
const uploadFileButton = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');

const onCloseClick = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  comment.value = '';
  uploadFileButton.value = '';
  hashtags.value = '';

  resetForm();
  form.removeEventListener('submit', onFormInp);
  cancelButton.removeEventListener('click', onCloseClick);
};

const isNotTarget = (evt) => !evt.target.classList.contains('text++hashtags') && !evt.target.classList.contains('text__description');

const onDocumentEscKeyDown = (evt) => {
  if(isNotTarget(evt) && isEscape(evt)) {
    onCloseClick();
    document.removeEventListener('keydown',onDocumentEscKeyDown);
  }
};

const onFile = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButton.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
  form.addEventListener('submit',onFormInp);
};

uploadFileButton.addEventListener('input',onFile);
