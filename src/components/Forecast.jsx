import styled from 'styled-components';
import WeatherIcon from './WeatherIcon';

const Forecast = ({ data, theme }) => {
  // Group forecast by day
  const dailyForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Get one forecast per day 
  const forecastDays = Object.keys(dailyForecast).slice(0, 5).map(date => {
    const middayIndex = Math.floor(dailyForecast[date].length / 2);
    return dailyForecast[date][middayIndex];
  });

  const getDayName = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <ForecastContainer theme={theme}>
      <h3>5-Day Forecast</h3>
      <ForecastDays>
        {forecastDays.map((day, index) => (
          <ForecastDay key={index} theme={theme}>
            <DayName theme={theme}>{getDayName(day.dt)}</DayName>
            <WeatherIcon code={day.weather[0].icon} small />
            <DayTemp theme={theme}>{Math.round(day.main.temp)}°C</DayTemp>
            <DayDescription theme={theme}>{day.weather[0].main}</DayDescription>
          </ForecastDay>
        ))}
      </ForecastDays>
    </ForecastContainer>
  );
};

// Styled Components
const ForecastContainer = styled.div`
  background-color: ${props => props.theme === 'light' ? '#fff' : '#444'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const ForecastDays = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const ForecastDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: ${props => props.theme === 'light' ? '#ecf0f1' : '#555'};
  border-radius: 4px;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const DayName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const DayTemp = styled.div`
  font-size: 18px;
  margin: 5px 0;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

const DayDescription = styled.div`
  font-size: 14px;
  text-transform: capitalize;
  text-align: center;
  color: ${props => props.theme === 'light' ? '#333' : '#f5f5f5'};
`;

export default Forecast;