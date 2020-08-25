/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { fetchTimelineData, TimelineData } from '../API/DiseaseApi'
import { fetchGlobalData, fetchCountryData, GlobalCases, CountryCases } from '../API/NinjaApi'

export interface HomeScreenData {
  global: GlobalCases,
  country: CountryCases,
  timeline: TimelineData[],
}

const getHomeScreenData = (): [
  Function,
  HomeScreenData | null,
  string | undefined,
] => {
  const [results, setResults] = useState<HomeScreenData | null>(null)
  const [err, setError] = useState(undefined)

  const fetchHomeData = (country: String) => {
    return new Promise((resolve, reject) => {
      Promise.all([
        fetchGlobalData(),
        fetchCountryData(country),
        fetchTimelineData(country)
      ])
        .then(([gd, cd, tl]) => {
          const rs: HomeScreenData = {
            global: gd,
            country: cd,
            timeline: tl
          }
          setResults(rs)
          setError(undefined)
          resolve()
        })
        .catch((err) => {
          setResults(null)
          setError(err.message)
          reject()
        })
    })
  }

  return [fetchHomeData, results, err]
}

export default getHomeScreenData
