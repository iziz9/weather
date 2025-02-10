export const calcTemperature = (temp: number, accuracy?: boolean) => {
  return accuracy ? Math.round(temp * 10) / 10 : Math.round(temp)
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

export const GetWindDerection = (deg: number) => {
  const directions = ['북풍', '북동풍', '동풍', '남동풍', '남풍', '남서풍', '서풍', '북서풍']
  const index = Math.round(deg / 45) % 8 // 45도 단위로 나누고 0~7 사이의 방향 인덱스 구하기
  return directions[index]
}
