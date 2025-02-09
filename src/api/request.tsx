const BASE_URL = ''

export const getWeatherData = async () => {
  const response = await fetch(BASE_URL, {
    method: 'GET',
  })
  return response.json()
}