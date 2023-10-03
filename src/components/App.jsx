import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchApi } from 'api/fetch';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paragraf } from './App.styled';

export class App extends Component {
  state = {
    searchName: '', //значение строки поиска
    pictures: [], // массив изображений с бекенда
    error: '', //для обработки ошибок запроса
    currentPage: 1,
    isLoading: false, //Параметр загрузчика
    totalPages: 0, //к-во страниц всего в запросе
  };

  componentDidUpdate(_, prevState) {
    // Проверяем, изменился ли запрос или номер страницы
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.handleAddPictures(); // Получаем и добавляем изображения в состояние
    }
  }

  // Метод для получения в стейт значения инпута поиска
  handleSubmitSearchForm = searchName => {
    this.setState({
      searchName,
      pictures: [], //Сброс картинок
      currentPage: 1, // Сброс на 1-ю страницу
    });
  };

  // Увеличение номера страници (использ. в кнопке LoadMore)
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleAddPictures = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });
      const data = await fetchApi(searchName, currentPage);

      if (data.hits.length === 0) {
        return toast.warn(
          'The Images not found. Please, enter another Request'
        );
      }

      this.setState(state => ({
        pictures: [...state.pictures, ...data.hits], // Добавляем новые изображения к существующим
        isLoading: false, // Сбрасываем загрузчик
        error: '', // Очищаем сообщение об ошибке
        totalPages: Math.ceil(data.totalHits / 12), // Вычисляем общее количество страниц
      }));
    } catch (error) {
      this.setState({ error: 'Something wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { pictures, isLoading, totalPages, currentPage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmitSearchForm} />

        {isLoading && <Loader />}

        {/* // Проверка на получение массива изображений */}
        {pictures.length > 0 ? (
          <ImageGallery pictures={pictures} />
        ) : (
          <Paragraf>The Gallery of images is empty</Paragraf>
        )}
        {pictures.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
        <ToastContainer autoClose={3000} position={'top-center'} />
      </div>
    );
  }
}

export default App;
