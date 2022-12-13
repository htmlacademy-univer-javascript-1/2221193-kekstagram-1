import {sendRequest} from './fetch.js';
import { onDocumentEscKeyDown } from './form.js';
import { isEscape } from './util.js';
import { closeForm } from './form.js';

const MESSAGE_Z_INDEX = 100;

const form = document.querySelector('.img-upload__form');
const error = document.querySelector('#error').content.querySelector('.error');
const success = document.querySelector('#success').content.querySelector('.success');

let message;

const messageClose = () => {
  message.classList.add('hidden');
};

const onErrorEscapeKeyDown = (evt) => {
  if(isEscape(evt)) {
    messageClose();
    document.addEventListener('keydown', onDocumentEscKeyDown);
    document.removeEventListener('keydown', onErrorEscapeKeyDown);
  }
};

const showMessage = (isSuccessful) => {
  if (isSuccessful){
    message = success.cloneNode(true);
  }
  else {
    message = error.cloneNode(true);
    document.removeEventListener('keydown', onDocumentEscKeyDown);
    document.addEventListener('keydown', onErrorEscapeKeyDown);
  }

  message.style.zIndex = MESSAGE_Z_INDEX;
  message.classList.remove('hidden');

  document.body.appendChild(message);
};

const closeSendingForm = () => {
  messageClose();
  closeForm();
};

const onSuccessButtonClick = () => closeSendingForm();

const onErrorButtonClick = () => messageClose();

const onSuccess = () => {
  showMessage(true);
  message.addEventListener('click', onSuccessButtonClick);
};

const onFail = () => {
  showMessage(false);
  message.addEventListener('click', onErrorButtonClick);
};

const onFormEscKeyDown = (evt) => {
  if(isEscape(evt)){
    if(message){
      messageClose();
    }

    if (message.classList.contains('success')){
      closeForm();
    }

    form.removeEventListener('keydown', onFormEscKeyDown);
  }
};

const sendData = () => sendRequest(onSuccess, onFail, 'POST', new FormData(form));

form.addEventListener('keydown', onFormEscKeyDown);

export {sendData};
