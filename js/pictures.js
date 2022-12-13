import { openBigPicture } from './big-picture.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderPhoto = (picture) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src = picture.url;
  element.querySelector('.picture__likes').textContent = picture.likes;
  element.querySelector('.picture__comments').textContent = picture.comments.length;

  element.addEventListener('click', (evt) => {
    evt.preventDefault();

    openBigPicture(picture);
  });

  return element;
};

const renderPhotos = (pictures) => {
  pictures.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  document.querySelector('.pictures').appendChild(fragment);
};

const clearPhotos = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

export {renderPhotos, clearPhotos};
