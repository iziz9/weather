import { geoInstance } from './axiosInstance'

const API_KEY = import.meta.env.VITE_GEO_API_KEY
const DEFAULT_OPTION = { key: API_KEY, language: 'kr' }

// interface ICurrentLocation {
//   borough: '종로구',
//   city: '서울특별시',
//   city_gate: '광화문',
//   continent: 'Asia',
//   country: '대한민국',
//   province: '경기도',
//   country_code: 'kr',
//   house_number: '161',
//   postcode: '03171',
//   quarter: '세종로',
//   road: '사직로',
//   suburb: '사직동',
//   _category: 'unknown',
//   _normalized_city: '서울특별시',
//   _type: 'city_gate'
// }

export const getCurrentLocationName = async ({ lat, lon }: { lat: number; lon: number }) => {
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
