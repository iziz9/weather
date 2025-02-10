import { ICoords } from '../types/geoTypes'
import { geoInstance } from './axiosInstance'

const API_KEY = import.meta.env.VITE_GEO_API_KEY
const DEFAULT_OPTION = { key: API_KEY, language: 'kr' }

export const getCurrentLocationName = async ({ lat, lon }: ICoords) => {
  return await geoInstance
    .get('geo/1.0/reverse', {
      params: { ...DEFAULT_OPTION, q: `${lat}+${lon}`, pretty: 1, address_only: 1 }
    })
    .then((res) => {
      return res.data.results
    })
}

// export const getPlaceCoords = async ({ lat, lon }: { lat: number; lon: number }) => {
//   return await geoInstance
//     .get('geo/1.0/reverse', {
//       params: { DEFAULT_OPTION, }
//     })
//     .then((res) => {
//       return res.data.results
//     })
// }
