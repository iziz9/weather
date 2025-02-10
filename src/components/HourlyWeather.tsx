import styled from 'styled-components'
import { IWeatherHourly } from '../types/weatherTypes'
import { roundingOff, getPop, getTimeOfData, getWindDirection, getDayOfData } from '../utils/weatherUtils'
import { selectWeatherIcon } from '../utils/selectIcon'

const HourlyWeather = ({ hourlyData }: { hourlyData: IWeatherHourly[] }) => {
  return (
    <Container>
      <HourlyList>
        {hourlyData.map((item) => (
          <HourlyItem key={item.dt}>
            <TimeBox>
              <span className="day">{getDayOfData(item.dt)}</span>
              <span className="time">{getTimeOfData(item.dt)}시</span>
            </TimeBox>
            <WeatherBox>
              {selectWeatherIcon(item.weather[0].id, '80px')}
              <span>{roundingOff(item.temp)}°</span>
            </WeatherBox>
            <DetailsBox>
              <div>습도 : {item.humidity}%</div>
              <div>강수확률 : {getPop(item.pop)}%</div>
              <div>강수량(mm) : {item.rain?.['1h'] || '0'}</div>
              <div>풍향 : {getWindDirection(item.wind_deg)}</div>
              <div>바람(m/s) : {roundingOff(item.wind_speed, true)}</div>
            </DetailsBox>
          </HourlyItem>
        ))}
      </HourlyList>
    </Container>
  )
}

const Container = styled.section`
  position: relative;
  background-color: #00000042;
  border-radius: 16px;
`
const HourlyList = styled.ul`
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  padding: 10px;

  &::-webkit-scrollbar {
    position: relative;
    bottom: -30px;
    width: 10px;
    background-color: black;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    background-color: #2f3542;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }
`
const HourlyItem = styled.li`
  width: 120px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 12px;
`
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  .day {
    width: 45px;
    height: 25px;
    border-radius: 16px;
    background-color: #384c64e2;
    color: white;
    text-align: center;
    align-content: center;
    font-size: 13px;
  }
  .time {
    font-size: 15px;
  }
`
const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  span {
    font-size: 30px;
    color: white;
  }
`
const DetailsBox = styled.div`
  font-size: 15px;
  line-height: 25px;
`

export default HourlyWeather
