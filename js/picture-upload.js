const TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.user-picture');
const fileChooser = form.querySelector('.img-upload__input[type=file]');
const effects = form.querySelectorAll('.effects__preview');

const onFileChooserChanged = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const newPictureUrl = URL.createObjectURL(file);
    preview.src = newPictureUrl;

    effects.forEach((effect) => { effect.style.backgroundImage = `url(${newPictureUrl})`; });
  }
};

fileChooser.addEventListener('change', onFileChooserChanged);
