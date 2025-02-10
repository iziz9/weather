import { ICoords } from './geoTypes'

export interface IWeatherResponse {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: IWeatherCurrent
  hourly: IWeatherHourly[]
}

interface IWeatherDesc {
  id: number
  main: string
  description: string
  icon: string
}

interface IBasicWeatherData {
  dt: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility?: number
  wind_speed: number
  wind_deg: number
  weather: IWeatherDesc[]
}
export interface IWeatherCurrent extends IBasicWeatherData {
  sunrise: number
  sunset: number
  feels_like: number
  temp: number
}
export interface IWeatherHourly extends IBasicWeatherData {
  temp: number
  feels_like: number
  wind_gust: number
  pop: number
  snow?: {
    '1h': number
  }
  rain?: {
    '1h': number
  }
}
export interface IWeatherDailyList {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: IWeatherDesc[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
  nightId?: number // combine 임의 추가
  minTemp?: number // 임의 추가
  maxTemp?: number // 임의 추가
}
export interface IWeatherDaily {
  cod: string
  message: number
  cnt: number
  list: IWeatherDailyList[]
  city: {
    id: number
    name: string
    coord: ICoords
    country: number
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}
