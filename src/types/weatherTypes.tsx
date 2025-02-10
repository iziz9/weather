export interface IWeatherResponse {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: IWeatherCurrent
  hourly: IWeatherHourly[]
  daily: IWeatherDaily[]
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
  rain?: number
  snow?: number
  visibility?: number
  wind_speed: number
  wind_deg: number
  weather: IWeatherDesc[]
}
interface IWeatherCurrent extends IBasicWeatherData {
  sunrise: number
  sunset: number
  feels_like: number
  temp: number
}
interface IWeatherHourly extends IBasicWeatherData {
  temp: number
  feels_like: number
  wind_gust: number
  pop: number
}
interface IWeatherDaily extends IBasicWeatherData {
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  summary: string
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  wind_gust: number
  pop: number
}
