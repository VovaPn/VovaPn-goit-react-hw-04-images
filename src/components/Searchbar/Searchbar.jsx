import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchInput,
} from 'components/Searchbar/Searchbar.styled';
import { useState } from 'react';

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const normilizedQuery = query.trim().toLowerCase();

    onSearch(normilizedQuery);

    setQuery({ normilizedQuery });

    if (!normilizedQuery) {
      toast.error('Please, enter your search query.');
    }

    setQuery('');
  };

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>
            <ImSearch size={'1.2em'} />
          </SearchFormButtonLabel>
        </SearchFormButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleInputChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
