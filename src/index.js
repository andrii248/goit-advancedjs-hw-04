import RequestPictures from './js/requestToPixabay';
import LoadMoreImgsBtn from './js/loadMoreImgs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const userRequest = new RequestPictures();
const loadMoreBtn = new LoadMoreImgsBtn({
  selector: '[data-acton="load"]',
  hidden: true,
});
let lightbox = new SimpleLightbox('.gallery a', {
  captionData: 'alt',
  captionDelay: 500,
});

const refs = {
  form: document.querySelector('#search-form'),
  searchBtn: document.querySelector('.search-btn'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

refs.form.addEventListener('submit', onSearchSubmit);
loadMoreBtn.refs.loadBtn.addEventListener('click', onLoadBtnClick);
refs.gallery.addEventListener('click', onImgClick);

async function onSearchSubmit(evt) {
  evt.preventDefault();
  const searchData = evt.target.elements.searchQuery.value.trim();
  userRequest.query = searchData;

  if (searchData === '') {
    iziToast.error({
      title: 'Error',
      message: 'Empty input. Please, enter your query to search',
      position: 'topRight',
    });

    return;
  }
  clearGalleryContainer();
  userRequest.resetPage();
  showLoader();

  try {
    const fetchImgs = await fetchAndRenderImgs();
    const totalImgsFound = fetchImgs.totalHits;

    totalImgsFound &&
      iziToast.success({
        title: 'Hooray!',
        message: `We found ${totalImgsFound} images`,
        position: 'topRight',
      });

    evt.target.reset();
    hideLoader();
  } catch (error) {
    console.log(error);
  }
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}

async function fetchAndRenderImgs() {
  showLoader();
  try {
    loadMoreBtn.hide();

    loadMoreBtn.disable();

    const fetchData = await userRequest.fetchPictures();
    const images = fetchData.hits;
    const totalImgsFound = fetchData.totalHits;

    if (totalImgsFound === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
      loadMoreBtn.hide();
      return;
    }

    if (totalImgsFound < 40) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      loadMoreBtn.hide();
    } else {
      loadMoreBtn.show();
      loadMoreBtn.enable();
    }

    renderImages(images);
    userRequest.incrementPage();
    lightbox.refresh();

    return fetchData;
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

async function onLoadBtnClick() {
  showLoader();
  try {
    const loadMore = await fetchAndRenderImgs();

    const currentPage = userRequest.page;
    const totalPages = Math.ceil(Number(loadMore.totalHits) / 40);
    if (currentPage > totalPages) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });

      loadMoreBtn.hide();
    }
    hideLoader();
  } catch (error) {
    console.log(error);
  }
}

function renderImages(images) {
  const markup = images
    .map(image => {
      return `<a href="${image.largeImageURL}" class="photo-card">
  <img  class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> <span class="photo_span">${image.likes} </span>
    </p>
    <p class="info-item">
      <b>Views</b> <span class="photo_span">${image.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b> <span class="photo_span">${image.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b> <span class="photo_span">${image.downloads}</span>
    </p>
  </div>
</a>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onImgClick(evt) {
  if (evt.target.nodeName !== 'IMG') return;
}

function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

function hideLoader() {
  refs.loader.classList.add('is-hidden');
}
