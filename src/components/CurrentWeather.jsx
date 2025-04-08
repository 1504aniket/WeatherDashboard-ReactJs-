import styled from 'styled-components';
import WeatherIcon from './WeatherIcon';

const CurrentWeather = ({ data, refreshWeather, theme }) => {
  const getFormattedDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <WeatherCard theme={theme}>
      <WeatherHeader theme={theme}>
        <h2>
          {data.name}, {data.sys.country}
          <RefreshButton onClick={refreshWeather} theme={theme}>🔄</RefreshButton>
        </h2>
        <DateText theme={theme}>{getFormattedDate(data.dt)}</DateText>
      </WeatherHeader>
      
      <WeatherMain>
        <Temperature theme={theme}>
          {Math.round(data.main.temp)}°C
          <WeatherIcon code={data.weather[0].icon} />
        </Temperature>
        <WeatherDescription theme={theme}>{data.weather[0].main}</WeatherDescription>
      </WeatherMain>
      
      <WeatherDetails>
        <DetailItem theme={theme}>
          <span>Humidity</span>
          <span>{data.main.humidity}%</span>
        </DetailItem>
        <DetailItem theme={theme}>
          <span>Wind Speed</span>
          <span>{Math.round(data.wind.speed * 3.6)} km/h</span>
        </DetailItem>
        <DetailItem theme={theme}>
          <span>Feels Like</span>
          <span>{Math.round(data.main.feels_like)}°C</span>
        </DetailItem>
        <DetailItem theme={theme}>
          <span>Pressure</span>
          <span>{data.main.pressure} hPa</span>
        </DetailItem>
      </WeatherDetails>
    </WeatherCard>
  );
};

// Styled Components
const WeatherCard = styled.div`
  background-color: ${props => props.theme === 'light' ? '#fff' : '#444'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const WeatherHeader = styled.div`
  margin-bottom: 20px;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const DateText = styled.p`
  color: ${props => props.theme === 'light' ? '#7f8c8d' : '#bdc3c7'};
  margin: 5px 0 0 0;
`;

const WeatherMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Temperature = styled.div`
  font-size: 48px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const WeatherDescription = styled.div`
  font-size: 20px;
  text-transform: capitalize;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: ${props => props.theme === 'light' ? '#ecf0f1' : '#555'};
  border-radius: 4px;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const RefreshButton = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

export default CurrentWeather;