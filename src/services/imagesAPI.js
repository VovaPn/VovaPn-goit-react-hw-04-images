import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const config = {
  params: {
    key: '31043334-d435e709e031a3a5e6d394209',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
};

async function searchImages(query, page = 1) {
  const urlAXIOS = `?page=${page}&q=${query}`;
  const { data } = await axios.get(urlAXIOS, config);
  return data;
}

const api = {
  searchImages,
};

export default api;
