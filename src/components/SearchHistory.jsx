import styled from 'styled-components';

const SearchHistory = ({ history, onItemClick, theme }) => {
  return (
    <HistoryContainer theme={theme}>
      <h3>Recent Searches</h3>
      {history.length === 0 ? (
        <EmptyMessage theme={theme}>No recent searches</EmptyMessage>
      ) : (
        <HistoryList>
          {history.map((city, index) => (
            <HistoryItem 
              key={index} 
              onClick={() => onItemClick(city)}
              theme={theme}
            >
              {city}
            </HistoryItem>
          ))}
        </HistoryList>
      )}
    </HistoryContainer>
  );
};

// Styled Components
const HistoryContainer = styled.div`
  background-color: ${props => props.theme === 'light' ? '#fff' : '#444'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HistoryItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  background-color: ${props => props.theme === 'light' ? '#ecf0f1' : '#555'};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};

  &:hover {
    background-color: ${props => props.theme === 'light' ? '#bdc3c7' : '#666'};
  }
`;

const EmptyMessage = styled.p`
  color: ${props => props.theme === 'light' ? '#7f8c8d' : '#bdc3c7'};
  text-align: center;
`;

export default SearchHistory;