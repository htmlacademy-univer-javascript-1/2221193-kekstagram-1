const createComment = (currentComment, template) => {
  const newComment = template.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');
  avatar.src = currentComment.avatar;
  avatar.alt = currentComment.name;
  newComment.querySelector('.social__text').textContent = currentComment.message;

  return newComment;
};

export{createComment};

