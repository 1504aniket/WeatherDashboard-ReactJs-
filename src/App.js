import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { WiDaySunny, WiMoonAltThirdQuarter } from 'react-icons/wi';
import { FaGithub } from 'react-icons/fa';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchHistory from './components/SearchHistory';

const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('London');
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const currentResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${'e05abd86a8868fdb226e9759d71b9be4'}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${'e05abd86a8868fdb226e9759d71b9be4'}`
      );
      setWeatherData(currentResponse.data);
      setForecastData(forecastResponse.data);
      addToSearchHistory(cityName);
    } catch (err) {
      setError('City not found. Please try another location.');
    } finally {
      setLoading(false);
    }
  };

  const addToSearchHistory = (cityName) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== cityName.toLowerCase());
      return [cityName, ...filtered].slice(0, 5);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const handleHistoryClick = (cityName) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const refreshWeather = () => {
    if (city) {
      fetchWeatherData(city);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  return (
    <AppContainer theme={theme}>
      <Header theme={theme}>
        <Logo>
          <WiDaySunny size={36} color="#FFA500" />
          <h1>WeatherCast</h1>
        </Logo>
        <ThemeButton theme={theme} onClick={toggleTheme}>
          {theme === 'light' ? <WiMoonAltThirdQuarter size={24} /> : <WiDaySunny size={24} />}
          {theme === 'light' ? ' Dark' : ' Light'}
        </ThemeButton>
      </Header>

      <SearchBar 
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        loading={loading}
        theme={theme}
      />

      {loading && <LoadingMessage theme={theme}>Loading weather data...</LoadingMessage>}
      {error && <ErrorMessage theme={theme}>{error}</ErrorMessage>}

      <MainContent>
        {weatherData && (
          <CurrentWeather 
            data={weatherData} 
            refreshWeather={refreshWeather}
            theme={theme}
          />
        )}

        {forecastData && <Forecast data={forecastData} theme={theme} />}

        {searchHistory.length > 0 && (
          <SearchHistory 
            history={searchHistory} 
            onItemClick={handleHistoryClick}
            theme={theme}
          />
        )}
      </MainContent>

      <Footer theme={theme}>
        <p>© 2025 WeatherCast</p>
        <a href="https://github.com/1504aniket" target="_blank" rel="noopener noreferrer">
          <FaGithub size={20} />
        </a>
      </Footer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background-color: ${props => props.theme === 'light' ? '#f8f9fa' : '#212529'};
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h1 {
    margin: 0;
    font-size: 28px;
    background: linear-gradient(135deg, #0077b6, #00b4d8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background-color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
  color: ${props => props.theme === 'light' ? '#f8f9fa' : '#212529'};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  flex: 1;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #e63946;
  font-size: 18px;
  background-color: ${props => props.theme === 'light' ? '#fff' : '#343a40'};
  border-radius: 4px;
`;

const Footer = styled.footer`
  margin-top: 40px;
  padding: 20px;
  text-align: center;
  color: ${props => props.theme === 'light' ? '#495057' : '#adb5bd'};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  a {
    color: ${props => props.theme === 'light' ? '#495057' : '#adb5bd'};
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
    }
  }
`;

export default App;