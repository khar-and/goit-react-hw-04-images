import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchButton,
  SearchSpan,
  SearchInput,
  SearchBar,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleSubmitForm = evt => {
    evt.preventDefault();

    // Проверка на заполнение поля поиска
    if (searchName.trim() === '') {
      return toast.warn('Please input the search name!');
      //   alert('Please input the search name');
    }
    // передача значения поиска в АРР-компонент
    onSubmit(searchName);
    // очистка поля поиска
    setSearchName('');
  };

  const handleChangeSearch = evt => {
    setSearchName(evt.currentTarget.value.toLowerCase());
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmitForm}>
        <SearchButton type="submit">
          <SearchSpan>Search</SearchSpan>
        </SearchButton>

        <SearchInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleChangeSearch}
        />
      </SearchForm>
    </SearchBar>
  );
};

export default Searchbar;
