/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */

export interface GlobalCases {
  confirmed: Number,
  deaths: Number,
  recovered: Number,
  deathsToday: Number,
  newConfirmed: Number,
  totalSerious: Number,
}

export const fetchGlobalData: () => Promise<GlobalCases> = () => {
  return new Promise((resolve, reject) => {
    fetch('https://corona.lmao.ninja/v2/all')
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData.cases) {
          const results: GlobalCases = {
            confirmed: respData.cases,
            deaths: respData.deaths,
            recovered: respData.recovered,
            deathsToday: respData.todayDeaths,
            newConfirmed: respData.todayCases,
            totalSerious: respData.critical
          }
          return resolve(results)
        }
        reject('Ninja API returned no data!')
      })
      .catch((err) => {
        console.log('Ninja API error (Global): ', err.message)
        reject(err.message)
      })
  })
}

export interface CountryCases extends GlobalCases{}

export const fetchCountryData: (country: String) => Promise<CountryCases> = (country) => {
  return new Promise((resolve, reject) => {
    fetch(`https://corona.lmao.ninja/v2/countries/${country}?today&strict&query%20`)
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData.cases) {
          const results: CountryCases = {
            confirmed: respData.cases,
            deaths: respData.deaths,
            recovered: respData.recovered,
            deathsToday: respData.todayDeaths,
            newConfirmed: respData.todayCases,
            totalSerious: respData.critical
          }
          return resolve(results)
        }
        reject('Ninja API returned no data!')
      })
      .catch((err) => {
        console.log('Ninja API error (Country): ', err.message)
        reject(err.message)
      })
  })
}
