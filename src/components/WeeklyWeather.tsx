import styled from 'styled-components'
import { selectWeatherIcon } from '../utils/selectIcon'
import { useEffect, useRef, useState } from 'react'
import { getDailyWeatherData } from '../api/weatherRequest'
import { IWeatherDailyList } from '../types/weatherTypes'
import { combineNightAndDay, getDateOfData, roundingOff } from '../utils/weatherUtils'
// import { dailyWeatherMock } from '../mock/dailyWeatherMock'

const WeeklyWeather = () => {
  const [dailyData, setDailyData] = useState<IWeatherDailyList[]>([])
  const timeZoneOffset = useRef(0)

  useEffect(() => {
    const requestGetDailyWeather = async () => {
      try {
        const res = await getDailyWeatherData({ lat: 37.58009, lon: 126.9771 })
        const combinedData = combineNightAndDay(res.list)
        setDailyData(combinedData)
        timeZoneOffset.current = res.city.timezone
      } catch {
        alert('날씨를 불러올 수 없습니다.')
      }
    }
    requestGetDailyWeather()

    // 테스트용 mock
    // timeZoneOffset.current = dailyWeatherMock.city.timezone
    // const combinedData = combineNightAndDay(dailyWeatherMock.list)
    // setDailyData(combinedData)
  }, [])

  if (!dailyData) return <Container></Container>

  return (
    <Container>
      <DailyList>
        {dailyData.map((item) => (
          <DailyItem key={item.dt}>
            <TempBox>
              <span className="date">{getDateOfData(item.dt)}</span>
              <div>
                <span className="min">{roundingOff(item.minTemp || 0, true)}°</span>
                <span>{' / '}</span>
                <span className="max">{roundingOff(item.maxTemp || 0, true)}°</span>
              </div>
            </TempBox>
            <IconBox>
              <div className="timezone">
                <div className="timezone-box">
                  오전
                  {selectWeatherIcon(item.weather[0].id, '40px')}
                </div>
                <div className="timezone-box">
                  오후
                  {selectWeatherIcon(item.weather[0].id, '40px')}
                </div>
              </div>
            </IconBox>
          </DailyItem>
        ))}
      </DailyList>
    </Container>
  )
}

const Container = styled.section`
  padding: 50px 0;
`
const DailyList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const DailyItem = styled.li`
  display: flex;
  gap: 10px;
  margin: auto;
  padding: 20px 0;
`
const TempBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  .date {
    color: white;
  }
  .min {
    color: #9cb2fc;
  }
  .max {
    color: #f98484;
  }
`
const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  .timezone {
    display: flex;
    gap: 10px;
  }
  .timezone-box {
    display: flex;
    flex-direction: column;
  }
`

export default WeeklyWeather
