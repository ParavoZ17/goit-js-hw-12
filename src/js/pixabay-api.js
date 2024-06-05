import axios from 'axios';

const PIXABAY_KEY = '44174782-27b27c44e5570cc8c29375d58';

const getImages = (text, page, perPage) => {
  return axios.get(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${text}
&image_type=photo&orientation=horizontal&safesearch=true
&page=${page}&per_page=${perPage}`);
};

export default {
  getImages,
};
