import styled from 'styled-components'
import { IWeatherHourly } from '../types/weatherTypes'
import { calcTemperature, getDayOfData, getPop, getTimeOfData, GetWindDerection } from '../utils/weatherUtils'
import { selectWeatherIcon } from '../utils/selectIcon'

const HourlyWeather = ({ hourlyData }: { hourlyData: IWeatherHourly[] }) => {
  return (
    <Container>
      <h2>시간별 예보</h2>
      <HourlyList>
        {hourlyData.map((item) => (
          <HourlyItem key={item.dt}>
            <TimeBox>
              <span className="day">{getDayOfData(item.dt)}</span>
              <span className="time">{getTimeOfData(item.dt)}시</span>
            </TimeBox>
            <WeatherBox>
              {selectWeatherIcon(item.weather[0].id, '60px')}
              <span>{calcTemperature(item.temp)}°</span>
            </WeatherBox>
            <div>강수확률 : {getPop(item.pop)}%</div>
            <div>강수량(mm) : {item.rain?.['1h'] || '0'}</div>
            <div>풍향 : {GetWindDerection(item.wind_deg)}</div>
            <div>바람(m/s) : {Math.round(item.wind_speed * 10) / 10}</div>
            <div>습도 : {item.humidity}%</div>
          </HourlyItem>
        ))}
      </HourlyList>
    </Container>
  )
}

const Container = styled.section`
  background-color: seashell;
`
const HourlyList = styled.ul`
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  padding: 10px;
`
const HourlyItem = styled.li`
  width: 120px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 10px;
`
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  .day {
    width: 45px;
    height: 25px;
    border-radius: 16px;
    background-color: rebeccapurple;
    color: white;
    text-align: center;
    align-content: center;
    font-size: 13px;
  }
  .time {
    font-weight: 600;
  }
`
const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
  span {
    font-size: 26px;
    color: navy;
  }
`

export default HourlyWeather
