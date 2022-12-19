import { isEscape } from './utils.js';
import { declineNumber as declineNum } from './number-declination.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const commentCounter = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const closedButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = bigPicture.querySelector('.social__comment');
const comments = bigPicture.querySelector('.social__comments');

let index = COMMENTS_STEP;
let currentComments = [];

const createComments = (currentComment, template) => {
  const newComment = template.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');
  avatar.src = currentComment.avatar;
  avatar.alt = currentComment.name;
  newComment.querySelector('.social__text').textContent = currentComment.message;

  return newComment;
};

const addComments = () => {
  comments.innerHTML = '';

  index = (index > currentComments.length) ? currentComments.length: index;

  const commentsSelected = currentComments.slice(0, index);

  if(currentComments.length <= COMMENTS_STEP || index >= currentComments.length)
  {
    commentLoader.classList.add('hidden');
  }
  else{
    commentLoader.classList.remove('hidden');
  }

  const commentsDecline = declineNum(currentComments.length, 'комментария', 'комментариев', 'комментариев');
  commentCounter.textContent = `${index} из ${currentComments.length} ${commentsDecline}`;

  commentsSelected.forEach((comment) => {
    comments.appendChild(createComments(comment, commentTemplate));
  });
};

const onCommentLoaderClick = () => {
  index += COMMENTS_STEP;
  addComments();
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentComments = [];
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
  closedButton.removeEventListener('click', onClosingButtonClick);
};

const openBigPicture = (picture) =>{
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentCounter.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  currentComments = picture.comments;

  addComments();

  commentLoader.addEventListener('click', onCommentLoaderClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
  closedButton.addEventListener('click', onClosingButtonClick);
};

export {openBigPicture};
