import { renderPhotos, clearPhotos } from './pictures.js';
import { getData } from './main.js';
import { getRandomElements, debounce } from './util.js';

const RANDOM_PHOTOS = 10;

const filtersForm = document.querySelector('.img-filters__form');

const compareDiscussedPhotos = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;

const filters = {
  'filter-default': (pictures) => pictures.slice(),
  'filter-random': (pictures) => getRandomElements(pictures, RANDOM_PHOTOS),
  'filter-discussed': (pictures) => pictures.slice().sort(compareDiscussedPhotos),
};

const onFilterFormClicked = debounce((evt) => {
  if(evt.target.tagName === 'BUTTON') {
    const selectedButton = filtersForm.querySelector('.img-filters__button--active');

    if(selectedButton){
      selectedButton.classList.remove('img-filters__button--active');
    }

    evt.target.classList.add('img-filters__button--active');

    clearPhotos();
    renderPhotos(filters[evt.target.id](getData()));
  }
});

filtersForm.addEventListener('click', onFilterFormClicked);
