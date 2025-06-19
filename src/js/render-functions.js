import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGalley(images, galleryElement) {
  const markup = images
    .map(image => {
      return `<li class="gallery-element">
      <a href="${image.largeImageURL}" class="photo-card">
        <div class="image-wrapper">
          <img
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}"
            loading="lazy"
          />
        </div>
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
      </a>
    </li>
        `;
    })
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
export function clearGallery(galleryEl) {
  galleryEl.innerHTML = '';
}
