import { IWeatherDailyList } from '../types/weatherTypes'

export const roundingOff = (num: number, accuracy?: boolean) => {
  return accuracy ? Math.round(num * 10) / 10 : Math.round(num)
}

export const getDateOfData = (utc: number) => {
  // oneCallApi는 서버에서 현지 시간으로 보내줌, timezone 계산 필요 없음
  const date = new Date(utc * 1000)
  const week = ['일', '월', '화', '수', '목', '금', '토']
  const dateString = date.toLocaleDateString('ko-KR', { month: 'long', day: '2-digit' })
  const day = week[date.getDay()]
  return `${dateString} (${day})`
}

export const isSameDate = (utc: number, timezone_offset: number) => {
  const date = new Date((utc + timezone_offset) * 1000).toLocaleDateString()
  const currentDate = new Date().toLocaleDateString()
  return date === currentDate
}

export const getTimeOfData = (utc: number) => {
  return new Date(utc * 1000).toLocaleTimeString().split(':')[0]
}

export const getPop = (pop: number) => {
  // propability of procipitation 강수확률
  return pop === 0 ? pop : pop * 100
}

export const getDayOfData = (utc: number) => {
  const dateNow = new Date().getDate()
  const dateOfData = new Date(utc * 1000).getDate()

  if (dateNow === dateOfData) return '오늘'
  else if (dateNow + 1 === dateOfData) return '내일'
  else if (dateNow + 2 === dateOfData) return '모레'
}

export const getWindDirection = (deg: number) => {
  const directions = ['북풍', '북동풍', '동풍', '남동풍', '남풍', '남서풍', '서풍', '북서풍']
  const index = Math.round(deg / 45) % 8 // 45도 단위로 나누고 0~7 사이의 방향 인덱스 구하기
  return directions[index]
}

export const combineNightAndDay = (dailyData: IWeatherDailyList[]) => {
  const combinedTemp = dailyData.reduce((acc: { [key: string]: { min: number; max: number } }, data) => {
    const date = getDateOfData(data.dt)

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
    const date = getDateOfData(data.dt)
    const existingItemIndex = acc.findIndex((item) => getDateOfData(item.dt) === date)

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
