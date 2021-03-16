import fetch from 'node-fetch'

export interface TimelineData {
  date: String,
  difference: Number,
}

export const fetchTimelineData: (country: String) => Promise<TimelineData[]> = (country) => {
  return new Promise((resolve, reject) => {
    fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
      .then((resp) => resp.json())
      .then((respData) => {
        const dateKeys = Object.keys(respData.timeline.cases)
        const filteredData: TimelineData[] = dateKeys.map((date) => {
          const r: TimelineData = {
            date: date,
            difference:
              respData.timeline.cases[date] - ( respData.timeline.recovered[date] + respData.timeline.deaths[date] )
          }
          return r
        })
        resolve(filteredData)
      })
      .catch((err) => {
        console.log('Disease API error: ', err.message)
        reject(err.message)
      })
  })
}
