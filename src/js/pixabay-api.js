import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28802663-ddb0f5d28ea31cc45b363b962';

let currentPage = 1;
const perPage = 15;
let totalPages = 0;
let totalHits = 0;

export async function fetchImages(query, loadPage) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: loadPage,
    per_page: perPage,
  });

  const response = await axios.get(`${BASE_URL}?${params.toString()}`);

  const data = response.data;

  totalHits = data.totalHits;
  totalPages = Math.ceil(totalHits / perPage);

  return data;
}

export function nextPage() {
  currentPage += 1;
}

export function resetPage() {
  currentPage = 1;
}

export function getCurrentPage() {
  return currentPage;
}

export function getTotalPages() {
  return totalPages;
}
