import styled from 'styled-components';

const WeatherIcon = ({ code, small = false }) => {
  return (
    <Icon 
      src={`https://openweathermap.org/img/wn/${code}${small ? '@2x' : '@4x'}.png`} 
      alt="Weather icon"
      small={small}
    />
  );
};

// Styled Components
const Icon = styled.img`
  width: ${props => props.small ? '40px' : '80px'};
  height: ${props => props.small ? '40px' : '80px'};
`;

export default WeatherIcon;