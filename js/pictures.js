import { objectsArray } from './data';
import { openBigPicture} from './big-picture.js';


const picturesBlock = document.querySelector('.pictures');
const pictureTemp = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const renderPicture = (picture) => {
  const element = pictureTemp.cloneNode(true);
  element.src = picture.url;
  element.querySelector('.picture__likes').textContent = picture.likes;
  element.querySelector('.picture__comments').textContent = picture.comments.length;
  element.addEventListener('click',(evt) => {
    evt.preventDefault();

    openBigPicture(picture);
  });
  return element;
};

const renderPictures = () => {
  objectsArray.forEach((picture) => {
    fragment.appendChild(renderPicture(picture));
  });
  picturesBlock.appendChild(fragment);
};

renderPictures();
