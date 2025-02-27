import { useEffect, useRef, useState } from 'react'
import { getWeatherData } from '../api/weatherRequest'
import { IWeatherResponse } from '../types/weatherTypes'
import { getCurrentLocationName } from '../api/geoRequest'
import HourlyWeather from '../components/HourlyWeather'
import WeeklyWeather from '../components/WeeklyWeather'
import styled from 'styled-components'
import { ICoords } from '../types/geoTypes'
import CurrentWeather from '../components/CurrentWeather'
import Today from '../components/Today'
import Loading from '../components/Loading'
// import { combinedWeatherMock } from '../mock/combinedWeatherMock'

interface IGeoLocationPosition {
  coords: {
    latitude: number
    longitude: number
  }
}

const Home = () => {
  const [city, setCity] = useState<string>('')
  const [location, setLocation] = useState<ICoords>({ lat: 0, lon: 0 })
  const [weatherData, setWeatherData] = useState<IWeatherResponse>()
  const timezone = useRef('')

  useEffect(() => {
    const getGeoLocation = () => {
      const onGeoSuccess = (position: IGeoLocationPosition) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lon: longitude })
        // setLocation({ lat: 25.2069, lon: 55.2701 }) // 두바이 시간대로 설정 테스트
      }
      const onGeoError = () => {
        setCity('서울시 종로구')
        setLocation({ lat: 37.58009, lon: 126.9771 })
        alert('위치를 확인할 수 없습니다. 기본 위치의 날씨가 제공됩니다.')
      }
      navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError)
    }
    getGeoLocation()
  }, [])

  useEffect(() => {
    if (location.lat === 0) return

    const requestGetWeatherData = async () => {
      try {
        const res = await getWeatherData(location)
        setWeatherData(res)
        timezone.current = res.timezone
      } catch {
        alert('날씨를 불러올 수 없습니다.')
      }
    }
    const requestGetCurrentLocationName = async () => {
      try {
        const res = await getCurrentLocationName(location)
        const { components } = res[0]
        setCity(`${components.city} ${components.borough || ''} ${components.quarter || components.road}`)
      } catch {
        setCity('서울시 종로구')
      }
    }

    requestGetCurrentLocationName()
    requestGetWeatherData()
  }, [location])

  if (!weatherData)
    return (
      <HomeContainer>
        <div className="no-result">
          <Loading />
        </div>
      </HomeContainer>
    )

  return (
    <HomeContainer>
      <LeftBox>
        <CurrentWeather currentData={weatherData.current} city={city} />
        <HourlyWeather hourlyData={weatherData.hourly} timezone={timezone.current} />
        <Reference>
          <span>날씨 API : https://openweathermap.org/</span>
          <span>지오코딩 : https://opencagedata.com/</span>
        </Reference>
      </LeftBox>
      <RightBox>
        <Today currentTemp={weatherData.current.temp} timezone={timezone.current} />
        <WeeklyWeather location={location} />
      </RightBox>
    </HomeContainer>
  )
}

const HomeContainer = styled.main`
  display: flex;
  background-color: #00000042;
  border-radius: 16px;
  position: relative;
  color: #bdbdbd;

  .no-result {
    width: 100%;
    text-align: center;
    padding: 150px 0;
  }
`
const LeftBox = styled.div`
  position: relative;
  width: 73%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Reference = styled.div`
  margin-top: 30px;
  font-size: 13px;
  span {
    margin-right: 30px;
  }
`

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #00000042;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 30px 20px;
`

export default Home
