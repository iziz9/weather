import axios from 'axios'

const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL
const GEO_BASE_URL = import.meta.env.VITE_GEO_BASE_URL

export const weatherInstance = axios.create({
  baseURL: WEATHER_BASE_URL,
  timeout: 20000,
  headers: {
    accept: 'application/json'
  }
})

export const geoInstance = axios.create({
  baseURL: GEO_BASE_URL,
  timeout: 20000,
  headers: {
    accept: 'application/json'
  }
})
