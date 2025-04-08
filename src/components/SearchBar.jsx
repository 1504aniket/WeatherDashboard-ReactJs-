import styled from 'styled-components';

const SearchBar = ({ city, setCity, handleSearch, loading, theme }) => {
  return (
    <SearchContainer theme={theme}>
      <Form onSubmit={handleSearch}>
        <SearchInput
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          disabled={loading}
          theme={theme}
        />
        <SearchButton type="submit" disabled={loading} theme={theme}>
          {loading ? 'Searching...' : 'Search'}
        </SearchButton>
        <RefreshButton type="button" onClick={handleSearch} disabled={loading} theme={theme}>
          🔄
        </RefreshButton>
      </Form>
    </SearchContainer>
  );
};

// Styled Components
const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: ${props => props.theme === 'light' ? '#fff' : '#555'};
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};

  &:disabled {
    background-color: ${props => props.theme === 'light' ? '#eee' : '#666'};
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const RefreshButton = styled.button`
  padding: 10px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

export default SearchBar;