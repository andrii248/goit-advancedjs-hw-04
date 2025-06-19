import iziToast from 'izitoast';
import { hideLoader, showLoader } from './loader';
import {
  fetchImages,
  getCurrentPage,
  getTotalPages,
  nextPage,
} from '../pixabay-api';
import { renderGalley } from '../render-functions';

const loadMoreBtn = document.querySelector('.load-more-btn');

export async function handleLoadMore(loadMoreQuery, galleryContainer) {
  if (!loadMoreQuery) {
    iziToast.info({
      title: 'No query',
      message: 'Please enter your query',
      position: 'topRight',
    });
    return;
  }

  showLoader();

  try {
    const currentPage = getCurrentPage();
    const totalPages = getTotalPages();

    const data = await fetchImages(loadMoreQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGalley(data.hits, galleryContainer);
    nextPage();

    const galleryEl = document.querySelector('.gallery-element');
    if (galleryEl) {
      const elementHeight = galleryEl.getBoundingClientRect().height;
      window.scrollBy({
        top: elementHeight * 2,
        behavior: 'smooth',
      });
    }

    if (getCurrentPage() >= totalPages) {
      iziToast.info({
        title: 'No results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });

      hideLoadMore();
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: `${err.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

export function hideLoadMore() {
  loadMoreBtn.classList.add('is-hidden');
}

export function showLoadMore() {
  loadMoreBtn.classList.remove('is-hidden');
}
