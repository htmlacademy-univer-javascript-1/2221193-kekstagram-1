import { objectsArray } from "./data";

const picturesBlock = document.querySelector('.pictures');
const pictureTemp = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const renderPicture = (picture) => {
  const element = pictureTemp.cloneNode(true);
  element.src = photo.url;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;

  return element;
}

const renderPictures = () => {
  objectsArray.forEach((picture) => {
    fragment.appendChild(renderPicture(picture));
  });
  picturesBlock.appendChild(fragment);
}

renderPictures();
