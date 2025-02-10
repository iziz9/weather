import { weatherInstance } from './axiosInstance'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const DEFAULT_OPTION = { appid: API_KEY, lang: 'kr' }

interface IGetWeatherData {
  lat: number
  lon: number
}

export const getWeatherData = async ({ lat, lon }: IGetWeatherData) => {
  return await weatherInstance
    .get('data/3.0/onecall', {
      params: { ...DEFAULT_OPTION, lat, lon, units: 'metric', exclude: 'minutely' }
    })
    .then((res) => {
      return res.data
    })
}
