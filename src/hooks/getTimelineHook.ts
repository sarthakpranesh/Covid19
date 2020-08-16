import { useState } from 'react'

const getTimelineHook = (): [Function, any, String] => {
  const [results, setResults] = useState<any>([])
  const [errMessage, setErrorMessage] = useState('')

  const getTimeline = async (country: String) => {
    fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
      .then((resp) => resp.json())
      .then((respData: any) => {
        const dateKeys = Object.keys(respData.timeline.cases)
        const filteredData = dateKeys.map((date) => {
          return {
            date: date,
            difference:
              respData.timeline.cases[date] - respData.timeline.recovered[date]
          }
        })
        setResults(filteredData)
        setErrorMessage('')
      })
      .catch((err) => {
        console.log('From Timeline: ' + err.message)
        setResults([])
        setErrorMessage(err.message)
      })
  }

  return [getTimeline, results, errMessage]
}

export default getTimelineHook
