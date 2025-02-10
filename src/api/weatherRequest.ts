import { ICoords } from '../types/geoTypes'
import { weatherInstance } from './axiosInstance'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const DEFAULT_OPTION = { appid: API_KEY, lang: 'kr', units: 'metric' }

export const getWeatherData = async ({ lat, lon }: ICoords) => {
  return await weatherInstance
    .get('data/3.0/onecall', {
      params: { ...DEFAULT_OPTION, lat, lon, exclude: 'minutely,daily' }
    })
    .then((res) => {
      return res.data
    })
}

export const getDailyWeatherData = async ({ lat, lon }: ICoords) => {
  return await weatherInstance
    .get('data/2.5/forecast', {
      params: { ...DEFAULT_OPTION, lat, lon }
    })
    .then((res) => {
      return res.data
    })
}
