import styled from 'styled-components'
import { LocationIcon } from '../assets/locationIcon'
import { selectWeatherIcon } from '../utils/selectIcon'
import { getWindDirection, roundingOff } from '../utils/weatherUtils'
import { IWeatherCurrent } from '../types/weatherTypes'

type CurrentWeatherPropsType = {
  city: string
  currentData: IWeatherCurrent
}

const CurrentWeather = ({ currentData, city }: CurrentWeatherPropsType) => {
  return (
    <Container>
      <div className="location">
        <LocationIcon />
        <span>{city}</span>
      </div>
      <div className="weather">
        <div className="info">
          <h1>현재 날씨</h1>
          <span className="desc">{currentData.weather[0].description}</span>
          <div className="details">
            <span>습도 : {currentData.humidity}%</span>
            <span>풍향 : {getWindDirection(currentData.wind_deg)}</span>
            <span>바람(m/s) : {roundingOff(currentData.wind_speed, true)}</span>
          </div>
        </div>
        <div className="icon">{selectWeatherIcon(currentData.weather[0].id, '180px')}</div>
      </div>
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  height: 380px;
  background: linear-gradient(rgba(0, 0, 0, 0.053), rgba(0, 0, 0, 0.332)), url('/background.webp');
  border-radius: 16px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .location {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    color: white;
  }
  .weather {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 20px;
  }
  .details {
    display: flex;
    gap: 20px;
    font-size: 15px;
    color: white;
  }
  .desc {
    font-size: 45px;
    font-weight: 600;
    color: white;
    padding-top: 15px;
  }
  .icon {
    position: relative;
    bottom: -30px;
  }
`
export default CurrentWeather
