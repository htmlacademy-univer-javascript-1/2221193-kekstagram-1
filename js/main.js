import {renderPhotos} from'./pictures.js';
import {sendRequest} from './fetch.js';
import './form.js';
import './picture-upload.js';
import './big-picture.js';
import './form-validation.js';
import './effects.js';
import './filters.js';
import './scale.js';

let photos = [];

const onSuccess = (value) => {
  photos = value.slice();
  renderPhotos(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onFail = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.textAlign = 'center';
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.padding = '10px 5px';
  messageAlert.textContent = 'Ошибка загрузки данных';
  document.body.append(messageAlert);
};

const getData = () => photos;

sendRequest(onSuccess, onFail, 'GET');

export {getData};
