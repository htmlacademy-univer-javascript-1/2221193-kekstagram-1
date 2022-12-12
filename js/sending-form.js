import {sendRequest} from './fetch.js';
import { closeForm } from './form.js';
import { isEscape } from './util.js';
import { onDocumentEscKeyDown } from './form.js';

const MESSAGE_Z_INDEX = 100;

const form = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let message;

const closeMessage = () => {
  message.classList.add('hidden');
};

const onErrorEscapeKeyDown = (evt) => {
  if(isEscape(evt)) {
    closeMessage();
    document.addEventListener('keydown', onDocumentEscKeyDown);
    document.removeEventListener('keydown', onErrorEscapeKeyDown);
  }
};

const showMessage = (isSuccessful) => {
  if (isSuccessful){
    message = successTemplate.cloneNode(true);
  }
  else {
    message = errorTemplate.cloneNode(true);
    document.removeEventListener('keydown', onDocumentEscKeyDown);
    document.addEventListener('keydown', onErrorEscapeKeyDown);
  }

  message.style.zIndex = MESSAGE_Z_INDEX;
  message.classList.remove('hidden');

  document.body.appendChild(message);
};

const closeSendingForm = () => {
  closeMessage();
  closeForm();
};

const onSuccessButtonClicked = () => closeSendingForm();

const onErrorButtonClicked = () => closeMessage();

const onSuccess = () => {
  showMessage(true);
  message.addEventListener('click', onSuccessButtonClicked);
};

const onFail = () => {
  showMessage(false);
  message.addEventListener('click', onErrorButtonClicked);
};

const onFormEscKeyDown = (evt) => {
  if(isEscape(evt)){
    closeMessage();

    if (message.classList.contains('success')){
      closeForm();
    }

    form.removeEventListener('keydown', onFormEscKeyDown);
  }
};

const sendData = () => sendRequest(onSuccess, onFail, 'POST', new FormData(form));

form.addEventListener('keydown', onFormEscKeyDown);

export {sendData};
