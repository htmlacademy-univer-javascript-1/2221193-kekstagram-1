import { openBigPicture} from './big-picture.js';

const pictureTemp = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const renderPicture = (picture) => {
  const element = pictureTemp.cloneNode(true);
  element.querySelector('.picture__img').src = picture.url;
  element.querySelector('.picture__likes').textContent = picture.likes;
  element.querySelector('.picture__comments').textContent = picture.comments.length;
  element.addEventListener('click',(evt) => {
    evt.preventDefault();

    openBigPicture(picture);
  });
  return element;
};

const renderPictures = (photos) => {
  photos.forEach((picture) => {
    fragment.appendChild(renderPicture(picture));
  });
  document.querySelector('.pictures').appendChild(fragment);
};
const clearPhotos = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

export {renderPictures,clearPhotos};
