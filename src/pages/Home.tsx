import { useEffect, useState } from 'react'
// import { getWeatherData } from '../api/weatherRequest'
import { weatherMock } from '../mock/mockData'
import { IWeatherResponse } from '../types/weatherTypes'
import { getCurrentLocationName } from '../api/geoRequest'
import HourlyWeather from '../components/HourlyWeather'
import WeeklyWeather from '../components/WeeklyWeather'
import CurrentWeather from '../components/CurrentWeather'
import styled from 'styled-components'

interface IGeoLocationPosition {
  coords: {
    latitude: number
    longitude: number
  }
}

const Home = () => {
  const [city, setCity] = useState<string>('')
  const [location, setLocation] = useState({ lat: 0, lon: 0 })
  const [weatherData, setWeatherData] = useState<IWeatherResponse>()

  useEffect(() => {
    const getGeoLocation = () => {
      const onGeoSuccess = (position: IGeoLocationPosition) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lon: longitude })
      }
      const onGeoError = () => {
        setCity('서울시 종로구')
        setLocation({ lat: 38.0539, lon: 127.1362 })
        alert('위치를 확인할 수 없습니다. 기본 위치의 날씨가 제공됩니다.')
      }
      navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError)
    }
    getGeoLocation()
  }, [])

  useEffect(() => {
    if (location.lat === 0) return

    // const requestGetWeatherData = async () => {
    //   const res = await getWeatherData(location)
    //   console.log(res)
    // }
    // requestGetWeatherData()

    setWeatherData(weatherMock)

    const requestGetCurrentLocationName = async () => {
      try {
        const res = await getCurrentLocationName(location)
        const { components } = res[0]
        setCity(`${components.city} ${components.borough || ''} ${components.quarter || components.road}`)
      } catch (err) {
        setCity('서울시 종로구')
        console.log(err)
      }
    }
    requestGetCurrentLocationName()
  }, [location])

  return (
    <HomeContainer>
      <div>현재 위치 : {city}</div>
      <div>{weatherData?.current.weather[0].description}</div>
      <CurrentWeather />
      <HourlyWeather />
      <WeeklyWeather />
    </HomeContainer>
  )
}

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
export default Home
