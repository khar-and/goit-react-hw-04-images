import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchApi } from 'api/fetch';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paragraf } from './App.styled';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchName !== '') {
      const handleAddPictures = async () => {
        try {
          setIsLoading(true);
          const data = await fetchApi(searchName, currentPage);

          if (data.hits.length === 0) {
            return toast.warn(
              'The Images not found. Please, enter another Request'
            );
          }

          setPictures(prev => [...prev, ...data.hits]);
          setIsLoading(false);
          setTotalPages(Math.ceil(data.totalHits / 12));
        } catch {
          toast.error('Something went wrong!'); // Если произошла ошибка, выводим сообщение
        } finally {
          setIsLoading(false);
        }
      };

      handleAddPictures(); // Получаем и добавляем изображения в состояние
    }
  }, [currentPage, searchName]);

  // Метод для получения в стейт значения инпута поиска
  const handleSubmitSearchForm = searchName => {
    setSearchName(searchName);
    setPictures([]);
    setCurrentPage(1);
  };

  // Увеличение номера страници (использ. в кнопке LoadMore)
  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmitSearchForm} />

      {isLoading && <Loader />}

      {/* // Проверка на получение массива изображений */}
      {pictures.length > 0 ? (
        <ImageGallery pictures={pictures} />
      ) : (
        <Paragraf>The Gallery of images is empty</Paragraf>
      )}
      {pictures.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}
      <ToastContainer autoClose={3000} position={'top-center'} />
    </div>
  );
};

export default App;
