import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import pixabayApi from './js/pixabay-api.js';
import render from './js/render-function.js';

let page = 1;
const PER_PAGE = 15;
const TOAST_ERR = `error`;
const TOAST_INFO = `info`;
const SERVER_ERR = `Something went wrong, please try again later!`;
const SEARCH_TEXT_ERR = `Search text cant be empty!`;
const NO_IMAGES_ERR = `Sorry, there are no images matching your search
query. Please try again!`;
const LAST_PAGE_INFO = `We're sorry, but you've reached the end of
search results.`;
const searchForm = document.querySelector('.searchForm');
const loaderBox = document.querySelector('.loaderBox');
const container = document.querySelector('.container');
const input = document.querySelector('.inputSearch');
const loadMoreBox = document.querySelector('.loadMoreBox');
const loadMoreBtn = document.querySelector('.loadMore');
let text = '';
const imagesArr = [];
const showToast = (message, type) => {
  iziToast[type]({
    position: 'topRight', message: message,
  });
};
const showLoading = () => loaderBox.style.display = 'flex';
const hideLoading = () => loaderBox.style.display = 'none';
const showLoadMoreBtn = () => loadMoreBox.style.display = 'flex';
const hideLoadMoreBtn = () => loadMoreBox.style.display = 'none';
const clearContainer = () => container.innerHTML = '';
const isNotLastPage = total => Math.round(total / PER_PAGE) !== page;
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', captionDelay: 250, captionPosition: 'bottom',
});
const autoScrollPage = () => {
  const imgCard = document.querySelector('.imgCard');
  if (imgCard) {
    window.scrollBy(0, imgCard.getBoundingClientRect().height * 2);
  }
};

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  text = input.value;
  page = 1;
  imagesArr.length = 0;

  if (text === '') return showToast(SEARCH_TEXT_ERR, TOAST_ERR);

  clearContainer();
  showLoading();
  try {
    const response = await pixabayApi.getImages(text, page, PER_PAGE);

    if (response.data) {
      const { hits, totalHits } = response.data;

      if (hits.length === 0) {
        hideLoading();
        return showToast(NO_IMAGES_ERR, TOAST_ERR);
      }

      imagesArr.push(...hits.map(img => render.createImgCard(img)));
      hideLoading();
      container.append(...imagesArr);

      if (isNotLastPage(totalHits)) showLoadMoreBtn();
    }

  } catch (err) {
    console.log(err);
    hideLoading();
    showToast(SERVER_ERR, TOAST_ERR);
  }
  lightbox.refresh();
  lightbox.next();
});

loadMoreBtn.addEventListener('click', async () => {
  try {
    showLoading();
    page += 1;
    const response = await pixabayApi.getImages(text, page, PER_PAGE);

    if (response.data) {
      const { hits, totalHits } = response.data;

      imagesArr.push(...hits.map(img => render.createImgCard(img)));
      hideLoading();
      container.append(...imagesArr);
      autoScrollPage();

      if (isNotLastPage(totalHits)) {
        showLoadMoreBtn();
      } else {
        hideLoadMoreBtn();
        showToast(LAST_PAGE_INFO, TOAST_INFO);
      }
    }

  } catch (err) {
    console.log(err);
    hideLoading();
    showToast(SERVER_ERR, TOAST_ERR);
  }
  lightbox.refresh();
  lightbox.next();
});