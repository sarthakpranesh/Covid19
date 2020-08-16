import { useState } from 'react'

const getGlobalTotalHook = (): [Function, any, String] => {
  const [results, setResults] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const getGlobalTotal = async () => {
    // eslint-disable-next-line no-undef
    fetch('https://corona.lmao.ninja/v2/all')
      .then((resp) => resp.json())
      .then((respData) => {
        if (!respData.cases) {
          console.log('No Data received')
          throw new Error()
        }
        setResults({
          confirmed: respData.cases,
          deaths: respData.deaths,
          recovered: respData.recovered,
          deathsToday: respData.todayDeaths,
          newConfirmed: respData.todayCases,
          totalSerious: respData.critical
        })
        setErrorMessage('')
      })
      .catch((err) => {
        console.log('From Global stats: ' + err.message)
        setResults({})
        setErrorMessage(err.message)
      })
  }

  return [getGlobalTotal, results, errorMessage]
}

export default getGlobalTotalHook
