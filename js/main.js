import './scale.js';
import './effect.js';
import './validation-form.js';
import './form.js';
import './big-picture.js';
import { sendRequest } from './fetch.js';
import { renderPictures } from './pictures.js';

let pictures = [];

const onSuccess = (data) => {
  pictures = data.slice();
  renderPictures(pictures);
};

const onFail = () => {
  const message = document.createElement('div');
  message.style.left = 0;
  message.style.right = 0;
  message.style.top = 0;
  message.style.position = 'absolute';
  message.style.fontSize = '30px';
  message.style.textAlign = 'center';
  message.style.padding = '10px 5px';
  message.style.backgroundColor = 'red';
  message.textContent = 'Ошибка загрузки данных';
  document.body.append(message);
};
sendRequest(onSuccess,onFail,'GET');
