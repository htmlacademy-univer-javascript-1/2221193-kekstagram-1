import { createComments } from './comments.js';
import { isEscape } from './util.js';

const COMMENTS_LIST = 5;

const bigPicture = document.querySelector('.big-picture');
const commentCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closingButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = bigPicture.querySelector('.social__comment');
const newComments = bigPicture.querySelector('.social__comments');
let index = COMMENTS_LIST;
let listOfComments = [];

const addComments = () => {
  newComments.innerHTML = '';
  index = (listOfComments.length < index) ? listOfComments.length: index;
  const selectComments = listOfComments.slice(0, index);

  if (listOfComments.length <= COMMENTS_LIST || index >= listOfComments.length){
    commentsLoader.classList.add('hidden');
  }
  else{
    commentsLoader.classList.remove('hidden');
  }

  commentCounter.textContent = `${index} из ${listOfComments.length} комментариев`;

  selectComments.forEach((value) =>{
    commentsLoader.appendChild(createComments(value,commentTemplate));
  });
};

const onCommentsLoadClick = () => {
  index += COMMENTS_LIST;
  addComments();
};

const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  listOfComments = [];
  index = COMMENTS_LIST;
  commentsLoader.removeEventListener('click',onCommentsLoadClick);
};

const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt)){
    closePhoto();
  }
};

const onCloseButtonClick = () => {
  closePhoto();
  closingButton.removeEventListener('click', onCloseButtonClick);
};

const openBigPicture = (picture) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentCounter.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  listOfComments = picture.newComments;

  addComments();

  commentsLoader.addEventListener('click',onCommentsLoadClick);
  document.addEventListener('keydown',onDocumentEscKeyDown);
  closingButton.addEventListener('click',onCloseButtonClick);
};

export{openBigPicture};
