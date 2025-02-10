import { FC } from 'react'
import {
  ClearSkyIcon,
  FewCloudsIcon,
  ManyCloudsIcon,
  MistIcon,
  RainIcon,
  ShowerRainIcon,
  SnowIcon,
  ThunderStormIcon
} from '../assets/weatherIcon'

interface WeatherIconProps {
  size: string
}
type WeatherIconComponent = FC<WeatherIconProps>
type WeatherIconObject = {
  [key: string]: WeatherIconComponent
}

export const selectWeatherIcon = (weatherCode: number, size: string) => {
  const code = weatherCode.toString()
  const iconObject: WeatherIconObject = {
    '800': ClearSkyIcon,
    '801': FewCloudsIcon,
    '2': ThunderStormIcon,
    '3': ShowerRainIcon,
    '5': RainIcon,
    '6': SnowIcon,
    '7': MistIcon
  }
  const Icon = iconObject[code] || iconObject[code.charAt(0)] || ManyCloudsIcon
  return <Icon size={size} />
}
