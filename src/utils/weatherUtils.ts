import { IWeatherDailyList } from '../types/weatherTypes'

export const roundingOff = (num: number, accuracy?: boolean) => {
  return accuracy ? Math.round(num * 10) / 10 : Math.round(num)
}

export const getDateOfData = (utc: number, timeZoneOffset: number) => {
  const date = new Date((utc + timeZoneOffset) * 1000)
  const week = ['일', '월', '화', '수', '목', '금', '토']
  const dateString = date.toLocaleDateString('ko-KR', { month: 'long', day: '2-digit' })
  const day = week[date.getDay()]
  return `${dateString} (${day})`
}

export const isSameDate = (utc: number, timeZoneOffset: number) => {
  const date = new Date((utc + timeZoneOffset) * 1000).toLocaleDateString()
  const currentDate = new Date().toLocaleDateString()
  return date === currentDate
}

export const getTimeOfData = (utc: number, timezone: string) => {
  const utcMilliseconds = utc * 1000
  const options = {
    hour: 'numeric' as const,
    hour12: false,
    timeZone: timezone //지역 시간 변환
  }
  return new Intl.DateTimeFormat('default', options).format(new Date(utcMilliseconds))
}

export const getPop = (pop: number) => {
  // propability of procipitation 강수확률
  return pop === 0 ? pop : pop * 100
}

export const getDayOfData = (utc: number, timezone: string) => {
  const formatter = new Intl.DateTimeFormat('default', { timeZone: timezone })
  const now = new Date()
  const dateNow = new Date(formatter.format(now)).getDate()

  // 서버 응답값인 utc 시간을 현지 시간대로 변환
  const dataDate = new Date(utc * 1000)
  const dataDateInTimezone = new Date(formatter.format(dataDate))
  const dateOfData = dataDateInTimezone.getDate()

  if (dateNow === dateOfData) return '오늘'
  else if (dateNow + 1 === dateOfData) return '내일'
  else if (dateNow + 2 === dateOfData) return '모레'
}

export const getWindDirection = (deg: number) => {
  const directions = ['북풍', '북동풍', '동풍', '남동풍', '남풍', '남서풍', '서풍', '북서풍']
  const index = Math.round(deg / 45) % 8 // 45도 단위로 나누고 0~7 사이의 방향 인덱스 구하기
  return directions[index]
}

export const combineNightAndDay = (dailyData: IWeatherDailyList[], timeZoneOffset: number) => {
  const combinedTemp = dailyData.reduce((acc: { [key: string]: { min: number; max: number } }, data) => {
    const date = getDateOfData(data.dt, timeZoneOffset)

    if (!acc[date]) {
      acc[date] = {
        min: data.main.temp_min,
        max: data.main.temp_max
      }
    } else {
      acc[date].min = Math.min(acc[date].min, data.main.temp_min)
      acc[date].max = Math.max(acc[date].max, data.main.temp_max)
    }

    return acc
  }, {})

  const combinedData = dailyData.reduce((acc: IWeatherDailyList[], data) => {
    const date = getDateOfData(data.dt, timeZoneOffset)
    const existingItemIndex = acc.findIndex((item) => getDateOfData(item.dt, timeZoneOffset) === date)

    if (existingItemIndex === -1 && data.sys.pod === 'd') {
      acc.push({ ...data, nightId: undefined, minTemp: combinedTemp[date].min, maxTemp: combinedTemp[date].max })
    }

    if (existingItemIndex !== -1 && data.sys.pod === 'n') {
      acc[existingItemIndex].nightId = data.weather[0].id
    }

    return acc
  }, [])
  return combinedData
}
