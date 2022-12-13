import { createComment } from './comments.js';
import { isEscape } from './util.js';
import { declineNumber as declineNum } from './number-declination.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const commentCounter = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const closingButton = bigPicture.querySelector('.big-picture__cancel');
const template = bigPicture.querySelector('.social__comment');
const comments = bigPicture.querySelector('.social__comments');

let index = COMMENTS_STEP;
let commentsList = [];

const addComments = () => {
  comments.innerHTML = '';

  index = (index > commentsList.length) ? commentsList.length: index;

  const commentsSelected = commentsList.slice(0, index);

  if(commentsList.length <= COMMENTS_STEP || index >= commentsList.length)
  {
    commentLoader.classList.add('hidden');
  }
  else{
    commentLoader.classList.remove('hidden');
  }

  const commentsDecline = declineNum(commentsList.length, 'комментария', 'комментариев', 'комментариев');
  commentCounter.textContent = `${index} из ${commentsList.length} ${commentsDecline}`;

  commentsSelected.forEach((comment) => {
    comments.appendChild(createComment(comment, template));
  });
};

const onCommentLoaderClick = () => {
  index += COMMENTS_STEP;
  addComments();
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  commentsList = [];
  index = COMMENTS_STEP;
  commentLoader.removeEventListener('click', onCommentLoaderClick);
};

const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt)){
    closePicture();
  }
};

const onClosingButtonClick = () => {
  closePicture();
  closingButton.removeEventListener('click', onClosingButtonClick);
};

const openBigPicture = (picture) =>{
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentCounter.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  commentsList = picture.comments;

  addComments();

  commentLoader.addEventListener('click', onCommentLoaderClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
  closingButton.addEventListener('click', onClosingButtonClick);
};

export {openBigPicture};
