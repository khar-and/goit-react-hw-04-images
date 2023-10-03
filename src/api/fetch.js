// Импортируем модуль axios для работы с HTTP-запросами
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38685077-7183c86b95211b39352b290b2';

export const fetchApi = async (searchName, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  return response.data;
};
