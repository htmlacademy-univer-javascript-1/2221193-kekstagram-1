const createComments = (comment, template) => {
  const newComment = template.cloneNode(true);
  const picture = newComment.querySelector('.social__picture');
  picture.src = comment.avatar;
  picture.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

export{createComments};
