const FILE_TYPE = ['gif', 'jpeg', 'jpg', 'png'];

const form = document.querySelector('.img-upload__form');
const picturePreview = form.querySelector('.user-picture');
const file = form.querySelector('.img-upload__input[type=file]');
const effects = form.querySelectorAll('.effects__preview');

const onFileChange = () => {
  const fileChange = file.files[0];
  const fileName = fileChange.name.toLowerCase();
  const matches = FILE_TYPE.some((i) => fileName.endsWith(i));

  if (matches){
    const pictureUrl = URL.createObjectURL(fileChange);
    picturePreview.src = pictureUrl;

    effects.forEach((effect) => { effect.style.backgroundImage = `url(${pictureUrl})`;});
  }
};

file.addEventListener('change', onFileChange);
