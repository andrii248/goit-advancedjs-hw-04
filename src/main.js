import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  fetchImages,
  getCurrentPage,
  getTotalPages,
  nextPage,
  resetPage,
} from './js/pixabay-api';
import { clearGallery, renderGalley } from './js/render-functions';
import {
  handleLoadMore,
  hideLoadMore,
  showLoadMore,
} from './js/helpers/load-more';
import { hideLoader, showLoader } from './js/helpers/loader';

const refs = {
  searchForm: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

let userQuery = '';

refs.searchForm.addEventListener('submit', async evt => {
  evt.preventDefault();
  hideLoadMore();

  userQuery = evt.currentTarget.elements.search.value.trim();

  if (!userQuery) {
    iziToast.info({
      title: 'No query',
      message: 'Please enter your query',
      position: 'topRight',
    });
    return;
  }

  resetPage();

  clearGallery(refs.gallery);

  showLoader();

  try {
    const page = getCurrentPage();
    const data = await fetchImages(userQuery, page);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGalley(data.hits, refs.gallery);

    const totalPages = getTotalPages();
    const currentPage = getCurrentPage();

    if (totalPages > currentPage) {
      nextPage();
      showLoadMore();
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: `${err.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    refs.searchForm.reset();
  }
});

refs.loadMoreBtn.addEventListener('click', () =>
  handleLoadMore(userQuery, refs.gallery)
);
