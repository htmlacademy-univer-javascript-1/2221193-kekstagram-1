import { getRandomElement, debounce } from './util';
import { renderPictures, clearPhotos } from './pictures';
import { getData } from './main';

const RANDOM_PHOTOS_COUNT = 10;

const filterForm = document.querySelector('.img-filters__form');

const comparePhotos = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;

const filter = {
  'filter-default': (photos) => photos.slice(),
  'filter-random': (photos) => getRandomElement(photos, RANDOM_PHOTOS_COUNT),
  'filter-discussed': (photos) => photos.slice().sort(comparePhotos),
};

const onFilterClick = debounce((evt) => {
  if(evt.target.tagName === 'BUTTON') {
    const selectedButton = filterForm.querySelector('.img-filters__button--active');
    if(selectedButton){
      selectedButton.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');

    clearPhotos();
    renderPictures(filter[evt.target.id](getData()));
  }
});

filterForm.addEventListener('click', onFilterClick);
